<template>
  <div class="flex flex-col p-6 md:p-4 lg:p-6 gap-4 bg-white rounded-tl-[80px] rounded-br-[80px] items-center" style="box-shadow: 0px 8px 20px 4px rgba(0, 0, 0, 0.10);;">
    <NuxtImg
      :src="img"
      width="60"
    />
    <div class="flex flex-col gap-2 text-center items-center prose lg:prose-md">
      <h3 class="md:!text-xl lg:!text-2xl !font-bold">
        {{ title }}
      </h3>
      <p class="!text-ocean-800 !text-opacity-75">
        {{ description }}
      </p>
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
