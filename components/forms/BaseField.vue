<template>
  <div class="relative">
    <div
      v-if="title"
      class="flex items-center gap-2 mb-2"
    >
      <label
        :for="name"
        class="block text-sm leading-5"
        :class="labelClasses"
      >{{ title }}</label>
      <div v-if="infoTooltip" class="relative overflow-visible">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          class="hover:cursor-pointer"
          @mouseenter="infoTooltipShown = true"
          @mouseleave="infoTooltipShown = false"
        >
          <path d="M8.25 8.23484C8.25 8.03592 8.32902 7.84516 8.46967 7.70451C8.61032 7.56385 8.80109 7.48484 9 7.48484C9.19891 7.48484 9.38968 7.56385 9.53033 7.70451C9.67098 7.84516 9.75 8.03592 9.75 8.23484V12.7348C9.75 12.9337 9.67098 13.1245 9.53033 13.2652C9.38968 13.4058 9.19891 13.4848 9 13.4848C8.80109 13.4848 8.61032 13.4058 8.46967 13.2652C8.32902 13.1245 8.25 12.9337 8.25 12.7348V8.23484ZM9 4.53809C8.80109 4.53809 8.61032 4.6171 8.46967 4.75776C8.32902 4.89841 8.25 5.08917 8.25 5.28809C8.25 5.487 8.32902 5.67776 8.46967 5.81842C8.61032 5.95907 8.80109 6.03809 9 6.03809C9.19891 6.03809 9.38968 5.95907 9.53033 5.81842C9.67098 5.67776 9.75 5.487 9.75 5.28809C9.75 5.08917 9.67098 4.89841 9.53033 4.75776C9.38968 4.6171 9.19891 4.53809 9 4.53809Z" fill="#DBEAFE" fill-opacity="0.75" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.5C4.85775 1.5 1.5 4.85775 1.5 9C1.5 13.1422 4.85775 16.5 9 16.5C13.1422 16.5 16.5 13.1422 16.5 9C16.5 4.85775 13.1422 1.5 9 1.5ZM3 9C3 10.5913 3.63214 12.1174 4.75736 13.2426C5.88258 14.3679 7.4087 15 9 15C10.5913 15 12.1174 14.3679 13.2426 13.2426C14.3679 12.1174 15 10.5913 15 9C15 7.4087 14.3679 5.88258 13.2426 4.75736C12.1174 3.63214 10.5913 3 9 3C7.4087 3 5.88258 3.63214 4.75736 4.75736C3.63214 5.88258 3 7.4087 3 9Z" fill="#DBEAFE" fill-opacity="0.75" />
        </svg>
        <span v-if="infoTooltipShown" class="absolute text-xs p-2 rounded-lg bg-primary-dark z-50 text-white w-32 left-6 -top-1">
          {{ infoTooltip }}
        </span>
      </div>
    </div>
    <div class="relative rounded-md shadow-sm">
      <div
        v-if="currencyLabel"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <span class="text-gray-700 sm:text-sm sm:leading-5">
          {{ currencyLabel }}
        </span>
      </div>

      <slot />

      <div
        v-if="showWarning"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <svg
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
        v-else-if="typeLabel"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <span
          :id="`${name}-currency`"
          class="text-gray-500 sm:text-sm sm:leading-5"
        >
          {{ typeLabel }}
        </span>
      </div>
    </div>
    <div v-if="description" class="mt-2 text-xs text-gray-600">
      {{ description }}
    </div>
    <div
      v-if="showWarning && typeof showWarning === 'string'"
      class="top-full ml-2 mt-1 -mb-3 text-xs"
      :class="dark ? 'text-white font-semibold' : 'text-red-600'"
    >
      {{ showWarning }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  description?: string;
  name: string;
  showWarning?: string | boolean;
  typeLabel?: string;
  currencyLabel?: string;
  dark?: boolean;
  infoTooltip?: string
}>()

const infoTooltipShown = ref<boolean>(false)

const labelClasses = computed(() => {
  if (props.dark) {
    return 'text-blue-100 text-opacity-75 font-medium'
  }
  return 'text-gray-600 font-semibold'
})
</script>
