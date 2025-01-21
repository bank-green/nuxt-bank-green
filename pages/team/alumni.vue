<template>
  <div class="page">
    <section class="contain py-16 flex flex-col gap-10">
      <h2 class="text-neutral-800 text-5xl font-semibold mt-10 max-md:text-4xl ">
        Our Alumni Members
      </h2>
      <div
        class="flex flex-col gap-6 w-full"
      >
        <ul
          class="flex gap-6 justify-evenly flex-wrap"
        >
          <TeamMember
            v-for="(member, key) in alumniTeam"
            :key="key"
            :name="asText(member.primary.name)!"
            :href="asLink(member?.primary.link)!"
            :img="asLink(member?.primary.img)!"
            :description="asText(member.primary.description)!"
            class="bg-white rounded-lg p-6"
          />
        </ul>
      </div>
    </section>
    <div
      class="flex flex-col justify-center items-center bg-pistachio-green rounded-xl py-6 md:py-12 px-6 md:px-16"
    >
      <div class="w-full flex justify-center my-12">
        <button
          class="button-green max-w-md md:w-max"
          @click="$router.push('/team')"
        >
          Back to Current Contributors
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { asText, asLink } from '@prismicio/helpers'

const { client } = usePrismic()
const { data: team } = await useAsyncData('team', () =>
  client.getSingle('teampage', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices'],
  }),
)
usePrismicSEO(team?.value?.data)

const alumniTeam = team?.value?.data.slices1.filter(team => team.primary.department === 'Alumni')
</script>
