<template>
  <component :is="layoutType">
    <template #section1>
      <BankHeadline
        :name="name"
        :website="website"
        :inherit-brand-rating="inheritBrandRating"
        :prismic-field-subtitle="bankPage?.data?.subtitle"
      />
      <div
        class="relative col-span-2 md:col-span-1 md:row-span-2 flex flex-row justify-center md:justify-start md:mt-8"
      >
        <div class="flex flex-col items-center justify-start w-full">
          <BankCircle class="max-w-sm" :rating="rating" />
          <SocialSharer
            class="text-sushi-500"
            :hashtags="['climatecrisis', 'fossilbanks']"
          />
          <NuxtLink class="underline hover:text-sushi-500 mt-6" to="/methodology">
            {{ bankPage?.data.link_copy_methodology_page }}
          </NuxtLink>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div v-if="fossilFreeAlliance" class="flex justify-center md:block mb-8 w-full">
          <img
            class="w-32"
            src="/img/certification/fossil-free-certified.png"
            alt="Fossil Free Certification"
          >
        </div>
        <div
          class="font-semibold text-gray-800 text-2xl md:text-4xl tracking-wider mb-2 md:mb-6"
        >
          <PrismicRichText :field="bankPage?.data.headline" />
        </div>
        <div class="prose sm:prose-lg xl:prose-xl prose-blurb">
          <PrismicRichText :field="bankPage?.data.description1" />
        </div>
      </div>
    </template>


    <template #section2>
      <div class="text-gray-800 overflow-hidden py-16">
        <div class="contain">
          <div class="flex flex-col md:flex-row md:justify-between md:items-start pt-8 pb-16 w-full">
            <!-- Text Container -->
            <div :class="layoutType === BankLayoutGreatGoodOkUnknown ? 'md:w-3/6' : 'w-full'">
              <PrismicRichText
                v-if="bankPage?.data?.description2 && !isEmptyPrismicField(bankPage?.data.description2)"
                class="text-lg md:text-2xl tracking-wide mb-4 prose"
                :field="bankPage?.data.description2"
              />
              <PrismicRichText
                class="md:text-xl tracking-wide whitespace-pre-line text-gray-600 mb-6"
                :field="bankPage?.data.description3"
              />
              <div class="flex justify-center mt-6">
                <ArrowDownBounce class="inline-block w-10" />
              </div>
            </div>

            <!-- Image Container -->
            <img
              v-if="layoutType === BankLayoutGreatGoodOkUnknown"
              class="md:order-first md:w-2/6 md:ml-4"
              src="/img/illustrations/dig.svg"
              alt=""
            >
          </div>
        </div>
      </div>
    </template>


    <template #section3 v-if="hasSection3">
      <PrismicRichText
        v-if="bankPage?.data?.description4 && !isEmptyPrismicField(bankPage?.data.description4)"
        class="text-blue-900 leading-loose text-lg prose sm:prose-md xl:prose-l break-words text-center"
        :field="bankPage.data.description4"
      />
    </template>

    <template #footer-image v-if="layoutType === BankLayoutGreatGoodOkUnknown">
      <div class="flex items-end justify-end pointer-events-none">
        <div class="w-11/12">
          <LottiePlayer path="/anim/wind_2_without_bg.json" />
        </div>
      </div>
    </template>
  </component>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import ArrowDownBounce from '@/components/icons/ArrowDownBounce.vue';
import isEmptyPrismicField from '~/utils/prismic/isEmptyPrismicField';

// Import the layout components
import BankLayoutBadWorst from '@/components/bank/BankLayoutBadWorst.vue';
import BankLayoutGreatGoodOkUnknown from '@/components/bank/BankLayoutGreatGoodOkUnknown.vue';

// Props definition
const props = defineProps<{
  name: string;
  website: string;
  inheritBrandRating: {
    tag: string;
    name: string;
  };
  fossilFreeAlliance: boolean;
  bankPage: Record<string, any>;
  rating: string;
  showEmbraceBreakup: boolean;
}>();

// Determine which layout to use based on the rating prop
const layoutType = computed(() => {
  switch (props.rating) {
    case 'worst':
    case 'bad':
      return BankLayoutBadWorst;
    case 'ok':
    case 'good':
    case 'great':
    default:
      return BankLayoutGreatGoodOkUnknown; 
  }
});

// Determine if section3 should be displayed (e.g., based on available data)
const hasSection3 = computed(() => {
  return props.bankPage?.data?.description4 && !isEmptyPrismicField(props.bankPage?.data?.description4);
});

</script>
