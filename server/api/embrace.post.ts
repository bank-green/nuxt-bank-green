import { defineEventHandler, readBody } from 'h3';

const BRAND_BY_TAG_QUERY = `
query BrandByTagQuery($tag: String!) {
  brand(tag: $tag) {
    commentary { embraceCampaign { id } }
  }
}
`;

export default defineEventHandler(async event => {
  const body = await readBody<{
    bankName?: string;
    brand_tag?: string;
    name: string;
    email: string;
    hometown: string;
    background: string;
    tone?: string;
  }>(event);

  // derive a tag from bankName if brand_tag not provided
  const tag = (
    body.brand_tag ||
    body.bankName?.toLowerCase().replace(/\s+/g, '_') ||
    ''
  ).trim();

  if (!tag) {
    event.node.res.statusCode = 400;
    return { error: 'Missing brand tag or bank name.' };
  }

  // 1) get campaign id from LIVE GraphQL (server→server, no CORS)
  const gql = await fetch('https://data.bank.green/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: BRAND_BY_TAG_QUERY, variables: { tag } }),
  });
  const gqlJson = await gql.json().catch(() => ({}));
  const campaignId = gqlJson?.data?.brand?.commentary?.embraceCampaign[0]?.id;

  if (!campaignId) {
    event.node.res.statusCode = 404;
    return { error: `No campaign_id for tag "${tag}"` };
  }

  // 2) call Embrace (server→server, no CORS)
  const qs = new URLSearchParams({
    tone: body.tone || 'POLITE',
    campaign_id: String(campaignId),
  });
  const em = await fetch(
    `https://embrace-django.bank.green/api/message?${qs}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        brand_tag: tag,
        hometown: body.hometown,
        background: body.background,
      }),
    }
  );

  const payloadText = await em.text();
  const isJson = (em.headers.get('content-type') || '').includes(
    'application/json'
  );
  const payload = isJson ? JSON.parse(payloadText) : { raw: payloadText };

  return {
    campaign_id: campaignId,
    subject: payload.subject ?? payload.response?.subject ?? '',
    text: payload.text ?? payload.response?.text ?? '',
    response: payload,
    contactEmail: payload.response?.contactEmail ?? null,
    bccEmail: payload.response?.bccEmail,
  };
});
