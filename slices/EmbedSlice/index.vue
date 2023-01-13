<template>
  <div class="youtube" v-if="slice?.primary.target.provider_name === 'YouTube'"
    v-html="fixYoutube(slice.primary.target.html)">
  </div>
  <div v-else-if="slice?.primary.target.provider_name === 'Instagram'" v-html="slice.primary.target.html">
  </div>
  <div v-else>
    <pre>
      {{ JSON.stringify(slice?.primary.target, null, 2) }}
    </pre>
  </div>
</template>

<script setup>
import { getSliceComponentProps } from "@prismicio/vue";

function fixYoutube(html) {
  const widthRe = /width="\d+"/
  const heightRe = /height="\d+"/
  return html.replace(widthRe, `width=100%`).replace(heightRe, `height=100%`)
}

const props = defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]))
</script>

<style scoped>
.youtube {
  width: 100%;
  height: auto;
  max-width: 100%;
  position: relative;
  aspect-ratio: 1.77917 / 1;
}
</style>
