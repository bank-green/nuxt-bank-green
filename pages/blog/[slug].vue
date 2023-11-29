<template>
  <div v-if="true">
    <div>
      <div class="page-fade-in contain pb-8 sm:pb-10 md:pb-12 pt-24 sm:pt-32">
        <div class="max-w-3xl mx-auto mt-4 mb-8 sm:text-center">
          <h1 class="text-2xl sm:text-5xl font-extrabold text-sushi-900 mb-4">
            {{ post?.data.title }}
          </h1>
          <span v-if="isUpdated" class="text-base text-gray-700 font-semibold">
            Updated {{ modifiedDateDisplay }} by {{ post?.data.author }}
          </span>
          <span
            v-else
            class="text-base text-gray-700 font-semibold"
          >
            Posted {{ publishedDateDisplay }} by {{ post?.data.author }}
          </span>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div
            style="width: 100%"
            class="prose sm:prose-lg xl:prose-xl break-words"
          >
            <SliceZone
              :slices="post?.data.slices ?? []"
              :components="comps"
              :context="{ takeaction: true }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-blue-100 text-gray-800">
      <Swoosh direction="down" />
      <div class="contain">
        <div class="flex justify-center">
          <CallToAction class="max-w-5xl" :light="true" />
        </div>
      </div>
      <div class="flex items-end justify-end pointer-events-none">
        <div class="w-11/12">
          <LottiePlayer path="/anim/wind_2_without_bg.json" />
        </div>
      </div>
    </div>
  </div>
  <div
    v-else-if="error"
    class="w-full h-screen flex items-center justify-center flex flex-col items-center"
  >
    <p class="text-4xl font-bold">
      No blog found
    </p>
    <NuxtLink
      class="mt-2 border-b border-primary-dark"
      to="/blog"
    >
      Go back to Blogs
    </NuxtLink>
  </div>
  <div v-else class="w-full h-screen flex items-center justify-center">
    <span>
      <svg
        width="32"
        height="32"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 561 553"
        style="animation: ring 2s linear infinite"
      >
        <path
          d="M478 0A481 481 0 0 0 0 485v76h75c264 0 478-217 478-485V0h-75z"
          fill="#6C9039"
        />
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'

const route = useRoute()
const error = ref(false)

const { client } = usePrismic()
const slug = route.path.split('/').at(-1) ?? ''
const { data: post } = await useAsyncData(slug, () =>
  client.getByUID('blogpost', slug)
)

const comps = ref(defineSliceZoneComponents(components))

const publishedDateDisplay = computed(() => {
  if (!post.value?.first_publication_date) {
    return ''
  }
  const date = new Date(post.value?.first_publication_date)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const modifiedDateDisplay = computed(() => {
  if (!post.value?.last_publication_date) {
    return ''
  }
  const date = new Date(post.value?.last_publication_date)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const isUpdated = computed(() => {
  return (
    post.value?.first_publication_date !==
    post.value?.last_publication_date
  )
})

const getDescription = (p: typeof post) => {
  const array = p.value?.data?.description ?? []
  for (const item of array) {
    if (item.type === 'paragraph') {
      return item.text
    }
  }
  return ''
}

const title = post.value?.data?.title ?? 'Blog Post'
const description = getDescription(post)

const url = computed(() => {
  return `https://bank.green/blog/${slug}`
})

useHead({
  title,
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      hid: 'canonical',
      rel: 'canonical',
      href: url.value
    }
  ],
  meta: [
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:type', content: 'article' },
    { property: 'og:site_name', content: 'Bank Green' },
    { property: 'article:published_time', content: post.value?.first_publication_date ?? '' },
    { property: 'article:modified_time', content: post.value?.last_publication_date ?? '' },
    { property: 'og:url', content: url.value },
    { property: 'og:image', content: post.value?.data.cardimage.url ?? '' },
    { property: 'og:image:alt', content: post.value?.data.cardimage.alt ?? title },
    { property: 'og:image:width', content: post.value?.data.cardimage.dimensions?.width ?? 1200 },
    { property: 'og:image:height', content: post.value?.data.cardimage.dimensions?.height ?? 630 },
    { property: 'og:title', content: title },
    { name: 'apple-mobile-web-app-title', content: title },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: post.value?.data.cardimage.url ?? '' },
    { name: 'twitter:site', content: '@BankGreen_' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:label1', content: 'Written by' },
    { name: 'twitter:data1', content: post.value?.data.author ?? '' },
    { name: 'twitter:label2', content: 'Published on' },
    { name: 'twitter:data2', content: publishedDateDisplay.value },
    { property: 'og:description', content: description },
    { name: 'description', content: description },
    { name: 'robots', content: 'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large' }
  ]
})

useJsonld({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': url.value
  },
  headline: title,
  image: post.value?.data.cardimage.url ?? '',
  datePublished: post.value?.first_publication_date ?? '',
  dateModified: post.value?.last_publication_date ?? ''
})
</script>

<style></style>
