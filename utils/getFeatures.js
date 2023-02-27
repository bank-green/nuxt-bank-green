// these functions transform the data from the backend into the format used by our frontend templates
export default function getFeatures(item) {
    const { isBE } = useCountry()
    if (!item) {
        return {}
    }

    // my intention is to deploy the frontend with teh existing feature dict
    // to migrate the old feature.name s new ones
    // and then to get rid of this dict
    const featureDict = {
        online_only: 'Online Only',
        online_account_opening: 'Online Account Opening',
        online_banking: 'Mobile Banking',
        free_atm_withdrawal: 'Free ATM Network',
        no_overdraft_fee: 'No Overdraft Fee',
        no_account_maintenance_fee: 'No Account Maintenance Fees',

        checking: isBE() ? 'Current Accounts' : 'Checking Accounts',
        saving: 'Savings Accounts',
        interest_rates: 'Interest Rates',
        business_accounts: 'Business Accounts',
        small_business_lending: 'Small Business Lending',
        credit_cards: 'Credit Cards',
        mortgage_or_loans: 'Mortgage or Loan Options',

        free_checking: isBE() ? 'Free Checking Account Available' : 'Free Current Account Available',
        deposit_protection: 'Deposit Protection',
    }

    // initialize result object with all false
    const result = {}
    Object.values(featureDict).forEach((v) => {
        result[v] = { isChecked: false }
    })

    for (let bankFeature of item.bankFeatures) {
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

function getDisplayFeature(bankFeature) {
    if (bankFeature.details)
        return {
            isChecked: true,
            text: bankFeature.details,
        }

    if (bankFeature.offered == 'YES')
        return {
            isChecked: true,
        }

    return {
        isChecked: false,
    }
}
