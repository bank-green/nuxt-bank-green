<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain pt-28 pb-12">
        <h1
          class="text-2xl font-semibold whitespace-pre-line mb-4 md:text-center"
        >
          {{ partnersData?.title || 'Our Partners' }}
        </h1>
        <h2 class="text-gray-600 md:text-center">
          {{ partnersData?.description || 'Below is a list of our amazing partners, together with whom we are reshaping finance.' }}
        </h2>
        <div class="max-w-4xl mx-auto py-16 grid grid-cols-6 gap-4 lg:gap-10">
          <a
            v-for="partner in partnersList"
            :key="partner?.name"
            :href="asLink(partner?.url)"
            class="block col-span-6 sm:col-span-3 md:col-span-2 w-full h-40 bg-white rounded-3xl px-8 py-6 hover:shadow-xl transition-all duration-500 ease-in-out filter-grayscale hover:filter-none"
            rel="noopener"
            target="_blank"
          >
            <NuxtImg
              v-if="asImageSrc(partner?.img)"
              :src="asImageSrc(partner?.img)"
              class="object-center object-contain w-full h-full"
              loading="lazy"
              provider="none"
            />
          </a>
        </div>
        <div
          class="mx-auto max-w-4xl flex flex-row justify-center items-center pb-12"
        >
          <SignupBox
            tag="partners bottom"
            class="w-full mt-8"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { asLink, asImageSrc } from '@prismicio/helpers'
import SignupBox from '@/components/forms/SignupBox.vue'

const { client } = usePrismic()
const { data: partners } = await useAsyncData('partner', () => client.getSingle('partnerspage'))
usePrismicSEO(partners?.value?.data)

const partnersData = partners?.value?.data
const partnersList = partners?.value?.data?.partners

</script>
