<template>
  <LocationSearch v-model="country" :dark="dark" class="col-span-2" :title="locationTitle" :class="locationSearchClasses" />
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
    @search-input-change="onSearchInputChange"
    @update:model-value="onUpdateModel"
  >
    <slot name="bank-not-listed" />
  </BankSearch>
</template>
<script setup lang="ts">
import BankSearch from './banks/BankSearch.vue'
import LocationSearch from './location/LocationSearch.vue'

const props = withDefaults(defineProps<{
    bankTitle?: string;
    locationTitle?: string;
    modelValue: Object | null;
    warning?: string | boolean;
    infoTooltipBank?: string;
    bankSearchClasses?: string;
    locationSearchClasses?: string;
    dark?: boolean;
  }>(), {
  warning: false,
  dark: false,
  bankTitle: '',
  locationTitle: ''
})

const { country } = useCountry()
const bank = ref(props.modelValue)
const warningText = ref(props.warning)

const emit = defineEmits(['update:modelValue', 'searchInputChange'])

const onUpdateModel = (ev: HTMLInputElement) => {
  emit('update:modelValue', ev)
}

const onSearchInputChange = () => {
  emit('searchInputChange')
}

watch(() => props.warning, (newVal) => {
  // synch passed down warning with the state here
  warningText.value = newVal
})

watch(bank, (newVal) => {
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
