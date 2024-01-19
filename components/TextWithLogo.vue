<template>
  <div class="flex-col p-4 gap-4">
    <NuxtImg
      :src="img"
      class="w-full md:w-3/4"
    />
    <div>
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
