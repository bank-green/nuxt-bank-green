<template>
  <div class="flex appearance-none w-full text-sm leading-5 shadow-soft">
    <label
      name="name"
      class="w-20"
      :class="labelClasses"
    >
      {{ title || name }}
    </label>
    <span class="text-gray-800">
      {{ value }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string
  title?: string
  name: string
  dark?: boolean
}>()

const labelClasses = computed(() => {
  if (props.dark) {
    return 'text-blue-100 text-opacity-75 font-medium'
  }
  return 'text-gray-500 font-semibold'
})
</script>
