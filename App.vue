<template>
  <div
    v-if="$route"
    class="min-h-screen flex flex-col"
    @mouseleave="onExitIntent"
  >
    <!-- Google Tag Manager (noscript) -->
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-KMGKCN3"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
        title="Google Tag Manager"
      ></iframe>
    </noscript>
    <!-- End Google Tag Manager (noscript) -->
    <NuxtLoadingIndicator :color="'#7BB123'" :height="6" />
    <NavBar />
    <NuxtPage />
    <NavFooter />
  </div>
  <SwitchSurveyExit
    v-model="openSwitchSurveyModal"
    tag="popup"
    @success="openSwitchSurveyModal = false"
  />
  <NotificationPanel />
</template>

<script setup>
const openSwitchSurveyModal = ref(false)
const hasUserSeenExitIntentModal = useCookie('bg.seenExitIntent', {
  default: () => false,
})
const EXIT_MODAL_DELAY = 1000
let exitTimer = null

const route = useRoute()

function onExitIntent() {
  if (hasUserSeenExitIntentModal.value) return
  if (openSwitchSurveyModal.value) return
  if (route.path.includes('/impact')) return
  openSwitchSurveyModal.value = true
  hasUserSeenExitIntentModal.value = true

  if (exitTimer !== null) {
    clearTimeout(exitTimer)
  }

  exitTimer = window.setTimeout(() => {
    openSwitchSurveyModal.value = true
    hasUserSeenExitIntentModal.value = true
    exitTimer = null
  }, EXIT_MODAL_DELAY)
}

onBeforeUnmount(() => {
  console.log('BEFORE mount')

  if (exitTimer !== null) {
    clearTimeout(exitTimer)
    exitTimer = null
  }
})

// <!-- Google Tag Manager -->
useHead({
  script: [
    {
      hid: 'gtm-script',
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-KMGKCN3');`,
      type: 'text/javascript',
    },
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'gtm-script': ['innerHTML'],
  },
})
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
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  100% {
    transform: rotate(1800deg);
  }
}
</style>
