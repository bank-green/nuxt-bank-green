<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain pt-28">
        <div class="pb-16">
          <div class="text-center relative">
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

            <h1 class="mt-8 text-2xl font-semibold whitespace-pre-line mb-8">
              <PrismicRichText
                :field="thankspledge?.data.title"
                fallback="Thank you for your pledge!"
              />
            </h1>

            <PrismicRichText
              class="text-gray-700 px-4 max-w-lg mx-auto whitespace-pre-line"
              :field="thankspledge?.data.content1"
              fallback="You've just taken an amazing action to help build a better future"
            />
            <PrismicRichText
              class="text-gray-700 px-4 max-w-lg mx-auto whitespace-pre-line"
              :field="thankspledge?.data.content2"
              fallback="Why not encourage your friends to do the same..."
            />
            <div v-if="thankspledge?.data.slices" class="flex justify-center">
              <SliceZone
                :slices="thankspledge?.data.slices ?? []"
                :components="sliceComps"
              />
            </div>
            <div v-else class="flex justify-center">
              <SocialSharer
                class="text-sushi-500"
                url="https://bank.green"
                :hashtags="['climatecrisis', 'fossilbanks']"
                :text="'I just pledged to move my money away from fossil fuels! Check your bank and do the same'"
                :large="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'
useHeadHelper('Thank you')
const sliceComps = ref(defineSliceZoneComponents(components))
const { client } = usePrismic()
const { data: thankspledge } = await useAsyncData('thankspledge', () =>
  client.getSingle('thankspledge')
)
</script>
