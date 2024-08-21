<template>
    <a
      :key= {{ name }}
      :href= {{ url }}
      class="block col-span-6 sm:col-span-3 md:col-span-2 w-full h-40 bg-white rounded-3xl px-8 py-6 hover:shadow-xl transition-all duration-500 ease-in-out filter-grayscale hover:filter-none"
      rel="noopener"
      target="_blank"
    >
      <NuxtImg
        :src= {{ image }}
        class="object-center object-contain w-full h-full"
        loading="lazy"
        provider="none"
      />
    </a>
</template>

<script setup lang="ts">

defineProps({
  name: String,
  img: String,
  url: String
})

</script>
