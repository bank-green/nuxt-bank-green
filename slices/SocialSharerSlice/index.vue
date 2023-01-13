<template>
  <div class="flex justify-center">
    <SocialSharer class="text-sushi-500" url="https://bank.green" :hashtags="[
      'climatecrisis',
      'fossilbanks',
    ]" :large="true" />
  </div>
</template>

<script>
import { getSliceComponentProps } from "@prismicio/vue";

export default {
  name: "SocialSharerSlice",
  // The array passed to `getSliceComponentProps` is purely optional and acts as a visual hint for you
  props: getSliceComponentProps(["slice", "index", "slices", "context"]),
}
</script>

<style scoped>

</style>
