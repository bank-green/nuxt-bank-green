#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

/**
 * Script to clean up unused ActiveCampaign tags.
 * This script finds all tags that have 0 contacts and 0 automations,
 * and optionally deletes them.
 *
 * Usage:
 *   node scripts/cleanup-unused-tags.js [--dry-run]
 *
 * Options:
 *   --dry-run  Preview changes without applying them
 */

// Load .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '..', '.env');

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      const value = valueParts.join('=').trim();
      if (key && value && !process.env[key.trim()]) {
        process.env[key.trim()] = value;
      }
    }
  });
} else {
  console.error(`Error: .env file not found at ${envPath}`);
  process.exit(1);
}

const AC_URL = process.env.NUXT_PUBLIC_ACTIVE_CAMPAIGN_URL?.trim();
const AC_KEY = process.env.NUXT_PUBLIC_ACTIVE_CAMPAIGN_KEY?.trim();
const DRY_RUN = process.argv.includes('--dry-run');

if (!AC_URL || !AC_KEY) {
  console.error(
    'Missing NUXT_PUBLIC_ACTIVE_CAMPAIGN_URL or NUXT_PUBLIC_ACTIVE_CAMPAIGN_KEY in .env file'
  );
  process.exit(1);
}

async function getAllTags(limit = 100, offset = 0) {
  const url = new URL(`${AC_URL}/tags`);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('offset', offset.toString());

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Api-Token': AC_KEY,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tags: ${response.statusText}`);
  }

  return response.json();
}

async function getTagDetails(tagId) {
  const response = await fetch(`${AC_URL}/tags/${tagId}`, {
    method: 'GET',
    headers: {
      'Api-Token': AC_KEY,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch tag details for tag ${tagId}: ${response.statusText}`
    );
  }

  return response.json();
}

async function deleteTag(tagId) {
  if (DRY_RUN) {
    return;
  }

  const response = await fetch(`${AC_URL}/tags/${tagId}`, {
    method: 'DELETE',
    headers: {
      'Api-Token': AC_KEY,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete tag ${tagId}: ${response.statusText}`);
  }
}

async function cleanupUnusedTags() {
  let tagOffset = 0;
  const limit = 100;
  let totalTags = 0;
  let unusedTags = [];

  // Create timestamped log file for this run
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5); // YYYY-MM-DDTHH-mm-ss
  const logPath = path.join(
    __dirname,
    '..',
    `cleanup-unused-tags-${timestamp}.log`
  );
  console.log(`Log file: ${logPath}\n`);

  try {
    // Fetch all tags and iterate through them
    // eslint-disable-next-line no-constant-condition
    while (true) {
      console.log(`Fetching tags (offset: ${tagOffset})...`);
      const tagsResult = await getAllTags(limit, tagOffset);

      if (!tagsResult.tags || tagsResult.tags.length === 0) {
        console.log('No more tags to process');
        break;
      }

      for (const tagObj of tagsResult.tags) {
        const tagId = tagObj.id;
        const tagName = tagObj.tag;

        totalTags++;

        try {
          // Get detailed tag info including contact count
          const tagDetails = await getTagDetails(tagId);
          const tag = tagDetails.tag;

          // subscriber_count is returned as a string, so convert to integer
          const contactCount = parseInt(tag.subscriber_count, 10) || 0;

          console.log(`Tag ${tagId} (${tagName}): ${contactCount} contacts`);

          // Check if tag is unused (0 contacts)
          // Note: ActiveCampaign tag API doesn't expose automation count in the tag details
          if (contactCount === 0) {
            console.log(`  ⚠️  Unused tag - marking for deletion`);
            unusedTags.push({ id: tagId, name: tagName });
          }
        } catch (error) {
          console.error(`  ✗ Error processing tag ${tagId}:`, error.message);
        }
      }

      // Check if there are more tags
      if (
        tagsResult.meta &&
        tagsResult.meta.offset + tagsResult.meta.limit >= tagsResult.meta.total
      ) {
        break;
      }

      tagOffset += limit;
    }

    // Delete unused tags
    if (unusedTags.length > 0) {
      console.log(`\n=== Deleting ${unusedTags.length} unused tag(s) ===\n`);

      for (const tag of unusedTags) {
        try {
          await deleteTag(tag.id);
          const prefix = DRY_RUN ? '[DRY-RUN]' : '✓';
          console.log(`${prefix} Deleted tag ${tag.id} (${tag.name})`);
        } catch (error) {
          console.error(
            `✗ Error deleting tag ${tag.id} (${tag.name}):`,
            error.message
          );
        }
      }
    }

    console.log('\n=== Summary ===');
    console.log(`Total tags processed: ${totalTags}`);
    console.log(`Unused tags found: ${unusedTags.length}`);

    if (DRY_RUN && unusedTags.length > 0) {
      console.log('\nWould have deleted:');
      console.log(
        unusedTags.map(tag => `  - ${tag.id}: ${tag.name}`).join('\n')
      );
    }
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

const modeText = DRY_RUN ? '(DRY-RUN - No changes will be applied)' : '';
console.log(`Starting ActiveCampaign unused tag cleanup... ${modeText}\n`);
cleanupUnusedTags().then(() => {
  if (DRY_RUN) {
    console.log(
      '\nDry-run complete! Review the changes above and run without --dry-run to apply them.'
    );
  } else {
    console.log('Done!');
  }
});
