<script setup lang="ts">
defineProps({
  name: String,
  href: String,
  img: String,
  description: String,
})
</script>

<template>
  <li class="flex flex-col gap-4 items-center w-full md:max-w-xs lg:max-w-sm justify-self-center">
    <span class="w-32 h-32 bg-gray-200 rounded-full">
      <NuxtImg
        v-if="!!img"
        :src="img"
        width="128"
        height="128"
        provider="none"
        class="object-center object-cover w-32 h-32 shadow-lg rounded-full overflow-hidden bg-gray-900"
        loading="lazy"
      />
    </span>
    <a
      v-if="href"
      ref="noopener"
      :href="href"
      target="_blank"
      class="text-xl leading-6 font-semibold hover:underline"
    >{{
      name
    }}</a>
    <h3
      v-else
      class="text-xl leading-6 font-semibold"
    >
      {{ name }}
    </h3>
    <p class="text-lg font-normal">
      {{ description }}
    </p>
  </li>
</template>
