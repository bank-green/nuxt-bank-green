import * as prismicH from '@prismicio/helpers'

import { get } from './backend'
import { useBankPage } from './prismic/bankpage'

const gqlUrl = 'https://data.bank.green/graphql' // fallback, should be in env
const options = {}

export async function callBackend(query, variables) {
  const queryParam = encodeURIComponent(query)
  var url = ''
  if (variables) {
    const variablesParam = encodeURIComponent(JSON.stringify(variables))
    url = `${useRuntimeConfig().public.DATA_URL || gqlUrl}?query=${queryParam}&variables=${variablesParam}`
  } else {
    url = `${useRuntimeConfig().public.DATA_URL || gqlUrl}?query=${queryParam}`
  }
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
    description3,
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

export async function getAllBanksList() {
  const query = `
    query BrandsQuery {
      brands {
        edges {
          node {
            name
            tag
          }
        }
      }
    }`

  // Execute the GraphQL query
  const json = await callBackend(query)

  // Extract and return the name and tag from the response
  return json.data.brands.edges.map(o => ({ name: o.node.name, tag: o.node.tag }))
}

export async function getBanksList({
  country,
  topOnly = false,
  recommendedOnly = true,
  first = 3,
  isEmbrace = false,
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
  topPick,
  fossilFreeAlliance,
  features,
  sustainableOnly = true,
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
    sustainableOnly: sustainableOnly,
  }

  const json = await callBackend(brandsQuery, variables)
  let banks = json.data.brands.edges.map(o => o.node)
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
  const cachedCountry = useCookie('bg.country.suggested', {
    default: () => '',
  })

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
          commentary {
              rating,
              ratingInherited,
              inheritBrandRating {
                  tag
                  name
              }
              amountFinancedSince2016,
              topPick,
              fossilFreeAlliance,
              fossilFreeAllianceRating,
              headline,
              description1,
              description2,
              description3,
              subtitle,
              ourTake,
              showOnSustainableBanksPage,
              institutionType {
                  name
              }
              institutionCredentials {
                  name
                  prismicApiId
              }
            },
          bankFeatures ${bankFeaturesFields}
          countries {
            code
          }
        }
      }
    `
  const variables = {
    tag: bankTag,
  }

  const json = await callBackend(brandQuery, variables)
  if (!json?.data?.brand) { return {} }
  const bank = {
    ...json.data.brand,
    ...json.data.brand.commentary,
    bankFatures: json.data.brand.bankFeatures,
  }
  bank.rating = bank.ratingInherited?.toLowerCase()
  return bank
}

export async function getDefaultFields(rating, bankname, institutionType) {
  if (!bankname) {
    bankname = 'this bank'
  }
  var defaults = {
    rating: 'unknown',
    headline: `<p>Sorry, we don't know enough about ${bankname} yet.</p>`,
    subtitle: '',
    description1: `<p>Unfortunately, we don’t yet have enough information on ${bankname} to know what it’s funding. What we do know however, is that contacting ${bankname} to ask them yourself will send a powerful message – banks will have no choice but to reassess socially irresponsible funding activities if they realize their customers are concerned. To take positive action, keep on scrolling…</p>`,
    description2: `<p>Bank.Green was founded on the belief that banks have had an easy time from their customers for too long. Mass movements will pull us out of  the climate crisis – and they’ll pull ${bankname} out, too.</p>`,
    description3: '',
    description4: '',
  }
  try {
    var prismicData = null
    if (rating === 'unknown') {
      prismicData = await useBankPage('unknownbank-' + institutionType.toLowerCase().replace(' ', ''))
    } else {
      prismicData = await useBankPage(rating + 'bank')
    }
    const prismicDefaultFields = prismicData?.bankPage?.data
    if (prismicDefaultFields) {
      defaults = {
        headline: prismicH.asHTML(prismicDefaultFields.headline),
        subtitle: prismicH.asHTML(prismicDefaultFields.subtitle),
        description1: prismicH.asHTML(prismicDefaultFields.description1),
        description2: prismicH.asHTML(prismicDefaultFields.description2),
        description3: prismicH.asHTML(prismicDefaultFields.description3),
        description4: prismicH.asHTML(prismicDefaultFields.description4),
      }
    }
  } catch (e) {
    console.log(e)
  }

  return defaults
}
