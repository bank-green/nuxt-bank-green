<template>
  <div class="contain">
    <Tab
      :tab-ids="['retail_and_individual', 'nonprofit',
                 'government', 'sme', 'corporate',
      ]"
      @update:active-tab="value => activeTab = value"
    >
      <!------------------------------->
      <!------ Tab Navigation --------->
      <!------------------------------->

      <template #retail_and_individual-nav>
        Personal
      </template>
      <template #nonprofit-nav>
        Nonprofit
      </template>
      <template #government-nav>
        Government
      </template>
      <template #sme-nav>
        SMEs
      </template>
      <template #corporate-nav>
        Corporate
      </template>

      <!------------------------------->
      <!------- Tab Content ----------->
      <!------------------------------->

      <template #retail_and_individual>
        <EcoBankDetailsTable
          tab-id="retail_and_individual"
          :loan-products="loanProducts"
          :deposit-products="depositProducts"
          :financial-features="financialFeatures"
        />
      </template>

      <template #nonprofit>
        <EcoBankDetailsTable
          tab-id="nonprofit"
          :loan-products="loanProducts"
          :deposit-products="depositProducts"
          :financial-features="financialFeatures"
        />
      </template>
      <template #government>
        <EcoBankDetailsTable
          tab-id="government"
          :loan-products="loanProducts"
          :deposit-products="depositProducts"
          :financial-features="financialFeatures"
        />
      </template>
      <template #sme>
        <EcoBankDetailsTable
          tab-id="sme"
          :loan-products="loanProducts"
          :deposit-products="depositProducts"
          :financial-features="financialFeatures"
        />
      </template>
      <template #corporate>
        <EcoBankDetailsTable
          tab-id="corporate"
          :loan-products="loanProducts"
          :deposit-products="depositProducts"
          :financial-features="financialFeatures"
        />
      </template>
    </Tab>
  </div>
</template>

<script setup lang="ts">
import type { DepositProductsType, FinancialFeaturesType, LoanProductsType, PoliciesType } from '~/utils/types/eco-banks.type'

defineProps<{
  depositProducts?: DepositProductsType
  loanProducts?: LoanProductsType
  financialFeatures?: FinancialFeaturesType
  policies?: PoliciesType
}>()

// default tabName "Personal"
const activeTab = ref('retail_and_individual')
</script>
