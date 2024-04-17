// these functions transform the data from the backend into the format used by our frontend templates
export default function getFeatures (bankFeatures) {
  const { isBE } = useCountry()
  if (!bankFeatures) {
    return {}
  }

  // features in this dict will show an x if they are not available for a bank
  const featureDict = {
    'Mobile banking': 'Mobile Banking',
    'Free ATM network': 'Free ATM Network',
    'No overdraft fee': 'No Overdraft Fee',
    'No account maintenance fee': 'No Account Maintenance Fees',
    checking: isBE() ? 'Current Accounts' : 'Checking Accounts',
    saving: 'Savings Accounts',
    'Interest rates': 'Interest Rates',
    'Business accounts': 'Business Current Accounts',
    'Small business lending': 'Small Business Lending',
    'Credit cards': 'Credit Cards',
    'Mortgage or loans': 'Mortgage or Loan Options',
    'Deposit protection': 'Deposit Protection',
    'Corporate Lending': 'Corporate Lending',
    'Business Savings Accounts': 'Business Savings Accounts'
  }

  // initialize result object with all false
  const result = {}
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

function getDisplayFeature (bankFeature) {
  if (bankFeature.details) {
    return {
      isChecked: true,
      text: bankFeature.details
    }
  }

  if (bankFeature.offered.toUpperCase() === 'YES') {
    return {
      isChecked: true
    }
  }

  return {
    isChecked: false
  }
}
