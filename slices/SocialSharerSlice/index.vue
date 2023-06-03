<template>
  <div class="flex justify-center">
    <SocialSharer class="text-sushi-500" :url="hostUrl" :hashtags="[
      'climatecrisis',
      'fossilbanks',
    ]" :large="true" />
  </div>
</template>

<script setup lang="ts">
import { getSliceComponentProps } from "@prismicio/vue";

const hostUrl = process.env.HOST as string;

defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));
</script>

<style scoped>

</style>
