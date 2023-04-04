<template>
    <div class="page">
        <EcoBankHeader :name="details.name" :rating="details.rating" :subtitle="details.subtitle" :ourTake="details.ourTake"
            :website="details.website" :inheritBrandRating="details.inheritBrandRating" />
        <EcoBankDetail :details="details" :fromTheWebsite="details.fromTheWebsite" :name="details.name"
            :website="details.website" :rating="details.rating" :bankFeatures="details.bankFeatures" :tag="details.tag" />
    </div>
</template>

<script setup lang="ts">

// const route = useRoute()
// FIXME this is a workaround for an upstream Vue router bug; when seeing this the next time,
// check if it works with useRoute() by now
// I think this issue is relevant: https://github.com/nuxt/framework/issues/8731
const router = useRouter();
const bankTag = router.currentRoute.value.params.bankTag as string
if (!bankTag)
    throw new Error("no banktag supplied: " + JSON.stringify(router.currentRoute.value))

const { data: details } = (await useAsyncData(
    bankTag,
    () => getBankDetail(bankTag)
)) as { data: any }

useHeadHelper(`${details.name} Review and Service Offering - Bank.Green`)
</script>
