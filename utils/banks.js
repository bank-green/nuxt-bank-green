import { get } from './backend'

let gqlUrl = 'https://data.bank.green/graphql'
let options = {}


async function callBackend(query, variables) {
    const queryParam = encodeURIComponent(query)
    const variablesParam = encodeURIComponent(JSON.stringify(variables))
    const url = `${gqlUrl}?query=${queryParam}&variables=${variablesParam}`
    const res = await $fetch(url, options)
    return res
}

const commentaryFields = `{
    rating,
    ratingInherited,
    inheritBrandRating {
        tag
        name
    }
    uniqueStatement,
    headline,
    recommendedIn {
        code
    }
    fromTheWebsite,
    ourTake,
    amountFinancedSince2016,
    fossilFreeAlliance,
    subtitle,
    header,
    summary,
    details,
    fossilFreeAllianceRating,
    showOnSustainableBanksPage
  }`

const bankFeaturesFields = `{
    offered
    feature {
        name
    }
    details
}`

export async function getBanksList({
    country,
    topOnly = false,
    recommendedOnly = true,
    first = 3,
}) {
    const brandsQuery = `
        query BrandsQuery($country: String, $recommendedOnly: Boolean, $rating: [String], $first: Int, $withCommentary: Boolean = false, $withFeatures: Boolean = false) {
            brands(country: $country, recommendedOnly: $recommendedOnly, rating: $rating, first: $first, displayOnWebsite: true) {
                edges {
                    node {
                        name
                        tag
                        website,
                        aliases
                        commentary @include(if: $withCommentary) ${commentaryFields}
                        bankFeatures @include(if: $withFeatures) ${bankFeaturesFields}
                    }
                }
            }
        }`

    const variables = { country }
    if (topOnly) {
        variables.recommendedOnly = recommendedOnly
        variables.withCommentary = true // pull a lot more details in
        variables.withFeatures = true
        variables.first = first // due to data entry errors in the backend, we cannot rely on there only being three
    }

    const json = await callBackend(brandsQuery, variables)
    let banks = json.data.brands.edges.map((o) => o.node)
    if (topOnly) {
        banks = banks.map((b) => {
            return {
                ...b,
                ...b.commentary,
                rating: b.commentary?.ratingInherited?.toLowerCase() ?? 0,
            }
        })
    }
    return banks
}

export async function getBanksListWithFilter({
    country,
    regions,
    subregions,
    fossilFreeAlliance,
    features,
}) {
    const brandsQuery = `
      query BrandsQuery($country: String, $first: Int, $fossilFreeAlliance: Boolean, $features: [String], $regions: [String], $subregions: [String], $withCommentary: Boolean = false, $withFeatures: Boolean = false) {
          brands(country: $country, first: $first, fossilFreeAlliance: $fossilFreeAlliance, features: $features, regions: $regions, subregions: $subregions) {
              edges {
                  node {
                      name
                      tag
                      website,
                      aliases,
                      regions {
                        id,
                        name,
                        slug          
                      },
                      commentary @include(if: $withCommentary) ${commentaryFields}
                      bankFeatures @include(if: $withFeatures) ${bankFeaturesFields}
                  }
              }
          }
      }`

    const variables = {
        country,
        regions,
        subregions,
        fossilFreeAlliance,
        features,
        first: 300,
        withCommentary: true,
        withFeatures: true,
    }

    const json = await callBackend(brandsQuery, variables)
    let banks = json.data.brands.edges.map((o) => o.node)
    banks = banks.map((b) => {
        return {
            ...b,
            ...b.commentary,
            rating: b.commentary?.ratingInherited?.toLowerCase() ?? 0,
        }
    })
    return banks
}

export async function getCountry() {
    const cachedCountry = useCookie('bg.country.suggested', { default: () => '' })

    if (!cachedCountry.value) {
        const res = await get('/getCountry')
        if (res.country) {
            cachedCountry.value = res.country
        }
    }
    return cachedCountry
}

export async function getBankDetail(bankTag) {
    const brandQuery = `
    query BrandByTagQuery($tag: String!) {
        brand(tag: $tag) {
          tag,
          name,
          website,
          commentary ${commentaryFields},
          bankFeatures ${bankFeaturesFields}
        }
      }
    `
    const variables = {
        tag: bankTag,
    }

    const json = await callBackend(brandQuery, variables)
    if (!json?.data?.brand) return {}
    const bank = {
        ...json.data.brand,
        ...json.data.brand.commentary,
        bankFatures: json.data.brand.bankFeatures,
    }
    bank.rating = bank.ratingInherited?.toLowerCase()
    return bank
}
