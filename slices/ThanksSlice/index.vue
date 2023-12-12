<template>
    <ThanksSection
      :title="asText(slice?.primary.title)!"
      :description="asText(slice?.primary.description)!"
    />
  </template>
  
  <script setup lang="ts">
  import { getSliceComponentProps } from '@prismicio/vue'
  import { asText } from '@prismicio/helpers'
  
  defineProps(getSliceComponentProps(['slice', 'index', 'slices', 'context']))
  </script>
  