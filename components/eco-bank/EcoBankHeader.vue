<template>
    <div class="page-fade-in contain">
        <div class="relative bg-white rounded-xl shadow-soft border">
            <div class="absolute -top-4 -right-4">
                <img class="h-20 w-auto" src="/img/logos/bankgreen-logo.png" alt="Bank Green" />
            </div>
            <div class="grid grid-cols-2 gap-8 md:gap-10 py-12 px-8">
                <EcoBankHeadline :name="name" :website="website" :inheritBrandRating="inheritBrandRating" />
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
                        <PrismicRichText v-if="prismicOurTake && prismicOurTake.length > 0" :field="prismicOurTake" />
                        <span v-else-if="rating === 'ok'">This bank is ok</span>
                        <span v-else-if="rating === 'great'">This bank is great</span>
                    </div>
                    <div class="flex flex-col md:flex-row justify-start items-center gap-6 mt-4"
                        v-if="hasInstitutionCredentials">
                        <template v-for="cred in institutionCredentials">
                            <img v-if="isFossilFreeCertification(cred)" class="h-16 w-auto"
                                src="/img/certification/fossil-free-certified.png" :alt="cred?.name" />

                            <PrismicImage v-else-if="cred?.prismicApiId &&
                                prismicDefaultPageData &&
                                prismicDefaultPageData[cred.prismicApiId]" class="h-16 md:h-12 w-auto"
                                :field="prismicDefaultPageData[cred.prismicApiId]" />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { RichTextField } from "@prismicio/types";

interface InstitutionCredential {
    name: string;
    prismicApiId: string;
}

const props = defineProps<{
    website: string,
    name: string,
    inheritBrandRating?: {
        tag: string,
        name: string
    },
    rating: string,
    institutionCredentials: any[],
    prismicDefaultPageData: Record<string, any> | null,
    prismicOurTake?: RichTextField
}>()

const hasInstitutionCredentials: ComputedRef<boolean> = computed(() =>
    props.institutionCredentials && props.institutionCredentials.length > 0)


const isFossilFreeCertification = (institutionCredential: any) => {
    return (institutionCredential as InstitutionCredential).name == 'Fossil Free Certification'
}
</script>