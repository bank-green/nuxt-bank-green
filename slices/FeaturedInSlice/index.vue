<template>
  <img
    :src="`${slice.primary.logo.url}&w=400`"
    :alt="slice.primary.logo.alt"
    :class="slice.primary.class ?? 'h-8 w-auto'"
  >
</template>

<script setup lang="ts">
import { getSliceComponentProps } from '@prismicio/vue'

defineProps(getSliceComponentProps(['slice', 'index', 'slices', 'context']))
</script>

<style scoped></style>
