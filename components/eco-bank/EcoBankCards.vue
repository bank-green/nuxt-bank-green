<script setup>
defineProps({
  list: Array,
  isNoCredit: Boolean,
})
</script>

<template>
  <ul class="grid gap-6">
    <li
      v-for="i in list.length"
      :key="i"
      class="list-none"
    >
      <EcoBankCard
        :item="list[i - 1]"
        :is-no-credit="isNoCredit"
      />
    </li>
  </ul>
</template>
