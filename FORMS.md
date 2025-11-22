# Bank.Green Forms Systems

Complete documentation of all forms, their endpoints, and integrations. For forms overview and architecture, see [CLAUDE.md](CLAUDE.md#form-handling).

## Forms by Page

### `/contact` - Contact Page

- **Contact Form** (tag: "contact page form", AC Tag ID: 14)

### `/join` - Join Page

- **SignupBox** (tag: "join form", AC Tag ID: 201)

### `/partners` - Partners Page

- **SignupBox** (tag: "partners bottom", AC Tag ID: 24)

### `/faq` - FAQ Page

- **SignupBox** (tag: "FAQ bottom", AC Tag ID: 124)

### `/not-listed` - Bank Not Listed Page

- **SubmitBank** (tag: "not listed bottom", AC Tag ID: 26)

### `/embrace` - Embrace/Campaign Page

- **Embrace Form** (tag: "embrace", break-up email generator)

### `/banks/[bankTag]` - Individual Bank Detail Pages

- **Good/Great rating** → **SignupBox** in BankLayoutGood (tag: "green bank", AC Tag ID: 879)
- **Bad/Worst/OK rating** → **NO FORM** - shows CallToAction button ("Move Your Money") instead

### `/sustainable-eco-banks/[bankTag]` - Eco-Bank Detail Pages

- **LeadGen Slice** (tag: "green directory", AC Tag ID: 878)
  - Dynamically embedded via Prismic CMS content
  - Fields configured per-page via CMS

### `/` - Homepage / Index

- **LeadGen Slice** (tag: "green directory", AC Tag ID: 878)
  - Dynamically embedded via Prismic CMS SliceZone
  - Current configuration uses LeadGen slice for lead capture

### Various Pages (CMS-driven)

- **SwitchForm** (Typeform survey embed)
  - Used across multiple pages, exact locations depend on CMS/component usage

## Form Types Overview

| Form Type         | File                               | Pages                                   | Fields                              | AC Tag          |
| ----------------- | ---------------------------------- | --------------------------------------- | ----------------------------------- | --------------- |
| **SignupBox**     | `/components/forms/SignupBox.vue`  | /join, /partners, /faq, /banks/[tag] (good) | 3 (name, email, +)            | varies (24, 124, 201, 879) |
| **SubmitBank**    | `/components/forms/SubmitBank.vue` | /not-listed                             | 5 (+bank)                           | 26              |
| **Contact Form**  | `/pages/contact.vue`               | /contact                                | 4 (+subject, message)               | 14              |
| **LeadGen Slice** | `/slices/LeadGen/index.vue`        | /, /sustainable-eco-banks/[tag]         | 5 (CMS-configurable)                | 878             |
| **Embrace**       | `/components/Embrace.client.vue`   | /embrace, bank pages                    | 7 (+fullName, hometown, background) | "embrace"       |
| **SwitchForm**    | `/components/SwitchForm.vue`       | Various                                 | Typeform-defined                    | none            |

## Detailed Form Documentation

### SignupBox Component

**Location:** `/components/forms/SignupBox.vue`
**Endpoint:** `/server/api/contact.post.ts`
**Primary Use:** Multi-purpose email signup with flexible tagging

**USAGE LOCATIONS:**

```
Page/URL                          Tag                    AC Tag ID
──────────────────────────────────────────────────────────────────────
/join                             "join form"            201
/partners                          "partners bottom"      24
/faq                              "FAQ bottom"           124
/banks/[bankTag] (Good rating)     "green bank"           879
```

**Fields Collected:**

- firstName (optional)
- email (required)
- isAgreeMarketing (checkbox)
- isAgreeTerms (required)
- Cloudflare Turnstile captcha

**Component Props:**

- `tag`: Form identifier for AC tagging (default: 'signupbox')
- `successRedirectURL`: Redirect after success (default: '/thanks')
- `details`: Bank details object (optional)
- `prefill`: Pre-populate fields (optional)

---

### SubmitBank Component

**Location:** `/components/forms/SubmitBank.vue`
**Endpoint:** `/server/api/contact.post.ts`
**Primary Use:** Submit banks not found in database

**USAGE LOCATIONS:**

```
Page/URL              Tag                    AC Tag ID
──────────────────────────────────────────────
/not-listed           "not listed bottom"    26
```

**Fields Collected:**

- bank (required - labeled "Name of bank")
- firstName (optional)
- email (required)
- isAgreeMarketing (checkbox, optional)
- isAgreeTerms (required)

**Component Props:**

- `tag`: Form identifier for AC tagging (default: 'submitbank')

**Success Behavior:** Shows success message inline via cookie tracking, does NOT redirect (unlike other forms)

---

### Contact Form (Contact Page)

**Location:** `/pages/contact.vue`
**Endpoint:** `/server/api/contact.post.ts`
**Primary Use:** General contact inquiries and support

**Fields Collected:**

- firstName (optional)
- email (required)
- subject (required)
- message (required)
- isAgreeMarketing (checkbox)
- isAgreeTerms (required)
- Cloudflare Turnstile captcha

**ActiveCampaign Fields Mapped:**

- Field #2: Bank display name
- Field #11: Marketing consent
- Field #18: Current status
- Field #19: Subject
- Field #20: Message

**Success Redirect:** `/thanks-contact`
**GTM Event:** `contactpage`

---

### LeadGen Slice (Prismic CMS)

**Location:** `/slices/LeadGen/index.vue`
**Endpoint:** `/server/api/contact.post.ts`
**Primary Use:** Marketing campaign lead capture via CMS content blocks

**CMS Configuration Fields:**

- `title`: Custom heading
- `show_bank_field`: Toggle bank field visibility
- `show_status_field`: Toggle status field visibility
- `form_bank_label`: Bank field label
- `form_name_label`: First name label
- `form_email_label`: Email label
- `form_status_label`: Status dropdown label
- `button_label`: Custom button text

**Fields Collected:**

- firstName (required)
- email (required)
- bank (optional, if `show_bank_field` enabled)
- currentStatus (optional, if `show_status_field` enabled)
- isAgreeMarketing (checkbox)
- isAgreeTerms (required)
- Cloudflare Turnstile captcha

**Form Tag:** "green directory" (hardcoded)

**Extra Data Sent to AC:**

- country (from IP geolocation)
- bank (bank tag and name)
- bankDisplayName
- rating (bank rating)
- bankNameWhenNotFound
- currentStatus

**Success Redirect:** `/thanks`

---

### Embrace Form (Break-Up Email Generator)

**Location:** `/components/Embrace.client.vue`
**Endpoint:** External EMBRACE_URL service + `/server/api/contact.post.ts`
**Primary Use:** Generate personalized bank break-up email messages

**USAGE LOCATIONS:**

- `/pages/embrace.vue` - Main embrace/campaign page
- Bank detail pages (via embrace campaign integration)

**Fields Collected:**

- fullName (required)
- email (required)
- bank (required - embrace campaign specific banks)
- country (required)
- hometown (optional)
- background (optional, textarea - "Why are you embracing this campaign?")
- isAgreeMarketing (checkbox)
- isAgreeTerms (required)
- Cloudflare Turnstile captcha

**Form Tag:** "embrace" (hardcoded)

**Special Features:**

- Calls external EMBRACE_URL service to generate personalized email messages
- Shows email preview modal before sending
- Allows editing of generated message
- Sends via mailto: link (user's email client)
- Does NOT use standard form submission; user sends via email client instead

**Extra Data Sent to AC:**

- fullName
- country
- bankDisplayName
- brand_tag
- bankNameWhenNotFound
- hometown
- background

---

### SwitchForm (Typeform Survey)

**Location:** `/components/SwitchForm.vue`
**Typeform ID:** rwxTfN15
**AC Integration:** None (Typeform handles separately)
**Primary Use:** Survey about switching banks

---

## Form Endpoints

### POST `/server/api/contact.post.ts`

**Central form submission handler for all contact/signup forms**

Handles: SignupBox, SubmitBank, Contact Form, LeadGen, Embrace

**Request Processing:**

1. Reads request body with form data
2. Extracts Cloudflare CF headers for geolocation (country, city, lat/lng)
3. Creates ContactMessage object
4. Sends to ActiveCampaign via `/contact/sync`
5. Adds AC tag via `/contactTags`
6. Optionally calls external services

**Supported Request Fields:**

```
firstName, lastName, email, subject, message,
bank, website, bankDisplayName, bankNameWhenNotFound,
reminder, dirty_deal_1, dirty_deal_2, rating, country,
isAgreeMarketing, path, currentStatus, tag, fullName, hometown, background
```

### POST `/server/api/captcha-site-verify.post.ts`

**Verify Cloudflare Turnstile captcha tokens**

Used by: All forms with captcha verification

---

## ActiveCampaign Integration

**API Strategy:** Tag-based (NOT list-based)
**Primary Endpoint:** `/contactTags` for tag assignment

### AC TAG MAPPINGS

```
AC Tag ID  | Form/Source                    | Component
─────────────────────────────────────────────────────────
8          | form tag not defined (error)   | Any form
14         | Contact page form              | Contact
24         | Partners bottom                | SignupBox
26         | Not listed bottom              | SubmitBank
124        | FAQ bottom                     | SignupBox
201        | Join form                      | SignupBox
878        | green directory (homepage, eco-banks) | LeadGen slice
879        | green bank (good bank detail)  | SignupBox
```

**Note:** Tags 11, 27, 28, 37, 101, 103 documented in older versions are no longer used. The "embrace" form (tag: "embrace") is not mapped to an AC Tag ID.

### AC CUSTOM FIELDS MAPPED

```
Field ID  | Data                  | Used By
──────────────────────────────────────────────────────
2         | Bank display name     | All forms
11        | Marketing consent     | All forms
18        | Current status        | Forms with status field
19        | Subject               | Contact form
20        | Message               | Contact form
```

---

## Key Composables & Utilities

### `useContactForm(tag, required, extra, prefill, captchaToken)`

**Location:** `/composables/useContactForm.ts`

**Parameters:**

- `tag` (string, default: 'unknown') - Form identifier for AC tagging
- `required` (array, default: ['email', 'isAgreeTerms']) - Fields that must be validated
- `extra` (ref, default: ref({})) - Additional data to send with form
- `prefill` (ref, default: ref(undefined)) - Pre-populate form fields
- `captchaToken` (ref, default: ref('')) - Cloudflare Turnstile captcha token from vue-turnstile component

**Returns:**

- Form state: firstName, lastName, email, subject, message, bank, isAgreeTerms, isAgreeMarketing, isSent, currentStatus
- Validation: warningsMap, hasWarnings, validate()
- Methods: send(), reset()
- Status: busy (double-submit prevention), isSent (cookie-based: `contact.{tag}.sent`)

**GTM Tracking:** Emits `emailform` (default) or `contactpage` (for contact form) events

### `useCaptcha()`

**Returns:** isLocal, captchaVerified, captchaSitekey, captchaToken

### `useCountry()`

**Returns:**

- `country` (2-letter code from IP geolocation, defaults to 'US')
- `isBE` (helper boolean: true if UK/IE/GB)

---

## Form Field Components

Reusable field components in `/components/forms/`:

- **TextField.vue** - Text input/textarea field with validation
- **CheckboxSection.vue** - Checkbox with label and validation
- **CurrentStatus.vue** - Status dropdown selector
- **BankLocationSearch.vue** - Bank and location search with geolocation
- **BaseField.vue** - Base wrapper for all fields with common features

---

## Environment Variables Required

```bash
# ActiveCampaign
NUXT_PUBLIC_ACTIVE_CAMPAIGN_API_KEY=<api_key>
NUXT_PUBLIC_ACTIVE_CAMPAIGN_URL=<base_url>

# Captcha
NUXT_PUBLIC_CLOUDFLARE_CAPTCHA_SITEKEY=<sitekey>
NUXT_PUBLIC_CLOUDFLARE_CAPTCHA_SECRET=<secret>

# External Services
PUBLIC_EMBRACE_URL=<embrace_service_url>
PUBLIC_DOMAIN_URL=<site_url>
PUBLIC_DATA_URL=<graphql_endpoint>
PUBLIC_GPE_URL=<green_policy_evaluator_url>

# Deprecated Integrations
ZAPIER_OTHER_SUBMIT=<zapier_webhook>
ZAPIER_CONTACT=<zapier_webhook>
```

---

## Key Architectural Patterns

1. **Form Validation** - Client-side validation with warning display, no server-side validation
2. **Double-Submit Protection** - Uses `busy` flag and setTimeout debouncing
3. **Cookie-Based Tracking** - `contact.{tag}.sent` cookie prevents re-display of forms
4. **AC Integration Strategy** - Tag-based classification, not list-based
5. **External Service Integration** - Embrace form calls external message generation service
6. **CMS-Driven Configuration** - LeadGen slice fields configurable in Prismic
7. **Composable Pattern** - All forms use `useContactForm` composable for consistency
8. **Modular Components** - Small, reusable field components
9. **Dynamic Captcha** - Cloudflare Turnstile, disabled in local environment
10. **GTM Tracking** - Form submissions trigger GTM events for analytics

---

## Known Limitations & Caveats

- **SubmitBank** form does NOT include Cloudflare Turnstile captcha (unlike other forms)
- **Embrace form** does not directly submit to `/api/contact` via form submission; instead uses external service + mailto: links
- **Bad bank detail pages** do not show a signup form; instead show "Move Your Money" CTA
- **Index page** uses dynamic LeadGen Slice via Prismic CMS SliceZone (not a hardcoded component)
- **New in this version**: Server-side captcha token validation now required (all forms must send `captchaToken` to `/api/contact` endpoint in production)
- Tags 27, 28, 37, 101, 103 from older documentation are deprecated and no longer used
