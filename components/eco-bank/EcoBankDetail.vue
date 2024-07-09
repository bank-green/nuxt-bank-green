<template>
  <div class="contain space-y-8 md:space-y-16">
    <Tab
      :tab-ids="['key-facts', 'products', 'fees']"
      class="w-full lg:w-3/4 xl:w-2/3 mx-auto"
    >
      <template #key-facts-nav>
        Key Facts
      </template>
      <template #products-nav>
        Products
      </template>
      <template #fees-nav>
        Fees
      </template>
      <template #key-facts>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:-mr-16">
          <p>
            <strong>Type:</strong>
            {{ institutionType || "Bank" }}
          </p>
          <p>
            <strong>Mobile Banking:</strong>
            {{ getBankFeature("Mobile banking") }}
          </p>
          <p>
            <strong>Environmental Policy:</strong>
            {{ getBankFeature("Environmental Policy") }}
          </p>
          <p>
            <strong>Founded: </strong>
            <span
              v-if="prismicPageData?.founded"
              :field="prismicPageData.founded"
            >{{ prismicPageData.founded }}</span>
          </p>
          <p>
            <strong>Serving: </strong>
            <PrismicText
              v-if="prismicPageData?.serving"
              :field="prismicPageData.serving"
              wrapper="span"
              fallback=""
            />
          </p>
          <p>
            <strong>Local Branches: </strong>
            {{ getBankFeature("Local Branches") }}
          </p>
        </div>
      </template>
      <template #products>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:-mr-24">
          <p>
            <strong>Current Accounts:</strong>
            {{ getBankFeature("checking") }}
          </p>
          <p>
            <strong>Savings Accounts:</strong>
            {{ getBankFeature("saving") }}
          </p>
          <p>
            <strong>Credit Cards:</strong>
            {{ getBankFeature("Credit cards") }}
          </p>
          <p>
            <strong>Mortgages or Loans:</strong>
            {{ getBankFeature("Mortgages or Loans") }}
          </p>
          <p>
            <strong>Business Lending:</strong>
            {{ getBankFeature("Small business lending") }}
          </p>
          <p>
            <strong>ISAs:</strong>
            {{ getBankFeature("ISAs") }}
          </p>
        </div>
      </template>
      <template #fees>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:-mr-16">
          <p>
            <strong>Overdraft Fee:</strong>
            {{ getInvertedBankFeature("No overdraft fee", "Yes") }}
          </p>
          <p>
            <strong>Account Maintenance Fee:</strong>
            {{ getInvertedBankFeature("No account maintenance fee", "Yes") }}
          </p>
          <p>
            <strong>Free ATM Network:</strong>
            {{ getBankFeature("Free ATM network") }}
          </p>
        </div>
      </template>
    </Tab>
    <Tab
      v-if="tabIds.length > 0"
      :tab-ids="tabIds"
      justify-tab-navigation="space-around"
    >
      <template #impact-nav>
        Impact
      </template>
      <template #security-nav>
        Security
      </template>
      <template #services-nav>
        Service
      </template>
      <template #convenience-nav>
        Convenience
      </template>
      <template #impact>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PrismicRichText
            class="pt-8 text-md md:text-lg tracking-wide space-y-6"
            :field="prismicPageData?.impact"
          />
          <div
            class="order-first lg:order-last flex items-center justify-center flex-col"
          >
            <PrismicImage
              v-if="
                prismicDefaultPageData && prismicDefaultPageData['impact-image']
              "
              class="w-full md:w-3/4 mx-auto object-contain object-top"
              alt="impact-image"
              :field="prismicDefaultPageData['impact-image']"
            />
            <NuxtLink :to="website" target="_blank" class="button-green-outline w-auto">
              <span class="font-semibold">{{ `Visit ${name}` }}</span>
            </NuxtLink>
          </div>
        </div>
      </template>
      <template #security>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PrismicRichText
            class="pt-8 text-md md:text-lg tracking-wide space-y-6"
            :field="prismicPageData?.security"
          />
          <div
            class="order-first lg:order-last flex items-center justify-center"
          >
            <PrismicImage
              v-if="
                prismicDefaultPageData &&
                  prismicDefaultPageData['security-image']
              "
              class="w-full md:w-3/4 mx-auto object-contain object-top"
              alt="security-image"
              :field="prismicDefaultPageData['security-image']"
            />
          </div>
        </div>
      </template>
      <template #services>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PrismicRichText
            class="pt-8 text-md md:text-lg tracking-wide space-y-6"
            :field="prismicPageData?.services"
          />
          <div
            class="order-first lg:order-last flex items-center justify-center"
          >
            <PrismicImage
              v-if="
                prismicDefaultPageData &&
                  prismicDefaultPageData['service-image']
              "
              class="w-full md:w-3/4 mx-auto object-contain object-top"
              alt="service-image"
              :field="prismicDefaultPageData['service-image']"
            />
          </div>
        </div>
      </template>
      <template #convenience>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PrismicRichText
            class="pt-8 text-md md:text-lg tracking-wide space-y-6"
            :field="prismicPageData?.convenience"
          />
          <div
            class="order-first lg:order-last flex items-center justify-center"
          >
            <PrismicImage
              v-if="
                prismicDefaultPageData &&
                  prismicDefaultPageData['convenience-image']
              "
              class="w-full md:w-3/4 mx-auto object-contain object-top"
              alt="convenience-image"
              :field="prismicDefaultPageData['convenience-image']"
            />
          </div>
        </div>
      </template>
    </Tab>
    <div
      v-else-if="tabIds.length === 0 && !!fromTheWebsite"
      :class="[
        'w-full block relative bg-white rounded-xl shadow-soft border py-12 px-8 md:px-16',
        'contain sm:text-center',
      ]"
    >
      <div class="mb-8">
        <h2
          class="font-semibold text-2xl text-gray-800 mb-8 sm:text-4xl sm:mb-4"
        >
          {{ `From the website of ${name}` }}
        </h2>
        <p class="whitespace-pre-line text-gray-500 sm:text-xl">
          {{ fromTheWebsite }}
        </p>
        <NuxtLink :to="website" target="_blank" class="button-green-outline w-auto mt-8 mx-auto" style="width: max-content;">
          <span class="font-semibold">{{ `Visit ${name}` }}</span>
        </NuxtLink>
      </div>
    </div>
    <!-- For whatever reason I need the following gap commented in so that gap works in Slice -->
    <!-- <div
      class="flex flex-col lg:flex-row gap-12 lg:gap-20"
    />-->
    <SliceZone
      :slices="prismicSlices ?? []"
      :components="prismicSliceComponents"
    />
  </div>
</template>

<script setup lang="ts">
import { SliceZoneComponents, SliceLike } from '@prismicio/vue'

interface BankFeature {
  offered: string;
  feature: {
    name: string;
  };
  details: string | null;
}

const props = defineProps<{
  institutionType: string | undefined;
  fromTheWebsite: string;
  name: string;
  website: string;
  rating: string;
  bankFeatures: BankFeature[];
  tag: string;
  prismicPageData: Record<string, any> | null;
  prismicDefaultPageData: Record<string, any> | null;
  prismicSliceComponents: SliceZoneComponents<SliceLike<string>, unknown>
}>()

const tabIds = computed(() =>
  ['impact', 'security', 'services', 'convenience'].filter(
    tabId =>
      props?.prismicPageData &&
      props.prismicPageData[tabId] &&
      props.prismicPageData[tabId].length > 0
  )
)

const prismicSlices = props?.prismicPageData?.slices?.length > 0 ? props?.prismicPageData?.slices : props?.prismicDefaultPageData?.slices

function getBankFeature (featureName: string, defaultValue: string = 'No') {
  const feature = props.bankFeatures.find(
    feature => feature.feature.name === featureName
  )
  if (feature) { return feature.details || feature.offered }
  return defaultValue
}

function getInvertedBankFeature (
  featureName: string,
  defaultValue: string = 'No'
) {
  const feature = props.bankFeatures.find(
    feature => feature.feature.name === featureName
  )
  if (feature) { return feature.details || (feature.offered === 'Yes' ? 'No' : 'Yes') }
  return defaultValue
}
</script>
