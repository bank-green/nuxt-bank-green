<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <SliceZone
          v-if="updatesNo?.data.slices"
          :slices="updatesNo?.data.slices ?? []"
          :components="sliceComps"
        />
        <ThanksSection
          v-else
          title="Thank you for your continuing support."
          description="We're happy you'd like to stay in touch!"
          :show-explore-section="false"
        />
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
const { data: updatesNo } = await useAsyncData('updatesNo', () =>
  client.getByUID('thankspages', 'updates_no')
)
</script>
