import type { DepositProductsType, LoanProductsType } from '../types/eco-banks.type'

const customersList = {
  retail_and_individual: 'Personal',
  nonprofit: 'Nonprofits',
  government: 'Governments',
  sme: 'SMEs',
  corporate: 'Corporates',
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

export {
  customersList,
  depositProductsList,
  loanProductsList,
}
