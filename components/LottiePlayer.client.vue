<template>
  <RenderWhenVisibleInViewPort
    :placeholder-width="placeholderWidth"
    :placeholder-height="placeholderHeight"
    :options="{ rootMargin: '200px' }"
  >
    <LazyLottieFile :path="path" />
  </RenderWhenVisibleInViewPort>
</template>

<script setup>
import RenderWhenVisibleInViewPort from './func/RenderWhenVisibleInViewPort.client.vue'

const props = defineProps({
  placeholderWidth: Number,
  placeholderHeight: Number,
  path: String
})
</script>
