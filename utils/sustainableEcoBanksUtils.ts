import type { FilteredBrandsQueryQuery } from '#gql'

export type EcoBankCard = {
  name: string
  features: Record<string, string[]>
  website: string
  tag: string
  topPick: boolean
  fossilFreeAlliance: boolean
}

type HarvestData = NonNullable<
  NonNullable<
    NonNullable<FilteredBrandsQueryQuery['brands']>['edges'][number]
  >['node']
>['harvestData']

const HARVEST_TO_FEATURE_TEST_EXCEPTIONS: Record<string, string> = {
  checkings_or_current: 'Checking',
  sme: 'SMEs',
  retail_and_individual: 'Personal',
  nonprofit: 'Non-profit',
}

const camelCaseToFeatureText = (word: string): string =>
  HARVEST_TO_FEATURE_TEST_EXCEPTIONS[word] ||
  word.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())

export const snakeCaseToFeatureText = (word: string): string =>
  HARVEST_TO_FEATURE_TEST_EXCEPTIONS[word] ||
  word
    .split('_')
    .map(word => {
      if (word === 'and' || word === 'or') return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')

// converts harvest data to presentable feature list
export const toEcoBankCardFeatures = (
  harvestData: HarvestData,
  isNoCredit: boolean
): EcoBankCard['features'] => {
  return (
    (
      [
        'services',
        'customersServed',
        'loanProducts',
        'depositProducts',
      ] as (keyof HarvestData)[]
    )
      // transform harvest's feature BE data into presentable a list of features
      .reduce(
        (acc, featureType) => {
          if (!harvestData) return acc
          acc[camelCaseToFeatureText(featureType)] = Object.entries(
            harvestData?.[featureType] || {}
          )
            .filter(([k, v]) => {
              if (isNoCredit && k === 'credit_cards') return false
              return (v as { offered: boolean })?.offered
            })
            .map(([k, _]) => snakeCaseToFeatureText(k))
          return acc
        },
        {} as EcoBankCard['features']
      )
  )
}

type BrandResponse = NonNullable<
  NonNullable<FilteredBrandsQueryQuery['brands']>['edges'][number]
>['node']
// sort by top_pick first, then fossil_free_alliance_rating, then by name
export const sortEcoBanks = (a: BrandResponse, b: BrandResponse) => {
  if (!a && !b) return 0
  if (!a) return 1
  if (!b) return -1
  return (
    +(b.commentary?.topPick ?? 0) - +(a.commentary?.topPick ?? 0) ||
    (b.commentary?.fossilFreeAllianceRating ?? 0) -
      (a.commentary?.fossilFreeAllianceRating ?? 0) ||
    a.name.localeCompare(b.name)
  )
}
