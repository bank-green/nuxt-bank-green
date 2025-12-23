export default function useCaptcha() {
  const isLocal = computed(() => {
    if (process.env.NODE_ENV === 'development') {
      return true;
    }
    return false;
  });
  const captchaToken = ref<string>('');
  const captchaVerified = ref<boolean>(false);
  const captchaSitekey = useRuntimeConfig().public.CAPTCHA_SITEKEY;

  // Note: Client-side verification removed to prevent token reuse errors
  // Token is now only verified server-side when form is submitted
  // This prevents "timeout-or-duplicate" errors from Cloudflare Turnstile
  // We set captchaVerified to true when token is received to enable submit button
  watch(captchaToken, newToken => {
    captchaVerified.value = !!newToken;
  });

  return {
    captchaSitekey,
    captchaVerified,
    isLocal,
    captchaToken,
  };
}
