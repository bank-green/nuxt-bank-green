<template>
  <div class="flex flex-col p-4 gap-2 bg-white rounded-tl-[80px] rounded-br-[80px] items-center">
    <NuxtImg
      :src="img"
      width="60"
    />
    <div class="flex flex-col items-center prose md:prose-sm">
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
