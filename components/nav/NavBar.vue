<template>
    <div v-clickaway="closePopup">
        <nav class="fixed z-50 top-0 p-4 contain inset-x-0">
            <div class="relative z-50 bg-primary-dark rounded-xl flex items-center justify-between pr-4">
                <NuxtLink to="/" class="py-4 px-6" @click="isOpen = false">
                    <img class="mt-1 h-5" src="/img/logo.svg" alt="Bank.Green" />
                </NuxtLink>

                <button type="button"
                    class="lg:hidden bg-sushi-900 bg-opacity-10 rounded-md p-2 inline-flex items-center justify-center text-white hover:text-sushi-400 hover:bg-sushi-500 hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sushi-500"
                    @click.prevent.stop="isOpen = !isOpen">
                    <template v-if="!isOpen">
                        <span class="sr-only">Open menu</span>
                        <svg class="h-4 w-4" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5H21" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M1 8.5H21" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M1 15.5H21" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </template>
                    <template v-else>
                        <span class="sr-only">Close menu</span>
                        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </template>
                </button>

                <div class="hidden lg:block py-2 space-x-2">
                    <NuxtLink v-for="link in headerLinks" :key="link.href" :to="link.href" activeClass="bg-primary-light"
                        inactiveClass="hover:bg-primary-light" class="px-4 py-2 text-base text-white font-medium rounded-xl"
                        @click="isOpen = false">{{
                            link.short_title || link.title
                        }}</NuxtLink>
                    <NuxtLink to="/impact" activeClass="bg-sushi-600"
                        class="inline w-auto px-4 py-2 font-medium bg-sushi-500 hover:bg-sushi-600 text-white text-center w-full rounded-xl shadow-green capitalize">
                        Switch survey
                    </NuxtLink>
                </div>
            </div>
        </nav>

        <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="duration-100 ease-in"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
            <div v-if="isOpen"
                class="fixed z-50 top-0 mt-14 inset-x-0 contain p-4 transition transform-gpu origin-top-center">
                <NuxtLink v-for="link in headerLinks" :key="link.href" :to="link.href" activeClass="bg-primary-light"
                    inactiveClass="hover:bg-primary-light"
                    class="block py-2 px-6 md:py-4 md:px-6 mt-0.5 md:mt-1 text-white text-sm font-medium bg-primary-dark rounded-xl"
                    @click="isOpen = false">{{ link.title }}</NuxtLink>
                <NuxtLink to="/impact"
                    class="block w-full text-left py-2 px-6 md:py-4 md:px-6 mt-0.5 md:mt-1 text-sm font-medium text-white rounded-xl bg-sushi-500 hover:bg-sushi-600"
                    @click="isOpen = false">
                    Switch Survey
                </NuxtLink>
            </div>
        </transition>
    </div>
</template>

<script setup>
import links from './links'

const isOpen = ref(false)
const headerLinks = computed(() => {
    return links({ isHeader: true })
})

function closePopup() {
    isOpen.value = false
}
</script>
