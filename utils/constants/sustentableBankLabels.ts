// Labels for each API key so UI is human-friendly

export const CUSTOMER_LABELS: Record<string, string> = {
  corporate: 'Corporate',
  retail_and_individual: 'Retail and Individual',
  nonprofit: 'Nonprofit',
  government: 'Government',
  sme: 'Small and Medium Enterprises (SMEs)',
};

export const SERVICE_LABELS: Record<string, string> = {
  mobile_banking: 'Mobile Banking',
  local_branches: 'Local Branches',
  ATM_network: 'ATM Network',
};

export const POLICY_LABELS: Record<string, string> = {
  environmental_policy: 'Environmental Policy',
  deposit_protection: 'Deposit Protection',
};

export const FEE_POLICIES_LABELS: Record<string, string> = {
  available_without_overdraft_fees: 'Overdraft fee',
  available_without_account_maintenance_fee: 'Account maintenance fee',
};
