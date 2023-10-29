<template>
  <div
    class="w-full flex items-center justify-center bg-leaf-700 rounded-2xl px-6 lg:px-10 py-8 text-gray-50 text-center"
  >
    <form
      class="flex flex-col items-center"
      @submit.prevent.stop="checkAndSend"
    >
      <p class="text-xl md:text-2xl mb-6 font-semibold whitespace-pre-wrap">
        {{ title || "Share your thoughts" }}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        <TextField
          v-model="fullName"
          class="col-span-2"
          name="fullName"
          type="text"
          :title="'Your full name'"
          :placeholder="'Full name, so we can say hi'"
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
            Choose your current bank
          </span>
          <BankSearch
            ref="bankSearch"
            v-model="bank"
            class="w-full text-gray-700"
            :disabled="!country"
            :country="country"
            @search-input-change="searchValue = $event"
          >
            <template #not-listed>
              <p class="text-gray-500 p-4 shadow-lg">
                We couldn't find your bank. <br>
                But that's ok! Just type in your bank's name and leave it at
                that.
              </p>
            </template>
          </BankSearch>
        </div>
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
        <TextField
          v-model="hometown"
          class="col-span-2"
          name="hometown"
          type="text"
          :title="'Your hometown (optional)'"
          :placeholder="'Your hometown (optional)'"
          dark
        />
        <TextField
          v-model="backgound"
          class="col-span-full"
          name="backgound"
          type="text"
          :title="'What is your background?'"
          :placeholder="'What is your background?'"
          dark
        />
        <TextField
          v-model="embraceText"
          class="col-span-full"
          name="embraceText"
          type="text"
          :title="'Why do you think it\'s important for the bank to embrace a sustainability policy?'"
          :placeholder="'Why do you think it\'s important for the bank to embrace a sustainability policy?'"
          dark
        />
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
          <NuxtLink to="/privacy" class="link">
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
</template>

<script setup>
import BankSearch from '@/components/forms/banks/BankSearch.vue'
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
import TextField from '@/components/forms/TextField.vue'

const props = defineProps({
  title: String,
  successRedirectURL: { type: String, default: '/thanks-pledge' } //  THIS LINE SHOULD CHANGE
})

const bank = ref(null)
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
    bankNameWhenNotFound: (!bank.value && searchValue.value) || ''
  }
})

const {
  fullName,
  email,
  isAgreeTerms,
  isAgreeMarketing,
  warningsMap,
  send,
  validate,
  busy
} = useContactForm(
  'pledge',
  ['firstName', 'lastName', 'email', 'isAgreeTerms'],
  extras
)

const emit = defineEmits(['success'])

async function checkAndSend () {
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
