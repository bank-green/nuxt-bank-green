<template>
    <div class="page bg-sushi-50 space-y-8 md:space-y-24 pt-32 pb-16">
        <EcoBankHeader
            :name="details.name" 
            :rating="details.rating" 
            :subtitle="details.subtitle" 
            :ourTake="details.ourTake"
            :website="details.website" 
            :inheritBrandRating="details.inheritBrandRating" 
            :institution-credentials="institutionCredentials"/>

        <!-- TODO: create component -->
        <div class="contain grid grid-cols-1 md:grid-cols-5 gap-8">
            <div class="col-span-1 md:col-span-2">
                <NuxtLink 
                    to="/#" 
                    class="button-green w-full">
                    <span class="font-semibold">{{ `Visit ${details.name}` }}</span>
                </NuxtLink>
            </div>
            <div class="col-span-1 md:col-span-3 pt-1">
                Have you opened an account with {{ details.name }} since visiting Bank.Green? 
                <NuxtLink class="font-semibold text-sushi-300 hover:text-sushi-200" to="/impact">Please let us know!</NuxtLink>
            </div>
        </div>

        <EcoBankDetail 
            :institutionType="institutionType"
            :fromTheWebsite="details.fromTheWebsite" 
            :name="details.name"
            :website="details.website" 
            :rating="details.rating" 
            :bankFeatures="details.bankFeatures" 
            :tag="details.tag" 
            :prismicPageData="prismicPageData"
        />
        
        <!-- TODO: create component -->
        <div class="contain grid grid-cols-1 md:grid-cols-5 gap-8">
            <div class="col-span-1 md:col-span-2">
                <NuxtLink 
                    to="/#" 
                    class="button-green w-full">
                    <span class="font-semibold">{{ `Visit ${details.name}` }}</span>
                </NuxtLink>
            </div>
            <div class="col-span-1 md:col-span-3 pt-1">
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

    details.value = await getBankDetail(bankTag);

    const prismicResponse = await useAsyncData(`sfipage`, () => 
        client.getByUID("sfipage", bankTag)
    );
    prismicPageData.value = prismicResponse.data.value?.data || null;
    
    useHeadHelper(`${details.value.name} Review and Service Offering - Bank.Green`)
}

const institutionType : ComputedRef<string | undefined> = computed(() => {
    const result = 
        details.value.commentary.institutionType.length &&  
        details.value.commentary.institutionType[0].name;
    if (typeof result === 'string')
        return result.charAt(0).toUpperCase() + result.slice(1);
    return result;
});

const institutionCredentials = computed(() =>
    details.value.commentary.institutionCredentials.map((cred: { name: string; }) => cred.name)
);
</script>
