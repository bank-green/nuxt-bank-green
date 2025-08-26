<script setup lang="ts">
import { reactive, ref, computed, watch, onMounted } from 'vue'
import {
  STATES_BY_COUNTRY,
  STATE_BY_STATE_CODE,
  type StateCode,
} from '../forms/location/iso3166-2States'
import type {
  EcoBankAccordionState,
  EcoBankFilters,
  EcoBanksQueryPayload,
} from '@/utils/types/eco-banks.type.ts'
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
import StateSearch from '~/components/forms/StateSearch.vue'
import type { HarvestDataFilterInput } from '#gql'

// TODO: the current 2-way data flow between this component and its parent is unnecessarily complex
// refactor to lift state and updates to the parent for a 1-way data flow

// props
const emit = defineEmits(['filter', 'update:location'])
const props = defineProps<{
  country: string
  stateLicensed: StateCode | null
  onSelectState: (payload: { value: string } | null) => void
}>()

// define constants
const defaultState: EcoBankFilters = {
  customersServed: {
    retail_and_individual: false,
    nonprofit: false,
    sme: false,
    government: false,
  },
  depositProducts: {
    checkings_or_current: false,
    savings: false,
    ISAs: false,
    CDs: false,
    wealth_management: false,
  },
  loanProducts: {
    small_business_lending: false,
    corporate_lending: false,
    mortgages_or_loans: false,
    credit_cards: false,
  },
  services: {
    local_branches: false,
    deposition_protection: false,
    mobile_banking: false,
    ATM_network: false,
  },
}

// define reactive state
const forceShowMobile = ref(false)
const sharedKey = ref(0)
const filterState = ref(deepClone<EcoBankFilters>(defaultState))

const AccordionState = reactive<EcoBankAccordionState>({
  customersServed: true,
  depositProducts: true,
  loanProducts: true,
  services: true,
})

const allOpen = computed({
  get: () => Object.values(AccordionState).every(v => v),
  set: val =>
    Object.keys(AccordionState).forEach(key => {
      AccordionState[key as keyof EcoBankAccordionState] = val
    }),
})

const isFilterDirty = computed(() => isDirty(filterState.value, defaultState))

const filterQueryData = computed<EcoBanksQueryPayload>(
  (): EcoBanksQueryPayload => ({
    stateLicensed: props.stateLicensed,
    harvestData: getHarvestData(),
  })
)

const showFilters = computed(() => {
  return forceShowMobile.value || window.innerWidth >= 768
})

// listeners
watch(
  [filterState, () => props.stateLicensed],
  () => {
    emit('filter', filterQueryData.value)
  },
  { deep: true }
)

watch(
  () => props.country,
  () => {
    setDefaultFilter()
  }
)

// lifecycle hooks
onMounted(() => emit('filter', filterQueryData.value))

// methods
const setDefaultFilter = () => {
  filterState.value = deepClone(defaultState)
  sharedKey.value++ // Reset checkboxes to empty state
}

const toggleFilters = () => {
  forceShowMobile.value = !forceShowMobile.value
}

const getHarvestData = (): HarvestDataFilterInput | null => {
  const harvestData: HarvestDataFilterInput = {}

  for (const [featureKey, featureValues] of Object.entries(filterState.value)) {
    const selectedFilters = Object.entries(featureValues)
      .filter(([, isSelected]) => isSelected)
      .map(([filterKey]) => filterKey)

    if (selectedFilters.length > 0) {
      harvestData[featureKey as keyof HarvestDataFilterInput] = selectedFilters
    }
  }

  const hasHarvestData = Object.keys(harvestData).length
  if (!hasHarvestData) return null
  return harvestData
}
</script>

<template>
  <div class="md:sticky top-20 flex-shrink-0 rounded-2xl">
    <div
      class="md:bg-white bg-none md:w-[288px] py-6 md:px-4 rounded-2xl md:h-[85svh] h-auto md:overflow-y-scroll z-10"
    >
      <StateSearch
        v-if="STATES_BY_COUNTRY?.[country as keyof typeof STATES_BY_COUNTRY]"
        ref="statePicker"
        :options="
          Object.keys(
            STATES_BY_COUNTRY?.[country as keyof typeof STATES_BY_COUNTRY]
          )
        "
        :init-value="(STATE_BY_STATE_CODE as any)[props.stateLicensed || '']"
        class="md:pb-4 pb-3 md:max-w-sm md:mx-auto z-30"
        @select="props.onSelectState"
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

        <!-- Customers Served -->
        <EcoBankAccordion
          :key="sharedKey"
          :is-open="AccordionState.customersServed"
          title="Customer Served"
          :checkbox-options="Object.keys(defaultState.customersServed)"
          :model-ref="filterState"
          @toggle="
            AccordionState.customersServed = !AccordionState.customersServed
          "
          @check="
            (key, value) =>
              (filterState.customersServed[
                key as keyof typeof filterState.customersServed
              ] = value)
          "
        />

        <!-- Deposit Products -->
        <EcoBankAccordion
          :key="sharedKey"
          :is-open="AccordionState.depositProducts"
          title="Deposit Products"
          :checkbox-options="Object.keys(defaultState.depositProducts)"
          :model-ref="filterState"
          @toggle="
            AccordionState.depositProducts = !AccordionState.depositProducts
          "
          @check="
            (key, value) =>
              (filterState.depositProducts[
                key as keyof EcoBankFilters['depositProducts']
              ] = value)
          "
        />

        <!-- Loan Products -->
        <EcoBankAccordion
          :key="sharedKey"
          :is-open="AccordionState.loanProducts"
          title="Loan Products"
          :checkbox-options="Object.keys(defaultState.loanProducts)"
          :model-ref="filterState"
          @toggle="AccordionState.loanProducts = !AccordionState.loanProducts"
          @check="
            (key, value) =>
              (filterState.loanProducts[
                key as keyof EcoBankFilters['loanProducts']
              ] = value)
          "
        />

        <!-- Services -->
        <EcoBankAccordion
          :key="sharedKey"
          no-border
          title="Services"
          :is-open="AccordionState.services"
          :checkbox-options="Object.keys(defaultState.services)"
          :model-ref="filterState"
          @toggle="AccordionState.services = !AccordionState.services"
          @check="
            (key, value) =>
              (filterState.services[key as keyof EcoBankFilters['services']] =
                value)
          "
        />
      </div>
    </div>
  </div>
</template>
