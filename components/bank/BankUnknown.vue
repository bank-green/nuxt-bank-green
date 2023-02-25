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
                        <BankCircle class="max-w-sm" :rating="'ok'" />
                        <SocialSharer class="text-sushi-500" :hashtags="['climatecrisis', 'fossilbanks']" />
                    </div>
                </div>
                <div class="col-span-2 md:col-span-1">
                    <div class="flex justify-center md:block mb-8 w-full"></div>
                    <div class="font-medium md:font-semibold text-gray-800 text-xl md:text-4xl tracking-wider mb-2 md:mb-6">
                        <div><span>Sorry, we don’t know enough about your bank yet.</span></div>
                    </div>
                    <div class="prose sm:prose-lg xl:prose-xl prose-blurb whitespace-pre-wrap">
                        <PrismicRichText :field="bankunknown?.data.description1" />
                    </div>
                </div>
                <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-center">
                    <div class="relative flex-grow md:flex-none md:-right-10 text-center">
                        <ArrowDownBounce class="inline-block mt-8 w-10" />
                    </div>
                </div>
            </div>
            <Swoosh />
        </div>

        <!-- SECTION TWO -->
        <div class="text-gray-800 overflow-hidden py-16">
            <div class="contain">
                <div class="flex flex-col md:flex-row items-center justify-center pt-8 pb-16">
                    <div class="md:w-1/2 max-w-sm">
                        <PrismicRichText class="text-lg md:text-2xl tracking-wide mb-4"
                            :field="bankunknown?.data.description2" />
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
            </div>
        </div>

        <!-- CALL TO ACTION -->
        <div class="bg-blue-100 text-gray-800">
            <Swoosh direction="down" />
            <div class="contain">
                <h2 class="text-center text-gray-800 font-semibold text-lg md:text-2xl tracking-wider mb-4">
                    Join the Money Movement
                </h2>
                <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center md:space-x-8">
                    <div class="lg:w-1/2 md:max-w-sm">
                        <p class="text-lg md:text-2xl tracking-wide mb-4">
                            We can’t say it better than environmentalist Bill McKibben: “Money
                            is the oxygen on which the fire of global warming burns.” But
                            don’t wait for the fire department to turn up – join us!
                        </p>
                    </div>
                    <CheckList class="lg:w-1/2 w-full my-8" :list="checkList" />
                </div>
                <div class="flex flex-row justify-center items-center">
                    <SignupBox title="Sign up to Bank.Green. We'll take the fight to the banks together."
                        tag="bank ok bottom" class="max-w-4xl w-full mt-8" />
                </div>
            </div>

            <div class="flex flex-row items-center justify-center">
                <LottiePlayer path="/anim/money_smoke.json" class="w-full md:max-w-2xl h-42 object-cover object-bottom" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import RenderWhenVisibleInViewPort from "@/components/func/RenderWhenVisibleInViewPort.client.vue";
import Swoosh from "@/components/Swoosh.vue";
import CallToAction from "@/components/CallToAction.vue";
import ArrowDownBounce from "@/components/icons/ArrowDownBounce.vue";
import PiggybankAnimation from "@/components/bank/PiggybankAnimation.vue";
import SignupBox from "../forms/SignupBox.vue";
const props = defineProps({
    details: Object,
});

const { client } = usePrismic();

const { data: bankunknown } = await useAsyncData("unknown", () =>
    client.getByUID("bankpage", "unknownbank")
);

const checkList = [
    "Learn about the issues via our blog updates",
    "Join our campaigns to take action against fossil finance",
    "Discover other ways to divest from fossil fuels",
];
</script>
