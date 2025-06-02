<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const content = ref<HTMLElement>()

function onEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = '0'
  requestAnimationFrame(() => {
    element.style.transition = 'height 300ms ease'
    element.style.height = `${content.value?.scrollHeight}px`
  })
}

function onLeave(el: Element) {
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
    <div
      class="flex justify-between items-center"
    >
      <div
        class="sm:hidden cursor-pointer flex items-center justify-between w-full"
        @click="isOpen = !isOpen"
      >
        <slot name="title" />

        <svg
          :class="['transition-transform duration-300', isOpen ? 'rotate-[270deg]' : 'rotate-90']"

          width="7"
          height="13"
          viewBox="0 0 7 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 11.5L6 6.5L1 1.5"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div class="hidden sm:block">
        <slot name="title" />
      </div>
    </div>
    <div
      class="sm:hidden block"
    >
      <transition
        name="accordion"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div
          v-show="isOpen"
          ref="content"
          class="overflow-hidden text-gray-700"
        >
          <slot name="content" />
        </div>
      </transition>
    </div>

    <div class="sm:block hidden">
      <slot name="content" />
    </div>
  </div>
</template>
