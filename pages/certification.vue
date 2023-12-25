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
          <div v-if="certification?.data">
            <SliceZone
              :slices="certification?.data.slices ?? []"
              :components="sliceComps"
            />
          </div>
          <div v-else>
            <h1>Fossil Free Certification</h1>
            <p>
              Financial institutions that are Fossil Free Certified have pledged not to finance new fossil fuel companies or projects,
              and the majority already do not do so. Fossil Free Certification is the simplest, most straightforward way to signal to customers,
              professionals in the banking sector, and the general public that a
              sustainability-conscious financial institution is truly putting its money where its mouth is.
            </p>
            <h2 style="text-align: center;">
              Error Loading Content!
            </h2>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'

const sliceComps = ref(defineSliceZoneComponents(components))

const { client } = usePrismic()
const { data: certification } = await useAsyncData('certification', () =>
  client.getSingle('certificationpage', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices']
  })
)
usePrismicSEO(certification.value?.data)
</script>
