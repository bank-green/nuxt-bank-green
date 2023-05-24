<template>
    <BankLayoutBadWorst>
        <template #section1>
            <BankHeadline :name="name" :website="website" :inheritBrandRating="inheritBrandRating"
                :prismicFieldSubtitle="bankPage?.data?.subtitle" />
            <div
                class="relative col-span-2 md:col-span-1 md:row-span-2 flex flex-row justify-center md:justify-start md:mt-8">
                <div class="flex flex-col items-center justify-start w-full">
                    <BankCircle class="max-w-sm" :rating="'worst'" />
                    <SocialSharer class="text-sushi-500" :hashtags="['climatecrisis', 'fossilbanks']" />
                </div>
            </div>
            <div class="col-span-2 md:col-span-1">
                <div class="flex justify-center md:block mb-8 w-full">
                </div>
                <div class="font-semibold text-gray-800 text-2xl md:text-4xl tracking-wider mb-2 md:mb-6">
                    <PrismicRichText v-if="bankPage?.data" :field="bankPage?.data.headline" />
                </div>
                <div class="prose sm:prose-lg xl:prose-xl prose-blurb">
                    <PrismicRichText v-if="bankPage?.data" :field="bankPage?.data.description1" />
                </div>
            </div>
        </template>

        <template #section2>
            <PrismicRichText v-if="bankPage?.data?.description2 && bankPage.data.description2.length > 0"
                class="text-lg md:text-2xl whitespace-pre-line text-gray-900" :field="bankPage.data.description2" />
            <p v-else class="text-lg md:text-2xl whitespace-pre-line text-gray-900" v-text="piggyText"></p>
        </template>
    </BankLayoutBadWorst>
</template>
<script setup lang="ts">
import { PrismicDocument } from '@prismicio/types'

const props = defineProps<{
    name: string,
    website: string,
    inheritBrandRating: {
        name: string,
        tag: string
    },
    bankPage: PrismicDocument<Record<string, any>, string, string> | null,
    amountFinancedSince2016: string,
}>()

const piggyText =
    `While you’ve been stashing away money for a house or a weekend get-away, ${props.name} has been using your savings to lend to some very questionable fossil fuel friends.\n\nAnd it's not just a little here and there, we’re talking about ${props.amountFinancedSince2016 ?? 'large amounts'} in the 7 years since 197 countries agreed to drastically reduce their greenhouse gas emissions in the Paris Agreement.`
</script>