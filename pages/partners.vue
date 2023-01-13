<template>
    <div class="page">
        <div class="bg-sushi-50">
            <div class="page-fade-in contain pt-28 pb-12">
                <h1 class="text-2xl font-semibold whitespace-pre-line mb-4 md:text-center">Our Partners</h1>
                <h2 class="text-gray-600 md:text-center">Below is a list of our amazing
                    partners, together with whom we are reshaping finance.</h2>
                <div class="max-w-4xl mx-auto py-16 grid grid-cols-6 gap-4 lg:gap-10">
                    <a v-for="partner in partners" :key="partner.name" :href="partner.url"
                        class="block col-span-6 sm:col-span-3 md:col-span-2 w-full h-40 bg-white rounded-3xl px-8 py-6 hover:shadow-xl transition-all duration-500 ease-in-out filter-grayscale hover:filter-none"
                        rel="noopener" target="_blank">
                        <LazyImage :src="`/img/logos/partner/${partner.img}`"
                            imgClass="object-center object-contain w-full h-full" :useImageTag="true"
                            srcset="1x,2x,3x" />
                    </a>
                </div>

                <div class="mx-auto max-w-4xl flex flex-row justify-center items-center pb-12">
                    <SignupBox tag="partners bottom" class="w-full mt-8" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import SignupBox from '@/components/forms/SignupBox.vue'
import LazyImage from '@/components/LazyImage.vue'


const partners = [
    {
        name: 'banktrack',
        url: 'https://banktrack.org',
        img: 'banktrack.org.png',
    },
    {
        name: 'reclaimfinance',
        url: 'https://reclaimfinance.org',
        img: 'reclaimfinance.org.png',
    },
    {
        name: 'xr',
        url: 'https://rebellion.global',
        img: 'rebellion.global.png',
    },
    {
        name: 'xryouth',
        url: 'https://xryouth.org',
        img: 'xryouth.org.png',
    },
    {
        name: 'urgewald',
        url: 'https://urgewald.org',
        img: 'urgewald.org.png',
    },
    {
        name: 'tni',
        url: 'https://tni.org',
        img: 'tni.org.png',
    },
    {
        name: 'portfolio',
        url: 'https://portfolio.earth',
        img: 'portfolio.earth.png',
    },
    {
        name: 'greenpeace',
        url: 'https://www.greenpeace.org.uk',
        img: 'www.greenpeace.org.uk.png',
    },
    {
        name: 'bankonourfuture',
        url: 'https://bankonourfuture.uk',
        img: 'bankonourfuture.uk.png',
    },
    {
        name: 'foecanada',
        url: 'https://foecanada.org',
        img: 'foecanada.org.png',
    },
    {
        name: 'theclimateapp',
        url: 'https://theclimateapp.earth',
        img: 'theclimateapp.earth.png',
    },
    {
        name: 'koalakollektiv',
        url: 'https://koalakollektiv.de',
        img: 'koala.png',
    },
    {
        name: 'earthhero',
        url: 'https://www.earthhero.org/',
        img: 'earthhero.png',
    },
    {
        name: 'climatepledgecollective',
        url: 'https://www.climatepledgecollective.org/',
        img: 'climatepledgecollective.org.png',
    },
    {
        name: 'sunriseboston',
        url: 'https://twitter.com/sunriseboston/',
        img: 'sunriseboston.png',
    },
    {
        name: 'below2c',
        url: 'https://below2c.org/',
        img: 'below2c.png',
    },
    {
        name: 'compendia',
        url: 'https://www.compendia.studio',
        img: 'compendia.png',
    },
    {
        name: 'thecarbonalmanac',
        url: 'https://thecarbonalmanac.org/',
        img: 'thecarbonalmanac.png',
    },
]
useHeadHelper('Our Partners - Bank.Green', 'Our amazing partners at Bank.Green, together with whom we are reshaping finance.')

</script>
