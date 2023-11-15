<template>
  <div class="page">
    <div class="bg-gradient-to-b from-sushi-50 to-sushi-100 pt-28">
      <div
        class="page-fade-in relative z-10 contain max-w-4xl flex flex-col justify-center items-center"
      >
        <LottiePlayer
          class="w-20 h-20 mb-4 md:mb-6"
          :path="'/anim/emoji/Sad_Tear_Flat.json'"
        />

        <h1
          class="text-2xl md:text-4xl text-center text-gray-800 font-semibold whitespace-pre-line mb-8"
        >
          <PrismicRichText :field="notlisted.data.text1" />
        </h1>
        <PrismicRichText class="textlink" :field="notlisted.data.text2" />
      </div>
      <Swoosh />
    </div>

    <div class="text-gray-800 overflow-hidden py-16">
      <div class="contain">
        <div
          class="flex flex-col md:flex-row items-center justify-center pt-8 pb-16"
        >
          <div class="md:w-1/2 max-w-sm">
            <p class="text-lg md:text-2xl tracking-wide mb-4">
              <b>{{ asText(notlisted.data.text3) }} </b> {{ asText(notlisted?.data.text4) }}
            </p>
            <p
              class="md:text-xl tracking-wide whitespace-pre-line text-gray-600 mb-12 md:mb-0"
            >
              <PrismicRichText :field="notlisted?.data.text5" />
            </p>
          </div>
          <img
            class="md:order-first md:w-2/5 -mx-24 md:mx-0 md:mr-24"
            src="/img/illustrations/dig.svg"
            alt=""
          >
        </div>
      </div>
    </div>

    <div class="bg-blue-100 text-gray-800 overflow-hidden">
      <Swoosh direction="down" />
      <div class="contain">
        <div class="flex justify-center text-left">
          <div
            class="max-w-4xl flex flex-col md:flex-row items-center justify-center md:space-x-8"
          >
            <div class="md:w-1/2 max-w-sm">
              <PrismicRichText :field="notlisted?.data.text6" class="text-lg md:text-2xl tracking-wide mb-4" />
            </div>
            <CheckList class="md:w-1/2 my-8" :list="checkList" />
          </div>
        </div>

        <div class="flex flex-row justify-center items-center">
          <SubmitBank tag="not listed bottom" class="max-w-4xl w-full" />
        </div>
      </div>

      <div class="flex flex-row items-center justify-center">
        <LottiePlayer
          path="/anim/money_smoke.json"
          class="w-full md:max-w-2xl h-42 object-cover object-bottom"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { asText } from '@prismicio/helpers'
import SubmitBank from '@/components/forms/SubmitBank.vue'
const { client } = usePrismic()
const { data: notlisted } = await useAsyncData('notlisted', () =>
  client.getByUID('textonlypages', 'notlisted'))

const checkList = [
  'Learn about the issues via our blog updates',
  'Join our campaigns to take action against fossil finance',
  'Discover other ways to divest from fossil fuels'
]
useHeadHelper('Not listed')
</script>
