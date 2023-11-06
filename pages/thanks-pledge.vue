<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain pt-28">
        <div class="pb-16">
          <div>
            <LottiePlayer
              class="absolute -top-28 inset-x-0 w-64 mx-auto"
              path="/anim/pop.json"
            />
            <svg
              class="mx-auto relative z-1"
              width="119"
              height="51"
              viewBox="0 0 119 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="62.5" cy="25.0222" r="25" fill="#87B448" />
              <path
                d="M53.5 24.3603L59.9413 30.8015L71.5 19.2428"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="text-gray-700 max-w-lg mx-auto whitespace-pre-line headerstyle" style="text-align: center;">
              <SliceZone
                :slices="thankyou.data.slices"
                :components="sliceComps"
              />
            </div>
            <div class="flex justify-center">
              <SocialSharer
                class="text-sushi-500"
                url="https://bank.green"
                :hashtags="['climatecrisis', 'fossilbanks']"
                :text="'yoo'"
                :large="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'

const sliceComps = ref(defineSliceZoneComponents(components))

useHeadHelper('Thank you')
const { client } = usePrismic()
const { data: thankyou } = await useAsyncData('thankyou', () =>
  client.getSingle('thankyoupage', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices']
  }))
</script>
<style>
  .headerstyle h1{
    margin-top: 2rem; /* Equivalent to mt-8 */
    font-size: 1.5rem; /* Equivalent to text-2xl */
    font-weight: 600; /* Equivalent to font-semibold */
    white-space: pre-line; /* Equivalent to whitespace-pre-line */
    margin-bottom: 2rem; /* Equivalent to mb-8 */
  }
</style>
