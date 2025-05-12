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
      class="fixed inset-0 flex justify-center items-center backdrop-brightness-[0.35] p-0 w-full z-50 top-[-80px]"
      @click="closeModal"
    >
      <div
        ref="modalContainer"
        class="relative flex items-center justify-center max-w-7xl w-5/6 m-4 overflow-auto h-4/5 md:h-full lg:h-full"
        @click.stop
      >
        <div
          class="absolute top-0 flex w-full h-full items-center justify-center"
        >
          <div class="bg-white p-4 pb-16 relative grid gap-6 w-[671px] max-w-full">
            <h2
              v-if="title"
              class="flex items-center"
            >
              <span class="text-xl grow">{{ title }}</span>
              <button
                class="hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sushi-500 "
                @click="closeModal"
              >
                <img
                  src="/img/icons/cross.svg"
                  alt="Close"
                  class="h-5 w-5 stroke-1"
                >
              </button>
            </h2>
            <slot />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title?: string
}>()

const emits = defineEmits(['update:modelValue'])
const escapePressed = useKeyPress('Escape')

watch(escapePressed, (val, prev) => {
  if (val && !prev) {
    closeModal()
  }
})
function closeModal() {
  emits('update:modelValue', false)
}
</script>
