<template>
  <!------------------->
  <!---     icon     -->
  <!------------------->

  <img
    class="cursor-pointer"
    src="/img/icons/information.svg"
    @click="isOpen = true"
  >

  <!--------------------------------->
  <!--      Account Fees Modal     -->
  <!--------------------------------->

  <EcoBankDetailsModal
    v-if="isOpen"
    :model-value="isOpen"
    :title="title"
    @update:model-value=" value => isOpen = value"
  >
    <div class="grid gap-6">
      <div
        v-for="product in filteredList"
        :key="product.key"
        class="grid gap-2"
      >
        <h3 class="font-bold">
          {{ product.displayName }}
        </h3>

        <!-------- Rate -------->
        <div
          v-if="hasRate(product)"
          class="pl-4 grid gap-2"
        >
          <p>
            {{ product.interestRates?.low_rate }}% - {{ product.interestRates?.high_rate }}%
          </p>
          <p class="text-[10px]">
            {{ product.interestRates?.additional_details }}
          </p>
        </div>

        <!----- Maintenance Fees -->
        <div
          v-if="hasMaintenanceFee(product)"
          class="pl-4 grid gap-2"
        >
          <p>
            No maintenance fees
          </p>
          <p class="text-[10px]">
            {{ product.fees.available_without_account_maintenance_fee?.additional_details }}
          </p>
        </div>

        <!----- Overdraft Fees ----->
        <div
          v-if="hasOverdraftFee(product)"
          class="pl-4 grid gap-2"
        >
          <p>No overdraft fees</p>
          <p class="text-[10px]">
            {{ product.fees.available_without_overdraft_fees?.additional_details }}
          </p>
        </div>
      </div>
    </div>
  </EcoBankDetailsModal>
</template>

<script setup lang="ts">
import type { FeeAvailabilityEntryType, InterestRateDetailType } from '~/utils/types/eco-banks.type'

// type
type ProductType = typeof props.availableDepositProductsList[0]

// state
const isOpen = ref(false)

// props
const props = withDefaults(defineProps<{
  title?: string
  availableDepositProductsList: Array<{
    key: string
    displayName: string
    interestRates: InterestRateDetailType | undefined
    fees: {
      available_without_account_maintenance_fee?: FeeAvailabilityEntryType
      available_without_overdraft_fees?: FeeAvailabilityEntryType
    }
  }>
}>(), {
  title: 'Fee details',
})

// display the field with conditions

const hasFeeOrRate = (product: ProductType) =>
  !!(product.interestRates?.low_rate
    || product.fees.available_without_account_maintenance_fee?.available
    || product.fees.available_without_overdraft_fees?.available)

const hasRate = (product: ProductType) => product.interestRates?.low_rate

const hasMaintenanceFee = (product: ProductType) => product.fees.available_without_account_maintenance_fee?.available

const hasOverdraftFee = (product: ProductType) => product.fees.available_without_overdraft_fees?.available

const filteredList = props.availableDepositProductsList.filter(hasFeeOrRate)
</script>
