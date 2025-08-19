<script setup lang="ts">
const props = defineProps<{
  bankFeatures: any
}>()

const features = computed(() => getFeatures(props.bankFeatures))
</script>

<template>
  <div class="border border-gray-300 rounded-xl shadow-soft">
    <div class="border-b border-gray-200 p-4">
      <div class="font-medium text-gray-800 text-lg">Service features</div>
    </div>
    <div class="p-4 space-y-2">
      <EcoBankFeaturesList :features="features" />
    </div>
  </div>
</template>
