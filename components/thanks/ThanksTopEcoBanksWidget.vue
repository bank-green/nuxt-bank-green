<template>
  <LocationSearch class="mb-8 md:max-w-sm md:mx-auto z-50" v-model="country" />
  <div
    v-if="banks.length"
    class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min"
  >
    <ThanksEcoBankList :loaded="loaded" :list="banks" />
  </div>
  <div v-if="banks.length" class="sm:text-center">
    <NuxtLink
      to="/sustainable-eco-banks"
      class="mt-6 button-green sm:inline-block sm:w-64"
      >Show more</NuxtLink
    >
  </div>
</template>

<script setup>
import LocationSearch from "@/components/forms/location/LocationSearch.vue";

const { country } = useCountry();

const banks = ref([]);
const loaded = ref(false);
const loadBanks = async () => {
  if (!country.value) {
    return;
  }
  banks.value = await getBanksList({
    country: country.value,
    topOnly: true,
  });
  loaded.value = true;
};
onMounted(loadBanks);
watch(country, loadBanks);
</script>
