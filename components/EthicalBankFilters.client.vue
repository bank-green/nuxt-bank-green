<template>
    <div @click="toggleFilters"
        class="bg-white hover:bg-gray-50 px-5 py-4 md:py-0 md:px-0 md:bg-transparent md:hover:bg-transparent cursor-pointer md:cursor-auto flex items-center"
        :class="{
            'rounded-xl': !showFilters,
            'rounded-t-xl': showFilters,
        }">
        <h4 class="font-semibold text-left md:text-xl">Filter</h4>

        <button v-if="isFilterDirty" @click="setDefaultFilter"
            class="ml-6 text-sm text-sushi-500 hover:text-sushi-600 font-semibold focus:outline-none">
            Reset
        </button>
    </div>

    <div class="flex flex-col bg-gray-50 md:bg-transparent px-5 py-4 md:py-0 md:px-0" v-show="showFilters">
        <h5 class="text-xs uppercase font-semibold md:mt-6 mb-2">Location</h5>
        <div class="flex flex-col space-y-1">
            <CheckboxSection class="col-span-full" v-model="searchByLocation" name="local_branches">
                Local branches</CheckboxSection>
            <RegionSearch v-if="searchByLocation" class="pb-4 md:max-w-sm md:mx-auto z-30" ref="regionPicker"
                @select="onSelectLocation" />
            <CheckboxSection class="col-span-full" v-model="filterPayload.location.online_only" name="online_only">
                Online only</CheckboxSection>
        </div>

        <h5 class="text-xs uppercase font-semibold mt-6 mb-2">
            Fossil Free Alliance
        </h5>
        <CheckboxSection class="col-span-full" v-model="filterPayload.fossilFreeAlliance" name="fossilFreeAlliance">
            Fossil Free Alliance</CheckboxSection>

        <h5 class="text-xs uppercase font-semibold mt-6 mb-2">Convenience</h5>
        <div class="flex flex-col space-y-1">
            <CheckboxSection class="col-span-full" v-model="filterPayload.convenience.online_account_opening"
                name="online_account_opening">
                Online account opening</CheckboxSection>
            <CheckboxSection class="col-span-full" v-model="filterPayload.convenience.online_banking"
                name="online_banking">
                Mobile banking</CheckboxSection>
            <CheckboxSection class="col-span-full" v-model="filterPayload.convenience.free_atm_withdrawal"
                name="free_atm_withdrawal">
                Free ATM network</CheckboxSection>
            <CheckboxSection class="col-span-full" v-model="filterPayload.convenience.no_overdraft_fee"
                name="no_overdraft_fee">
                No overdraft fee</CheckboxSection>
            <CheckboxSection class="col-span-full" v-model="filterPayload.convenience.no_account_maintenance_fee"
                name="no_account_maintenance_fee">
                No account maintenance fees</CheckboxSection>
        </div>

        <h5 class="text-xs uppercase font-semibold mt-6 mb-2">Bank Accounts</h5>
        <div class="flex flex-col space-y-1">
            <CheckboxSection class="col-span-full" v-model="filterPayload.bankAccounts.checking" name="checking">
                {{
                        isBE() ? 'Current accounts' : 'Checking accounts'
                }}</CheckboxSection>
            <CheckboxSection class="col-span-full" v-model="filterPayload.bankAccounts.saving" name="saving">
                Savings accounts</CheckboxSection>
            <CheckboxSection class="col-span-full" v-model="filterPayload.bankAccounts.interest_rates"
                name="interest_rates">
                Interest rates</CheckboxSection>
            <CheckboxSection class="col-span-full" v-model="filterPayload.bankAccounts.business_accounts"
                name="business_accounts">
                Business accounts</CheckboxSection>
            <CheckboxSection class="col-span-full" v-model="filterPayload.bankAccounts.small_business_lending"
                name="small_business_lending">
                Small business lending</CheckboxSection>
            <CheckboxSection class="col-span-full" v-model="filterPayload.bankAccounts.credit_cards"
                name="credit_cards">
                Credit cards</CheckboxSection>
            <CheckboxSection class="col-span-full" v-model="filterPayload.bankAccounts.mortgage_or_loans"
                name="mortgage_or_loans">
                Mortgage or loan options
            </CheckboxSection>
        </div>

        <h5 class="text-xs uppercase font-semibold mt-6 mb-2">Security</h5>
        <CheckboxSection class="col-span-full" v-model="filterPayload.security.deposit_protection"
            name="deposit_protection">
            Deposit protection</CheckboxSection>
    </div>
</template>

<script setup>
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
import RegionSearch from '@/components/forms/RegionSearch.vue'

const { isBE } = useCountry()
const emit = defineEmits(['filter'],)
const props = defineProps({
    location: String,
})
const searchByLocation = ref(false)
const onSelectLocation = (payload) => {
    if (!payload) {
        filterPayload.value.region = null
        filterPayload.value.subregion = null
    } else if (payload.type === 'subregion') {
        filterPayload.value.region = null
        filterPayload.value.subregion = payload.value
    } else {
        filterPayload.value.region = payload.value
        filterPayload.value.subregion = null
    }
}

const getDefaultFilter = () => ({
    region: null,
    subregion: null,
    location: {
        online_only: false,
    },
    fossilFreeAlliance: false,
    convenience: {
        online_account_opening: false,
        online_banking: false,
        free_atm_withdrawal: false,
        no_overdraft_fee: false,
        no_account_maintenance_fee: false,
    },
    bankAccounts: {
        checking: false,
        saving: false,
        interest_rates: false,
        business_accounts: false,
        small_business_lending: false,
        credit_cards: false,
        mortgage_or_loans: false,
    },
    security: {
        deposit_protection: false,
    },
})

const filterPayload = ref(getDefaultFilter())

const isFilterDirty = computed(
    () =>
        JSON.stringify(filterPayload.value) !==
        JSON.stringify(getDefaultFilter())
)

const parsedFilterPayload = computed(() => {
    return {
        regions: filterPayload.value.region
            ? [filterPayload.value.region]
            : undefined,
        subregions: filterPayload.value.subregion
            ? [filterPayload.value.subregion]
            : undefined,
        fossilFreeAlliance: filterPayload.value.fossilFreeAlliance
            ? filterPayload.value.fossilFreeAlliance
            : undefined,
        features: [
            ...Object.keys(filterPayload.value.location).filter(
                (key) => filterPayload.value.location[key]
            ),
            ...Object.keys(filterPayload.value.convenience).filter(
                (key) => filterPayload.value.convenience[key]
            ),
            ...Object.keys(filterPayload.value.bankAccounts).filter(
                (key) => filterPayload.value.bankAccounts[key]
            ),
            ...Object.keys(filterPayload.value.security).filter(
                (key) => filterPayload.value.security[key]
            ),
        ],
    }
})

watch(
    filterPayload,
    () => {
        emit('filter', parsedFilterPayload.value)
    },
    { deep: true }
)

watch(searchByLocation, () => {
    filterPayload.value.region = null
    filterPayload.value.subregion = null
})

onMounted(() => emit('filter', parsedFilterPayload.value))

const setDefaultFilter = () => {
    filterPayload.value = getDefaultFilter()
}
watch(
    () => props.location,
    () => {
        setDefaultFilter()
    }
)

const forceShowMobile = ref(false)
const showFilters = computed(() => {
    return forceShowMobile.value || window.innerWidth >= 768
})
const toggleFilters = () => {
    forceShowMobile.value = !forceShowMobile.value
}
</script>
