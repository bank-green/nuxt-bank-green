<template>
  <div class="lg:flex">
    <div class="lg:mr-6 pt-4 pl-5">
      <span class="text-xl font-bold text-gray-900">Step {{ step }}</span>
    </div>
    <div class="flex-1 mt-0 lg:col-span-2">
      <AccordionItem
        :description="description"
        :title="title"
        :carat-class="caratClass"
      >
        <AccordionItem
          v-for="(sub, i) in subcontent"
          :key="i"
          :title="sub.title"
          :description="sub.content"
          :carat-class="caratClass"
        />
      </AccordionItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import AccordionItem from "../AccordionItem.vue";

withDefaults(
  defineProps<{
    step: number;
    title: string;
    description: string;
    subcontent?: any[];
    caratClass: string;
  }>(),
  {
    subcontent: () => [],
  },
);
</script>
