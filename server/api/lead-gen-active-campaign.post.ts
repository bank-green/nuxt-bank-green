type FormFields = {
  firstName: string
  email: string
  bankName: string
  status: string
  marketing: string
}

export default defineEventHandler(
  async (event) => {
    try {
      let body: { formFields: FormFields, bankLeadList: boolean } = await readBody(event)
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
              value: body.formFields.bankName,
            },
            {
              field: '18',
              value: body.formFields.status,
            },
            {
              field: '11',
              value: body.formFields.marketing,
            },
          ],
        },
      }

      // Create contact with the incoming fields
      const sendActiveCampaignForm: any = await $fetch(baseUrl + '/contact/sync', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'Api-Token': secret,
        },
        body: reqBody,
      },
      )

      if (sendActiveCampaignForm?.contact?.id?.length > 0) {
        // If we have a created contact, add contact to a list
        const addContactToList: any = await $fetch(
          baseUrl + '/contactLists',
          {
            headers: {
              'accept': 'application/json',
              'content-type': 'application/json',
              'Api-Token': secret,
            },
            method: 'POST',
            body: {
              contactList: {
                // add to Bank Lead list (27) if applicable otherwise to Unconfirmed (28)
                list: body.bankLeadList ? 27 : 28,
                contact: sendActiveCampaignForm?.contact?.id,
                status: 1,
              },
            },
          },
        )

        if (addContactToList?.contactList?.id) {
          return { success: true }
        }
      } else {
        return {
          success: false,
        }
      }
    } catch (e: any) {
      const _e: Error = e
      console.error(e)
      setResponseStatus(400)
      return {
        success: false,
        error: _e.message,
      }
    }
  })
