<template>
  <div
    v-if="showBanner"
    class="py-2 sm:px-0 bg-gray-900 text-gray-100 text-xs fixed bottom-0 inset-x-0 z-50"
  >
    <div class="contain mx-auto">
      <div class="sm:flex justify-between items-center">
        <div class="text-gray-200 text-xs flex-1 mr-4">
          We use cookies to improve the site experience.
        </div>
        <div class="mt-1 sm:mt-0 flex items-center justify-between">
          <NuxtLink
            to="/privacy"
            class="cursor-pointer text-sushi-200 hover:text-sushi-100 font-bold no-underline mr-4"
          >
            Privacy policy
          </NuxtLink>
          <div
            class="bg-red-500 hover:bg-red-400 rounded text-white cursor-pointer px-4 no-underline py-2 mr-2"
            @click="noCookies"
          >
            Decline cookies
          </div>

          <div
            class="bg-sushi-500 hover:bg-sushi-400 rounded text-white cursor-pointer px-4 no-underline py-2"
            @click="yesCookies"
          >
            Allow cookies
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGtm } from '@gtm-support/vue-gtm'

const showBanner = useCookie('bg.showbanner', { default: () => true })
const allowCookies = useCookie('bg.allowcookies', { default: () => false })
function yesCookies () {
  showBanner.value = false
  allowCookies.value = true
  const gtm = useGtm()
  gtm.enable(true)
}

function noCookies () {
  showBanner.value = false
  allowCookies.value = false
}
</script>
