<template>
  <div
    :class="`${
      dark ? 'text-white' : 'bg-white text-gray-700 md:shadow-md'
    } rounded-2xl px-8 py-10 space-y-4`"
  >
    <div v-for="(item, i) in list" :key="i" class="flex items-start">
      <img
        :class="`${
          dark ? 'w-7 h-7' : 'bg-sushi-100 w-6 h-6'
        } p-1 mt-0.5 mr-4 rounded-full`"
        src="/img/icons/check.svg"
        alt=""
      >
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: { type: Array, default: () => [] },
  dark: { type: Boolean, default: false }
})
</script>
