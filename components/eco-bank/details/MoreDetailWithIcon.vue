<template>
  <img
    v-if="content.length"
    src="/img/icons/information.svg"
    class="cursor-pointer"
    @click="isOpen = true"
  >
  <EcoBankDetailsModal
    v-if="isOpen "
    :model-value="isOpen"
    :title="title"
    @update:model-value=" value => isOpen = value"
  >
    <div class="grid gap-6">
      <div
        v-for="item in content"
        :key="item.heading"
        class="grid gap-2"
      >
        <h3 class="font-semibold">
          {{ item.heading }}
        </h3>
        <p
          v-for="p in item.description.split(';')"
          :key="p"
          class="pl-4"
        >
          {{ p }}
        </p>
      </div>
    </div>
  </EcoBankDetailsModal>
</template>

<script setup lang="ts">
defineProps<{
  content: {
    heading: string
    description: string
  }[]
  title: string
}>()

const isOpen = ref(false)
</script>
