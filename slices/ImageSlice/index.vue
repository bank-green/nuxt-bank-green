<template>
  <figure>
    <img class="mx-auto" :alt="slice.primary.image.alt" :src="slice.primary.image.url" :style="{
      'max-width': `100%`,
    }" />
    <figcaption>
      <PrismicRichText class="text-center" :field="slice.primary.caption" />
    </figcaption>
  </figure>
</template>

<script>
import { getSliceComponentProps } from '@prismicio/vue';
export default {
  name: "BlogImage",
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
