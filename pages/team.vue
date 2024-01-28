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
        <div>
          <TeamSection :departmentName="'Our ' + foundersTeam[0].teamName" />
          <ul
            class="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0"
          >
            <div v-for="(member, key) in foundersTeam[0].members" :key="key">
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
    <div class="contain py-16">
      <div class="text-neutral-800 text-4xl font-semibold mb-2 max-md:text-4xl">
        Meet the Team
      </div>
      <div v-for="(subTeam, mainKey) in teamStructure" :key="mainKey">
        <TeamSection :departmentName="subTeam.teamName" />
        <ul
          class="space-y-12 lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0"
        >
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
const teamStructure = team.value.data.slices1.reduce((accumulator, member) => {
  const department = member.primary.department
  if (department !== 'Founders' && department !== 'Alumni') {
    const existingTeamIndex = accumulator.findIndex(team => team.teamName === department)

    if (existingTeamIndex >= 0) {
      accumulator[existingTeamIndex].members.push(member)
    } else {
      accumulator.push({ teamName: department, members: [member] })
    }
  }
  return accumulator
}, []).sort((a, b) => a.teamName.localeCompare(b.teamName))
const foundersTeam = team.value.data.slices1.reduce((accumulator, member) => {
  const department = member.primary.department
  if (department === 'Founders') {
    const existingTeamIndex = accumulator.findIndex(team => team.teamName === department)

    if (existingTeamIndex >= 0) {
      accumulator[existingTeamIndex].members.push(member)
    } else {
      accumulator.push({ teamName: department, members: [member] })
    }
  }
  return accumulator
}, [])
</script>
