<template>
  <div
    class="text-neutral-800 text-2xl font-semibold mt-20 mb-5 max-md:text-4xl"
  >
    {{ departmentName }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  departmentName: {
    type: String,
    default: 'Other team'
  }
})
</script>
