<script setup lang="ts">
import { computed, toRefs } from 'vue';

import type {
  FeeAvailabilityEntryType,
  HarvestDataType,
} from '~/utils/types/eco-banks.type';

import {
  CUSTOMER_LABELS,
  SERVICE_LABELS,
  POLICY_LABELS,
  DEPOSIT_PRODUCT_LABELS,
  LOAN_PRODUCT_LABELS,
} from '~/utils/constants/sustentableBankLabels';

import { getOfferedList } from '~/utils/sustentableBankOfferedFeatures';

// props
const props = defineProps<{
  tag: string;
  prismicPageData: Record<string, unknown> | null;
  harvestData: HarvestDataType;
  isHarvestDataNull: boolean;
}>();

const {
  financialFeatures,
  services,
  policies,
  customersServed,
  // institutionalInformation,
} = toRefs(props.harvestData);

// offered features list via shared helper
const hasCustomersServed = computed(() =>
  getOfferedList(customersServed?.value, CUSTOMER_LABELS)
);
const hasServices = computed(() =>
  getOfferedList(services?.value, SERVICE_LABELS)
);
const hasPolicies = computed(() =>
  getOfferedList(policies?.value, POLICY_LABELS)
);
// overview visibility: render only if any section has data
// const hasAnyHarvestData = computed(() => hasCustomersServed.value);

// ------------------------------------
//         Utility & Data
// ------------------------------------

// Check fee availability
// const isFeeAvailable = (fee?: { offered_to?: FeeAvailabilityEntryType[] }) =>
//   fee?.offered_to?.some(entry => entry.available) ?? false;

// const isNoAccountMaintenanceFee = isFeeAvailable(
//   financialFeatures?.fees?.available_without_account_maintenance_fee
// );

// const isNoOverdraftFee = isFeeAvailable(
//   financialFeatures?.fees?.available_without_overdraft_fees
// );

// const isNoServices = Object.values(toRaw(services) || {}).every(
//   service => !service.offered
// );

// format the fees detail
// const feesDetail = [
//   {
//     heading: 'Account maintenance fee',
//     description:
//       financialFeatures?.fees.available_without_account_maintenance_fee
//         .explanation,
//   },
//   {
//     heading: 'Overdraft fee',
//     description:
//       financialFeatures?.fees.available_without_overdraft_fees.explanation,
//   },
// ].filter(item => item.description);

// Filter out services that are not offered
const servicesDetail = Object.entries(services?.value || {})
  .filter(([_, value]) => value.offered)
  .map(([key, value]) => ({
    heading: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: value.additional_details,
  }));
</script>

<template>
  <div class="contain">
    <Tab :tab-ids="['overview']" justify-tab-navigation="space-around">
      Services {{ services }}
      <template #overview-nav>Overview</template>
      <template #overview>
        <pre>Services: {{ services }}</pre>
        <div class="grid gap-6">
          <div class="grid gap-4 md:gap-2">
            <!-- <div class="font-semibold"> 
              Founded in {{ year }}
            </div> -->

            <!------- policy (desktop) ------->

            <section class="hidden md:block font-bold">
              <div v-for="policie in hasPolicies" :key="policie.type">
                Has {{ policie.label.toLowerCase() }}
              </div>
              <div
                v-if="
                  policies?.deposit_protection.offered &&
                  policies?.environmental_policy.offered
                "
              >
                Has deposit protection and environmental policy
              </div>
              <div v-else-if="policies?.deposit_protection.offered">
                Has deposit protection
              </div>
              <div v-else-if="policies?.environmental_policy.offered">
                Has environmental policy
              </div>
            </section>

            <!-------- policy (mobile) -------->

            <div class="grid md:hidden gap-2">
              <h3 class="font-semibold">Policies</h3>
              <div v-if="policies?.deposit_protection.offered">
                Deposit protection
              </div>
              <div v-if="policies?.environmental_policy.offered">
                Environmental protection
              </div>
            </div>
          </div>
          <!-- Overview only renders if there is any data -->
          <div
            class="grid md:grid-cols-[minmax(0,1fr)_minmax(100px,1fr)_minmax(max-content,1fr)] grid-cols-1 md:gap-6 gap-4 items-start"
          >
            <!-----------  Customers Served ----------->
            <section v-if="hasCustomersServed">
              <h3 class="font-semibold">Customers served</h3>
              <div v-for="customer in hasCustomersServed" :key="customer.type">
                {{ customer.label }}
              </div>
            </section>

            <!----------- Services ----------->

            <section class="grid gap-2">
              <div class="flex items-center gap-1">
                <h3 class="font-semibold">Services</h3>
                <!-- <EcoBankDetailsMoreDetailWithIcon
                  title="Services"
                  :content="servicesDetail"
                /> -->
              </div>
              <div v-for="service in hasServices" :key="service.type">
                {{ service.label }}
              </div>
              <!-- <div v-if="isNoServices">-</div> -->
            </section>

            <!----------- Fees ----------->

            <div class="grid gap-2">
              <div class="flex items-center gap-1">
                <h3 class="font-semibold">Fees</h3>
                <!-- <EcoBankDetailsMoreDetailWithIcon
                  title="Fees"
                  :content="feesDetail"
                /> -->
              </div>
              <!-- <div v-if="isNoAccountMaintenanceFee">
                No account maintenance fee
              </div> -->
              <div v-if="isNoOverdraftFee">No overdraft fee</div>
            </div>
          </div>
        </div>
      </template>
    </Tab>
  </div>
</template>
