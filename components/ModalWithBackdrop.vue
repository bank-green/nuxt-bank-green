<template>
  <transition
    enter-from-class="opacity-0"
    enter-active-class="transition ease-out duration-300"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-active-class="transition ease-in duration-150"
    leave-to-class="opacity-0"
    appear
  >
    <div
      class="fixed inset-0 flex justify-center items-center backdrop-brightness-[0.35] p-0 w-full z-50"
    >
      <div
        ref="modalContainer"
        tabindex="-1"
        class="relative flex items-center justify-center h-screen max-h-4/5 w-full overflow-auto"
      >
        <div
          v-clickaway="closeModal"
          class="absolute top-0 flex flex-col items-center justify-center md:mt-28 mb-20 sm:px-6 md:px-8 lg:px-10 text-gray-50 text-center bg-sushi-100 md:rounded-2xl max-md:px-5 w-full h-full md:w-3/4 md:h-3/4"
        >
          <div class="flex flex-row items-center justify-center text-black w-full">
            <div

              class="relative w-full justify-between items-stretch self-stretch flex gap-5 mt-5 md:mt-10 max-md:max-w-full max-md:flex-wrap"
            >
              <div
                v-if="title"
                class="w-full text-2xl font-bold grow shrink basis-auto max-md:max-w-full text-center"
              >
                {{ title }}
              </div>
              <div class="absolute right-0">
                <button
                  class="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 hover:text-red-400 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sushi-500 "
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
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">

defineProps<{
  modelValue: boolean;
  title?: string
}>()

const emits = defineEmits(['update:modelValue'])
const escapePressed = useKeyPress('Escape')

watch(escapePressed, (val, prev) => {
  if (val && !prev) {
    closeModal()
  }
})
function closeModal () {
  emits('update:modelValue', false)
}
</script>
