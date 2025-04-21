<script setup lang="ts">
const props = defineProps<{
  lastReviewed: string | null
}>()

const formattedDate = computed(() => {
  if (!props.lastReviewed) return null
  const date = new Date(props.lastReviewed)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
})
</script>

<template>
  <p
    v-if="formattedDate"
    class="text-sm"
  >
    Last Rated in {{ formattedDate }}
  </p>
</template>
