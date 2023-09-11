<template>
  <div v-clickaway="hideList" class="relative">
    <SearchInput
      v-model="search"
      :aria-expanded="isShowing"
      :use-pencil="true"
      :placeholder="'Search country...'"
      @keydown.down="(event) => $refs['listPicker'].incrementFocus(event)"
      @keydown.up="(event) => $refs['listPicker'].decrementFocus(event)"
      @keydown.enter="(event) => $refs['listPicker'].selectCurrentItem()"
      @onFocus="showList"
      @onClick="showList"
      @onCloseClick="onCloseClick"
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
          @selectItem="onSelectCountry"
        >
          <LocationSearchItem
            :id="item"
            :title="en[`COUNTRY_${item}`]"
            :is-selected="item === modelValue"
          />
        </ListPicker>
      </div>
    </transition>
  </div>
</template>

<script setup>
import en from '../../../lang/en.json'
import LocationSearchItem from './LocationSearchItem.vue'
import PinIcon from './PinIcon.vue'
import { findCountries } from './countries'
import SearchInput from '@/components/forms/input/SearchInput'
import ListPicker from '@/components/forms/ListPicker'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const isShowing = ref(false)
// const country = useCountry()
const search = ref('')
if (props.modelValue && en[`COUNTRY_${props.modelValue}`]) {
  search.value = en[`COUNTRY_${props.modelValue}`]
}

const filteredCountries = computed(() => findCountries(search.value))

function showList () {
  isShowing.value = true
}
function hideList () {
  isShowing.value = false
  // if clicking away, go back to originally selected country
  if (search.value === '') {
    emit('update:modelValue', '')
  } else if (props.modelValue && en[`COUNTRY_${props.modelValue}`]) {
    search.value = en[`COUNTRY_${props.modelValue}`]
  }
}

async function onSelectCountry (code) {
  search.value = en[`COUNTRY_${code}`]
  emit('update:modelValue', code)
  isShowing.value = false
}

function onCloseClick () {
  search.value = ''
  emit('update:modelValue', '')
}
</script>
