<template>
<div class="page-fade-in contain">
    <div class="relative bg-white rounded-xl shadow-soft border">
        <div 
            class="absolute -top-4 -right-4">
            <img class="h-20 w-auto" src="/img/logos/bankgreen-logo.png" alt="Bank Green" />
        </div>
        <div class="grid grid-cols-2 gap-8 md:gap-10 py-12 px-8">
            <EcoBankHeadline 
                :name="name" 
                :subtitle="subtitle" 
                :website="website"
                :inheritBrandRating="inheritBrandRating" 
            />
            <div class="relative col-span-2 md:col-span-1 md:row-span-2 flex flex-row justify-center items-center">
                <div class="flex flex-col items-center justify-start w-full">
                    <BankCircle class="max-w-sm" :rating="rating" />
                    <SocialSharer class="text-sushi-500" :hashtags="['climatecrisis', 'fossilbanks']" />
                </div>
            </div>  
            <div class="col-span-2 md:col-span-1">
                <div class="font-medium md:font-semibold text-gray-800 text-xl md:text-4xl tracking-wider mb-2 md:mb-6">
                    {{ `Our take on ${name}` }}
                </div>
                <div class="text-lg md:text-xl text-gray-500">
                    <span v-if="ourTake" class="">{{
                        ourTake
                    }}</span>
                    <span v-else-if="rating === 'ok'">This bank is ok</span>
                    <span v-else-if="rating === 'great'">This bank is great</span>
                </div>
                <div class="flex flex-col md:flex-row justify-start items-center gap-6 mt-4" v-if="hasInstitutionCredentials">
                    <img v-if="hasFossilFreeCertification" class="h-16 w-auto" 
                        src="/img/certification/fossil-free-certified.png"
                        alt="Fossil Free Certification" 
                    />
                    <PrismicImage 
                        v-if="
                            hasCertifiedBCorporation &&
                            prismicDefaultPageData &&
                            prismicDefaultPageData[ACCREDIT_MAPPING.B_COPR.Prismic]"
                        class="h-20 width-auto"
                        :field="prismicDefaultPageData[ACCREDIT_MAPPING.B_COPR.Prismic]"
                    />
                    <PrismicImage 
                        v-if=" 
                            hasGABV &&
                            prismicDefaultPageData &&
                            prismicDefaultPageData[ACCREDIT_MAPPING.GABV.Prismic]"
                        class="h-10 width-auto"
                        :field="prismicDefaultPageData[ACCREDIT_MAPPING.GABV.Prismic]"
                    />
                    <PrismicImage 
                        v-if=" 
                            hasBankerforNetZeroCertification &&
                            prismicDefaultPageData &&
                            prismicDefaultPageData[ACCREDIT_MAPPING.NETZERO.Prismic]"
                        class="h-12 width-auto"
                        :field="prismicDefaultPageData[ACCREDIT_MAPPING.NETZERO.Prismic]"
                    />
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
const ACCREDIT_MAPPING = {
    GABV: {
        Django: "GABV",
        Prismic: "institution_credentials-gabv"
    },
    NETZERO:  {
        Django: "Bankers for Net Zero",
        Prismic: "institution_credentials-bankers_for_net_zero"
    },
    FOSSIL_FREE:  {
        Django: "Fossil Free Certification",
        Prismic: ""
    },
    B_COPR:  {
        Django: "Certified B Corporation",
        Prismic: 'institution_credentials-b_impact'
    },
}

const props = defineProps<{
    website: string,
    name: string,
    inheritBrandRating?: {
        tag: string,
        name: string
    },
    subtitle: string,
    rating: string,
    ourTake: string,
    institutionCredentials: string[],
    prismicDefaultPageData: Record<string, any> | null,
}>()

const hasInstitutionCredentials : ComputedRef<boolean> = computed(() => 
    props.institutionCredentials && props.institutionCredentials.length > 0)

const hasGABV : ComputedRef<boolean> = computed(() =>
    hasInstitutionCredentials.value && 
    props.institutionCredentials.includes(ACCREDIT_MAPPING.GABV.Django)
    );

const hasFossilFreeCertification : ComputedRef<boolean> = computed(() => 
    hasInstitutionCredentials.value && props.institutionCredentials.includes(ACCREDIT_MAPPING.FOSSIL_FREE.Django));


const hasCertifiedBCorporation : ComputedRef<boolean> = computed(() => 
    hasInstitutionCredentials.value && props.institutionCredentials.includes(ACCREDIT_MAPPING.B_COPR.Django));

const hasBankerforNetZeroCertification : ComputedRef<boolean> = computed(() => 
    hasInstitutionCredentials.value && props.institutionCredentials.includes(ACCREDIT_MAPPING.NETZERO.Django));
</script>