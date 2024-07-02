export default defineEventHandler(async (event) => {
  let body = await readBody(event)
  if (body instanceof Uint8Array) {
    body = JSON.parse(new TextDecoder().decode(body))
  }
  const secret = useRuntimeConfig().public.ACTIVE_CAMPAIGN_SECRET
  const baseUrl = useRuntimeConfig().public.ACTIVE_CAMPAIGN_URL
  const formData = new FormData()
  body.formFields.forEach((r: {key: string, value: string}) => formData.append(r.key, r.value))

  try {
    const sendActiveCampaignForm = await fetch(
      baseUrl + '/proc.php?jsonp=true',
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + secret
        },
        method: 'POST',
        body: formData
      }
    )

    const sendActiveCampaignFormBody = await sendActiveCampaignForm.json()

    if (sendActiveCampaignFormBody.success) {
      return {
        success: true
      }
    } else {
      return {
        success: false
      }
    }
  } catch {
    return {
      success: false
    }
  }
})
