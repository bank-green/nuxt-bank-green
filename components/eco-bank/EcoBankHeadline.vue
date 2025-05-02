<script setup lang="ts">
import ClearbitLogo from '@/components/icons/ClearbitLogo.vue'

defineProps<{
  website: string
  name: string
  inheritBrandRating?: {
    tag: string
    name: string
  }
}>()
</script>

<template>
  <div class="relative col-span-2 md:col-span-1 flex items-center md:-mt-8">
    <div class="flex-1 flex items-center">
      <div class="relative w-14 h-14 mr-4 rounded-lg">
        <ClearbitLogo
          :url="website"
          :size="56"
        />
      </div>
      <div>
        <h1
          class="text-xl md:text-2xl text-gray-800 font-medium md:font-semibold tracking-wider flex items-center"
        >
          {{ name }}
        </h1>
        <div
          v-if="inheritBrandRating"
          class="text-xs text-gray-500"
        >
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
