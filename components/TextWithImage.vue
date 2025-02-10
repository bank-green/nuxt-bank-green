<template>
  <div class="flex gap-4">
    <NuxtImg
      :src="img"
      :class="imgClasses || 'w-full'"
    />
    <div class="flex flex-col prose lg:prose-lg">
      <h3
        v-if="title"
        class="md:!text-xl lg:!text-2xl !font-bold"
      >
        {{ title }}
      </h3>
      <p class="!text-ocean-blue !text-opacity-75">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  img: string
  description: string
  imgClasses?: string
}>()
</script>
