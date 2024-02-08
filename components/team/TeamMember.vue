<template>
  <li class="flex flex-col gap-4 items-center w-full lg:w-96">
    <NuxtImg
      :src="img"
      width="128"
      height="128"
      provider="none"
      class="object-center object-cover w-32 h-32 shadow-lg rounded-full overflow-hidden bg-gray-900"
      loading="lazy"
    />
    <a v-if="href" ref="noopener" :href="href" target="_blank" class="text-xl leading-6 font-semibold hover:underline">{{
      name
    }}</a>
    <h3 v-else class="text-xl leading-6 font-semibold">
      {{ name }}
    </h3>
    <p class="text-lg font-normal">
      {{ description }}
    </p>
  </li>
</template>

<script setup lang="ts">
defineProps({
  name: String,
  href: String,
  img: String,
  description: String
})
</script>
