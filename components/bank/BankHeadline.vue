<template>
  <div class="relative col-span-2 md:col-span-1 flex items-end">
    <div class="flex-1 flex items-center md:mt-8">
      <div class="relative w-14 h-14 mr-4 rounded-lg">
        <ClearbitLogo
          :url="website"
          :size="56"
          img-class="absolute inset-0 z-20 w-full"
        />
      </div>
      <div>
        <h1
          class="text-xl md:text-2xl text-gray-800 font-medium md:font-semibold tracking-wider flex items-center"
        >
          {{ name }}
        </h1>
        <div
          v-if="prismicFieldSubtitle"
          class="text-lg md:text-xl text-gray-500"
        >
          <PrismicRichText :field="prismicFieldSubtitle" />
        </div>
        <div v-if="inheritBrandRating" class="text-xs text-gray-500">
          Deposits or policies controlled by
          <NuxtLink
            class="underline"
            :to="`/banks/${inheritBrandRating.tag}`"
          >
            {{ inheritBrandRating.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ClearbitLogo from '@/components/icons/ClearbitLogo.vue'

defineProps({
  name: String,
  website: String,
  inheritBrandRating: {
    name: String,
    tag: String
  },
  prismicFieldSubtitle: undefined
})
</script>
