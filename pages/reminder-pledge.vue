<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <SliceZone
          v-if="reminderpledge?.data.slices"
          :slices="reminderpledge?.data.slices ?? []"
          :components="sliceComps"
        />
        <ThanksSection
          v-else
          title="Thanks! We’ll be in touch again when it’s time to move your money out of fossil banking."
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
const { data: reminderpledge } = await useAsyncData('reminderpledge', () =>
  client.getByUID('thankspages', 'reminderpledge'))
</script>
