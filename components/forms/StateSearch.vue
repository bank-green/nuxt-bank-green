<script setup lang="ts">
import { computed, ref } from 'vue'

import Fuse from 'fuse.js'
import PinIcon from './location/PinIcon.vue'
import SearchInput from '@/components/forms/input/SearchInput.vue'
import ListPicker from '@/components/forms/ListPicker.vue'

const props = defineProps<{
  options: string[]
}>()

const emit = defineEmits(['select'])
const listPicker = ref()
const onKeyDown = (event: Event) => {
  listPicker.value.incrementFocus(event)
}
const onKeyUp = (event: Event) => {
  listPicker.value.decrementFocus(event)
}
const onKeyEnter = () => listPicker.value.selectCurrentItem()

const search = ref('')
const isShowing = ref(false)
const isLoading = ref(false)
const options = ref<string[]>(props.options)

const filteredOptions = computed(() => {
  const fuse = new Fuse(options.value, {
    includeScore: true,
    keys: ['toponymName'],
  })

  if (!search.value.trim()) {
    return options.value
  }
  const result = fuse.search(search.value)
  return result.filter(x => x.score && x.score < 0.3).map(x => x.item)
})

function showList() {
  isShowing.value = true
}
function hideList() {
  isShowing.value = false
}

async function onSelectLocation(item: string) {
  search.value = item
  emit('select', {
    value: item,
  })
  isShowing.value = false
}
function onCloseClick() {
  search.value = ''
  emit('select', null)
}
</script>

<template>
  <div v-clickaway="hideList" class="relative">
    <SearchInput
      v-model="search"
      :aria-expanded="isShowing"
      placeholder="Search region/state"
      @keydown.down="onKeyDown"
      @keydown.up="onKeyUp"
      @keydown.enter="onKeyEnter"
      @on-focus="showList"
      @on-click="showList"
      @on-close-click="onCloseClick"
    >
      <template #icon>
        <PinIcon class="h-6 w-6 absolute inset-0 m-4" />
      </template>
    </SearchInput>

    <transition
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isShowing"
        class="absolute z-10 mt-1 w-full rounded-md"
        :class="{
          'bg-white': filteredOptions.length > 0,
          'bg-gray-100': !filteredOptions.length,
        }"
      >
        <div v-if="isLoading" class="text-gray-500 text-center p-4">
          Loading
        </div>
        <div
          v-else-if="filteredOptions.length === 0"
          class="text-gray-500 text-center p-4"
        >
          No State/Region found
        </div>
        <ListPicker
          v-else
          ref="listPicker"
          v-slot="{ item }"
          :items="filteredOptions"
          @select-item="onSelectLocation"
        >
          <div>
            {{ item }}
          </div>
        </ListPicker>
      </div>
    </transition>
  </div>
</template>
