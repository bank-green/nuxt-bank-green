<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <SliceZone
          :slices="reminderpledge?.data.slices ?? []"
          :components="sliceComps"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'
const sliceComps = ref(defineSliceZoneComponents(components))
useHeadHelper('Thank you')
const { client } = usePrismic()
const { data: reminderpledge } = await useAsyncData('reminderpledge', () =>
  client.getByUID('thankspages', 'reminderpledge'))
</script>
