<script setup lang="ts">
import VueTurnstile from 'vue-turnstile';
import CheckboxSection from '@/components/forms/CheckboxSection.vue';
import TextField from '@/components/forms/TextField.vue';

const props = withDefaults(
  defineProps<{
    tag: string;
  }>(),
  {
    tag: 'submit bank',
  }
);

// Cloudflare Turnstile Captcha
const { isLocal, captchaVerified, captchaSitekey, captchaToken } = useCaptcha();

// Create a local bank ref since this form needs a string, not an object
const bank = ref('');

const {
  firstName,
  email,
  isAgreeTerms,
  isAgreeMarketing,
  isSent,
  warningsMap,
  showWarnings,
  send,
  busy,
} = useContactForm(
  props.tag,
  ['email', 'isAgreeTerms'],
  computed(() => ({
    bank: bank.value,
  })),
  ref(undefined),
  captchaToken
);

// Manual validation for bank field
const bankWarning = computed(() => {
  if (showWarnings.value && !bank.value) {
    return 'Please tell us the name of your bank';
  }
  return '';
});

// Custom submit handler that validates bank
const handleSubmit = async () => {
  // Show warnings to trigger validation display
  showWarnings.value = true;

  // Check if bank is filled before submitting
  if (!bank.value) {
    return;
  }

  // Proceed with form submission
  await send();
};
</script>

<template>
  <div
    v-if="isSent"
    class="bg-primary-dark rounded-2xl mt-8 px-6 py-12 text-gray-50 text-center font-semibold"
  >
    Thanks, we'll let you know when we've added your bank.
  </div>
  <div
    v-else
    class="flex items-center justify-center bg-primary-dark rounded-2xl mt-8 px-6 py-12 text-gray-50 text-center font-semibold"
  >
    <div class="max-w-xl">
      <form
        class="flex flex-col justify-center items-center"
        @submit.prevent.stop="handleSubmit"
      >
        <div class="grid grid-cols-2 gap-6 text-left">
          <TextField
            v-model="bank"
            class="col-span-2"
            name="bank"
            type="text"
            :title="'Name of bank'"
            :placeholder="'Name of bank'"
            :warning="bankWarning"
            :dark="true"
          />
          <TextField
            v-model="firstName"
            class="col-span-2"
            name="firstName"
            type="text"
            :title="'Your first name (optional)'"
            :placeholder="'First name, so we can say hi'"
            :dark="true"
          />
          <TextField
            v-model="email"
            class="col-span-2"
            name="email"
            type="email"
            :title="'Your email address'"
            :placeholder="'youremail@address.com'"
            :warning="warningsMap['email']"
            :dark="true"
          />
          <CheckboxSection
            v-model="isAgreeMarketing"
            class="col-span-2"
            name="isAgreeMarketing"
            :warning="warningsMap['isAgreeMarketing']"
            :dark="true"
          >
            I wish to receive more information via email from Bank.Green.
          </CheckboxSection>
          <CheckboxSection
            v-model="isAgreeTerms"
            class="col-span-2"
            name="isAgreeTerms"
            :dark="true"
            :warning="warningsMap['isAgreeTerms']"
          >
            I have read and understood Bank.Green's
            <NuxtLink to="/privacy" class="link">privacy policy</NuxtLink>
            .
          </CheckboxSection>
          <vue-turnstile
            v-if="!isLocal"
            v-model="captchaToken"
            :site-key="captchaSitekey"
            theme="light"
            class="col-span-2"
          />
        </div>
        <button
          type="submit"
          class="button-green w-full md:w-36 mt-6 md:text-lg flex justify-center"
          :class="{
            'pointer-events-none opacity-75':
              busy || (!captchaVerified && !isLocal),
          }"
        >
          <span v-if="!busy">Submit</span>
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
  </div>
</template>
