<script setup>
defineProps({
  features: Object,
})
</script>

<template>
  <div
    v-for="(item, key) in features"
    :key="key"
    class="flex items-center mr-10 my-2"
  >
    <svg
      v-if="item.isChecked"
      class="flex-none p-1 w-6 h-6 mt-0.5 mr-4 bg-pistachio-green rounded-full text-sushi-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
    <svg
      v-else
      class="w-6 h-6 mr-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
    <div class="flex-1">
      <span
        v-if="item.isChecked && item.text"
        class="text-gray-900"
      >{{
        `${key}: ${item.text}`
      }}</span>
      <span
        v-else-if="item.isChecked"
        class="text-gray-700"
      >{{ key }}</span>
      <span
        v-else
        class="text-gray-400"
      >{{ key }}</span>
    </div>
  </div>
</template>
