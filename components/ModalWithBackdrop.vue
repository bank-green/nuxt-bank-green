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
      class="fixed inset-0 flex justify-center items-center backdrop-brightness-[0.25] p-0 z-50"
    >
      <div
        class="relative flex items-center justify-center h-screen w-full max-h-screen overflow-auto"
      >
        <div
          class="absolute top-0 flex items-center justify-center px-6 lg:px-10 text-gray-50 text-center"
        >
          <slot />
          <button
            class="absolute top-0 right-4 m-auto mr-6 lg:mr-10 mt-20 pt-16 h-6 w-6 sm:h-8 sm:w-8 text-black hover:text-red-400 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sushi-500  flex items-center justify-center"
            @click="closeModal"
          >
            <svg class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
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
  modelValue: Boolean
})

const emits = defineEmits(['update:modelValue'])

function closeModal () {
  console.info('close')
  emits('update:modelValue', false)
}
</script>
