<script setup lang="ts">
import { ref } from 'vue'
import CheckboxSection from '../forms/CheckboxSection.vue'
import { filterMapping } from '~/utils/constants/eco-bank.constants'

// props
withDefaults(
  defineProps<{
    noBorder?: boolean
    isOpen: boolean
    title?: string
    checkboxOptions: string[]
  }>(),
  {
    noBorder: false,
  }
)

defineEmits(['toggle', 'check'])

const content = ref<HTMLElement>()

// animation
const onEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0'
  requestAnimationFrame(() => {
    element.style.transition = 'height 300ms ease'
    element.style.height = `${content.value?.scrollHeight}px`
  })
}

const onLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = `${element.scrollHeight}px`
  requestAnimationFrame(() => {
    element.style.transition = 'height 300ms ease'
    element.style.height = '0'
  })
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <div
        class="cursor-pointer flex items-center justify-between w-full"
        @click="$emit('toggle')"
      >
        <div class="py-2 mb-2">{{ title }}</div>

        <!-- Icon -->
        <svg
          :class="[
            'transition-transform duration-300',
            isOpen ? 'rotate-[270deg]' : 'rotate-90',
          ]"
          width="7"
          height="13"
          viewBox="0 0 7 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 11.5L6 6.5L1 1.5"
            stroke="#7BB123"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <transition name="accordion" @enter="onEnter" @leave="onLeave">
      <div v-show="isOpen" ref="content" class="overflow-hidden text-gray-700">
        <div class="grid gap-2">
          <CheckboxSection
            v-for="key in checkboxOptions"
            :key="key"
            class="col-span-full"
            :name="key"
            @update:model-value="checked => $emit('check', key, checked)"
          >
            {{ filterMapping[key as keyof typeof filterMapping] }}
          </CheckboxSection>
        </div>
      </div>
    </transition>
    <div v-if="!noBorder" :class="isOpen ? 'pb-4' : 'border-t'"></div>
  </div>
</template>
