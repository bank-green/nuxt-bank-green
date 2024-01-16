<template>
  <div class="page">
    <div class="bg-white">
      <div class=" page-fade-in grid grid-cols-2 gap-4 pt-28">
        <SliceZone
          :slices="gpe?.data.slices ?? []"
          :components="sliceComps"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'
const sliceComps = ref(defineSliceZoneComponents(components))

const { client } = usePrismic()
const { data: gpe } = await useAsyncData('gpe', () =>
  client.getSingle('greenpolicyevaluatorpage'))
</script>
