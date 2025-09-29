<script setup lang="ts">
import BankSearch from './banks/BankSearch.vue';
import LocationSearch from './location/LocationSearch.vue';

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

const bankSearch = ref<InstanceType<typeof BankSearch> | null>(null);
const locationSearch = ref<InstanceType<typeof LocationSearch> | null>(null);

const emit = defineEmits(['update:modelValue', 'searchInputChange']);

const onBankSelect = (ev: HTMLInputElement) => {
  emit('update:modelValue', ev);
};

const onSearchInputChange = () => {
  emit('searchInputChange');
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
  () => country.value,
  async function (newCountry) {
    await loadBanks();

    // handle focus
    if (!(+new Date() - +pageStart > 5_000)) return;
    if (!newCountry) {
      locationSearch?.value?.focus();
      return;
    }
    bankSearch?.value?.focus();
  }
);

onMounted(loadBanks);

async function loadBanks() {
  if (!country.value) return;

  loading.value = true;

  banks.value = props.isEmbrace
    ? (await fetchGql('EmbraceBrandQuery', undefined).then(data =>
        data.brandsFilteredByEmbraceCampaign?.filter(isTruthy)
      )) || []
    : (await fetchGql('BrandsByCountryQuery', {
        country: country.value,
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
  <BankSearch
    ref="bankSearch"
    v-model="bank"
    class="col-span-2"
    :loading="loading"
    :disabled="!country"
    :title="bankTitle"
    :dark="dark"
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
