<template>
  <div class="flex flex-col p-4 gap-2 bg-white rounded-tl-[80px] rounded-br-[80px] items-center">
    <NuxtImg
      :src="img"
      class="w-4/12"
    />
    <div class="flex flex-col items-center prose xl:prose-sm space-y-0">
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
