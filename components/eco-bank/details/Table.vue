<template>
  <div>
    <!-- If no any account and loan product -->
    <div
      v-if="!availableDepositProductsList.length && !availableLoanProductList.length"
      class="font-semibold"
    >
      This bank does not offer any {{ tabId }} accounts or loans.
    </div>
    <div
      v-else
      class="max-w-[808px] mx-auto grid gap-6"
    >
      <!-- Upper Part : Accounts / depositProducts -->
      <div
        v-if="!availableDepositProductsList.length"
        class="font-semibold"
      >
        This bank does not offer any {{ tabId }} accounts.
      </div>
      <div
        v-else
        class="grid sm:grid-cols-3 gap-6 items-start"
      >
        <!-- Accounts / depositProducts -->
        <div class="grid gap-2">
          <h3 class="flex gap-1 items-center">
            <span class="font-semibold">Accounts</span>
            <div class="sm:hidden">
              <EcoBankDetailsCustomerFeesModalWithIcon
                title="Account rates and fees"
                :available-deposit-products-list="availableDepositProductsList"
              />
            </div>
          </h3>
          <span
            v-for="product in availableDepositProductsList"
            :key="product.key"
          >
            {{ product.displayName }}
          </span>
        </div>

        <!-- Accounts / depositProducts Interest rates -->
        <div class="hidden sm:grid gap-2">
          <h3 class="font-semibold">
            Interest rates
          </h3>
          <div
            v-for="rate in availableDepositProductsList"
            :key="rate.key"
          >
            <span v-if="rate.interestRates.high_rate && rate.interestRates.low_rate"> {{ rate.interestRates.low_rate }}% - {{ rate.interestRates.high_rate }}%</span>
            <span
              v-else
              class="opacity-0"
            > /</span>
          </div>
        </div>

        <!-- Accounts / depositProducts Fees -->
        <div class="hidden sm:grid gap-2">
          <h3 class="flex items-center gap-1">
            <span class="font-semibold">Fees</span>
            <EcoBankDetailsCustomerFeesModalWithIcon
              :available-deposit-products-list="availableDepositProductsList"
            />
          </h3>

          <div
            v-for="product in availableDepositProductsList"
            :key="product.key"
          >
            <span v-if="product.fees.available_without_overdraft_fees.available && product.fees.available_without_account_maintenance_fee.available">No maintenance or overdraft fees</span>
            <span v-else-if="product.fees.available_without_overdraft_fees.available">No maintenance fees</span>
            <span v-else-if="product.fees.available_without_account_maintenance_fee.available">No overdraft fees</span>
            <span
              v-else
              class="opacity-0"
            > /</span>
          </div>
        </div>
      </div>

      <!-- Lower Part : Loans / loanProducts -->
      <div
        v-if="!availableLoanProductList.length"
        class="font-semibold"
      >
        This bank does not offer any {{ customersList[tabId as keyof typeof customersList] }} loans.
      </div>
      <div
        v-else
        class="grid sm:grid-cols-3 gap-6 items-start"
      >
        <!-- Loans / loanProducts -->
        <div class="grid gap-2">
          <h3 class="font-semibold">
            Loans
          </h3>
          <span
            v-for="product in availableLoanProduct"
            :key="product.key"
          >
            {{ product.displayName }}
          </span>
        </div>

        <!-- Loans / loanProducts Interest rates -->
        <div class="hidden sm:grid gap-2">
          <h3 class="font-semibold">
            Interest rates
          </h3>
          <span>Rates may vary</span>
        </div>

        <!-- Loans / loanProducts Fees -->
        <div class="hidden sm:grid gap-2">
          <h3 class="font-semibold flex items-center gap-1">
            <span>Fees</span>
          </h3>
          <span>Fees may vary</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HarvestDataQueryQuery } from '#gql'
import type { RateType } from '~/utils/constants/eco-bank.constants'
import { loanProductsList, depositProductsList, customersList } from '~/utils/constants/eco-bank.constants'

const props = defineProps<{
  depositProducts: NonNullable<HarvestDataQueryQuery['harvestData']>['depositProducts']
  loanProducts: NonNullable<HarvestDataQueryQuery['harvestData']>['loanProducts']
  financialFeatures: NonNullable<HarvestDataQueryQuery['harvestData']>['financialFeatures']
  tabId: string
}>()

const availableLoanProduct = computed(() => loanProductsList
  .filter(product => props.loanProducts[product.key]?.offered_to
    ?.includes(props.tabId)))

// group by available DEPOSIT product
const availableDepositProductsList = computed(() => depositProductsList
  .filter(product => props.depositProducts[product.key]?.offered_to.customer_type
    ?.includes(props.tabId)).map(product => ({
    interestRates: props.financialFeatures.interest_rates.rates
    // find by matching key & tabId
      .find((rate: RateType) => product.key === rate.deposit_product && rate.customer_type === props.tabId),
    fees: {
      available_without_overdraft_fees: props.financialFeatures.fees.available_without_overdraft_fees.offered_to
        .find((fee: RateType) => product.key === fee.deposit_product && fee.customer_type === props.tabId),
      available_without_account_maintenance_fee: props.financialFeatures.fees.available_without_account_maintenance_fee.offered_to
        .find((fee: RateType) => product.key === fee.deposit_product && fee.customer_type === props.tabId),
    },
    ...product,
  })).toSorted((a, b) => b.interestRates.low_rate - a.interestRates.low_rate))

// group by available LOAN product
const availableLoanProductList = computed(() => loanProductsList
  .filter(product => props.loanProducts[product.key]?.offered_to
    ?.includes(props.tabId)).map(product => ({
    ...product,
    //
    //  //the data is not available in the API yet
    //
    // interestRates: props.financialFeatures.interest_rates.rates
    //   .find((rate: RateType) => product.key === rate.deposit_product && rate.customer_type === props.tagId),
    // fees: {
    //   available_without_overdraft_fees: props.financialFeatures.fees.available_without_overdraft_fees.offered_to
    //     .find((fee: RateType) => product.key === fee.deposit_product && fee.customer_type === props.tagId),
    //   available_without_account_maintenance_fee: props.financialFeatures.fees.available_without_account_maintenance_fee.offered_to
    //     .find((fee: RateType) => product.key === fee.deposit_product && fee.customer_type === props.tagId),
    // },
  })))
</script>
