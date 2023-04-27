<template>
<div class="page-fade-in contain">
    <div class="relative bg-white rounded-xl shadow-soft border">
        <div 
            class="absolute -top-4 -right-4">
            <img class="h-20 w-auto" src="/img/logos/bankgreen-logo.png" alt="Bank Green" />
        </div>
        <div class="grid grid-cols-2 gap-8 md:gap-10 py-12 px-8">
            <EcoBankHeadline 
                :name="name" 
                :subtitle="subtitle" 
                :website="website"
                :inheritBrandRating="inheritBrandRating" 
            />
            <div class="relative col-span-2 md:col-span-1 md:row-span-2 flex flex-row justify-center items-center">
                <div class="flex flex-col items-center justify-start w-full">
                    <BankCircle class="max-w-sm" :rating="rating" />
                    <SocialSharer class="text-sushi-500" :hashtags="['climatecrisis', 'fossilbanks']" />
                </div>
            </div>
            <div class="col-span-2 md:col-span-1">
                <div class="font-medium md:font-semibold text-gray-800 text-xl md:text-4xl tracking-wider mb-2 md:mb-6">
                    {{ `Our take on ${name}` }}
                </div>
                <div class="text-lg md:text-xl text-gray-500">
                    <span v-if="ourTake" class="">{{
                        ourTake
                    }}</span>
                    <span v-else-if="rating === 'ok'">This bank is ok</span>
                    <span v-else-if="rating === 'great'">This bank is great</span>
                </div>
                <div class="flex justify-start items-center gap-6 mt-4">
                    <img class="h-16 w-auto" 
                        src="/img/certification/fossil-free-certified.png"
                        alt="Fossil Free Certification" 
                    />
                    <img class="w-auto" 
                        src="/img/certification/certified-b-corporation.png"
                        alt="Certified B Corporation" 
                    />
                    <img class="h-12 w-auto" 
                        src="/img/certification/alliance/bankers-for-netzero.png"
                        alt="Banker for NetZero" 
                    />
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
defineProps<{
    website: string,
    name: string,
    inheritBrandRating?: {
        tag: string,
        name: string
    },
    subtitle: string,
    rating: string,
    ourTake: string
}>()
</script>