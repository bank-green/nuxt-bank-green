<template>
  <div class="contain py-10">
    <div class="text-center relative">
      <LottiePlayer
        class="absolute -top-28 inset-x-0 w-64 mx-auto"
        path="/anim/pop.json"
      />

      <svg
        class="mx-auto relative z-1"
        width="119"
        height="51"
        viewBox="0 0 119 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="62.5"
          cy="25.0222"
          r="25"
          fill="#87B448"
        />
        <path
          d="M53.5 24.3603L59.9413 30.8015L71.5 19.2428"
          stroke="white"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <h1
        v-if="title"
        class="mt-8 text-lg lg:text-2xl font-semibold whitespace-pre-line mb-2"
      >
        {{ title }}
      </h1>
      <h2
        v-if="subtitle"
        class="sm:text-md md:text-lg lg:text-xl font-semibold whitespace-pre-line mb-2"
      >
        {{ subtitle }}
      </h2>
      <p
        v-if="description"
        class="text-gray-700 text-base lg:text-lg "
      >
        {{ description }}
      </p>
    </div>
  </div>
  <Swoosh
    v-if="getSliceBoolean(showExploreSection)"
    direction="up"
    color="text-pistachio-green"
  />
  <div
    v-if="getSliceBoolean(showExploreSection)"
    class="relative py-8 sm:py-16 bg-pistachio-green"
  >
    <div class="contain sm:text-center">
      <h4
        class="font-semibold text-xl text-gray-800 mb-6 sm:text-2xl tracking-wide"
      >
        Bank on a better future
      </h4>
      <p class="text-gray-500 mb-6">
        Not happy with your bank’s score? Explore sustainable banks in your
        area.
      </p>
      <ThanksTopEcoBanksWidget />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSliceBoolean } from '@/utils/prismic/conversions'

withDefaults(defineProps<{
  title: string
  subtitle?: string
  description?: string
  showExploreSection?: boolean | null
}>(),
{
  showExploreSection: true,
},
)
</script>
