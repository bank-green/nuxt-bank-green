<template>
  <ModalWithBackdrop v-model="showModal">
    <form
      v-if="!completionMarked"
      class="w-full h-full overflow-y-auto p-4 md:p-6 mb-2 md:mb-6 mt-6 text-slate-800 text-left"
    >
      <button
        class="flex flex-row items-center cursor-pointer hover:opacity-80"
        @click.prevent.stop="closeModal"
      >
        <img
          src="/img/icons/left-arrow.svg"
        >
        <p class="text-md ml-5 text-primary-dark font-medium">
          Back to form
        </p>
      </button>
      <div class="self-stretch text-left text-xl tracking-wide mt-10 max-md:max-w-full max-md:mt-6">
        <p class="text-md mb-4 text-primary-dark font-bold">
          Read the Following Instructions
        </p>
        <ol class="list-decimal pl-6 text-base mb-4 text-primary-dark space-y-1">
          <li>Review the information presented in the email preview, edit if needed.</li>
          <li>Copy the text.</li>
          <li>Click on “Go To Your Mail App” to take you to your mailbox.</li>
          <li>Paste text into your message, keeping us in bcc.</li>
          <li>Click send and you’re done!</li>
        </ol>
      </div>
      <div class="flex items-center justify-between gap-5 mt-6">
        <div class="text-left text-xl font-medium leading-6">
          {{ embracePage?.data.preview_area_label || 'Generated message' }}
        </div>
        <button
          class="flex items-center justify-center gap-1 py-2 px-4 bg-white text-lime-800 font-medium capitalize rounded-lg border border-gray-800 border-solid whitespace-nowrap"
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
      <NuxtLink
        :to="emailLink"
        target="_blank"
        class="button-white border-sushi-500 mt-5"
        :class="{ 'pointer-events-none opacity-75': busy }"
      >
        <span class="font-semibold text-leaf-400 ">
          Go To your Mail App
        </span>
      </NuxtLink>
      <div
        class="self-stretch text-left text-slate-800 text-sm font-medium leading-6 tracking-wide mt-6 max-md:max-w-full"
      >
        <PrismicRichText
          :field="embracePage?.data.preview_footnote"
          fallback="Don’t forget, keep us in the BCC (some_email@bank.green) field to help us monitor the message."
        />
      </div>
      <div class="items-center self-center flex w-full gap-5 mt-6 mb-6 max-md:max-w-full max-md:flex-wrap max-md:mt-8 max-md:mb-8">
        <button
          class="text-slate-800 text-center text-md font-medium leading-6 capitalize hover:text-red-400 w-full"
          :class="{ 'pointer-events-none opacity-75': busy }"
          @click.prevent="closeModal"
        >
          {{ embracePage?.data.cancel_button_label || 'Cancel' }}
        </button>
        <button
          class="button-green"
          :class="{ 'pointer-events-none opacity-75': busy }"
          @click="markAsComplete"
        >
          <span class="font-semibold">
            {{ embracePage?.data.proceed_button_label || 'Mark as Complete' }}
          </span>
        </button>
      </div>
    </form>
    <div
      v-else
      class="w-full h-full overflow-y-auto p-2 text-left text-primary-dark"
    >
      <p class="text-xl mb-4 text-primary-dark font-bold">
        Thank you for your Email!
      </p>
      <div
        class="h-5/6 bg-white border border-sushi-500 rounded-lg flex flex-col justify-center items-center text-center"
        @click.stop
      >
        <ThanksSection
          :title="'Thank you!'"
          :subtitle="'Your email has been sent.'"
          :description="'Thank you for taking the time to send a breakup letter to your old bank. Your actions are making a difference in creating a more sustainable future. Help us keep this service going by donating today. Every contribution helps!'"
          :show-explore-section="false"
        />
        <NuxtLink
          to="/donate"
          class="button-green flex flex-col items-center justify-center h-12 w-48 rounded-xl"
        >
          <PrismicText
            class="text-sm"
            wrapper="span"
            :field="donationData?.data['donation_button']"
            fallback="Donate Now"
          />
        </NuxtLink>
      </div>
    </div>
  </ModalWithBackdrop>
</template>

<script setup lang="ts">
import type { PrismicDocument } from '@prismicio/types'
import { ref } from 'vue'
import TextField from '@/components/forms/TextField.vue'
import EmailPreviewField from '@/components/forms/EmailPreviewField.vue'

const { client } = usePrismic()
const completionMarked = ref(false)

// TODO: maybe pass embracepage as a prop instead of requesting it again ??
const { data: embracePage } = await useAsyncData('embrace', () =>
  client.getSingle('embracepage'),
)
const { data: donationData } = await useAsyncData('donation', () =>
  client.getSingle('donationpage'),
)

const props = defineProps<{
  modelValue: boolean
  message: string | null
  form: {
    fullName: string
    email: string
    subject: string
    bankEmail: string
    searchValue: string
    country: string
    hometown: string
    background: string
    body: string
    bcc: string
  }
  embracePageProp?: PrismicDocument<Record<string, any>, string, string> | null
}>()

const busy = false

const emit = defineEmits([
  'update:modelValue',
  'update:message',
  'success',
])

const showModal = computed({
  get: () => props.modelValue,
  set: (val) => {
    if (!val) {
      completionMarked.value = false
    }
    emit('update:modelValue', val)
  },
})

const messageBody = computed({
  get: () => props.message,
  set: val => emit('update:message', val),
})

const emailLink = computed(() =>
  getEmailURI(),
)

const messageCopied = ref(false)

watch(messageBody, (val, prev) => {
  if (val !== prev) {
    messageCopied.value = false
  }
})

function copyText() {
  const textField = document.getElementById('embraceText') as HTMLInputElement
  // Select the message body field
  textField.select()
  textField.setSelectionRange(0, 99999) // For mobile devices

  // Copy the text to clipboard
  navigator.clipboard.writeText(textField.value)
  messageCopied.value = true
}

function markAsComplete() {
  completionMarked.value = true
}

function getEmailURI() {
  const bankEmail = encodeURI(props.form?.bankEmail.trim() || 'missing_bank_email')
  let emailURI = `mailto:${bankEmail}?`

  const fields = [
    `subject=${encodeURI(props.form?.subject.trim() || 'missing_subject_line')}`,
    `bcc=${props.form?.bcc.trim() ? encodeURI(props.form?.bcc.trim()) : 'missing_bcc_address'}`,
    `from=${encodeURI(props.form?.email.trim() || 'missing_from_address')}`,
    `body=${encodeURI(props?.message?.trim() || 'missing message body')}`,
  ]
  emailURI += fields.join('&')
  return emailURI
}

function closeModal() {
  emit('update:modelValue', false)
}
</script>
