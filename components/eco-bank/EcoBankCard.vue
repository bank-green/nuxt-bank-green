<!-- TODO: in claudia/groot-300-update-card-views-mobile-and-desktop -->
<template>
  <NuxtLink
    :to="link"
    class="block mb-6 rounded-2xl bg-white border border-gray-200 hover:border-sushi-500 shadow-sm transition duration-150 ease-in-out"
  >
    <div
      class="flex items-center justify-between py-3 pl-4 pr-5"
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
          class="flex items-center justify-between w-full flex-wrap gap-y-4"
        >
          <div class="flex items-start gap-1">
            <ClearbitLogo
              :url="item.website"
              :size="32"
              img-class="absolute inset-0 z-20"
              class="relative w-8 h-8"
            />
            <span class="text-2xl font-semibold">
              {{ item.name }}
            </span>
          </div>
          <div
            class="flex items-center gap-2 font-semibold text-gray-800"
          >
            <!-- TODO: Replace hardcoded colors -->
            <div
              v-if="item.fossilFreeAlliance"
              class="flex items-center gap-1 text-[10px] font-semibold bg-[#EDF5E5] text-[#68951D] p-1 rounded"
            >
              <span>Fossil Free</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                class="text-[#68951D]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.08326 10.3652C3.94662 10.9421 4.96165 11.25 6 11.25C7.39239 11.25 8.72775 10.6969 9.71231 9.71231C10.6969 8.72775 11.25 7.39239 11.25 6C11.25 4.96165 10.9421 3.94662 10.3652 3.08326C9.78834 2.2199 8.9684 1.54699 8.00909 1.14963C7.04978 0.752275 5.99418 0.648307 4.97578 0.85088C3.95738 1.05345 3.02192 1.55347 2.28769 2.28769C1.55347 3.02192 1.05345 3.95738 0.85088 4.97578C0.648307 5.99418 0.752275 7.04978 1.14963 8.00909C1.54699 8.9684 2.2199 9.78834 3.08326 10.3652ZM3.49994 2.25839C4.23996 1.76392 5.10999 1.5 6 1.5C7.19348 1.5 8.33807 1.97411 9.18198 2.81802C10.0259 3.66194 10.5 4.80653 10.5 6C10.5 6.89002 10.2361 7.76005 9.74162 8.50007C9.24715 9.24009 8.54434 9.81686 7.72208 10.1575C6.89981 10.4981 5.99501 10.5872 5.1221 10.4135C4.24918 10.2399 3.44736 9.81132 2.81802 9.18198C2.18869 8.55265 1.7601 7.75082 1.58647 6.87791C1.41284 6.00499 1.50195 5.10019 1.84254 4.27793C2.18314 3.45566 2.75992 2.75286 3.49994 2.25839ZM6 3C5.88875 3 5.77999 3.03299 5.68749 3.0948C5.59499 3.15661 5.52289 3.24446 5.48032 3.34724C5.43774 3.45002 5.4266 3.56312 5.44831 3.67224C5.47001 3.78135 5.52359 3.88158 5.60225 3.96025C5.68092 4.03891 5.78115 4.09249 5.89026 4.11419C5.99938 4.1359 6.11248 4.12476 6.21526 4.08218C6.31804 4.03961 6.40589 3.96751 6.4677 3.87501C6.52951 3.78251 6.5625 3.67375 6.5625 3.5625C6.5625 3.41332 6.50324 3.27024 6.39775 3.16475C6.29226 3.05926 6.14919 3 6 3ZM6.375 8.25V5.25H4.875V6H5.625V8.25H4.5V9H7.5V8.25H6.375Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div
              v-if="item.topPick"
              class="text-[10px] font-semibold bg-[#FEE3DC] text-[#FB3D09] p-1 rounded"
            >
              Top Pick
            </div>
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

interface Item {
  tag: string
  name: string
  fossilFreeAlliance: boolean
  topPick: boolean
  website: string
  bankFeatures: BankFeature[]
}

const props = defineProps<{
  item: Item
  isNoCredit: boolean
}>()

const features = computed(() => {
  // filter our credit card
  const features = getFeatures(props.item?.bankFeatures)
  const allFeatures: Record<string, any> = {}
  for (const [featKey, featValue] of Object.entries(features)) {
    if (
      (props.isNoCredit && featKey === 'Credit Card')
      || !featValue.isChecked
    ) {
      continue
    }
    allFeatures[featKey] = features[featKey as keyof typeof features]
  }
  return allFeatures
})

const link = props.item ? `/sustainable-eco-banks/${props.item.tag}` : ''
</script>
