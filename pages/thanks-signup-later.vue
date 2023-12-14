<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <div v-if="thankssign?.data.slices">
          <SliceZone
            :slices="thankssign?.data.slices ?? []"
            :components="sliceComps"
          />
        </div>
        <div v-else>
          <ThanksSection
            title="Thanks, we've emailed you a link to sign up later."
          />
        </div>
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
const { data: thankssign } = await useAsyncData('thankssign', () =>
  client.getByUID('thankspages', 'thanskssignup')
)
</script>
