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