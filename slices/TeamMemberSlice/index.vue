<template>
  <div class="flex justify-center">
    <TeamMember
      :name="asText(slice.primary.name)!"
      :description="asText(slice.primary.description)!"
      :img="asText(slice.primary.imgsrc)!"
      :href="asLink(slice?.primary.link)!"
    />
  </div>
</template>

<script setup lang="ts">
import { getSliceComponentProps } from '@prismicio/vue'
import { asText, asLink } from '@prismicio/helpers'

defineProps(getSliceComponentProps(['slice', 'index', 'slices', 'context']))
</script>

<style scoped></style>
