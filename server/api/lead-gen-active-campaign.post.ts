type FormFields = {
  firstName: string,
  email: string,
  2: string,
  18: string,
  19: boolean
}

export default defineEventHandler(
  async (event) => {
    try {
      let body: {formFields: FormFields} = await readBody(event)
      if (body instanceof Uint8Array) {
        body = JSON.parse(new TextDecoder().decode(body))
      }
      const secret = useRuntimeConfig().public.ACTIVE_CAMPAIGN_KEY
      const baseUrl = useRuntimeConfig().public.ACTIVE_CAMPAIGN_URL

      const reqBody = {
        contact: {
          email: body.formFields.email,
          firstName: body.formFields.firstName,
          fieldValues: [
            {
              field: '2',
              value: body.formFields[2]
            },
            {
              field: '18',
              value: body.formFields[18]
            },
            {
              field: '19',
              value: body.formFields[19]
            }
          ]
        }
      }

      // Create contact with the incoming fields
      const sendActiveCampaignForm: any = await $fetch(baseUrl + '/contacts', {
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
        // If we have a created contact, add contact to the Bank Leads list (27)
        const addContactToList: any = await $fetch(
          baseUrl + '/contactLists',
          {
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              'Api-Token': secret
            },
            method: 'POST',
            body: {
              contactList: {
                list: 27,
                contact: sendActiveCampaignForm?.contact?.id,
                status: 1
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
    } catch (e: any) {
      const _e: Error = e
      console.error(e)
      setResponseStatus(400)
      return {
        success: false,
        error: _e.message
      }
    }
  })
