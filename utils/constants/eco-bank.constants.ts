import type {
  DepositProductsType,
  LoanProductsType,
} from '../types/eco-banks.type'

const customersList = {
  retail_and_individual: 'Personal',
  nonprofit: 'Nonprofit',
  government: 'Government',
  sme: 'SMEs',
  corporate: 'Corporate',
}

const depositProductsList = [
  { key: 'checkings_or_current', displayName: 'Checking' },
  { key: 'savings', displayName: 'Savings' },
  { key: 'ISAs', displayName: 'ISAs' },
  { key: 'CDs', displayName: 'CDs' },
  { key: 'wealth_management', displayName: 'Wealth management' },
] as {
  key: keyof DepositProductsType
  displayName: string
}[]

const loanProductsList = [
  { key: 'corporate_lending', displayName: 'Corporate lending' },
  { key: 'small_business_lending', displayName: 'Small business lending' },
  { key: 'equipment_lending', displayName: 'Equipment lending' },
  { key: 'credit_cards', displayName: 'Credit cards' },
  { key: 'mortgages_or_loans', displayName: 'Mortgages or loans' },
] as {
  key: keyof LoanProductsType
  displayName: string
}[]

const filterMapping = {
  region: 'Region',
  subregion: 'Subregion',
  individual: 'Individual',
  non_profit: 'Non-profit',
  corporate: 'Corporate',
  government: 'Government',
  checking: 'Checking',
  saving: 'Saving',
  investment: 'Investment',
  current: 'Current',
  social: 'Social',
  personal: 'Personal',
  small_business_lending: 'Small Business Lending',
  mortgages: 'Mortgages',
  corporate_lending: 'Corporate Lending',
  local_branches: 'Local Branches',
  free_atm_network: 'Free ATM Network',
  deposition_protection: 'Deposit Protection',
  no_overdraft_fee: 'No Overdraft Fees',
  mobile_banking: 'Mobile Banking',
  no_account_maintenance_fee: 'No Account Maintenance Fees',
}
export { customersList, depositProductsList, loanProductsList, filterMapping }
