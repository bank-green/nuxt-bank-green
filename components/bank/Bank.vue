<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import ArrowDownBounce from '@/components/icons/ArrowDownBounce.vue';

// Import the layout components
import BankLayoutBad from '@/components/bank/BankLayoutBad.vue';
import BankLayoutGood from '@/components/bank/BankLayoutGood.vue';

import LastReviewed from '@/components/lastRated.vue';
import BankImpactCalculator from '@/components/bank/BankImpactCalculator.vue';
import BankInterestRates from '@/components/bank/BankInterestRates.vue';

// Props definition
const props = defineProps<{
  name: string;
  website: string;
  inheritBrandRating?: {
    tag: string;
    name: string;
  };
  lastReviewed: string | null;
  fossilFreeAlliance: boolean;
  headline: string;
  subtitle: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  rating: string;
  showEmbraceBreakup: boolean;
  harvestData?: any;
}>();

// Interest rate state
const bankInterestRate = ref(0);

// Handle interest rate changes from BankInterestRates component
const onInterestRateChange = (rate: number) => {
  bankInterestRate.value = rate;
};

// Determine which layout to use based on the rating prop
const layoutType = computed(() => {
  switch (props.rating) {
    case 'worst':
    case 'bad':
    case 'ok':
      return BankLayoutBad;
    case 'good':
    case 'great':
    default:
      return BankLayoutGood;
  }
});
</script>

<template>
  <component :is="layoutType">
    <template #section1>
      <!-- Left Side: Bank Logo, Name, and Rating Scale -->
      <div
        class="col-span-2 md:col-span-1 flex flex-col items-center md:items-start"
      >
        <!-- Bank Logo and Name -->
        <div class="w-full mb-4">
          <BankHeadline
            :name="name"
            :website="website"
            :inherit-brand-rating="inheritBrandRating"
            :subtitle="subtitle"
          />
        </div>

        <!-- Rating Scale -->
        <div
          class="font-semibold text-gray-800 text-2xl md:text-4xl tracking-wider mb-2 md:mb-6"
          v-html="headline"
        />
        <div
          class="flex flex-col items-center justify-start w-full space-y-2 mb-8"
        >
          <BankCircle class="max-w-xs scale-75" :rating="rating" />
          <SocialSharer
            class="text-sushi-500"
            :hashtags="['climatecrisis', 'fossilbanks']"
          />
          <NuxtLink class="underline hover:text-sushi-500" to="/methodology">
            How Bank.Green rates institutions
          </NuxtLink>
          <LastReviewed :last-reviewed="lastReviewed" />
        </div>
        <div
          v-if="fossilFreeAlliance"
          class="flex justify-center md:block mb-8 w-full"
        >
          <img
            class="w-32"
            src="/img/certification/fossil-free-certified.png"
            alt="Fossil Free Certification"
          />
        </div>
        <BankDescription :text="description1" />
        <BankInterestRates
          :harvest-data="harvestData"
          :bank-tag="props.name?.toLowerCase().replace(/\s+/g, '_')"
          @rate-change="onInterestRateChange"
        />
      </div>
             <!-- Right Side: Impact Section -->
             <div class="col-span-2 md:col-span-1">
               <BankImpactCalculator 
                 :bank-interest-rate="bankInterestRate" 
                 :current-bank-name="name"
               />
             </div>
    </template>

    <template #section2>
      <div class="text-gray-800 overflow-hidden py-16">
        <div class="contain">
          <div
            class="flex flex-col md:flex-row md:justify-between md:items-start pt-8 pb-16 w-full"
          >
            <!-- Text Container -->
            <div :class="layoutType === BankLayoutGood ? 'md:w-3/6' : 'w-full'">
              <BankDescription :text="description2" />
              <BankDescription :text="description3" />

              <div class="flex justify-center mt-6">
                <ArrowDownBounce class="inline-block w-10" />
              </div>
            </div>

            <!-- Image Container -->
            <img
              v-if="layoutType === BankLayoutGood"
              class="md:order-first md:w-2/6 md:ml-4"
              src="/img/illustrations/dig.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </template>

    <template v-if="description4" #section3>
      <div
        class="text-blue-900 leading-loose text-lg prose sm:prose-md xl:prose-l break-words text-center"
        v-html="description4"
      />
    </template>

    <template v-if="layoutType === BankLayoutGood" #footer-image>
      <div class="flex items-end justify-end pointer-events-none">
        <div class="w-11/12">
          <LottiePlayer path="/anim/wind_2_without_bg.json" />
        </div>
      </div>
    </template>
  </component>
</template>
