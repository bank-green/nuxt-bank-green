<template>
  <div class="page">
    <div class="bg-gradient-to-b from-sushi-50 to-sushi-100">
      <div class="page-fade-in contain py-24 sm:py-32">
        <article class="prose sm:prose-lg xl:prose-xl max-w-none">
          <SliceZone
            v-if="team?.data.slices"
            :slices="team?.data.slices ?? []"
            :components="sliceComps"
          />
          <div v-else>
            <h1>Who we are</h1>
            <p>
              Bank.Green  was founded by a group of volunteers in late 2020. Each of us had been
              working on ways to raise awareness about the climate crisis, without  paying much attention to our
              money. We became united by one, almost  ridiculous question:
            </p>
            <p>
              <em>Are we working to help the environment, while our own money is simultaneously destroying it?</em>
            </p>
            <p>
              We asked our banks this question, but it was difficult to get a full answer. Unfortunately, the biggest
              retail banks in the world are indeed supporting environmentally-destructive projects.
            </p>
            <p>
              Why is this still happening? Why is it not being talked about enough? We believe there are many answers
              to these questions. We also believe that if a bank was facing significant challenges from a large number
              of its own customers, it would divest from projects that are harming us. When we concluded this, Bank.Green was born
            </p>
            <p>
              There are many environmentally-harmful activities that banks enable, but Bank.Green has decided to focus its efforts
              on fossil fuel extraction. This is both to streamline our mission and to tackle one of the biggest drivers of global heating.
            </p>
            <p>
              <strong>
                Time is running out. If you feel the same, join us,
                because having your support will make all the difference.
              </strong>
            </p>
          </div>
        </article>
        <div>
          <TeamSection :departmentName="foundersTeam && foundersTeam[0]?.primary.department ? 'Our ' + foundersTeam[0]?.primary.department: ''" />
          <ul
            class="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0"
          >
            <div v-for="(member, key) in foundersTeam" :key="key">
              <TeamMember
                :name="asText(member.primary.name)!"
                :href="asLink(member?.primary.link)!"
                :img="asLink(member?.primary.img)!"
                :description="asText(member.primary.description)!"
              />
            </div>
          </ul>
        </div>
      </div>
      <Swoosh />
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
              :name="asText(member.primary.name)!"
              :href="asLink(member?.primary.link)!"
              :img="asLink(member.primary.img)!"
              :description="asText(member.primary.description)!"
            />
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { asText, asLink } from '@prismicio/helpers'
import { TeamMemberSliceSlice } from 'prismicio-types'
import { components } from '~~/slices'
const sliceComps = ref(defineSliceZoneComponents(components))

const { client } = usePrismic()
const { data: team } = await useAsyncData('team', () =>
  client.getSingle('teampage', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices']
  })
)
usePrismicSEO(team.value?.data)
const teamStructure = team?.value?.data?.slices1.reduce((accumulator: {teamName: string, members: TeamMemberSliceSlice[]}[], member) => {
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
}, []).sort((a, b) => a.teamName && b.teamName ? a.teamName?.localeCompare(b.teamName) : 0)

const foundersTeam = team?.value?.data.slices1.filter(team => team.primary.department === 'Founders')
</script>
