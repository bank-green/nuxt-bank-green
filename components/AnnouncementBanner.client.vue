<script setup>
const showBanner = useCookie('bg.showAnnouncementSurveySeptember2024', {
  default: () => true,
})

function close() {
  showBanner.value = false
}
</script>

<template>
  <div
    v-if="showBanner"
    class="sm:text-center relative z-40 -mt-2 pt-3 pr-12 pl-4 pb-2 text-xs sm:text-sm flex-grow font-medium bg-sushi-500 hover:bg-sushi-600 focus:outline-none border border-transparent text-white w-full rounded-b-2xl shadow-green"
  >
    <NuxtLink
      to="https://form.typeform.com/to/xnqg3l7X"
      class="block"
      target="_blank"
      @click="close"
    >
      <span>
        Are You A Business Owner? Receive 1 Year Of Free Accreditation For
        Banking Green By Taking
        <span class="underline">Our 5-Minute Survey.</span>
      </span>
    </NuxtLink>
    <button
      class="absolute right-2 inset-y-0 text-pistachio-green hover:text-red-100 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sushi-500 h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center mt-2 sm:mt-1.5"
      @click.prevent.stop="close"
    >
      <svg
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>
