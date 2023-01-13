<template>
  <p class="text-center py-2">
    <NuxtLink class="button-green inline-block w-auto no-underline" :to="slice?.primary.link"><span
        class="text-white no-underline">{{ slice?.primary.label }}</span></NuxtLink>
  </p>
</template>

<script>
import { getSliceComponentProps } from "@prismicio/vue";

export default {
  name: "ButtonSlice",
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
