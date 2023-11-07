<script setup lang="ts">
import { getSliceComponentProps } from '@prismicio/vue'

defineProps(getSliceComponentProps(['slice', 'index', 'slices', 'context']))

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.

</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    Placeholder component for team_member_slice (variation:
    {{ slice.variation }}) Slices
  </section>
</template>
