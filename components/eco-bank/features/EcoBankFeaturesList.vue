<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { EcoBankCard } from '../../../utils/sustainableEcoBanksUtils'

defineProps<{ features: EcoBankCard['features'] }>()

const withBullet = ref(false)

const checkWidth = () => {
  withBullet.value = window.innerWidth > 400
}

onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkWidth)
})
</script>

<template>
  <div v-for="(items, key) in features" :key="key" class="flex-1 min-w-[140px]">
    <span class="text-lg font-semibold">
      {{ key }}
    </span>
    <ul :class="withBullet && 'list-disc list-inside marker:[font-size:12px]'">
      <li v-for="item of items" :key="item" class="text-sm">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
