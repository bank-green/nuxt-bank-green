<template>
  <transition-group
    enter-active-class="transform-gpu ease-out duration-300 transition"
    enter-from-class="-translate-y-2 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transform-gpu transition ease-in duration-190"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <ThanksEcoBankListItem
      v-for="i in cardsCount"
      :key="i"
      v-bind="list[i - 1]"
      :loaded="loaded"
    />
  </transition-group>
</template>

<script setup lang="ts">
const props = defineProps<{
  list: {
    name: string
    website: string
    tag: string
  }[]
  loaded: boolean
}>()

const cardsCount = computed(() => (props.loaded ? props.list.length : 3))
</script>
