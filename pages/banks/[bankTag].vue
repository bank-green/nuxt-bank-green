<template>
  <Bank
    v-if="details"
    :name="details.name"
    :website="details.website"
    :inherit-brand-rating="details.inheritBrandRating"
    :fossil-free-alliance="details.fossilFreeAlliance"
    :bank-page="bankPage"
    :rating="details.rating"
    :show-embrace-breakup="!!details.countries.find((c: any) => c.code === 'GB')"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBankPage } from '../../utils/prismic/bankpage';
import Bank from '@/components/bank/Bank.vue'; // Import the new Bank component

const route = useRoute();
const bankTag = route.params.bankTag;
const details = ref(await getBankDetail(bankTag));

const { bankPage } = await useBankPage(bankTag as string, details);

useHeadHelper(
  details.value?.name
    ? `${details.value.name}'s Climate Score - Bank.Green`
    : '',
  'Find and compare the service offerings of ethical and sustainable banks.'
);

const { rating } = details.value;
if (rating) {
  useHeadRating(rating);
}
</script>
