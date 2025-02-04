<script setup lang="ts">
import type { Content } from '@prismicio/client'

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.ErrorMessageSlice>([
    'slice',
    'index',
    'slices',
    'context',
  ]),
)
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <h3 class="font-semibold md:!text-lg text-black-700 mr-4">
      {{ slice.primary.title }}
    </h3>
    <PrismicRichText :field="slice.primary.content" />
  </section>
</template>
