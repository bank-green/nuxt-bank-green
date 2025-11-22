interface ContactRequestBody {
  firstName?: string;
  lastName?: string;
  email: string;
  message?: string;
  subject?: string;
  tag?: string;
  bank?: string;
  website?: string;
  bankDisplayName?: string;
  bankNameWhenNotFound?: string;
  reminder?: string;
  dirty_deal_1?: string;
  dirty_deal_2?: string;
  rating?: string;
  country?: string;
  isAgreeMarketing?: boolean;
  path?: string;
  currentStatus?: string;
  captchaToken?: string;
}

interface ContactMessage {
  app_env: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: number;
  message: string;
  subject: string;
  tag: string;
  bank: string;
  website: string;
  bank_display_name: string;
  bank_name_when_not_found: string;
  reminder: string | undefined;
  dirty_deal_1: string;
  dirty_deal_2: string;
  rating: string;
  country: string;
  is_agree_marketing?: boolean;
  path: string;
  current_status: string;
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    cityLatLng: [string, string];
  };
}

interface ActiveCampaignContact {
  email: string;
  firstName: string;
  subject: string;
  message: string;
  fieldValues: Array<{
    field: string;
    value: string | boolean | undefined;
  }>;
}

interface ActiveCampaignResponse {
  contact?: {
    id?: string;
  };
}

interface ContactTagResponse {
  contactList?: {
    id?: string;
  };
}

export default defineEventHandler(async event => {
  let body = await readBody(event);
  if (body instanceof Uint8Array) {
    body = JSON.parse(new TextDecoder().decode(body)) as ContactRequestBody;
  }
  const headers = event.node.req.headers;

  // Validate captcha token (skip in development)
  if (process.env.NODE_ENV !== 'development') {
    if (!body.captchaToken) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Captcha token is required',
      });
    }

    try {
      const captchaVerification = await $fetch<{ success: boolean }>(
        '/api/captcha-site-verify',
        {
          method: 'POST',
          body: {
            token: body.captchaToken,
          },
        }
      );

      if (!captchaVerification.success) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Captcha verification failed',
        });
      }
    } catch (error) {
      if (error instanceof Error && 'statusCode' in error) {
        throw error;
      }
      throw createError({
        statusCode: 400,
        statusMessage: 'Captcha verification failed',
      });
    }
  }

  const formatDate = (date?: string): string | undefined => {
    if (!date) {
      return undefined;
    }
    const newDate = new Date(date);
    if (newDate) {
      return newDate.toISOString().slice(0, 10);
    } else {
      return undefined;
    }
  };

  const message: ContactMessage = {
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
    is_agree_marketing: body.isAgreeMarketing,
    path: body.path || '',
    current_status: body.currentStatus || '',
    ip: (headers['cf-connecting-ip'] as string) || '',
    location: {
      country: (headers['cf-ipcountry'] as string) || '',
      region: '',
      city: (headers['cf-ipcity'] as string) || '',
      cityLatLng: [
        (headers['cf-iplatitude'] as string) || '',
        (headers['cf-iplongitude'] as string) || '',
      ],
    },
  };

  await sendACContact(message);

  return 'OK';
});

const secret = useRuntimeConfig().public.ACTIVE_CAMPAIGN_KEY;
const baseUrl = useRuntimeConfig().public.ACTIVE_CAMPAIGN_URL;

async function sendACContact(
  message: ContactMessage
): Promise<{ success: boolean } | undefined> {
  const tag = (): number => {
    switch (message.tag) {
      case 'FAQ bottom':
        return 124;
      case 'partners bottom':
        return 24;
      case 'index bottom':
        return 11;
      case 'join form':
        return 201;
      case 'not listed bottom':
        return 26;
      case 'contact page form':
        return 14;
      case 'green directory':
        return 878;
      case 'green bank':
        return 879;
      case 'form tag not defined':
      default:
        console.error('ActiveCampaign form used without a tag defined.');
        return 8;
    }
  };

  const reqBody: { contact: ActiveCampaignContact } = {
    contact: {
      email: message.email,
      firstName: message.first_name,
      subject: message.subject,
      message: message.message,
      fieldValues: [
        {
          field: '2',
          value: message.bank_display_name,
        },
        {
          field: '11',
          value: message.is_agree_marketing,
        },
        {
          field: '18',
          value: message.current_status,
        },
        {
          field: '19',
          value: message.subject,
        },
        {
          field: '20',
          value: message.message,
        },
      ],
    },
  };

  const sendActiveCampaignForm = await $fetch<ActiveCampaignResponse>(
    baseUrl + '/contact/sync',
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Api-Token': secret,
      },
      body: reqBody,
    }
  );
  if (
    sendActiveCampaignForm?.contact?.id?.length &&
    sendActiveCampaignForm.contact.id.length > 0
  ) {
    // If we have a created contact, add to contact the correct tag
    const addContactToList = await $fetch<ContactTagResponse>(
      baseUrl + '/contactTags',
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'Api-Token': secret,
        },
        method: 'POST',
        body: {
          contactTag: {
            contact: sendActiveCampaignForm?.contact?.id,
            tag: tag(),
          },
        },
      }
    );

    if (addContactToList?.contactList?.id) {
      return { success: true };
    }
  } else {
    return {
      success: false,
    };
  }
}
