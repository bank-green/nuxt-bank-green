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

  await sendACContact(message)

  // return {
  //   message,
  //   body,
  //   headers,
  // };
  return 'OK'
})

const secret = useRuntimeConfig().public.ACTIVE_CAMPAIGN_KEY
const baseUrl = useRuntimeConfig().public.ACTIVE_CAMPAIGN_URL

async function sendACContact (message) {
  // ActiveCampaign api 
  const tag = () => {
    switch(message.tag) {
      case "FAQ bottom": return 124;
      case "partners bottom": return 24;
      case "bank ok bottom": return 101;
      case "join form": return 201;
      default: return 14 // contact page form
    }
  }

  const reqBody = {
    contact: {
      email: message.email,
      firstName: message.first_name,
      subject: message.subject,
      message: message.message,
      fieldValues: [
        {
          field: '2',
          value: message.bank_display_name
        },
        {
          field: '11',
          value: message.is_agree_marketing
        },
        {
          field: '19',
          value: message.subject
        },
        {
          field: '20',
          value: message.message
        }
      ]
    }
  }

  const sendActiveCampaignForm = await $fetch(baseUrl + '/contact/sync', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'Api-Token': secret
    },
    body: reqBody
  }
  )
  if (sendActiveCampaignForm?.contact?.id?.length > 0) {
    // If we have a created contact, add to contact the correct tag
    const addContactToList = await $fetch(
      baseUrl + '/contactTags',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'Api-Token': secret
        },
        method: 'POST',
        body: {
          contactTag: {
            contact: sendActiveCampaignForm?.contact?.id,
            tag: tag()
          }
        }
      }
    )

    if (addContactToList?.contactList?.id) {
      return { success: true }
    }
  } else {
    return {
      success: false
    }
  }
}
