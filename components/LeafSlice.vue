<template>
  <div class="flex-col p-4">
    <NuxtImg
      :src="img"
      width="524"
    />
    <article>
      <h1><b>{{ title }}</b></h1>
      <p>{{ description }}</p>
    </article>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  img: String,
  description: String
})

</script>
