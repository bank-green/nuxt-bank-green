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
            {{ embrace.data.introduction }}
          </h1>
          <h3
            class="max-w-3xl text-2xl font-semibold whitespace-pre-line mb-8 text-center"
          >
            {{ embrace.data.sub_introduction }}
          </h3>
          <PrismicRichText
                class="prose md:text-lg whitespace-pre-wrap"
                :field="embrace.data.description1"
          />
          <div class="max-w-6xl flex flex-col-reverse lg:flex-row items-center">
            <div ref="signUpForm" class="w-full relative z-10">
              <Embrace />
            </div>
          </div>
        </div>
        <Swoosh />
      </div>
    </div>
    <Donation background="dark" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swoosh from '@/components/Swoosh.vue'

const { client } = usePrismic()
const { data: embrace } = await useAsyncData('embrace', () =>
  client.getSingle('embracepage')
)
usePrismicSEO(embrace.value.data)

const signUpForm = ref()
</script>
