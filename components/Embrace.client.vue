<template>
  <div class="w-full flex px-10 py-8">
    <div
      class="w-full flex items-center justify-center bg-white rounded-2xl px-8 py-8 text-gray-50 text-center border border-sushi"
    >
      <form
        class="flex flex-col items-center"
        @submit.prevent.stop="checkAndDisplayPreview"
      >
        <p class="text-xl md:text-2xl text-primary-dark mb-6 font-semibold whitespace-pre-wrap">
          {{ embracePage?.data.form_title || 'Send Your Break-Up Email' }}
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <TextField
            v-model="fullName"
            class="col-span-2"
            name="fullName"
            type="text"
            border-color="border-sushi-500"
            :title="embracePage?.data.full_name_label || 'Your full name'"
            :placeholder="embracePage?.data.full_name_placeholder || 'Write your full name'"
            :warning="fullNameWarning ? fullNameWarning : false"
          />
          <TextField
            v-model="form.email"
            class="col-span-2"
            type="email"
            name="email"
            border-color="border-sushi-500"
            :title="embracePage?.data.email_label || 'Email'"
            :placeholder="embracePage?.data.email_placeholder || 'email@example.com'"
            :warning="warningsMap['email']"
          />
          <BankLocationSearch
            v-model="form.bank"
            :bank-search-classes="bankSearchClasses"
            :warning="warningsMap['bank']"
            :info-tooltip-bank="embracePage?.data.bank_select_tooltip || 'For now, we are only considering certain banks for this campaign. We may add more eventually.'"
            class="col-span-2"
            :bank-title="embracePage?.data.bank_select_label || 'Choose the bank you broke up with'"
            :location-title="embracePage?.data?.country_select_label || 'Choose your country'"
            :is-embrace="true"
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
            border-color="border-sushi-500"
            name="hometown"
            type="text"
            :title="embracePage?.data.hometown_label || 'Where do you live'"
            :placeholder="embracePage?.data.hometown_placeholder || 'Enter your city'"
          />
          <TextField
            v-model="form.background"
            class="col-span-full"
            rows="5"
            border-color="border-sushi-500"
            name="backgound"
            type="text"
            :title="embracePage?.data.background_label || 'Tell us more about you'"
            :placeholder="embracePage?.data.background_placeholder || 'Why is this issue important to you?'"
          />
          <CheckboxSection
            v-model="isAgreeMarketing"
            class="col-span-full"
            name="isAgreeMarketing"
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
          >
            <PrismicText
              :field="embracePage?.data.privacy_checkbox_label"
              wrapper="span"
              fallback="I have read and understood the Bank.Green "
            />
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
          style="min-width: 20rem;"
        >
          <span v-if="!busy"> Generate Email Preview </span>
          <span v-else>
            <svg
              width="24"
              height="24"
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
  </div>

  <EmbraceModal
    v-show="showModal"
    v-model="showModal"
    v-model:message="generatedMessage"
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

type Response = {
  text: string,
  subject: string,
  unique_url: string,
  contact_emails: string
}

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
const body = ref<string>('')

const extras = computed(() => {
  return {
    fullName: fullName.value || '',
    country: country.value || '',
    bankDisplayName: bank.value || '',
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
  background,
  body
})

// const emit = defineEmits(['success'])

function searchInputChange (event: HTMLInputElement) {
  // When bank is selected fetch/update bank contact email
  if (event && form.value?.bank) {
    // For now we are getting the contact info from
    // the message end point on message generation
  }
}

// Connect to api to generate message body.
// Wait for message before showing modal.
async function getGeneratedMessage () {
  busy.value = true

  try {
    const response: Response = await $fetch('message', {
      baseURL: useRuntimeConfig().public.EMBRACE_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        name: fullName.value,
        email: email.value,
        hometown: hometown.value,
        background: background.value,
        bank_name: extras.value.bankDisplayName
      },
      parseResponse: JSON.parse
    })

    if (response?.text) {
      generatedMessage.value = response.text
      subject.value = response.subject
      uniqueUrl.value = response.unique_url || ''
      bankEmail.value = response.contact_emails || ''
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
