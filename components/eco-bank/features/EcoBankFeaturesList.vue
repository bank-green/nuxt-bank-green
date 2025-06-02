<script setup>
defineProps({
  features: Object,
})
</script>

<template>
  <div class="grid sm:grid-cols-3 gap-3">
    <div>
      <Accordion>
        <template #title>
          <h2 class="font-semibold text-base py-2 sm:py-0 sm:pb-2">
            Personal
          </h2>
        </template>

        <template #content>
          <ul class="text-sm grid gap-2">
            <li>
              <span class="px-2 hidden sm:inline">•</span>
              <span>Credit Cards</span>
            </li>
            <li>
              <span class="px-2 hidden sm:inline">•</span>
              <span>Checking Accounts</span>
            </li>
            <li>
              <span class="px-2 hidden sm:inline">•</span>
              <span>Savings Accounts</span>
            </li>
            <li>
              <span class="px-2 hidden sm:inline">•</span>
              <span>Mortgage</span>
            </li>
          </ul>
        </template>
      </Accordion>
    </div>

    <div class="border-b border-gray-200 sm:hidden" />

    <Accordion>
      <template #title>
        <h2 class="font-semibold text-base py-2 sm:py-0 sm:pb-2">
          Business
        </h2>
      </template>
      <template #content>
        <ul class="text-sm grid gap-2">
          <li>
            <span class="px-2 hidden sm:inline">•</span>
            <span>Credit Cards</span>
          </li>
          <li>
            <span class="px-2 hidden sm:inline">•</span>
            <span>Checking Accounts</span>
          </li>
          <li>
            <span class="px-2 hidden sm:inline">•</span>
            <span>Savings Accounts</span>
          </li>
          <li>
            <span class="px-2 hidden sm:inline">•</span>
            <span>Mortgage</span>
          </li>
        </ul>
      </template>
    </Accordion>

    <div class="border-b border-gray-200 sm:hidden" />

    <Accordion>
      <template #title>
        <h2 class="font-semibold text-base py-2 sm:py-0 sm:pb-2">
          Service
        </h2>
      </template>
      <template #content>
        <ul class="text-sm grid gap-2">
          <li>
            <span class="px-2 hidden sm:inline">•</span>
            <span>Credit Cards</span>
          </li>
          <li>
            <span class="px-2 hidden sm:inline">•</span>
            <span>Checking Accounts</span>
          </li>
          <li>
            <span class="px-2 hidden sm:inline">•</span>
            <span>Savings Accounts</span>
          </li>
          <li>
            <span class="px-2 hidden sm:inline">•</span>
            <span>Mortgage</span>
          </li>
        </ul>
      </template>
    </Accordion>
  </div>
</template>
