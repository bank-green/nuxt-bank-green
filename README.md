Running at https://nuxt.bank.green

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

Publish to `nuxt.bank.green`
`npm run publish`

# CMS with Prismic

Read the [Prismic & Nuxt docs](https://prismic.io/docs/nuxt) to understand how to use Prismic with Nuxt.

# Known issues

- We're using the Vue Composition API in all components, but only some of them use [SFCs (single-file components)](https://vuejs.org/guide/scaling-up/sfc.html) (i.e. `<script setup>`. Nuxt is fairly opinionated about this with its magic and we should be using SFCs everywhere, so I migrate them whenever I see them.)
