<template>
  <transition
    v-if="modelValue"
    enter-from-class="opacity-0"
    enter-active-class="transition ease-out duration-300"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-active-class="transition ease-in duration-150"
    leave-to-class="opacity-0"
    appear
  >
    <div
      class="fixed inset-0 flex justify-center items-center backdrop-blur p-0 z-50"
    >
      <div
        class="relative bg-primary-dark flex items-center justify-center h-screen w-full max-h-screen overflow-auto"
      >
        <div
          class="relative flex items-center justify-center bg-primary-dark px-6 lg:px-10 py-8 text-gray-50 text-center"
        >
          <slot />

          <button
            class="absolute -right-5 inset-y-0 top-2 text-white hover:text-red-400 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sushi-500 h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center m-auto mr-3.5 mt-2 sm:mt-1.5"
            @click="closeModal"
          >
            <svg
              class="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps({
  modelValue: Boolean,
})

const emits = defineEmits(['update:modelValue'])

function closeModal() {
  console.info('close')
  emits('update:modelValue', false)
}
</script>
