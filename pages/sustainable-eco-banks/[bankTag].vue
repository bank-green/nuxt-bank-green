<template>
  <div
    v-if="details"
    class="page bg-sushi-50 space-y-8 md:space-y-16 pt-32 pb-16"
  >
    <EcoBankHeader
      :name="details.name"
      :rating="details.rating || ''"
      :website="details.website || ''"
      :inherit-brand-rating="details.inheritBrandRating ?? undefined"
      :institution-credentials="details.institutionCredentials ?? []"
      :prismic-our-take="prismicPageData?.our_take || ''"
      :prismic-default-page-data="prismicDefaultPageData"
      :last-reviewed="details.lastReviewed ?? ''"
      :fossil-free-alliance="details.fossilFreeAlliance ?? false"
      :top-pick="!!details.topPick"
    />

    <EcoBankSwitchSurvey
      :bank-name="details.name"
      :prismic-default-page-data="prismicDefaultPageData"
      :website="details.website || ''"
    />

    <EcoBankDetail
      :institution-type="details.institutionType || ''"
      :from-the-website="details.fromTheWebsite || ''"
      :name="details.name"
      :website="details.website || ''"
      :rating="details.rating || ''"
      :bank-features="details.bankFeatures ?? []"
      :tag="details.tag || ''"
      :prismic-page-data="prismicPageData"
      :prismic-default-page-data="prismicDefaultPageData"
      :prismic-slice-components="prismicComponents"
    />
  </div>
</template>

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { useRoute } from 'vue-router'
import { components } from '~~/slices'

import { useAsyncData, useAsyncGql, usePrismic, useHeadHelper } from '#imports'
import type { BrandByTagQueryQuery } from '#gql'

const prismicComponents = defineSliceZoneComponents(components)

const route = useRoute()
const bankTag = ref((route.params.bankTag as string).toLowerCase())

const { client } = usePrismic()

type TransformedBrand = {
  name: string
  rating: string
  website: string
  institutionCredentials: unknown[]
  institutionType?: string
  fromTheWebsite?: string
  bankFeatures?: unknown[]
  inheritBrandRating?: boolean
  lastReviewed?: string
  fossilFreeAlliance?: boolean
  topPick?: boolean
  tag?: string
}

const { data: details } = await useAsyncGql<BrandByTagQueryQuery, TransformedBrand | undefined>(
  'BrandByTagQuery',
  { tag: bankTag.value },
  {
    transform: data =>
      data?.brand
        ? {
            ...data.brand,
            ...data.brand.commentary,
            bankFeatures: data.brand.bankFeatures ?? [],
            inheritBrandRating: data.brand.commentary?.inheritBrandRating,
            rating: data.brand.commentary?.ratingInherited?.toLowerCase() ?? '',
            website: data.brand.website ?? '',
            institutionCredentials: data.brand.commentary?.institutionCredentials ?? [],
            institutionType: data.brand.commentary?.institutionType?.[0]?.name ?? '',
            fromTheWebsite: data.brand.commentary?.fromTheWebsite ?? '',
          }
        : undefined,
  },
)

const { data: prismicPageData } = await useAsyncData('sfipage', () =>
  client.getByUID('sfipage', bankTag.value),
{ transform: res => res?.data ?? {} },
)

const { data: prismicDefaultPageData } = await useAsyncData('sfidefaults', () =>
  client.getByID('ZFpGfhEAACEAuFIf'),
{ transform: res => res?.data ?? {} },
)

useHeadHelper(
  `${details?.value?.name ?? 'Bank'} Review and Service Offering - Bank.Green`,
)
</script>
