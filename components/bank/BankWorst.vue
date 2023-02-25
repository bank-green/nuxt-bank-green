<template>
    <div class="page">
        <!-- SECTION ONE -->
        <div class="bg-gradient-to-b from-sushi-50 to-sushi-100 pt-28 md:mb-16">
            <div class="relative page-fade-in contain max-w-5xl grid grid-cols-2 gap-8 md:gap-10 z-10">
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
                        <div v-else><span>Your money is being used to fund the climate crisis at an alarming rate.</span>
                        </div>
                    </div>
                    <div class="prose sm:prose-lg xl:prose-xl prose-blurb whitespace-pre-wrap">
                        <div v-if="details?.summary" v-html="details.summary"></div>
                        <div v-else>Your bank is one of the 60 biggest funders of fossil fuels in the world\*. In the 6
                            years since the Paris Agreement, the banks in this category have funneled $4.6 trillion into
                            coal, oil, and gas, rapidly accelerating the climate crisis.
                        </div>
                        <a v-if="details?.data_sources?.includes('bimpact')"
                            href="http://data.world/blab/b-corp-impact-data" class="block"><span class="text-xs"
                                v-text="'CC BY-SA data partially from B-Lab'"></span></a>
                    </div>
                </div>
                <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-center">
                    <div class="flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-between items-center mt-8">
                        <NuxtLink to="/sustainable-eco-banks" class="button-green w-auto">Move Your Money
                        </NuxtLink>
                        <div class="text-xs text-gray-500 mx-4 uppercase">
                            Or
                        </div>
                        <NuxtLink to="/pledge" class="underline">Pledge to Move it
                        </NuxtLink>
                    </div>
                    <div class="relative flex-grow md:flex-none md:-right-10 text-center">
                        <ArrowDownBounce class="inline-block mt-8 w-10" />
                    </div>
                </div>
            </div>
            <Swoosh />
        </div>

        <!-- SECTION TWO -->
        <div
            class="contain flex flex-col-reverse md:flex-row justify-center items-center py-8 space-y-12 md:space-y-0 md:space-x-24">
            <RenderWhenVisibleInViewPort :options="{ rootMargin: '0px 0px 100% 0px' }" class="max-w-sm w-full md:w-1/2">
                <PiggybankAnimation />
            </RenderWhenVisibleInViewPort>
            <div class="md:w-1/2">
                <div v-if="details?.details" class="text-lg md:text-2xl whitespace-pre-line text-gray-900"
                    v-html="details?.details"></div>
                <p v-else class="text-lg md:text-2xl whitespace-pre-line text-gray-900" v-text="piggyText"></p>
                <div class="mt-8 flex items-center">
                    <div class="flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-between items-center w-auto">
                        <NuxtLink to="/sustainable-eco-banks" class="button-green w-auto">Move Your Money
                        </NuxtLink>
                        <div class="text-xs text-gray-500 mx-4 uppercase">
                            Or
                        </div>
                        <NuxtLink to="/pledge" class="underline">Pledge to Move it
                        </NuxtLink>
                    </div>
                    <div class="flex md:hidden flex-grow justify-center">
                        <ArrowDownBounce class="inline-block w-10" />
                    </div>
                </div>
            </div>
        </div>
        <div class="hidden md:flex justify-center transform md:-translate-y-10 lg:-translate-y-32">
            <ArrowDownBounce class="inline-block w-10" />
        </div>

        <!-- SECTION THREE -->
        <div class="relative bg-blue-100">
            <Swoosh direction="down" />
            <img class="relative inline-block mb-4" src="/img/illustrations/fishes.svg" alt="" />
            <div class="relative z-10 contain max-w-2xl">
                <h3 class="text-center text-blue-900 text-lg md:text-2xl tracking-wider font-semibold mb-4">
                    Your bank is ignoring the Paris Agreement.
                </h3>
                <p class="text-blue-900 leading-loose text-lg">
                    The Paris Agreement set the goal to stay under 1.5°C of warming for very good reasons. According to the
                    Intergovernmental Panel on Climate Change, an increase of just a couple of degrees more could lead to
                    "substantial species extinction, large risks to global and regional food security", and an inability
                    to work outside — or even live — in some areas of the world. Our world will become unrecognizable as
                    ocean dead zones, floods, and extreme weather fuel social and economic disruption.
                </p>
            </div>
            <div class="w-full -mt-24 sm:-mt-16 lg:-mt-32 pointer-events-none overflow-hidden">
                <LottiePlayer class="-mx-5/6 sm:mx-0 sm:w-full" path="/anim/fishes.json" />
            </div>
        </div>

        <!-- CALL TO ACTION -->
        <div class="bg-blue-100 pb-8 pt-8">
            <div class="contain flex flex-col justify-center items-center">
                <CallToAction :light="true" :spaced="true" />
            </div>
        </div>
        <div class="bg-blue-100 overflow-hidden w-full pointer-events-none">
            <div class="-mx-1/4 sm:mx-0 sm:w-full">
                <img class="w-full" src="/img/illustrations/landscape.svg" alt="" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import RenderWhenVisibleInViewPort from '@/components/func/RenderWhenVisibleInViewPort.client.vue'
import Swoosh from '@/components/Swoosh.vue'
import CallToAction from '@/components/CallToAction.vue'
import ArrowDownBounce from '@/components/icons/ArrowDownBounce.vue'
import PiggybankAnimation from '@/components/bank/PiggybankAnimation.vue'
const props = defineProps({
    details: Object
})

const formattedTotal = computed(() => props?.details?.amountFinancedSince2016 ?? 'large amounts')

const piggyText =
    `While you’ve been stashing away money for a car or a weekend get-away, ${props?.details?.name} has been using your savings to lend to some very questionable fossil fuel friends.\n\nAnd it's not just a little here and there, we’re talking about ${formattedTotal.value || "a lot of money"} in the 6 years since 197 countries agreed to drastically reduce their greenhouse gas emissions in the Paris Agreement.`
</script>