<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <div v-if="reminderpledge?.data.slices">
          <SliceZone
            :slices="reminderpledge?.data.slices ?? []"
            :components="sliceComps"
          />
        </div>
        <div v-else>
          <h1>Thanks! We’ll be in touch again when it’s time to move your money out of fossil banking.</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'
const sliceComps = ref(defineSliceZoneComponents(components))
useHeadHelper('Thank you')
const { client } = usePrismic()
const { data: reminderpledge } = await useAsyncData('reminderpledge', () =>
  client.getByUID('thankspages', 'reminderpledge'))
</script>
