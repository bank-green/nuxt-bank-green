<template>
  <div
    id="lead-gen"
    style="
      scroll-margin-top: 80px;
      background-image: url('/img/backgrounds/circle-quarter.svg');
      background-position: left bottom;
    "
    class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 rounded-xl py-6 md:py-12 px-6 md:px-16 bg-primary-dark bg-no-repeat"
  >
    <div class="flex flex-col gap-12">
      <h2
        class="w-full text-xl md:text-4xl tracking-wider text-gray-50"
        style="font-weight: 900; line-height: 3rem"
      >
        {{ content?.title || 'Curious about switching to a green bank?' }}
      </h2>
      <CheckList
        class="md:text-xl"
        :list="
          slice.items
            .map((i: any) => asText(i.bullet_text))
            .filter((i: string) => i.length > 0)
        "
      />
    </div>
    <form
      class="flex flex-col gap-6 text-left"
      @submit.prevent.stop="submitForm"
    >
      <BankLocationSearch
        v-if="getSliceBoolean(content.show_bank_field) ?? true"
        v-model="bank"
        :warning="warningsMap['bank']"
        dark
        hide-location
        :bank-title="content.form_bank_label || 'I am interested in'"
        @search-input-change="searchValue = $event"
      >
        <template #not-listed>
          <p class="text-gray-500 p-4 shadow-lg">
            We couldn't find your bank.
            <br />
            But that's ok! Just type in your bank's name and leave it at that.
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
      <CurrentStatus
        v-if="getSliceBoolean(content.show_status_field) ?? true"
        v-model="currentStatus"
        :options="statusOptions"
        dark
        :warning="warningsMap['currentStatus']"
        :title="
          content.form_status_label ||
          'Which option best describes your current status?'
        "
      />
      <CheckboxSection
        v-model="isAgreeMarketing"
        name="isAgreeMarketing"
        :warning="warningsMap['isAgreeMarketing']"
        dark
      >
        I wish to receive more information via email from Bank.Green.
      </CheckboxSection>
      <CheckboxSection
        v-model="isAgreeTerms"
        name="isAgreeTerms"
        :warning="warningsMap['isAgreeTerms']"
        dark
      >
        I have read and understood Bank.Green’s
        <NuxtLink to="/privacy" class="link">privacy policy</NuxtLink>
        .
      </CheckboxSection>
      <vue-turnstile
        v-if="!isLocal"
        v-model="captchaToken"
        :site-key="captchaSitekey"
        theme="light"
      />
      <button
        type="submit"
        class="button-green w-full md:w-auto mt-2 flex justify-center text-primary-dark"
        :class="{
          'pointer-events-none opacity-75':
            busy || (!captchaVerified && !isLocal),
        }"
      >
        <span v-if="!busy">
          {{ content.button_label || 'Complete Sign Up' }}
        </span>
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
      <span v-if="formError" class="text-red-300 font-semibold text-center">
        Something went wrong, try again!
      </span>
    </form>
  </div>
</template>

<script setup lang="ts">
import { asText } from '@prismicio/helpers';
import { getSliceComponentProps } from '@prismicio/vue';
import VueTurnstile from 'vue-turnstile';
import { getSliceBoolean } from '@/utils/prismic/conversions';
import CheckboxSection from '@/components/forms/CheckboxSection.vue';
import BankLocationSearch from '@/components/forms/BankLocationSearch.vue';
import TextField from '@/components/forms/TextField.vue';
import CurrentStatus from '@/components/forms/CurrentStatus.vue';

const searchValue = ref(null);
const props = defineProps(
  getSliceComponentProps(['slice', 'index', 'slices', 'context'])
);

const statusOptions = computed(() => {
  const options = props.slice.items.map((i: any) => i.dropdown_status_option);
  const filteredOptions = options.filter(
    (opt: null | string) =>
      opt !== 'Select none (default)' && typeof opt === 'string'
  );
  return filteredOptions.length > 0 ? filteredOptions : undefined;
});

const content = computed(() => props.slice.primary);

const { country } = useCountry();

// Cloudflare Turnstile Captcha
const { isLocal, captchaVerified, captchaSitekey, captchaToken } = useCaptcha();

const {
  firstName,
  email,
  isAgreeTerms,
  isAgreeMarketing,
  warningsMap,
  currentStatus,
  bank,
  busy,
  send,
} = useContactForm(
  'green directory',
  [
    'firstName',
    'email',
    'isAgreeTerms',
    getSliceBoolean(content.value.show_status_field) ? 'currentStatus' : '',
  ],
  computed(() => ({
    country: country.value || '',
    bank: bank.value?.tag || '',
    bankDisplayName: bank.value?.name || '',
    rating: bank.value?.rating || '',
    bankNameWhenNotFound: (!bank.value && searchValue.value) || '',
    currentStatus: currentStatus.value || '',
  })),
  ref(undefined),
  captchaToken
);

const formError = ref<boolean>(false);
const submitForm = async () => {
  if (await send()) {
    formError.value = false;
    navigateTo('/thanks');
  } else {
    formError.value = true;
  }
};
</script>
