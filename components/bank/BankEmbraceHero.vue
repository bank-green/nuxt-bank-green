<template>
  <div
    class="flex flex-col gap-10 items-center relative page-fade-in contain max-w-5xl"
  >
    <div
      class="grid grid-cols-2 gap-8 md:gap-10 z-10"
    >
      <slot name="section1" />
    </div>
    <div
      class="w-full flex gap-8 my-6 items-center justify-center bg-blue-100 rounded-2xl px-6 py-8 text-gray-50 text-center font-semibold"
    >
      <div class="flex flex-col text-left max-w-xl">
        <h3
          class="text-gray-800 text-lg md:text-2xl tracking-wider font-bold mb-4"
        >
          Moved your money to this bank?
        </h3>
        <p class="text-gray-700 leading-loose text-lg font-bold">
          Write a breakup letter to your old bank.
        </p>
        <p class="text-gray-700  text-lg font-medium">
          Use our custom template and tell them why you switched to a sustainably conscious bank!
        </p>
      </div>
      <NuxtLink
        to="#section-breakup"
        class="button-green w-auto"
      >
        Send your break-up email
      </NuxtLink>
    </div>
    <div class="relative flex-grow md:flex-none">
      <ArrowDownBounce class="inline-block w-10" />
    </div>
  </div>
</template>
<script setup lang="ts">
import ArrowDownBounce from '@/components/icons/ArrowDownBounce.vue'

</script>
