<template>
  <div>
    <div class="page-fade-in contain pb-8 sm:pb-10 md:pb-12 pt-24 sm:pt-32">
      <div class="max-w-3xl mx-auto mt-4 mb-8 sm:text-center">
        <h1 class="text-2xl sm:text-5xl font-extrabold text-sushi-900 mb-4">
          {{ post?.data.title }}
        </h1>
        <div
          class="flex sm:items-center justify-between sm:text-center sm:justify-around my-8"
        >
          <div>
            <div class="uppercase text-xs text-gray-500">
              Contact
            </div>
            <div class="text-sm text-gray-700 font-semibold">
              {{ post.data.author }}<br>
              <NuxtLink :to="post.data.email">
                {{ post.data.email }}
              </NuxtLink><br>
              {{ post.data.phone }}
            </div>
          </div>
          <div>
            <div class="uppercase text-xs text-gray-500">
              For immediate release
            </div>
            <div class="text-sm text-gray-700 font-semibold">
              {{ post.data.releasedate }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <div
          style="width: 100%"
          class="prose sm:prose-lg xl:prose-xl break-words"
        >
          <SliceZone :slices="post?.data.slices ?? []" :components="comps" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineSliceZoneComponents } from '@prismicio/vue'

import { components } from '~~/slices'

const route = useRoute()

const { client } = usePrismic()
const slug = route.path.split('/').at(-1)
const { data: post } = await useAsyncData(slug, () =>
  client.getByUID('presspost', slug)
)

const comps = ref(defineSliceZoneComponents(components))

useHeadHelper(
  post?.value?.data?.title ?? 'Press Post',
  post?.value?.data?.description
)
</script>

<style></style>
