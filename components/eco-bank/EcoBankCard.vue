<template>
  <NuxtLink
    :to="item ? `/sustainable-eco-banks/${item.tag}` : ''"
    class="block mb-6 rounded-2xl shadow-sm bg-white transition duration-150 ease-in-out hover:bg-gray-50 border border-transparent hover:border-sushi-500"
  >
    <div class="ribbonContainer">
      <div
        class="py-3 pl-4 pr-5 border-b border-gray-200 flex items-center justify-between"
      >
        <p v-if="item.topPick" class="ribbon text-xs">
          Top Pick
        </p>

        <transition
          enter-active-class="duration-200 transform-gpu origin-top ease-out"
          enter-from-class="opacity-0 scale-y-95"
          enter-to-class="opacity-100 scale-y-100"
          leave-active-class="duration-100 transform-gpu origin-top ease-in"
          leave-from-class="opacity-100 scale-y-100"
          leave-to-class="opacity-0 scale-y-95"
          mode="out-in"
        >
          <div v-if="item" class="flex items-center truncate">
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
              <div class="ml-4 text-xs text-gray-500">
                {{ item.interest_rates }}
              </div>
            </div>
          </div>

          <div v-else class="w-full flex items-center truncate">
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
        <div v-if="item">
          <div
            class="flex flex-col md:flex-row text-xs ml-12 mt-4 justify-between"
          >
            <span>{{ bankInfo.accounts.join(" | ") }}</span>
            <span class="mr-6 mt-2 md:mt-0">Rating: {{ item.rating }}</span>
          </div>

          <div
            v-if="Object.keys(bankInfo.features).length"
            class="py-4 px-7 flex flex-wrap"
          >
            <EcoBankFeaturesList :features="bankInfo.features" />
          </div>
        </div>
      </transition>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import ClearbitLogo from '@/components/icons/ClearbitLogo.vue'

const props = defineProps<{
  item: any;
}>()

const bankInfo = computed(() => {
  const allFeatures = getFeatures(props.item?.bankFeatures, true) as Record<
    string,
    any
  >
  const features: Record<string, any> = {}
  const accounts: string[] = []

  for (const [featKey, featValue] of Object.entries(allFeatures)) {
    // Check if the feature is an account and process it
    const accountKeys = ['accounts', 'credit card']
    if (!featValue?.hide || featValue?.checked) {
      if (accountKeys.find(x => featKey?.toLowerCase().includes(x))) {
        accounts.push(featKey.replace('Accounts', '').trim())
      } else {
        // Only add feature if it's not hidden or if it's checked
        features[featKey] = featValue ?? allFeatures[featKey]
      }
    }
  }

  return { features, accounts }
})
</script>

<style>
.ribbonContainer {
  overflow: hidden; /* required */
  position: relative; /* required for demo */
}

.ribbon {
  margin: 0;
  background: #fc7753;
  color: rgb(72, 72, 72);
  padding: 0.3em 0;
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateX(35%) translateY(5%) rotate(-45deg);
  transform-origin: bottom left;
  font-size: small;
}

.ribbon:before,
.ribbon:after {
  content: "";
  position: absolute;
  top: 0;
  margin: 0 -1px; /* tweak */
  width: 100%;
  height: 100%;
  background: #fc7753;
}

.ribbon:before {
  right: 100%;
}

.ribbon:after {
  left: 100%;
}
</style>
