Running at https://bank.green

# Setup

Install dependencies:
`npm i`

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
`npm run publish`

# Tests
## Unit Tests/Integration Tests
All test cases are located at directory [__tests __](__tests__)

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
