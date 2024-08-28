<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <SliceZone
          v-if="donatecomplete?.data.slices"
          :slices="donatecomplete?.data.slices"
          :components="sliceComps"
        />
        <ThanksSection
          v-else
          title="Thank you for your donation!"
          description="We appreciate your support in defunding fossil banks."
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'

const sliceComps = ref(defineSliceZoneComponents(components))
const { client } = usePrismic()
const { data: donatecomplete } = await useAsyncData('donatecomplete', () =>
  client.getByUID('thankspages', 'donatecompleted'))
useHeadHelper(donatecomplete.value?.data.head_helper_title || 'Thank you')
</script>
