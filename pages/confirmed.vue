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

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'
const sliceComps = ref(defineSliceZoneComponents(components))
const { client } = usePrismic()
const { data: confirmed } = await useAsyncData('confirmed', () =>
  client.getByUID('thankspages', 'confirmed'))
useHeadHelper(confirmed.value?.data.head_helper_title || 'Thank you')
</script>
