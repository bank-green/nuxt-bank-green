<template>
    <div class="page">
        <EcoBankHeader :details="details" />
        <EcoBankDetail :details="details" />
    </div>
</template>

<script setup>

// const route = useRoute()
// FIXME this is a workaround for an upstream Vue router bug; when seeing this the next time,
// check if it works with useRoute() by now
// I think this issue is relevant: https://github.com/nuxt/framework/issues/8731
const router = useRouter();
const bankTag = router.currentRoute.value.params.bankTag;
if (!bankTag)
    throw new Error("no banktag supplied: " + JSON.stringify(router.currentRoute.value))
const details = await getBankDetail(bankTag)

useHeadHelper(`${details.name} Review and Service Offering - Bank.Green`)
</script>
