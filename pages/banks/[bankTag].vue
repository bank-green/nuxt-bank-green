<template>
  <div :key="bankTag">
    <Bank
      v-if="bankData"
      :name="bankData.name"
      :website="bankData.website ?? ''"
      :inherit-brand-rating="bankData.inheritBrandRating ?? undefined"
      :fossil-free-alliance="!!bankData.fossilFreeAlliance"
      :rating="bankData.rating"
      :show-embrace-breakup="!!bankData.countries?.find((c) => c?.code === 'GB')"
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
import { ref } from 'vue'
import { getRating } from './getRating'
import Bank from '@/components/bank/Bank.vue'
import { getDefaultFields } from '@/utils/banks'

const route = useRoute()
const bankTag = ref((route.params.bankTag as string)?.toLowerCase())
const defaultFields = ref()
const { client } = usePrismic()

const { data: bankData, error, status } = await useAsyncGql('BrandByTagQuery',
  { tag: bankTag.value },
  { transform: ({ brand }) => brand
    ? ({
        ...brand,
        ...brand.commentary,
        bankFatures: brand.bankFeatures,
        inheritBrandRating: brand.commentary?.inheritBrandRating,
        rating: getRating(brand),
        // FIXME: what even is this? where is style even suppose to come from?
        style: undefined,
      })
    : undefined,
  },
)

useHeadHelper(
  bankData.value?.name ? `${bankData.value.name}'s Climate Score - Bank.Green` : '',
  'Find and compare the service offerings of ethical and sustainable banks.',
)

if (bankData.value) {
  useHeadRating(bankData.value.rating)
  const institutionType = bankData.value.institutionType?.[0]?.name || ''
  defaultFields.value = await getDefaultFields(client, bankData.value.rating, bankData.value.name, institutionType)
}

const getFieldOrDefault = (fieldName: string) => {
  // @ts-expect-error - Indexing with a dynamic string key
  const value = bankData.value?.[fieldName]?.replace(/<\/?[^>]+(>|$)/g, '').trim()
  return value || defaultFields.value[fieldName]
}
</script>
