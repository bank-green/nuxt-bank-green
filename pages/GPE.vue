<template>
  <div class="page">
    <div bg="bg-sushi-50">
      <SliceZone
        :components="sliceComps"
        :slices="gpe?.data.slices ?? []"
        />
    </div>
    <div class="bg-white">
      <div class=" page-fade-in grid grid-cols-2 gap-4 pt-28">
        <TextWithLogo
          :title="gpe?.data.leafslice1.at(0)?.title!"
          :img="asImageSrc(gpe?.data.leafslice1.at(0)?.image)!"
          :description="gpe?.data.leafslice1.at(0)?.description!"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { asImageSrc } from '@prismicio/helpers'
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'
const sliceComps = ref(defineSliceZoneComponents(components))
const { client } = usePrismic()
const { data: gpe } = await useAsyncData('gpe', () =>
  client.getSingle('greenpolicyevaluatorpage'))
</script>
