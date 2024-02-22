<template>
  <ModalWithBackdrop v-model="showModal">
    <form class="justify-center items-center flex flex-col pt-2 mb-10 max-w-2xl h-128 max-h-full text-slate-800 text-left">
      <div class="self-stretch text-left text-xl tracking-wide mt-10 max-md:max-w-full max-md:mt-6">
        <PrismicRichText
          :field="embracePage?.data.preview_description"
          class="text-md mb-4 whitespace-pre-wrap text-gray-800"
          fallback="If you agree with the information below, click on 'Go To Your Mail App'. You may also edit the message body beforehand."
        />
      </div>
      <div class="items-center self-stretch flex w-full justify-between gap-5 mt-6 max-md:max-w-full max-md:flex-wrap">
        <div class="text-left text-xl font-medium leading-6 grow shrink basis-auto my-auto max-md:max-w-full">
          {{ embracePage?.data.preview_area_label || 'Generated message' }}
        </div>
      </div>
      <div
        id="previewBox"
        class="items-stretch self-stretch border border-[color:var(--brand-green-medium,#7BB123)] bg-white flex flex-col mt-4 p-2 rounded-2xl border-solid max-md:max-w-full max-md:px-5"
      >
        <div
          name="addressFields"
          class="justify-center items-stretch bg-slate-800 bg-opacity-10 flex flex-col px-3 py-2 rounded-lg max-md:max-w-full"
        >
          <EmailPreviewField
            name="toField"
            title="To: "
            :value="form.bankEmail"
          />
          <EmailPreviewField
            name="bccField"
            title="BCC: "
            :value=" embracePage?.data.bcc_email || 'embrace@bank.green'"
          />
          <EmailPreviewField
            v-if="form?.email"
            name="fromField"
            title="From: "
            :value="form.email"
          />
          <EmailPreviewField
            name="subjectField"
            title="Subject: "
            :value="form?.subject || 'Error retrieving subject line'"
          />
        </div>
        <TextField
          v-model="messageBody"
          class="col-span-full w-full text-gray-800"
          rows="10"
          name="embraceText"
          type="text"
          :value="form?.body"
          dark
        />
      </div>
      <button
        class="button-white text-lime-800 font-medium capitalize whitespace-nowrap justify-center items-center mt-4 bg-white self-stretch flex gap-1 py-2 rounded-lg border border-gray-800 border-solid max-md:px-5"
        @click.prevent.stop="copyText"
      >
        <img
          v-if="!messageCopied"
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0e54027-9f1e-4d75-9014-63e737747321?"
          class="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
        >
        <span v-if="!messageCopied">
          {{ embracePage?.data.copy_text_button_label || 'Copy Text' }}
        </span>
        <img
          v-if="messageCopied"
          class="bg-sushi-100 w-6 h-6 p-1 mt-0.5 mr-1 rounded-full"
          src="/img/icons/check.svg"
          alt=""
        >
        <span v-if="messageCopied">
          {{ embracePage?.data.copied_text_button_label || "Copied!" }}
        </span>
      </button>
      <div
        class="self-stretch text-left text-slate-800 text-sm font-medium leading-6 tracking-wide mt-6 max-md:max-w-full"
      >
        <PrismicRichText
          :field="embracePage?.data.preview_footnote"
          fallback="'Please keep us (embrace@bank.green) in the BCC field of your email to help us keep track of messages sent.'"
        />
      </div>
      <div class="grid grid-cols-2 items-center self-center flex w-full gap-5 mt-6 mb-6 max-md:max-w-full max-md:flex-wrap max-md:mt-8 max-md:mb-8">
        <button
          class="text-slate-800 text-center text-md font-medium leading-6 capitalize hover:text-red-400"
          :class="{'pointer-events-none opacity-75': busy}"
          @click="closeModal"
        >
          {{ embracePage?.data.cancel_button_label || 'Back to Form' }}
        </button>
        <NuxtLink
          :to="emailLink"
          target="_blank"
          class="button-green"
          :class="{'pointer-events-none opacity-75': busy}"
          @click.stop="emit('success')"
        >
          <span class="font-semibold">
            {{ embracePage?.data.proceed_button_label || 'Go To Your Mail App' }}
          </span>
        </NuxtLink>
      </div>
    </form>
  </ModalWithBackdrop>
</template>

<script setup lang="ts">
import { PrismicDocument } from '@prismicio/types'
import TextField from '@/components/forms/TextField.vue'
import EmailPreviewField from '@/components/forms/EmailPreviewField.vue'

const { client } = usePrismic()

// TODO: maybe pass embracepage as a prop instead of requesting it again ??
const { data: embracePage } = await useAsyncData('embrace', () =>
  client.getSingle('embracepage')
)

const props = defineProps<{
  modelValue: boolean;
  message: string | null;
  form: {
    fullName: string;
    email: string;
    subject: string;
    bank: string | null;
    bankEmail: string;
    searchValue: string;
    country: string;
    hometown: string;
    background: string;
    body: string;
};
  embracePageProp?: PrismicDocument<Record<string, any>, string, string> | null
}>()

const busy = false

const emit = defineEmits([
  'update:modelValue',
  'update:message',
  'success'
])

const showModal = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})

const messageBody = computed({
  get: () => props.message,
  set: val => emit('update:message', val)
})

const emailLink = computed(() =>
  getEmailURI()
)

const messageCopied = ref(false)

watch(messageBody, (val, prev) => {
  if (val !== prev) {
    messageCopied.value = false
  }
})

function copyText () {
  const textField = document.getElementById('embraceText')

  // Select the message body field
  textField.select()
  textField.setSelectionRange(0, 99999) // For mobile devices

  // Copy the text to clipboard
  navigator.clipboard.writeText(textField.value)
  messageCopied.value = true
}

function getEmailURI () {
  const bankEmail = encodeURI(props.form?.bankEmail.trim() || 'missing_bank_email')
  let emailURI = `mailto:${bankEmail}?`

  const fields = [
    `subject=${encodeURI(props.form?.subject.trim() || 'missing_subjectline')}`,
    `bcc=${embracePage?.value?.data?.bcc_email ? encodeURI(embracePage?.value?.data?.bcc_email.trim()) : 'missing_bcc_address'}`,
    `from=${encodeURI(props.form?.email.trim() || 'missing_from_address')}`,
    `body=${encodeURI(props.message.trim() || 'missing message body')}`
  ]
  emailURI += fields.join('&')
  return emailURI
}

function closeModal () {
  emit('update:modelValue', false)
}
</script>
