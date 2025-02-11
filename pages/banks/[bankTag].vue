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
import { getDefaultFields, getBankDetail } from '@/utils/banks'

const route = useRoute()
const bankTag = ref((route.params.bankTag as string).toLowerCase())
const details = ref(null)
const bankData = ref(null)
const defaultFields = ref(null)
const { client } = usePrismic()

const updateHead = () => {
  useHeadHelper(
    bankData.value?.name ? `${bankData.value.name}'s Climate Score - Bank.Green` : '',
    'Find and compare the service offerings of ethical and sustainable banks.',
  )

  if (bankData?.value?.rating) {
    useHeadRating(bankData.value.rating)
  }
}

const fetchBankDetails = async (tag: string) => {
  details.value = await getBankDetail(tag)
  bankData.value = details.value
  updateHead()
  if (bankData?.value) {
    const institutionType = bankData.value.institutionType?.[0]?.name || ''
    defaultFields.value = await getDefaultFields(client, bankData.value.rating, bankData.value.name, institutionType)
    console.log(bankData.value.rating, bankData.value.name, institutionType)
  }
}

const getFieldOrDefault = (fieldName: string) => {
  const value = bankData.value[fieldName]?.replace(/<\/?[^>]+(>|$)/g, '').trim()
  return value || defaultFields.value[fieldName]
}

watch(() => route.params.bankTag, (newBankTag) => {
  bankTag.value = (newBankTag as string).toLowerCase()
  fetchBankDetails(bankTag.value)
})

onBeforeMount(() => fetchBankDetails(bankTag.value))

onMounted(() => {
  nextTick().then(() => fetchBankDetails(bankTag.value))
})
</script>
