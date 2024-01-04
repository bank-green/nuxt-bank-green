<template>
  <div aria-haspopup="listbox" class="flex items-center">
    <!-- input form -->
    <input
      ref="input"
      :value="modelValue"
      :placeholder="placeholder"
      type="text"
      class="relative w-full appearance-none border bg-white rounded-2xl shadow-soft pl-12 pr-10 py-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-sushi-500 focus:border-sushi-500 sm:text-sm truncate"
      :class="{
        'border-white': !modelValue,
        'border-sushi-100': modelValue,
        'pl-5 pr-10 py-4 border-red-300 text-red-900 placeholder-red-800 focus:border-red-300 focus:ring-red': !!warning
      }"
      autocomplete="chrome-off"
      :aria-invalid="!!warning"
      @input="onInput"
      @keydown="onKeyDown"
      @focus="onFocus"
      @blur="onBlur"
      @click="onClick"
    >

    <!-- icon on the left -->
    <slot name="icon" />
    <div
      v-if="!!warning"
      class="absolute right-0 p-5 text-red-700 hover:text-red-500 cursor-pointer"
    >
      <!-- warning icon -->
      <svg
        v-if="!!warning"
        class="h-5 w-5 text-red-600"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div
      v-if="modelValue"
      class="absolute right-0 p-5 text-red-700 hover:text-red-500 cursor-pointer"
      @click="onCloseClick"
    >
      <!-- close icon -->
      <svg
        v-if="!usePencil"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8.5" r="8" fill="currentColor" />
        <path
          d="M5.17157 5.67157L10.8284 11.3284"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.8284 5.67157L5.17156 11.3284"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- pencil icon -->
      <svg
        v-else
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8.5" r="8" fill="currentColor" />
        <path
          d="M5.17157 5.67157L10.8284 11.3284"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.8284 5.67157L5.17156 11.3284"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.17157 5.67157L10.8284 11.3284"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.8284 5.67157L5.17156 11.3284"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
  <div
    v-if="warning && typeof warning === 'string'"
    class="top-full ml-2 mt-1 -mb-3 text-xs"
    :class="dark ? 'text-white font-semibold' : 'text-red-600'"
  >
    {{ warning }}
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    placeholder: string;
    usePencil?: boolean;
    warning?: string | boolean;
    dark?: boolean
  }>(),
  {
    usePencil: false,
    warning: false,
    dark: false
  }
)

const emit = defineEmits([
  'update:modelValue',
  'onKeydown',
  'onFocus',
  'onBlur',
  'onClick',
  'onCloseClick'
])

const onInput = ($event: Event) => {
  emit('update:modelValue', ($event.target as HTMLInputElement).value)
}
const onKeyDown = () => emit('onKeydown')
const onFocus = () => emit('onFocus')
const onBlur = () => emit('onBlur')
const onClick = () => emit('onClick')
const onCloseClick = () => emit('onCloseClick')
</script>
