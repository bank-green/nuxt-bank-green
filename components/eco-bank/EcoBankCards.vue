<script setup lang="ts">
import type { EcoBankCard } from './types'

defineProps<{
  list: EcoBankCard[]
  isNoCredit: boolean
}>()
</script>

<template>
  <transition-group
    enter-active-class="transform-gpu ease-out duration-300 transition"
    enter-from-class="-translate-y-2 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transform-gpu transition ease-in duration-190"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <li v-for="i in list.length" :key="i" class="list-none">
      <EcoBankCard :item="list[i - 1]" :is-no-credit="isNoCredit" />
    </li>
  </transition-group>
</template>
