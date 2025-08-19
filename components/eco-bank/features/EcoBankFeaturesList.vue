<script setup lang="ts">
import type { EcoBankCard } from '../../../pages/sustainable-eco-banks/utils'

defineProps<{ features: EcoBankCard['features'] }>()
</script>

<template>
  <div v-for="(items, key) in features" :key="key" class="flex-1 min-w-[140px]">
    <span class="text-lg font-semibold">
      {{ key }}
    </span>
    <ul class="list-disc list-inside marker:[font-size:12px]">
      <li v-for="item of items" :key="item" class="text-sm">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
