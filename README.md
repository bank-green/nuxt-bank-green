Running at https://bank.green

# Setup

Install dependencies:
`npm i`

## Environment Variables

1. **Create `.env` file** from the sample:

   ```bash
   cp .env.sample .env
   ```

2. **Required secrets** (get from Cloudflare Dashboard → Turnstile):

   - `NUXT_PUBLIC_CLOUDFLARE_CAPTCHA_SITEKEY` - Public site key
   - `NUXT_CLOUDFLARE_CAPTCHA_SECRET` - Private secret key (**NEVER commit this**)

3. **Production/Staging deployment**: Set these environment variables in Cloudflare Dashboard (Workers & Pages → Settings → Variables):

   - `NUXT_CLOUDFLARE_CAPTCHA_SECRET` - Encrypted secret
   - `NUXT_PUBLIC_ACTIVE_CAMPAIGN_KEY` - Plain text environment variable
   - `NUXT_PUBLIC_ACTIVE_CAMPAIGN_URL` - Plain text environment variable

4. **For Wrangler local preview** (optional - if using `npm run preview`):
   ```bash
   # Create .dev.vars file (NOT committed to git)
   cp .env .dev.vars
   ```

See [CLAUDE.md](CLAUDE.md#environment-variables) for complete environment variable documentation.

# Install IDE extensions (recommended for VS Code):

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): For real-time linting.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): For code formatting.
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar): For Nuxt/Vue development with TypeScript support.

**reload the VSCode might be required**

# Development

`npm run dev`

## Linting

Linter automatically runs when saving a file, on pre-commit staged files and on a GitHub Action when pushing into a PR.

You can manually check for linter errors in staged files using:

```bash
npm run lint-staged
```

And to fix the errors:

```bash
npm run lint-staged:fix
```

To run the linter manually in all files, you can use:

```bash
npm run lint
```

To fix errors found, you can run:

```bash
npm run lint:fix
```

If you are in Windows and the above does not work, try using:

```bash
npm run lint:fix-changed-win
```

Lint configuration is based on https://eslint.nuxt.com/packages/module#quick-setup

# Deployment

We need `wrangler`, the Cloudflare worker CLI.
Install wrangler:
`npm i -g wrangler`

Login:
`wrangler login`

Build the server with wrangler
`npm run build`

Preview the server with local wrangler
`npm run preview`

Publish to `test.bank.green` (run after building)
`npm run stage`

Publish to `bank.green`
`npm run deploy`

# Tests

## Unit Tests/Integration Tests

All test cases are located at directory [**tests **](__tests__)

To run tests
`npm run test`

## e2e Tests: WIP

# CMS with Prismic

**:warning: IMPORTANT :warning:**

**_DO NOT USE the dashboard (web) interface to create or modify custom types!_**

Always use the Slice Machine tool from your local for creating and editing custom types and slices.

`npm run slicemachine`

When pushing changes from Slice Machine, make sure only items that you are working on will get updated. If the changes shown in Slice Machine include deleting items, verify with the team to see if these items are safe to delete. Deleting a custom type may delete the associated content which will not be recoverable.

Read the [Prismic & Nuxt docs](https://prismic.io/docs/nuxt) to understand how to use Prismic with Nuxt.

# GraphQL Typings

We're using [nuxt-graphql-client](https://nuxt-graphql-client.web.app/)

It works by fetching and building the schema from queries during build and run commands.

Please note that in order to generate the query types, the queries must be in a `.gql`/`.graphql` file.
