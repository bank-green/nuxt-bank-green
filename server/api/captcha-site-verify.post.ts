export default defineEventHandler(async (event) => {
  let body = await readBody(event)
  if (body instanceof Uint8Array) {
    body = JSON.parse(new TextDecoder().decode(body))
  }
  const secret = useRuntimeConfig().public.CAPTCHA_SECRET

  const formData = new FormData()
  formData.append('secret', secret)
  formData.append('response', body.token)

  const validateCaptchaResponse = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: formData,
    },
  )
  const validateCaptchaResponseBody = await validateCaptchaResponse.json()

  if (validateCaptchaResponseBody.success) {
    return {
      success: true,
    }
  } else {
    return {
      success: false,
    }
  }
})
