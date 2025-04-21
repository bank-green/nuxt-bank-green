<script setup lang="ts">
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
import TextField from '@/components/forms/TextField.vue'

const props = withDefaults(
  defineProps<{
    tag: string
  }>(),
  {
    tag: 'submitbank',
  },
)

const {
  firstName,
  email,
  bank,
  isAgreeTerms,
  isAgreeMarketing,
  isSent,
  warningsMap,
  send,
  busy,
} = useContactForm(props.tag, ['email', 'bank', 'isAgreeTerms'], ref({}))
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
        @submit.prevent.stop="send"
      >
        <div class="grid grid-cols-2 gap-6 text-left">
          <TextField
            v-model="bank"
            class="col-span-2"
            name="bank"
            type="bank"
            :title="'Name of bank'"
            :placeholder="'Name of bank'"
            :warning="warningsMap['bank']"
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
            I wish to receive more information via email from
            Bank.Green.
          </CheckboxSection>
          <CheckboxSection
            v-model="isAgreeTerms"
            class="col-span-2"
            name="isAgreeTerms"
            :dark="true"
            :warning="warningsMap['isAgreeTerms']"
          >
            I have read and understood Bank.Green’s
            <NuxtLink
              to="/privacy"
              class="link"
            >
              privacy policy
            </NuxtLink>.
          </CheckboxSection>
        </div>
        <button
          type="submit"
          class="button-green w-full md:w-36 mt-6 md:text-lg flex justify-center"
          :class="{
            'pointer-events-none opacity-75': busy,
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
