<template>
  <div class="page">
    <div class="bg-gradient-to-b from-sushi-50 to-pistachio-green">
      <section class="page-fade-in contain py-24 sm:py-32 flex flex-col gap-8">
        <div class="prose sm:prose-lg xl:prose-xl max-w-none">
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
        </div>
        <TeamSection
          v-if="directorsTeam && directorsTeam[0]"
          :department-name="directorsTeam && directorsTeam[0]?.primary.department ? 'Our ' + directorsTeam[0]?.primary.department : 'Our Directors'"
        >
          <TeamMember
            v-for="(member, key) in directorsTeam"
            :key="key"
            :name="asText(member.primary.name)!"
            :href="asLink(member?.primary.link)!"
            :img="asLink(member?.primary.img)!"
            :description="asText(member.primary.description)!"
          />
        </TeamSection>
      </section>
      <Swoosh />
    </div>
    <section class="contain py-16 flex flex-col gap-10">
      <h2 class="text-neutral-800 text-5xl font-semibold max-md:text-4xl ">
        Meet the Team
      </h2>
      <div class="flex flex-col mr-auto">
        <label
          for="department-filter"
          class="block text-neutral-600 font-semibold"
        >Department:</label>
        <select
          id="department-filter"
          class="
            block w-full px-4 py-2 mt-2 mx-4 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ri ng-neutral-600 focus:border-neutral-600
          "
          @change="($event) => filterTeam(($event.target as HTMLSelectElement).value)"
        >
          <option value="">
            All
          </option>
          <option
            v-for="(subTeam, mainKey) in allDepartments"
            :key="mainKey"
            :value="subTeam"
          >
            {{ subTeam }}
          </option>
        </select>
      </div>
      <TeamSection
        v-for="(subTeam, mainKey) in teamStructure"
        :key="mainKey"
        :department-name="subTeam.teamName"
      >
        <TeamMember
          v-for="(member, key) in subTeam.members"
          :key="key"
          :name="asText(member.primary.name)!"
          :href="asLink(member?.primary.link)!"
          :img="asLink(member.primary.img)!"
          :description="asText(member.primary.description)!"
          class="bg-white rounded-lg p-6"
        />
      </TeamSection>
    </section>
    <div
      class="flex flex-col justify-center items-center bg-pistachio-green rounded-xl py-6 md:py-12 px-6 md:px-16"
    >
      <div class="w-full flex justify-center my-12">
        <button
          class="button-green max-w-md md:w-max"
          @click="$router.push('/team/alumni')"
        >
          View Alumni
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineSliceZoneComponents } from '@prismicio/vue'
import { asText, asLink } from '@prismicio/helpers'
import type { TeamMemberSliceSlice } from 'prismicio-types'
import { components } from '~~/slices'

const sliceComps = ref(defineSliceZoneComponents(components))

const { client } = usePrismic()
const { data: team } = await useAsyncData('team', () =>
  client.getSingle('teampage', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices'],
  }),
)
usePrismicSEO(team?.value?.data)

const departments = team.value?.data.slices1[0]?.primary.department
const allDepartments = team.value?.data.slices1.filter(
  member => member.primary.department !== 'Alumni' && member.primary.department !== 'Directors',
).map(
  member => member.primary.department,
).filter(
  (value, index, self) => self.indexOf(value) === index,
)
const originalTeamStructure = team?.value?.data?.slices1.reduce((accumulator: { teamName: typeof departments, members: TeamMemberSliceSlice[] }[], member) => {
  const department = member.primary.department
  if (department !== 'Directors' && department !== 'Alumni') {
    const existingTeamIndex = accumulator.findIndex(team => team.teamName === department)
    if (existingTeamIndex >= 0) {
      accumulator[existingTeamIndex].members.push(member)
    } else {
      accumulator.push({ teamName: department, members: [member] })
    }
  }
  return accumulator
}, []).sort(
  (a, b) => a.teamName && b.teamName ? a.teamName?.localeCompare(b.teamName) : 0,
).sort(
  (a, b) => a.teamName === 'Other' ? 1 : b.teamName === 'Other' ? -1 : 0,
)

const teamStructure = ref(originalTeamStructure)
const filterTeam = (filteredDepartment: string) => {
  teamStructure.value = filteredDepartment ? originalTeamStructure?.filter(team => team.teamName === filteredDepartment) : originalTeamStructure
}

const directorsTeam = team?.value?.data.slices1.filter(team => team.primary.department === 'Directors')
</script>
