<template>
  <div class="page-fade-in contain py-32">
    <h2 class="mb-6 text-3xl leading-9 font-bold text-gray-800">
      <PrismicRichText
        :field="notfound?.data.text1"
        fallback="Page not Found"
      />
    </h2>

    <NuxtLink
      to="/"
      class="flex items-center text-sm font-bold text-gray-700 hover:text-gray-800 transition"
    >
      <svg
        class="w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"
        />
      </svg>
      {{ asText(notfound?.data.text2) || 'Go Back' }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { asText } from '@prismicio/helpers'
useHeadHelper('404')
const { client } = usePrismic()
const { data: notfound } = await useAsyncData('notfound', () =>
  client.getByUID('textonlypages', 'notfound'))
</script>
