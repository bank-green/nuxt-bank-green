<template>
  <div
    class="md:text-2xl tracking-wide mb-4 prose"
    v-html="processedText"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { terms } from '../../utils/glossary.js'

// Define props for the component
const props = defineProps<{
  text: string
}>()

// Computed property to process text and replace terms with tooltips
const processedText = computed(() => {
  let modifiedText = props.text
  terms.forEach((term) => {
    const regex = new RegExp(`\\b${term.name}\\b`, 'gi') // Create a regex to match the term case-insensitively
    modifiedText = modifiedText.replace(regex, `<a href="/glossary" class="tooltip" data-tooltip="${term.tooltip}">${term.name}</a>`)
  })
  return modifiedText
})
</script>

<style scoped>
.tooltip {
  position: relative;
  cursor: pointer;
  color: rgb(19, 110, 9);
  text-decoration: none !important;
}

.tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 0.5em;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s;
  z-index: 100;
}

.tooltip:hover::after {
  opacity: 1;
  visibility: visible;
}
</style>
