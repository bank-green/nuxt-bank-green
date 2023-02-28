<template>
    <NuxtLink :to="item ? `/sustainable-eco-banks/${item.tag}` : ''"
        class="block mb-6 rounded-2xl shadow-sm bg-white transition duration-150 ease-in-out hover:bg-gray-50 border border-transparent hover:border-sushi-500">
        <div class="py-3 pl-4 pr-5 border-b border-gray-200 flex items-center justify-between">
            <transition enter-active-class="duration-200 transform-gpu origin-top ease-out"
                enter-from-class="opacity-0 scale-y-95" enter-to-class="opacity-100 scale-y-100"
                leave-active-class="duration-100 transform-gpu origin-top ease-in"
                leave-from-class="opacity-100 scale-y-100" leave-to-class="opacity-0 scale-y-95" mode="out-in">
                <div v-if="item" class="flex items-center truncate">
                    <div class="relative w-12 h-12">
                        <ClearbitLogo v-if="item.website" :url="item.website" :size="24"
                            imgClass="absolute inset-0 z-20 bg-contain bg-no-repeat bg-center bg-white" />
                        <BankIcon class="absolute inset-0 z-10" />
                    </div>
                    <div class="ml-3 flex-1 flex items-center font-semibold text-gray-800 truncate">
                        <span>
                            {{ item.name }}
                        </span>

                        <img v-if="item.fossilFreeAlliance" class="w-12 ml-6" src="/img/certification/certified.png"
                            alt="Fossil Free Certification" />
                    </div>
                </div>

                <div v-else class="w-full flex items-center truncate">
                    <div class="w-12 h-12 bg-gray-100 rounded-xl animate-pulse"></div>
                    <div class="ml-3 flex-1 font-semibold text-gray-200 block truncate">
                        loading...
                    </div>
                </div>
            </transition>

            <svg class="text-sushi-500" width="7" height="13" viewBox="0 0 7 13" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11.5L6 6.5L1 1.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </div>

        <transition enter-active-class="duration-200 transform-gpu origin-top ease-out"
            enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-100 transform-gpu origin-top ease-in" leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95">
            <div v-if="Object.keys(features).length" class="py-4 px-7 flex flex-wrap">
                <FeaturesList :features="features" />
            </div>
        </transition>
    </NuxtLink>
</template>

<script>
import ClearbitLogo from '@/components/icons/ClearbitLogo'
import BankIcon from '@/components/forms/banks/BankIcon'
import FeaturesList from './features/FeaturesList.vue'

export default {
    props: {
        item: Object,
        isNoCredit: Boolean,
    },
    components: {
        ClearbitLogo,
        BankIcon,
        FeaturesList,
    },

    computed: {
        features() {
            // filter our credit card
            const features = getFeatures(this.item)
            const allFeatures = {}
            for (const [featKey, featValue] of Object.entries(features)) {
                if (
                    (this.isNoCredit && featKey === 'Credit Card') ||
                    !featValue.isChecked
                ) {
                    continue
                }
                allFeatures[featKey] = features[featKey]
            }
            return allFeatures
        },
    },
}
</script>
