<script setup lang="ts">
import RenderWhenVisibleInViewPort from '@/components/func/RenderWhenVisibleInViewPort.client.vue'
import Swoosh from '@/components/Swoosh.vue'
import CallToAction from '@/components/CallToAction.vue'
import ArrowDownBounce from '@/components/icons/ArrowDownBounce.vue'
</script>

<template>
  <div class="page">
    <!-- SECTION ONE -->
    <div
      id="section-one"
      class="bg-gradient-to-b from-sushi-50 to-pistachio-green pt-28 md:mb-16"
    >
      <div
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
      <ClientOnly>
        <RenderWhenVisibleInViewPort
          :options="{ rootMargin: '0px 0px 100% 0px' }"
          class="max-w-sm w-full md:w-1/2"
        >
          <LazyPiggybankAnimation />
        </RenderWhenVisibleInViewPort>
      </ClientOnly>
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
    <div
      id="section-three"
      class="relative bg-arctic-blue"
    >
      <Swoosh direction="down" />
      <img
        class="relative inline-block mb-4"
        src="/img/illustrations/fishes.svg"
        alt=""
      >
      <div class="relative z-10 contain max-w-2xl">
        <slot name="section3" />
      </div>
    </div>

    <!-- CALL TO ACTION -->
    <div
      id="call-to-action"
      class="bg-arctic-blue pb-8 pt-8"
    >
      <div class="contain flex flex-col justify-center items-center">
        <CallToAction
          :light="true"
          :spaced="true"
        />
      </div>
    </div>

    <!-- FOOTER IMAGE -->
    <div class="bg-arctic-blue overflow-hidden w-full pointer-events-none">
      <!-- <div class="-mx-1/4 sm:mx-0 sm:w-full"> -->
      <div
        class="w-full -mt-24 sm:-mt-16 lg:-mt-32 pointer-events-none overflow-hidden"
      >
        <LottiePlayer
          class="-mx-5/6 sm:mx-0 sm:w-full"
          path="/anim/fishes.json"
        />
      </div>
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
