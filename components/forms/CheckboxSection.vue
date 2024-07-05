<template>
  <div class="relative">
    <div class="flex items-start">
      <input
        :id="name"
        :name="name"
        :checked="modelValue"
        type="checkbox"
        class="mt-0.5 h-4 w-4 text-sushi-600 focus:ring-sushi-500 border-gray-300 rounded appearance-none"
        @input="onUpdate"
      >
      <label :for="name" class="ml-4 block text-sm" :class="labelClasses">
        <slot />
      </label>
    </div>
    <div
      v-if="warning"
      class="absolute top-full left-0 text-xs ml-8 mt-1"
      :class="dark ? 'text-red-300 font-semibold' : 'text-red-600'"
    >
      {{ warning }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  name: string;
  warning?: string | object | undefined;
  dark?: boolean;
}>()

const emit = defineEmits(['update:modelValue'])

const labelClasses = computed(() => {
  if (props.dark) {
    return 'text-gray-200'
  }
  return 'text-gray-800'
})

function onUpdate (ev: Event) {
  emit('update:modelValue', (ev.target as HTMLInputElement).checked)
}
</script>
