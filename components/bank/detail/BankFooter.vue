<template>
    <div class="bg-primary-dark">
        <div class="contain py-4 md:py-8 w-full flex flex-wrap md:flex-nowrap  items-center text-gray-100 ">
            <div v-if="isBankBadOrWorst" class="w-full flex flex-col items-center p-6 md:p-8">
                <h2 class="w-full text-center font-semibold text-2xl tracking-wider mb-4 text-gray-100">
                    Did we get something wrong?
                </h2>
                <NuxtLink to="/contact" class="button-green inline-block w-max">Contact Us
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
</template>

<script setup>
const props = defineProps({
    details: Object,
})

const isBankBadOrWorst = computed(() => {
    if (
        props.details.rating == 'bad' ||
        props.details.rating == 'worst'
    ) {
        return true
    } else {
        return false
    }
})

</script>
