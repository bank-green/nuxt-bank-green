import en from "~~/lang/en.json"

const isValidCode = (code : string) : boolean => !!en && Object.keys(en).includes(`COUNTRY_${code}`)

const defaultCountry = () => {
  if (process?.server) {
    // server-side we try to read country from CF headers and locale headers

    const headers = useRequestHeaders()
    const reqCountry = headers["CF-IPCountry"] as string;
    if (isValidCode(reqCountry))
      return reqCountry

    const reqLocale = headers["accept-language"]?.split(",")[0];
    if (reqLocale) {
      const region = new Intl.Locale(reqLocale)?.region as string;
      if (isValidCode(region))
        return region
    }
  } else if (process?.client) {
    // client-side we try to read country from browser settings

    const navLang = navigator.language;
    if (navLang) {
      const region = new Intl.Locale(navLang)?.region as string;
      if (isValidCode(region))
        return region
    }
  }
  return 'US';
};

export const useCountry = () => {
  const country = useCookie('bg.country', { default: defaultCountry }) // 2-letter-code
  const isBE = () => ["UK", "IR", "GB"].includes(country.value)
  return { country, isBE }
}

