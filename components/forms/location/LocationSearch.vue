<script setup>
import en from '../../../lang/en.json'
import BaseField from '../BaseField.vue'
import LocationSearchItem from './LocationSearchItem.vue'
import PinIcon from './PinIcon.vue'
import { findCountries } from './countries'
import ListPicker from '@/components/forms/ListPicker.vue'
import SearchInput from '@/components/forms/input/SearchInput.vue'

const props = defineProps({
  modelValue: String,
  disabled: Boolean,
  warning: String,
  dark: Boolean,
  title: String,
})

const emit = defineEmits(['update:modelValue'])

const isShowing = ref(false)
const search = ref('')
if (props.modelValue && en[`COUNTRY_${props.modelValue}`]) {
  search.value = en[`COUNTRY_${props.modelValue}`]
}
const searchInput = ref()

const filteredCountries = computed(() => findCountries(search.value))

function showList() {
  isShowing.value = true
}
function hideList() {
  isShowing.value = false
  // if clicking away, go back to originally selected country
  if (search.value === '') {
    emit('update:modelValue', '')
  } else if (props.modelValue && en[`COUNTRY_${props.modelValue}`]) {
    search.value = en[`COUNTRY_${props.modelValue}`]
  }
}

function onSelectCountry(code) {
  search.value = en[`COUNTRY_${code}`]
  emit('update:modelValue', code)
  isShowing.value = false
}

function onCloseClick() {
  search.value = ''
  emit('update:modelValue', '')
}

async function focus() {
  // nextTick & requestAnimationFrame needed
  // otherwise it will focus before list can render
  await nextTick()
  requestAnimationFrame(() => {
    searchInput.value.focus()
  })
}

defineExpose({
  focus,
})
</script>

<template>
  <BaseField
    v-clickaway="hideList"
    class="relative col-span-2"
    name="locationSearch"
    :dark="dark"
    :title="title"
    :show-warning="warning"
  >
    <SearchInput
      ref="searchInput"
      v-model="search"
      :aria-expanded="isShowing"
      :use-pencil="true"
      :warning="warning"
      :placeholder="'Search country...'"
      @keydown.down="event => $refs['listPicker'].incrementFocus(event)"
      @keydown.up="event => $refs['listPicker'].decrementFocus(event)"
      @keydown.enter="event => $refs['listPicker'].selectCurrentItem()"
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
        class="absolute z-10 mt-1 w-full rounded-md shadow-lg"
        :class="{
          'bg-white': filteredCountries.length > 0,
          'bg-gray-100': !filteredCountries.length,
        }"
      >
        <div
          v-if="filteredCountries.length === 0"
          class="text-gray-500 text-center p-4 shadow-lg"
        >
          No countries found
        </div>
        <ListPicker
          v-else
          ref="listPicker"
          v-slot="{ item }"
          :items="filteredCountries"
          @select-item="onSelectCountry"
        >
          <LocationSearchItem
            :id="item"
            :title="en[`COUNTRY_${item}`]"
            :is-selected="item === modelValue"
          />
        </ListPicker>
      </div>
    </transition>
  </BaseField>
</template>
