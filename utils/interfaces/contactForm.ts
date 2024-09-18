export interface ContactFormPrefill {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  bank: { name: string, tag?: string, rating?: string }
  isAgreeTerms: boolean
  currentStatus: string
}

export interface ContactFormWarningsMap {
  email?: string
  isAgreeTerms?: string
  isAgreeMarketing?: string
  bank?: string
  currentStatus?: string
}
