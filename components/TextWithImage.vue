<template>
  <div class="flex flex-col p-4 gap-4">
    <NuxtImg
      :src="img"
      class="w-full md:w-3/4"
    />
    <div class="flex flex-col gap-2 prose xl:prose-sm">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  img: string,
  description: string
}>()

</script>
