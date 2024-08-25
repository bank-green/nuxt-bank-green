<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain pt-28 pb-12">
        <h1
          class="text-2xl font-semibold whitespace-pre-line mb-4 md:text-center"
        >
         {{ partnersData.title }}
        </h1>
        <h2 class="text-gray-600 md:text-center">
          {{ partnersData.description }}
        </h2>
        <div class="max-w-4xl mx-auto py-16 grid grid-cols-6 gap-4 lg:gap-10">
          <a
            v-for="partner in partnersList"
            :key="partner.name"
            :href="asLink(partner.url)"
            class="block col-span-6 sm:col-span-3 md:col-span-2 w-full h-40 bg-white rounded-3xl px-8 py-6 hover:shadow-xl transition-all duration-500 ease-in-out filter-grayscale hover:filter-none"
            rel="noopener"
            target="_blank"
          >
            <NuxtImg
              v-if="asLink(partner?.img)"
              :src="asLink(partner?.img)"
              class="object-center object-contain w-full h-full"
              loading="lazy"
              provider="none"
            />
          </a>
        </div>
        <div
          class="mx-auto max-w-4xl flex flex-row justify-center items-center pb-12"
        >
          <SignupBox tag="partners bottom" class="w-full mt-8" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SignupBox from '@/components/forms/SignupBox.vue'
import { asLink } from '@prismicio/helpers'

const { client } = usePrismic()
const { data: partners } = await useAsyncData('partner', () =>
  client.getSingle('partnerspage', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices']
  })
)
usePrismicSEO(partners?.value?.data)

const partnersData = partners?.value?.data
const partnersList = partners?.value?.data?.partners

</script>

/*
[
  {
    name: 'banktrack',
    url: 'https://banktrack.org',
    img: 'banktrack.org.png'
  },
  {
    name: 'reclaimfinance',
    url: 'https://reclaimfinance.org',
    img: 'reclaimfinance.org.png'
  },
  {
    name: 'xr',
    url: 'https://rebellion.global',
    img: 'rebellion.global.png'
  },
  {
    name: 'xryouth',
    url: 'https://xryouth.org',
    img: 'xryouth.org.png'
  },
  {
    name: 'urgewald',
    url: 'https://urgewald.org',
    img: 'urgewald.org.png'
  },
  {
    name: 'tni',
    url: 'https://tni.org',
    img: 'tni.org.png'
  },
  {
    name: 'portfolio',
    url: 'https://portfolio.earth',
    img: 'portfolio.earth.png'
  },
  {
    name: 'greenpeace',
    url: 'https://www.greenpeace.org.uk',
    img: 'www.greenpeace.org.uk.png'
  },
  {
    name: 'bankonourfuture',
    url: 'https://bankonourfuture.uk',
    img: 'bankonourfuture.uk.png'
  },
  {
    name: 'foecanada',
    url: 'https://foecanada.org',
    img: 'foecanada.org.png'
  },
  {
    name: 'theclimateapp',
    url: 'https://theclimateapp.earth',
    img: 'theclimateapp.earth.png'
  },
  {
    name: 'koalakollektiv',
    url: 'https://koalakollektiv.de',
    img: 'koala.png'
  },
  {
    name: 'earthhero',
    url: 'https://www.earthhero.org/',
    img: 'earthhero.png'
  },
  {
    name: 'climatepledgecollective',
    url: 'https://www.climatepledgecollective.org/',
    img: 'climatepledgecollective.org.png'
  },
  {
    name: 'sunriseboston',
    url: 'https://twitter.com/sunriseboston/',
    img: 'sunriseboston.png'
  },
  {
    name: 'below2c',
    url: 'https://below2c.org/',
    img: 'below2c.png'
  },
  {
    name: 'compendia',
    url: 'https://www.compendia.studio',
    img: 'compendia.png'
  },
  {
    name: 'thecarbonalmanac',
    url: 'https://thecarbonalmanac.org/',
    img: 'thecarbonalmanac.png'
  }
]

