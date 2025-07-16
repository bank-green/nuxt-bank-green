<script setup lang="ts">
import ClearbitLogo from '@/components/icons/ClearbitLogo.vue'

const bank = {
  name: 'Atmos Financial',
  logo: '/img/bank-logo.png',
  certifications: [
    { src: '/img/certification/fossil-free-certified.png', alt: 'Fossil Free' },
    { src: '/img/certification/TopPick.svg', alt: 'Top Pick' },
  ],
  highlights: {
    'Interest Rate': 'Up to 3.5%',
    'Deposit Protection': 'Up to $250,000',
  },
  categories: {
    Personal: ['Credit Cards', 'Checking Account', 'Saving Account', 'Mortgage'],
    Business: ['Checking Account', 'Saving Account', 'Corporate Lending', 'SEM Lending'],
    Services: ['Mobile Banking', 'No Overdraft Fee', 'Free ATM Network*'],
  },
}

const props = defineProps<{
  item: any
  isNoCredit: boolean
}>()

const features = computed(() => {
  // filter our credit card
  const features = getFeatures(props.item?.bankFeatures) as Record<string, any>
  const allFeatures: Record<string, any> = {}
  for (const [featKey, featValue] of Object.entries(features)) {
    if (
      (props.isNoCredit && featKey === 'Credit Card')
      || !featValue.isChecked
    ) {
      continue
    }
    allFeatures[featKey] = features[featKey]
  }
  return allFeatures
})
</script>

<template>
  <NuxtLink
    :to="item ? `/sustainable-eco-banks/${item.tag}` : ''"
    class="block mb-6 rounded-2xl shadow-sm bg-white transition duration-150 ease-in-out hover:bg-gray-50 border border-transparent hover:border-sushi-500"
  >
    <div class="max-w-[912px] bg-white border border-gray-200 rounded-2xl px-6 pt-6 pb-4 mx-auto shadow-md">
      <!-- Header -->
      <div class="block md:flex md:justify-between md:items-start">
        <div class="flex items-center gap-3 sm:mb-4">
          <div class="relative w-12 h-12">
            <ClearbitLogo
              :url="item.website"
              :size="48"
              img-class="absolute inset-0 z-20"
            />
          </div>
          <h2 class="text-xl font-semibold text-gray-800">{{ item.name }}
          </h2>
        </div>
        <div class="flex gap-2">
          <img
            v-if="item.fossilFreeAlliance"
            class="w-16 h-10 ml-2 object-cover rounded-none"
            src="/img/certification/fossil-free-certified.png"
            alt="Fossil Free Certification"
          >
          <img
            v-if="item.topPick"
            class="w-16 h-10 ml-2 object-cover rounded-none"
            src="/img/certification/TopPick.svg"
            alt="Top Pick"
          >
        </div>
      </div>

      <!-- Highlights -->
      <div class="grid grid-cols-2 gap-6 mt-6">
        <div v-for="(val, key) in bank.highlights" :key="key">
          <div class="text-sm text-gray-500">{{ key }}</div>
          <div class="text-base font-semibold text-gray-900 mt-1">{{ val }}</div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 my-6"></div>

      <!-- Categories -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        <div v-for="(items, category) in bank.categories" :key="category">
          <div class="text-sm font-semibold text-gray-900 mb-2">{{ category }}</div>
          <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li v-for="item in items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>

      <!-- Learn More -->
      <div class="flex justify-end mt-4">
        <button class="inline-flex items-center text-sushi-600 font-medium text-sm hover:underline">
          Learn more
          <svg
            class="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </NuxtLink>
</template>
