<template>
  <div class="page">
    <!-- SECTION ONE -->
    <div
      id="section-one"
      class="bg-gradient-to-b from-sushi-50 to-sushi-100 pt-28 md:mb-16"
    >
      <div
        v-if="isEmbraceBreakup"
        class="flex flex-col gap-10 items-center relative page-fade-in contain max-w-5xl"
      >
        <div
          class="grid grid-cols-2 gap-8 md:gap-10 z-10"
        >
          <slot name="section1" />
        </div>
        <div
          class="w-full flex gap-8 my-6 items-center justify-center bg-blue-100 rounded-2xl px-6 py-8 text-gray-50 text-center font-semibold"
        >
          <div class="flex flex-col text-left max-w-xl">
            <h3
              class="text-gray-800 text-lg md:text-2xl tracking-wider font-bold mb-4"
            >
              Moved your money to this bank?
            </h3>
            <p class="text-gray-700 leading-loose text-lg font-bold">
              Write a breakup letter to your old bank.
            </p>
            <p class="text-gray-700  text-lg font-medium">
              Use our custom template and tell them why you switched to a sustainably conscious bank!
            </p>
          </div>
          <NuxtLink
            to="#section-breakup"
            class="button-green w-auto"
          >
            Send your break-up email
          </NuxtLink>
        </div>
        <div class="relative flex-grow md:flex-none">
          <a href="#section-two">
            <ArrowDownBounce class="inline-block w-10" />
          </a>
        </div>
      </div>
      <div
        v-else
        class="relative page-fade-in contain max-w-5xl grid grid-cols-2 gap-8 md:gap-10 z-10"
      >
        <slot name="section1" />
        <div class="relative flex-grow md:flex-none text-center flex flex-col space-y-4 md:space-y-0 md:flex-row justify-center items-center">
          <ArrowDownBounce class="inline-block mt-8 w-10" />
        </div>
      </div>
      <Swoosh />
    </div>

    <!-- SECTION TWO -->
    <div id="section-two" class="text-gray-800 overflow-hidden py-16">
      <div class="contain">
        <slot name="section2" />
      </div>
    </div>

    <!-- SECTION THREE -->
    <div id="section-three">
      <slot name="section3" />
    </div>

    <div v-if="isEmbraceBreakup" id="section-breakup" class="relative bg-blue-100">
      <Swoosh direction="down" />
      <div
        class="flex flex-col justify-center items-center rounded-xl py-6 md:py-12 px-6 md:px-16 gap-8"
      >
        <h2
          class=" text-gray-800 'w-full text-center font-semibold text-xl md:text-3xl tracking-wider mb-8 md:mb-4 max-w-xl"
        >
          Break Up with Your Bank:<br>
          Say No to Funding Climate Change
        </h2>
        <div
          class="flex flex-col ga md:flex-row items-center justify-center md:space-x-8"
        >
          <div class="md:w-1/2 max-w-md">
            <p class="text-lg md:text-2xl tracking-wide mb-1 md:mb-4 ttext-gray-800 ">
              Let your old bank know you've switching to an institution that aligns with your values and supports a sustainable future.
            </p>
          </div>
          <CheckList
            class="md:w-1/2 my-6 md:text-xl"
            :list="[
              'Combat Climate Change: Switch to a bank that doesn\'t fund fossil fuels to help combat climate change.',
              'Protect the Environment: Choose a bank that prioritizes clean energy and environmental protection.',
              'Voice Your Concerns: Send a clear message to your old bank that their lending practices matter to you.',
            ]"
          />
        </div>
        <div ref="embraceForm" class="relative z-10 max-w-7xl flex flex-col-reverse lg:flex-row items-center bg-sushi-50 rounded-2xl">
          <Embrace />
        </div>
      </div>
      <slot name="footer-image" />
    </div>

    <!-- CALL TO ACTION -->
    <div v-else id="call-to-action" class="bg-blue-100 text-gray-800">
      <Swoosh direction="down" />
      <div class="contain pt-8">
        <slot name="call-to-action">
          <h2
            class="text-center text-gray-800 font-semibold text-lg md:text-2xl tracking-wider mb-4"
          >
            Join the Money Movement
          </h2>
          <div
            class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center md:space-x-8"
          >
            <div class="lg:w-1/2 md:max-w-sm">
              <p class="text-lg md:text-2xl tracking-wide mb-4">
                We can’t say it better than environmentalist Bill McKibben:
                “Money is the oxygen on which the fire of global warming burns.”
                But don’t wait for the fire department to turn up – join us!
              </p>
            </div>
            <CheckList class="lg:w-1/2 w-full my-8" :list="checkList" />
          </div>
          <div class="flex flex-row justify-center items-center">
            <SignupBox
              title="Sign up to Bank.Green. We'll take the fight to the banks together."
              tag="bank ok bottom"
              class="max-w-4xl w-full mt-8"
            />
          </div>
        </slot>
      </div>
      <slot name="footer-image" />
    </div>

    <!-- FOOTER -->
    <div class="bg-primary-dark">
      <div
        class="contain py-4 md:py-8 w-full flex flex-wrap md:flex-nowrap items-center text-gray-100"
      >
        <div class="w-full flex flex-col items-center p-6 md:p-8">
          <h2
            class="w-full text-center font-semibold text-2xl tracking-wider mb-4 text-gray-100"
          >
            How do we derive our results?
          </h2>
          <NuxtLink
            to="/methodology"
            class="button-green inline-block w-max"
          >
            Find out more
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SignupBox from '../forms/SignupBox.vue'
import Swoosh from '@/components/Swoosh.vue'
import ArrowDownBounce from '@/components/icons/ArrowDownBounce.vue'

const checkList = [
  'Learn about the issues via our blog updates',
  'Join our campaigns to take action against fossil finance',
  'Discover other ways to divest from fossil fuels'
]

withDefaults(defineProps<{
  isEmbraceBreakup: boolean;
}>(), {
  isEmbraceBreakup: false
})

</script>
