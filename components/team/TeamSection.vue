<template>
  <div
    class="text-neutral-800 text-2xl font-semibold my-4 max-md:text-4xl"
  >
    {{ departmentName }}
  </div>
</template>

<script setup>
defineProps({
  departmentName: String
})
</script>
