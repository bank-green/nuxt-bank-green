<script setup lang="ts">
import type { EcoBankCard } from '../types'

defineProps<{ features: EcoBankCard['features'] }>()
</script>

<template>
  <div
    v-for="(items, key) in features"
    :key="key"
    class="flex items-center mr-10 my-2"
  >
    <div v-if="!items.length"></div>
    <div v-for="item of items" v-else :key="item">
      <p></p>
      <p>{{ item + '~~' }}</p>
    </div>
  </div>
</template>
