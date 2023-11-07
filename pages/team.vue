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
        <TeamMember
          name="Albert R Carter"
          description="Albert is an environmental activist, and data engineer living in Nijmegen, the Netherlands. He is always looking for high-leverage ways to create change, and as a result, enjoys working on environmental projects in science, finance and communication. Outside of activism, he enjoys bike touring and hiking."
          img="/img/team/albert.jpg"
        />
        <TeamMember
          v-for="(slice, index) in team?.data.slices.slice(1)"
          :key="index"
          :name="slice.items[0].name[0].text"
          :href="slice.items[0].personal_link?.url"
          :description="slice.items[0].description1[0].text"
          :img="slice.items[0].image.url"
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
    fetchLinks: ['accordionitem.title', 'accordionitem.slices', 'name', 'personal_link', 'description', 'image']
  })
)
console.log('team', team)
usePrismicSEO(team.value.data)

</script>
