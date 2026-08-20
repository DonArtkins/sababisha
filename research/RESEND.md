# Resend setup guide (for any future project)

This note documents how to get email working with [Resend](https://resend.com) without repeating the same dashboard failures. It is project-agnostic: use placeholders, never commit real API keys.

**Related project docs:** [`README.md`](../README.md) (env + SEO overview), [`CONTRIBUTING.md`](../CONTRIBUTING.md) (contributor Resend checklist), [`AGENTS.md`](../AGENTS.md) (agent conventions), [`LOTTIE-MODALS.md`](./LOTTIE-MODALS.md) (form success/error Lottie modals). Sababisha-specific env names in this repo are `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_TO_EMAIL` — see `.env.example`.

Official docs worth bookmarking:

- [Add a domain](https://resend.com/docs/dashboard/domains/introduction)
- [Domain verification troubleshooting](https://resend.com/docs/knowledge-base/what-if-my-domain-is-not-verifying)
- [Testing with `resend.dev`](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain)
- [Send email API](https://resend.com/docs/api-reference/emails/send-email)

---

## Mental model (read this first)

Resend needs **two** things. Having only one is why sends often “look fine” in your app UI while the Resend dashboard shows **Failed**.

| Piece                          | What it unlocks                                      | Without it                                                |
| ------------------------------ | ---------------------------------------------------- | --------------------------------------------------------- |
| **API key** (`RESEND_API_KEY`) | Your server may call `https://api.resend.com/emails` | Immediate auth failure                                    |
| **Verified sending domain**    | You may set `from` to any address on that domain     | `403` — domain not verified / cannot send as that address |

Important distinctions:

- Resend verifies the **email `from` domain**, not your website URL.
- Hosting on `something.vercel.app` does **not** by itself verify a sending domain.
- A successful HTTP response from your own API only means “your route finished.” The Resend dashboard status (**Delivered** / **Failed**) is the source of truth for delivery.

---

## Contact forms: `from` vs `to` vs `reply_to`

A website contact form does **not** send mail “as the visitor’s Gmail.” Your server asks Resend to deliver a notification **from a sender Resend is allowed to use**. The visitor is captured with `reply_to` (and in the HTML body), not as `from`.

### Who is who

| Field | Value | Meaning |
| --- | --- | --- |
| `from` | `RESEND_FROM_EMAIL` (your site / brand) | Who Resend sends **as**. Must be `onboarding@resend.dev` (dev) or an address on a **verified** domain (prod). |
| `to` | Team inbox env (e.g. `CONTACT_TO_EMAIL` / `SABABISHA_CONTACT_EMAIL`) | Where the inquiry **lands** (the company mailbox). |
| `reply_to` | Email the visitor typed in the form | Where **Reply** in Gmail/Outlook goes — back to the client. |

Correct pattern:

```ts
await send({
  from: process.env.RESEND_FROM_EMAIL!,       // site / brand sender (not the visitor)
  to: [process.env.CONTACT_TO_EMAIL!],        // company inbox
  reply_to: [userSubmittedEmail],             // visitor — so Reply reaches them
  subject: "New service inquiry: …",
  html: "…includes visitor name, email, phone, message…",
});
```

What the inbox typically shows:

- **From:** Your App Name \<noreply@your-verified-domain.com\>
- **To:** team@your-company.com
- **Reply-To:** client@gmail.com
- **Body:** the form fields (name, phone, service, message, etc.)

Staff hit **Reply** → message goes to the visitor via `reply_to`.

### Why not `from: client@gmail.com`?

1. **Resend will reject it** — you may only send from domains you verified (or `resend.dev` for tests). Arbitrary consumer addresses are not allowed as `from`.
2. **It looks like spoofing** — claiming to be someone’s Gmail without their mailbox/DNS fails SPF/DKIM, hurts deliverability, and can look like phishing.
3. **You already have the client** — put their details in the subject/body and set `reply_to` to their address. That is the industry-standard contact-form pattern.

### Wrong vs right

| Approach | Result |
| --- | --- |
| `from: visitor@gmail.com` → `to: company@…` | Fails auth/domain checks; looks like spoofing |
| `from: company@verified-domain` → `to: company inbox` + `reply_to: visitor` | Deliverable; Reply reaches the client |

Newsletter/footer signups and article comment forms use the same shape: site as `from`, team as `to`, visitor/subscriber email as `reply_to` (or only in the body if you prefer). Article comments additionally include the article title, type (R&D Blog / AI Topic), category, author, date, excerpt, and URL in the branded HTML template (`renderArticleCommentEmail`).

---

## Resend-specific environment variables

Only these keys are Resend-related for sending. Keep secrets in `.env.local` / Vercel Project Settings — never in git.

### 1. `RESEND_API_KEY`

- Created in Resend → **API Keys**.
- Sent as `Authorization: Bearer <key>`.
- Required in every environment that actually sends mail (local, preview, production).
- If this key leaks (chat logs, screenshots, commits), **rotate it** in the dashboard and update env vars.

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
```

### 2. `RESEND_FROM_EMAIL`

This is the **sender** Resend puts in the `from` field. It must use a domain Resend allows for that environment.

**Development / smoke tests (always use this):**

```env
RESEND_FROM_EMAIL="Your App Name <onboarding@resend.dev>"
```

**Production (after your domain is verified):**

```env
RESEND_FROM_EMAIL="Your App Name <noreply@your-verified-domain.com>"
```

Rules for `from`:

- Format either `email@domain.com` or `Display Name <email@domain.com>` (display name is recommended).
- The domain part must match a **verified** domain in Resend (or be `resend.dev` for testing only).
- You do **not** need to “create” the mailbox in Resend. After domain verification, any local-part works (`noreply@`, `support@`, `hello@`, etc.). Prefer an address that can receive replies if you care about reply UX.
- If you verified a **subdomain** (e.g. `mail.example.com`), `from` must use that subdomain (`noreply@mail.example.com`), not the bare root, unless the root itself is verified.

### 3. Recipient inbox (app-owned, not a Resend dashboard key)

Resend does not define a standard env name for “where contact-form emails should land.” Your app chooses one (examples: `CONTACT_TO_EMAIL`, `APP_INBOX_EMAIL`, `SUPPORT_INBOX_EMAIL`).

That value is the **`to`** address in the API call:

```env
# Example name only — pick whatever your app uses
CONTACT_TO_EMAIL=you@example.com
```

| Variable                        | Role                      | Resend cares about…                                                              |
| ------------------------------- | ------------------------- | -------------------------------------------------------------------------------- |
| `RESEND_FROM_EMAIL`             | Who the email is **from** | Domain must be allowed / verified                                                |
| `CONTACT_TO_EMAIL` (or similar) | Who receives the email    | Valid inbox; with `onboarding@resend.dev`, must be **your Resend account email** |

See [Contact forms: `from` vs `to` vs `reply_to`](#contact-forms-from-vs-to-vs-reply_to) for why the visitor is never `from`.

---

## Development rule: always test with `onboarding@resend.dev`

For local development and first-time Resend wiring, **always** set:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL="Your App Name <onboarding@resend.dev>"
CONTACT_TO_EMAIL=your-resend-account-email@example.com
```

### What this allows

- Prove the API key, request shape, HTML/text bodies, and your UI success/error path work.
- Deliver real test mail to the inbox tied to your Resend account.

### Hard limits of `resend.dev`

- **Only** the email address on your Resend account can be a recipient.
- Sending to any other address returns **403** with a message like: you can only send testing emails to your own address; verify a domain to send to others.
- Never ship production traffic with `onboarding@resend.dev` as `from`.

### Recommended local `.env.local` pattern

```env
# Development — Resend test sender only
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL="Your App Name <onboarding@resend.dev>"
CONTACT_TO_EMAIL=your-resend-account-email@example.com
```

Keep production values in Vercel (or another host) env settings, not in the same unchecked-in file you use for daily `onboarding@resend.dev` testing if that would risk deploying the test sender by mistake.

---

## Production: verify your own domain

You need a domain you control (bought registrar, or attached to your project). You cannot verify `*.vercel.app` as a Resend sending domain (see next section).

### Steps

1. Open [Resend → Domains](https://resend.com/domains) → **Add Domain**.
2. Enter either:
   - root domain: `example.com`, or
   - sending subdomain (recommended): `mail.example.com` / `send.example.com` / `notifications.example.com`.
3. Copy the DNS records Resend shows (typically DKIM `TXT`, SPF `TXT`, and MX for the return-path host).
4. Add those records at your DNS provider **exactly** as shown (name, type, value). Watch for providers that auto-append the zone name.
5. Wait for verification (often minutes; DNS can take longer). Use Resend’s status UI and optionally [dns.email](https://dns.email).
6. When status is **Verified**, update env:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL="Your App Name <noreply@example.com>"
CONTACT_TO_EMAIL=team-inbox@example.com
```

If you verified `mail.example.com` instead of `example.com`:

```env
RESEND_FROM_EMAIL="Your App Name <noreply@mail.example.com>"
```

7. Restart the local server / **redeploy** so the host picks up new env vars.
8. Send a real form submission and confirm **Delivered** in Resend → Emails (not only a success toast in the UI).

### Common failure: “domain is not verified”

Symptom in API / logs:

```text
403 validation_error
The example.com domain is not verified. Please, add and verify your domain on https://resend.com/domains
```

Cause: `RESEND_FROM_EMAIL` uses a domain that is missing, pending, or mismatched (e.g. verified `mail.example.com` but sending as `noreply@example.com`).

Fix: finish DNS verification, or change `from` to the exact verified domain, or temporarily fall back to `onboarding@resend.dev` for local tests only.

---

## Apps on Vercel free `*.vercel.app` (cannot verify that host in Resend)

### The constraint

- Preview/production URLs like `my-app.vercel.app` are owned by Vercel, not by you.
- Resend will **not** let you verify `vercel.app` / `my-app.vercel.app` as a sending domain.
- So you **cannot** set:

```env
RESEND_FROM_EMAIL="App <hello@my-app.vercel.app>"
```

That will always fail domain checks.

### Critical workaround (this is the real fix)

**Resend does not require your website hostname to match your sending domain.**

You can:

- Host the Next.js app at `my-app.vercel.app` (or any preview URL), **and**
- Send mail `from` a domain you own and verified in Resend, e.g. `noreply@example.com`.

Website URL and `from` domain are independent.

```text
Browser visits:  https://my-app.vercel.app
Emails send as:  Your App <noreply@example.com>   ← verified in Resend
```

### Practical options

| Option                                              | When to use                                                     | `RESEND_FROM_EMAIL`                                                                                              |
| --------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **A. Own a cheap custom domain** (best)             | Any real product / client site                                  | `Name <noreply@yourdomain.com>` after DNS verify                                                                 |
| **B. Add that custom domain to Vercel**             | You also want `https://yourdomain.com` instead of `.vercel.app` | Same as A — verification is still DNS at Resend, not “because Vercel hosts it”                                   |
| **C. Stay on `.vercel.app` only, no custom domain** | Demos, school projects, throwaways                              | Keep `onboarding@resend.dev` and only send to your Resend account email — **not** a real multi-recipient product |
| **D. Shared / company domain**                      | Employer already verified `company.com` in a Resend team        | Use an address on that verified domain (with permission)                                                         |

There is no special Resend switch that “unlocks” `.vercel.app` as a from-address. The go-around is always: **verify a domain you control**, then point `RESEND_FROM_EMAIL` at it, regardless of where the app is hosted.

### Vercel env checklist

In Vercel → Project → Settings → Environment Variables, set at least:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL="Your App Name <noreply@your-verified-domain.com>"
CONTACT_TO_EMAIL=team-inbox@example.com
```

Tips:

- Use different values for **Preview** vs **Production** if you want previews to stay on `onboarding@resend.dev` and production on the verified domain.
- After changing env vars, trigger a new deployment.
- Confirm the deployed function uses the intended `from` by clicking a Failed/Delivered row in Resend (open the email detail for the exact error).

---

## End-to-end checklist for a new project

1. Create a Resend account and API key → set `RESEND_API_KEY`.
2. **Dev:** set `RESEND_FROM_EMAIL` to `Your App Name <onboarding@resend.dev>` and `CONTACT_TO_EMAIL` to your Resend account email.
3. Wire your server route to POST JSON to Resend; treat non-2xx / missing `id` as failure in the UI.
4. Confirm a test email arrives and shows **Delivered** in the dashboard.
5. Buy or reuse a domain you control; add it under Resend → Domains; add DNS records; wait for **Verified**.
6. Switch `RESEND_FROM_EMAIL` to an address on that domain; set the real team inbox as `to`.
7. If the site is only on `.vercel.app`, keep hosting as-is — sending still works via the verified custom domain.
8. Rotate any leaked API keys; never commit `.env.local`.

---

## Quick reference: which `from` when?

| Stage                                | Hosted where?                      | `RESEND_FROM_EMAIL`                                                                       |
| ------------------------------------ | ---------------------------------- | ----------------------------------------------------------------------------------------- |
| Local development                    | `localhost`                        | `Name <onboarding@resend.dev>`                                                            |
| Vercel preview, no custom domain yet | `*.vercel.app`                     | Prefer `onboarding@resend.dev` (account email only) **or** already-verified custom domain |
| Production                           | custom domain and/or `.vercel.app` | `Name <noreply@verified-domain.com>` only                                                 |

---

## What “success in UI / Failed in Resend” usually means

1. **`from` domain not verified** while using a custom address → Resend `403`, dashboard row often **Failed**.
2. **`onboarding@resend.dev` + recipient ≠ Resend account email** → `403` test-domain restriction.
3. App returned success without checking Resend’s response (bug) — always gate UI success on Resend accepting the send (`id` + HTTP success), then still confirm **Delivered** in the dashboard for the first production cutover.

When debugging, open the Failed email in Resend and read the exact message before changing code.
