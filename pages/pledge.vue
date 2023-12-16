<template>
  <div class="page">
    <div class="page-fade-in overflow-hidden max-w-screen">
      <div class="bg-gradient-to-b from-sushi-50 to-sushi-100 pt-28">
        <div
          class="contain flex flex-col justify-center items-center pb-4 lg:pb-0 mb-4"
        >
          <h1
            class="max-w-3xl text-2xl font-semibold whitespace-pre-line mb-8 text-center"
          >
            {{ asText(pledge?.data.introduction) || "Let's send a message to the climate crisis funders that we won't tolerate their behavior" }}
          </h1>
          <div class="max-w-6xl flex flex-col-reverse lg:flex-row items-center">
            <div ref="signUpForm" class="w-full lg:w-3/5 relative z-10">
              <PledgeSignup />
            </div>
            <div class="w-full lg:w-2/5 mt-8 lg:mt-0 lg:ml-8">
              <PrismicRichText
                class="prose md:text-lg whitespace-pre-wrap"
                :field="pledge?.data.description1"
                fallback="Taking the Bank.Green pledge is a statement: the banking industry’s
              unsustainable financing activities are unacceptable and my money will not be a part of it.
              By pledging to move your money away, you will:"
              />
              <CheckList class="my-6 md:text-lg" :list="checkList" />
            </div>
          </div>
        </div>
        <Swoosh />
      </div>
    </div>

    <div
      class="contain max-w-6xl flex flex-col md:flex-row md:items-center mt-12 pb-16"
    >
      <div
        class="md:max-w-lg prose md:text-lg whitespace-pre-wrap md:mr-8 mb-12 md:mt-0"
      >
        <PrismicRichText
          :field="pledge?.data.description2"
          fallback="Error Loading Content!"
        />
        <div class="w-full flex justify-center mt-12">
          <button class="button-green max-w-md md:w-max" @click="scrollToForm">
            Take the Pledge
          </button>
        </div>
      </div>
      <NuxtImg
        src="/img/illustrations/pledge.png"
        class="w-full"
        loading="lazy"
        provider="none"
      />
    </div>

    <Donation background="dark" />
  </div>
</template>

<script setup>
import { asText } from '@prismicio/helpers'
import { ref } from 'vue'
import Swoosh from '@/components/Swoosh.vue'
import CheckList from '@/components/CheckList.vue'

const checkList = [
  'Send a message to your bank that it must defund fossil fuels',
  'Join a fast-growing movement of consumers standing up for their future',
  'Take a critical climate action with profound effects'
]
const { client } = usePrismic()
const { data: pledge } = await useAsyncData('pledge', () =>
  client.getSingle('pledgepage')
)
usePrismicSEO(pledge.value.data)

const signUpForm = ref()
const scrollToForm = () => {
  if (!signUpForm.value) { return }
  window.scrollTo({
    top: signUpForm.value.offsetTop - 100,
    behavior: 'smooth'
  })
}
</script>
