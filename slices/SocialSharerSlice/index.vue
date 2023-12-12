<template>
  <div class="flex justify-center">
    <SocialSharer
      class="text-sushi-500"
      url="https://bank.green"
      :text="asText(slice?.primary.text)!"
      :hashtags="['climatecrisis', 'fossilbanks']"
      :large="true"
    />
  </div>
</template>

<script setup lang="ts">
import { getSliceComponentProps } from '@prismicio/vue'
import { asText } from '@prismicio/helpers'

defineProps(getSliceComponentProps(['slice', 'index', 'slices', 'context']))
</script>

<style scoped></style>
