<template>
  <Modal v-model="showModal">
    <form class="flex flex-col items-center rounded-2xl bg-sushi-200 text-gray-800 py-8 px-6">
      <div class="w-full text-left text-lg font-semibold mb-2">
        {{ embracePage?.data.preview_title || 'Title' }}
      </div>
      <div>
        <PrismicRichText
          v-if="embracePage?.data"
          :field="embracePage?.data.preview_description"
          class="text-left text-md mb-6 whitespace-pre-wrap text-gray-800"
        />
        <p v-else>
          preview_description
        </p>
      </div>
      <div class="flex items-center justify-start grid-cols-4 gap-6 col-span-full w-full text-gray-800 py-2">
        <div class="items-center text-left w-full">
          {{ embracePage?.data.preview_area_label || 'Your message' }}
        </div>
        <div class="flex w-full justify-end">
          <button
            class="button-white text-xs w-auto"
            @click.prevent.stop="copyText"
          >
            {{ embracePage?.data.copy_text_button_label|| 'Copy' }}
          </button>
        </div>
      </div>
      <TextField
        v-model="generatedMessage"
        class="col-span-full w-full text-gray-800"
        rows="10"
        name="embraceText"
        type="text"
        dark
      />
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        <button
          class="button-white col-span-2 w-full md:w-auto mt-6 flex justify-center"
          :class="{'pointer-events-none opacity-75': busy}"
          @click="closeModal"
        >
          {{ embracePage?.data.cancel_button_label || 'Back to Form' }}
        </button>
        <button
          class="button-green col-span-2 w-full md:w-auto mt-6 flex justify-center"
          :class="{'pointer-events-none opacity-75': busy}"
          @click.prevent.stop="openEmailApp"
        >
          {{ embracePage?.data.proceed_button_label || 'Send Email' }}
        </button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import TextField from '@/components/forms/TextField.vue'

const { client } = usePrismic()

// TODO: pass embracepage as a prop instead of requesting it again??
const { data: embracePage } = await useAsyncData('embrace', () =>
  client.getSingle('embracepage')
)

const props = defineProps<{
  modelValue: boolean;
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const showModal = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})

// TODO Get generated message from ClimateAI + form values (pass as prop?)
const generatedMessage = ref('')

// TODO generate a mailto link based on form answers

function copyText () {
  console.log('copy text')
  // TODO: copy to clipboard
}

function openEmailApp () {
  console.log('open email')
  // TODO navigate to mailTo link
}

function closeModal () {
  console.info('close')
  emit('update:modelValue', false)
}
</script>
