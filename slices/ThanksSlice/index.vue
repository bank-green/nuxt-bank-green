<template>
  <ThanksSection
    :title="asText(slice?.primary.title)!"
    :description="asText(slice?.primary.description)!"
    :show-explore-section="slice?.primary.show_explore_section"
  />
</template>

<script setup lang="ts">
import { getSliceComponentProps } from '@prismicio/vue'
import { asText } from '@prismicio/helpers'

defineProps(getSliceComponentProps(['slice', 'index', 'slices', 'context']))
</script>
