<template>
  <div v-if="!isDefaultVariant" class="not-prose block w-full overflow-x-auto mb-8" style="width: calc(100% + 4rem); margin-left: -2rem;">
    <table class="items-center bg-transparent w-full border-collapse bg-white">
      <thead>
        <tr class="bg-sushi-200 text-primary-dark">
          <th v-if="slice.primary.column_1_header" class="px-6 align-middle border border-solid  py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            {{ slice.primary.column_1_header }}
          </th>
          <th v-if="slice.primary.column_2_header" class="px-6 align-middle border border-solid  py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            {{ slice.primary.column_2_header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in slice.items"
          :key="index"
          :class="(index %2) ? 'bg-sushi-50' : 'bg-white'"
        >
          <td v-if="row.column_1" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-semibold flex gap-2 items-center">
            <PrismicImage
              v-if="row.icon.url"
              class="h-10 w-10"
              :alt="row.icon.name"
              :title="row.icon.name"
              :field="row.icon"
            />
            <div v-else class="h-10 w-10" />
            <PrismicRichText :field="row.column_1" />
          </td>
          <td v-if="row.column_1" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
            <PrismicRichText :field="row.column_2" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { getSliceComponentProps } from '@prismicio/vue'
const props = defineProps(getSliceComponentProps(['slice', 'index', 'slices', 'context']))

const isDefaultVariant = computed(() => props.slice.variation === 'Default')
</script>
<style scoped>
</style>
