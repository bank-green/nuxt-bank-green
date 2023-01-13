// https://nuxt.com/docs/api/configuration/nuxt-config

import en from "./lang/en.json";

export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/prismic"],
  prismic: {
    endpoint: "https://bankgreen.prismic.io/api/v2",
  },
  vue: {
    compilerOptions: {
      directiveTransforms: {
        clickaway: () => ({
          props: [],
          needRuntime: true,
        }),
      },
    },
  },
  css: ["@/styles/style.css"],
  routeRules: {
    "/sustainable-ethical-banks": { redirect: "/sustainable-eco-banks" },
  },
  app: {
    head: {
      meta: [
        {
          charset: "utf-8",
        },
        {
          "http-equiv": "x-ua-compatible",
          content: "IE-edge",
        },
        {
          "http-equiv": "Content-Language",
          content: "en",
        },
        {
          name: "apple-mobile-web-app-title",
          content: "Find Ethical & Sustainable Banks In Your Area - Bank.Green",
        },
        {
          name: "application-name",
          content: "Bank.Green",
        },
        {
          name: "msapplication-TileColor",
          content: "#12141d",
        },
        {
          name: "theme-color",
          content: "#12141d",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
        {
          name: "referrer",
          content: "origin",
        },
        {
          name: "description",
          content:
            "Bank.Green is sounding the alarm on the climate-destroying activities of banks while recommending sustainable alternatives and empowering consumer action.",
        },
        {
          property: "og:title",
          content: "Find Ethical & Sustainable Banks In Your Area - Bank.Green",
        },
        {
          property: "og:description",
          content:
            "Bank.Green is sounding the alarm on the climate-destroying activities of banks while recommending sustainable alternatives and empowering consumer action.",
        },
        {
          property: "og:image",
          content: "https://bank.green/img/social/social-1664-971.jpg",
        },
        {
          property: "og:image:width",
          content: "1665",
        },
        {
          property: "og:image:height",
          content: "971",
        },
        {
          property: "twitter:image",
          content: "https://bank.green/img/social/social-1664-971.jpg",
        },
        {
          property: "og:locale",
          content: "en",
        },
        {
          name: "facebook-domain-verification",
          content: "wf6ta1yzc1rnykp1b7jj8vov1c4amh",
        },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
        {
          rel: "mask-icon",
          href: "/safari-pinned-tab.svg",
          color: "#12141D",
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
    dirs: ["slices"],
  },
});
