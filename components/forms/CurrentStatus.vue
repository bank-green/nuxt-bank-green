<template>
  <BaseField
    v-clickaway="hideList"
    class="relative col-span-2"
    name="currentStatus"
    :dark="dark"
    :title="title"
    :show-warning="warning"
  >
    <SearchInput
      v-model="selected"
      role="combobox"
      title="title"
      :aria-expanded="isShowing"
      aria-controls="listbox"
      aria-haspopup="listbox"
      :use-pencil="true"
      :warning="warning"
      :placeholder="'Select my status...'"
      :has-exta-icon-spacing="false"
      read-only
      @on-focus="showList"
      @on-click="showList"
      @on-close-click="onCloseClick"
    >
      <template #endIcon>
        <svg

          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="#293145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </template>
    </SearchInput>
    <transition
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isShowing"
        class="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white"
      >
        <ListPicker
          ref="listPicker"
          v-slot="{ item }"
          :items="status"
          role="listbox"
          class="pl-0"
          :has-icon-spacing="false"
          @select-item="onSelectStatus"
        >
          <div
            class="block truncate cursor-pointer"
            :class="{
              'font-semibold': selected === item,
              'font-normal': selected !== item,
            }"
          >
            {{ item }}
          </div>
        </ListPicker>
      </div>
    </transition>
  </BaseField>
</template>

<script setup lang="ts">
import BaseField from '@/components/forms/BaseField.vue'
import ListPicker from '@/components/forms/ListPicker.vue'
import SearchInput from '@/components/forms/input/SearchInput.vue'

defineProps<{
  modelValue: string,
  disabled?: boolean,
  warning?: string,
  dark?: boolean,
  title: string
}>()

const emit = defineEmits(['update:modelValue'])

const isShowing = ref<boolean>(false)

const selected = ref<string>('')

const status = computed(() => ['I’m actively planning to switch banks', 'I’m considering switching banks'])

function showList () {
  isShowing.value = true
}
function hideList () {
  isShowing.value = false
}

function onSelectStatus (status: string) {
  console.log(status)
  selected.value = status
  emit('update:modelValue', status)
  isShowing.value = false
}

function onCloseClick () {
  selected.value = ''
  emit('update:modelValue', '')
}
</script>
