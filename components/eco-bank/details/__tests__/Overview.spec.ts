import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Overview from '../Overview.vue';
import type { HarvestDataType } from '~/utils/types/eco-banks.type';

// Base empty object
const baseHarvest: Partial<HarvestDataType> = {
  institutionalInformation: {
    year_founded: {
      founded: 0,
      additional_details: '',
    },
  },
  customersServed: {},
  services: {},
  policies: {},
  financialFeatures: {},
};

// Factory function with typed overrides
const make = (overrides: Partial<HarvestDataType> = {}): HarvestDataType =>
  ({
    ...baseHarvest,
    ...overrides,
  }) as HarvestDataType;

// Common global stubs so we don't depend on child components/slots implementation
const globalStubs = {
  stubs: {
    // Overview renders inside a Tab with named slots; expose them directly
    Tab: {
      template:
        '<div data-testid="overview-panel"><slot name="overview" /></div>',
    },
    // ClientOnly should just render its slot content in tests
    ClientOnly: { template: '<slot />' },
    // Detail icon is not relevant in unit test
    EcoBankDetailsMoreDetailWithIcon: true,
  },
};

// ---------- Tests ----------

describe('Overview.vue', () => {
  it('renders year founded & additional details', () => {
    const wrapper = mount(Overview, {
      props: {
        harvestData: make({
          institutionalInformation: {
            year_founded: {
              founded: 1915,
              additional_details: '',
            },
          },
        }),
      },
      global: globalStubs,
    });
    expect(wrapper.text()).toContain('Founded in 1915');
  });

  it('hides Customers/Services/Policies when nothing is offered', () => {
    const wrapper = mount(Overview, {
      props: {
        harvestData: make({
          institutionalInformation: {
            year_founded: { founded: 0, additional_details: '' },
          },
          customersServed: {},
          services: {},
          financialFeatures: {},
        }),
      },
      global: globalStubs,
    });

    const text = wrapper.text().toLowerCase();
    expect(text).not.toContain('customers served');
    expect(text).not.toContain('services');
    expect(text).not.toContain('fees');
  });
  it('renders Customers served when at least one type is offered', () => {
    const wrapper = mount(Overview, {
      props: {
        harvestData: make({
          customersServed: {
            corporate: { offered: true, additional_details: '' },
            sme: { offered: false, additional_details: '' },
          } as any,
        }),
      },
      global: globalStubs,
    });

    expect(wrapper.text()).toContain('Customers served');
    expect(wrapper.text()).toMatch(/Corporate/i);
  });
  it('renders Services and lists only offered ones', () => {
    const wrapper = mount(Overview, {
      props: {
        harvestData: make({
          services: {
            mobile_banking: {
              offered: true,
              additional_details: 'iOS/Android',
              urls: [],
            },
            local_branches: {
              offered: false,
              additional_details: '',
              urls: [],
            },
          } as any,
        }),
      },
      global: globalStubs,
    });

    const text = wrapper.text();
    expect(text).toContain('Services');
    expect(text).toMatch(/Mobile/i);
    // Ensure a non-offered service label does not appear (depends on your label map)
    expect(text).not.toMatch(/Local Branches/i);
  });

  it('renders policy summary when policies are offered', () => {
    const wrapper = mount(Overview, {
      props: {
        harvestData: make({
          policies: {
            deposit_protection: { offered: true, additional_details: '' },
            environmental_policy: { offered: true, additional_details: '' },
          } as any,
        }),
      },
      global: globalStubs,
    });

    // Desktop summary usually reads: "Has deposit protection and environmental policy"
    expect(wrapper.text().toLowerCase()).toContain('deposit protection');
    expect(wrapper.text().toLowerCase()).toContain('environmental policy');
  });

  it('renders Fees items only when an explanation exists', () => {
    const w1 = mount(Overview, {
      props: {
        harvestData: make({
          financialFeatures: {
            fees: {
              available_without_account_maintenance_fee: { explanation: '' },
              available_without_overdraft_fees: { explanation: '' },
            },
          } as any,
        }),
      },
      global: globalStubs,
    });
    expect(w1.text().toLowerCase()).not.toContain('no account maintenance fee');
    expect(w1.text().toLowerCase()).not.toContain('no overdraft fee');

    const w2 = mount(Overview, {
      props: {
        harvestData: make({
          financialFeatures: {
            fees: {
              available_without_account_maintenance_fee: {
                explanation: 'No monthly fee',
              },
              available_without_overdraft_fees: { explanation: '' },
            },
          } as any,
        }),
      },
      global: globalStubs,
    });
    expect(w2.text().toLowerCase()).toContain('no account maintenance fee');
    expect(w2.text().toLowerCase()).not.toContain('no overdraft fee');
  });
});
