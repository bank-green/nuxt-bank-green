<template>
  <div class="flex flex-row p-4 gap-4 bg-white align-top rounded-lg">
    <NuxtImg
      :src="img"
      class="w-1/12 h-min"
    />
    <div class="flex flex-col gap-2">
      <h1 class="font-bold">{{ title }}</h1>
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
