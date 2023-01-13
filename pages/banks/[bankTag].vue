<template>
    <div class="page">
        <BankHeader :details="details" />
        <BankDetailBad v-if="isBadBank" :details="details" />
        <BankDetailOkay v-else :details="details" />
        <BankFooter :details="details"></BankFooter>
    </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'


// const route = useRoute()
// FIXME this is a workaround for an upstream Vue router bug; when seeing this the next time,
// check if it works with useRoute() by now
// I think this issue is relevant: https://github.com/nuxt/framework/issues/8731
const router = useRouter();
const bankTag = router.currentRoute.value.params.bankTag;
const details = ref(await getBankDetail(bankTag))

useHeadHelper((details.value?.name ? `${details.value.name}'s Climate Score - Bank.Green` : ''), 'Find and compare the service offerings of ethical and sustainable banks.',
)

const { rating } = details.value
if (rating)
    useHeadRating(rating)

const isBadBank = computed(() => {
    switch (details.value.rating) {
        case 'bad':
        case 'worst':
            return true
    }
    return false
})

</script>
