<template>
    <BankWorst v-if="details.rating === 'worst'" :details="details" />
    <BankBad v-else-if="details.rating === 'bad'" :details="details" />
    <BankOk v-else-if="details.rating === 'ok'" :details="details" />
    <BankGreat v-else-if="details.rating === 'great'" :details="details" />
    <BankUnknown v-else />
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from "vue";

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

const isBadBank = computed(() => {
    switch (details.value.rating) {
        case "bad":
        case "worst":
            return true;
    }
    return false;
});
</script>
