<!-- TODO: in claudia/groot-300-update-card-views-mobile-and-desktop -->
<template>
  <NuxtLink
    :to="item ? `/sustainable-eco-banks/${item.tag}` : ''"
    class="block mb-6 rounded-2xl shadow-sm bg-white transition duration-150 ease-in-out hover:bg-gray-50 border border-transparent hover:border-sushi-500"
  >
    <div
      class="py-3 pl-4 pr-5 border-b border-gray-200 flex items-center justify-between"
    >
      <transition
        enter-active-class="duration-200 transform-gpu origin-top ease-out"
        enter-from-class="opacity-0 scale-y-95"
        enter-to-class="opacity-100 scale-y-100"
        leave-active-class="duration-100 transform-gpu origin-top ease-in"
        leave-from-class="opacity-100 scale-y-100"
        leave-to-class="opacity-0 scale-y-95"
        mode="out-in"
      >
        <div
          v-if="item"
          class="flex items-center truncate"
        >
          <div class="relative w-12 h-12">
            <ClearbitLogo
              :url="item.website"
              :size="48"
              img-class="absolute inset-0 z-20"
            />
          </div>
          <div
            class="ml-3 flex-1 flex items-center font-semibold text-gray-800 truncate"
          >
            <span>
              {{ item.name }}
            </span>
            <img
              v-if="item.fossilFreeAlliance"
              class="w-10 ml-4"
              src="/img/certification/fossil-free-certified.png"
              alt="Fossil Free Certification"
            >
            <img
              v-if="item.topPick"
              class="w-10 ml-4"
              src="/img/certification/TopPick.svg"
              alt="Top Pick"
            >
          </div>
        </div>

        <div
          v-else
          class="w-full flex items-center truncate"
        >
          <div class="w-12 h-12 bg-gray-100 rounded-xl animate-pulse" />
          <div class="ml-3 flex-1 font-semibold text-gray-200 block truncate">
            loading...
          </div>
        </div>
      </transition>

      <svg
        class="text-sushi-500"
        width="7"
        height="13"
        viewBox="0 0 7 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 11.5L6 6.5L1 1.5"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <transition
      enter-active-class="duration-200 transform-gpu origin-top ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 transform-gpu origin-top ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="Object.keys(features).length"
        class="py-4 px-7 flex flex-wrap"
      >
        <EcoBankFeaturesList :features="features" />
      </div>
    </transition>
  </NuxtLink>
</template>

<script setup lang="ts">
import ClearbitLogo from '@/components/icons/ClearbitLogo.vue'

const props = defineProps<{
  item: any
  isNoCredit: boolean
}>()

const features = computed(() => {
  // filter our credit card
  const features = getFeatures(props.item?.bankFeatures) as Record<string, any>
  const allFeatures: Record<string, any> = {}
  for (const [featKey, featValue] of Object.entries(features)) {
    if (
      (props.isNoCredit && featKey === 'Credit Card')
      || !featValue.isChecked
    ) {
      continue
    }
    allFeatures[featKey] = features[featKey]
  }
  return allFeatures
})
</script>
