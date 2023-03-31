<template>
    <div
        class="w-full flex items-center justify-center bg-primary-dark rounded-2xl px-6 lg:px-10 py-8 text-gray-50 text-center">
        <form class="flex flex-col items-center" @submit.prevent.stop="checkAndSend">
            <p class="text-xl md:text-2xl mb-6 font-semibold whitespace-pre-wrap">
                {{ title || "I pledge not to fund fossil fuels" }}
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
                <TextField class="col-span-2" v-model="firstName" name="firstName" type="text" :title="'Your first name'"
                    :placeholder="'First name, so we can say hi'" :dark="true" />
                <TextField class="col-span-2" v-model="lastName" name="lastName" type="text" :title="'Your last name'"
                    :placeholder="'Your last name'" :dark="true" />
                <TextField class="col-span-2" v-model="email" type="email" name="email" :title="'Your email address'"
                    :placeholder="'Your email address'" :warning="warningsMap['email']" :dark="true" />
                <DateField class="col-span-2" v-model="reminderDate" name="reminder"
                    :title="'When would you like to be reminded?'"
                    :placeholder="'When would you like to be reminded to switch?'" :warning="reminderWarning"
                    :dark="true" />
                <div class="col-span-2">
                    <span class="block text-sm leading-5 text-blue-100 text-opacity-75 font-medium mb-2">
                        Choose your country
                    </span>
                    <LocationSearch class="w-full text-gray-700" v-model="country" />
                </div>
                <div class="col-span-2">
                    <span class="block text-sm leading-5 text-blue-100 text-opacity-75 font-medium mb-2">
                        Choose your current bank
                    </span>
                    <BankSearch class="w-full text-gray-700" ref="bankSearch" :disabled="!country" :country="country"
                        v-model="bank" @searchInputChange="searchValue = $event">
                        <template v-slot:not-listed>
                            <p class="text-gray-500 p-4 shadow-lg">
                                We couldn't find your bank. <br />
                                But that's ok! Just type in your bank's name and leave it at that.
                            </p>
                        </template>
                    </BankSearch>
                </div>
                <CheckboxSection class="col-span-full" v-model="isAgreeMarketing" name="isAgreeMarketing"
                    :warning="warningsMap['isAgreeMarketing']" :dark="true">
                    I wish to receive more information via email from Bank.Green.</CheckboxSection>
                <CheckboxSection class="col-span-full" v-model="isAgreeTerms" name="isAgreeTerms" :dark="true"
                    :warning="warningsMap['isAgreeTerms']">
                    I have read and understood Bank.Green’s <NuxtLink to="/privacy" class="link">privacy policy
                    </NuxtLink>. </CheckboxSection>
            </div>
            <button type="submit" class="button-green w-full md:w-auto mt-6 flex justify-center" :class="{
                'pointer-events-none opacity-75': busy,
            }">
                <span v-if="!busy">
                    Sign the pledge
                </span>
                <span v-else>
                    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 561 553"
                        style="animation: ring 2s linear infinite;">
                        <path d="M478 0A481 481 0 0 0 0 485v76h75c264 0 478-217 478-485V0h-75z" fill="#6C9039" />
                    </svg>
                </span>
            </button>
        </form>
    </div>
</template>

<script setup>
import LocationSearch from '@/components/forms/location/LocationSearch.vue'
import BankSearch from '@/components/forms/banks/BankSearch.vue'
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
import TextField from '@/components/forms/TextField.vue'
import DateField from '@/components/forms/DateField.vue'

const props = defineProps({
    title: String,
    successRedirectURL: { type: String, default: '/thanks-pledge' },
})

const bank = ref(null)
const reminderDate = ref(null)
const searchValue = ref(null)
const reminderWarning = ref('')

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
    isSent,
    showWarnings,
    warningsMap,
    hasWarnings,
    send,
    busy,
} = useContactForm(
    'pledge',
    ['firstName', 'lastName', 'email', 'isAgreeTerms'],
    extras
)

const emit = defineEmits(['success'])

async function checkAndSend() {
    if (!extras.value.reminder) {
        reminderWarning.value = "Please enter a date."
        return
    }
    reminderWarning.value = ''
    if (await send()) {
        emit('success')
        navigateTo(props.successRedirectURL)
    }
}
</script>
