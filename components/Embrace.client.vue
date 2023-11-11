<template>
  <div
    class="w-full flex items-center justify-center bg-leaf-700 rounded-2xl px-6 lg:px-10 py-8 text-gray-50 text-center"
  >
    <form
      class="flex flex-col items-center"
      @submit.prevent.stop=" checkAndDisplayPreview"
    >
      <p class="text-xl md:text-2xl mb-6 font-semibold whitespace-pre-wrap">
        {{ embrace?.data.form_title || "Share your thoughts" }}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        <TextField
          v-model="fullName"
          class="col-span-2"
          name="fullName"
          type="text"
          :title="embrace?.data.full_name_label || 'Your full name'"
          :placeholder="embrace?.data.full_name_placeholder || 'Write your full name'"
          :warning="fullNameWarning"
          dark
        />
        <!-- <TextField
          v-model="lastName"
          class="col-span-2"
          name="lastName"
          type="text"
          :title="'Your last name'"
          :placeholder="'Your last name'"
          dark
        /> -->
        <div class="col-span-2">
          <span
            class="block text-sm leading-5 text-blue-100 font-semibold mb-2"
          >
            {{ embrace?.data.bank_select_label || 'Choose your current bank' }}
          </span>

          <!-- TODO need to add hover/help text ?  is this
          already in BankSearch? -->
          <BankSearch
            ref="bankSearch"
            v-model="bank"
            class="w-full text-gray-700"
            :disabled="!country"
            :country="country"
            @search-input-change="searchValue = $event"
          >
            <template #not-listed>
              <PrismicRichText :field="embrace?.data.bank_not_found" />
              <!-- <p class="text-gray-500 p-4 shadow-lg">
                We couldn't find your bank. <br>
                But that's ok! Just type in your bank's name and leave it at
                that.
              </p>-->
            </template>
          </BankSearch>
        </div>
        <TextField
          v-model="email"
          class="col-span-2"
          type="email"
          name="email"
          :title="embrace?.data.email_label"
          :placeholder="embrace?.data.email_placeholder"
          :warning="warningsMap['email']"
          dark
        />
        <TextField
          v-model="hometown"
          class="col-span-2"
          name="hometown"
          type="text"
          :title="embrace?.data.hometown_label || 'hometown'"
          :placeholder="embrace?.data.hometown_placeholder || 'hometown'"
          dark
        />
        <TextField
          v-model="background"
          class="col-span-full"
          rows="5"
          name="backgound"
          type="text"
          :title="embrace?.data.background_label || 'Your background'"
          :placeholder="embrace?.data.background_placeholder || 'Your background'"
          dark
        />
        <CheckboxSection
          v-model="isAgreeMarketing"
          class="col-span-full"
          name="isAgreeMarketing"
          dark
        >
          <PrismicRichText :field="embrace?.data.marketing_checkbox_label" />
          <!--'I wish to receive more information via email from Bank.Green.'-->
        </CheckboxSection>
        <CheckboxSection
          v-model="isAgreeTerms"
          class="col-span-full"
          name="isAgreeTerms"
          :warning="warningsMap['isAgreeTerms']"
          dark
        >
          <PrismicText :field="embrace?.data.privacy_checkbox_label" wrapper="span" />
          <!--'I have read and understood Bank.Green’s'-->
          <NuxtLink to="/privacy" class="link">
            {{
              ' ' + (embrace?.data.privacy_policy_link_text || "privacy policy")
            }}
          </NuxtLink>
          <vue-hcaptcha
            :sitekey="hcaptchSitekey"
            class="col-span-full mt-4"
          >
          </vue-hcaptcha>
        </CheckboxSection>
      </div>
      <button
        type="submit"
        class="button-green w-full md:w-auto mt-6 flex justify-center"
        :class="{'pointer-events-none opacity-75': busy}"
        @click="showModal = true"
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
    <EmbraceModal v-show="showModal" @close-modal="showModal = false" />
  </div>
</template>

<script setup>
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import BankSearch from '@/components/forms/banks/BankSearch.vue'
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
import TextField from '@/components/forms/TextField.vue'
import EmbraceModal from '@/components/EmbraceModal.vue'

const { client } = usePrismic()

// TODO: pass embracepage as a prop instead of requesting it again
const { data: embrace } = await useAsyncData('embrace', () =>
  client.getSingle('embracepage')
)

const hcaptchSitekey = useRuntimeConfig().public.HAPTCHA_SITEKEY
/*
const props = defineProps({
  successRedirectURL: { type: String, default: '/thanks-pledge' } //  THIS LINE SHOULD CHANGE
})
*/

const fullName = ref(null)
const fullNameWarning = ref(null)
const bank = ref(null)
const searchValue = ref(null)
const { country } = useCountry()
const hometown = ref(null)
const background = ref(null)

const extras = computed(() => {
  return {
    fullName: fullName.value || '',
    country: country.value || '',
    bank: bank.value?.tag || '',
    bankDisplayName: bank.value?.name || '',
    rating: bank.value?.rating || '',
    bankNameWhenNotFound: (!bank.value && searchValue.value) || '',
    hometown: hometown.value || '',
    background: background.value || ''
  }
})

// TODO: add custom warning for fullName, since this is not builtin to
//       useContactForm

const {
  email,
  isAgreeTerms,
  isAgreeMarketing,
  //  showWarnings,  // may need this to do check prior to popup?
  //  hasWarnings,  // may need this to do check prior to popup?
  warningsMap,
  //  send,  // this won't work for this page
  validate,
  busy
} = useContactForm(
  'embrace',
  ['email', 'isAgreeTerms', 'bank'],
  extras
)

// const emit = defineEmits(['success'])

// TODO We are not submitting the form, we need to display the popup, and from the
// popup generate a mailto link

function checkAndDisplayPreview () {
  validate()
  if (!extras.value.fullName) {
    fullNameWarning.value = embrace?.value.data.full_name_warning || 'Your name is required'
    return
  }
  fullNameWarning.value = null

  // TODO: show preview...
}
</script>
