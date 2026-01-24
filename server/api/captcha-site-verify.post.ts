export default defineEventHandler(async event => {
  let body = await readBody(event);
  if (body instanceof Uint8Array) {
    body = JSON.parse(new TextDecoder().decode(body));
  }
  // In Cloudflare Workers, secrets are available on event.context.cloudflare.env
  const secret =
    event.context.cloudflare?.env?.NUXT_CLOUDFLARE_CAPTCHA_SECRET ||
    useRuntimeConfig().CAPTCHA_SECRET;

  const formData = new FormData();
  formData.append('secret', secret);
  formData.append('response', body.token);

  const validateCaptchaResponse = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: formData,
    }
  );
  const validateCaptchaResponseBody = await validateCaptchaResponse.json();

  // Debug logging
  console.log(
    '[Captcha Debug] Cloudflare response:',
    JSON.stringify(validateCaptchaResponseBody)
  );
  console.log('[Captcha Debug] Secret exists:', !!secret);
  console.log('[Captcha Debug] Secret length:', secret?.length);

  if (validateCaptchaResponseBody.success) {
    return {
      success: true,
    };
  } else {
    return {
      success: false,
      errorCodes: validateCaptchaResponseBody['error-codes'],
    };
  }
});
