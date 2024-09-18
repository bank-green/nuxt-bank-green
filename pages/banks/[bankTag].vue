<template>
  <component
    :is="componentName"
    v-if="details"
    :name="details.name"
    :website="details.website"
    :inherit-brand-rating="details.inheritBrandRating"
    :fossil-free-alliance="details.fossilFreeAlliance"
    :bank-page="bankPage"
    :amount-financed-since2016="details.amountFinancedSince2016"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBankPage } from '../../utils/prismic/bankpage'

const route = useRoute()
const bankTag = route.params.bankTag
const details = ref(await getBankDetail(bankTag))

const { bankPage } = await useBankPage(bankTag as string, details)

useHeadHelper(
  details.value?.name
    ? `${details.value.name}'s Climate Score - Bank.Green`
    : '',
  'Find and compare the service offerings of ethical and sustainable banks.',
)

const { rating } = details.value
if (rating) { useHeadRating(rating) }

const BankUnknown = resolveComponent('BankUnknown')
const BankWorst = resolveComponent('BankWorst')
const BankBad = resolveComponent('BankBad')
const BankOk = resolveComponent('BankOk')
const BankGood = resolveComponent('BankGood')
const BankGreat = resolveComponent('BankGreat')

const componentName = computed(() => {
  const hasDetails = details.value && details.value.rating
  if (!hasDetails) { return undefined }

  switch (details.value.rating) {
    case 'worst':
      return BankWorst
    case 'bad':
      return BankBad
    case 'ok':
      return BankOk
    case 'good':
      return BankGood
    case 'great':
      return BankGreat
    case 'unknown':
    default:
      return BankUnknown
  }
})
</script>
