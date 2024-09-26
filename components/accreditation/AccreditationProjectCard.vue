<template>
  <a
    :href="link"
    class="relative flex flex-col justify-end items-start p-6 gap-2 rounded-xl max-w-[347.12px] h-[240px] overflow-hidden"
  >
    <p class="z-10 flex items-center gap-1 rounded-full w-fit pl-2 pr-3 py-1.5 bg-[#F6E9BA] ">
      <PinIcon class="w-4 h-4" />
      <span class="text-sm text-gray-700">
        {{ location }}
      </span>
    </p>
    <p class="text-2xl font-bold text-white z-10">
      {{ title }}
    </p>
    <NuxtImg
      v-if="image.url"
      alt=""
      class="absolute inset-0 z-0 w-full h-full object-cover rounded-xl"
      loading="lazy"
      :src="title?.includes('Project Default') ? image.url : asImageSrc(image)"
      :provider="title?.includes('Project Default') ? 'none' : ''"
    />
  </a>
</template>

<script lang="ts" setup>
import { asImageSrc } from '@prismicio/helpers'
import type { AccreditationpageDocumentDataProjectsItem } from 'prismicio-types'
import PinIcon from '~/components/forms/location/PinIcon.vue'

interface Props extends Pick<AccreditationpageDocumentDataProjectsItem, 'title' | 'location' | 'image'> {
  link: string
}
defineProps<Props>()
</script>
