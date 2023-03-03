<template>
  <nuxt-img :src="slice.primary.logo.url" :alt="slice.primary.logo.alt" :class="slice.primary.class ?? 'h-10 w-auto'"
    sizes="md:400px" />
</template>

<script>
import { getSliceComponentProps } from "@prismicio/vue";

export default {
  name: "FeaturedInSlice",
  // The array passed to `getSliceComponentProps` is purely optional and acts as a visual hint for you
  props: getSliceComponentProps(["slice", "index", "slices", "context"]),
}
</script>

<style scoped></style>
