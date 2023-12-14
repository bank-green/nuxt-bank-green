<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <div v-if="thankscontact.data.slices">
          <SliceZone
            :slices="thankscontact?.data.slices ?? []"
            :components="sliceComps"
          />
        </div>
        <div v-else>
          <ThanksSection
            title="Thank you for your message"
            description="We'll get back to you as soon as we can."
          />
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
const { data: thankscontact } = await useAsyncData('thankscontact', () =>
  client.getByUID('thankspages', 'thanks_contact')
)
</script>
