<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain max-w-3xl xl:max-w-4xl py-24 sm:py-32">
          <article class="prose sm:prose-lg xl:prose-xl mx-auto">
            <div v-if="team?.data.slices">
              <SliceZone
                :slices="team?.data.slices ?? []"
                :components="sliceComps"
              />
            </div>
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

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'
const sliceComps = ref(defineSliceZoneComponents(components))

const { client } = usePrismic()
const { data: team } = await useAsyncData('team', () =>
  client.getSingle('teampage', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices']
  })
)
usePrismicSEO(team.value?.data)
</script>
