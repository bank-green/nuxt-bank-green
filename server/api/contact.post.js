export default defineEventHandler(async (event) => {
  let body = await readBody(event)
  if (body instanceof Uint8Array) {
    body = JSON.parse(new TextDecoder().decode(body))
  }
  const headers = event.node.req.headers

  const formatDate = (date) => {
    if (!date) { return undefined }
    const newDate = new Date(date)
    if (newDate) {
      return newDate.toISOString().slice(0, 10)
    } else {
      return undefined
    }
  }

  const message = {
    app_env: process.env.NODE_ENV || 'production',
    first_name: body.firstName || '',
    last_name: body.lastName || '',
    email: body.email,
    created_at: new Date().getTime(),
    message: body.message || '',
    subject: body.subject || '',
    tag: body.tag || '',
    bank: body.bank || '',
    website: body.website || '',
    bank_display_name: body.bankDisplayName || '',
    bank_name_when_not_found: body.bankNameWhenNotFound || '',
    reminder: formatDate(body.reminder) || '',
    dirty_deal_1: body.dirty_deal_1 || '',
    dirty_deal_2: body.dirty_deal_2 || '',
    rating: body.rating || '',
    country: body.country || '',
    is_agree_marketing: body.isAgreeMarketing || false,
    path: body.path || '',
    ip: headers['cf-connecting-ip'] || '',
    location: {
      country: headers['cf-ipcountry'] || '',
      region: '',
      city: headers['cf-ipcity'] || '',
      cityLatLng: [
        headers['cf-iplatitude'] || '',
        headers['cf-iplongitude'] || ''
      ]
    }
  }

  await sendZapierContact(message)

  // return {
  //   message,
  //   body,
  //   headers,
  // };
  return 'OK'
})

async function sendZapierContact (message) {
  const hookUrl =
    message && message.tag === 'contact page form'
      ? useRuntimeConfig().public.ZAPIER_UNSUBSCRIBE
      : useRuntimeConfig().public.ZAPIER_SEND
  await $fetch(hookUrl, { method: 'POST', body: message })
}
