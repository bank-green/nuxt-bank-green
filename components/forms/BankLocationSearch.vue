<script setup lang="ts">
import {
  STATES_BY_COUNTRY,
  STATE_BY_STATE_CODE,
  isValidStateCountry,
  type StateCode,
  // type StateCode,
} from '../forms/location/iso3166-2States'
import BaseField from './BaseField.vue'
import BankSearch from './banks/BankSearch.vue'
import LocationSearch from './location/LocationSearch.vue'
import StateSearch from '~/components/forms/StateSearch.vue'

const props = withDefaults(
  defineProps<{
    bankTitle?: string
    locationTitle?: string
    modelValue: object | null
    warning?: string | boolean
    infoTooltipBank?: string
    bankSearchClasses?: string
    locationSearchClasses?: string
    dark?: boolean
    isEmbrace?: boolean
    hideLocation?: boolean
  }>(),
  {
    warning: false,
    dark: false,
    bankTitle: '',
    locationTitle: '',
    isEmbrace: false,
    hideLocation: false,
  }
)

const { country } = useCountry()
const state = ref<StateCode>()
const bank = ref(props.modelValue)
const warningText = ref(props.warning)

const emit = defineEmits(['update:modelValue', 'searchInputChange'])

const onUpdateModel = (ev: HTMLInputElement) => {
  emit('update:modelValue', ev)
}

const onSearchInputChange = () => {
  emit('searchInputChange')
}

const onStateSelect = (e: { value: string } | null): void => {
  if (!isValidStateCountry(country.value) || !e || !e.value) return
  console.log(e.value)
}

watch(
  () => props.warning,
  newVal => {
    // synch passed down warning with the state here
    warningText.value = newVal
  }
)

watch(bank, newVal => {
  if (bank?.value) {
    // make sure that warning is not shown once a bank is selected
    warningText.value = false
  } else {
    // if bank is removed again, make sure the warning is shown again
    warningText.value = props.warning
  }

  bank.value = newVal
})
</script>

<template>
  <LocationSearch
    v-if="!isEmbrace && !hideLocation"
    v-model="country"
    :dark="dark"
    class="col-span-2"
    :title="locationTitle"
    :class="locationSearchClasses"
  />
  <BaseField
    v-if="isValidStateCountry(country)"
    class="relative col-span-2"
    name="stateSearch"
    :dark="dark"
    title="State"
  >
    <StateSearch
      ref="statePicker"
      :options="Object.keys(STATES_BY_COUNTRY?.[country])"
      :class="locationSearchClasses"
      @select="onStateSelect"
    />
  </BaseField>
  <BankSearch
    ref="bankSearch"
    v-model="bank"
    class="col-span-2"
    :disabled="!country"
    :title="bankTitle"
    :dark="dark"
    :state="state"
    :country="country"
    :warning="warningText"
    :class="bankSearchClasses"
    :info-tooltip="infoTooltipBank"
    :is-embrace="isEmbrace"
    @search-input-change="onSearchInputChange"
    @update:model-value="onUpdateModel"
  >
    <slot name="bank-not-listed" />
  </BankSearch>
</template>
