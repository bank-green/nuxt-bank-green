<template>
    <div v-if="$route" @mouseleave="onExitIntent" class="min-h-screen flex flex-col">
        <NuxtLoadingIndicator :color="'#7BB123'" :height="6" />
        <ClientOnly>
            <CookieBanner />
        </ClientOnly>
        <NavBar />
        <NuxtPage />
        <NavFooter />
    </div>
    <Modal v-if="openPledgeModal" v-on:closeModal="openPledgeModal = false" class="z-50 text-white bg-primary-dark">
        <PledgeSignup @success="openPledgeModal = false"
            :title="'Not ready to switch banks today?\nTake our pledge to move your money when you’re ready.'"
            tag="pledge popup" />
    </Modal>
    <Modal v-if="openSwitchSurveyModal" v-on:closeModal="openSwitchSurveyModal = false"
        class="z-50 text-white bg-primary-dark">
        <SwitchSurveyExit @success="openSwitchSurveyModal = false"
            :title="'Did you open a green account as as a result of visiting our website?'" tag="popup" />
    </Modal>
    <NotificationPanel />
</template>

<script setup>

const openPledgeModal = ref(false)
const openSwitchSurveyModal = ref(false)
const exitCount = useCookie('bg.exitCount', { default: () => 0 })

const route = useRoute()

function onExitIntent() {
    if (exitCount.value > 1) return
    if (openPledgeModal.value || openSwitchSurveyModal.value) return
    if (route.path.includes('/sustainable-eco-banks')) return

    if (exitCount.value == 0) {
        openPledgeModal.value = true
        exitCount.value++
        return
    }

    if (exitCount.value == 1) {
        if (route.path.includes('/impact')) return
        openSwitchSurveyModal.value = true
        exitCount.value++
    }
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
