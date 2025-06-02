<script setup lang="ts">
import type { HarvestDataType } from '~/utils/types/eco-banks.type'

const props = defineProps<{
  tag: string
  prismicPageData: Record<string, any> | null
  harvestData: HarvestDataType
}>()

// harvestData === null
const isHarvestDataNull = Object.values(toRaw(props.harvestData)).every(v => !v)
</script>

<template>
  <!------------------------------->
  <!--       Overview            -->
  <!------------------------------->

  <EcoBankDetailsOverview
    :tag="props.tag"
    :prismic-page-data="props.prismicPageData"
    :harvest-data="props.harvestData"
    :is-harvest-data-null="isHarvestDataNull"
  />

  <!------------------------------->
  <!--       Product Table       -->
  <!------------------------------->

  <EcoBankDetailsProducts
    v-if="!isHarvestDataNull"
    :deposit-products="harvestData?.depositProducts"
    :loan-products="harvestData?.loanProducts"
    :financial-features="harvestData?.financialFeatures"
    :policies="harvestData?.policies"
  />
</template>
