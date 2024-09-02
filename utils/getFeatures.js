// these functions transform the data from the backend into the format used by our frontend templates
export default function getFeatures (bankFeatures, summary = false) {
  const { isBE } = useCountry()
  if (!bankFeatures) {
    return {}
  }
  const checkingName = isBE() ? 'Current' : 'Checking'
  // features in this dict will show an x if they are not available for a bank
  const mainFeaturesDict = {
    'Mobile banking': 'Mobile Banking',
    'Free ATM network': 'Free ATM Network',
    'No overdraft fee': 'No Overdraft Fee',
    'No account maintenance fee': 'No Account Maintenance Fees'
  }

  const featureDict = {
    checking: checkingName + ' Accounts',
    saving: 'Savings Accounts',
    'Business accounts': 'Business ' + checkingName + ' Accounts',
    'Small business lending': 'Small Business Lending',
    'Mortgages or Loans': 'Mortgage or Loan Options',
    'Deposit protection': 'Deposit Protection',
    'Corporate Lending': 'Corporate Lending',
    'Business Savings Accounts': 'Business Savings Accounts',
    'Credit cards': 'Credit Cards'
  }

  // initialize result object with all false
  const result = {}
  Object.values(mainFeaturesDict).forEach((v) => {
    result[v] = { isChecked: false, hide: false }
  })
  Object.values(featureDict).forEach((v) => {
    result[v] = { isChecked: false, hide: true }
  })

  const allFeatures = {
    ...mainFeaturesDict,
    ...featureDict
  }

  for (const bankFeature of bankFeatures) {
    if (allFeatures[bankFeature.feature.name]) {
      // it's a feature we're interested in
      const displayFeature = getDisplayFeature(bankFeature, summary)
      result[allFeatures[bankFeature.feature.name]] = displayFeature
    } else {
      const displayFeature = getDisplayFeature(bankFeature, summary)
      result[bankFeature.feature.name] = displayFeature
    }
  }
  console.log(result)
  return result
}

function getDisplayFeature (bankFeature, summary) {
  if (bankFeature.details) {
    return {
      isChecked: true,
      text: summary ? bankFeature.name : bankFeature.details
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
