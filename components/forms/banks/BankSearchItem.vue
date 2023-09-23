<template>
  <div class="flex items-center">
    <div class="relative w-6 h-6 mr-3">
      <ClearbitLogo
        :url="website"
        :size="24"
        img-class="absolute inset-0 z-20"
      />
    </div>
    <span
      class="w-full flex-1 font-normal block truncate"
      :class="{
        'font-semibold': isSelected,
        'font-normal': !isSelected,
      }"
    >
      {{ name }}
    </span>
  </div>

  <span
    v-if="isSelected"
    class="absolute inset-y-0 right-0 flex items-center pr-4"
    :class="{ 'text-white': isFocused, 'text-sushi-600': !isFocused }"
  >
    <svg
      class="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
      />
    </svg>
  </span>
</template>

<script setup lang="ts">
import ClearbitLogo from '../../icons/ClearbitLogo.vue'

defineProps<{
  id: String;
  name: String;
  website: String;
  isSelected: Boolean;
  isFocused?: Boolean;
}>()
</script>
