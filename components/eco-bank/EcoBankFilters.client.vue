<!-- TODO in claudia/groot-303-update-filter-component -->
<template>
  <div
    class="bg-white hover:bg-gray-50 px-5 py-4 md:py-0 md:px-0 md:bg-transparent md:hover:bg-transparent cursor-pointer md:cursor-auto flex items-center"
    :class="{
      'rounded-xl': !showFilters,
      'rounded-t-xl': showFilters,
    }"
    @click="toggleFilters"
  >
    <h4 class="font-semibold text-left md:text-xl">
      Filter
    </h4>

    <button
      v-if="isFilterDirty"
      class="ml-6 text-sm text-sushi-500 hover:text-sushi-600 font-semibold focus:outline-none"
      @click="setDefaultFilter"
    >
      Reset
    </button>
  </div>

  <div
    v-show="showFilters"
    class="flex flex-col bg-gray-50 md:bg-transparent px-5 py-4 md:py-0 md:px-0"
  >
    <h5 class="text-xs uppercase font-semibold md:mt-6 mb-2">
      Location
    </h5>
    <div class="flex flex-col space-y-1">
      <CheckboxSection
        v-model="searchByLocation"
        class="col-span-full"
        name="local_branches"
      >
        Local branches
      </CheckboxSection>
      <RegionSearch
        v-if="searchByLocation"
        ref="regionPicker"
        class="pb-4 md:max-w-sm md:mx-auto z-30"
        @select="onSelectLocation"
      />
    </div>

    <h5 class="text-xs uppercase font-semibold mt-6 mb-2">
      Top Pick
    </h5>
    <CheckboxSection
      v-model="filterPayload.topPick"
      class="col-span-full"
      name="topPick"
    >
      Top Pick
    </CheckboxSection>

    <h5 class="text-xs uppercase font-semibold mt-6 mb-2">
      Fossil Free Alliance
    </h5>
    <CheckboxSection
      v-model="filterPayload.fossilFreeAlliance"
      class="col-span-full"
      name="fossilFreeAlliance"
    >
      Fossil Free Alliance
    </CheckboxSection>

    <h5 class="text-xs uppercase font-semibold mt-6 mb-2">
      Convenience
    </h5>
    <div class="flex flex-col space-y-1">
      <CheckboxSection
        v-model="filterPayload.convenience['Mobile banking']"
        class="col-span-full"
        name="Mobile banking"
      >
        Mobile banking
      </CheckboxSection>
      <CheckboxSection
        v-model="filterPayload.convenience['Free ATM network']"
        class="col-span-full"
        name="Free ATM network"
      >
        Free ATM network
      </CheckboxSection>
      <CheckboxSection
        v-model="filterPayload.convenience['No overdraft fee']"
        class="col-span-full"
        name="No overdraft fee"
      >
        No overdraft fee
      </CheckboxSection>
      <CheckboxSection
        v-model="filterPayload.convenience['No account maintenance fee']"
        class="col-span-full"
        name="No account maintenance fee"
      >
        No account maintenance fees
      </CheckboxSection>
    </div>

    <h5 class="text-xs uppercase font-semibold mt-6 mb-2">
      Bank Accounts
    </h5>
    <div class="flex flex-col space-y-1">
      <CheckboxSection
        v-model="filterPayload.bankAccounts.checking"
        class="col-span-full"
        name="checking"
      >
        {{ isBE() ? "Current accounts" : "Checking accounts" }}
      </CheckboxSection>
      <CheckboxSection
        v-model="filterPayload.bankAccounts.saving"
        class="col-span-full"
        name="saving"
      >
        Savings accounts
      </CheckboxSection>
      <CheckboxSection
        v-model="filterPayload.bankAccounts['Interest rates']"
        class="col-span-full"
        name="Interest rates"
      >
        Interest rates
      </CheckboxSection>
      <CheckboxSection
        v-model="filterPayload.bankAccounts['Business accounts']"
        class="col-span-full"
        name="Business accounts"
      >
        {{ isBE() ? "Business current accounts" : "Business checking accounts" }}
      </CheckboxSection>
      <CheckboxSection
        v-model="filterPayload.bankAccounts['Business savings accounts']"
        class="col-span-full"
        name="Business Savings Accounts"
      >
        Business savings accounts
      </CheckboxSection>
      <CheckboxSection
        v-model="filterPayload.bankAccounts['Small business lending']"
        class="col-span-full"
        name="Small business lending"
      >
        Small business lending
      </CheckboxSection>
      <CheckboxSection
        v-model="filterPayload.bankAccounts['Corporate lending']"
        class="col-span-full"
        name="Corporate Lending"
      >
        Corporate Lending
      </CheckboxSection>
      <CheckboxSection
        v-model="filterPayload.bankAccounts['Credit cards']"
        class="col-span-full"
        name="Credit cards"
      >
        Credit cards
      </CheckboxSection>
      <CheckboxSection
        v-model="filterPayload.bankAccounts['Mortgages or Loans']"
        class="col-span-full"
        name="Mortgages or Loans"
      >
        Mortgage or loan options
      </CheckboxSection>
    </div>

    <h5 class="text-xs uppercase font-semibold mt-6 mb-2">
      Security
    </h5>
    <CheckboxSection
      v-model="filterPayload.security['Deposit protection']"
      class="col-span-full"
      name="Deposit protection"
    >
      Deposit protection
    </CheckboxSection>
  </div>
</template>

<script setup>
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
import RegionSearch from '@/components/forms/RegionSearch.vue'

const { isBE } = useCountry()
const emit = defineEmits(['filter'])
const props = defineProps({
  location: String
})
const searchByLocation = ref(false)
const onSelectLocation = (payload) => {
  if (!payload) {
    filterPayload.value.region = null
    filterPayload.value.subregion = null
  } else if (payload.type === 'subregion') {
    filterPayload.value.region = null
    filterPayload.value.subregion = payload.value
  } else {
    filterPayload.value.region = payload.value
    filterPayload.value.subregion = null
  }
}

const getDefaultFilter = () => ({
  region: null,
  subregion: null,
  location: {
    'Mobile banking': false
  },
  topPick: false,
  fossilFreeAlliance: false,
  convenience: {
    'Mobile banking': false,
    'Free ATM network': false,
    'No overdraft fee': false,
    'No account maintenance fee': false
  },
  bankAccounts: {
    checking: false,
    saving: false,
    'Interest rates': false,
    'Business accounts': false,
    'Business savings accounts': false,
    'Small business lending': false,
    'Corporate lending': false,
    'Credit cards': false,
    'Mortgages or Loans': false
  },
  security: {
    'Deposit protection': false
  }
})

const filterPayload = ref(getDefaultFilter())

const isFilterDirty = computed(
  () =>
    JSON.stringify(filterPayload.value) !== JSON.stringify(getDefaultFilter())
)

const parsedFilterPayload = computed(() => {
  return {
    regions: filterPayload.value.region
      ? [filterPayload.value.region]
      : undefined,
    subregions: filterPayload.value.subregion
      ? [filterPayload.value.subregion]
      : undefined,
    topPick: filterPayload.value.topPick
      ? filterPayload.value.topPick
      : undefined,
    fossilFreeAlliance: filterPayload.value.fossilFreeAlliance
      ? filterPayload.value.fossilFreeAlliance
      : undefined,
    features: [
      ...Object.keys(filterPayload.value.location).filter(
        key => filterPayload.value.location[key]
      ),
      ...Object.keys(filterPayload.value.convenience).filter(
        key => filterPayload.value.convenience[key]
      ),
      ...Object.keys(filterPayload.value.bankAccounts).filter(
        key => filterPayload.value.bankAccounts[key]
      ),
      ...Object.keys(filterPayload.value.security).filter(
        key => filterPayload.value.security[key]
      )
    ]
  }
})

watch(
  filterPayload,
  () => {
    emit('filter', parsedFilterPayload.value)
  },
  { deep: true }
)

watch(searchByLocation, () => {
  filterPayload.value.region = null
  filterPayload.value.subregion = null
})

onMounted(() => emit('filter', parsedFilterPayload.value))

const setDefaultFilter = () => {
  filterPayload.value = getDefaultFilter()
}
watch(
  () => props.location,
  () => {
    setDefaultFilter()
  }
)

const forceShowMobile = ref(false)
const showFilters = computed(() => {
  return forceShowMobile.value || window.innerWidth >= 768
})
const toggleFilters = () => {
  forceShowMobile.value = !forceShowMobile.value
}
</script>
