<template>
    <BankLayoutGreatOkUnknown>
        <template #section1>
            <BankHeadline :name="name" :website="website" :subtitle="subtitle" :inheritBrandRating="inheritBrandRating" />
            <div
                class="relative col-span-2 md:col-span-1 md:row-span-2 flex flex-row justify-center md:justify-start md:mt-8">
                <div class="flex flex-col items-center justify-start w-full">
                    <BankCircle class="max-w-sm" :rating="'ok'" />
                    <SocialSharer class="text-sushi-500" :hashtags="['climatecrisis', 'fossilbanks']" />
                </div>
            </div>
            <div class="col-span-2 md:col-span-1">
                <div class="flex justify-center md:block mb-8 w-full"></div>
                <div class="font-medium md:font-semibold text-gray-800 text-xl md:text-4xl tracking-wider mb-2 md:mb-6">
                    <div v-if="header" v-html="header"></div>
                    <PrismicRichText v-else :field="bankok?.data.headline" />
                </div>
                <div class="prose sm:prose-lg xl:prose-xl prose-blurb whitespace-pre-wrap">
                    <div v-if="summary" v-html="summary"></div>
                    <PrismicRichText v-else :field="bankok?.data.description1" />
                </div>
            </div>
            <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-center items-center">
                <div class="relative flex-grow md:flex-none text-center">
                    <ArrowDownBounce class="inline-block mt-8 w-10" />
                </div>
            </div>
        </template>

        <template #section2>
            <div class="flex flex-col md:flex-row items-center justify-center pt-8 pb-16">
                <div class="md:w-1/2 max-w-sm">
                    <PrismicRichText class="text-lg md:text-2xl tracking-wide mb-4" :field="bankok?.data.description2" />
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
                <img class="md:order-first md:w-1/2 -mx-24 sm:mx-0 lg:-ml-32 md:mr-16" src="/img/illustrations/dig.svg"
                    alt="" />
            </div>
        </template>

        <template #footer-image>
            <div class="flex flex-row items-center justify-center">
                <LottiePlayer path="/anim/money_smoke.json" class="w-full md:max-w-2xl h-42 object-cover object-bottom" />
            </div>
        </template>
    </BankLayoutGreatOkUnknown>
</template>






<script setup lang="ts">
import ArrowDownBounce from "@/components/icons/ArrowDownBounce.vue";
const props = defineProps<{
    name: string,
    website: string,
    subtitle: string,
    inheritBrandRating: {
        tag: string,
        name: string
    },
    header: string,
    summary: string
}>()

const { client } = usePrismic();

const { data: bankok } = await useAsyncData("okbank", () =>
    client.getByUID("bankpage", "okbank")
);
</script>
