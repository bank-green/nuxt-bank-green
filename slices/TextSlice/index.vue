<template>
  <PrismicRichText :field="slice.primary.text" />
</template>

<script setup lang="ts">
import { getSliceComponentProps } from "@prismicio/vue";

defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));
</script>

<style scoped>
.section {
  background: #f7f7f7;
  color: #111;
  padding: 4em;
  text-align: center;
}

.title {
  margin-bottom: 2em;
}
</style>
