<template>
  <div class="flex flex-col p-4 gap-4 bg-white">
    <NuxtImg
      :src="img"
      class="w-full md:w-3/4"
    />
    <div class="flex flex-col gap-2 prose xl:prose-sm">
      <h1><b>{{ title }}</b></h1>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  img: String,
  description: String
})

</script>
