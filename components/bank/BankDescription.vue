<template>
  <div
    class="md:text-2xl tracking-wide mb-4 prose"
    v-html="processedText"
  />
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { addGlossaryToText } from '~/utils/addGlossaryToText'

const props = defineProps<{ text: string }>()
const processedText = ref(props.text) // Default to initial text

const { client } = usePrismic()
const { data: glossarypage } = await useAsyncData('glossary', () => client.getSingle('glossarypage'))
usePrismicSEO(glossarypage?.value?.data)

onMounted(async () => {
  const glossaryData = glossarypage?.value?.data
  if (glossaryData?.terms) {
    const terms = glossaryData.terms.map(term => ({
      name: term.term,
      tooltip: term.tooltip,
    }))
    processedText.value = addGlossaryToText(props.text, terms)
  }
})

watch(() => props.text, (newText) => {
  processedText.value = addGlossaryToText(newText, glossaryData?.terms)
})
</script>

<style>
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
  right: 0; /* Align the right edge of the tooltip with the right edge of the term */
  white-space: nowrap;
  background-color: #1f2937;
  color: #fff;
  padding: 0.5em;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s;
  z-index: 100;
  font-size: small;
  max-width: 392px;
  min-width: 350px;
  white-space: normal;
}

.tooltip:hover::after {
  opacity: 1;
  visibility: visible;
}

@media (max-width: 768px) {
  .tooltip::after {
    display: none; /* Disable tooltips on mobile */
  }
}
</style>
