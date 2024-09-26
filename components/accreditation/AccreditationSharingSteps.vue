<template>
  <ol class="flex flex-col gap-16 max-w-5xl">
    <AccreditationSharingStep
      :num="1"
      :step="step1"
    />

    <AccreditationSharingStep
      :num="2"
      :step="step2"
    >
      <div class="flex flex-col gap-4">
        <BankLocationSearch
          v-model="bank"
        />
        <NuxtLink
          :to="`/banks/${bank?.['tag']}`"
          class="button-green"
          :class="{ disabled: !bank }"
        >
          Check My Bank
        </NuxtLink>
      </div>
    </AccreditationSharingStep>
  </ol>
</template>

<script lang="ts" setup>
import type { Step } from './AccreditationSharingStep.vue'
import BankLocationSearch from '@/components/forms/BankLocationSearch.vue'

interface Props {
  steps: {
    step1: Step
    step2: Step
  }
}

const props = defineProps<Props>()

const step1 = {
  title: props.steps.step1.title ?? 'Share the message',
  description: props.steps.step1.description ?? [{
    type: 'paragraph',
    text: 'Spreading the word about green banking is crucial to help raise awareness about the importance of sustainable financial practices and let business owners know you appreciate their commitment to a greener future. Every share contributes to a larger movement for positive change.',
    spans: [{
      start: 211,
      end: 277,
      type: 'strong',
    }],
  }],
}

const step2 = {
  title: props.steps.step2.title ?? 'Check your own bank',
  description: props.steps.step2.description ?? [{
    type: 'paragraph',
    text: 'Use our bank-checking tool to ensure your money is supporting environmentally responsible financial institutions. This tool helps you make informed decisions about where to bank, aligning your savings with your values and contributing to a more sustainable world.',
    spans: [],
  }],
}

const { bank } = useContactForm()
</script>
