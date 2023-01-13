<template>
    <div v-if="$route" @mouseleave="onExitIntent" class="min-h-screen flex flex-col">
        <NuxtLoadingIndicator :color="'#7BB123'" :height="6" />
        <CookieBanner />
        <NavBar />
        <NuxtPage />
        <NavFooter />
    </div>
    <Modal v-if="openModal" v-on:closeModal="openModal = false" class="z-50 text-white bg-primary-dark">
        <PledgeSignup @success="openModal = false"
            :title="'Not ready to switch banks today?\nTake our pledge to move your money when you’re ready.'"
            tag="pledge popup" />
    </Modal>
    <NotificationPanel />
</template>

<script setup>
import PledgeSignup from '@/components/forms/PledgeSignup.vue'

const openModal = ref(false)
const hasUserSeenExitIntentModal = useCookie('bg.seenExitIntent', { default: () => false })

const route = useRoute()

function onExitIntent() {
    if (hasUserSeenExitIntentModal.value) return
    if (openModal.value) return
    if (route.path.includes('/sustainable-eco-banks')) return
    openModal.value = true
    hasUserSeenExitIntentModal.value = true
}
</script>
<style>
body {
    background: #f9fafb;
    overflow-y: scroll;
    margin: 0;
}

.loading-app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.loading-app svg {
    animation: ring 2s linear infinite;
}

@keyframes ring {
    0% {
        transform: rotate(0);
        animation-timing-function: cubic-bezier(0.55,
                0.055,
                0.675,
                0.19);
    }

    50% {
        transform: rotate(900deg);
        animation-timing-function: cubic-bezier(0.215,
                0.61,
                0.355,
                1);
    }

    100% {
        transform: rotate(1800deg);
    }
}
</style>
