<template>
    <div class="page">
        <div class="contain py-16 lg:pt-6 lg:pb-6 sm:text-center">
            <template v-if="details.fromTheWebsite">
                <h2 class="font-semibold text-2xl text-gray-800 mb-8 sm:text-4xl sm:mb-4">
                    {{ `From the website of ${details.name}` }}
                </h2>
                <p class="whitespace-pre-line text-gray-500 sm:text-xl max-w-xl mx-auto">
                    {{ details.fromTheWebsite }}
                </p>
            </template>

            <EthicalFeatures :details="details" class="mt-16 max-w-xl mx-auto text-left" />
        </div>

        <Swoosh color="text-blue-100" direction="up" />
        <div class="bg-blue-100 pt-16">
            <div class="contain">
                <div class="max-w-xl mx-auto bg-primary-dark text-gray-100 rounded-xl shadow-xl p-8">
                    <div class="text-lg lg:text-xl font-medium mb-8 sm:px-16 lg:px-0">
                        {{ `Counting bank switches is vitally important to us as a movement. Please use this link when
                        signing up for ${details.name}.`
                        }}
                    </div>
                    <NuxtLink tohref="details.website" target="_blank" class="button-green inline-block mx-auto">{{
                    `Visit ${details.name}`
                    }}</NuxtLink>
                    <NuxtLink to="/pledge"
                        class="block text-gray-200 hover:underline cursor-pointer font-bold mt-4 text-center">
                        Pledge to Switch Later
                    </NuxtLink>
                    <div class="text-sm lg:text-md font-medium mt-8 sm:px-16 lg:px-0">
                        Have you opened an account with {{ details.name }} since visiting Bank.Green? <NuxtLink
                            class="text-sushi-300 hover:text-sushi-200"
                            to="https://s3c0er2g1pf.typeform.com/to/rwxTfN15">Please let us know!</NuxtLink>
                    </div>
                </div>
            </div>
            <div v-if="details.rating === 'great'" class="flex items-end justify-end pointer-events-none">
                <div class="w-11/12">
                    <LottiePlayer path="/anim/wind_2_without_bg.json" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import EthicalFeatures from '@/components/bank/detail/features/EthicalFeatures'
import Swoosh from '@/components/Swoosh.vue'

defineProps({
    details: Object,
})
</script>
