<template>
  <Bank
    v-if="bankData"
    :name="bankData.name"
    :website="bankData.website"
    :inherit-brand-rating="bankData.inheritBrandRating"
    :fossil-free-alliance="bankData.fossilFreeAlliance"
    :rating="bankData.rating"
    :show-embrace-breakup="!!bankData.countries.find((c: any) => c.code === 'GB')"
    :style="bankData.style"
    :headline="bankData.header ? bankData.header : defaultFields?.header"
    :subtitle="bankData.subtitle ? bankData.subtitle : defaultFields?.subtitle"
    :description1="bankData.summary ? bankData.summary : defaultFields?.summary"
    :description2="bankData.details ? bankData.details : defaultFields?.details"
    :description3="bankData.fromTheWebsite ? bankData.fromTheWebsite : defaultFields?.fromTheWebsite"
    :description4="defaultFields?.description4 ?? ''"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Bank from '@/components/bank/Bank.vue' // Import the new Bank component
import { getDefaultFields } from '@/utils/banks'

const route = useRoute()
const bankTag = route.params.bankTag
const details = ref(await getBankDetail(bankTag))
const bankData = details.value

useHeadHelper(
  bankData?.name
    ? `${bankData.name}'s Climate Score - Bank.Green`
    : '',
  'Find and compare the service offerings of ethical and sustainable banks.',
)

if (bankData.rating) {
  useHeadRating(bankData.rating)
}

const defaultFields = getDefaultFields(bankData.rating, bankData.name)
</script>
