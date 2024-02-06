<template>
  <div class="flex flex-row p-8 gap-4 bg-white items-start rounded-lg">
    <NuxtImg
      :src="img"
      width="56"
    />
    <div class="flex flex-col prose lg:prose-lg">
      <h3 class="md:!text-xl lg:!text-2xl !font-bold">
        {{ title }}
      </h3>
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
