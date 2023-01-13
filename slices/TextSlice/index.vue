<template>
  <PrismicRichText :field="slice.primary.text" />
</template>

<script>
import { getSliceComponentProps } from "@prismicio/vue";

export default {
  name: "TextSlice",
  // The array passed to `getSliceComponentProps` is purely optional and acts as a visual hint for you
  props: getSliceComponentProps(["slice", "index", "slices", "context"]),
}
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
