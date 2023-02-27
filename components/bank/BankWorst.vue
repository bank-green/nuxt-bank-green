<template>
    <BankLayoutBadWorst>
        <template #section1>
            <BankHeadline :name="details?.name" :website="details?.website" :subtitle="details?.subtitle"
                :inheritBrandRating="details?.inheritBrandRating" />
            <div
                class="relative col-span-2 md:col-span-1 md:row-span-2 flex flex-row justify-center md:justify-start md:mt-8">
                <div class="flex flex-col items-center justify-start">
                    <BankCircle class="max-w-sm" :rating="'worst'" />
                    <SocialSharer class="text-sushi-500" :hashtags="['climatecrisis', 'fossilbanks']" />
                </div>
            </div>
            <div class="col-span-2 md:col-span-1">
                <div class="flex justify-center md:block mb-8 w-full">
                </div>
                <div class="font-medium md:font-semibold text-gray-800 text-xl md:text-4xl tracking-wider mb-2 md:mb-6">
                    <div v-if="details?.header" v-html="details.header"></div>
                    <PrismicRichText v-else :field="worstbank?.data.headline" />
                </div>
                <div class="prose sm:prose-lg xl:prose-xl prose-blurb whitespace-pre-wrap">
                    <div v-if="details?.summary" v-html="details.summary"></div>
                    <PrismicRichText v-else :field="worstbank?.data.description1" />
                    <a v-if="details?.data_sources?.includes('bimpact')" href="http://data.world/blab/b-corp-impact-data"
                        class="block"><span class="text-xs" v-text="'CC BY-SA data partially from B-Lab'"></span></a>
                </div>
            </div>
        </template>

        <template #section2>
            <div v-if="details?.details" class="text-lg md:text-2xl whitespace-pre-line text-gray-900"
                v-html="details?.details"></div>
            <p v-else class="text-lg md:text-2xl whitespace-pre-line text-gray-900" v-text="piggyText"></p>
        </template>
    </BankLayoutBadWorst>
</template>



<script setup lang="ts">
const props = defineProps({
    details: Object
})

const { client } = usePrismic();

const { data: worstbank } = await useAsyncData("worstbank", () =>
    client.getByUID("bankpage", "worstbank")
);

const formattedTotal = computed(() => props?.details?.amountFinancedSince2016 ?? 'large amounts')

const piggyText =
    `While you’ve been stashing away money for a car or a weekend get-away, ${props?.details?.name} has been using your savings to lend to some very questionable fossil fuel friends.\n\nAnd it's not just a little here and there, we’re talking about ${formattedTotal.value || "a lot of money"} in the 6 years since 197 countries agreed to drastically reduce their greenhouse gas emissions in the Paris Agreement.`
</script>