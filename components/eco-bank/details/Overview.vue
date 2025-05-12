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
          <div class="grid gap-4 sm:gap-2">
            <div class="font-semibold">
              Founded in {{ prismicPageData?.founded }}
            </div>

            <!-- policy (desktop) -->
            <div class="hidden sm:block font-semibold">
              <div v-if="policies.deposit_protection.offered && policies.environmental_policy.offered">
                Has deposit protection and environmental policy
              </div>
              <div v-else-if="policies.deposit_protection.offered">
                Has deposit protection
              </div>
              <div v-else-if="policies.environmental_policy.offered">
                Has environmental policy
              </div>
            </div>

            <!-- policy (mobile) -->
            <div class="grid sm:hidden gap-2">
              <h3 class="font-semibold">
                Policies
              </h3>
              <div v-if="policies.deposit_protection.offered">
                Deposit protection
              </div>
              <div v-if="policies.environmental_policy.offered">
                Environmental protection
              </div>
            </div>
          </div>

          <div class="grid sm:grid-cols-3 grid-cols-1 sm:gap-6 gap-4 items-start">
            <!-- Customers served -->
            <div class="grid gap-2">
              <h3 class="font-semibold">
                Customers served
              </h3>
              <div v-if="customersServed.corporate.offered">
                Corporate
              </div>

              <div v-if="customersServed.retail_and_individual.offered">
                Retail and Individual
              </div>
              <div v-if="customersServed.nonprofit.offered">
                Nonprofit
              </div>
              <div v-if="customersServed.government.offered">
                Government
              </div>
              <div v-if="customersServed.sme.offered">
                Small and Medium Enterprises (SMEs)
              </div>
            </div>

            <!-- Services -->
            <div class="grid gap-2">
              <h3 class="font-semibold flex items-center gap-1">
                <span>Services</span>
                <img src="/img/icons/information.svg">
              </h3>
              <div v-if="services.local_branches.offered">
                Local branches
              </div>
              <div v-if="services.mobile_banking.offered">
                Mobile banking
              </div>
              <div v-if="services.ATM_network.offered">
                ATM network
              </div>
            </div>

            <!-- Fees -->
            <div class="grid gap-2">
              <h3 class="font-semibold flex items-center gap-1">
                <span>Fees</span>
                <EcoBankDetailsMoreDetailWithIcon
                  :content="{
                    title: 'Fees',
                    content: [
                      {
                        title: 'Account maintenance fee',
                        description: financialFeatures.fees.available_without_account_maintenance_fee.explanation,
                      },
                      {
                        title: 'Overdraft fee',
                        description: financialFeatures.fees.available_without_overdraft_fees.explanation,
                      },
                    ],
                  }"
                />
              </h3>
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

  <!-- Fees Modal -->
</template>

<script setup lang="ts">
import type { HarvestDataQueryQuery } from '#gql'

type OfferToType = {
  customer_type: string
  available: boolean
  deposit_product: string
  additional_details: string
  urls: string[]
}

const props = defineProps<{
  tag: string
  prismicPageData: Record<string, any> | null
  customersServed: NonNullable<HarvestDataQueryQuery['harvestData']>['customersServed']
  services: NonNullable<HarvestDataQueryQuery['harvestData']>['services']
  financialFeatures: NonNullable<HarvestDataQueryQuery['harvestData']>['financialFeatures']
  policies: NonNullable<HarvestDataQueryQuery['harvestData']>['policies']
}>()
const isNoAccountMaintenanceFee = props.financialFeatures.fees.available_without_account_maintenance_fee.offered_to.some((customer_type: OfferToType) => customer_type.available)
const isNoOverdraftFee = props.financialFeatures.fees.available_without_overdraft_fees.offered_to.some((customer_type: OfferToType) => customer_type.available)
</script>
