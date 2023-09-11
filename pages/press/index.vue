<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain pt-28 pb-16">
        <article
          class="prose-h1:text-2xl prose-h1:font-semibold prose-p:leading-10 prose-p:text-gray-600"
        >
          <SliceZone
            :slices="press?.data.slices ?? []"
            :components="sliceComps"
          />
        </article>

        <div
          class="-mx-4 mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12"
        >
          <BlogCard
            v-for="post in posts ?? []"
            :key="post.uid"
            :to="`/press/${post.uid}`"
            :date="post.data.releasedate"
            :description="asText(post.data.description)"
            :title="post.data.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineSliceZoneComponents } from '@prismicio/vue'
import { asText } from '@prismicio/helpers'
import BlogCard from '@/components/blog/BlogCard.vue'
import { components } from '~~/slices'

const { client } = usePrismic()
const { data: posts } = await useAsyncData('pressposts', () =>
  client.getAllByType('presspost')
)
const { data: press } = await useAsyncData('press', () =>
  client.getSingle('presspage')
)
const sliceComps = ref(defineSliceZoneComponents(components))

usePrismicSEO(press.value.data)
</script>
