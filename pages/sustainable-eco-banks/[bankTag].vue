<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'

const route = useRoute()
const bankTag = ref((route.params.bankTag as string).toLowerCase())

const { client } = usePrismic()

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

const { data: harvestData } = await useAsyncGql('HarvestDataQuery', { tag: bankTag.value }, {
  transform: (data) => {
    return data.harvestData
  },
})

useHeadHelper(
  `${details?.value?.name} Review and Service Offering - Bank.Green`,
)

// -------------------------
//    Prismic Page Data
// -------------------------
const { data: prismicPageData } = await useAsyncData('sfipage', () =>
  client.getByUID('sfipage', bankTag.value),
{ transform: res => res?.data },
)
const { data: prismicDefaultPageData } = await useAsyncData('sfidefaults', () =>
  client.getByID('ZFpGfhEAACEAuFIf'),
{ transform: res => res?.data },
)

const prismicSlices = computed(() => prismicPageData?.value?.slices?.length ?? 0 > 0 ? prismicPageData.value?.slices : (prismicDefaultPageData as Record<string, any>).value?.slices)

// -------------------------
//    Prismic Components
// -------------------------
const prismicComponents: Ref<Record<string, any> | null> = ref(null)
prismicComponents.value = ref(defineSliceZoneComponents(components))
</script>

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

    <EcoBankDetails
      v-if="harvestData"
      :tag="details.tag"
      :prismic-page-data="prismicPageData"
      :harvest-data="harvestData"
    />

    <div class="contain">
      <SliceZone
        :slices="prismicSlices ?? []"
        :components="prismicComponents?.value"
      />
    </div>
  </div>
</template>
