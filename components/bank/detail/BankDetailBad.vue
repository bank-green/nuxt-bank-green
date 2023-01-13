<template>
    <div
        class="contain flex flex-col-reverse md:flex-row justify-center items-center py-8 space-y-12 md:space-y-0 md:space-x-24">
        <RenderWhenVisibleInViewPort :options="{ rootMargin: '0px 0px 100% 0px' }" class="max-w-sm w-full md:w-1/2">
            <PiggybankAnimation />
        </RenderWhenVisibleInViewPort>
        <div class="md:w-1/2">
            <div v-if="details.details" class="text-lg md:text-2xl whitespace-pre-line text-gray-900"
                v-html="details.details"></div>
            <p v-else class="text-lg md:text-2xl whitespace-pre-line text-gray-900" v-text="piggyText"></p>
            <div class="mt-8 flex items-center">
                <div v-if="
                    details.rating === 'worst' || details.rating === 'bad'
                " class="flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-between items-center w-auto">
                    <NuxtLink to="/sustainable-eco-banks" class="button-green w-auto">Move Your Money
                    </NuxtLink>
                    <div class="text-xs text-gray-500 mx-4 uppercase">
                        Or
                    </div>
                    <NuxtLink to="/pledge" class="underline">Pledge to Move it
                    </NuxtLink>
                </div>
                <NuxtLink v-else to="/pledge" class="button-green inline-block w-auto">Pledge to Move Your Money
                </NuxtLink>
                <div class="flex md:hidden flex-grow justify-center">
                    <ArrowDownBounce class="inline-block w-10" />
                </div>
            </div>
        </div>
    </div>
    <div class="hidden md:flex justify-center transform md:-translate-y-10 lg:-translate-y-32">
        <ArrowDownBounce class="inline-block w-10" />
    </div>
    <div class="relative bg-blue-100">
        <Swoosh direction="down" />
        <img class="relative inline-block mb-4" src="/img/illustrations/fishes.svg" alt="" />
        <div class="relative z-10 contain max-w-2xl">
            <h3 class="text-center text-blue-900 text-lg md:text-2xl tracking-wider font-semibold mb-4">
                <template>
                    Your bank is ignoring the Paris Agreement.
                </template>
            </h3>
            <p class="text-blue-900 leading-loose text-lg">
                The Paris Agreement set the goal to stay under 1.5°C of warming for very good reasons. According to the
                Intergovernmental Panel on Climate Change, an increase of just a couple of degrees more could lead to
                \"substantial species extinction, large risks to global and regional food security\", and an inability
                to work outside — or even live — in some areas of the world. Our world will become unrecognizable as
                ocean dead zones, floods, and extreme weather fuel social and economic disruption.
            </p>
        </div>
        <div class="w-full -mt-24 sm:-mt-16 lg:-mt-32 pointer-events-none overflow-hidden">
            <LottiePlayer class="-mx-5/6 sm:mx-0 sm:w-full" path="/anim/fishes.json" />
        </div>
    </div>
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
</template>

<script setup>

import RenderWhenVisibleInViewPort from '@/components/func/RenderWhenVisibleInViewPort.client.vue'
import Swoosh from '@/components/Swoosh.vue'
import CallToAction from '@/components/CallToAction.vue'
import ArrowDownBounce from '@/components/icons/ArrowDownBounce.vue'
import PiggybankAnimation from '../PiggybankAnimation.vue'


const props = defineProps({
    details: Object,
})

const formattedTotal = computed(() => props?.details.amountFinancedSince2016 ?? 'large amounts')

const piggyText =
    `While you’ve been stashing away money for a car or a weekend get-away, ${props?.details.name} has been using your savings to lend to some very questionable fossil fuel friends.\n\nAnd it's not just a little here and there, we’re talking about ${formattedTotal.value || "a lot of money"} in the 6 years since 197 countries agreed to drastically reduce their greenhouse gas emissions in the Paris Agreement.`

</script>
