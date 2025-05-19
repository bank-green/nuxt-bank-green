import { computed } from 'vue'
import { customersList, depositProductsList, loanProductsList } from '~/utils/constants/eco-bank.constants'
import type {
  CustomerCategoryType,
  DepositProductsType,
  LoanProductsType,
  FinancialFeaturesType,
  LoanSectionItem,
} from '~/utils/types/eco-banks.type'

export const useEcoBankProductDisplayData = (
  tabId: CustomerCategoryType,
  depositProducts?: DepositProductsType,
  loanProducts?: LoanProductsType,
  financialFeatures?: FinancialFeaturesType,
) => {
  // ---------------------------
  // display in "Accounts" row
  // ---------------------------
  const availableDepositProductsList = computed(() =>
    depositProductsList
      .filter(product =>
        depositProducts?.[product.key]?.offered_to.customer_type?.includes(tabId),
      )
      .map((product) => {
        const interestRates = financialFeatures?.interest_rates.rates.find(
          rate =>
            rate.deposit_product === product.key
            && rate.customer_type === tabId,
        )

        const overdraftFee = financialFeatures?.fees.available_without_overdraft_fees.offered_to.find(
          fee =>
            fee.deposit_product === product.key
            && fee.customer_type === tabId,
        )

        const maintenanceFee = financialFeatures?.fees.available_without_account_maintenance_fee.offered_to.find(
          fee =>
            fee.deposit_product === product.key
            && fee.customer_type === tabId,
        )

        return {
          ...product,
          interestRates,
          fees: {
            available_without_overdraft_fees: overdraftFee,
            available_without_account_maintenance_fee: maintenanceFee,
          },
        }
      })
      .toSorted(
        (a, b) => (b.interestRates?.low_rate || 0) - (a.interestRates?.low_rate || 0),
      ),
  )

  // ---------------------------
  // display in "Loan" row
  // ---------------------------
  const availableLoanProductList = computed(() =>
    loanProductsList
      .filter(product =>
        loanProducts?.[product.key]?.offered_to?.includes(tabId),
      )
      .map(product => ({
        ...product,
        ...loanProducts?.[product.key],
      })),
  )

  // ----------------------------------------------------------------
  // Personal / Nonprodit / Government / SMEs / Corporate
  // ----------------------------------------------------------------

  const tabName = computed(() => customersList[tabId as keyof typeof customersList])

  // ----------------------------------------------------------------
  // whether harvast has any Accounts products for this customer_type
  // ----------------------------------------------------------------

  const hasNoDepositProducts = computed(() =>
    availableDepositProductsList.value.length === 0
    && availableLoanProductList.value.length === 0,
  )

  // ----------------------------------------------------------------
  // whether harvast has any fees detail for this customer_type
  // ----------------------------------------------------------------
  const hasDepositFeesDetail = availableDepositProductsList.value
    .some(product => product.fees.available_without_overdraft_fees?.available || product.fees.available_without_account_maintenance_fee?.available)

  // ----------------------------------------------------------------
  // format Data for displaying in Loan > Fees > "!" icon
  // currently NOT in used
  // ----------------------------------------------------------------

  const formatLoanData = (
    product: typeof availableLoanProductList.value[0],
    tabId: CustomerCategoryType,
  ): LoanSectionItem[] => {
    const sections: LoanSectionItem[] = [
      {
        heading: 'Explanation',
        description: product?.explanation,
      },
      {
        heading: 'Additional Details',
        description: product?.additional_details,
      },
    ]

    const currentLoan = product.rates?.find(rate => rate.customer_type === tabId)

    sections.push({
      heading: 'Interest Rates',
      description: currentLoan?.additional_details || '',
      high_rate: currentLoan?.high_rate,
      low_rate: currentLoan?.low_rate,
      type: 'rate',
    })

    return sections
  }

  return {
    availableDepositProductsList,
    availableLoanProductList,
    tabName,
    hasNoDepositProducts,
    hasDepositFeesDetail,
    formatLoanData,
  }
}
