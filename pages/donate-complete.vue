<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <div v-if="donatecomplete?.data.slices">
          <SliceZone
            :slices="donatecomplete?.data.slices"
            :components="sliceComps"
          />
        </div>
        <div v-else>
          <ThanksSection
            title="Thank you for your donation!"
            description="We appreciate your support in defunding fossil banks."
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
const { data: donatecomplete } = await useAsyncData('donatecomplete', () =>
  client.getByUID('thankspages', 'donatecompleted'))
</script>
