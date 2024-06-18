<template>
  <BankLayoutBadWorst>
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
          <BankCircle class="max-w-sm" :rating="'bad'" />
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
        <div class="flex justify-center md:block mb-8 w-full" />
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
      <PrismicRichText
        v-if="
          bankPage?.data?.description2 && !isEmptyPrismicField(bankPage?.data.description2)
        "
        class="text-lg md:text-2xl whitespace-pre-line text-gray-900 mb-6 prose"
        :field="bankPage.data.description2"
      />
      <p
        v-else
        class="text-lg md:text-2xl whitespace-pre-line text-gray-900"
        v-text="piggyText"
      />
      <PrismicRichText
        class="md:text-xl tracking-wide whitespace-pre-line text-gray-600 mb-12 md:mb-0"
        :field="bankPage?.data.description3"
      />
    </template>
     <template #section3>
      <PrismicRichText
        v-if="
          bankPage?.data?.description4 && !isEmptyPrismicField(bankPage?.data.description4)
        "
        class="text-center text-blue-900 text-lg md:text-2xl tracking-wider font-semibold mb-4"
        :field="bankPage.data.description4"
      />
      <PrismicRichText
        class="text-blue-900 leading-loose text-lg"
        :field="bankPage.data.description5"
      />
    </template>
  </BankLayoutBadWorst>
</template>

<script setup lang="ts">
import { PrismicDocument } from '@prismicio/types'
import isEmptyPrismicField from '~/utils/prismic/isEmptyPrismicField'

const props = defineProps<{
  name: string;
  website: string;
  inheritBrandRating: {
    name: string;
    tag: string;
  };
  bankPage: PrismicDocument<Record<string, any>, string, string> | null;
  amountFinancedSince2016: string;
}>()

const piggyText = `While you’ve been stashing away money for a house or a weekend get-away, ${
  props.name
} has been using your savings to lend to some very questionable fossil fuel friends.\n\nAnd it's not just a little here and there, we’re talking about ${
  props.amountFinancedSince2016 ?? 'large amounts'
} in the 7 years since 197 countries agreed to drastically reduce their greenhouse gas emissions in the Paris Agreement.`
</script>
