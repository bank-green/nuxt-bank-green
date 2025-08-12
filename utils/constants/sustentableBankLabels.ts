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

export const DEPOSIT_PRODUCT_LABELS: Record<string, string> = {
  checkings_or_current: 'Checking / Current Accounts',
  savings: 'Savings',
  ISAs: 'ISAs',
  CDs: 'CDs',
  wealth_management: 'Wealth Management',
};

export const LOAN_PRODUCT_LABELS: Record<string, string> = {
  corporate_lending: 'Corporate Lending',
  small_business_lending: 'Small Business Lending',
  equipment_lending: 'Equipment Lending',
  credit_cards: 'Credit Cards',
  mortgages_or_loans: 'Mortgages / Loans',
};
