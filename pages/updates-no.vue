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
          title="Your response has been recorded."
          description="We're sorry to see you go, but you'll no longer receive updates from us!"
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
