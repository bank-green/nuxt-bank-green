<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    Placeholder component for table_slice (variation: {{ slice.variation }})
    Slices
  </section>
</template>
<script setup lang="ts">
import { getSliceComponentProps } from '@prismicio/vue'
defineProps(getSliceComponentProps(['slice', 'index', 'slices', 'context']))
</script>
