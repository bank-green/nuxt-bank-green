<template>
  <div
    v-if="!isDefaultVariant"
    class="not-prose w-full overflow-x-auto mb-8"
  >
    <div class="hidden sm:block md:block">
      <table class="table items-center bg-transparent w-full border-collapse bg-white">
        <thead>
          <tr
            class="bg-sushi-200 text-primary-dark"
          >
            <th
              v-if="slice.primary.column_1_header"
              class="px-6 align-middle border border-solid  py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              {{ slice.primary.column_1_header }}
            </th>
            <th
              v-if="slice.primary.column_2_header"
              class="px-6 align-middle border border-solid  py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              {{ slice.primary.column_2_header }}
            </th>
            <th
              v-if="slice.primary.column_3_header"
              class="px-6 align-middle border border-solid  py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              {{ slice.primary.column_3_header }}
            </th>
            <th
              v-if="slice.primary.column_4_header"
              class="px-6 align-middle border border-solid  py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              {{ slice.primary.column_4_header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in slice.items"
            :key="index"
            :class="(index %2) ? 'bg-sushi-50' : 'bg-white'"
          >
            <td
              v-if="row.column_1"
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-semibold flex gap-2 items-center"
            >
              <PrismicImage
                v-if="row.icon.url"
                class="h-auto w-10"
                :alt="row.icon.name"
                :title="row.icon.name"
                :field="row.icon"
              />
              <div
                v-else
                class="h-10 w-10"
              />
              <PrismicRichText :field="row.column_1" />
            </td>
            <td
              v-if="row.column_2"
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"
            >
              <PrismicRichText :field="row.column_2" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="block sm:hidden md:hidden space-y-4">
      <!-- MOBILE DISPLAY -->
      <div
        v-for="(row, index) in slice.items"
        :key="index"
        class="rounded-md px-3 py-4 flex flex-row gap-2"
        :class="(index %2) ? 'bg-sushi-50' : 'bg-white'"
      >
        <div class="w-24 h-24 flex justify-center items-start">
          <PrismicImage
            v-if="row.icon.url"
            class="max-w-full max-h-full"
            :alt="row.icon.name"
            :title="row.icon.name"
            :field="row.icon"
          />
        </div>
        <dl class="space-y-1 flex-1">
          <div>
            <dt class="text-sm text-gray-700">
              {{ slice.primary.column_1_header }}
            </dt>
            <dd>
              <PrismicRichText
                class="font-semibold"
                :field="row.column_1"
              />
            </dd>
          </div>
          <div>
            <dt class="text-sm text-gray-700">
              {{ slice.primary.column_2_header }}
            </dt>
            <dd>
              <PrismicRichText
                class="font-semibold"
                :field="row.column_2"
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSliceComponentProps } from '@prismicio/vue'

const props = defineProps(getSliceComponentProps(['slice', 'index', 'slices', 'context']))

const isDefaultVariant = computed(() => props.slice.variation === 'Default')
</script>

<style scoped>
</style>
