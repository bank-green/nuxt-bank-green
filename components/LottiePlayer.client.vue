<script setup>
import RenderWhenVisibleInViewPort from './func/RenderWhenVisibleInViewPort.client.vue'

defineProps({
  placeholderWidth: Number,
  placeholderHeight: Number,
  path: String,
})
</script>

<template>
  <RenderWhenVisibleInViewPort
    :placeholder-width="placeholderWidth"
    :placeholder-height="placeholderHeight"
    :options="{ rootMargin: '200px' }"
  >
    <LazyLottieFile :path="path" />
  </RenderWhenVisibleInViewPort>
</template>
