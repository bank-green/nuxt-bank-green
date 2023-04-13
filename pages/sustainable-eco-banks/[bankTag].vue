<template>
    <div class="page">
        <div class="bg-gradient-to-b from-sushi-50 to-sushi-100 pt-28 md:mb-16">
            <div class="page-fade-in contain max-w-5xl grid grid-cols-2 gap-8 md:gap-10">
                <div class="prose">
                    <h2>Founded</h2>
                    <p>{{ sfi?.data.founded }}</p>

                    <h2>Security</h2>
                    <PrismicRichText :field="sfi?.data.security" />

                    <h2>Impact</h2>
                    <PrismicRichText :field="sfi?.data.impact" />

                    <h2>Services</h2>
                    <PrismicRichText :field="sfi?.data.services" />

                    <h2>Convenience</h2>
                    <PrismicRichText :field="sfi?.data.convenience" />
                </div>

            </div>
        </div>
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
const bankTag = router.currentRoute.value.params.bankTag;
if (!bankTag || typeof bankTag !== 'string')
    throw new Error("no banktag supplied: " + JSON.stringify(router.currentRoute.value))
const details = await getBankDetail(bankTag)

const { client } = usePrismic();

const { data: sfi } = await useAsyncData("sfi_" + bankTag, () =>
    client.getByUID("sfipage", bankTag))

useHeadHelper(`${details.name} Review and Service Offering - Bank.Green`)
</script>
