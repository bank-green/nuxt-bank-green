<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { extractInterestRate, type HarvestDataInterestRate } from '~/utils/sustainableEcoBanksUtils'
import ClearbitLogo from '~/components/icons/ClearbitLogo.vue'

const props = defineProps<{
  selectedBankTag?: string
  currentBankName?: string
}>()

const emit = defineEmits<{
  bankChange: [bank: { name: string; tag: string; website: string; interestRate: number; displayRate: string }]
}>()

const { country } = useCountry()
const fetchGql = useGql()

const banks = ref<Array<{
  name: string
  tag: string
  website: string
  interestRate: number
  displayRate: string
  topPick: boolean
}>>([])

const selectedBank = ref<string>(props.selectedBankTag || '')
const isDropdownOpen = ref(false)

const loadBanks = async () => {
  if (!country.value) return

  try {
    const data = await fetchGql('FilteredBrandsQuery', {
      country: country.value,
      recommendedOnly: true,
      withCommentary: true,
      first: 20,
    })

    if (data?.brands?.edges) {
      banks.value = data.brands.edges
        .map(o => o?.node)
        .filter(brand => brand?.commentary?.showOnSustainableBanksPage)
        .map(brand => {
          const rates = brand?.harvestData?.financialFeatures?.interest_rates?.rates as HarvestDataInterestRate[]
          const displayRate = extractInterestRate(rates)
          
          // Extract numeric rate for calculations
          let numericRate = 0
          if (rates) {
            const max = rates.reduce((acc, curr) => {
              const rate = +curr.high_rate
              if (isNaN(rate)) return acc
              return acc ? Math.max(acc, rate) : rate
            }, 0)
            numericRate = max / 100 // Convert percentage to decimal
          }

          return {
            name: brand?.name || '',
            tag: brand?.tag || '',
            website: brand?.website || '',
            interestRate: numericRate,
            displayRate,
            topPick: !!brand?.commentary?.topPick
          }
        })
        .filter(bank => bank.interestRate > 0) // Only include banks with interest rates
        .sort((a, b) => {
          // First sort by topPick (top picks first), then by interest rate descending
          if (a.topPick && !b.topPick) return -1
          if (!a.topPick && b.topPick) return 1
          return b.interestRate - a.interestRate
        })
    }
  } catch (error) {
    console.error('Error loading banks:', error)
  }
}

// Watch for country changes
watch(country, loadBanks)

// Load banks on mount
onMounted(loadBanks)

// Watch for selected bank changes and emit
watch(selectedBank, (newTag) => {
  const bank = banks.value.find(b => b.tag === newTag)
  if (bank) {
    emit('bankChange', bank)
  }
})

// Set initial selection
watch(banks, (newBanks) => {
  if (newBanks.length > 0 && !selectedBank.value) {
    selectedBank.value = newBanks[0].tag
  }
}, { immediate: true })

// Dropdown methods
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectBank = (bankTag: string) => {
  selectedBank.value = bankTag
  isDropdownOpen.value = false
}

const selectedBankData = computed(() => {
  return banks.value.find(b => b.tag === selectedBank.value)
})

// Close dropdown when clicking outside
const dropdownRef = ref<HTMLElement | null>(null)

onMounted(() => {
  document.addEventListener('click', (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      isDropdownOpen.value = false
    }
  })
})
</script>

<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      Compare {{ currentBankName || 'your bank' }} to top sustainable banks:
    </label>
    <div ref="dropdownRef" class="relative">
      <!-- Custom dropdown button -->
      <button
        type="button"
        @click="toggleDropdown"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-left flex items-center justify-between"
      >
        <div v-if="selectedBankData" class="flex items-center">
          <div class="relative w-6 h-6 mr-3 flex-shrink-0">
            <ClearbitLogo
              :url="selectedBankData.website"
              :size="24"
              img-class="object-contain"
            />
          </div>
          <span class="truncate">
            {{ selectedBankData.name }} - {{ selectedBankData.displayRate }}
          </span>
        </div>
        <span v-else class="text-gray-500">Select a bank...</span>
        <svg 
          class="w-5 h-5 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': isDropdownOpen }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <!-- Dropdown menu -->
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="isDropdownOpen"
          class="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto"
        >
          <div
            v-for="bank in banks"
            :key="bank.tag"
            @click="selectBank(bank.tag)"
            class="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
            :class="{ 'bg-green-50': bank.tag === selectedBank }"
          >
            <div class="relative w-6 h-6 mr-3 flex-shrink-0">
              <ClearbitLogo
                :url="bank.website"
                :size="24"
                img-class="object-contain"
              />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900 truncate">
                {{ bank.name }}
              </div>
              <div class="text-xs text-gray-500">
                {{ bank.displayRate }} APY
              </div>
            </div>
            <div v-if="bank.topPick" class="ml-2">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Top Pick
              </span>
            </div>
          </div>
        </div>
      </transition>
    </div>
    
    <!-- Learn more button -->
    <div v-if="selectedBankData" class="mt-3">
      <NuxtLink
        :to="`/sustainable-eco-banks/${selectedBankData.tag}`"
        class="button-green w-full inline-flex items-center justify-center"
      >
        Learn more about {{ selectedBankData.name }}
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>
