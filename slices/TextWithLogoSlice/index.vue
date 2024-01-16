<template>
  <div class="flex-col p-4">
    <NuxtImg
      :src="slice.primary.logo?.url"
      :alt="slice.primary.logo.alt"
      width="524"
    />
    <article>
      <h1><b>{{ slice.primary.title }}</b></h1>
      <p>{{ slice.primary.description }}</p>
    </article>
  </div>
</template>

<script setup lang="ts">
import { getSliceComponentProps } from '@prismicio/vue'
defineProps(getSliceComponentProps(['slice', 'index', 'slices', 'context']))
</script>
