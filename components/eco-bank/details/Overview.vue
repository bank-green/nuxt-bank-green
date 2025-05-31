<script setup lang="ts">
import type { FeeAvailabilityEntryType, HarvestDataType } from '~/utils/types/eco-banks.type'

// props
const props = defineProps<{
  tag: string
  prismicPageData: Record<string, any> | null
  harvestData: HarvestDataType
  isHarvestDataNull: boolean
}>()

const { financialFeatures, services, policies, customersServed, institutionalInformation } = props.harvestData

// ------------------------------------
//         Utility & Data
// ------------------------------------

const yearFound = institutionalInformation?.year_founded.founded || props.prismicPageData?.founded

// Check fee availability
const isFeeAvailable = (fee?: { offered_to?: FeeAvailabilityEntryType[] }) =>
  fee?.offered_to?.some(entry => entry.available) ?? false

const isNoAccountMaintenanceFee = isFeeAvailable(financialFeatures?.fees?.available_without_account_maintenance_fee)
const isNoOverdraftFee = isFeeAvailable(financialFeatures?.fees?.available_without_overdraft_fees)
const isNoServices = Object.values(toRaw(services) || {}).every(service => !service.offered)

// format the fees detail
const feesDetail = [
  { heading: 'Account maintenance fee', description: financialFeatures?.fees.available_without_account_maintenance_fee.explanation },
  { heading: 'Overdraft fee', description: financialFeatures?.fees.available_without_overdraft_fees.explanation },
].filter(item => item.description)

// Filter out services that are not offered
const servicesDetail = Object
  .entries(services || {})
  .filter(([_, value]) => value.offered)
  .map(([key, value]) => ({
    heading: key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase()),
    description: value.additional_details,
  }))
</script>

<template>
  <div class="contain">
    <Tab
      :tab-ids="['overview']"
      justify-tab-navigation="space-around"
    >
      <template #overview-nav>
        Overview
      </template>
      <template #overview>
        <div class="grid gap-6">
          <div class="grid gap-4 md:gap-2">
            <div class="font-semibold">
              Founded in {{ yearFound }}
            </div>

            <!------- policy (desktop) ------->

            <div class="hidden md:block font-bold">
              <div v-if="policies?.deposit_protection.offered && policies?.environmental_policy.offered">
                Has deposit protection and environmental policy
              </div>
              <div v-else-if="policies?.deposit_protection.offered">
                Has deposit protection
              </div>
              <div v-else-if="policies?.environmental_policy.offered">
                Has environmental policy
              </div>
            </div>

            <!-------- policy (mobile) -------->

            <div class="grid md:hidden gap-2">
              <h3 class="font-semibold">
                Policies
              </h3>
              <div v-if="policies?.deposit_protection.offered">
                Deposit protection
              </div>
              <div v-if="policies?.environmental_policy.offered">
                Environmental protection
              </div>
            </div>
          </div>

          <div
            v-if="!isHarvestDataNull"
            class="grid md:grid-cols-[minmax(0,1fr)_minmax(100px,1fr)_minmax(max-content,1fr)] grid-cols-1 md:gap-6 gap-4 items-start"
          >
            <!-------- Customers served -------->

            <div class="grid gap-2">
              <h3 class="font-semibold">
                Customers served
              </h3>
              <div v-if="customersServed?.corporate.offered">
                Corporate
              </div>

              <div v-if="customersServed?.retail_and_individual.offered">
                Retail and Individual
              </div>
              <div v-if="customersServed?.nonprofit.offered">
                Nonprofit
              </div>
              <div v-if="customersServed?.government.offered">
                Government
              </div>
              <div v-if="customersServed?.sme.offered">
                Small and Medium Enterprises (SMEs)
              </div>
            </div>

            <!----------- Services ----------->

            <div class="grid gap-2">
              <div class=" flex items-center gap-1">
                <h3 class="font-semibold">
                  Services
                </h3>
                <EcoBankDetailsMoreDetailWithIcon
                  title="Services"
                  :content="servicesDetail"
                />
              </div>
              <div v-if="services?.local_branches.offered">
                Local branches
              </div>
              <div v-if="services?.mobile_banking.offered">
                Mobile banking
              </div>
              <div v-if="services?.ATM_network.offered">
                ATM network
              </div>
              <div v-if="isNoServices">
                -
              </div>
            </div>

            <!----------- Fees ----------->

            <div class="grid gap-2">
              <div class="flex items-center gap-1">
                <h3 class="font-semibold">
                  Fees
                </h3>
                <EcoBankDetailsMoreDetailWithIcon
                  title="Fees"
                  :content="feesDetail"
                />
              </div>
              <div v-if="isNoAccountMaintenanceFee">
                No account maintenance fee
              </div>
              <div v-if="isNoOverdraftFee">
                No overdraft fee
              </div>
            </div>
          </div>
        </div>
      </template>
    </Tab>
  </div>
</template>
