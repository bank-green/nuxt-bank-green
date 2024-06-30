<template>
  <div
    class="flex flex-col lg:flex-row gap-24 md:gap-24 rounded-xl py-6 md:py-12 px-6 md:px-16 bg-primary-dark"
  >
    <div class="flex flex-col gap-12 md:gap-24">
      <h2
        class="w-full font-bold text-xl md:text-4xl tracking-wider text-gray-50"
      >
        {{ content?.title || "Curious about switching to a green bank?" }}
      </h2>
      <CheckList
        class="md:text-xl font-medium"
        :list="slice.items.map((i: any) => asText(i.bullet_text))"
      />
    </div>
    <div class="flex flex-col gap-6 text-left">
      <BankLocationSearch
        v-model="bank"
        :warning="warningsMap['bank']"
        dark
        hide-location
        :bank-title="content.form_bank_label || 'I am interested in'"
        @search-input-change="searchValue = $event"
      >
        <template #not-listed>
          <p class="text-gray-500 p-4 shadow-lg">
            We couldn't find your bank. <br>
            But that's ok! Just type in your bank's name and leave it at
            that.
          </p>
        </template>
      </BankLocationSearch>
      <TextField
        v-model="firstName"
        name="firstName"
        type="text"
        :title="content.form_name_label || 'First name'"
        :placeholder="'First name, so we can say hi'"
        dark
      />
      <TextField
        v-model="email"
        type="email"
        name="email"
        :title="content.form_email_label || 'Email address'"
        :placeholder="'Your email address'"
        :warning="warningsMap['email']"
        dark
      />
      <CurrentStatus v-model="currentStatus" dark :title="content.form_status_label || 'Which option best describes your current status?'" />
      <CheckboxSection
        v-model="isAgreeMarketing"
        name="isAgreeMarketing"
        :warning="warningsMap['isAgreeMarketing']"
        dark
      >
        I wish to receive more information via email from
        Bank.Green.
      </CheckboxSection>
      <CheckboxSection
        v-model="isAgreeTerms"
        name="isAgreeTerms"
        :warning="warningsMap['isAgreeTerms']"
        dark
      >
        I have read and understood Bank.Green’s
        <NuxtLink to="/privacy" class="link">
          privacy policy
        </NuxtLink>.
      </CheckboxSection>
      <vue-turnstile
        v-if="!isLocal"
        v-model="captchaToken"
        :site-key="captchaSitekey"
        theme="light"
      />
      <button
        type="submit"
        class="button-green w-full md:w-auto mt-2 flex justify-center"
        :class="{
          'pointer-events-none opacity-75': busy || !captchaVerified,
        }"
      >
        <span v-if="!busy"> {{ content.button_label || 'Complete Sign Up' }} </span>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { asText } from '@prismicio/helpers'
import { getSliceComponentProps } from '@prismicio/vue'
import VueTurnstile from 'vue-turnstile'
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
import BankLocationSearch from '@/components/forms/BankLocationSearch.vue'
import TextField from '@/components/forms/TextField.vue'
import CurrentStatus from '@/components/forms/CurrentStatus.vue'

const searchValue = ref(null)
const currentStatus = ref<string>('')
const props = defineProps(getSliceComponentProps(['slice', 'index', 'slices', 'context']))

const content = computed(() => props.slice.primary)

const { country } = useCountry()

const extras = computed(() => {
  return {
    country: country.value || '',
    bank: bank.value?.tag || '',
    bankDisplayName: bank.value?.name || '',
    rating: bank.value?.rating || '',
    bankNameWhenNotFound: (!bank.value && searchValue.value) || ''
  }
})

// Cloudflare Turnstile Captcha
const { isLocal, captchaVerified, captchaSitekey, captchaToken } = useCaptcha()

const {
  firstName,
  email,
  isAgreeTerms,
  isAgreeMarketing,
  warningsMap,
  bank,
  /*  validate, */
  busy
} = useContactForm(
  'leadGen',
  ['firstName', 'email', 'isAgreeTerms', 'bank'],
  extras
)

/* async function checkAndSend () {
  validate()
  reminderWarning.value = null
  if (await send()) {
    navigateTo(props.successRedirectURL)
  }
} */

</script>
