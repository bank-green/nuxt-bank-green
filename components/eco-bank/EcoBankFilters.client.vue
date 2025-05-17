<script setup>
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
import RegionSearch from '@/components/forms/RegionSearch.vue'

const { isBE } = useCountry()
const emit = defineEmits(['filter'])
const props = defineProps({
  location: String,
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
    'Mobile banking': false,
  },
  topPick: false,
  fossilFreeAlliance: false,
  convenience: {
    'Mobile banking': false,
    'Free ATM network': false,
    'No overdraft fee': false,
    'No account maintenance fee': false,
  },
  bankAccounts: {
    'checking': false,
    'saving': false,
    'Interest rates': false,
    'Business accounts': false,
    'Business savings accounts': false,
    'Small business lending': false,
    'Corporate lending': false,
    'Credit cards': false,
    'Mortgages or Loans': false,
  },
  security: {
    'Deposit protection': false,
  },
})

const filterPayload = ref(getDefaultFilter())

const isFilterDirty = computed(
  () =>
    JSON.stringify(filterPayload.value) !== JSON.stringify(getDefaultFilter()),
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
        key => filterPayload.value.location[key],
      ),
      ...Object.keys(filterPayload.value.convenience).filter(
        key => filterPayload.value.convenience[key],
      ),
      ...Object.keys(filterPayload.value.bankAccounts).filter(
        key => filterPayload.value.bankAccounts[key],
      ),
      ...Object.keys(filterPayload.value.security).filter(
        key => filterPayload.value.security[key],
      ),
    ],
  }
})

watch(
  filterPayload,
  () => {
    emit('filter', parsedFilterPayload.value)
  },
  { deep: true },
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
  },
)

const forceShowMobile = ref(false)
const showFilters = computed(() => {
  return forceShowMobile.value || window.innerWidth >= 768
})
const toggleFilters = () => {
  forceShowMobile.value = !forceShowMobile.value
}
</script>

<template>
  <div class="md:hidden px-6 pt-6">
    <LocationSearch
      v-model="country"
      class="z-30 mb-6"
    />
  </div>
  <div
    class="bg-white hover:bg-gray-50 px-5 py-4 md:py-0 md:px-0 md:bg-transparent md:hover:bg-transparent cursor-pointer md:cursor-auto flex items-center mb-6"
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

  <div class="mb-2">
    <CheckboxSection
      v-model="allOpen"
      class="col-span-full"
      name="expand_all"
    >
      {{ allOpen ? 'Collapse all' : 'Expand all' }}
    </CheckboxSection>
  </div>

  <div
    v-show="showFilters"
    class="flex flex-col bg-gray-50 md:bg-transparent px-5 py-4 md:py-0 md:px-0"
  >
    <!-- <div>
      <button
        v-show="open.Location"
        class="w-full flex justify-between items-center text-xs uppercase font-semibold"
      >
        <h5>Location</h5>
        <ChevronIcon :is-open="open.Location" />
      </button>
    </div> -->
    <!-- <div class="mt-2 flex flex-col space-y-1">
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
    </div> -->

    <div class="mt-6">
      <button
        class="w-full flex justify-between items-center text-xs uppercase font-semibold"
        @click="toggleSection('TopPick')"
      >
        <h5>Top Pick</h5>
        <ChevronIcon :is-open="open.TopPick" />
      </button>
      <div
        v-show="open.TopPick"
        class="mt-2"
      >
        <CheckboxSection
          v-model="filterPayload.topPick"
          class="col-span-full"
          name="topPick"
        >
          Top Pick
        </CheckboxSection>
      </div>
    </div>

    <div class="mt-6">
      <button
        class="w-full flex justify-between items-center text-xs uppercase font-semibold"
        @click="toggleSection('FossilFreeAlliance')"
      >
        <h5>Fossil Free Alliance</h5>
        <ChevronIcon :is-open="open.FossilFreeAlliance" />
      </button>
      <div
        v-show="open.FossilFreeAlliance"
        class="mt-2"
      >
        <CheckboxSection
          v-model="filterPayload.fossilFreeAlliance"
          class="col-span-full"
          name="fossilFreeAlliance"
        >
          Fossil Free Alliance
        </CheckboxSection>
      </div>
    </div>

    <div class="mt-6">
      <button
        class="w-full flex justify-between items-center text-xs uppercase font-semibold"
        @click="toggleSection('Convenience')"
      >
        <h5>Convenience</h5>
        <ChevronIcon :is-open="open.Convenience" />
      </button>
      <div
        v-show="open.Convenience"
        class="mt-2 flex flex-col space-y-1"
      >
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
    </div>

    <div class="mt-6">
      <button
        class="w-full flex justify-between items-center text-xs uppercase font-semibold"
        @click="toggleSection('BankAccounts')"
      >
        <h5>Bank Accounts</h5>
        <ChevronIcon :is-open="open.BankAccounts" />
      </button>
      <div
        v-show="open.BankAccounts"
        class="mt-2 flex flex-col space-y-1">
        <!-- bank account checkboxes -->
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
    </div>

    <div class="mt-6">
      <button
        class="w-full flex justify-between items-center text-xs uppercase font-semibold"
        @click="toggleSection('Security')"
      >
        <h5>Security</h5>
        <ChevronIcon :is-open="open.Security" />
      </button>
      <div
        v-show="open.Security"
        class="mt-2"
      >
        <CheckboxSection
          v-model="filterPayload.security['Deposit protection']"
          class="col-span-full"
          name="Deposit protection"
        >
          Deposit protection
        </CheckboxSection>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue'
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
// import RegionSearch from '@/components/forms/RegionSearch.vue'
import LocationSearch from '@/components/forms/location/LocationSearch.vue'

const { isBE } = useCountry()
const emit = defineEmits(['filter', 'update:location'])
const props = defineProps({
  location: String,
})

const country = computed({
  get: () => props.location,
  set: value => emit('update:location', value),
})

// Accordion open states
const open = reactive({
  Location: true,
  TopPick: true,
  FossilFreeAlliance: true,
  Convenience: true,
  BankAccounts: true,
  Security: true,
})

const allOpen = computed({
  get: () => Object.values(open).every(v => v),
  set: val => Object.keys(open).forEach(key => open[key] = val),
})

const searchByLocation = ref(false)
// const onSelectLocation = (payload) => {
//   if (!payload) {
//     filterPayload.value.region = null
//     filterPayload.value.subregion = null
//   } else if (payload.type === 'subregion') {
//     filterPayload.value.region = null
//     filterPayload.value.subregion = payload.value
//   } else {
//     filterPayload.value.region = payload.value
//     filterPayload.value.subregion = null
//   }
// }

const getDefaultFilter = () => ({
  region: null,
  subregion: null,
  location: {
    'Mobile banking': false,
  },
  topPick: false,
  fossilFreeAlliance: false,
  convenience: {
    'Mobile banking': false,
    'Free ATM network': false,
    'No overdraft fee': false,
    'No account maintenance fee': false,
  },
  bankAccounts: {
    'checking': false,
    'saving': false,
    'Interest rates': false,
    'Business accounts': false,
    'Business savings accounts': false,
    'Small business lending': false,
    'Corporate lending': false,
    'Credit cards': false,
    'Mortgages or Loans': false,
  },
  security: {
    'Deposit protection': false,
  },
})

const filterPayload = ref(getDefaultFilter())

const isFilterDirty = computed(
  () =>
    JSON.stringify(filterPayload.value) !== JSON.stringify(getDefaultFilter()),
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
        key => filterPayload.value.location[key],
      ),
      ...Object.keys(filterPayload.value.convenience).filter(
        key => filterPayload.value.convenience[key],
      ),
      ...Object.keys(filterPayload.value.bankAccounts).filter(
        key => filterPayload.value.bankAccounts[key],
      ),
      ...Object.keys(filterPayload.value.security).filter(
        key => filterPayload.value.security[key],
      ),
    ],
  }
})

watch(
  filterPayload,
  () => {
    emit('filter', parsedFilterPayload.value)
  },
  { deep: true },
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
  },
)

const forceShowMobile = ref(false)
const showFilters = computed(() => {
  return forceShowMobile.value || window.innerWidth >= 768
})
const toggleFilters = () => {
  forceShowMobile.value = !forceShowMobile.value
}

// SVG Chevron Icon Component
const ChevronIcon = defineComponent({
  name: 'ChevronIcon',
  props: { isOpen: Boolean },
  setup(props) {
    return () => h(
      'svg',
      {
        class: [
          'flex-none transform-gpu transition-transform h-2 text-sushi-500',
          props.isOpen ? 'rotate-180' : 'rotate-0',
        ],
        viewBox: '0 0 12 8',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      [
        h('path', {
          'd': 'M1 1.5L6 6.5L11 1.5',
          'stroke': 'currentColor',
          'stroke-width': '1.8',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ],
    )
  },
})

const toggleSection = (sectionKey) => {
  open[sectionKey] = !open[sectionKey]
}
</script>
