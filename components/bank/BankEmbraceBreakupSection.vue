<template>
  <div id="section-breakup" class="relative bg-blue-100">
    <Swoosh direction="down" />
    <div
      class="flex flex-col justify-center items-center rounded-xl py-6 md:py-12 px-6 md:px-16 gap-8"
    >
      <h2
        class=" text-gray-800 'w-full text-center font-semibold text-xl md:text-3xl tracking-wider mb-8 md:mb-4 max-w-xl"
      >
        {{ title || "Break Up with Your Bank: Say No to Funding Climate Change" }}
      </h2>
      <div
        class="flex flex-col lg:flex-row items-center justify-center lg:space-x-8"
      >
        <div class="lg:w-1/2 max-w-md text-lg md:text-2xl tracking-wide mb-1 md:mb-4 text-gray-800">
          <PrismicRichText v-if="!!description && description.length > 0" :field="description" />
          <p v-else>
            Let your old bank know you've switching to an institution that aligns with your values and supports a sustainable future.
          </p>
        </div>
        <CheckList
          class="lg:w-1/2 my-6 md:text-xl"
          :list="[
            checklistItems[0] || 'Combat Climate Change: Switch to a bank that doesn\'t fund fossil fuels to help combat climate change.',
            checklistItems[1] || 'Protect the Environment: Choose a bank that prioritizes clean energy and environmental protection.',
            checklistItems[2] || 'Voice Your Concerns: Send a clear message to your old bank that their lending practices matter to you.',
          ]"
        />
      </div>
      <div ref="embraceForm" class="relative z-10 max-w-7xl flex flex-col-reverse lg:flex-row items-center bg-sushi-50 rounded-2xl">
        <Embrace />
      </div>
      <slot name="footer-image" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { KeyTextField, RichTextField } from '@prismicio/types'

defineProps<{
  title?: KeyTextField,
  description?: RichTextField,
  checklistItems:(RichTextField | undefined)[]
}>()
</script>
