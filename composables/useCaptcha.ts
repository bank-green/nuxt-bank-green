export default function useCaptcha () {
  const isLocal = computed(() => {
    if (process.env.NODE_ENV === 'development') {
      return true
    }
    return false
  })
  const captchaToken = ref<string>('')
  const captchaVerified = ref<boolean>(false)
  const captchaSitekey = useRuntimeConfig().public.CAPTCHA_SITEKEY

  const updateCaptchaToken = async (token: string) => {
    const response = await $fetch('/api/captcha-site-verify', {
      method: 'POST',
      body: {
        token
      }
    })
    response.success ? captchaVerified.value = true : captchaVerified.value = false
  }

  return {
    captchaSitekey,
    updateCaptchaToken,
    captchaVerified,
    isLocal,
    captchaToken
  }
}
