<template>
  <!------------------------------->
  <!-------- Overview ------------->
  <!------------------------------->

  <EcoBankDetailsOverview
    :tag="props.tag"
    :prismic-page-data="props.prismicPageData"
    :customers-served="harvestData?.customersServed"
    :services="harvestData?.services"
    :financial-features="harvestData?.financialFeatures"
    :policies="harvestData?.policies"
    :has-no-harvest-data="hasNoHarvestData"
  />

  <!------------------------------->
  <!-------- Product Table -------->
  <!------------------------------->

  <EcoBankDetailsProducts
    :deposit-products="harvestData?.depositProducts"
    :loan-products="harvestData?.loanProducts"
    :financial-features="harvestData?.financialFeatures"
    :policies="harvestData?.policies"
  />
</template>

<script setup lang="ts">
import type { HarvestDataType } from '~/utils/types/eco-banks.type'

const props = defineProps<{
  tag: string
  prismicPageData: Record<string, any> | null
  harvestData: HarvestDataType
}>()

const hasNoHarvestData = !props.harvestData
</script>
