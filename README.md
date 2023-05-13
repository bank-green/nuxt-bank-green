Running at https://bank.green

# Setup

Install dependencies:
`npm i`

# Development

`npm run dev`

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

# CMS with Prismic

Read the [Prismic & Nuxt docs](https://prismic.io/docs/nuxt) to understand how to use Prismic with Nuxt.
