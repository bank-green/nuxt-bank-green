export type EcoBankCard = {
  name: string
  features: {
    services: string[]
    customersServed: string[]
    loanProducts: string[]
    depositProducts: string[]
  }
  website: string
  tag: string
  topPick: boolean
  fossilFreeAlliance: boolean
}
