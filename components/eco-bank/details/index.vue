<template>
  <!-- Overview -->
  <EcoBankDetailsOverview
    :tag="props.tag"
    :prismic-page-data="props.prismicPageData"
    :customers-served="harvestData.customersServed"
    :services="harvestData.services"
    :financial-features="harvestData.financialFeatures"
    :policies="harvestData.policies"
  />

  <!-- Nonprofit -->
  <EcoBankDetailsCustomerProducts
    :deposit-products="harvestData.depositProducts"
    :loan-products="harvestData.loanProducts"
    :financial-features="harvestData.financialFeatures"
    :policies="harvestData.policies"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  tag: string
  prismicPageData: Record<string, any> | null
}>()

const { data: harvestData } = await useAsyncGql('HarvestDataQuery',
  { tag: props.tag },
  {
    transform: data => ({ ...data.harvestData }),
  },
)
</script>
