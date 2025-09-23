<script setup lang="ts">
import type { HarvestDataType } from '~/utils/types/eco-banks.type';

const props = defineProps<{
  harvestData?: HarvestDataType | null;
  bankTag?: string;
}>();

// Extract the highest interest rate (same logic as sustainable banks page)
const extractInterestRate = (rates: any[] | undefined): string => {
  // Hardcoded rate for Wells Fargo
  if (props.bankTag === 'wells_fargo') {
    return '0.02%';
  }

  if (!rates) return '-';

  const max = rates.reduce((acc, curr) => {
    const rate = +curr.high_rate;
    if (isNaN(rate)) return acc;
    return acc ? Math.max(acc, rate) : rate;
  }, 0);

  if (max === 0) return '-';
  return `Up to ${max}%`;
};

// Extract the numeric rate for calculations
const numericRate = computed(() => {
  // Hardcoded rate for Wells Fargo
  if (props.bankTag === 'wells_fargo') {
    return 0.0002; // 0.02%
  }

  if (!props.harvestData?.financialFeatures?.interest_rates?.rates) return 0;

  const max = props.harvestData.financialFeatures.interest_rates.rates.reduce(
    (acc, curr) => {
      const rate = +curr.high_rate;
      if (isNaN(rate)) return acc;
      return acc ? Math.max(acc, rate) : rate;
    },
    0
  );

  return max / 100; // Convert percentage to decimal
});

// Check if rate is low (less than 0.5%)
const isLowRate = computed(() => {
  return numericRate.value < 0.005; // 0.5%
});

// Emit the numeric rate to parent
const emit = defineEmits<{
  rateChange: [rate: number];
}>();

// Watch for changes and emit the rate
watch(
  numericRate,
  newRate => {
    emit('rateChange', newRate);
  },
  { immediate: true }
);
</script>

<template>
  <div
    v-if="
      harvestData?.financialFeatures?.interest_rates ||
      bankTag === 'wells_fargo'
    "
    class="mt-6 w-full"
  >
    <div class="w-full">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">Interest Rates</h3>
          <p class="text-sm text-gray-600 mt-1">Savings and deposit accounts</p>
        </div>
        <div class="text-right">
          <div
            class="text-2xl font-bold"
            :class="isLowRate ? 'text-red-600' : 'text-green-600'"
          >
            {{
              extractInterestRate(
                harvestData?.financialFeatures?.interest_rates?.rates
              )
            }}
          </div>
          <div class="text-xs text-gray-500">APY</div>
        </div>
      </div>
    </div>
  </div>
</template>
