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
        <div class="relative flex-grow md:flex-none text-center flex flex-col space-y-4 md:space-y-0 md:flex-row justify-center items-center">
          <ArrowDownBounce class="inline-block mt-8 w-10" />
        </div>
      </div>
      <Swoosh />
    </div>

    <!-- SECTION TWO -->
    <div
      id="section-two"
      class="text-gray-800 overflow-hidden py-16"
    >
      <div class="contain">
        <slot name="section2" />
      </div>
    </div>

    <!-- SECTION THREE -->
    <div id="section-three">
      <slot name="section3" />
    </div>
    <!-- CALL TO ACTION -->
    <div
      id="call-to-action"
      class="bg-arctic-blue text-gray-800"
    >
      <Swoosh direction="down" />
      <div class="contain pt-32">
        <SliceZone
          v-if="showLeadGenSlice"
          :slices="prismicSliceData ?? []"
          :components="sliceComps"
        />
        <slot
          v-else
          name="call-to-action"
        >
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
            <CheckList
              class="lg:w-1/2 w-full my-8"
              :list="checkList"
            />
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
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'
import Swoosh from '@/components/Swoosh.vue'
import ArrowDownBounce from '@/components/icons/ArrowDownBounce.vue'

const checkList = [
  'Learn about the issues via our blog updates',
  'Join our campaigns to take action against fossil finance',
  'Discover other ways to divest from fossil fuels',
]

const sliceComps = ref(defineSliceZoneComponents(components))

withDefaults(defineProps<{
  showLeadGenSlice?: boolean
  prismicSliceData?: any
}>(), {
  showLeadGenSlice: false,
})
</script>
