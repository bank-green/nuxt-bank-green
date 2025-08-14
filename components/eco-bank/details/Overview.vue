<script setup lang="ts">
import { computed, toRefs } from 'vue';

import type { HarvestDataType } from '~/utils/types/eco-banks.type';

import {
  CUSTOMER_LABELS,
  SERVICE_LABELS,
  POLICY_LABELS,
  FEE_POLICIES_LABELS,
} from '~/utils/constants/sustentableBankLabels';

import { getOfferedList } from '~/utils/sustentableBankOfferedFeatures';

// props
const props = defineProps<{
  harvestData: HarvestDataType;
}>();

const {
  financialFeatures,
  services,
  policies,
  customersServed,
  institutionalInformation,
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

const hasYearFounded = computed(
  () => institutionalInformation?.value?.year_founded?.founded
);

// Build services detail safely from services
const servicesDetail = computed(() => {
  return Object.entries(services?.value || {})
    .filter(([_, service]) => service.offered)
    .map(([key, service]) => ({
      heading: SERVICE_LABELS[key] || key,
      description: service.additional_details,
    }));
});

// Build Fees detail safely from financialFeatures.fees
const feePoliciesDetails = computed(() => {
  return Object.entries(financialFeatures?.value?.fees || {})
    .filter(([_, fee]) => Boolean(fee?.explanation))
    .map(([key, fee]) => {
      return {
        heading: FEE_POLICIES_LABELS[key] || key,
        description: fee?.explanation,
      };
    });
});
</script>

<template>
  <div class="contain">
    <Tab :tab-ids="['overview']" justify-tab-navigation="space-around">
      <template #overview-nav>Overview</template>
      <template #overview>
        <div class="grid gap-6">
          <div class="grid gap-4 md:gap-2">
            <div v-if="hasYearFounded" class="font-semibold">
              Founded in {{ hasYearFounded }}
            </div>

            <!------- policy (desktop) ------->
            <section v-if="hasPolicies.length">
              <div class="hidden md:block font-bold">
                Has
                {{
                  hasPolicies
                    .map((policy: any) => policy.label.toLowerCase())
                    .join(' and ')
                }}
              </div>

              <!-------- policy (mobile) -------->
              <div class="grid md:hidden gap-2">
                <h3 class="font-semibold">Policies</h3>
                <div v-for="policy in hasPolicies" :key="policy.type">
                  {{ policy.label }}
                </div>
              </div>
            </section>
          </div>
          <!-- Overview only renders if there is any data -->
          <div
            class="grid md:grid-cols-[minmax(0,1fr)_minmax(100px,1fr)_minmax(max-content,1fr)] grid-cols-1 md:gap-6 gap-4 items-start"
          >
            <!-----------  Customers Served ----------->
            <section v-if="hasCustomersServed.length" class="grid gap-2">
              <h3 class="font-semibold">Customers served</h3>
              <div v-for="customer in hasCustomersServed" :key="customer.type">
                {{ customer.label }}
              </div>
            </section>

            <!----------- Services ----------->

            <section v-if="servicesDetail.length" class="grid gap-2">
              <div class="flex items-center gap-1">
                <h3 class="font-semibold">Services</h3>
                <EcoBankDetailsMoreDetailWithIcon
                  title="Services"
                  :content="servicesDetail"
                />
              </div>
              <div v-for="service in hasServices" :key="service.type">
                {{ service.label }}
              </div>
              <!-- <div v-if="isNoServices">-</div> -->
            </section>

            <!----------- Fees ----------->
            <section v-if="feePoliciesDetails.length" class="grid gap-2">
              <div class="flex items-center gap-1">
                <h3 class="font-semibold">Fees</h3>
                <!-- question mark icon to open a modal with more details -->
                <EcoBankDetailsMoreDetailWithIcon
                  title="Fees"
                  :content="feePoliciesDetails"
                />
              </div>
              <div
                v-if="
                  financialFeatures?.fees
                    ?.available_without_account_maintenance_fee?.explanation
                "
              >
                No account maintenance fee
              </div>
              <div
                v-if="
                  financialFeatures?.fees?.available_without_overdraft_fees
                    ?.explanation
                "
              >
                No overdraft fee
              </div>
            </section>
          </div>
        </div>
      </template>
    </Tab>
  </div>
</template>
