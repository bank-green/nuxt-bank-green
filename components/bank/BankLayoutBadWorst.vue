<template>
    <div class="page">
        <!-- SECTION ONE -->
        <div class="bg-gradient-to-b from-sushi-50 to-sushi-100 pt-28 md:mb-16">
            <div class="relative page-fade-in contain max-w-5xl grid grid-cols-2 gap-8 md:gap-10 z-10">
                <slot name="section1"></slot>
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
                <slot name="section2">

                </slot>
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

        <!-- FOOTER IMAGE -->
        <div class="bg-blue-100 overflow-hidden w-full pointer-events-none">
            <div class="-mx-1/4 sm:mx-0 sm:w-full">
                <img class="w-full" src="/img/illustrations/landscape.svg" alt="" />
            </div>
        </div>

        <!-- FOOTER -->
        <div class="bg-primary-dark">
            <div class="contain py-4 md:py-8 w-full flex flex-wrap md:flex-nowrap  items-center text-gray-100 ">
                <div class="w-full flex flex-col items-center p-6 md:p-8">
                    <h2 class="w-full text-center font-semibold text-2xl tracking-wider mb-4 text-gray-100">
                        Did we get something wrong?
                    </h2>
                    <NuxtLink :to="`https://data.bank.green/update/${bankTag}` " target="_blank" class="button-green inline-block w-max">
                        Help us fix it
                    </NuxtLink>
                </div>

                <div class="w-full flex flex-col items-center p-6 md:p-8">
                    <h2 class="w-full text-center font-semibold text-2xl tracking-wider mb-4 text-gray-100">
                        How do we derive our results?
                    </h2>
                    <NuxtLink :to="{
                        path: '/faq',
                        hash: '#how-do-you-know-what-my-bank-funds',
                    }" class="button-green inline-block w-max">Find out more
                    </NuxtLink>
                </div>
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

const router = useRouter();
const bankTag = router.currentRoute.value.params.bankTag;
</script>