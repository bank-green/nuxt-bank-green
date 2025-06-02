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

<template>
  <div
    class="p-6 pb-4 font-[Poppins] grid gap-6 rounded-2xl shadow-sm bg-white transition duration-150 ease-in-out hover:bg-gray-50 border border-transparent hover:border-sushi-500"
  >
    <!------------------------------->
    <!--   logo, name, badges      -->
    <!------------------------------->

    <div>
      <div
        class="sm:flex grid gap-4 items-center w-full justify-between"
      >
        <div class="flex gap-2 items-center truncate">
          <ClearbitLogo
            :url="item.website"
            :size="34"
            img-class="absolute inset-0 z-20"
          />
          <div
            class="font-semibold text-gray-800 sm:text-[26px] text-2xl"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="gap-2 flex">
          <div
            v-if="item.fossilFreeAlliance"
            class="flex gap-1 bg-[#EDF5E5] p-1 rounded text-[10px] font-semibold text-[#68951D]"
          >
            Fossil Free
            <img
              src="/img/icons/information-green.svg"
              alt="Fossil Free Certification"
            >
          </div>
          <div
            class="flex gap-1 bg-[#FEE3DC] p-1 rounded text-[10px] font-semibold text-[#FB3D09]"
          >
            Top Pick
          </div>
        </div>
      </div>
    </div>

    <!------------------------------------->
    <!--         rate & features       -->
    <!------------------------------------->

    <div class="grid gap-4">
      <!-- rate -->
      <div class="grid grid-cols-2">
        <div>
          <div class="grid gap-1">
            <span class="text-xs text-[#545A6A]">Interest Rate</span>
            <span class="font-semibold">Up to 3.5%</span>
          </div>
        </div>
        <div>
          <div class="grid gap-1">
            <span class="text-xs text-[#545A6A]">Deposit Protection</span>
            <span class="font-semibold">Up to $250,000</span>
          </div>
        </div>
      </div>

      <div class="border-b border-gray-200" />

      <!-- features -->

      <div v-if="Object.keys(features).length">
        <EcoBankFeaturesList :features="features" />
      </div>

      <div class="border-b border-gray-200" />

      <NuxtLink
        :to="item ? `/sustainable-eco-banks/${item.tag}` : ''"
        class="flex items-center gap-2 justify-end"
      >
        <span class="text-xs font-bold">
          Learn more
        </span>
        <svg
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
      </NuxtLink>
    </div>
  </div>
</template>
