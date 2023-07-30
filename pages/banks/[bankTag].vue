<template>
    <component v-if="details" :is="componentName" :name="details.name" :website="details.website"
        :inheritBrandRating="details.inheritBrandRating" :fossilFreeAlliance="details.fossilFreeAlliance"
        :bankPage="bankPage" :amountFinancedSince2016="details.amountFinancedSince2016" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useBankPage } from "../../utils/prismic/bankpage";

const route = useRoute()
// FIXME this is a workaround for an upstream Vue router bug; when seeing this the next time,
// check if it works with useRoute() by now
// I think this issue is relevant: https://github.com/nuxt/framework/issues/8731
// and this upstream PR in Vue: https://github.com/vuejs/core/pull/6736
const bankTag = route.params.bankTag;
const details = ref(await getBankDetail(bankTag));

const { bankPage } = await useBankPage(bankTag, details);

useHeadHelper(
    details.value?.name
        ? `${details.value.name}'s Climate Score - Bank.Green`
        : "",
    "Find and compare the service offerings of ethical and sustainable banks."
);

const { rating } = details.value;
if (rating) useHeadRating(rating);

const BankUnknown = resolveComponent('BankUnknown');
const BankWorst = resolveComponent('BankWorst');
const BankBad = resolveComponent('BankBad');
const BankOk = resolveComponent('BankOk');
const BankGreat = resolveComponent('BankGreat');


const componentName = computed(() => {
    const hasDetails = details.value && details.value.rating;
    if (!hasDetails)
        return undefined;

    switch (details.value.rating) {
        case "worst":
            return BankWorst;
        case "bad":
            return BankBad;
        case "ok":
            return BankOk;
        case "great":
            return BankGreat;
        case "unknown":
        default:
            return BankUnknown;
    }
})
</script>
