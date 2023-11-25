<template>
  <Modal v-model="showModal">
    <form class="justify-center items-center bg-lime-50 flex flex-col px-10 rounded-2xl max-md:px-5">
      <div
        class="justify-between items-stretch self-stretch flex gap-5 mt-20 max-md:max-w-full max-md:flex-wrap max-md:mt-10"
      >
        <div class="text-slate-800 text-2xl font-bold leading-6 grow shrink basis-auto max-md:max-w-full">
          {{ embracePage?.data.preview_title || 'Title' }}
        </div>
      </div>
      <div class="self-stretch text-slate-800 text-xl leading-7 tracking-wide mt-16 max-md:max-w-full max-md:mt-10">
        <PrismicRichText
          v-if="embracePage?.data"
          :field="embracePage?.data.preview_description"
          class="text-left text-md mb-6 whitespace-pre-wrap text-gray-800"
        />
        <p v-else>
          preview_description
        </p>
      </div>
      <div class="items-center self-stretch flex w-full justify-between gap-5 mt-6 max-md:max-w-full max-md:flex-wrap">
        <div class="text-slate-800 text-xl font-medium leading-6 grow shrink basis-auto my-auto max-md:max-w-full">
          {{ embracePage?.data.preview_area_label || 'Generated message' }}
        </div>
        <div
          class="justify-between items-stretch border border-[color:var(--brand-green-heavy,#3A6028)] bg-white self-stretch flex gap-1 pl-6 pr-7 py-2 rounded-lg border-solid max-md:px-5"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0e54027-9f1e-4d75-9014-63e737747321?"
            class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
          />
          <button
            class="text-lime-800 text-center text-base font-medium leading-6 capitalize grow whitespace-nowrap"
            @click.prevent.stop="copyText"
          >
            {{ embracePage?.data.copy_text_button_label|| 'Copy' }}
          </button>
        </div>
      </div>
      <div
        class="items-stretch self-stretch border border-[color:var(--brand-green-medium,#7BB123)] bg-white flex flex-col mt-4 p-2 rounded-2xl border-solid max-md:max-w-full max-md:px-5"
      >
        <div
          class="justify-center items-stretch bg-slate-800 bg-opacity-10 flex flex-col px-3 py-2 rounded-lg max-md:max-w-full"
        >
        </div>
        <TextField
          v-model="generatedMessage"
          class="col-span-full w-full text-gray-800"
          rows="10"
          name="embraceText"
          type="text"
          dark
        />
      </div>
      <div
        class="self-stretch text-slate-800 text-lg font-medium leading-6 tracking-wide mt-6 max-md:max-w-full"
      >
        Please, keep us in the BCC (some_email@bank.green) field to help us
        monitor the message.
      </div>
      <div class="justify-between items-center self-center flex w-full max-w-[694px] gap-5 mt-10 mb-16 max-md:max-w-full max-md:flex-wrap max-md:mb-10">
        <button
          class="text-slate-800 text-center text-lg font-medium leading-6 capitalize self-stretch grow my-auto"
          :class="{'pointer-events-none opacity-75': busy}"
          @click="closeModal"
        >
          {{ embracePage?.data.cancel_button_label || 'Back to Form' }}
        </button>
        <button
          class="text-white text-center text-lg font-medium leading-6 capitalize justify-center items-center shadow-xl bg-lime-500 self-stretch grow px-5 py-4 rounded-2xl"
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
