<script setup lang="ts">
import VueTurnstile from 'vue-turnstile';
import CheckboxSection from '@/components/forms/CheckboxSection.vue';
import TextField from '@/components/forms/TextField.vue';
import type { ContactFormPrefill } from '@/utils/interfaces/contactForm';

const { isLocal, captchaVerified, captchaSitekey, captchaToken } = useCaptcha();

// TODO: manage in separate file
interface DetailsInterface {
  tag: string;
  name: string;
  rating: string | number | null;
  country: string;
  'dirty deal 1': any;
  'dirty deal 2': any;
}

const props = withDefaults(
  defineProps<{
    tag?: string;
    successRedirectURL?: string;
    details?: DetailsInterface | null;
    title?: string;
    prefill?: ContactFormPrefill | undefined;
  }>(),
  {
    tag: 'form tag not defined',
    successRedirectURL: '/thanks',
  }
);

const emit = defineEmits(['success']);

const router = useRouter();

const extra = computed(() => {
  if (!props.details) {
    return {};
  }
  return {
    bank: props.details.tag,
    bankDisplayName: props.details.name,
    rating: props.details.rating,
    country: props.details.country,
    dirty_deal_1: props.details['dirty deal 1'],
    dirty_deal_2: props.details['dirty deal 2'],
  };
});

const {
  firstName,
  email,
  isAgreeTerms,
  isAgreeMarketing,
  warningsMap,
  send,
  busy,
} = useContactForm(
  props.tag,
  ['email', 'isAgreeTerms', 'isAgreeMarketing'],
  extra,
  toRef(props, 'prefill')
);

const submit = async () => {
  if (await send()) {
    emit('success');
    router.push(props.successRedirectURL);
  }
};
</script>

<template>
  <div
    class="flex items-center justify-center bg-primary-dark rounded-2xl px-6 py-12 text-gray-50 text-center font-semibold"
  >
    <div class="max-w-xl">
      <p v-if="title" class="text-xl md:text-3xl mb-6">
        {{ title }}
      </p>
      <p v-else class="text-xl md:text-3xl mb-6">Take action with Bank.Green</p>

      <form
        class="flex flex-col justify-center items-center text-left"
        @submit.prevent.stop="submit"
      >
        <div class="grid grid-cols-2 gap-6">
          <TextField
            v-model="firstName"
            class="col-span-2 md:col-span-1"
            name="firstName"
            type="text"
            placeholder="First name, so we can say hi"
            :dark="true"
          />
          <TextField
            v-model="email"
            class="col-span-2 md:col-span-1"
            name="email"
            type="email"
            placeholder="Your email address"
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
            I have read and understood Bank.Green’s
            <NuxtLink to="/privacy" class="link">privacy policy</NuxtLink>
            .
          </CheckboxSection>
          <vue-turnstile
            v-if="!isLocal"
            v-model="captchaToken"
            :site-key="captchaSitekey"
            theme="light"
            class="col-span-full"
          />
        </div>
        <button
          type="submit"
          class="button-green w-full md:w-72 mt-6 md:text-lg flex justify-center text-primary-dark"
          :class="{
            'pointer-events-none opacity-75':
              busy || (!captchaVerified && !isLocal),
          }"
        >
          <span v-if="!busy">Join the Money Movement</span>
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
