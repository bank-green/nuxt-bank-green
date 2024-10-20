<template>
  <div class="page bg-sushi-50 space-y-8 md:space-y-16 pt-32 pb-16">
    <EcoBankHeader
      :name="details.name"
      :rating="details.rating"
      :website="details.website"
      :inherit-brand-rating="details.inheritBrandRating"
      :institution-credentials="institutionCredentials"
      :our-take="details?.ourTake"
      :prismic-default-page-data="prismicDefaultPageData"
      :fossil-free-alliance="details.fossilFreeAlliance"
      :top-pick="details.topPick"
    />

    <EcoBankSwitchSurvey
      :bank-name="details.name"
      :prismic-default-page-data="prismicDefaultPageData"
      :website="details.website"
    />

    <EcoBankDetail
      :institution-type="institutionType"
      :from-the-website="details.fromTheWebsite"
      :name="details.name"
      :website="details.website"
      :rating="details.rating"
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

const details: Ref<any | null> = ref(null)
const prismicPageData: Ref<Record<string, any> | null> = ref(null)
const prismicDefaultPageData: Ref<Record<string, any> | null> = ref(null)
const prismicComponents: Ref<Record<string, any> | null> = ref(null)
const route = useRoute()
const bankTag = route.params.bankTag as string

const { client } = usePrismic()

details.value = await getBankDetail(bankTag)

const prismicResponse = await useAsyncData('sfipage', () =>
  client.getByUID('sfipage', bankTag),
)
prismicPageData.value = prismicResponse.data.value?.data || null
const prismicDefaultDataResponse = await useAsyncData('sfidefaults', () =>
  client.getByID('ZFpGfhEAACEAuFIf'),
)
prismicDefaultPageData.value
  = prismicDefaultDataResponse.data.value?.data || null

useHeadHelper(
  `${details.value.name} Review and Service Offering - Bank.Green`,
)

prismicComponents.value = ref(defineSliceZoneComponents(components))

const institutionType: ComputedRef<string | undefined> = computed(() => {
  const result
    = Array.isArray(details.value.commentary.institutionType)
    && details.value.commentary.institutionType.length
      ? details.value.commentary.institutionType[0].name
      : undefined
  return result
})

const institutionCredentials = computed(
  () => details.value.commentary.institutionCredentials || [],
)
</script>
