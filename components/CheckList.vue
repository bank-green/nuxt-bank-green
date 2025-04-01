<template>
  <div
    :class="`${dark ? 'text-white' : 'bg-white text-gray-700 md:shadow-md'
    } rounded-2xl px-8 py-10 space-y-6`"
  >
    <div
      v-for="(item, i) in list"
      :key="i"
      class="flex items-start"
    >
      <img
        :class="`${dark ? 'w-7 h-7' : 'bg-pistachio-green w-6 h-6'
        } p-1 mt-0.5 mr-4 rounded-full`"
        src="/img/icons/check.svg"
        alt=""
      >
      <p v-if="typeof item === 'string'">
        {{ item }}
      </p>
      <PrismicRichText
        v-else
        :field="item"
        class="text-lg"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { RichTextField } from '@prismicio/types'

const props = defineProps<{
  list: (string | RichTextField)[]
  dark?: boolean
}>()

const dark = props.dark ?? false
</script>
