<script setup>
const props = defineProps({
  path: String,
})
const path = toRef(props, 'path')
const { container } = useLottieLooper({ path })
</script>

<template>
  <div ref="container" />
</template>
