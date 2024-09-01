<template>
  <div
    v-for="(item, key) in features"
    :key="key"
    class="flex items-center mr-4 my-2"
  >
  <svg
    v-if="item.isChecked"
    class="flex-none p-1 w-6 h-6 mt-0.5 mr-1 bg-sushi-100 rounded-full text-sushi-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 16 16" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4.33 8l2.67 2.67L11.67 5.67" 
    />
  </svg>
  <svg
    v-else
    class="w-6 h-6 mr-4 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 16 16" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 12L12 4M4 4l8 8" 
    />
  </svg>


    <div class="flex-1 text-sm">
      <span v-if="item.isChecked && item.text" class="text-gray-900 text-sm">{{
        `${key}: ${item.text}`
      }}</span>
      <span v-else-if="item.isChecked" class="text-gray-700">{{ key }}</span>
      <span v-else class="text-gray-400">{{ key }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  features: Object
})
</script>
