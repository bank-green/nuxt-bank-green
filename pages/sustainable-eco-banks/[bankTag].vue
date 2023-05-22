<template>
    <div class="page bg-sushi-50 space-y-8 md:space-y-24 pt-32 pb-16">
        <EcoBankHeader :name="details.name" :rating="details.rating" :website="details.website"
            :inheritBrandRating="details.inheritBrandRating" :institutionCredentials="institutionCredentials"
            :prismicOurTake="prismicPageData?.our_take" :prismicDefaultPageData="prismicDefaultPageData" />


        <EcoBankSwitchSurvey :bankName="details.name" :prismicDefaultPageData="prismicDefaultPageData"
            :website="details.website" />

        <EcoBankDetail :institutionType="institutionType" :fromTheWebsite="details.fromTheWebsite" :name="details.name"
            :website="details.website" :rating="details.rating" :bankFeatures="details.bankFeatures" :tag="details.tag"
            :prismicPageData="prismicPageData" :prismicDefaultPageData="prismicDefaultPageData" />

        <EcoBankSwitchSurvey :bankName="details.name" :prismicDefaultPageData="prismicDefaultPageData"
            :website="details.website" />
    </div>
</template>

<script setup lang="ts">
const details: Ref<any | null> = ref(null);
const prismicPageData:
    Ref<Record<string, any> | null>
    = ref(null);
const prismicDefaultPageData:
    Ref<Record<string, any> | null>
    = ref(null);

// const route = useRoute()
// FIXME this is a workaround for an upstream Vue router bug; when seeing this the next time,
// check if it works with useRoute() by now
// I think this issue is relevant: https://github.com/nuxt/framework/issues/8731
const router = useRouter();
const bankTag = router.currentRoute.value.params.bankTag as string;
if (!bankTag)
    throw new Error("no banktag supplied: " + JSON.stringify(router.currentRoute.value))
else {
    const { client } = usePrismic();

    details.value = await getBankDetail(bankTag);

    const prismicResponse = await useAsyncData(`sfipage`, () =>
        client.getByUID("sfipage", bankTag)
    );
    prismicPageData.value = prismicResponse.data.value?.data || null;
    const prismicDefaultDataResponse = await useAsyncData(`sfidefaults`, () =>
        client.getByID('ZFpGfhEAACEAuFIf')
    );
    prismicDefaultPageData.value = prismicDefaultDataResponse.data.value?.data || null;

    useHeadHelper(`${details.value.name} Review and Service Offering - Bank.Green`)
}

const institutionType: ComputedRef<string | undefined> = computed(() => {
    const result =
        (Array.isArray(details.value.commentary.institutionType) && details.value.commentary.institutionType.length)
            ? details.value.commentary.institutionType[0].name
            : undefined;
    return result;
});

const institutionCredentials = computed(() =>
    details.value.commentary.institutionCredentials || []
);
</script>
