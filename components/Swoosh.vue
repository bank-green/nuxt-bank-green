<script setup>
defineProps({
  direction: {
    type: String,
    default: 'up',
  },
  color: {
    type: String,
    default: 'text-gray-50',
  },
  paddingClasses: {
    type: String,
    default: 'py-8 sm:py-10 md:py-12',
  },
})
</script>

<template>
  <div
    class="relative z-0"
    :class="paddingClasses"
  >
    <svg
      class="absolute inset-x-0 w-full max-h-3/2 min-h-full"
      :class="[
        direction === 'down' ? 'transform scale-y-flip top-0' : 'bottom-0',
        color,
      ]"
      viewBox="0 0 1000 174"
      preserveAspectRatio="none"
    >
      <path
        d="m0 175c250.16-15.25 489.57-30.193 641.34-62.394 169.21-36.691 264.25-63.393 358.66-111.81l0.1449 175z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  </div>
</template>
