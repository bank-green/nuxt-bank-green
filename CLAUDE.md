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
- **Form Handling**: Contact forms, bank submissions, and surveys (see [FORMS.md](FORMS.md) for complete documentation)
  @FORMS.md
- **Social Features**: Sharing, embracing campaigns, donation flows

### Prismic CMS

- **Critical**: Always use Slice Machine (`npm run slicemachine`) for creating/editing custom types
- **Never** use the Prismic dashboard web interface for custom types - this can delete content
- Custom types are defined in `/customtypes`
- Slices are in `/slices` with auto-imports configured

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

## Environment Variables

### Local Development Setup

1. **Create `.env` file** (copy from `.env.sample`):

   ```bash
   cp .env.sample .env
   ```

2. **Required environment variables for local development**:

   ```bash
   # Cloudflare Turnstile Captcha
   NUXT_PUBLIC_CLOUDFLARE_CAPTCHA_SITEKEY=0x4AAA...  # Public site key (get from Cloudflare Dashboard)
   NUXT_CLOUDFLARE_CAPTCHA_SECRET=0x4AAA...          # Private secret key (NEVER commit to git)

   # Other required variables
   PUBLIC_DOMAIN_URL=https://bank.green
   PUBLIC_DATA_URL=https://data.bank.green/graphql
   NUXT_PUBLIC_ACTIVE_CAMPAIGN_KEY=...
   NUXT_PUBLIC_ACTIVE_CAMPAIGN_URL=...
   ```

3. **For Wrangler local preview** (optional - only if using `npm run preview`):
   ```bash
   # Create .dev.vars file (NOT committed to git)
   cp .env .dev.vars
   ```

### Production/Staging Setup (Cloudflare Workers)

Secrets are managed via Wrangler CLI or Cloudflare Dashboard:

**Option 1: Using Wrangler CLI** (recommended for secrets):

```bash
# Set production secret
npx wrangler secret put NUXT_CLOUDFLARE_CAPTCHA_SECRET

# Set staging secret
npx wrangler secret put NUXT_CLOUDFLARE_CAPTCHA_SECRET -e staging

# List secrets
npx wrangler secret list
npx wrangler secret list -e staging
```

**Option 2: Using Cloudflare Dashboard**:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → Select your worker (`website` or `website-staging`)
3. Go to **Settings** → **Variables**
4. Click **"Add variable"** → Choose **"Encrypt"**
5. Add: `NUXT_CLOUDFLARE_CAPTCHA_SECRET` with your secret value

### Environment Variable Naming Conventions

- **Private (server-only)**: Use `NUXT_` prefix (e.g., `NUXT_CLOUDFLARE_CAPTCHA_SECRET`)

  - Accessible only in server-side code via `useRuntimeConfig().VARIABLE_NAME`
  - NOT exposed to client-side JavaScript bundles
  - Use for API keys, secrets, credentials

- **Public (client + server)**: Use `NUXT_PUBLIC_` prefix (e.g., `NUXT_PUBLIC_CLOUDFLARE_CAPTCHA_SITEKEY`)
  - Accessible everywhere via `useRuntimeConfig().public.VARIABLE_NAME`
  - Exposed to client-side JavaScript (visible in browser DevTools)
  - Use for non-sensitive config like API endpoints, feature flags, public keys

### Getting Cloudflare Turnstile Keys

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Turnstile** (under Security section)
3. Select your site (or create a new one)
4. Copy:
   - **Site Key** → Use for `NUXT_PUBLIC_CLOUDFLARE_CAPTCHA_SITEKEY`
   - **Secret Key** → Use for `NUXT_CLOUDFLARE_CAPTCHA_SECRET`

### Security Notes

- **NEVER** commit `.env` or `.dev.vars` files to git (they are in `.gitignore`)
- **NEVER** put secrets in `wrangler.toml` (it's committed to git)
- Private variables (without `_PUBLIC_`) are ONLY accessible server-side
- Captcha secret is now properly secured in private runtime config (fixed as of 2025-12-17)
