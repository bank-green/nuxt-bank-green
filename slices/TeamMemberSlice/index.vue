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
    <!-- Placeholder component for team_member_slice (variation:
    {{ slice.variation }}) Slices -->
    <div v-for="(item, index) in slice.items" :key="index">
      <h2>{{ item.name }}</h2>
      <p>{{ item.description }}</p>
      <a :href="item.personal_link.url">Personal Link</a>
      <img :src="item.image.url" :alt="item.image.alt">
    </div>
  </section>
</template>
