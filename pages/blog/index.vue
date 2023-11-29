<template>
  <div class="page bg-sushi-50">
    <div v-if="posts">
      <div class="page-fade-in contain pt-28 pb-16">
        <h1 class="text-2xl font-semibold whitespace-pre-line mb-4">
          Bank.Green Blog: Stories and Tips for Divesting From Fossil Fuels
        </h1>
        <div
          class="-mx-4 mt-6 pt-10 grid gap-16 md:grid-cols-2 md:gap-x-5 md:gap-y-12"
        >
          <BlogCard
            v-for="post in posts"
            :key="post.uid"
            :to="`/blog/${post.uid}`"
            :date="post.data.publicationdate"
            :description="asText(post.data.description)"
            :image="getImageSrc(post)"
            :title="post.data.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { asText } from '@prismicio/helpers'
import BlogCard from '@/components/blog/BlogCard.vue'

const { client } = usePrismic()

const { data: posts } = await useAsyncData('blogposts', () =>
  client.getAllByType('blogpost', {
    orderings: { field: 'my.blogpost.publicationdate', direction: 'desc' }
  })
)

const getImageSrc = post =>
  post.data.cardimage?.url ||
  post.data.slices.find(s => s.slice_type === 'image_slice').primary.image
    .url ||
  ''

useHead({
  title: 'Bank Green Blog: Learn How to Divest From Fossil Fuels',
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      hid: 'canonical',
      rel: 'canonical',
      href: 'https://bank.green/blog'
    }
  ],
  meta: [
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Bank Green' },
    { property: 'og:url', content: 'https://bank.green/blog' },
    { name: 'description', content: 'Read the Bank.Green blog for stories and tips about divesting from fossil fuels.' }
  ]
})
</script>
