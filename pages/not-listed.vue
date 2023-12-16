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
        <div v-if="notlisted?.data">
          <h1
            class="text-2xl md:text-4xl text-center text-gray-800 font-semibold whitespace-pre-line mb-8"
          >
            <PrismicRichText :field="notlisted?.data.text1" />
          </h1>
          <PrismicRichText class="textlink" :field="notlisted?.data.text2" />
        </div>
        <div v-else>
          <h1
            class="text-2xl md:text-4xl text-center text-gray-800 font-semibold whitespace-pre-line mb-8"
          >
            Sorry, we haven’t listed your bank yet.
          </h1>
          <p>
            We’re working hard to increase the number of banks we provide data on.
            If you
            <NuxtLink
              to="/contact"
              class="font-bold text-sushi-500 hover:underline"
            >
              tell us your bank’s name
            </NuxtLink>
            , we’ll try to include it as soon as possible. In the meantime, we
            encourage you to consider contacting your bank to ask them whether
            they fund fossil fuels. But that’s not all you can do. To take further
            positive action, keep on scrolling…
          </p>
        </div>
      </div>
      <Swoosh />
    </div>

    <div class="text-gray-800 overflow-hidden py-16">
      <div class="contain">
        <div
          class="flex flex-col md:flex-row items-center justify-center pt-8 pb-16"
        >
          <div class="md:w-1/2 max-w-sm">
            <div v-if="notlisted?.data">
              <p class="text-lg md:text-2xl tracking-wide mb-4">
                <b>{{ asText(notlisted?.data.text3) }} </b> {{ asText(notlisted?.data.text4) }}
              </p>
            </div>
            <div v-else>
              <p class="text-lg md:text-2xl tracking-wide mb-4">
                <b>Bank.Green was founded on the belief that banks have had an
                  easy time from their customers for too long</b>. Mass movements will pull us out of the climate crisis – and
                they’ll pull your bank out, too.
              </p>
            </div>
            <p
              class="md:text-xl tracking-wide whitespace-pre-line text-gray-600 mb-12 md:mb-0"
            >
              <PrismicRichText
                :field="notlisted?.data.text5"
                fallback="Our mission is to encourage as many people as possible to take a stand - to refuse to
                let their money fuel environmental destruction any longer. Considering who you bank with, we think you probably agree.
                This is your chance to spread the word with us."
              />
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
              <PrismicRichText
                :field="notlisted?.data.text6"
                class="text-lg md:text-2xl tracking-wide mb-4"
                fallback="We can’t say it better than environmentalist Bill McKibben:
                “Money is the oxygen on which the fire of global warming burns.”
                But don’t wait for the fire department to turn up – join us!"
              />
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
<script setup lang="ts">
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
