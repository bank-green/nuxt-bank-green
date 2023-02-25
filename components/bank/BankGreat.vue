<template>
    <BankLayoutGreatOkUnknown>
        <template #section1>
            <BankHeadline :name="details?.name" :website="details?.website" :subtitle="details?.subtitle"
                :inheritBrandRating="details?.inheritBrandRating" />
            <div
                class="relative col-span-2 md:col-span-1 md:row-span-2 flex flex-row justify-center md:justify-start md:mt-8">
                <div class="flex flex-col items-center justify-start">
                    <BankCircle class="max-w-sm" :rating="'great'" />
                    <SocialSharer class="text-sushi-500" :hashtags="['climatecrisis', 'fossilbanks']" />
                </div>
            </div>
            <div class="col-span-2 md:col-span-1">
                <div class="flex justify-center md:block mb-8 w-full">
                    <img v-if="details?.fossilFreeAlliance" class="w-32" src="/img/certification/certified.png"
                        alt="Fossil Free Certification" />
                </div>
                <div class="font-medium md:font-semibold text-gray-800 text-xl md:text-4xl tracking-wider mb-2 md:mb-6">
                    <div v-if="details?.header" v-html="details.header"></div>
                    <div v-else><span>Your bank is great.</span></div>
                </div>
                <div class="prose sm:prose-lg xl:prose-xl prose-blurb whitespace-pre-wrap">
                    <div v-if="details?.summary" v-html="details.summary"></div>
                    <PrismicRichText v-else :field="greatbank?.data.description1" />
                    <a v-if="details?.data_sources?.includes('bimpact')" href="http://data.world/blab/b-corp-impact-data"
                        class="block"><span class="text-xs" v-text="'CC BY-SA data partially from B-Lab'"></span></a>
                </div>
            </div>
            <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-center">
                <div class="relative flex-grow md:flex-none md:-right-10 text-center">
                    <ArrowDownBounce class="inline-block mt-8 w-10" />
                </div>
            </div>
        </template>

        <template #section2>
            <div class="text-gray-800 overflow-hidden py-16">
                <div class="contain">
                    <div class="flex flex-col md:flex-row items-center justify-center pt-8 pb-16">
                        <div class="md:w-1/2 max-w-sm">
                            <PrismicRichText class="text-lg md:text-2xl tracking-wide mb-4"
                                :field="greatbank?.data.description2" />
                            <p class="md:text-xl tracking-wide whitespace-pre-line text-gray-600 mb-12 md:mb-0">
                                Our mission is to encourage as many people as possible to take a
                                stand - to refuse to let their money fuel environmental
                                destruction any longer. Considering who you bank with, we think
                                you probably agree. This is your chance to spread the word with
                                us.
                            </p>
                            <div class="flex justify-center mt-12">
                                <ArrowDownBounce class="inline-block w-10" />
                            </div>
                        </div>
                        <img class="md:order-first md:w-1/2 -mx-24 sm:mx-0 lg:-ml-32 md:mr-16"
                            src="/img/illustrations/dig.svg" alt="" />
                    </div>
                </div>
            </div>
        </template>

        <template #footer-image>
            <div class="flex items-end justify-end pointer-events-none">
                <div class="w-11/12">
                    <LottiePlayer path="/anim/wind_2_without_bg.json" />
                </div>
            </div>
        </template>

    </BankLayoutGreatOkUnknown>
</template>

<script setup lang="ts">
import ArrowDownBounce from "@/components/icons/ArrowDownBounce.vue";
const props = defineProps({
    details: Object,
});

const { client } = usePrismic();

const { data: greatbank } = await useAsyncData("greatbank", () =>
    client.getByUID("bankpage", "greatbank")
);

const checkList = [
    "Learn about the issues via our blog updates",
    "Join our campaigns to take action against fossil finance",
    "Discover other ways to divest from fossil fuels",
];
</script>
