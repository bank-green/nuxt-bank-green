<template>
  <div ref="container" />
</template>

<script setup>
const props = defineProps({
  path: String,
})
const path = toRef(props, 'path')
const { container } = useLottieLooper({ path })
</script>
