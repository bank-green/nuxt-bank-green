<template>
  <div class="flex justify-center">
    <TeamMember
      :name="asText(slice.primary.name)!"
      :description="asText(slice.primary.description)!"
      :img="asImageSrc(slice?.primary.img)!"
      :href="asLink(slice?.primary.link)!"
    />
  </div>
</template>

<script setup lang="ts">
import { getSliceComponentProps } from '@prismicio/vue'
import { asText, asLink, asImageSrc } from '@prismicio/helpers'

defineProps(getSliceComponentProps(['slice', 'index', 'slices', 'context']))
</script>

<style scoped></style>
