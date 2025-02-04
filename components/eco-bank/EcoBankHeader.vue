<template>
  <div class="page-fade-in contain">
    <div class="relative bg-white rounded-xl shadow-soft border">
      <div class="absolute -top-4 -right-4">
        <img
          class="h-20 w-auto"
          src="/img/logos/bankgreen-logo.png"
          alt="Bank Green"
        >
      </div>
      <div class="grid grid-cols-2 gap-8 md:gap-10 py-12 px-8">
        <EcoBankHeadline
          :name="name"
          :website="website"
          :inherit-brand-rating="inheritBrandRating"
        />
        <div
          class="relative col-span-2 md:col-span-1 md:row-span-2 flex flex-row justify-center items-center"
        >
          <div class="flex flex-col items-center justify-start w-full">
            <BankCircle
              class="max-w-sm"
              :rating="rating"
            />
            <SocialSharer
              class="text-sushi-500"
              :hashtags="['climatecrisis', 'fossilbanks']"
            />
            <NuxtLink
              class="underline hover:text-sushi-500 mt-6"
              to="/methodology"
            >
              {{ prismicDefaultPageData?.link_copy_methodology_page }}
            </NuxtLink>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div
            class="font-medium md:font-semibold text-gray-800 text-xl md:text-4xl tracking-wider mb-2 md:mb-6"
          >
            {{ `Our take on ${name}` }}
          </div>
          <div class="text-lg md:text-xl text-gray-500 prose">
            <div
              v-if="ourTake"
              v-html="ourTake"
            />
            <span v-else-if="rating === 'ok'">This bank is ok</span>
            <span v-else-if="rating === 'great'">This bank is great</span>
          </div>
          <div
            v-if="hasInstitutionCredentials || fossilFreeAlliance || topPick"
            class="flex flex-col md:flex-row justify-start items-center gap-6 mt-4"
          >
            <img
              v-if="fossilFreeAlliance"
              class="h-16 w-auto"
              src="/img/certification/fossil-free-certified.png"
              alt="Fossil Free Certified"
              title="Fossil Free Certified"
            >
            <img
              v-if="topPick"
              class="h-16 w-auto"
              src="/img/certification/TopPick.svg"
              alt="Top Pick"
              title="Top Pick"
            >
            <template
              v-for="cred in institutionCredentials"
              :key="cred"
            >
              <PrismicImage
                v-if="
                  cred?.prismicApiId
                    && prismicDefaultPageData
                    && prismicDefaultPageData[cred.prismicApiId]
                "
                class="h-16 md:h-12 w-auto"
                :alt="cred?.name"
                :title="cred?.name"
                :field="prismicDefaultPageData[cred.prismicApiId]"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    website: string
    name: string
    inheritBrandRating?: {
      tag: string
      name: string
    }
    rating: string
    institutionCredentials: any[]
    prismicDefaultPageData: Record<string, any> | null
    ourTake: string
    fossilFreeAlliance?: boolean
    topPick?: boolean
  }>(),
  {
    fossilFreeAlliance: false,
    topPick: false,
  },
)

console.log('props', props)

const hasInstitutionCredentials: ComputedRef<boolean> = computed(
  () => props.institutionCredentials && props.institutionCredentials.length > 0,
)
</script>
