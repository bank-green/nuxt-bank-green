<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain max-w-3xl xl:max-w-4xl py-24 sm:py-32">
        <article class="prose sm:prose-lg xl:prose-xl mx-auto">
          <SliceZone
            :slices="team?.data.slices ?? []"
            :components="sliceComps"
          />
        </article>
      </div>
    </div>
    <div class="contain py-16">
      <ul
        class="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0"
      >
        <SliceZone
          :slices="team?.data.slices1 ?? []"
          :components="sliceComps"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'
const sliceComps = ref(defineSliceZoneComponents(components))

const { client } = usePrismic()
const { data: team } = await useAsyncData('team', () =>
  client.getSingle('teampage', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices']
  })
)
usePrismicSEO(team.value.data)
</script>
