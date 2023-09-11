<template>
  <div
    v-if="showBanner"
    class="sm:text-center relative z-40 -mt-2 pt-3 pr-12 pl-4 pb-2 text-xs sm:text-sm flex-grow font-medium bg-sushi-500 hover:bg-sushi-600 focus:outline-none border border-transparent text-white w-full rounded-b-2xl shadow-green"
  >
    <NuxtLink
      to="/blog/cop-26-success-is-the-only-option"
      class="block"
      @click="close"
    >
      <span>
        <Countdown
          :event-start="new Date(Date.UTC(2021, 9, 31, 0))"
          event-is-past-message="(event already finished, we'll see you at the next one!)"
          :show-tooltip="false"
        />
        to go until the most important climate summit in history. Learn more
        about COP26 in Glasgow
        <span class="underline">on our blog.</span>
      </span>
    </NuxtLink>
    <button
      class="absolute right-2 inset-y-0 text-sushi-100 hover:text-red-100 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sushi-500 h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center mt-2 sm:mt-1.5"
      @click.prevent.stop="close"
    >
      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
const bannerName = "COP26-blog-july";

// if we use this component again, this will have to be adapted with useCookie

// we're not reading storage atm so this doesn't do anything
// function close() {
//     storage.setItem(`bg.hide-announcement-${this.bannerName}`, 'yes')
//     this.showBanner = false
// }
</script>
