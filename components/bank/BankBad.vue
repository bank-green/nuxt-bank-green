<template>
    <BankLayoutBadWorst>
        <template #section1>
            <BankHeadline :name="name" :website="website" :subtitle="subtitle" :inheritBrandRating="inheritBrandRating" />
            <div
                class="relative col-span-2 md:col-span-1 md:row-span-2 flex flex-row justify-center md:justify-start md:mt-8">
                <div class="flex flex-col items-center justify-start w-full">
                    <BankCircle class="max-w-sm" :rating="'bad'" />
                    <SocialSharer class="text-sushi-500" :hashtags="['climatecrisis', 'fossilbanks']" />
                </div>
            </div>
            <div class="col-span-2 md:col-span-1">
                <div class="flex justify-center md:block mb-8 w-full">
                </div>
                <div class="font-semibold text-gray-800 text-2xl md:text-4xl tracking-wider mb-2 md:mb-6">
                    <div v-if="header" v-html="header"></div>
                    <PrismicRichText v-else :field="badbank?.data.headline" />
                </div>
                <div class="prose sm:prose-lg xl:prose-xl prose-blurb">
                    <div v-if="summary" v-html="summary"></div>
                    <div v-else>Your bank doesn't top the charts, but it’s still using your money to lend to fossil fuel
                        companies and projects that are rapidly accelerating the climate crisis.
                    </div>
                </div>
            </div>
        </template>

        <template #section2>
            <div v-if="details" class="text-lg md:text-2xl whitespace-pre-line text-gray-900" v-html="details"></div>
            <p v-else class="text-lg md:text-2xl whitespace-pre-line text-gray-900" v-text="piggyText"></p>
        </template>
    </BankLayoutBadWorst>
</template>


<script setup lang="ts">
const props = defineProps<{
    name: string,
    website: string,
    subtitle: string,
    header: string,
    summary: string,
    details: string
    inheritBrandRating: {
        name: string,
        tag: string
    },
    amountFinancedSince2016: string
}>()

const { client } = usePrismic();

const { data: badbank } = await useAsyncData("badbank", () =>
    client.getByUID("bankpage", "badbank"))

const formattedTotal = computed(() => props.amountFinancedSince2016 ?? 'large amounts')

const piggyText =
    `While you’ve been stashing away money for a house or a weekend get-away, ${props.name} has been using your savings to lend to some very questionable fossil fuel friends.\n\nAnd it's not just a little here and there, we’re talking about ${formattedTotal.value || "up to hundreds of billions of US dollars"} in the 7 years since 197 countries agreed to drastically reduce their greenhouse gas emissions in the Paris Agreement.`
</script>