<script setup lang="ts">
import { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.TextWithImageSliceSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
 
</template>
