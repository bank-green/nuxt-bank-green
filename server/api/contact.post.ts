// import { Firestore } from "@google-cloud/firestore";
// import admin from "firebase-admin";

// const firestore = new Firestore();

export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  if (body instanceof Uint8Array) {
    body = JSON.parse(new TextDecoder().decode(body));
  }
  const headers = event.node.req.headers;

  console.log(body, headers);

  const formatDate = (date: string) => {
    if (!date) return undefined;
    let newDate = new Date(date);
    if (newDate) {
      return newDate.toISOString().slice(0, 10);
    } else {
      return undefined;
    }
  };

  const message = {
    first_name: body.firstName || "",
    last_name: body.lastName || "",
    email: body.email,
    // created_at: admin.firestore.FieldValue.serverTimestamp(),
    message: body.message || "",
    subject: body.subject || "",
    tag: body.tag || "",
    bank: body.bank || "",
    website: body.website || "",
    bank_display_name: body.bankDisplayName || "",
    bank_name_when_not_found: body.bankNameWhenNotFound || "",
    reminder: formatDate(body.reminder) || "",
    dirty_deal_1: body.dirty_deal_1 || "",
    dirty_deal_2: body.dirty_deal_2 || "",
    rating: body.rating || "",
    country: body.country || "",
    is_agree_marketing: body.isAgreeMarketing || false,
    path: body.path || "",
    ip: headers["cf-connecting-ip"] || "",
    location: {
      country: headers["cf-ipcountry"] || "",
      region: "",
      city: headers["cf-ipcity"] || "",
      cityLatLng: [
        headers["cf-iplatitude"] || "",
        headers["cf-iplongitude"] || "",
      ],
    },
  };

  // await firestore.collection("contact").add(message);
  await sendZapierContact(message);

  return {
    message,
    body,
    headers,
  };
});

async function sendZapierContact(message: any) {
  const hookUrl = "https://hooks.zapier.com/hooks/catch/9709339/ojsks1l";
  await $fetch(hookUrl, { method: "POST", body: message });
}
