// these functions transform the data from the backend into the format used by our frontend templates
type AccountCheckingName = 'Current' | 'Checking'

const getFeatureDict = (checkingName: AccountCheckingName) => ({
  'Mobile banking': 'Mobile Banking',
  'Free ATM network': 'Free ATM Network',
  'No overdraft fee': 'No Overdraft Fee',
  'No account maintenance fee': 'No Account Maintenance Fees',
  'checking': `${checkingName} Accounts`,
  'saving': 'Savings Accounts',
  'Interest rates': 'Interest Rates',
  'Business accounts': `Business ${checkingName} Accounts`,
  'Small business lending': 'Small Business Lending',
  'Credit cards': 'Credit Cards',
  'Mortgages or Loans': 'Mortgage or Loan Options',
  'Deposit protection': 'Deposit Protection',
  'Corporate Lending': 'Corporate Lending',
  'Business Savings Accounts': 'Business Savings Accounts',
} as const)

export type FeatureKey = keyof ReturnType<typeof getFeatureDict>
export type FeatureValue = ReturnType<typeof getFeatureDict>[keyof ReturnType<typeof getFeatureDict>]
export interface BankFeature {
  details: string | null
  offered: string
  feature: {
    name: FeatureKey
  }
}

export function getFeatures(bankFeatures: BankFeature[]): Record<FeatureValue | FeatureKey, any> | object {
  const { isBE } = useCountry()
  if (!bankFeatures) {
    return {}
  }

  const checkingName: AccountCheckingName = isBE() ? 'Current' : 'Checking'
  const featureDict = getFeatureDict(checkingName)
  // features in this dict will show an x if they are not available for a bank

  // initialize result object with all false
  const result = {} as Record<FeatureValue | FeatureKey, any> // TODO type for any
  Object.values(featureDict).forEach((v) => {
    result[v] = { isChecked: false }
  })

  for (const bankFeature of bankFeatures) {
    if (featureDict[bankFeature.feature.name]) {
      // it's a feature we're interested in
      const displayFeature = getDisplayFeature(bankFeature)
      result[featureDict[bankFeature.feature.name]] = displayFeature
    } else {
      const displayFeature = getDisplayFeature(bankFeature)
      result[bankFeature.feature.name] = displayFeature
    }
  }

  return result
}

function getDisplayFeature(bankFeature: BankFeature) {
  if (bankFeature.details) {
    return {
      isChecked: true,
      text: bankFeature.details,
    }
  }

  if (bankFeature.offered.toUpperCase() === 'YES') {
    return {
      isChecked: true,
    }
  }

  return {
    isChecked: false,
  }
}
