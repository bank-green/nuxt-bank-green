<template>
  <li
    class="border border-gray-200 rounded-2xl lg:rounded-3xl bg-gray-light shadow-soft"
  >
    <div class="flex justify-center items-center w-10 lg:w-20 h-10 lg:h-20 text-white font-bold leaf">
      <span class="text-2xl lg:text-5xl">{{ num }}</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 px-6 lg:px-16 pt-6 pb-10 lg:py-10">
      <div>
        <h2 class="mb-4 text-2xl lg:text-3xl font-bold text-gray-800">
          {{ step.title }}
        </h2>
        <PrismicRichText
          :field="step.description"
        />
      </div>

      <slot />
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { AccreditationpageDocumentData } from 'prismicio-types'

export interface Step {
  title?: AccreditationpageDocumentData['step1_title'] | AccreditationpageDocumentData['step2_title']
  description?: AccreditationpageDocumentData['step1_description'] | AccreditationpageDocumentData['step2_description']
}
export interface Props {
  step: Step
  num: number
}

defineProps<Props>()
</script>

<style scoped>
.leaf {
  position: absolute;
  transform: translateX(-25%) translateY(-25%);
  background-image: url('/img/logos/bankgreen-logo.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

@media screen and (min-width: 1028px) {
  .leaf {
    transform: translateX(-50%) translateY(25%);
  }
}
</style>
