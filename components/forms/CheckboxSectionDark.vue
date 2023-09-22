<template>
  <div class="flex items-start">
    <input
      :id="name"
      :name="name"
      type="checkbox"
      class="mt-0.5 h-4 w-4 bg-gray-600 border-gray-200 text-sushi-700 focus:ring-sushi-700 rounded appearance-none"
    >
    <label :for="name" class="ml-4 block text-sm text-gray-300">
      <slot />
    </label>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  name: String
})
</script>
