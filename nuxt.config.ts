export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/prismic',
    'nuxt-jsonld',
    '@nuxt/test-utils/module',
    '@nuxt/eslint',
    '@stefanobartoletti/nuxt-social-share',
    '@nuxtjs/sitemap',
    'nuxt-graphql-client',
    '@pinia/nuxt',
  ],

  site: { url: 'https://bank.green' },

  sitemap: {
    sources: ['/api/site-pages'],
    defaults: {
      lastmod: new Date().toISOString(),
      priority: 0.5,
      changefreq: 'weekly',
    },
  },

  prismic: {
    endpoint: 'bankgreen',
  },

  runtimeConfig: {
    FEATURE_CONTACT_EMAIL: process.env.FEATURE_CONTACT_EMAIL ?? 'off',
    public: {
      FEATURE_CONTACT_EMAIL: process.env.PUBLIC_FEATURE_CONTACT_EMAIL ?? 'off',
      DOMAIN_URL: process.env.PUBLIC_DOMAIN_URL,
      DATA_URL: process.env.PUBLIC_DATA_URL,
      EMBRACE_URL: process.env.PUBLIC_EMBRACE_URL,
      GPE_URL: process.env.PUBLIC_GPE_URL,
      CAPTCHA_SITEKEY: process.env.NUXT_PUBLIC_CLOUDFLARE_CAPTCHA_SITEKEY,
      CAPTCHA_SECRET: process.env.NUXT_PUBLIC_CLOUDFLARE_CAPTCHA_SECRET,
      ZAPIER_OTHER_SUBMIT: process.env.ZAPIER_OTHER_SUBMIT,
      ZAPIER_CONTACT: process.env.ZAPIER_CONTACT,
      ACTIVE_CAMPAIGN_KEY: process.env.NUXT_PUBLIC_ACTIVE_CAMPAIGN_API_KEY,
      ACTIVE_CAMPAIGN_URL: process.env.NUXT_PUBLIC_ACTIVE_CAMPAIGN_URL,
      GQL_HOST:
        process.env.PUBLIC_DATA_URL || 'https://data.bank.green/graphql',
    },
  },

  vue: {
    compilerOptions: {
      directiveTransforms: {
        clickaway: () => ({
          props: [],
          needRuntime: true,
        }),
      },
      isCustomElement: tag => tag.startsWith('swiper-'),
    },
  },

  css: ['@/styles/style.css', '@typeform/embed/build/css/widget.css'],

  routeRules: {
    '/sustainable-ethical-banks': { redirect: '/sustainable-eco-banks' },
  },

  app: {
    head: {
      meta: [
        {
          charset: 'utf-8',
        },
        {
          'http-equiv': 'x-ua-compatible',
          content: 'IE-edge',
        },
        {
          'http-equiv': 'Content-Language',
          content: 'en',
        },
        {
          name: 'apple-mobile-web-app-title',
          content: 'Find Ethical & Sustainable Banks In Your Area - Bank.Green',
        },
        {
          name: 'application-name',
          content: 'Bank.Green',
        },
        {
          name: 'msapplication-TileColor',
          content: '#12141d',
        },
        {
          name: 'theme-color',
          content: '#12141d',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          name: 'referrer',
          content: 'origin',
        },
        {
          name: 'description',
          content:
            'Bank.Green is sounding the alarm on the climate-destroying activities of banks while recommending sustainable alternatives and empowering consumer action.',
        },
        {
          property: 'og:title',
          content: 'Find Ethical & Sustainable Banks In Your Area - Bank.Green',
        },
        {
          property: 'og:description',
          content:
            'Bank.Green is sounding the alarm on the climate-destroying activities of banks while recommending sustainable alternatives and empowering consumer action.',
        },
        {
          property: 'og:image',
          content: 'https://bank.green/img/social/social-1664-971.jpg',
        },
        {
          property: 'og:image:width',
          content: '1665',
        },
        {
          property: 'og:image:height',
          content: '971',
        },
        {
          property: 'twitter:image',
          content: 'https://bank.green/img/social/social-1664-971.jpg',
        },
        {
          property: 'og:locale',
          content: 'en',
        },
        {
          name: 'facebook-domain-verification',
          content: 'wf6ta1yzc1rnykp1b7jj8vov1c4amh',
        },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#12141D',
        },
      ],
      noscript: [
        {
          children:
            "We're sorry but Bank.Green doesn't work properly without JavaScript enabled. Please enable it to continue.",
        },
      ],
    },
  },

  imports: {
    dirs: ['slices'],
  },

  image: {
    provider: 'prismic',
    none: {},
    prismic: {},
  },

  ssr: true,

  nitro: {
    preset: 'cloudflare',
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap', '/sitemap.xml'],
      ignore: ['/team', '/team/*', '/banks/undefined'],
    },
  },

  eslint: {
    checker: false,
    config: {
      stylistic: true,
    },
  },

  socialShare: {
    baseUrl: process.env.PUBLIC_DOMAIN_URL,
  },
});
