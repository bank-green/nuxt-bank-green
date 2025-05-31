<script setup lang="ts">
import MoreIcon from './CustomerFeesModalWithIcon.vue'
import type { CustomerCategoryType, DepositProductsType, FinancialFeaturesType, LoanProductsType } from '~/utils/types/eco-banks.type'

const props = defineProps<{
  depositProducts?: DepositProductsType
  loanProducts?: LoanProductsType
  financialFeatures?: FinancialFeaturesType
  tabId: CustomerCategoryType
}>()

const { availableDepositProductsList, availableLoanProductList, tabName, hasNoDepositProducts, hasDepositFeesDetail }
  = useEcoBankProductDisplayData(
    props.tabId,
    props.depositProducts,
    props.loanProducts,
    props.financialFeatures,
  )

// get label for Accounts fees
const getFeeLabel = (product: typeof availableDepositProductsList.value[0]): string => {
  const overdraft = product.fees.available_without_overdraft_fees?.available
  const maintenance = product.fees.available_without_account_maintenance_fee?.available

  if (overdraft && maintenance) return 'No maintenance or overdraft fees'
  if (overdraft) return 'No maintenance fees'
  if (maintenance) return 'No overdraft fees'
  return '-'
}
</script>

<template>
  <div>
    <!-- If no any account and loan product -->
    <div
      v-if="hasNoDepositProducts"
      class="font-semibold"
    >
      This bank does not offer any {{ tabName }} accounts or loans.
    </div>
    <div
      v-else
      class="max-w-[808px] mx-auto grid gap-6"
    >
      <!----------------------------------------------------------->
      <!--      Upper Part : Accounts / depositProducts          -->
      <!----------------------------------------------------------->

      <div
        v-if="!availableDepositProductsList.length"
        class="font-semibold"
      >
        This bank does not offer any {{ tabName }} accounts.
      </div>
      <div
        v-else
        class="grid md:grid-cols-[minmax(0,1fr)_minmax(100px,1fr)_minmax(max-content,1fr)] gap-6 items-start"
      >
        <!------- Accounts / depositProducts ------------------->
        <div class="grid gap-2">
          <h3 class="flex gap-1 items-center">
            <span class="font-semibold">Accounts</span>
            <div class="md:hidden">
              <MoreIcon
                v-if="hasDepositFeesDetail"
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

        <!------- Accounts / depositProducts Interest rates ---->

        <div class="hidden md:grid gap-2">
          <h3 class="font-semibold">
            Interest rates
          </h3>
          <div
            v-for="rate in availableDepositProductsList"
            :key="rate.key"
          >
            <span v-if="rate.interestRates?.high_rate"> {{ rate.interestRates.low_rate }}% - {{ rate.interestRates.high_rate }}%</span>
            <span v-else> -</span>
          </div>
        </div>

        <!------- Accounts / depositProducts Fees -------------->
        <div class="hidden md:grid gap-2">
          <h3 class="flex items-center gap-1">
            <span class="font-semibold">Fees</span>
            <MoreIcon
              v-if="hasDepositFeesDetail"
              :available-deposit-products-list="availableDepositProductsList"
            />
          </h3>

          <div
            v-for="product in availableDepositProductsList"
            :key="product.key"
          >
            <span>{{ getFeeLabel(product) }}</span>
          </div>
        </div>
      </div>

      <!------------------------------------------------->
      <!--      Lower Part : Loans / loanProducts      -->
      <!------------------------------------------------->

      <div
        v-if="!availableLoanProductList.length"
        class="font-semibold"
      >
        This bank does not offer any {{ tabName }} loans.
      </div>
      <div
        v-else
        class="grid md:grid-cols-3 gap-6 items-start"
      >
        <!----- Loans / loanProducts ------------------->
        <div class="grid gap-2">
          <h3 class="font-semibold">
            Loans
          </h3>
          <div
            v-for="product in availableLoanProductList"
            :key="product.key"
            class="flex gap-1 items-center"
          >
            <span>{{ product.displayName }}</span>
          </div>
        </div>

        <!----- Loans / loanProducts Interest rates ----->
        <div class="hidden md:grid gap-2">
          <h3 class="font-semibold">
            Interest rates
          </h3>
          <span>Rates may vary</span>
        </div>

        <!----- Loans / loanProducts Fees --------------->
        <div class="hidden md:grid gap-2">
          <h3 class="font-semibold flex items-center gap-1">
            Fees
          </h3>
          <span>Fees may vary</span>
        </div>
      </div>
    </div>
  </div>
</template>
