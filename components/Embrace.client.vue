<template>
  <div
    class="w-full flex items-center justify-center bg-leaf-700 rounded-2xl px-8 py-8 text-gray-50 text-center"
  >
    <form
      class="flex flex-col items-center"
      @submit.prevent.stop="checkAndDisplayPreview"
    >
      <p class="text-xl md:text-2xl mb-6 font-semibold whitespace-pre-wrap">
        {{ embracePage?.data.form_title || 'Share your thoughts' }}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        <TextField
          v-model="fullName"
          class="col-span-2"
          name="fullName"
          type="text"
          :title="embracePage?.data.full_name_label || 'Your full name'"
          :placeholder="embracePage?.data.full_name_placeholder || 'Write your full name'"
          :warning="fullNameWarning ? fullNameWarning : false"
          dark
        />
        <TextField
          v-model="form.email"
          class="col-span-2"
          type="email"
          name="email"
          :title="embracePage?.data.email_label || 'Email'"
          :placeholder="embracePage?.data.email_placeholder || 'email@example.com'"
          :warning="warningsMap['email']"
          dark
        />
        <BankLocationSearch
          v-model="form.bank"
          :bank-search-classes="bankSearchClasses"
          :warning="warningsMap['bank']"
          :info-tooltip-bank="embracePage?.data.bank_select_tooltip || 'For now, we are only considering certain banks for this campaign. We may add more eventually.'"
          dark
          class="col-span-2"
          :bank-title="embracePage?.data.bank_select_label || 'Choose your current bank'"
          :location-title="embracePage?.data?.country_select_label || 'Choose your country'"
          @search-input-change="searchValue = $event"
          @update:model-value="searchInputChange"
        >
          <template #not-listed>
            <PrismicRichText
              :field="embracePage?.data.bank_not_found"
              fallback="We couldn't find your bank. <br>
                For now, we are only considering certain banks for this campaign. We may add more eventually."
            />
          </template>
        </BankLocationSearch>
        <TextField
          v-model="form.hometown"
          class="col-span-full"
          name="hometown"
          type="text"
          :title="embracePage?.data.hometown_label || 'Your hometown'"
          :placeholder="embracePage?.data.hometown_placeholder || 'Hometown'"
          dark
        />
        <TextField
          v-model="form.background"
          class="col-span-full"
          rows="5"
          name="backgound"
          type="text"
          :title="embracePage?.data.background_label || 'Your background'"
          :placeholder="embracePage?.data.background_placeholder || 'Your background'"
          dark
        />
        <CheckboxSection
          v-model="isAgreeMarketing"
          class="col-span-full"
          name="isAgreeMarketing"
          dark
        >
          <PrismicRichText
            :field="embracePage?.data.marketing_checkbox_label"
            fallback="I wish to receive more information via email from Bank.Green."
          />
        </CheckboxSection>
        <CheckboxSection
          v-model="isAgreeTerms"
          class="col-span-full"
          name="isAgreeTerms"
          :warning="warningsMap['isAgreeTerms']"
          dark
        >
          <PrismicText
            :field="embracePage?.data.privacy_checkbox_label"
            wrapper="span"
            fallback="I have read and understood the Bank.Green "
          />
          <!--<p v-else>I have read and understood Bank.Green</p>-->
          <NuxtLink v-if="embracePage?.data" to="/privacy" class="link">
            {{
              ' ' + (embracePage?.data.privacy_policy_link_text || "privacy policy")
            }}
          </NuxtLink>
          <NuxtLink v-else to="/privacy" class="link">
            privacy policy
          </NuxtLink>
          <vue-hcaptcha
            v-if="!isLocal"
            :sitekey="hcaptchaSitekey"
            class="col-span-full mt-4"
          />
        </CheckboxSection>
      </div>
      <button
        type="submit"
        class="button-green w-full md:w-auto mt-6 flex justify-center"
        :class="{'pointer-events-none opacity-75': busy}"
      >
        <span v-if="!busy"> Generate Email Preview </span>
        <span v-else>
          <svg
            width="32"
            height="32"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 561 553"
            style="animation: ring 2s linear infinite"
          >
            <path
              d="M478 0A481 481 0 0 0 0 485v76h75c264 0 478-217 478-485V0h-75z"
              fill="#6C9039"
            />
          </svg>
        </span>
      </button>
    </form>
  </div>
  <EmbraceModal
    v-show="showModal"
    v-model="showModal"
    v-model:message="generatedMessage"
    :title="embracePage?.data.preview_title || 'Email Preview'"
    tag="popup"
    :form="form"
    @success="successRedirect()"
  />
</template>

<script setup lang="ts">
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import { PrismicDocument } from '@prismicio/types'
import BankLocationSearch from '@/components/forms/BankLocationSearch.vue'
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
import TextField from '@/components/forms/TextField.vue'
import EmbraceModal from '@/components/EmbraceModal.vue'

const { client } = usePrismic()

// TODO: Maybe update this to pass embracepage as a prop
//       instead of requesting it again
const { data: embracePage } = await useAsyncData('embrace', () =>
  client.getSingle('embracepage')
)

if (!embracePage?.value) {
  console.log('Warning: Unable to retrieve embracepage')
}

const hcaptchaSitekey = useRuntimeConfig().public.HAPTCHA_SITEKEY

const props = withDefaults(defineProps<{
  name?: String;
  successRedirectURL: string;
  embracePageProp?: PrismicDocument<Record<string, any>, string, string> | null;
}>(), {
  successRedirectURL: '/thanks-embrace'
})

const fullName = ref<string>('')
const fullNameWarning = ref<string | null>(null)
const searchValue = ref<string>('')
const { country } = useCountry()
const hometown = ref<string>('')
const background = ref<string>('')
const showModal = ref<boolean>(false)
const bankEmail = ref<string>('')
const subject = ref<string>('')
const generatedMessage = ref<string>('') // pass to preview component as v-model??
const uniqueUrl = ref<string>('')

const extras = computed(() => {
  return {
    fullName: fullName.value || '',
    country: country.value || '',
    bankDisplayName: bank.value?.name || '',
    rating: bank.value?.rating || '',
    bankNameWhenNotFound: (!bank.value && searchValue.value) || '',
    hometown: hometown.value || '',
    background: background.value || ''
  }
})

const {
  email,
  bank,
  isAgreeTerms,
  isAgreeMarketing,
  hasWarnings,
  warningsMap,
  validate,
  busy
} = useContactForm(
  'embrace',
  ['email', 'isAgreeTerms', 'bank'],
  extras
)

const form = ref({
  fullName,
  email,
  subject,
  bank,
  bankEmail,
  searchValue,
  country,
  hometown,
  background
})

// const emit = defineEmits(['success'])

function searchInputChange (event: HTMLInputElement) {
  // When bank is selected we need to fetch/update bank contact email
  if (event && form.value?.bank?.name) {
    getBankEmail(form.value?.bank)
  }
}

// TODO: connect to api to retrieve email or list of bank emails
//       May want to use 'busy' if we retrieve individually rather than loading
//       a full list at page load
function getBankEmail (bank: {name: string}) {
  console.log(`getBankEmail(${bank?.name})`)
  bankEmail.value = 'fakeBank@example.com'
  // TODO: Get subject line from Prismic? -- we may want to also vary this
  subject.value = 'Fake subject line'
}

// Connect to api to generate message body.
// Wait for message before showing modal.
async function getGeneratedMessage () {
  busy.value = true

  try {
    const response = await $fetch('message', {
      baseURL: 'http://localhost:5000',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        name: fullName.value,
        email: email.value,
        hometown: hometown.value,
        background: background.value,
        bank_name: extras.value.bankDisplayName,
        // TODO: use actual bank contacts
        // BUT we may not need to include in message generation
        contact_emails: 'contact1@example.com,contact2@example.com'
      },
      parseResponse: JSON.parse
    })

    if (response?.text) {
      generatedMessage.value = response.text
      uniqueUrl.value = response.unique_url || ''
    }
  } catch (e) {
    console.error('Error fetching or generating message.', e)
    // TODO: Fallback to boiler plate message stored in Prismic with filled in
    // values.
    generatedMessage.value = 'We were unable to generate a message. Please write your own message here.'
  } finally {
    busy.value = false
  }
}

async function checkAndDisplayPreview () {
  validate()
  if (!extras.value.fullName) {
    if (embracePage?.value) {
      fullNameWarning.value = embracePage?.value.data.full_name_warning
    } else {
      fullNameWarning.value = 'Your name is required'
    }
    return
  }
  if (fullNameWarning) {
    fullNameWarning.value = null
  }
  if (hasWarnings?.value) {
    busy.value = false
    return false
  }
  // TODO: Call function or use some other trigger
  // to get generated message body and message subject
  // and store it in the values passed to modal
  await getGeneratedMessage()
  showModal.value = true
}

function successRedirect () {
  navigateTo(props.successRedirectURL)
}

const bankSearchClasses = computed(() => {
  if (warningsMap?.value?.bank) {
    return 'border-red-300 tdext-red-900 placeholder-red-800 focus:border-red-300 focus:ring-red'
  }
  return 'text-gray-700'
})

const isLocal = computed(() => {
  if (process.env.NODE_ENV === 'development') {
    return true
  }
  return false
})

</script>
