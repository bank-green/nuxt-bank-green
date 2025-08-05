<template>
  <div :key="bankTag">
    <Bank
      v-if="bankData"
      :name="bankData.name ?? ''"
      :website="bankData.website ?? ''"
      :inherit-brand-rating="bankData.inheritBrandRating ?? undefined"
      :fossil-free-alliance="!!bankData.fossilFreeAlliance"
      :rating="bankData.rating ?? ''"
      :show-embrace-breakup="!!bankData.countries?.find(c => c?.code === 'GB')"
      :last-reviewed="bankData.lastReviewed ?? ''"
      :style="bankData.style ?? {}"
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
import { useRoute } from 'vue-router'
import Bank from '@/components/bank/Bank.vue'
import { getDefaultFields } from '~/utils/banks'
import type { BrandByTagQueryQuery } from '#gql'

// Route param
const route = useRoute()
const bankTag = ref((route.params.bankTag as string)?.toLowerCase())

// Default content fallback
const defaultFields = ref<Record<string, string>>({})

// Prismic client
const { client } = usePrismic()

// Helper to adjust rating logic
const getRating = ({
  commentary,
}: NonNullable<BrandByTagQueryQuery['brand']>): string => {
  const inheritedRating = commentary?.ratingInherited?.toLowerCase()
  const isCreditUnion =
    commentary?.institutionType?.[0]?.name === 'Credit Union'
  const isRatingUnknown = commentary?.rating === 'unknown'
  if (isCreditUnion && isRatingUnknown) {
    return 'good'
  }
  return inheritedRating || ''
}

// GraphQL fetch
const { data: bankData } = await useAsyncGql(
  'BrandByTagQuery',
  { tag: bankTag.value },
  {
    transform: ({ brand }) =>
      brand
        ? {
            ...brand,
            ...brand.commentary,
            bankFatures: brand.bankFeatures,
            inheritBrandRating: brand.commentary?.inheritBrandRating,
            rating: getRating(brand),
            style: undefined, // FIXME: Placeholder, assign correct logic
          }
        : undefined,
  }
)

// SEO head setup
useHeadHelper(
  bankData.value?.name
    ? `${bankData.value.name}'s Climate Score - Bank.Green`
    : '',
  'Find and compare the service offerings of ethical and sustainable banks.'
)

if (bankData.value) {
  useHeadRating(bankData.value.rating ?? '')

  const institutionType = bankData.value.institutionType?.[0]?.name || ''
  const rating = bankData.value.rating ?? ''
  const name = bankData.value.name ?? ''
  try {
    defaultFields.value = await getDefaultFields(
      client,
      rating,
      name,
      institutionType
    )
  } catch {
    defaultFields.value = {} // fallback to empty object
  }
}

// Field helper with type guard
const getFieldOrDefault = (fieldName: string): string => {
  const fieldValue = bankData.value?.[fieldName]
  const trimmedText =
    typeof fieldValue === 'string'
      ? fieldValue.replace(/<\/?[^>]+(>|$)/g, '').trim()
      : ''
  return trimmedText || defaultFields.value?.[fieldName] || ''
}
</script>
