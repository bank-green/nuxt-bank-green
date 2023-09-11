<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain max-w-4xl xl:max-w-5xl pt-28 pb-16">
        <article
          class="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl"
        >
          <img
            class="w-48 h-48"
            src="/img/certification/fossil-free-certified.png"
            alt="Fossil-free certified badge"
          >
          <SliceZone
            :slices="certification?.data.slices ?? []"
            :components="sliceComps"
          />
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'

const sliceComps = ref(defineSliceZoneComponents(components))

const { client } = usePrismic()
const { data: certification } = await useAsyncData('certification', () =>
  client.getSingle('certificationpage', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices']
  })
)
usePrismicSEO(certification.value.data)
</script>
