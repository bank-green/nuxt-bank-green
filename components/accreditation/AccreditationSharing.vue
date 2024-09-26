<template>
  <section
    style="
        background-image: url('/img/illustrations/landscape-2.svg');
        background-position: center bottom;
        background-repeat: no-repeat;
        background-size: contain;
    "
    class="flex flex-col items-center min-h-[1400px] px-6 lg:px-28 py-16 lg:py-20 bg-white"
  >
    <h1 class="text-2xl lg:text-4xl font-bold">
      {{ title }}
    </h1>
  </section>
</template>

<script lang="ts" setup>
import type { AccreditationpageDocumentData } from 'prismicio-types'

interface Step {
  title?: AccreditationpageDocumentData['step1_title'] | AccreditationpageDocumentData['step2_title']
  description?: AccreditationpageDocumentData['step1_description'] | AccreditationpageDocumentData['step2_description']
}

interface Props {
  title?: AccreditationpageDocumentData['sharing_title']
  steps?: {
    step1: Step
    step2: Step
  }
}

withDefaults(defineProps<Props>(), {
  title: 'With just a few clicks, you can do so much more...',
  steps: () => ({
    step1: {
      title: 'Share the message',
      description: [{
        type: 'paragraph',
        text: 'Spreading the word about green banking is crucial to help raise awareness about the importance of sustainable financial practices and let business owners know you appreciate their commitment to a greener future. Every share contributes to a larger movement for positive change.',
        spans: [],
      }],
    },
    step2: {
      title: 'Check your own bank',
      description: [{
        type: 'paragraph',
        text: 'Use our bank-checking tool to ensure your money is supporting environmentally responsible financial institutions. This tool helps you make informed decisions about where to bank, aligning your savings with your values and contributing to a more sustainable world.',
        spans: [],
      }],
    },
  }),
})
</script>
