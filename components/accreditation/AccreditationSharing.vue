<script lang="ts" setup>
import type { AccreditationpageDocumentData } from 'prismicio-types'
import type { Step } from './AccreditationSharingStep.vue'

interface Props {
  title?: AccreditationpageDocumentData['sharing_title']
  steps: {
    step1: Step
    step2: Step
  }
}

withDefaults(defineProps<Props>(), {
  title: 'With just a few clicks, you can do so much more...',
})
</script>

<template>
  <section
    style="
        background-image: url('/img/illustrations/landscape-2.svg');
        background-position: center bottom;
        background-repeat: no-repeat;
        background-size: contain;
    "
    class="flex flex-col gap-10 lg:gap-20 items-center min-h-[1400px] px-6 lg:px-28 py-16 lg:py-20 bg-white"
  >
    <h1 class="text-2xl lg:text-4xl text-center font-bold text-gray-800">
      {{ title }}
    </h1>

    <AccreditationSharingSteps :steps="steps" />
  </section>
</template>
