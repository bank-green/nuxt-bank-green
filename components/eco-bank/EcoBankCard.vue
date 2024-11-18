<!-- TODO: in claudia/groot-300-update-card-views-mobile-and-desktop -->
<template>
  <div
    class="block p-6 pb-4 mb-6 rounded-2xl bg-white border border-gray-200 hover:border-sushi-500 shadow-sm transition duration-150 ease-in-out"
  >
    <div
      class="flex items-center justify-between mb-6"
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
        <EcoBankCardTags
          :top-pick="item.topPick"
          :fossil-free-alliance="item.fossilFreeAlliance"
        />
      </div>
    </div>

    <!-- TODO use backend data -->
    <dl class="grid grid-cols-3">
      <div class="flex flex-col gap-1">
        <dt class="text-gray-600 text-xs">
          Interest Rate
        </dt>
        <dd class="text-base text-primary-dark font-semibold truncate">
          {{ item.interestRate || 'No information' }}
        </dd>
      </div>

      <div class="col-span-2 flex flex-col gap-1">
        <dt class="text-gray-600 text-xs">
          Deposit Protection
        </dt>
        <dd class="text-base text-primary-dark font-semibold truncate">
          {{ item.depositProtection || 'No information' }}
        </dd>
      </div>
    </dl>

    <hr class="h-1 mb-4 mt-4 stroke-1 stroke-gray-200">

    <div
      v-if="Object.keys(features).length"
      class="py-4 px-7 flex flex-wrap"
    >
      <EcoBankFeaturesList :features="features" />
    </div>

    <hr class="h-1 mb-4 mt-4 stroke-1 stroke-gray-200">

    <NuxtLink
      :to="link"
      class="w-fit ml-auto mr-0 flex gap-2 items-center"
    >
      <span class="text-sm text-primary-dark font-medium">Learn more</span>

      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.2993 20.041L16.9794 13.361L10.2993 6.68094"
          stroke="currentColor"
          stroke-width="1.78134"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

    </NuxtLink>
  </div>
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

  // TODO: possibly new backend data
  interestRate: string
  depositProtection: string
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
