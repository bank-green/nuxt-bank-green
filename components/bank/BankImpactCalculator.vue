<script setup lang="ts">
import { ref, computed } from 'vue';
import BankSelector from './BankSelector.vue';

// Props to receive bank interest rate data
const props = defineProps<{
  bankInterestRate?: number;
  currentBankName?: string;
}>();

// Impact calculator reactive data
const amountMoved = ref(5000); // Default to $5,000

// CO2 calculation factor: 0.15 tons CO₂e per $1,000
const co2Factor = 0.15;

// Interest rate calculations
const baselineRate = 0.03; // 3% baseline
const currentBankRate = computed(() => props.bankInterestRate || 0);
const hasLowRate = computed(() => currentBankRate.value < 0.005); // Less than 0.5%

// Selected sustainable bank
const selectedSustainableBank = ref<{
  name: string;
  tag: string;
  website: string;
  interestRate: number;
  displayRate: string;
} | null>(null);

const onBankChange = (bank: { name: string; tag: string; website: string; interestRate: number; displayRate: string }) => {
  selectedSustainableBank.value = bank;
};

// Computed CO2 impact
const co2Impact = computed(() => {
  return (amountMoved.value / 1000) * co2Factor;
});

// Computed interest difference
const interestDifference = computed(() => {
  if (!hasLowRate.value) return 0;
  const sustainableRate = selectedSustainableBank.value?.interestRate || baselineRate;
  return (sustainableRate - currentBankRate.value) * amountMoved.value;
});

// Maximum value for comparison (used for bar scaling)
const maxComparison = computed(() => {
  // Compare CO2 impact with all other actions to find the maximum
  const otherActions = [0.2, 7.2, 1.6, 4.6, 0.05]; // recycling, solar, vegan, EV, LED
  const allValues = [co2Impact.value, ...otherActions];
  return Math.max(...allValues);
});

// Define all actions with their data (computed to make it reactive)
const allActions = computed(() => [
  { name: 'Installing solar panels', value: 7.2, color: 'bg-blue-400' },
  { name: 'Buying an EV', value: 4.6, color: 'bg-blue-400' },
  { name: 'Going vegan', value: 1.6, color: 'bg-blue-400' },
  { name: 'Recycling for 1 year', value: 0.2, color: 'bg-blue-400' },
  { name: 'Using LED bulbs for 1 year', value: 0.05, color: 'bg-blue-400' },
  {
    name: 'Moving money to climate bank',
    value: co2Impact.value,
    color: 'bg-green-500',
    isDynamic: true,
    textColor: 'text-green-600',
  },
]);

// Sort actions by CO₂e value in descending order
const sortedActions = computed(() => {
  return [...allActions.value].sort((a, b) => b.value - a.value);
});
</script>

<template>
  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">
      Your bank choice has more impact than you think
    </h2>
    <div class="text-gray-600 space-y-3 mb-6">
      <p>
        Moving your money is one of the easiest ways to both reduce
        your personal carbon footprint and contribute to the global fight
        against climate change.
      </p>
      <p>
        <strong>Your money has power</strong>
        - when you move it to a bank that supports clean energy instead of
        fossil fuels, you're directly supporting the transition to a sustainable
        economy.
      </p>
    </div>

    <!-- Bank Selector -->
    <BankSelector 
      :current-bank-name="currentBankName"
      @bank-change="onBankChange" 
    />

    <!-- Slider Section -->
    <div class="mb-6">
      <label class="block text-lg font-semibold text-gray-800 mb-3">
        Amount moved to climate-friendly bank:
        <span class="text-2xl font-bold text-green-600">
          ${{ amountMoved.toLocaleString() }}
        </span>
      </label>
      <input
        v-model="amountMoved"
        type="range"
        min="0"
        max="100000"
        step="1000"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      <div class="flex justify-between text-sm font-medium text-gray-600 mt-2">
        <span>$0</span>
        <span>$100,000</span>
      </div>
    </div>

    <!-- Impact Display -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <!-- CO2 Impact -->
      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <div class="text-center">
          <div class="text-3xl font-bold text-green-600">
            {{ co2Impact.toFixed(2) }}
          </div>
          <div class="text-sm text-green-700">
            tons CO<sub>2</sub>e saved annually
          </div>
        </div>
      </div>

      <!-- Additional Interest Estimate (only show if bank has low rate) -->
      <div
        v-if="hasLowRate"
        class="bg-blue-50 border border-blue-200 rounded-lg p-4"
      >
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600">
            +${{ interestDifference.toFixed(0) }}
          </div>
          <div class="text-sm text-blue-700">additional interest annually</div>
          <div class="text-xs text-blue-600 mt-1">
            vs {{ (currentBankRate * 100).toFixed(2) }}% current rate
          </div>
        </div>
      </div>
    </div>

    <!-- Comparison Bar Chart -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">
        Impact comparison
      </h3>

      <!-- Dynamically sorted actions -->
      <div v-for="action in sortedActions" :key="action.name" class="space-y-1">
        <div class="flex justify-between text-sm">
          <span class="text-gray-700">{{ action.name }}</span>
          <span
            class="font-medium"
            :class="action.textColor || 'text-gray-600'"
          >
            {{ action.isDynamic ? action.value.toFixed(2) : action.value }} tons
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div
            :class="action.color"
            class="h-3 rounded-full transition-all duration-300"
            :style="{
              width: `${Math.min((action.value / maxComparison) * 100, 100)}%`,
            }"
          ></div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Custom slider styling */
.slider {
  -webkit-appearance: none;
  appearance: none;
  background: #d1d5db;
  cursor: pointer;
  border-radius: 4px;
}

.slider::-webkit-slider-track {
  background: #d1d5db;
  height: 8px;
  border-radius: 4px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: #10b981;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider::-webkit-slider-thumb:hover {
  background: #059669;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.slider::-moz-range-track {
  background: #d1d5db;
  height: 8px;
  border-radius: 4px;
  border: none;
}

.slider::-moz-range-thumb {
  background: #10b981;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider::-moz-range-thumb:hover {
  background: #059669;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
</style>
