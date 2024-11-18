<!-- TODO: in claudia/groot-300-update-card-views-mobile-and-desktop -->
<template>
  <NuxtLink
    :to="link"
    class="block mb-6 rounded-2xl bg-white border border-gray-200 hover:border-sushi-500 shadow-sm transition duration-150 ease-in-out"
  >
    <div
      class="flex items-center justify-between py-3 pl-4 pr-5"
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

    <div
      v-if="Object.keys(features).length"
      class="py-4 px-7 flex flex-wrap"
    >
      <EcoBankFeaturesList :features="features" />
    </div>

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
