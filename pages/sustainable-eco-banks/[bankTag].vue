<template>
    <div class="page bg-sushi-50 space-y-24 pt-32 pb-16">
        <EcoBankHeader
            :name="details.name" :rating="details.rating" :subtitle="details.subtitle" :ourTake="details.ourTake"
            :website="details.website" :inheritBrandRating="details.inheritBrandRating" />

        <!-- TODO: create component -->
        <div class="contain grid grid-cols-1 md:grid-cols-5 gap-8">
            <NuxtLink 
                to="/#" 
                class="col-span-2 button-green w-auto">
                <span class="font-semibold">{{ `Visit ${details.name}` }}</span>
            </NuxtLink>
            <div class="col-span-3 pt-1">
                Have you opened an account with {{ details.name }} since visiting Bank.Green? 
                <NuxtLink class="font-semibold text-sushi-300 hover:text-sushi-200" to="/impact">Please let us know!</NuxtLink>
            </div>
        </div>

        <EcoBankDetail 
            :fromTheWebsite="details.fromTheWebsite" 
            :name="details.name"
            :website="details.website" 
            :rating="details.rating" 
            :bankFeatures="details.bankFeatures" 
            :tag="details.tag" 
            :prismic-page-data="prismicPageData"
        />
        
            <!-- TODO: create component -->
        <div class="contain grid grid-cols-1 md:grid-cols-5 gap-8">
            <NuxtLink 
                to="/#" 
                class="col-span-2 button-green w-auto">
                <span class="font-semibold">{{ `Visit ${details.name}` }}</span>
            </NuxtLink>
            <div class="col-span-3 pt-1">
                Have you opened an account with {{ details.name }} since visiting Bank.Green? 
                <NuxtLink class="font-semibold text-sushi-300 hover:text-sushi-200" to="/impact">Please let us know!</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const details : Ref<any | null> = ref(null);
const prismicPageData : 
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

    const [ bankDetailsResponse, prismicResponse ] = await Promise.all([
        getBankDetail(bankTag),
        client.getByUID("sfipage", bankTag),
    ]);
    details.value = bankDetailsResponse;
    prismicPageData.value = prismicResponse.data;

    useHeadHelper(`${details.value.name} Review and Service Offering - Bank.Green`)
}
</script>
