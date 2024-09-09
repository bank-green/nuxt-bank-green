import { get } from './backend'

const gqlUrl = 'https://data.bank.green/graphql' // fallback, should be in env
const options = {}

async function callBackend (query, variables) {
  const queryParam = encodeURIComponent(query)
  const variablesParam = encodeURIComponent(JSON.stringify(variables))
  const url = `${useRuntimeConfig().public.DATA_URL || gqlUrl}?query=${queryParam}&variables=${variablesParam}`
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
    fromTheWebsite,
    amountFinancedSince2016,
    topPick,
    fossilFreeAlliance,
    fossilFreeAllianceRating,
    showOnSustainableBanksPage,
    institutionType {
        name
    }
    institutionCredentials {
        name
        prismicApiId
    }
  }`

const bankFeaturesFields = `{
    offered
    feature {
        name
    }
    details
}`

export async function getBanksList ({
  country,
  topOnly = false,
  recommendedOnly = true,
  first = 3,
  isEmbrace = false
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
  const embraceBrandsQuery = `
      query EmbraceBrandQuery {
          brandsFilteredByEmbraceCampaign(id: 1){
            name
            website
            tag
        }
      }`
  const query = isEmbrace ? embraceBrandsQuery : brandsQuery

  const variables = { country }
  if (topOnly) {
    variables.recommendedOnly = recommendedOnly
    variables.withCommentary = true // pull a lot more details in
    variables.withFeatures = true
    variables.first = first // due to data entry errors in the backend, we cannot rely on there only being three
  }

  const json = await callBackend(query, variables)
  let banks = isEmbrace ? json.data.brandsFilteredByEmbraceCampaign : json.data.brands.edges.map(o => o.node)
  if (topOnly) {
    banks = banks.map((b) => {
      return {
        ...b,
        ...b.commentary,
        rating: b.commentary?.ratingInherited?.toLowerCase() ?? 0
      }
    })
  }
  return banks
}

export async function getBanksListWithFilter ({
  country,
  regions,
  subregions,
  topPick,
  fossilFreeAlliance,
  features,
  sustainableOnly = true
}) {
  const brandsQuery = `
      query BrandsQuery($country: String, $first: Int, $topPick: Boolean, $sustainableOnly: Boolean, $fossilFreeAlliance: Boolean, $features: [String], $regions: [String], $subregions: [String], $withCommentary: Boolean = false, $withFeatures: Boolean = false) {
          brands(country: $country, first: $first, topPick: $topPick, recommendedOnly: $sustainableOnly, fossilFreeAlliance: $fossilFreeAlliance, features: $features, regions: $regions, subregions: $subregions) {
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
    topPick,
    fossilFreeAlliance,
    features,
    first: 300,
    withCommentary: true,
    withFeatures: true,
    sustainableOnly: sustainableOnly
  }

  const json = await callBackend(brandsQuery, variables)
  let banks = json.data.brands.edges.map(o => o.node)
  banks = banks.map((b) => {
    return {
      ...b,
      ...b.commentary,
      rating: b.commentary?.ratingInherited?.toLowerCase() ?? 0
    }
  })
  return banks
}

export async function getCountry () {
  const cachedCountry = useCookie('bg.country.suggested', {
    default: () => ''
  })

  if (!cachedCountry.value) {
    const res = await get('/getCountry')
    if (res.country) {
      cachedCountry.value = res.country
    }
  }
  return cachedCountry
}

export async function getBankDetail (bankTag) {
  const brandQuery = `
    query BrandByTagQuery($tag: String!) {
        brand(tag: $tag) {
          tag,
          name,
          website,
          commentary ${commentaryFields},
          bankFeatures ${bankFeaturesFields}
          countries {
            code
          }
        }
      }
    `
  const variables = {
    tag: bankTag
  }

  const json = await callBackend(brandQuery, variables)
  if (!json?.data?.brand) { return {} }
  const bank = {
    ...json.data.brand,
    ...json.data.brand.commentary,
    bankFatures: json.data.brand.bankFeatures
  }
  bank.rating = bank.ratingInherited?.toLowerCase()
  return bank
}
