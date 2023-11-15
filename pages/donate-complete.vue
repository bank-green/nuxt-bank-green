<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <SliceZone
          :slices="donatecomplete?.data.slices"
          :components="sliceComps"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'
useHeadHelper('Thank you')
const sliceComps = ref(defineSliceZoneComponents(components))
const { client } = usePrismic()
const { data: donatecomplete } = await useAsyncData('donatecomplete', () =>
  client.getByUID('thankspages', 'donatecompleted'))
</script>
