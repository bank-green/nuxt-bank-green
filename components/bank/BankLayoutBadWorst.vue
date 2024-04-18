<template>
  <div class="page">
    <!-- SECTION ONE -->
    <div
      id="section-one"
      class="bg-gradient-to-b from-sushi-50 to-sushi-100 pt-28 md:mb-16"
    >
      <div
        v-if="showEmbraceBreakup"
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
        <div
          class="col-span-2 md:col-span-1 flex flex-col space-y-4 md:space-y-0 gap-12 justify-between items-center"
        >
          <div
            class="flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-between items-center mt-8"
          >
            <NuxtLink
              to="/sustainable-eco-banks"
              class="button-green w-auto"
            >
              Move Your Money
            </NuxtLink>
            <div class="text-xs text-gray-500 mx-4 uppercase">
              Or
            </div>
            <NuxtLink
              to="/pledge"
              class="underline"
            >
              Pledge to Move it
            </NuxtLink>
          </div>
          <div class="relative flex-grow md:flex-none">
            <a href="#section-two">
              <ArrowDownBounce class="inline-block w-10" />
            </a>
          </div>
        </div>
      </div>
      <Swoosh />
    </div>

    <!-- SECTION TWO -->
    <div
      id="section-two"
      class="contain flex flex-col-reverse md:flex-row justify-center items-center py-8 space-y-12 md:space-y-0 md:space-x-24"
    >
      <RenderWhenVisibleInViewPort
        :options="{ rootMargin: '0px 0px 100% 0px' }"
        class="max-w-sm w-full md:w-1/2"
      >
        <LazyPiggybankAnimation />
      </RenderWhenVisibleInViewPort>
      <div class="md:w-1/2">
        <slot name="section2" />
        <div
          class="mt-8 flex flex-col md:flex-row gap-12 md:gap-0 items-center"
        >
          <div
            class="flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-between items-center w-auto"
          >
            <NuxtLink
              to="/sustainable-eco-banks"
              class="button-green w-auto"
            >
              Move Your Money
            </NuxtLink>
            <div class="text-xs text-gray-500 mx-4 uppercase">
              Or
            </div>
            <NuxtLink
              to="/pledge"
              class="underline"
            >
              Pledge to Move it
            </NuxtLink>
          </div>
          <div class="flex md:hidden flex-grow justify-center">
            <a href="#section-three">
              <ArrowDownBounce class="w-10" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION THREE -->
    <div id="section-three" class="relative bg-blue-100">
      <Swoosh direction="down" />
      <img
        class="relative inline-block mb-4"
        src="/img/illustrations/fishes.svg"
        alt=""
      >
      <div class="relative z-10 contain max-w-2xl">
        <h3
          class="text-center text-blue-900 text-lg md:text-2xl tracking-wider font-semibold mb-4"
        >
          Your bank is ignoring the Paris Agreement.
        </h3>
        <p class="text-blue-900 leading-loose text-lg">
          The Paris Agreement set the goal to stay under 1.5°C of warming for
          very good reasons. According to the Intergovernmental Panel on Climate
          Change, an increase of just a couple of degrees more could lead to
          "substantial species extinction, large risks to global and regional
          food security", and an inability to work outside — or even live — in
          some areas of the world. Our world will become unrecognizable as ocean
          dead zones, floods, and extreme weather fuel social and economic
          disruption.
        </p>
      </div>
      <div
        class="w-full -mt-24 sm:-mt-16 lg:-mt-32 pointer-events-none overflow-hidden"
      >
        <LottiePlayer
          class="-mx-5/6 sm:mx-0 sm:w-full"
          path="/anim/fishes.json"
        />
      </div>
    </div>

    <!-- CALL TO ACTION -->
    <div id="call-to-action" :class="`${showEmbraceBreakup ? 'bg-gray-50': 'bg-blue-100'} pb-8 pt-8`">
      <div class="contain flex flex-col justify-center items-center">
        <CallToAction :light="true" :spaced="true" />
      </div>
    </div>
  </div>

  <div v-if="showEmbraceBreakup" id="section-breakup" class="relative bg-blue-100">
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
  </div>
  <!-- FOOTER IMAGE -->
  <div class="bg-blue-100 overflow-hidden w-full pointer-events-none">
    <div class="-mx-1/4 sm:mx-0 sm:w-full">
      <img class="w-full" src="/img/illustrations/landscape.svg" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import RenderWhenVisibleInViewPort from '@/components/func/RenderWhenVisibleInViewPort.client.vue'
import Swoosh from '@/components/Swoosh.vue'
import CallToAction from '@/components/CallToAction.vue'
import ArrowDownBounce from '@/components/icons/ArrowDownBounce.vue'

withDefaults(defineProps<{
  showEmbraceBreakup: boolean;
}>(), {
  showEmbraceBreakup: false
})

</script>
