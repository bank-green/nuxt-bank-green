<template>
  <div
    aria-haspopup="listbox"
    class="flex items-center"
  >
    <!-- input form -->
    <input
      ref="input"
      :value="modelValue"
      :placeholder="placeholder"
      type="text"
      :readonly="readOnly"
      class="relative w-full appearance-none border bg-white rounded-2xl shadow-soft pr-10 py-4 text-left cursor-default focus:border-sushi-300 focus:ring focus:ring-sushi-200 focus:ring-opacity-50 sm:text-sm truncate 'px-5 py-4 text-gray-900 placeholder-cool-gray-800'"
      :class="{
        'border-gray-200': !modelValue,
        'border-sushi-500': modelValue,
        'pl-5 pr-10 py-4 border-red-300 text-red-900 placeholder-red-800 focus:border-red-300 focus:ring-red': !!warning,
        'bg-gray-100 border-gray-200 text-gray-700 placeholder-gray-400': disabled,
        'pl-12': hasExtaIconSpacing,
        'pl-5': !hasExtaIconSpacing,
      }"
      autocomplete="chrome-off"
      :aria-invalid="!!warning"
      :disabled="disabled"
      @input="onInput"
      @keydown="onKeyDown"
      @focus="onFocus"
      @blur="onBlur"
      @click="onClick"
    >

    <!-- icon on the left -->
    <slot name="icon" />
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
        <circle
          cx="8"
          cy="8.5"
          r="8"
          fill="currentColor"
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
      <!-- pencil icon -->
      <svg
        v-else
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="8"
          cy="8.5"
          r="8"
          fill="currentColor"
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
    <div
      v-else
      class="absolute right-0 p-5 text-red-700 hover:text-red-500 cursor-pointer"
    >
      <slot name="endIcon" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    placeholder: string
    usePencil?: boolean
    warning?: string | boolean
    dark?: boolean
    disabled?: boolean
    hasExtaIconSpacing?: boolean
    readOnly?: boolean
  }>(),
  {
    usePencil: false,
    warning: false,
    dark: false,
    disabled: false,
    hasExtaIconSpacing: true,
    readOnly: false,
  },
)

const emit = defineEmits([
  'update:modelValue',
  'onKeydown',
  'onFocus',
  'onBlur',
  'onClick',
  'onCloseClick',
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
