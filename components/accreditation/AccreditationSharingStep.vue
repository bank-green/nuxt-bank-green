<template>
  <li
    class="border border-gray-200 rounded-2xl lg:rounded-3xl max-w-[1020px] bg-gray-light shadow-soft"
  >
    <div class="flex justify-center items-center w-10 lg:w-20 h-10 lg:h-20 text-white font-bold leaf">
      <span class="text-2xl lg:text-5xl">{{ num }}</span>
    </div>

    <div
      class="relative flex flex-col lg:flex-row gap-8 lg:gap-20 px-6 lg:px-16 pt-6 pb-10 lg:py-10 arrow"
      :class="[{ 'arrow-right': num % 2 !== 0 }]"
    >
      <div class="basis-[51%]">
        <h2 class="mb-4 text-2xl lg:text-3xl font-bold text-gray-800">
          {{ step.title }}
        </h2>
        <PrismicRichText
          :field="step.description"
        />
      </div>

      <div class="flex-auto flex flex-col gap-4">
        <slot />
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { AccreditationpageDocumentData } from 'prismicio-types'

export interface Step {
  title?: AccreditationpageDocumentData['step1_title'] | AccreditationpageDocumentData['step2_title']
  description?: AccreditationpageDocumentData['step1_description'] | AccreditationpageDocumentData['step2_description']
  links?: {
    fb?: AccreditationpageDocumentData['fb_link']
    ig?: AccreditationpageDocumentData['ig_link']
    x?: AccreditationpageDocumentData['x_link']
  }
}
export interface Props {
  step: Step
  num: number
}

defineProps<Props>()
</script>

<style scoped>
.arrow::before {
  content: '';
  position: absolute;
  right: 13px;
  width: 35px;
  height: 37px;
  background-image: url('/img/icons/arrow-step.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transform: translateY(-60px) scaleX(-1) rotate(30deg);
}

@media screen and (min-width: 1028px) {
  .arrow::before {
    left: 8%;
    right: auto;
    width: 64px;
    height: 67px;
    transform: translateY(-90px);
  }
  .arrow-right::before {
    right: 20%;
    left: auto;
    transform: translateY(-110px) scaleX(-1) rotate(30deg);
  }
}

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
