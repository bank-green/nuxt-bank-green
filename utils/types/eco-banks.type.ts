// ---------------------------
// Root Response
// ---------------------------

import type { HarvestDataFilterInput } from '#gql'
import type { StateCode } from '~/components/forms/location/iso3166-2States'

export interface HarvestDataResponseType {
  data: {
    harvestData: HarvestDataType
  }
}

export interface HarvestDataType {
  depositProducts?: DepositProductsType
  services?: ServicesType
  customersServed?: CustomersServedType
  loanProducts?: LoanProductsType
  financialFeatures?: FinancialFeaturesType
  institutionalInformation?: InstitutionalInformationType
  policies?: PoliciesType
  interestRates?: null // Can replace with a type if needed
}

// ---------------------------
// Services
// ---------------------------

export interface ServicesType {
  mobile_banking: ServiceDetailType
  local_branches: ServiceDetailType
  ATM_network: ServiceDetailType
}

export interface ServiceDetailType {
  offered: boolean
  additional_details: string
  urls: string[]
}

// ---------------------------
// Customers Served
// ---------------------------

export interface CustomersServedType {
  corporate: CustomerTypeDetailType
  sme: CustomerTypeDetailType
  retail_and_individual: CustomerTypeDetailType
  nonprofit: CustomerTypeDetailType
  government: CustomerTypeDetailType
}

export interface CustomerTypeDetailType {
  offered: boolean
  additional_details: string
}

// ---------------------------
// Loan Products
// ---------------------------

export interface LoanProductsType {
  corporate_lending: LoanProductDetailWithRatesType
  small_business_lending: LoanProductDetailWithRatesType
  equipment_lending: LoanProductDetailWithRatesType
  credit_cards: LoanProductDetailWithRatesType
  mortgages_or_loans: LoanProductDetailWithRatesType
}

export interface LoanProductDetailType {
  offered: boolean
  explanation: string
  additional_details: string
  offered_to: string[]
}

export interface LoanProductDetailWithRatesType extends LoanProductDetailType {
  rates?: LoanRateDetailType[]
}

export interface LoanRateDetailType {
  customer_type: string
  additional_details: string
  high_rate: number
  low_rate: number
}

// ---------------------------
// Financial Features
// ---------------------------

export interface FinancialFeaturesType {
  interest_rates: InterestRateSectionType
  fees: FeeFeaturesType
}

// ---------------------------
// Interest Rates
// ---------------------------

export interface InterestRateSectionType {
  explanation: string
  urls: string[]
  rates: InterestRateDetailType[]
}

export interface InterestRateDetailType {
  customer_type: string
  deposit_product: string
  additional_details: string
  high_rate: number
  low_rate: number
}

// ---------------------------
// Fees
// ---------------------------
export interface FeeFeaturesType {
  available_without_overdraft_fees: FeeAvailabilityDetailType
  available_without_account_maintenance_fee: FeeAvailabilityDetailType
}

export interface FeeAvailabilityDetailType {
  explanation: string
  offered_to: FeeAvailabilityEntryType[]
}

export interface FeeAvailabilityEntryType {
  customer_type: string
  deposit_product: string
  available: boolean
  additional_details: string
  urls: string[]
}

// ---------------------------
// Institutional Information
// ---------------------------

export interface InstitutionalInformationType {
  year_founded: {
    founded: number
    additional_details: string
  }
}

// ---------------------------
// Policies
// ---------------------------

export interface PoliciesType {
  environmental_policy: PolicyDetailType
  deposit_protection: PolicyDetailType
}

export interface PolicyDetailType {
  offered: boolean
  additional_details: string
  urls: string[]
}

export interface DepositProductsType {
  checkings_or_current: DepositProductDetailType
  savings: DepositProductDetailType
  ISAs: DepositProductDetailType
  CDs: DepositProductDetailType
  wealth_management: DepositProductDetailType
}

export interface DepositProductDetailType {
  offered: boolean
  additional_details: string
  offered_to: {
    customer_type: CustomerCategoryType[]
  }
}

export type CustomerCategoryType =
  | 'retail_and_individual'
  | 'corporate'
  | 'nonprofit'
  | 'sme'
  | 'government'

export interface LoanSectionItem {
  heading: string
  description?: string
  high_rate?: number
  low_rate?: number
  type?: 'rate'
}

// ---------------------------
// Filter
// ---------------------------

export const DEFAULT_FILTER_STATE: EcoBankFilters = {
  customersServed: {
    retail_and_individual: false,
    nonprofit: false,
    sme: false,
    government: false,
  },
  depositProducts: {
    checkings_or_current: false,
    savings: false,
    ISAs: false,
    CDs: false,
    wealth_management: false,
  },
  loanProducts: {
    small_business_lending: false,
    corporate_lending: false,
    mortgages_or_loans: false,
    credit_cards: false,
  },
  services: {
    local_branches: false,
    deposition_protection: false,
    mobile_banking: false,
    ATM_network: false,
  },
}

export type EcoBankFilters = {
  customersServed: {
    retail_and_individual: boolean
    nonprofit: boolean
    sme: boolean
    government: boolean
  }
  depositProducts: {
    checkings_or_current: boolean
    savings: boolean
    ISAs: boolean
    CDs: boolean
    wealth_management: boolean
  }
  loanProducts: {
    small_business_lending: boolean
    mortgages_or_loans: boolean
    corporate_lending: boolean
    credit_cards: boolean
  }
  services: {
    mobile_banking: boolean
    local_branches: boolean
    ATM_network: boolean
    deposition_protection: boolean
  }
}

export type EcoBankAccordionState = Omit<
  {
    [K in keyof EcoBankFilters]: boolean
  },
  'stateLicensed'
>

export type EcoBanksQueryPayload = {
  harvestData: HarvestDataFilterInput | null
  stateLicensed: StateCode | null
}
