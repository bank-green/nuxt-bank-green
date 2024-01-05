<template>
  <LocationSearch v-model="country" :dark="dark" class="w-full text-gray-700" :title="locationTitle" />
  <BankSearch
    ref="bankSearch"
    v-model="bank"
    class="col-span-2"
    :disabled="!country"
    :title="bankTitle"
    :dark="dark"
    :country="country"
    :warning="warningText"
    :class="bankSearchClasses"
    :info-tooltip="infoTooltipBank"
    @search-input-change="'searchInputChange'"
    @update:model-value="onBankUpdateModel"
  >
    <slot name="bankSearchChild" />
  </BankSearch>
</template>
<script setup lang="ts">
import BankSearch from './banks/BankSearch.vue'
import LocationSearch from './location/LocationSearch.vue'

const props = withDefaults(defineProps<{
    bankTitle?: string;
    locationTitle?: string;
    placement?: string;
    bankValue: Object | null;
    warning?: string | boolean;
    infoTooltipBank?: string;
    bankSearchClasses?: string;
    onBankUpdateModel?:(event: HTMLInputElement) => void;
    dark?: boolean;
  }>(), {
  warning: false,
  infoTooltipBank: undefined,
  dark: false,
  bankTitle: '',
  locationTitle: '',
  placement: 'unknown'
})

const { country } = useCountry()
const bank = ref(props.bankValue)
const warningText = ref(props.warning)

watch(() => props.warning, (newVal) => {
  // synch passed down warning with the state here
  warningText.value = newVal
})

watch(bank, (newVal) => {
  if (bank?.value) {
    // make sure that warning is not shown once a bank is selected
    warningText.value = false
    bank.value = newVal
  } else {
    // if bank is removed again, make sure the warning is shown again
    warningText.value = props.warning
  }
})

</script>
