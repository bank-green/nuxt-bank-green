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
      <p>{{ teamStructure }}</p>
      <div v-for="(subTeam, mainKey) in teamStructure" :key="mainKey">
        <TeamSection :departmentName="subTeam.teamName" />
        <ul
          class="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0"
        >
          <!-- <SliceZone
            :slices="team?.data.slices1 ?? []"
            :components="sliceComps"
          /> -->
          <!-- <p>{{ team?.data.slices1 }}</p> -->
          <!-- <div v-for="(member, key) in team?.data.slices1 ?? []" :key="key">
            <TeamMember
              :name="member.primary.name[0].text"
              :href="member.primary.link.url"
              :img="member.primary.img.url"
              :description="member.primary.description[0].text"
            />
          </div> -->
          <div v-for="(member, key) in subTeam.members" :key="key">
            <TeamMember
              :name="member.primary.name[0].text"
              :href="member.primary.link.url"
              :img="member.primary.img.url"
              :description="member.primary.description[0].text"
            />
          </div>
        </ul>
      </div>
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
// const teamStructure = []
// // member.primary.department[0].text
// for (const member of team.value.data.slices1) {
//   teamStructure.push({ teamName: 'Other', members: [member] })
// }
const teamStructure = team.value.data.slices1.reduce((accumulator, member) => {
  const department = 'Other'
  const existingTeamIndex = accumulator.findIndex(team => team.teamName === department)

  if (existingTeamIndex >= 0) {
    accumulator[existingTeamIndex].members.push(member)
  } else {
    accumulator.push({ teamName: department, members: [member] })
  }
  return accumulator
}, [])
</script>
