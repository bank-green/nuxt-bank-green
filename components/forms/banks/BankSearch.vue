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
        :placeholder="disabled ? 'Set a country first' : !loaded ? 'Loading banks...' : !hasBanks ? 'No banks available in this country.' : 'Search bank...'"
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
            v-if="!loaded && !disabled"
            class="h-5 w-5 absolute inset-0 m-4 text-sushi-500"
          />
          <img
            v-else
            src="/img/icons/bank-icon.svg"
            class="h-6 w-6 absolute inset-0 m-4"
          >
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
            'bg-white': filteredBanks.length > 0,
            'bg-gray-100': !filteredBanks.length,
          }"
        >
          <slot
            v-if="filteredBanks.length === 0"
            name="not-listed"
          >
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

<script setup lang="ts">
import LoadingJumper from '../../LoadingJumper.vue'
import SearchInput from '../input/SearchInput.vue'
import ListPicker from '../ListPicker.vue'
import BaseField from '../BaseField.vue'
import BankSearchItem from './BankSearchItem.vue'
import { findBanks } from './banks'

const props = withDefaults(defineProps<{
  disabled?: boolean
  country: string
  modelValue: object | null
  warning?: string | boolean
  infoTooltip?: string
  dark?: boolean
  title?: string
  isEmbrace?: boolean
}>(), {
  disabled: false,
  warning: false,
  infoTooltip: undefined,
  dark: false,
  title: '',
  isEmbrace: false,
})

const emit = defineEmits(['update:modelValue', 'searchInputChange'])
const router = useRouter()

const pageStart = new Date()
const banks = ref([])
const loaded = ref<boolean>(false)
const search = ref<string>('')
const isShowing = ref<boolean>(false)
const selectedItem = ref<string | null>(null)
const input = ref<HTMLInputElement | null>(null)

const hasBanks = computed(() => banks.value.length > 0)
const filteredBanks = computed(() => findBanks(banks.value, search.value))

onMounted(() => {
  loadBanks()
})

watch(
  () => props.country,
  async function () {
    await loadBanks()
    await nextTick()
    if (input.value && +new Date() - +pageStart > 15000) {
      input.value.focus()
    }
  },
)

watch(
  () => search,
  function (newValue) {
    if (props.modelValue && newValue.value !== selectedItem.value) {
      emit('update:modelValue', null)
    }
    emit('searchInputChange', newValue)
  },
)

async function loadBanks() {
  if (props.disabled) { return }
  loaded.value = false
  search.value = ''
  banks.value = await getBanksList({ country: props.country, isEmbrace: props.isEmbrace })
  loaded.value = true
}

function showList() {
  isShowing.value = true
}

function hideList() {
  isShowing.value = false
}

async function onSelectBank(item: { name: string, tag: string }) {
  emit('update:modelValue', null)
  await nextTick()
  search.value = item.name
  selectedItem.value = item.name
  emit('update:modelValue', item)
  isShowing.value = false
  router.push(`banks/${item.tag}`)
}

function onCloseClick() {
  search.value = ''
  emit('update:modelValue', null)
}
</script>
