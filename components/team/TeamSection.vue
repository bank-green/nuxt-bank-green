<script setup lang="ts">
defineProps({
  departmentName: {
    type: String,
    default: 'Other team',
  },
})
</script>

<template>
  <div
    class="flex flex-col gap-6 w-full"
  >
    <h3
      class="text-neutral-800 text-3xl font-semibold mb-5 max-md:text-4xl"
    >
      {{ departmentName }}
    </h3>
    <ul
      class="flex gap-6 justify-evenly flex-wrap"
    >
      <slot />
    </ul>
  </div>
</template>
