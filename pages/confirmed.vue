<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <div v-if="confirmed?.data.slices">
          <SliceZone
            :slices="confirmed?.data.slices"
            :components="sliceComps"
          />
        </div>
        <div v-else>
          <ThanksSection
            :title="'Thanks for joining the Money Movement and our emailing list!'"
            :description="`You'll be hearing from us soon!`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'
useHeadHelper('Thank you')
const sliceComps = ref(defineSliceZoneComponents(components))
const { client } = usePrismic()
const { data: confirmed } = await useAsyncData('confirmed', () =>
  client.getByUID('thankspages', 'confirmed'))
</script>
