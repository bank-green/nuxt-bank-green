<template>
  <div
    v-if="details"
    class="page bg-sushi-50 space-y-8 md:space-y-16 pt-32 pb-16"
  >
    <EcoBankHeader
      :name="details.name"
      :rating="details.rating"
      :website="details.website"
      :inherit-brand-rating="details?.inheritBrandRating || undefined"
      :institution-credentials="details.institutionCredentials"
      :prismic-our-take="prismicPageData?.our_take"
      :prismic-default-page-data="prismicDefaultPageData"
      :last-reviewed="details.lastReviewed"
      :fossil-free-alliance="details.fossilFreeAlliance"
      :top-pick="!!details.topPick "
    />

    <EcoBankSwitchSurvey
      :bank-name="details.name"
      :prismic-default-page-data="prismicDefaultPageData"
      :website="details.website || ''"
    />

    <EcoBankDetail
      :institution-type="details.institutionType"
      :from-the-website="details.fromTheWebsite"
      :name="details.name"
      :website="details.website || ''"
      :rating="details.rating || '' "
      :bank-features="details.bankFeatures"
      :tag="details.tag"
      :prismic-page-data="prismicPageData"
      :prismic-default-page-data="prismicDefaultPageData"
      :prismic-slice-components="prismicComponents?.value"
    />
  </div>
</template>

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'

const prismicComponents: Ref<Record<string, any> | null> = ref(null)
const route = useRoute()
const bankTag = ref((route.params.bankTag as string).toLowerCase())

const { client } = usePrismic()

const harvestData = ref<any>(null)

const { data: details } = await useAsyncGql('BrandByTagQuery',
  { tag: bankTag.value },
  { transform: data => data?.brand
    ? ({
        ...data.brand,
        ...data.brand.commentary,
        bankFatures: data.brand.bankFeatures,
        inheritBrandRating: data.brand.commentary?.inheritBrandRating,
        rating: data.brand.commentary?.ratingInherited?.toLocaleLowerCase(),
        website: data.brand?.website || '',
        institutionCredentials: data.brand?.commentary?.institutionCredentials || [],
        institutionType: data.brand?.commentary?.institutionType?.[0]?.name,
        fromTheWebsite: data.brand?.commentary?.fromTheWebsite,
      })
    : undefined,
  },
)

try {
  const result = await useAsyncGql('HarvestDataQuery', { tag: bankTag.value }, {
    transform: (data) => {
      return data?.harvestData || null
    },
  })
  harvestData.value = result.data.value
} catch (err) {
  console.error('❌ HarvestDataQuery failed during build:', err)
  harvestData.value = null
}

const { data: prismicPageData } = await useAsyncData('sfipage', () =>
  client.getByUID('sfipage', bankTag.value),
{ transform: res => res?.data },
)
const { data: prismicDefaultPageData } = await useAsyncData('sfidefaults', () =>
  client.getByID('ZFpGfhEAACEAuFIf'),
{ transform: res => res?.data },
)

useHeadHelper(
  `${details?.value?.name} Review and Service Offering - Bank.Green`,
)

prismicComponents.value = ref(defineSliceZoneComponents(components))
</script>
