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
    @search-input-change="searchValue = $event"
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
const searchValue = ref<string>('')

watch(
  () => props.bankValue,
  () => {
    if (props.bankValue) {
      bank.value = props.bankValue
    }

    console.log({ bank: bank.value, warning: warningText.value, otherWarning: props.warning })
  }
)

/* watch(
  () => props.warning,
  () => {
    if (props.warning) {
      warningText.value = ''
    }
    warningText.value = props.warning
  }
) */

</script>
