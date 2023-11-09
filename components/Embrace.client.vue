<template>
  <div
    class="w-full flex items-center justify-center bg-leaf-700 rounded-2xl px-6 lg:px-10 py-8 text-gray-50 text-center"
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
            {{ embracePage?.data.bank_select_label || 'Choose your current bank' }}
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
              <PrismicRichText :field="embracePage?.data.bank_not_found" />
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
          :title="embracePage?.data.email_label"
          :placeholder="embracePage?.data.email_placeholder"
          :warning="warningsMap['email']"
          dark
        />
        <TextField
          v-model="hometown"
          class="col-span-2"
          name="hometown"
          type="text"
          :title="embracePage?.data.hometown_label || 'hometown'"
          :placeholder="embracePage?.data.hometown_placeholder || 'hometown'"
          dark
        />
        <TextField
          v-model="background"
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
          <PrismicRichText :field="embracePage?.data.marketing_checkbox_label" />
          <!--'I wish to receive more information via email from Bank.Green.'-->
        </CheckboxSection>
        <CheckboxSection
          v-model="isAgreeTerms"
          class="col-span-full"
          name="isAgreeTerms"
          :warning="warningsMap['isAgreeTerms']"
          dark
        >
          <PrismicText :field="embracePage?.data.privacy_checkbox_label" wrapper="span" />
          <!--'I have read and understood Bank.Green’s'-->
          <NuxtLink to="/privacy" class="link">
            {{
              ' ' + (embracePage?.data.privacy_policy_link_text || "privacy policy")
            }}
          </NuxtLink>
          <vue-hcaptcha
            v-if="!isLocal"
            :sitekey="hcaptchaSitekey"
            class="col-span-full mt-4"
          />
        </CheckboxSection>
      </div>
      <button
        type=""
        class="button-green w-full md:w-auto mt-6 flex justify-center"
        :class="{'pointer-events-none opacity-75': busy}"
        @click="checkAndDisplayPreview"
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
    tag="popup"
  />
</template>

<script setup lang="ts">
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
// import { PrismicDocument } from '@prismicio/types'
import BankSearch from '@/components/forms/banks/BankSearch.vue'
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
import TextField from '@/components/forms/TextField.vue'
import EmbraceModal from '@/components/EmbraceModal.vue'

const { client } = usePrismic()

// TODO: pass embracepage as a prop instead of requesting it again
const { data: embracePage } = await useAsyncData('embrace', () =>
  client.getSingle('embracepage')
)

const hcaptchaSitekey = useRuntimeConfig().public.HAPTCHA_SITEKEY
/*
const props = defineProps({
  // embracePage: PrismicDocument<Record<string, any>, string, string> | null
  // successRedirectURL: { type: String, default: '/thanks-pledge' } //  THIS LINE SHOULD CHANGE
})
*/
/*
defineProps<{
  name: string;
  website: string;
  inheritBrandRating: {
    tag: string;
    name: string;
  };
  embracePage: PrismicDocument<Record<string, any>, string, string> | null;
}>()
*/

const fullName = ref(null)
const fullNameWarning = ref(null)
const bank = ref(null)
const searchValue = ref(null)
const { country } = useCountry()
const hometown = ref(null)
const background = ref(null)
const showModal = ref(false)

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
    console.log(embracePage)
    fullNameWarning.value = embracePage?.value.data.full_name_warning || 'Your name is required'
    return
  }
  console.log('valid')
  if (fullNameWarning) {
    fullNameWarning.value = null
  }
  showModal.value = true
  // TODO: show preview...
}

const isLocal = computed(() => {
  if (window.location.hostname === 'localhost') {
    return true
  }
  return false
})

</script>
