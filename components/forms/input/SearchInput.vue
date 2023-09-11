<template>
  <div aria-haspopup="listbox" class="flex items-center">
    <!-- input form -->
    <input
      ref="input"
      :value="modelValue"
      :placeholder="placeholder"
      type="text"
      class="relative w-full appearance-none border bg-white rounded-2xl shadow-sm pl-12 pr-10 py-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-sushi-500 focus:border-sushi-500 sm:text-sm truncate"
      :class="{
        'border-white': !modelValue,
        'border-sushi-100': modelValue,
      }"
      autocomplete="chrome-off"
      @input="onInput"
      @keydown="onKeyDown"
      @focus="onFocus"
      @blur="onBlur"
      @click="onClick"
    />

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
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    placeholder: string;
    usePencil?: boolean;
  }>(),
  {
    usePencil: false,
  },
);

const emit = defineEmits([
  "update:modelValue",
  "onKeydown",
  "onFocus",
  "onBlur",
  "onClick",
  "onCloseClick",
]);

const inputRef = ref<InstanceType<typeof HTMLInputElement> | null>(null);

const focus = () => {
  inputRef.value?.focus();
};
const onInput = ($event: Event) => {
  emit("update:modelValue", ($event.target as HTMLInputElement).value);
};
const onKeyDown = () => emit("onKeydown");
const onFocus = () => emit("onFocus");
const onBlur = () => emit("onBlur");
const onClick = () => emit("onClick");
const onCloseClick = () => emit("onCloseClick");
</script>
