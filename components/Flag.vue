<template>
  <NuxtImg
    v-if="country && country != -1"
    :src="`/img/flags/${country.toLowerCase()}.png`"
    class="bg-no-repeat bg-center bg-contain"
    provider="none"
    loading="lazy"
  />
  <span v-else />
</template>

<script setup>
defineProps({
  country: String,
})
</script>
