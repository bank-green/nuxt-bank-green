<template>
  <LocationSearch
    v-model="country"
    class="mb-8 md:max-w-sm md:mx-auto z-50"
  />
  <div
    v-if="banks.length"
    class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min"
  >
    <ThanksEcoBankList
      :loaded="loaded"
      :list="banks"
    />
  </div>
  <div
    v-if="banks.length"
    class="sm:text-center"
  >
    <NuxtLink
      to="/sustainable-eco-banks"
      class="mt-6 button-green sm:inline-block sm:w-64"
    >
      Show more
    </NuxtLink>
  </div>
</template>

<script setup>
import LocationSearch from '@/components/forms/location/LocationSearch.vue'

const { country } = useCountry()
const fetchGql = useGql()

const banks = ref([])
const loaded = ref(false)
const loadBanks = async () => {
  if (!country.value) {
    return
  }

  // TODO: Why are we fetching all this data ?
  // only to filter it out and send it to a component that doesnt use it ?
  banks.value = await fetchGql('BrandsQuery', {
    country: country.value,
    recommendedOnly: true,
    withCommentary: true,
    withFeatures: true,
    first: 3,
  }).then(data => data.brands.edges.map(o => o.node).map(b => ({
    // return "top" only
    ...b,
    ...b.commentary,
    rating: b.commentary?.ratingInherited?.toLowerCase() ?? 0,
  })))

  loaded.value = true
}
onMounted(loadBanks)
watch(country, loadBanks)
</script>
