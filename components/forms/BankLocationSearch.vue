<script setup lang="ts">
import {
  STATES_BY_COUNTRY,
  isValidStateCountry,
  type StateCode,
} from '../forms/location/iso3166-2States';
import BaseField from './BaseField.vue';
import BankSearch from './banks/BankSearch.vue';
import LocationSearch from './location/LocationSearch.vue';
import StateSearch from '~/components/forms/StateSearch.vue';

const props = withDefaults(
  defineProps<{
    bankTitle?: string;
    locationTitle?: string;
    modelValue: object | null;
    warning?: string | boolean;
    infoTooltipBank?: string;
    bankSearchClasses?: string;
    locationSearchClasses?: string;
    dark?: boolean;
    isEmbrace?: boolean;
    hideLocation?: boolean;
  }>(),
  {
    warning: false,
    dark: false,
    bankTitle: '',
    locationTitle: '',
    isEmbrace: false,
    hideLocation: false,
  }
);

const pageStart = new Date();
const { country } = useCountry();
const state = ref<StateCode>();
const bank = ref(props.modelValue);
const warningText = ref(props.warning);
const loading = ref<boolean>(false);
const banks = ref<
  {
    name: string;
    tag: string;
    website?: string | null;
    aliases?: string | null;
  }[]
>([]);

const statePicker = ref<InstanceType<typeof StateSearch> | null>(null);
const bankSearch = ref<InstanceType<typeof BankSearch> | null>(null);
const locationSearch = ref<InstanceType<typeof LocationSearch> | null>(null);

const emit = defineEmits(['update:modelValue', 'searchInputChange']);

const onBankSelect = (ev: HTMLInputElement) => {
  emit('update:modelValue', ev);
};

const onSearchInputChange = () => {
  emit('searchInputChange');
};

const onStateSelect = (e: { value: string } | null): void => {
  if (!isValidStateCountry(country.value) || !e || !e.value) {
    state.value = undefined;
    return;
  }
  state.value = STATES_BY_COUNTRY[country.value][e.value];
};

watch(
  () => props.warning,
  newVal => {
    // synch passed down warning with the state here
    warningText.value = newVal;
  }
);

watch(bank, newVal => {
  if (bank?.value) {
    // make sure that warning is not shown once a bank is selected
    warningText.value = false;
  } else {
    // if bank is removed again, make sure the warning is shown again
    warningText.value = props.warning;
  }

  bank.value = newVal;
});

const fetchGql = useGql();

watch(
  [() => country.value, () => state.value],
  async function ([newCountry, newState], [oldCountry]) {
    // reset state if country changes
    if (oldCountry !== newCountry) state.value = undefined;

    await loadBanks();

    // handle focus
    if (!(+new Date() - +pageStart > 5_000)) return;
    if (!newCountry) {
      locationSearch?.value?.focus();
      return;
    }
    const isExpectingState = isValidStateCountry(newCountry);
    if (!isExpectingState) {
      bankSearch?.value?.focus();
      return;
    }
    if (newState) bankSearch?.value?.focus();
    if (!newState) statePicker.value?.focus();
  }
);

onMounted(loadBanks);

async function loadBanks() {
  if (!country.value) return;

  const isExpectingState = isValidStateCountry(country.value);
  if (isExpectingState && !state.value) {
    banks.value = [];
    return;
  }

  loading.value = true;

  banks.value = props.isEmbrace
    ? (await fetchGql('EmbraceBrandQuery', undefined).then(data =>
        data.brandsFilteredByEmbraceCampaign?.filter(isTruthy)
      )) || []
    : (await fetchGql('BrandsByCountryQuery', {
        country: country.value,
        state: state.value,
      }).then(data => data.brands?.edges.map(o => o?.node).filter(isTruthy))) ||
      [];

  loading.value = false;
}
</script>

<template>
  <LocationSearch
    v-if="!isEmbrace && !hideLocation"
    ref="locationSearch"
    v-model="country"
    :dark="dark"
    class="col-span-2"
    :title="locationTitle"
    :class="locationSearchClasses"
  />
  <BaseField
    v-if="isValidStateCountry(country) && !hideLocation"
    class="relative col-span-2"
    name="stateSearch"
    :dark="dark"
    title="State"
    :class="locationSearchClasses"
  >
    <StateSearch
      ref="statePicker"
      :options="Object.keys(STATES_BY_COUNTRY?.[country])"
      @select="onStateSelect"
    />
  </BaseField>
  <BankSearch
    ref="bankSearch"
    v-model="bank"
    class="col-span-2"
    :loading="loading"
    :disabled="!country || (isValidStateCountry(country) && !state)"
    :title="bankTitle"
    :dark="dark"
    :state="state"
    :country="country"
    :warning="warningText"
    :class="bankSearchClasses"
    :info-tooltip="infoTooltipBank"
    :is-embrace="isEmbrace"
    :options="banks"
    @search-input-change="onSearchInputChange"
    @update:model-value="onBankSelect"
  >
    <slot name="bank-not-listed" />
  </BankSearch>
</template>
