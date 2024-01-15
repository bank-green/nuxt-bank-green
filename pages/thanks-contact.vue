<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <SliceZone
          v-if="thankscontact?.data.slices"
          :slices="thankscontact?.data.slices ?? []"
          :components="sliceComps"
        />
        <ThanksSection
          v-else
          title="Thank you for your message"
          description="We'll get back to you as soon as we can."
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
const { data: thankscontact } = await useAsyncData('thankscontact', () =>
  client.getByUID('thankspages', 'thanks_contact')
)
</script>
