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
    :headline="getFieldOrDefault('headline')"
    :subtitle="getFieldOrDefault('subtitle')"
    :description1="getFieldOrDefault('description1')"
    :description2="getFieldOrDefault('description2')"
    :description3="getFieldOrDefault('description3')"
    :description4="defaultFields?.description4 ?? ''"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Bank from '@/components/bank/Bank.vue'
import { getDefaultFields } from '@/utils/banks'

const route = useRoute()
const bankTag = (route.params.bankTag as string).toLowerCase()
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
let institutionType = ''
if (bankData.institutionType && bankData.institutionType.length > 0) {
  institutionType = bankData.institutionType[0].name
}
const defaultFields = await getDefaultFields(bankData.rating, bankData.name, institutionType)

function getFieldOrDefault(fieldName: string) {
  return bankData[fieldName] ? bankData[fieldName] : defaultFields[fieldName]
}
</script>
