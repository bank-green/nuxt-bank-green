<template>
  <div :key="bankTag">
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
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount, onMounted, nextTick } from 'vue'
import Bank from '@/components/bank/Bank.vue'
import { getDefaultFields } from '@/utils/banks'

const route = useRoute()
const bankTag = ref((route.params.bankTag as string).toLowerCase())
const details = ref(await getBankDetail(bankTag.value))
const bankData = ref(details.value)

function updateHead() {
  useHeadHelper(
    bankData.value?.name
      ? `${bankData.value.name}'s Climate Score - Bank.Green`
      : '',
    'Find and compare the service offerings of ethical and sustainable banks.',
  )

  if (bankData.value.rating) {
    useHeadRating(bankData.value.rating)
  }
}

async function fetchBankDetails(tag: string) {
  details.value = await getBankDetail(tag)
  bankData.value = details.value
  updateHead()
}

let institutionType = ''
if (bankData.value.institutionType && bankData.value.institutionType.length > 0) {
  institutionType = bankData.value.institutionType[0].name
}
const defaultFields = await getDefaultFields(bankData.value.rating, bankData.value.name, institutionType)

function getFieldOrDefault(fieldName: string) {
  // Remove HTML tags and trim whitespace
  const value = bankData.value[fieldName]?.replace(/<\/?[^>]+(>|$)/g, '').trim()
  return value ? bankData.value[fieldName] : defaultFields[fieldName]
}

watch(() => route.params.bankTag, async (newBankTag) => {
  bankTag.value = (newBankTag as string).toLowerCase()
  await fetchBankDetails(bankTag.value)
})

onBeforeMount(async () => {
  await fetchBankDetails(bankTag.value)
})

onMounted(async () => {
  await nextTick()
  await fetchBankDetails(bankTag.value)
})
</script>
