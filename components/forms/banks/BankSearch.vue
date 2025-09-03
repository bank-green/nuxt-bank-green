<script setup lang="ts">
import LoadingJumper from '../../LoadingJumper.vue'
import SearchInput from '../input/SearchInput.vue'
import ListPicker from '../ListPicker.vue'
import BaseField from '../BaseField.vue'
import {
  isValidStateCountry,
  type StateCode,
} from '../location/iso3166-2States'
import BankSearchItem from './BankSearchItem.vue'
import { findBanks } from './banks'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    country: string
    state?: StateCode
    modelValue: object | null
    warning?: string | boolean
    infoTooltip?: string
    dark?: boolean
    title?: string
    isEmbrace?: boolean
    loading: boolean
    options: {
      name: string
      tag: string
      website?: string | null
      aliases?: string | null
    }[]
  }>(),
  {
    disabled: false,
    warning: false,
    infoTooltip: undefined,
    dark: false,
    title: '',
    isEmbrace: false,
  }
)

const emit = defineEmits(['update:modelValue', 'searchInputChange'])

const search = ref<string>('')
const isShowing = ref<boolean>(false)
const selectedItem = ref<string | null>(null)
const input = ref<HTMLInputElement | null>(null)

const placeholder = computed<string>(() => {
  if (props.loading) return 'Loading banks...'
  if (!props.country) return 'Set a country first'

  const isExpectingState = isValidStateCountry(props.country)

  if (isExpectingState && !props.state) return 'Set a state/region first'

  const noBanksFound = !props?.options.length
  if (noBanksFound)
    return `No bank data found for this ${isExpectingState && props.state ? 'state/region' : 'country'}`

  return 'Search bank...'
})

const filteredBanks = computed(() => findBanks(props.options, search.value))

watch(
  () => search,
  function (newValue) {
    if (props.modelValue && newValue.value !== selectedItem.value) {
      emit('update:modelValue', null)
    }
    emit('searchInputChange', newValue)
  }
)

function showList() {
  isShowing.value = true
}

function hideList() {
  isShowing.value = false
}

async function onSelectBank(item: { name: string; tag: string }) {
  emit('update:modelValue', null)
  await nextTick()
  search.value = item.name
  selectedItem.value = item.name
  emit('update:modelValue', item)
  isShowing.value = false
}

function onCloseClick() {
  search.value = ''
  emit('update:modelValue', null)
}

async function focus() {
  input?.value?.focus()
}

defineExpose({
  focus,
})
</script>

<template>
  <div class="col-span-2">
    <BaseField
      v-clickaway="hideList"
      name="bankSearch"
      class="w-full"
      :dark="dark"
      :title="title"
      :show-warning="warning"
      :info-tooltip="infoTooltip"
    >
      <SearchInput
        ref="input"
        v-model="search"
        :disabled="disabled"
        :aria-expanded="isShowing"
        :placeholder="placeholder"
        :warning="warning"
        :dark="dark"
        @keydown.down="
          (event: PointerEvent) =>
            ($refs['listPicker'] as typeof ListPicker).incrementFocus(event)
        "
        @keydown.up="
          (event: PointerEvent) =>
            ($refs['listPicker'] as typeof ListPicker).decrementFocus(event)
        "
        @keydown.enter="
          (_event: PointerEvent) =>
            ($refs['listPicker'] as typeof ListPicker).selectCurrentItem()
        "
        @on-focus="showList"
        @on-click="showList"
        @on-close-click="onCloseClick"
      >
        <template #icon>
          <LoadingJumper
            v-if="loading && !disabled"
            class="h-5 w-5 absolute inset-0 m-4 text-sushi-500"
          />
          <img
            v-else
            src="/img/icons/bank-icon.svg"
            class="h-6 w-6 absolute inset-0 m-4"
          />
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
            'bg-white': filteredBanks.length,
            'bg-gray-100': !filteredBanks.length,
          }"
        >
          <slot v-if="!filteredBanks.length" name="not-listed">
            <NuxtLink to="/not-listed">
              <div class="text-gray-500 text-center p-4 shadow-lg underline">
                My bank isn't listed
              </div>
            </NuxtLink>
          </slot>
          <ListPicker
            v-else
            ref="listPicker"
            v-slot="{ item }"
            :items="filteredBanks"
            @select-item="onSelectBank"
          >
            <BankSearchItem
              :id="item.tag"
              :name="item.name"
              :website="item.website"
              :is-selected="item === modelValue"
            />
          </ListPicker>
        </div>
      </transition>
    </BaseField>
  </div>
</template>
