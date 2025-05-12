<template>
  <EcoBankDetailsModal
    v-if="isOpen"
    :model-value="isOpen"
    title="Fees"
    @update:model-value=" value => isOpen = value"
  >
    <div class="grid gap-6">
      <div
        v-if="isNoAccountMaintenanceFee"
        class="grid gap-2"
      >
        <h3 class="font-semibold">
          Overdraft fees
        </h3>
        <p class="pl-4">
          {{ financialFeatures.fees.available_without_overdraft_fees.explanation }}
        </p>
      </div>
      <div
        v-if="isNoAccountMaintenanceFee"
        class="grid gap-2"
      >
        <h3 class="font-semibold">
          Overdraft fees
        </h3>
        <p class="pl-4">
          {{ financialFeatures.fees.available_without_overdraft_fees.explanation }}
        </p>
      </div>
    </div>
  </EcoBankDetailsModal>
</template>

<script setup lang="ts">
import type { HarvestDataQueryQuery } from '#gql'

const props = defineProps<{
  tag: string
  prismicPageData: Record<string, any> | null
  financialFeatures: NonNullable<HarvestDataQueryQuery['harvestData']>['financialFeatures']
}>()

const isOpen = ref(false)
</script>
