import { get } from './backend'

const gqlUrl = 'https://data.bank.green/graphql' // fallback, should be in env
const options = {}

async function callBackend(query, variables) {
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

export function getDefaultFields(rating, bankname) {
  if (!bankname) {
    bankname = 'this bank'
  }
  const descriptions = [
    {
      rating: 'unknown',
      headline: `<p>Sorry, we don't know enough about ${bankname} yet.</p>`,
      subtitle: '',
      description1: `<p>Unfortunately, we don’t yet have enough information on ${bankname} to know what it’s funding. What we do know however, is that contacting ${bankname} to ask them yourself will send a powerful message – banks will have no choice but to reassess socially irresponsible funding activities if they realize their customers are concerned. To take positive action, keep on scrolling…</p>`,
      description2: `<p>Bank.Green was founded on the belief that banks have had an easy time from their customers for too long. Mass movements will pull us out of  the climate crisis – and they’ll pull ${bankname} out, too.</p>`,
      description3: '<p>test</p>',
      description4: '',
    },
    {
      rating: 'great',
      headline: '<p> Your bank is great. </p>',
      subtitle: '',
      description1: `<p>Your money is definitely not funding the fossil fuel industry. We can’t be sure of everything that ${bankname} is doing, but at least your money is not enabling gas, oil, or coal extraction.</p><p>We hope this makes you feel tremendous (boasting is encouraged), but don’t put your feet up just yet – scroll down to discover the next step!</p>`,
      description2: '<p>Bank.Green was founded on the belief that banks have had an easy time  from their customers for too long. </p>',
      description3: '<p>Our mission is to encourage as many people as possible to take a stand -  to refuse to let their money fuel environmental destruction any longer. Considering who you bank with, we think you probably agree. This is  your chance to spread the word with us.</p>',
      description4: '',
    },
    {
      rating: 'good',
      headline: '<p>Your bank is good.</p>',
      subtitle: '',
      description1: `<p>Good news - ${bankname} is entirely or almost entirely divested from fossil fuels. What's more, we have found positive evidence that they care about the environment. Fossil finance makes up less than 1% of their total financing and over 80% of their energy financing going towards low-carbon technologies including renewables. This is in line with the Paris agreement. Banks like yours are either part of the Global Alliance on Banking Values or may have fossil fuels as legacy investments that they cannot responsibly sell.</p>`,
      description2: '<p>Bank.Green was founded on the belief that banks have had an easy time from their customers for too long. </p>',
      description3: '<p>Our mission is to encourage as many people as possible to take a stand -  to refuse to let their money fuel environmental destruction any longer. Considering who you bank with, we think you probably agree. This is your chance to spread the word with us.</p>',
      description4: '',
    },
    {
      rating: 'ok',
      headline: '<p>Your bank is doing OK.</p>',
      subtitle: '',
      description1: `<p>The good news is that ${bankname} is not a leading fossil fuel funder and we have found positive evidence that they care about the environment. The bad news is that either a) we haven’t yet been able to confirm for certain that it does not fund fossil fuels or b) it funds at least four times more renewables than fossil fuels, but it still funds fossil fuels.</p>`,
      description2: `<p>Bank.Green believes that mass movements will pull us out of the climate crisis – and they’ll pull ${bankname} out, too.</p>`,
      description3: `<p>We were founded on the belief that banks have had an easy time from their customers for too long. Our mission is to encourage as many people as possible to take a stand - to refuse to let their money fuel environmental destruction any longer. Join us in building this movement by pressuring ${bankname} to do better, or by taking your money to somewhere that cares about our planet's future.</p>`,
      description4: '',
    },
    {
      rating: 'bad',
      headline: '<p>Your money is most likely funding the climate crisis.</p>',
      subtitle: '',
      description1: `<p>Your bank doesn't top the charts, but we suspect it’s still using your money to lend to fossil fuel companies and projects that are rapidly accelerating the climate crisis.</p>`,
      description2: '<p>Financial institutions in this category have shown a weak commitment to environmental sustainability and transparency.</p>',
      description3: '<p>If they engage in energy financing, they are likely to lend far more to fossil fuels than renewable sources. They may have limited or no effective policies to improve their climate impact and may lack meaningful targets for reducing the emissions they are responsible for. While they might show some engagement in sustainable practices or offer certain green lending products, these efforts are insufficiently developed or prominently displayed to make a significant impact.</p>',
      description4: '<p>Your bank may be ignoring the Paris Agreement.</p>',
    },
    {
      rating: 'worst',
      headline: '<p>Your money is likely funding the climate crisis at an alarming rate.</p>',
      subtitle: '',
      description1: `<p>In the 7 years since the Paris Agreement, banks like ${bankname} have funneled $5.5 trillion into coal, oil, and gas, rapidly accelerating the climate crisis.</p><p>Details here</p>`,
      description2: `<p>While you’ve been saving money for a home or a weekend get-away, ${bankname} has likely been using your savings to lend to some very questionable fossil fuel friends.</p><p>Banks like this one have demonstrated that they're not interested in fighting in the climate crisis. While banks don't publish all of their lending information, we can see that this bank has positioned itself well to fund fossil fuels. We can also see its lack of interest in doing climate-positive things like measuring and disclosing its total emissions or stating that it doesn't fund fossil fuels. We've therefore given it our lowest rating.</p>`,
      description3: '',
      description4: '<p>Your bank may be ignoring the Paris Agreement.</p>',
    },
  ]
  return descriptions.find(bank => bank.rating.toLowerCase() === rating.toLowerCase()) || descriptions[0];
}
