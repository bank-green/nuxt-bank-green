<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue'
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
import RegionSearch from '@/components/forms/RegionSearch.vue'

// define reactive state
const forceShowMobile = ref(false)
const sharedKey = ref(0)
const searchByLocation = ref(false)
const filterPayload = ref(deepClone(defaultFilter))

// EcoBankAccordion open states
const open = reactive({
  customerServed: true,
  depositProducts: true,
  loanProducts: true,
  services: true,
})

const allOpen = computed({
  get: () => Object.values(open).every(v => v),
  set: val => Object.keys(open).forEach(key => (open[key] = val)),
})

const emit = defineEmits(['filter', 'update:location'])
const props = defineProps({
  location: String,
})

const defaultFilter = {
  region: null,
  subregion: null,
  customerServed: {
    individual: false,
    non_profit: false,
    corporate: false,
    government: false,
  },
  depositProducts: {
    checking: false,
    saving: false,
    investment: false,
    current: false,
    social: false,
  },
  loanProducts: {
    personal: false,
    small_business_lending: false,
    mortgages: false,
    corporate_lending: false,
  },
  services: {
    local_branches: false,
    free_atm_network: false,
    deposition_protection: false,
    no_overdraft_fee: false,
    mobile_banking: false,
    no_account_maintenance_fee: false,
  },
}

const isFilterDirty = computed(() =>
  isDirty(filterPayload.value, defaultFilter)
)

const getPayload = keys => {
  const payload = Object.entries(filterPayload.value[keys]).reduce(
    (acc, [key, value]) => {
      if (value) acc.push(key)
      return acc
    },
    []
  )

  return JSON.stringify(payload)
}

const parsedFilterPayload = computed(() => {
  return {
    regions: filterPayload.value.region
      ? [filterPayload.value.region]
      : undefined,
    subregions: filterPayload.value.subregion
      ? [filterPayload.value.subregion]
      : undefined,
    features: {
      customersServed: getPayload('customerServed'),
      depositProducts: getPayload('depositProducts'),
      loanProducts: getPayload('loanProducts'),
      services: getPayload('services'),
    },
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
  filterPayload.value = deepClone(defaultFilter)
  sharedKey.value++
}
watch(
  () => props.location,
  () => {
    setDefaultFilter()
  }
)

const showFilters = computed(() => {
  return forceShowMobile.value || window.innerWidth >= 768
})
const toggleFilters = () => {
  forceShowMobile.value = !forceShowMobile.value
}
</script>

<template>
  <div class="md:sticky top-20 flex-shrink-0 rounded-2xl">
    <div
      class="md:bg-white bg-none md:w-[288px] py-6 md:px-4 rounded-2xl md:h-[85svh] h-auto md:overflow-y-scroll z-10"
    >
      <RegionSearch
        ref="regionPicker"
        class="md:pb-4 pb-3 md:max-w-sm md:mx-auto z-30"
        @select="onSelectLocation"
      />

      <div
        class="bg-white md:px-0 md:bg-transparent cursor-pointer md:cursor-auto flex items-center p-4"
        :class="{
          'rounded-2xl': !showFilters,
          'rounded-t-xl': showFilters,
        }"
        @click="toggleFilters"
      >
        <h4 class="font-semibold text-left md:text-lg">Filter</h4>

        <button
          v-if="isFilterDirty"
          class="ml-6 text-sm text-sushi-500 hover:text-sushi-600 font-semibold focus:outline-none"
          @click="setDefaultFilter"
        >
          Reset
        </button>
      </div>

      <!-- Filter -->
      <div
        v-show="showFilters"
        class="flex flex-col md:bg-transparent pb-6 md:px-0 bg-white px-4 rounded-b-2xl"
      >
        <div class="mb-2">
          <CheckboxSection
            v-model="allOpen"
            class="col-span-full"
            name="expand_all"
          >
            Expand all
          </CheckboxSection>
        </div>
        <EcoBankAccordion
          :key="sharedKey"
          :is-open="open.customerServed"
          title="Customer Served"
          :checkbox-options="Object.keys(defaultFilter.customerServed)"
          :model-ref="filterPayload"
          @toggle="open.customerServed = !open.customerServed"
          @check="(key, value) => (filterPayload.customerServed[key] = value)"
        />

        <EcoBankAccordion
          :key="sharedKey"
          :is-open="open.depositProducts"
          title="Deposit Products"
          :checkbox-options="Object.keys(defaultFilter.depositProducts)"
          :model-ref="filterPayload"
          @toggle="open.depositProducts = !open.depositProducts"
          @check="(key, value) => (filterPayload.depositProducts[key] = value)"
        />

        <EcoBankAccordion
          :key="sharedKey"
          :is-open="open.loanProducts"
          title="Loan Products"
          :checkbox-options="Object.keys(defaultFilter.loanProducts)"
          :model-ref="filterPayload"
          @toggle="open.loanProducts = !open.loanProducts"
          @check="(key, value) => (filterPayload.loanProducts[key] = value)"
        />

        <EcoBankAccordion
          :key="sharedKey"
          no-border
          title="Services"
          :is-open="open.services"
          :checkbox-options="Object.keys(defaultFilter.services)"
          :model-ref="filterPayload"
          @toggle="open.services = !open.services"
          @check="(key, value) => (filterPayload.services[key] = value)"
        />
      </div>
    </div>
  </div>
</template>
