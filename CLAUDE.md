# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bank.Green is a Nuxt 3 application that helps users find ethical and sustainable banks. The site uses Prismic as a headless CMS, GraphQL for data fetching, and is deployed on Cloudflare Workers.

## Development Commands

- **Development server**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview` (uses Wrangler to preview the Cloudflare Worker locally)
- **Tests**: `npm run test` (runs Vitest tests with `*.spec.ts` files)
- **Linting**: `npm run lint` (check all files) or `npm run lint-staged` (staged files only)
- **Lint fix**: `npm run lint:fix` (all files) or `npm run lint-staged:fix` (staged files)
- **Formatting**: `npm run format` (Prettier format) or `npm run format:check` (check formatting)

## Architecture

### Core Structure
- **Pages**: Standard Nuxt 3 file-based routing in `/pages`
- **Components**: Organized by feature areas (bank/, eco-bank/, forms/, nav/, etc.)
- **Slices**: Prismic slice components in `/slices` for CMS content blocks
- **Composables**: Vue composables in `/composables` for reusable logic
- **Utils**: Utility functions in `/utils` organized by domain
- **Styles**: Tailwind CSS with custom color palette and design tokens

### Key Features
- **Bank Search**: Location-based sustainable bank discovery
- **CMS Integration**: Prismic for content management via Slice Machine
- **GraphQL Data**: Uses `nuxt-graphql-client` with `.gql` query files
- **Form Handling**: Contact forms, bank submissions, and surveys
- **Social Features**: Sharing, embracing campaigns, donation flows

### Prismic CMS
- **Critical**: Always use Slice Machine (`npm run slicemachine`) for creating/editing custom types
- **Never** use the Prismic dashboard web interface for custom types - this can delete content
- Custom types are defined in `/customtypes`
- Slices are in `/slices` with auto-imports configured

#### Slice Architecture
The application uses **13 SharedSlices** that are reusable across different custom types:

**Content Slices** (most commonly used):
- `TextSlice` - Rich text content (used in 11 custom types, 18 slice zones) - **most versatile**
- `ImageSlice` - Images with captions (6 custom types)
- `EmbedSlice` - Video/media embeds (7 custom types)
- `AccordionSlice` - Collapsible accordions with 3 variations (10 custom types)
- `TableSlice` - Data tables with icon support (blogpost only)

**Interactive Slices**:
- `LeadGen` - Lead generation form with configurable fields (homepage, bank pages)
- `ButtonSlice` - CTA buttons (4 custom types)
- `SocialSharerSlice` - Social sharing buttons (2 custom types)
- `SharePicGallerySlice` - Shareable image gallery (take-action page)

**Specialized Slices**:
- `TeamMemberSlice` - Team member profiles (team page)
- `FeaturedInSlice` - Media/partner logos (homepage, green-policy-evaluator)
- `ThanksSlice` - Thank you page content (all thanks pages)
- `ErrorMessage` - Empty state messages (eco-banks page)

#### Slice-to-Page Mapping

**Homepage** (`/`):
- Uses: `LeadGen`, `FeaturedInSlice`
- Purpose: Lead capture and credibility

**Bank Pages** (`/banks/[bankTag]`, `/sustainable-eco-banks/[bankTag]`):
- Uses: `LeadGen`
- Purpose: Bank-specific lead generation

**Content Pages** (blog, press, methodology):
- Uses: `TextSlice`, `ImageSlice`, `EmbedSlice`, `AccordionSlice`, `TableSlice`
- Purpose: Rich editorial content

**Action Pages** (`/take-action`):
- Uses: All action-oriented slices (7 different slices across 4 tabs)
- Purpose: Engage users in climate action

**Simple Pages** (`/privacy`, `/disclaimer`, `/volunteers`):
- Uses: `TextSlice` only
- Purpose: Static content pages

#### Reusable Content Pattern
- `AccordionItem` is a custom type that serves as a reusable content document
- Referenced via Content Link variation in `AccordionSlice`
- Used on FAQ, certification, and other accordion-heavy pages
- Fetched using `fetchLinks` in Prismic queries

#### Multi-Tab Pages
Some custom types use multiple slice zones for tabbed interfaces:
- `methodology` - 3 tabs (Lending, Financed Emissions, Policy)
- `takeactionpage` - 4 tabs (Pressure, Switch, Share, Learn)
- Slice zones are named `slices`, `slices1`, `slices2`, etc.

### Form Handling & ActiveCampaign Integration

The application uses **two distinct form systems** for different purposes, both integrating with ActiveCampaign for email marketing:

#### 1. LeadGen Form (Prismic Slice)
**File:** `/slices/LeadGen/index.vue` → `/server/api/lead-gen-active-campaign.post.ts`

**Purpose:** High-conversion lead capture optimized for marketing campaigns

**Where Used:**
- Homepage (`/`) - Main lead capture
- Bank pages (`/banks/[bankTag]`) - Bank-specific leads
- Sustainable bank pages (`/sustainable-eco-banks/[bankTag]`) - Eco bank leads

**How It Works:**
- Creates/updates contact in ActiveCampaign
- **Adds contact to Lists** (not Tags):
  - List 27 (Bank Lead) if `bank_leads_ac_list` is true in Prismic
  - List 28 (Unconfirmed) if false
- Redirects to `/thanks` on success

**ActiveCampaign Fields:**
- Custom Field #2: Bank name
- Custom Field #18: Switch status
- Custom Field #11: Marketing consent

**Prismic Configuration:**
All aspects configurable via CMS without code changes:
- Show/hide bank field (`show_bank_field`)
- Show/hide status dropdown (`show_status_field`)
- Custom labels for all fields
- Bullet point checklist items
- Status dropdown options
- ActiveCampaign list routing (`bank_leads_ac_list`)

#### 2. Contact Form (useContactForm Composable)
**Files:** `/composables/useContactForm.ts` → `/utils/contact.ts` → `/server/api/contact.post.js`

**Purpose:** General-purpose contact and signup forms across the site

**Where Used:**

| Page/URL | Component | Tag | AC Tag ID | Purpose |
|----------|-----------|-----|-----------|---------|
| `/contact` | pages/contact.vue | contact page form | 14 | General inquiries |
| `/partners` | SignupBox | partners bottom | 24 | Partner page signup |
| `/join` | SignupBox | join form | 201 | Join movement campaign |
| `/faq` | SignupBox | FAQ bottom | 124 | FAQ page signup |
| `/banks/[good/great]` | SignupBox (BankLayoutGood) | bank ok bottom | 101 | Good bank page signup |
| `/not-listed` | SubmitBank | submitbank | 14 | Submit missing bank |

**How It Works:**
- Creates/updates contact in ActiveCampaign
- **Adds Tags to contact** (not Lists) based on form source
- Tracks GTM events for analytics
- Collects Cloudflare IP metadata automatically

**ActiveCampaign Fields:**
- Custom Field #2: Bank display name
- Custom Field #11: Marketing consent
- Custom Field #19: Subject
- Custom Field #20: Message

**Additional Data Collected:**
- Cloudflare IP, country, city, lat/lng
- Dirty deals, rating, country (for bank-related forms)
- Form tag, path, timestamp

#### Key Differences

| Aspect | LeadGen (Prismic Slice) | Contact Form (useContactForm) |
|--------|-------------------------|-------------------------------|
| **File Type** | TypeScript (.ts) | JavaScript (.js) |
| **AC Strategy** | Adds to **Lists** (27 or 28) | Adds **Tags** (14, 24, 101, 124, 201) |
| **Primary Use** | Lead generation | General contact/signup |
| **Configuration** | Fully managed via Prismic CMS | Code-based |
| **Fields** | 5 core fields (firstName, email, bank, status, marketing) | 15+ fields with metadata |
| **Used On** | 3-4 high-conversion pages | 6+ pages site-wide |
| **Customization** | Content editors can modify without dev | Requires code changes |
| **Best For** | A/B testing, marketing campaigns | Multi-purpose forms |

#### When to Use Which Form

**Use LeadGen Slice when:**
- Adding a new lead capture to homepage or bank pages
- Need to A/B test copy or field visibility
- Want non-technical users to manage form content
- Building a focused conversion flow

**Use Contact Form when:**
- Adding a general signup box to a content page
- Need to collect detailed information (subject, message)
- Want to segment by Tag rather than List
- Building a contact or support form

### Data Layer
- **GraphQL**: Queries in `/queries/*.gql` files for type generation
- **Server API**: Routes in `/server/api/` for backend functionality
- **Runtime Config**: Environment variables configured in `nuxt.config.ts`

### Component Organization
- **Feature-based**: Components grouped by domain (bank/, eco-bank/, forms/)
- **Shared components**: Common UI elements in root `/components`
- **Client components**: Use `.client.vue` suffix for client-only components

### Styling
- **Tailwind CSS**: Custom design system with brand colors (sushi green, sunglow yellow)
- **Typography**: Custom prose styles for CMS content
- **Responsive**: Mobile-first with custom breakpoints

## Testing

- **Framework**: Vitest with `@nuxt/test-utils`
- **Test files**: `*.spec.ts` files in `/__tests__` directory
- **Environment**: Uses Nuxt test environment with mocked intersectionObserver
- **Run tests**: `npm run test`

## Deployment

- **Platform**: Cloudflare Workers with Wrangler CLI
- **Staging**: `npm run stage` (deploys to test.bank.green)
- **Production**: `npm run deploy` (deploys to bank.green)
- **Requirements**: Wrangler CLI installed globally and authenticated

## Code Standards

- **ESLint**: Nuxt ESLint config with Prettier integration
- **TypeScript**: Full TypeScript support with strict configuration
- **Vue 3**: Composition API with `<script setup>` syntax
- **Auto-imports**: Nuxt auto-imports for composables, utils, and components
- **Git hooks**: Husky with lint-staged for pre-commit linting

## Environment Setup

- **Node.js**: >= 22.19.0 (see `.nvmrc`)
- **Package manager**: npm
- **IDE**: VS Code with Vue, ESLint, and Prettier extensions recommended