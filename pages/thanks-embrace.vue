<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <SliceZone
          v-if="thanksembrace?.data.slices"
          :slices="thanksembrace?.data.slices ?? []"
          :components="sliceComps"
        />
        <Swoosh direction="up" color="text-sushi-50" />
        <Donation class="bg-sushi-50" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'

const sliceComps = ref(defineSliceZoneComponents(components))

useHeadHelper('Thank you')
const { client } = usePrismic()
const { data: thanksembrace } = await useAsyncData('thanksembrace', () =>
  client.getByUID('thankspages', 'thanks_embrace')
)
</script>
