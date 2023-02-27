<template>
    <!-- :summary, :header, :details, :amountFinancedSince2016 to be removed 
        https://linear.app/bankgreen/issue/PE-476/render-custom-bank-texts-from-prismic
    -->
    <BankWorst v-if="details.rating === 'worst'" :name="details.name" :subtitle="details.subtitle"
        :website="details.website" :inheritBrandRating="details.inheritBrandRating" :header="details.header"
        :summary="details.summary" :details="details.details" :amountFinancedSince2016="details.amountFinancedSince2016" />

    <BankBad v-else-if="details.rating === 'bad'" :name="details.name" :subtitle="details.subtitle"
        :website="details.website" :inheritBrandRating="details.inheritBrandRating" :header="details.header"
        :summary="details.summary" :details="details.details" :amountFinancedSince2016="details.amountFinancedSince2016" />

    <BankOk v-else-if="details.rating === 'ok'" :name="details.name" :subtitle="details.subtitle" :website="details.website"
        :inheritBrandRating="details.inheritBrandRating" :header="details.header" :summary="details.summary" />

    <BankGreat v-else-if="details.rating === 'great'" :name="details.name" :subtitle="details.subtitle"
        :website="details.website" :inheritBrandRating="details.inheritBrandRating" :header="details.header"
        :summary="details.summary" :fossilFreeAlliance="details.fossilFreeAlliance" />

    <BankUnknown v-else :name="details.name" :subtitle="details.subtitle" :website="details.website"
        :inheritBrandRating="details.inheritBrandRating" />
</template>

<script setup lang="ts">
import { ref } from "vue";

// const route = useRoute()
// FIXME this is a workaround for an upstream Vue router bug; when seeing this the next time,
// check if it works with useRoute() by now
// I think this issue is relevant: https://github.com/nuxt/framework/issues/8731
// and this upstream PR in Vue: https://github.com/vuejs/core/pull/6736
const router = useRouter();
const bankTag = router.currentRoute.value.params.bankTag;
const details = ref(await getBankDetail(bankTag));

useHeadHelper(
    details.value?.name
        ? `${details.value.name}'s Climate Score - Bank.Green`
        : "",
    "Find and compare the service offerings of ethical and sustainable banks."
);

const { rating } = details.value;
if (rating) useHeadRating(rating);
</script>
