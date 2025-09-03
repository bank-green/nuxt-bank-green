<template>
  <div>
    <div class="bg-sushi-50">
      <div class="page-fade-in contain sm:pb-32 pb-0">
        <div
          v-if="ecobanks?.data?.slices"
          class="prose mx-auto max-w-[800px] prose-headings:text-center prose-h1:font-semibold sm:pt-9 pt-2 sm:pb-20 text-lg [&_h1]:!px-0"
        >
          <SliceZone
            :slices="ecobanks?.data?.slices ?? []"
            :components="sliceComps"
          />
        </div>

        <div>
          <div class="flex flex-col md:flex-row md:items-start items-stretch">
            <EcoBankFilters
              v-if="country"
              :country="country"
              :on-select-state="onSelectState"
              :state-licensed="stateLicensed"
              @filter="applyFilter"
            />

            <div class="relative w-full md:ml-6">
              <LocationSearch v-model="country" class="z-30 mb-8" />

              <div v-if="!country">
                <h2
                  class="w-full px-5 py-4 bg-gray-100 border border-gray-300 rounded-2xl text-sm"
                >
                  <div class="font-medium text-gray-600">
                    No country selected
                  </div>
                  <div class="text-sm text-gray-500">
                    To continue, please select a country.
                  </div>
                </h2>
              </div>
              <div v-else>
                <div
                  v-if="banks.length"
                  :class="[loading ? 'opacity-50 pointer-events-none' : '']"
                  class="transition"
                >
                  <EcoBankCards :list="banks" />
                </div>
                <SliceZone
                  v-else-if="!loading && errorMessage"
                  :slices="ecobanks?.data?.slices2 ?? []"
                  :components="sliceComps"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:bg-blue-100 bg-sushi-50 px-2 pb-14 sm:pb-0">
      <EcoBankIntroductory
        :eco-banks-data="ecobanks?.data"
        :slice-comps="sliceComps"
      />
      <!-- Money Smoke Animation -->
      <div class="md:flex hidden flex-row items-center justify-center">
        <LazyLottiePlayer
          path="/anim/money_smoke.json"
          class="w-full md:max-w-2xl h-42 object-cover object-bottom"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import LocationSearch from '@/components/forms/location/LocationSearch.vue'
import { components } from '~~/slices'
import type { EcoBanksQueryPayload } from '@/utils/types/eco-banks.type.ts'
import {
  sortEcoBanks,
  extractFeatures,
  type EcoBankCard,
  type HarvestDataInterestRate,
  extractInterestRate,
  extractDepositProtection,
  type HarvestDataDepositProtection,
} from '~/utils/sustainableEcoBanksUtils'
import {
  STATES_BY_COUNTRY,
  type StateCode,
} from '~/components/forms/location/iso3166-2States'

const fetchGql = useGql()

const sliceComps = ref(defineSliceZoneComponents(components))

const { client } = usePrismic()

const { data: ecobanks } = await useAsyncData('ecobanks', () =>
  client.getSingle('ecobankspage', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices'],
  })
)

usePrismicSEO(ecobanks?.value?.data)

const route = useRoute()
const router = useRouter()

// if country or state are provided by url query, it will be used initially
// example: /sustainable-eco-banks?country=us&state=us-ca
const initCountry =
  (typeof route.query.country == 'string' &&
    (route.query?.country?.toUpperCase() as string)) ||
  useCountry().country.value

const initState =
  typeof route.query?.state == 'string' &&
  // @ts-expect-error: ts(7052) 'string' can't be used to index an object
  Object.values(STATES_BY_COUNTRY?.[initCountry]).includes(
    route.query?.state?.toUpperCase()
  ) &&
  (route.query?.state?.toUpperCase() as StateCode)

const country = ref(initCountry)
const stateLicensed = ref<StateCode | null>(initState || null)

router.replace({ query: {} })
const banks = ref<EcoBankCard[]>([])
const loading = ref(false)
const errorMessage = ref(false)

const loadBanks = async ({
  harvestData,
  stateLicensed,
}: EcoBanksQueryPayload) => {
  loading.value = true

  if (!country.value) {
    return
  }
  const isNoCredit = country.value === 'FR' || country.value === 'DE'

  banks.value =
    (await fetchGql('FilteredBrandsQuery', {
      country: country.value,
      recommendedOnly: true,
      first: 300,
      withCommentary: true,
      stateLicensed,
      harvestData,
    }).then(data =>
      data?.brands?.edges
        .map(o => o?.node)
        .filter(brand => brand?.commentary?.showOnSustainableBanksPage)
        .sort(sortEcoBanks)
        .map<EcoBankCard>(brand => ({
          name: brand?.name || '',
          website: brand?.website || '',
          tag: brand?.tag || '',
          topPick: !!brand?.commentary?.topPick,
          fossilFreeAlliance: !!brand?.commentary?.fossilFreeAlliance,
          features: extractFeatures(brand?.harvestData, isNoCredit),
          interestRate: extractInterestRate(
            brand?.harvestData?.financialFeatures?.interest_rates
              ?.rates as HarvestDataInterestRate[]
          ),
          depositProtection: extractDepositProtection(
            brand?.harvestData?.policies
              ?.deposit_protection as HarvestDataDepositProtection
          ),
        }))
    )) || []

  loading.value = false
  if (banks.value.length === 0) errorMessage.value = true
}

const applyFilter = (filterQueryData: EcoBanksQueryPayload) => {
  loadBanks(filterQueryData)
}
const onSelectState = (payload: { value: string } | null): void => {
  stateLicensed.value = payload?.value
    ? // @ts-expect-error: ts(7052) 'string' can't be used to index an object
      STATES_BY_COUNTRY?.[country.value]?.[payload?.value] || null
    : null
}

watch(country, () => {
  stateLicensed.value = null
})
</script>
