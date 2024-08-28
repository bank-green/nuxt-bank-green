<template>
  <div
    class="w-full flex items-center justify-center bg-leaf-700 rounded-2xl px-6 lg:px-10 py-8 text-gray-50 text-center"
  >
    <form
      class="flex flex-col items-center"
      @submit.prevent.stop="checkAndSend"
    >
      <p class="text-xl md:text-2xl mb-6 font-semibold whitespace-pre-wrap">
        {{ title || "I pledge not to fund fossil fuels" }}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        <TextField
          v-model="firstName"
          class="col-span-2"
          name="firstName"
          type="text"
          :title="'Your first name'"
          :placeholder="'First name, so we can say hi'"
          dark
        />
        <TextField
          v-model="lastName"
          class="col-span-2"
          name="lastName"
          type="text"
          :title="'Your last name'"
          :placeholder="'Your last name'"
          dark
        />
        <TextField
          v-model="email"
          class="col-span-2"
          type="email"
          name="email"
          :title="'Your email address'"
          :placeholder="'Your email address'"
          :warning="warningsMap['email']"
          dark
        />
        <DateField
          v-model="reminderDate"
          class="col-span-2"
          name="reminder"
          dark
          :title="'When would you like to be reminded?'"
          :placeholder="'When would you like to be reminded to switch?'"
          :warning="reminderWarning"
        />
        <BankLocationSearch
          v-model="bank"
          :warning="warningsMap['bank']"
          class="col-span-2"
          dark
          bank-title="Choose your current bank"
          location-title="Choose your country"
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
        <CheckboxSection
          v-model="isAgreeMarketing"
          class="col-span-full"
          name="isAgreeMarketing"
          :warning="warningsMap['isAgreeMarketing']"
          dark
        >
          I wish to receive more information via email from
          Bank.Green.
        </CheckboxSection>
        <CheckboxSection
          v-model="isAgreeTerms"
          class="col-span-full"
          name="isAgreeTerms"
          :warning="warningsMap['isAgreeTerms']"
          dark
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
        class="button-green w-full md:w-auto mt-6 flex justify-center"
        :class="{
          'pointer-events-none opacity-75': busy,
        }"
      >
        <span v-if="!busy"> Sign the pledge </span>
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
</template>

<script setup>
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
import BankLocationSearch from '@/components/forms/BankLocationSearch.vue'
import TextField from '@/components/forms/TextField.vue'
import DateField from '@/components/forms/DateField.vue'

const props = defineProps({
  title: String,
  successRedirectURL: { type: String, default: '/thanks-pledge' },
})

const reminderDate = ref(null)
const searchValue = ref(null)
const reminderWarning = ref(null)

const { country } = useCountry()

const extras = computed(() => {
  return {
    reminder: reminderDate.value || '',
    country: country.value || '',
    bank: bank.value?.tag || '',
    bankDisplayName: bank.value?.name || '',
    rating: bank.value?.rating || '',
    bankNameWhenNotFound: (!bank.value && searchValue.value) || '',
  }
})

const {
  firstName,
  lastName,
  email,
  isAgreeTerms,
  isAgreeMarketing,
  warningsMap,
  bank,
  send,
  validate,
  busy,
} = useContactForm(
  'pledge',
  ['firstName', 'lastName', 'email', 'isAgreeTerms', 'bank'],
  extras,
)

const emit = defineEmits(['success'])

async function checkAndSend() {
  validate()
  if (!extras.value.reminder) {
    reminderWarning.value = 'Please enter a date.'
    return
  }
  reminderWarning.value = null
  if (await send()) {
    emit('success')
    navigateTo(props.successRedirectURL)
  }
}
</script>
