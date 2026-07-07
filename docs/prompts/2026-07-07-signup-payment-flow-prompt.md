# Signup and payment flow — implementation prompt

## Goal

Replace the old lead-capture form (Vercel Blob) with a unified signup-and-payment flow: every form submission is saved to Upstash Redis immediately with `pending_payment`, the customer is sent to Yoco Checkout, and only verified Yoco webhooks may set `paid` or `payment_failed`. Admin lists all signups regardless of payment outcome.

## Context

**Exists**

- Pricing tiers in `data/pricing.ts`
- Yoco Checkout API client in `lib/yoco/client.ts`
- Basic Auth admin at `/admin`
- Resend email notifications

**Was removed**

- `POST /api/leads` + Vercel Blob storage
- `POST /api/checkout` (pay-before-details)
- Query-string-only payment verification on `/thank-you`

## Scope

- **In scope:** `umculoapp` — signup form, KV storage, signup API, Yoco webhook, return page, admin
- **Out of scope:** Migrating historical Blob leads into KV

## Implementation instructions

1. Add `@upstash/redis`; store signups at `signup:{id}` and index IDs in `signups:all`.
2. `POST /api/signup` — validate, save signup, email pending notification, create Yoco checkout with `externalId` = signup uuid, return `redirectUrl`.
3. `POST /api/webhooks/yoco` — verify Standard Webhooks signature (`whsec_`), idempotency via `webhook-id`, handle `payment.succeeded` / `payment.failed`.
4. `app/signup/[id]/page.tsx` — show status from KV only; poll while `pending_payment`.
5. Update `/admin` to list signups with status badges.
6. Register webhook in Yoco portal: `https://umculo.app/api/webhooks/yoco`

## Acceptance

- [ ] Form submit creates KV record before Yoco redirect
- [ ] Email to aya@qwabi.co.za on new signup (pending)
- [ ] Webhook `payment.succeeded` sets `paid` and sends paid email
- [ ] Return page never shows success unless `status === "paid"`
- [ ] Admin shows pending signups who abandoned checkout

## Env

`KV_REST_API_URL`, `KV_REST_API_TOKEN`, `YOCO_SECRET_KEY`, `YOCO_WEBHOOK_SECRET`, `RESEND_API_KEY`, `ADMIN_USER`, `ADMIN_PASSWORD`
