#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

/**
 * Script to fix ActiveCampaign contacts that have incorrect bank name tags.
 * This script finds all contacts with tags that are NOT in the valid tag list,
 * and moves those tag names to the Bank field (field 2).
 *
 * Usage:
 *   node scripts/fix-ac-bank-tags.js [--dry-run]
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

// Valid tag IDs extracted from the contact.post.ts file
const VALID_TAG_IDS = new Set([
  4, 5, 6, 7, 8, 9, 11, 13, 14, 21, 24, 26, 27, 28, 37, 46, 56, 81, 84, 89, 99,
  101, 103, 109, 111, 121, 124, 132, 152, 162, 163, 185, 201, 298, 515, 516,
  517, 518, 519, 526, 554, 601, 743, 744, 745, 746, 827, 859, 861, 504,
]);

const AC_URL = process.env.NUXT_PUBLIC_ACTIVE_CAMPAIGN_URL?.trim();
const AC_KEY = process.env.NUXT_PUBLIC_ACTIVE_CAMPAIGN_KEY?.trim();
const DRY_RUN = process.argv.includes('--dry-run');

if (!AC_URL || !AC_KEY) {
  console.error(
    'Missing NUXT_PUBLIC_ACTIVE_CAMPAIGN_URL or NUXT_PUBLIC_ACTIVE_CAMPAIGN_KEY in .env file'
  );
  process.exit(1);
}

async function getContacts(limit = 100, offset = 0) {
  const url = new URL(`${AC_URL}/contacts`);
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
    throw new Error(`Failed to fetch contacts: ${response.statusText}`);
  }

  return response.json();
}

async function getContactTags(contactId) {
  const response = await fetch(`${AC_URL}/contacts/${contactId}/contactTags`, {
    method: 'GET',
    headers: {
      'Api-Token': AC_KEY,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch tags for contact ${contactId}: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.contactTags || [];
}

async function updateContact(contactId, email, firstName, bankName) {
  const body = {
    contact: {
      id: contactId,
      email: email,
      firstName: firstName || '',
      fieldValues: [
        {
          field: '2', // Bank field
          value: bankName,
        },
      ],
    },
  };

  if (DRY_RUN) {
    return;
  }

  const response = await fetch(`${AC_URL}/contact/sync`, {
    method: 'POST',
    headers: {
      'Api-Token': AC_KEY,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to update contact ${contactId}: ${response.statusText}`
    );
  }
}

async function removeTagFromContact(contactId, contactTagId) {
  if (DRY_RUN) {
    return;
  }

  // contactTagId is the ID from the contactTags response, not the tag ID itself
  const response = await fetch(`${AC_URL}/contactTags/${contactTagId}`, {
    method: 'DELETE',
    headers: {
      'Api-Token': AC_KEY,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to remove tag from contact ${contactId}: ${response.statusText}`
    );
  }
}

// Keywords that indicate a tag is a system/operational tag, not a bank name
const SYSTEM_TAG_KEYWORDS = [
  're-engagement',
  're-engaged',
  'autoresponder',
  'opt',
  'unsubscribe',
  'newsletter',
  'mailing list',
  'double',
  'confirmed',
  'broken',
  'pledg',
  'survey',
  'modal',
  'campaign',
  'lead',
  'form',
  'index',
  'faq',
  'box',
  'bottom',
  'tiktok',
  'ads',
  'bank rank',
  'launch',
  'engaged',
  'switch',
  'take action',
  'changed preferences',
];

function isSystemTag(tagName) {
  const lowerTagName = tagName.toLowerCase();
  return SYSTEM_TAG_KEYWORDS.some(keyword => lowerTagName.includes(keyword));
}

async function processAllContacts() {
  let offset = 0;
  const limit = 100;
  let totalProcessed = 0;
  let totalUpdated = 0;
  const nonBankTags = new Map(); // Map of tagId -> tagName for system tags

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      console.log(`Fetching contacts (offset: ${offset})...`);
      const result = await getContacts(limit, offset);

      if (!result.contacts || result.contacts.length === 0) {
        console.log('No more contacts to process');
        break;
      }

      for (const contact of result.contacts) {
        totalProcessed++;

        // Fetch tags for this contact
        let tags = [];
        try {
          tags = await getContactTags(contact.id);
        } catch (error) {
          console.error(
            `Error fetching tags for contact ${contact.id}:`,
            error.message
          );
          continue;
        }

        // Find tags that are NOT in the valid list
        const invalidTags = tags.filter(
          t => !VALID_TAG_IDS.has(parseInt(t.tag, 10))
        );

        if (invalidTags.length > 0) {
          console.log(
            `Contact ${contact.id} (${contact.email}) has ${invalidTags.length} invalid tag(s):`
          );

          for (const contactTag of invalidTags) {
            const tagId = contactTag.tag;
            const contactTagId = contactTag.id; // The ID of the contactTag relationship
            // We need to fetch the tag details to get the tag name
            let tagName = '';
            try {
              const tagResponse = await fetch(`${AC_URL}/tags/${tagId}`, {
                method: 'GET',
                headers: {
                  'Api-Token': AC_KEY,
                  accept: 'application/json',
                },
              });
              if (tagResponse.ok) {
                const tagData = await tagResponse.json();
                tagName = tagData.tag?.tag || `Tag ${tagId}`;
              } else {
                tagName = `Tag ${tagId}`;
              }
            } catch (error) {
              console.error(error);
              tagName = `Tag ${tagId}`;
            }

            // Track system/non-bank tags
            if (isSystemTag(tagName) && !nonBankTags.has(tagId)) {
              nonBankTags.set(tagId, tagName);
            }

            console.log(`  - Tag ID: ${tagId}, Tag Name: ${tagName}`);

            try {
              // Only update if it looks like a bank name, skip system tags
              if (!isSystemTag(tagName)) {
                // Update the Bank field with the tag name
                await updateContact(
                  contact.id,
                  contact.email,
                  contact.firstName,
                  tagName
                );
                const prefix = DRY_RUN ? '[DRY-RUN]' : '✓';
                console.log(`    ${prefix} Updated Bank field to "${tagName}"`);

                // Remove the invalid tag
                await removeTagFromContact(contact.id, contactTagId);
                console.log(`    ${prefix} Removed tag ID ${tagId}`);

                totalUpdated++;
              } else {
                console.log(
                  `    ⊘ Skipping system tag (should be added to valid list)`
                );
              }
            } catch (error) {
              console.error(
                `    ✗ Error processing tag ${tagId} for contact ${contact.id}:`,
                error.message
              );
            }
          }
        }
      }

      // Check if there are more contacts
      if (
        result.meta &&
        result.meta.offset + result.meta.limit >= result.meta.total
      ) {
        break;
      }

      offset += limit;
    }
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }

  console.log('\n=== Summary ===');
  console.log(`Total contacts processed: ${totalProcessed}`);
  console.log(`Total contacts updated: ${totalUpdated}`);

  if (nonBankTags.size > 0) {
    console.log(
      `\n⚠ Found ${nonBankTags.size} system/non-bank tag(s) that should be added to VALID_TAG_IDS:`
    );
    console.log(
      Array.from(nonBankTags.entries())
        .map(([id, name]) => `  ${id}: ${name}`)
        .join('\n')
    );
    console.log(
      '\nAdd these tag IDs to the VALID_TAG_IDS array in the script to prevent processing them in the future.'
    );
  }
}

const modeText = DRY_RUN ? '(DRY-RUN - No changes will be applied)' : '';
console.log(`Starting ActiveCampaign bank tag fix... ${modeText}`);
console.log(`Valid tag IDs: ${Array.from(VALID_TAG_IDS).join(', ')}\n`);
processAllContacts().then(() => {
  if (DRY_RUN) {
    console.log(
      '\nDry-run complete! Review the changes above and run without --dry-run to apply them.'
    );
  } else {
    console.log('Done!');
  }
});
