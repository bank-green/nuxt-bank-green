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
import { getDefaultFields } from '~/utils/banks'

const route = useRoute()
const bankTag = ref((route.params.bankTag as string)?.toLowerCase())
const defaultFields = ref()
const { client } = usePrismic()

const { data: bankData } = await useAsyncGql('BrandByTagQuery',
  { tag: bankTag.value },
  { transform: ({ brand }) => brand
    ? ({
        ...brand,
        ...brand.commentary,
        bankFatures: brand.bankFeatures,
        inheritBrandRating: brand.commentary?.inheritBrandRating,
        rating: getRating(brand),
        // FIXME: where is 'style' suppose to come from?
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
  const trimmedText = bankData.value[fieldName]?.replace(/<\/?[^>]+(>|$)/g, '').trim()
  if (trimmedText) {
    return bankData.value[fieldName] || defaultFields.value[fieldName]
  } else {
    return defaultFields.value[fieldName]
  }
}

const getRating = ({ commentary }: NonNullable<BrandByTagQueryQuery['brand']>): string => {
  const inheritedRating = commentary?.ratingInherited?.toLocaleLowerCase()
  const isCreditUnion = commentary?.institutionType?.[0]?.name === 'Credit Union'
  const isRatingUnknown = commentary?.rating === 'unknown'

  // for credit unions we want to overwrite a brand's rating to 'good' if 'unknown'
  if (isCreditUnion && isRatingUnknown) {
    return 'good'
  }
  return inheritedRating || ''
}
</script>
