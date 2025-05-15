<template>
  <!---------------->
  <!----- icon ----->
  <!---------------->

  <img
    class="cursor-pointer"
    src="/img/icons/information.svg"
    @click="isOpen = true"
  >

  <!------------------------------->
  <!-- Account Fees Modal --------->
  <!------------------------------->

  <EcoBankDetailsModal
    v-if="isOpen"
    :model-value="isOpen"
    :title="title"
    @update:model-value=" value => isOpen = value"
  >
    <div class="grid gap-6">
      <div
        v-for="product in availableDepositProductsList"
        :key="product.key"
        class="grid gap-2"
      >
        <h3
          v-if="hasFeeOrRate(product)"
          class="sm:font-semibold font-bold"
        >
          {{ product.displayName }}
        </h3>

        <!-------- Rate -------->
        <div
          v-if="product.interestRates?.low_rate"
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
          v-if="product.fees.available_without_account_maintenance_fee?.available"
          class="pl-4 grid gap-2"
        >
          <p>
            No maintenance fees
          </p>
          <p class="text-[10px]">
            {{ product.fees.available_without_account_maintenance_fee.additional_details }}
          </p>
        </div>

        <!----- Overdraft Fees ----->
        <div
          v-if="product.fees.available_without_overdraft_fees?.available"
          class="pl-4"
        >
          <p>No overdraft fees</p>
          <p class="text-[10px]">
            {{ product.fees.available_without_overdraft_fees.additional_details }}
          </p>
        </div>
      </div>
    </div>
  </EcoBankDetailsModal>
</template>

<script setup lang="ts">
import type { FeeAvailabilityEntryType, InterestRateDetailType } from '~/utils/types/eco-banks.type'

const isOpen = ref(false)

const _props = withDefaults(defineProps<{
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
  title: 'Account rates and fees',
})

const hasFeeOrRate = (product: typeof _props.availableDepositProductsList[0]) =>
  !!(product.interestRates?.low_rate
    || product.fees.available_without_account_maintenance_fee?.available
    || product.fees.available_without_overdraft_fees?.available)
</script>
