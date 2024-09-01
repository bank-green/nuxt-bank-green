<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <SliceZone
          v-if="thanks?.data.slices"
          :slices="thanks?.data.slices ?? []"
          :components="sliceComps"
        />
        <ThanksSection
          v-else
          title="Thank you for joining Bank.Green!"
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
useHeadHelper('Thank you')
const { client } = usePrismic()
const { data: thanks } = await useAsyncData('thanks', () =>
  client.getByUID('thankspages', 'thanks')
)
</script>
