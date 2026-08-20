# DEVOPS.md — Sababisha Production Deployment, DevOps, Security & SEO Runbook

> **Status:** Production deployment runbook  
> **Application:** Sababisha web application  
> **Current hosting:** Vercel  
> **Current temporary/public URL:** `https://sababisha.vercel.app/`  
> **Reference/original website:** `https://sababisha.com/index.html`  
> **Intended production domain:** a domain owned and controlled by the project owner, e.g. `sababisha.com`  
> **Important:** `sababisha.com` and `sababisha.vercel.app` are two different domains.  
> **Last reviewed:** August 2026

---

# Table of Contents

1. [Purpose and Production Goal](#1-purpose-and-production-goal)
2. [Understand the Two Domains](#2-understand-the-two-domains)
3. [Important Ownership and Licensing Warning](#3-important-ownership-and-licensing-warning)
4. [Target Production Architecture](#4-target-production-architecture)
5. [Phase 0 — Before Buying the Domain](#5-phase-0--before-buying-the-domain)
6. [Phase 1 — Buy and Control the Real Domain](#6-phase-1--buy-and-control-the-real-domain)
7. [Phase 2 — Connect the Domain to Vercel](#7-phase-2--connect-the-domain-to-vercel)
8. [Phase 3 — Add Cloudflare](#8-phase-3--add-cloudflare)
9. [Cloudflare + Vercel Reverse Proxy Decision](#9-cloudflare--vercel-reverse-proxy-decision)
10. [DNS Architecture](#10-dns-architecture)
11. [SSL/TLS and HTTPS](#11-ssltls-and-https)
12. [DNSSEC](#12-dnssec)
13. [Cloudflare Security](#13-cloudflare-security)
14. [Vercel Security](#14-vercel-security)
15. [Application Security](#15-application-security)
16. [HTTP Security Headers](#16-http-security-headers)
17. [Environment Variables and Secrets](#17-environment-variables-and-secrets)
18. [GitHub Repository Security](#18-github-repository-security)
19. [CI/CD](#19-cicd)
20. [Production Deployment Workflow](#20-production-deployment-workflow)
21. [SEO Strategy](#21-seo-strategy)
22. [Next.js Metadata](#22-nextjs-metadata)
23. [Canonical URLs](#23-canonical-urls)
24. [robots.txt](#24-robotstxt)
25. [Sitemap](#25-sitemap)
26. [Structured Data / JSON-LD](#26-structured-data--json-ld)
27. [Open Graph and Social Sharing](#27-open-graph-and-social-sharing)
28. [Google Search Console](#28-google-search-console)
29. [Bing Webmaster Tools](#29-bing-webmaster-tools)
30. [Indexing and Crawlability](#30-indexing-and-crawlability)
31. [Internationalization and `/en`](#31-internationalization-and-en)
32. [Performance and Core Web Vitals](#32-performance-and-core-web-vitals)
33. [Caching](#33-caching)
34. [API, Forms and Rate Limiting](#34-api-forms-and-rate-limiting)
35. [Monitoring and Observability](#35-monitoring-and-observability)
36. [Backups and Disaster Recovery](#36-backups-and-disaster-recovery)
37. [Rollback Strategy](#37-rollback-strategy)
38. [Domain and DNS Recovery](#38-domain-and-dns-recovery)
39. [Production Testing Commands](#39-production-testing-commands)
40. [SEO Validation Checklist](#40-seo-validation-checklist)
41. [Security Validation Checklist](#41-security-validation-checklist)
42. [Final Production Launch Checklist](#42-final-production-launch-checklist)
43. [Post-Launch Schedule](#43-post-launch-schedule)
44. [Incident Response](#44-incident-response)
45. [Recommended Project Structure](#45-recommended-project-structure)
46. [Common Mistakes to Avoid](#46-common-mistakes-to-avoid)
47. [Official Documentation](#47-official-documentation)
48. [Production Definition of Done](#48-production-definition-of-done)

---

# 1. Purpose and Production Goal

This document is the operational runbook for moving the Sababisha application from a working Vercel deployment into a maintainable production system.

The goal is not simply:

```text
npm run build
       ↓
Vercel deployment succeeded
       ↓
DONE
```

The goal is:

```text
Source control
      +
Secure development process
      +
CI/CD
      +
Custom domain
      +
Correct DNS
      +
HTTPS
      +
Cloudflare where appropriate
      +
Vercel security
      +
Application security
      +
Technical SEO
      +
Google Search Console
      +
Performance monitoring
      +
Error monitoring
      +
Backup/recovery
      +
Rollback capability
      ↓
Production
```

The original research supplied with this project already identified Cloudflare, SEO, Search Console, security headers, monitoring, backups and deployment checks as the major production areas. This document expands those areas and corrects several assumptions that can cause problems when Cloudflare is placed in front of Vercel.

---

# 2. Understand the Two Domains

This is one of the most important concepts in the project.

## 2.1 Original website

The website you used as the reference is:

```text
https://sababisha.com/index.html
```

That is the **original domain/website**.

It is not the same website address as your deployment.

## 2.2 Your current Vercel deployment

Your application is currently available at:

```text
https://sababisha.vercel.app/
```

This is a **Vercel-owned deployment hostname**.

It proves that your application is deployed and reachable, but it is not the same thing as owning a production domain.

## 2.3 Future production domain

After buying a domain, the intended architecture becomes something like:

```text
https://sababisha.com/
```

or another domain that you actually purchase and control.

> **Important typo note:** if you write something such as `sababibisha.com`, verify the spelling before purchasing. The examples in this document use `sababisha.com` because that is the domain referenced in the project research. Do not purchase a domain merely because it appears in an example.

## 2.4 Why the distinction matters

These are separate origins:

```text
https://sababisha.com
https://sababisha.vercel.app
```

Google can discover both if both are publicly crawlable.

You therefore need a clear production canonical domain.

For example:

```text
PRIMARY:
https://sababisha.com

TEMPORARY / PLATFORM:
https://sababisha.vercel.app
```

The production website should reference the real production domain in:

- canonical URLs;
- sitemap URLs;
- Open Graph URLs;
- JSON-LD;
- internal absolute URLs;
- Search Console;
- social sharing;
- application configuration.

Do not leave production metadata pointing at `sababisha.vercel.app` after the custom domain is live.

## 2.5 Do not confuse the reference website with your deployment

The fact that the project is based on or visually resembles the original website does not mean that the original site's:

- code;
- text;
- photographs;
- logos;
- trademarks;
- illustrations;
- testimonials;
- proprietary data;
- branding;

are automatically yours.

Only deploy assets/content that you created or are legally authorized to use.

---

# 3. Important Ownership and Licensing Warning

## 3.1 The existing MIT license conflicts with your stated goal

The project research says the repository currently contains an MIT license.

The MIT license grants broad rights to use, copy, modify, publish, distribute, sublicense and sell the software, subject to its conditions.

Therefore:

> If the goal is to prevent other people from legally reusing the source code, **do not use the MIT license for the proprietary application code.**

A private GitHub repository does not change the permissions already granted by an MIT license.

## 3.2 If this is proprietary software

Before production:

```text
[ ] Remove the MIT LICENSE if you are legally entitled to do so.
[ ] Replace it with an appropriate proprietary/all-rights-reserved notice.
[ ] Keep the repository private.
[ ] Restrict repository collaborators.
[ ] Enable GitHub 2FA.
[ ] Protect the main branch.
[ ] Enable secret scanning/push protection where available.
[ ] Do not publish source code accidentally through packages or public artifacts.
[ ] Review third-party package licenses.
[ ] Keep records proving authorship/ownership of original work.
```

A suitable proprietary notice should be reviewed by a qualified lawyer if this is a commercial business.

## 3.3 Contributors

If another developer contributes code, clarify ownership before accepting the contribution.

For a commercial project, consider appropriate:

- contributor agreements;
- intellectual-property assignment clauses;
- confidentiality agreements;
- employment/contractor IP provisions.

## 3.4 Private repository is not enough

Private repository:

```text
protects repository visibility
```

It does **not**:

```text
automatically establish exclusive copyright
```

and it does not override licenses you intentionally grant.

## 3.5 Third-party dependencies

Your code may be proprietary while your dependencies remain governed by their own licenses.

Before launch:

```bash
npm ls
```

and review important dependency licenses.

Do not remove a third-party license notice if its license requires preservation.

---

# 4. Target Production Architecture

## 4.1 Recommended baseline

For this application, the simplest production architecture is:

```text
                         INTERNET
                             |
                             v
                     YOUR CUSTOM DOMAIN
                             |
                             v
                         CLOUDFLARE
                    (DNS / optional proxy)
                             |
                             v
                           VERCEL
                 ┌───────────┴───────────┐
                 │                       │
             Next.js                 CDN/Edge
                 │
          ┌──────┴──────┐
          │             │
        APIs          External
                      services
```

However, there are two different Cloudflare architectures.

## 4.2 Architecture A — Cloudflare DNS-only

```text
User
  |
  v
Cloudflare DNS
  |
  | DNS lookup only
  |
  v
Vercel
  |
  v
Next.js
```

Cloudflare is your DNS provider, but it is not sitting in the HTTP request path.

This is the conservative choice and is the easiest way to follow Vercel's guidance.

## 4.3 Architecture B — Cloudflare proxied

```text
User
  |
  v
Cloudflare edge
  |
  | HTTP reverse proxy
  |
  v
Vercel
  |
  v
Next.js
```

Cloudflare now sits between the visitor and Vercel.

This gives you Cloudflare's reverse-proxy features, but Vercel warns that putting another reverse proxy in front of a Vercel deployment can reduce Vercel's traffic visibility and affect firewall effectiveness, end-user IP visibility, caching, latency and other platform behavior.

Vercel currently recommends against using a reverse proxy in front of a Vercel deployment. Treat this as an architectural trade-off, not as a mandatory production step.

---

# 5. Phase 0 — Before Buying the Domain

Do this first.

## 5.1 Verify the exact production domain

Decide:

```text
PRIMARY DOMAIN:
_________________________

CANONICAL HOST:
_________________________

www strategy:
_________________________
```

A common strategy is:

```text
https://sababisha.com
```

as canonical, with:

```text
https://www.sababisha.com
```

redirecting to it.

The reverse is also valid. What matters is consistency.

## 5.2 Search for existing domain conflicts

Before buying:

```text
[ ] Confirm spelling.
[ ] Check domain availability.
[ ] Check whether the name is already a registered trademark.
[ ] Check social handles if important.
[ ] Check whether the domain has an existing history.
[ ] Verify that the domain is appropriate for the actual business.
```

## 5.3 Decide where to register

Possible options include:

- Cloudflare Registrar where the TLD is supported;
- another reputable domain registrar.

If Cloudflare Registrar is used, Cloudflare states that it sells domains at registration/renewal cost without markup fees for supported registrations.

The exact price depends on the TLD and current registrar pricing.

---

# 6. Phase 1 — Buy and Control the Real Domain

Assume the final domain is:

```text
sababisha.com
```

## 6.1 Buy it

After purchasing:

```text
Domain:
sababisha.com

Registrar:
________________

Account owner:
________________

Renewal date:
________________
```

## 6.2 Immediately secure the registrar account

```text
[ ] Enable 2FA.
[ ] Use a strong unique password.
[ ] Store recovery codes securely.
[ ] Enable auto-renewal.
[ ] Add a recovery email.
[ ] Keep registrar ownership information accurate.
[ ] Do not share registrar credentials with developers.
```

The domain account is extremely important.

If someone obtains control of the domain, they can potentially redirect:

```text
website traffic
email
verification records
password reset infrastructure
```

and potentially impersonate the business.

## 6.3 Record domain recovery information

Store securely:

```text
Registrar
Account recovery method
2FA recovery codes
Domain expiration date
Nameservers
DNS records
```

Do not put private recovery secrets in the public repository.

---

# 7. Phase 2 — Connect the Domain to Vercel

Do this before making Cloudflare complicated.

## 7.1 Add the domain to Vercel

In Vercel:

```text
Project
  ↓
Settings
  ↓
Domains
  ↓
Add Domain
  ↓
sababisha.com
```

Also decide whether you want:

```text
www.sababisha.com
```

as a secondary domain.

## 7.2 Let Vercel tell you the DNS configuration

Do not blindly copy DNS values from a blog post.

Vercel's domain configuration will tell you the exact records required for the project.

The required values can vary.

The general pattern may involve:

```text
A record
```

for an apex/root domain and/or:

```text
CNAME
```

for a subdomain such as `www`.

Use the exact values shown by Vercel.

## 7.3 If the domain is registered elsewhere

You can keep the registrar where it is and point its DNS/nameservers to Cloudflare.

## 7.4 If using Cloudflare

The usual sequence is:

```text
Buy domain
   ↓
Add domain to Cloudflare
   ↓
Cloudflare gives nameservers
   ↓
Set those nameservers at registrar
   ↓
Cloudflare becomes authoritative DNS
   ↓
Create the DNS records required by Vercel
   ↓
Vercel verifies the domain
```

Cloudflare's current onboarding documentation describes this full-DNS setup for domains registered elsewhere.

## 7.5 Verify the Vercel domain

Vercel should eventually show the domain as configured/verified.

Do not proceed as if the domain is finished simply because DNS was entered.

Verify:

```text
Vercel domain status = valid
HTTPS = working
Correct deployment = serving
```

---

# 8. Phase 3 — Add Cloudflare

## 8.1 Add the domain

In Cloudflare:

```text
Dashboard
  ↓
Onboard/Add domain
  ↓
Enter your production domain
```

Cloudflare will inspect/import existing DNS records.

## 8.2 Review every imported DNS record

Pay particular attention to:

```text
A
AAAA
CNAME
MX
TXT
CAA
```

Do not delete records simply because you do not recognize them.

Some records may belong to:

- email;
- Google verification;
- SPF;
- DKIM;
- DMARC;
- Vercel;
- other services.

## 8.3 Change nameservers

Cloudflare will give you authoritative nameservers.

At the registrar:

```text
Current nameservers
        ↓
replace with
Cloudflare nameservers
```

Wait for propagation.

## 8.4 Confirm Cloudflare is authoritative

Use:

```bash
dig NS sababisha.com
```

You should see the Cloudflare nameservers assigned to your zone.

---

# 9. Cloudflare + Vercel Reverse Proxy Decision

This section corrects an important point from the supplied research.

## 9.1 The original research said

The supplied research recommended:

```text
Cloudflare + Vercel
DNS Only
gray cloud
```

because Vercel does not recommend a reverse proxy in front of Vercel.

That is a sound conservative approach.

## 9.2 Current Vercel position

Vercel's current documentation warns that reverse proxies in front of Vercel can:

- reduce Vercel's visibility into traffic;
- make real client IP identification more difficult;
- reduce the effectiveness of Vercel firewall/security detection;
- introduce another failure/cache layer;
- allow traffic spikes at the proxy to reach the Vercel project.

Therefore:

> **Do not put Cloudflare orange-cloud proxying in front of Vercel just because you think a production application requires it.**

## 9.3 Recommended initial setup

For a first production deployment:

```text
Cloudflare = authoritative DNS
Vercel = application/CDN
Cloudflare web record = DNS only
```

This gives you:

```text
Cloudflare DNS
+
Vercel's native platform
```

without unnecessarily introducing a reverse proxy.

## 9.4 When proxied Cloudflare may be justified

Consider Cloudflare proxying if you have a specific requirement such as:

- Cloudflare WAF requirements;
- Cloudflare-specific bot controls;
- Cloudflare edge functionality you actually need;
- a deliberate security architecture;
- a requirement that Cloudflare inspect HTTP traffic.

If you choose this architecture, test:

```text
TLS
Vercel domain validation
certificate issuance/renewal
redirects
caching
cookies
real IP handling
rate limiting
Vercel firewall behavior
API routes
webhooks
```

before declaring it production-ready.

## 9.5 Do not blindly assume orange-cloud is impossible

Cloudflare proxying and Vercel can technically coexist in some configurations, but Vercel's recommendation is not to use a reverse proxy unless you have a reason.

Therefore the correct rule for this project is:

```text
NO BUSINESS REQUIREMENT
        ↓
DNS ONLY

SPECIFIC CLOUDFLARE EDGE REQUIREMENT
        ↓
TEST PROXIED MODE CAREFULLY
```

---

# 10. DNS Architecture

## 10.1 Recommended records

The exact records must come from your services.

Conceptually:

```text
@       → Vercel production target
www     → canonical domain or Vercel
MX      → email provider
TXT     → SPF / verification
DKIM    → email provider
DMARC   → _dmarc
```

## 10.2 Do not invent DNS values

Never use a tutorial's:

```text
A @ 76.76.21.21
```

or any other example without checking current Vercel documentation/dashboard.

Vercel's DNS requirements can change.

## 10.3 Email records

If you use:

```text
hello@sababisha.com
```

your email DNS records are separate from web hosting.

Typical records include:

```text
MX
TXT SPF
DKIM
DMARC
```

Do not proxy email records through Cloudflare.

## 10.4 SPF

Use the SPF record supplied by your actual email provider.

Never create multiple independent SPF TXT records for the same domain.

## 10.5 DKIM

Publish the DKIM record supplied by the email provider.

## 10.6 DMARC

Start with a monitoring policy if you are introducing email gradually.

For example:

```text
p=none
```

Then move toward stronger enforcement once legitimate senders have been verified.

Do not blindly deploy:

```text
p=reject
```

before you understand every service sending email on behalf of your domain.

---

# 11. SSL/TLS and HTTPS

## 11.1 If Cloudflare is DNS-only

Vercel handles the public HTTPS certificate for the custom domain.

Verify:

```text
https://sababisha.com
```

loads correctly.

## 11.2 If Cloudflare is proxied

There are now two TLS connections:

```text
Visitor
   |
   | HTTPS
   v
Cloudflare
   |
   | HTTPS
   v
Vercel
```

Cloudflare documents this as separate edge and origin encryption.

## 11.3 Cloudflare encryption mode

If Cloudflare is acting as a reverse proxy, prefer:

```text
Full (strict)
```

when the origin certificate meets Cloudflare's requirements.

Cloudflare explicitly recommends Full (strict) where possible.

Do not use:

```text
Flexible
```

for a modern production deployment unless you have a specific legacy reason.

## 11.4 Why Full (strict)

It encrypts:

```text
Visitor → Cloudflare
Cloudflare → Origin
```

and validates the origin certificate.

## 11.5 HSTS

Once HTTPS is confirmed and stable, use:

```text
Strict-Transport-Security
```

Be careful with:

```text
includeSubDomains
preload
```

because HSTS can make HTTP inaccessible for the domain/subdomains for the declared period.

Do not enable HSTS preload casually.

---

# 12. DNSSEC

DNSSEC protects the authenticity of DNS responses.

After Cloudflare becomes authoritative:

```text
Cloudflare
  ↓
DNSSEC
  ↓
Registrar DS record
```

Enable DNSSEC in Cloudflare and follow the registrar instructions for the DS record.

Verify:

```bash
dig +dnssec sababisha.com
```

Do not claim DNSSEC is active until the DS record is correctly published and validation succeeds.

---

# 13. Cloudflare Security

Only use these controls when Cloudflare is actually in the HTTP request path.

If Cloudflare is DNS-only:

```text
Cloudflare WAF
Cloudflare HTTP rate limiting
Cloudflare Bot Management
```

cannot inspect normal HTTP traffic because Cloudflare is not proxying it.

## 13.1 Start conservatively

Do not deploy dozens of aggressive rules on day one.

Start with:

```text
Monitoring
↓
Observe
↓
Challenge obvious abuse
↓
Block confirmed malicious patterns
```

## 13.2 WAF

Use Cloudflare WAF/security rules to protect:

```text
authentication
forms
API routes
admin routes
expensive endpoints
```

## 13.3 Rate limiting

Examples:

```text
POST /api/contact
POST /api/newsletter
POST /api/auth/login
POST /api/password-reset
POST /api/*
```

Do not rate-limit ordinary static pages so aggressively that legitimate visitors are blocked.

## 13.4 Bot protection

Use bot protection carefully.

Do not block legitimate crawlers such as:

```text
Googlebot
Bingbot
```

merely because they are automated.

Validate suspicious crawlers rather than trusting the User-Agent string alone.

## 13.5 Security rules should be reversible

Before enforcement:

```text
Log
  ↓
Analyze
  ↓
Tune
  ↓
Challenge/block
```

---

# 14. Vercel Security

Even if Cloudflare is used, Vercel remains an important security layer.

Review:

```text
Vercel Project
  ↓
Settings
  ↓
Deployment Protection
  ↓
Firewall
  ↓
Environment Variables
  ↓
Domains
```

## 14.1 Firewall

Use Vercel's firewall for:

- abusive IPs;
- suspicious patterns;
- rate limiting;
- application-specific rules.

## 14.2 Deployment protection

Protect preview deployments if they expose:

- unfinished features;
- internal APIs;
- production-like data;
- administrative functionality.

## 14.3 Do not expose production secrets to preview unnecessarily

Separate:

```text
Development
Preview
Production
```

credentials.

---

# 15. Application Security

Infrastructure security does not make insecure application code secure.

Implement:

```text
Authentication
Authorization
Input validation
Output encoding
Rate limiting
CSRF protection where applicable
Secure cookies
Session management
Dependency updates
Error handling
Logging
```

## 15.1 Never trust client-side checks

This is insecure:

```text
if (userIsAdmin) {
   showAdminButton();
}
```

The server must independently enforce:

```text
isAuthenticated
AND
isAuthorized
```

## 15.2 Validate inputs

Validate:

```text
query parameters
path parameters
JSON bodies
forms
file uploads
headers
cookies
```

## 15.3 Limit input sizes

For public endpoints:

```text
maximum body size
maximum string length
maximum array length
maximum file size
```

should be explicitly considered.

---

# 16. HTTP Security Headers

The supplied research proposed a `vercel.json` security-header configuration.

Use the concept, but do **not** blindly copy a static CSP.

## 16.1 Recommended baseline

Consider:

```text
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
Content-Security-Policy
```

Depending on the application, also consider:

```text
Content-Security-Policy-Report-Only
```

during CSP development.

## 16.2 X-Content-Type-Options

```text
X-Content-Type-Options: nosniff
```

helps prevent MIME sniffing.

## 16.3 Referrer Policy

A reasonable baseline:

```text
Referrer-Policy: strict-origin-when-cross-origin
```

## 16.4 Permissions Policy

Restrict browser capabilities you do not use.

Example:

```text
geolocation=()
microphone=()
camera=()
```

Adjust this if your application actually requires any of these.

## 16.5 X-Frame-Options

If your site should never be embedded:

```text
X-Frame-Options: DENY
```

If same-origin embedding is required:

```text
SAMEORIGIN
```

Use the policy that matches your application.

## 16.6 Do not rely on X-XSS-Protection

Older guides frequently recommend:

```text
X-XSS-Protection: 1; mode=block
```

Do not treat this as a modern primary XSS defense.

Modern browsers rely on CSP and safe application coding rather than this legacy header.

## 16.7 Content Security Policy

Do not copy:

```text
script-src 'self' 'unsafe-inline'
```

without understanding the consequences.

Inventory:

```text
scripts
fonts
images
analytics
APIs
video
maps
payment providers
authentication
Vercel tooling
third-party widgets
```

Then build the narrowest policy that works.

---

# 17. Environment Variables and Secrets

## 17.1 Never commit

```text
.env
.env.local
.env.production
.env.production.local
*.pem
*.key
credentials.json
service-account.json
```

## 17.2 `.env.example`

Commit:

```text
.env.example
```

with fake values:

```env
NEXT_PUBLIC_SITE_URL=https://example.com
DATABASE_URL=
API_KEY=
```

## 17.3 Public vs private variables

In Next.js, anything using:

```text
NEXT_PUBLIC_
```

is intended to be exposed to browser-side code.

Therefore:

```text
NEXT_PUBLIC_SITE_URL
```

may be public.

But:

```text
DATABASE_URL
PRIVATE_API_KEY
JWT_SECRET
```

must remain server-side.

## 17.4 If a secret leaks

Immediately:

```text
1. Revoke it.
2. Generate a replacement.
3. Update Vercel.
4. Check Git history.
5. Check logs.
6. Check GitHub secret scanning.
7. Remove the leaked secret from the repository where appropriate.
```

Do not assume deleting the latest commit makes a secret safe.

---

# 18. GitHub Repository Security

## 18.1 Keep repository private

```text
GitHub repository = Private
```

## 18.2 Protect `main`

Recommended:

```text
[ ] Pull request required
[ ] CI required
[ ] Force pushes disabled
[ ] Branch deletion restricted
[ ] Required review where appropriate
```

## 18.3 2FA

Enable 2FA on:

```text
GitHub
Vercel
Cloudflare
Domain registrar
Google account
Email provider
```

## 18.4 Secret scanning

Enable available GitHub security features.

Particularly:

```text
Secret scanning
Push protection
Dependabot alerts
Dependency review
```

## 18.5 Git history

Assume anything committed to Git may remain recoverable in history.

Never use Git as a secrets vault.

---

# 19. CI/CD

## 19.1 Desired pipeline

```text
Developer
   ↓
feature branch
   ↓
Pull Request
   ↓
CI
 ┌───────────────┐
 │ lint          │
 │ typecheck     │
 │ tests         │
 │ build         │
 │ security      │
 └───────┬───────┘
         ↓
     review
         ↓
    main branch
         ↓
 Vercel production
         ↓
 smoke test
         ↓
 production
```

## 19.2 Minimum checks

```bash
npm ci
npm run lint
npm run build
```

If available:

```bash
npm test
```

Also consider:

```bash
npx tsc --noEmit
npm audit
```

Do not automatically run:

```bash
npm audit fix --force
```

in production.

Major dependency changes require review.

---

# 20. Production Deployment Workflow

## 20.1 Normal release

```text
1. Create feature branch.
2. Make change.
3. Test locally.
4. Push branch.
5. Open pull request.
6. CI runs.
7. Review.
8. Merge into main.
9. Vercel creates production deployment.
10. Run smoke tests.
11. Monitor logs.
12. Keep rollback available.
```

## 20.2 Emergency release

For critical production issues:

```text
Identify issue
     ↓
Rollback if necessary
     ↓
Create hotfix
     ↓
Test
     ↓
Deploy
     ↓
Verify
     ↓
Document incident
```

---

# 21. SEO Strategy

SEO is much larger than:

```text
robots.txt
+
sitemap.xml
```

Your production SEO system should include:

```text
Technical SEO
On-page SEO
Structured data
Crawlability
Indexability
Performance
Mobile usability
Internal linking
Social metadata
Search Console
Content quality
Authority/backlinks
```

There is no such thing as literally “perfect SEO.”

The goal is:

```text
Technically crawlable
+
Indexable
+
Understandable
+
Fast
+
Useful
+
Trustworthy
```

---

# 22. Next.js Metadata

Use Next.js Metadata APIs rather than manually repeating `<head>` tags wherever practical.

## 22.1 Root metadata

Set site-wide defaults:

```ts
export const metadata = {
  metadataBase: new URL("https://sababisha.com"),
  title: {
    default: "Sababisha Solutions",
    template: "%s | Sababisha Solutions",
  },
  description: "YOUR REAL BUSINESS DESCRIPTION",
};
```

Replace the URL and description with the actual production values.

## 22.2 Page-specific metadata

Each important page should have its own:

```text
title
description
canonical
Open Graph data
```

Do not make every page:

```text
Sababisha Solutions
```

with identical descriptions.

## 22.3 Title length

Do not treat:

```text
50–60 characters
```

as a strict Google rule.

Use concise, descriptive titles that accurately represent the page.

Avoid:

```text
keyword keyword keyword keyword
```

## 22.4 Meta descriptions

Meta descriptions are useful for snippets and click-through, but Google may generate a different snippet.

Write:

```text
unique
accurate
useful
natural
```

descriptions.

Do not stuff keywords.

---

# 23. Canonical URLs

Canonical URLs are critical after moving from:

```text
sababisha.vercel.app
```

to:

```text
sababisha.com
```

## 23.1 Production canonical

For example:

```text
https://sababisha.com/
```

## 23.2 Page canonical

For a services page:

```text
https://sababisha.com/services
```

Each page should canonicalize to its preferred URL.

## 23.3 Do not canonicalize everything to the homepage

Bad:

```text
/services → canonical / 
/products → canonical /
/contact → canonical /
```

Good:

```text
/services → /services
/products → /products
/contact → /contact
```

unless the pages are intentionally duplicates.

## 23.4 Vercel URL vs production URL

After production launch:

```text
canonical = https://sababisha.com/...
```

not:

```text
https://sababisha.vercel.app/...
```

## 23.5 HTTPS and hostname consistency

Choose one canonical form:

```text
https://sababisha.com
```

Then redirect:

```text
http://sababisha.com
http://www.sababisha.com
https://www.sababisha.com
```

to the chosen canonical host if that is your strategy.

---

# 24. robots.txt

A basic public-site configuration is conceptually:

```text
User-agent: *
Allow: /

Sitemap: https://sababisha.com/sitemap.xml
```

Use the actual production domain.

## 24.1 Do not use robots.txt as security

This is not security:

```text
Disallow: /admin
```

A malicious visitor can ignore robots.txt.

Use:

```text
authentication
authorization
```

to protect private areas.

## 24.2 Do not accidentally block assets

Be careful when blocking:

```text
/_next/
```

or other framework resources.

Search engines need access to resources required to understand and render pages.

---

# 25. Sitemap

## 25.1 Sitemap purpose

The sitemap helps search engines discover URLs.

It does not guarantee indexing.

## 25.2 Include

Only URLs that are:

```text
public
canonical
indexable
useful
```

## 25.3 Exclude

Do not include:

```text
404
redirect URLs
login
admin
private pages
preview URLs
duplicate pages
```

## 25.4 Next.js

If this is a Next.js App Router project, prefer the framework's sitemap generation where practical.

For example:

```text
app/sitemap.ts
```

can generate a sitemap programmatically.

This prevents manually maintaining a growing XML file.

---

# 26. Structured Data / JSON-LD

Structured data helps search engines understand page/entity meaning.

## 26.1 Organization

If this is an actual organization website, consider:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sababisha Solutions",
  "url": "https://sababisha.com",
  "logo": "https://sababisha.com/logo.png"
}
```

Only include properties that are true.

## 26.2 Do not blindly use WebApplication

The supplied research proposed:

```text
@type = WebApplication
```

That is appropriate for a web application/product.

It is not automatically the correct schema for the entire corporate/business website.

If the site represents a company, use appropriate organization/business structured data.

## 26.3 Breadcrumbs

If the application has hierarchical pages, consider:

```text
BreadcrumbList
```

where it genuinely represents the visible page hierarchy.

## 26.4 Do not fabricate rich-result information

Never invent:

```text
ratings
reviews
prices
awards
events
```

just to obtain rich snippets.

Structured data must accurately represent visible/real content.

---

# 27. Open Graph and Social Sharing

Set:

```text
og:title
og:description
og:image
og:url
og:type
```

## 27.1 OG image

Recommended starting point:

```text
1200 × 630
```

Use:

```text
HTTPS
absolute URL
high-quality branding
readable typography
```

## 27.2 Twitter/X

Use:

```text
twitter:card = summary_large_image
```

and appropriate title/description/image metadata.

## 27.3 Test sharing

Test URLs after deployment using the relevant social platforms' preview/debugging tools.

---

# 28. Google Search Console

This is the Google service you were referring to when you said you want to register the application so that it can appear in Google.

## 28.1 Important clarification

Search Console does not:

```text
guarantee Google ranking
```

and it does not:

```text
instantly index a website
```

It provides:

```text
ownership verification
search performance data
indexing diagnostics
sitemap submission
Core Web Vitals
security/manual-action information
```

## 28.2 Create a property

Go to:

```text
https://search.google.com/search-console
```

Choose:

```text
Domain property
```

when possible.

Enter:

```text
sababisha.com
```

## 28.3 Verify with DNS

Google will provide a TXT record.

Example concept:

```text
Type: TXT
Name: @
Value: google-site-verification=...
```

Use the exact value Google gives you.

Add it in Cloudflare DNS.

Then click:

```text
Verify
```

## 28.4 Submit sitemap

After verification:

```text
Search Console
  ↓
Sitemaps
  ↓
Add sitemap
  ↓
sitemap.xml
```

The final URL should be:

```text
https://sababisha.com/sitemap.xml
```

## 28.5 URL Inspection

Inspect:

```text
https://sababisha.com/
```

Then important pages.

Verify:

```text
URL is accessible
Crawl allowed
Indexing allowed
Canonical correct
```

## 28.6 Request indexing

Request indexing for the homepage and important newly launched pages.

Do not repeatedly spam the indexing request.

Google controls crawling/indexing schedules.

---

# 29. Bing Webmaster Tools

Also register the production domain with Bing Webmaster Tools.

This is useful because Bing powers:

- Bing Search;
- Microsoft search experiences;
- various AI/search integrations.

Submit the same production sitemap.

---

# 30. Indexing and Crawlability

Before launch, verify:

```text
HTTP 200
robots allows crawling
no accidental noindex
canonical correct
sitemap correct
links work
```

## 30.1 Search engine test

After Google has had time to crawl the site, search:

```text
site:sababisha.com
```

Do not expect immediate results immediately after deployment.

## 30.2 Indexing is not instant

A correct sitemap does not mean:

```text
submitted → indexed immediately
```

Google decides whether and when to crawl/index pages.

## 30.3 Content quality matters

Technical SEO cannot compensate for:

```text
thin content
duplicate content
misleading pages
poor user experience
copied content
```

The application should provide genuinely useful information.

---

# 31. Internationalization and `/en`

Your current application has an `/en` route.

Decide what that means.

## 31.1 Option A — `/en` is the only language

If English is the only language, consider whether:

```text
/
```

should be the primary canonical page and whether `/en` should redirect to it.

## 31.2 Option B — multiple languages

If you later add:

```text
/en
/sw
```

then implement real localization and appropriate:

```text
hreflang
```

links.

Do not generate `hreflang` tags for pages that do not actually exist.

## 31.3 Canonical strategy

Avoid situations where:

```text
/
```

and:

```text
/en
```

contain identical content but both look like independent canonical pages unless that is intentional.

---

# 32. Performance and Core Web Vitals

Target Google's recommended Core Web Vitals thresholds:

```text
LCP < 2.5 seconds
INP < 200 milliseconds
CLS < 0.1
```

## 32.1 LCP

Optimize:

```text
hero image
fonts
server response
initial HTML
critical CSS
third-party scripts
```

## 32.2 INP

Reduce:

```text
large client-side JavaScript
expensive event handlers
unnecessary React re-renders
long main-thread tasks
```

## 32.3 CLS

Reserve dimensions for:

```text
images
videos
ads
dynamic components
fonts
```

Avoid content suddenly moving after page load.

## 32.4 Use actual measurements

Check:

```text
Google PageSpeed Insights
Google Search Console
Vercel Speed Insights
Lighthouse
```

Do not optimize only for a synthetic Lighthouse score.

---

# 33. Caching

## 33.1 Public content

Public pages should avoid unnecessary origin/database work.

Use:

```text
Next.js caching
Vercel CDN
revalidation
static generation
```

where appropriate.

## 33.2 Private content

Do not publicly cache:

```text
user-specific pages
private dashboards
authenticated API responses
```

unless caching is deliberately designed to be private/safe.

## 33.3 API caching

For expensive public APIs:

```text
request
   ↓
cache
   ↓
origin only on miss/revalidation
```

This can reduce database load and cost.

---

# 34. API, Forms and Rate Limiting

## 34.1 Public forms

Protect:

```text
contact
newsletter
registration
login
password reset
```

with:

```text
rate limiting
validation
spam protection
length limits
abuse detection
```

## 34.2 Rate limiting

Do not only rate-limit by frontend JavaScript.

Rate limiting must happen at a server/edge layer that the attacker cannot bypass.

## 34.3 Expensive endpoints

If an endpoint performs:

```text
database aggregation
AI inference
file processing
external API calls
email sending
```

protect it aggressively.

## 34.4 Database

If the application later uses a database:

```text
connection pooling
indexes
pagination
timeouts
query limits
caching
```

should be part of the architecture.

Never allow arbitrary user input to become raw SQL.

---

# 35. Monitoring and Observability

## 35.1 Minimum monitoring

Track:

```text
uptime
HTTP errors
deployment failures
latency
traffic
Core Web Vitals
API errors
security events
```

## 35.2 Vercel

Use available Vercel:

```text
Logs
Analytics
Speed Insights
Deployment history
Firewall
```

## 35.3 Cloudflare

If proxying traffic through Cloudflare, monitor:

```text
traffic
security events
WAF actions
cache behavior
requests
errors
```

If Cloudflare is DNS-only, Cloudflare will not see normal HTTP traffic.

## 35.4 Uptime monitoring

Use an uptime provider or another monitoring system.

Monitor:

```text
/
```

and, if appropriate:

```text
/api/health
```

## 35.5 Health endpoint

For server-side applications:

```text
GET /api/health
```

could return:

```json
{
  "status": "ok"
}
```

Do not expose:

```text
database credentials
environment variables
stack traces
internal infrastructure
```

---

# 36. Backups and Disaster Recovery

## 36.1 Code

GitHub is the primary source-control backup.

But production recovery should not depend on one developer's laptop.

## 36.2 Database

If a database exists:

```text
[ ] Automated backups
[ ] Point-in-time recovery if available
[ ] Retention policy
[ ] Restore test
[ ] Recovery documentation
```

## 36.3 Secrets

Do not put secrets in Git.

Document:

```text
which secrets exist
where they are stored
who can rotate them
```

without publishing their actual values.

## 36.4 Domain

Keep:

```text
registrar
nameservers
DNS architecture
renewal date
```

documented.

## 36.5 Disaster recovery test

A backup is not proven until you successfully restore it.

---

# 37. Rollback Strategy

Vercel maintains deployment history.

If a release breaks production:

```text
Production v42
     ↓
Failure
     ↓
Identify last known good
     ↓
Rollback/redeploy
     ↓
Verify
```

Do not make emergency production fixes directly on a server.

Fix the repository and redeploy.

---

# 38. Domain and DNS Recovery

Keep an offline/secure record of:

```text
Registrar
Cloudflare account
Vercel account
DNS records
Email provider
Google Search Console owner
Bing Webmaster owner
```

Do not put passwords in this document.

## 38.1 If Cloudflare breaks

The recovery process should be known:

```text
Investigate Cloudflare
       ↓
Check DNS
       ↓
Check Vercel
       ↓
Check SSL
       ↓
Disable problematic proxy if necessary
       ↓
Restore DNS-only path
```

## 38.2 If Vercel breaks

```text
Check deployment
Check logs
Check status
Rollback
```

## 38.3 If domain expires

This is potentially catastrophic.

Enable:

```text
auto-renew
```

and monitor expiration.

---

# 39. Production Testing Commands

Replace the example domain with the actual production domain.

## 39.1 DNS

```bash
dig NS sababisha.com
dig A sababisha.com +short
dig AAAA sababisha.com +short
dig CNAME www.sababisha.com +short
```

## 39.2 HTTPS

```bash
curl -I https://sababisha.com
```

## 39.3 Sitemap

```bash
curl -I https://sababisha.com/sitemap.xml
curl https://sababisha.com/sitemap.xml
```

## 39.4 Robots

```bash
curl -I https://sababisha.com/robots.txt
curl https://sababisha.com/robots.txt
```

## 39.5 Redirects

```bash
curl -I http://sababisha.com
curl -I https://www.sababisha.com
```

Verify the chosen canonical host.

## 39.6 Build

```bash
npm ci
npm run lint
npm run build
```

## 39.7 TypeScript

```bash
npx tsc --noEmit
```

## 39.8 Dependencies

```bash
npm audit
```

Review results rather than blindly applying breaking fixes.

---

# 40. SEO Validation Checklist

```text
[ ] Production domain selected
[ ] Production domain added to Vercel
[ ] Production domain connected correctly
[ ] HTTPS working
[ ] Canonical hostname selected
[ ] www strategy implemented
[ ] http redirects to https
[ ] Vercel URL is not used as production canonical
[ ] Root metadata configured
[ ] Page titles unique
[ ] Meta descriptions unique
[ ] Canonical URLs correct
[ ] robots.txt accessible
[ ] Sitemap accessible
[ ] Sitemap contains canonical URLs only
[ ] Sitemap excludes private/redirect pages
[ ] Open Graph metadata configured
[ ] Twitter/X metadata configured
[ ] OG image exists
[ ] Favicon exists
[ ] Organization structured data validated
[ ] Breadcrumb structured data considered where appropriate
[ ] Semantic HTML used
[ ] One meaningful H1 per important page
[ ] Heading hierarchy logical
[ ] Images have useful alt text
[ ] Mobile layout verified
[ ] No accidental noindex
[ ] No accidental robots blocking
[ ] Google Search Console verified
[ ] Sitemap submitted
[ ] Homepage inspected
[ ] Important pages inspected
[ ] Bing Webmaster Tools configured
[ ] Core Web Vitals measured
```

---

# 41. Security Validation Checklist

```text
[ ] GitHub repository private
[ ] GitHub 2FA enabled
[ ] Vercel 2FA enabled
[ ] Cloudflare 2FA enabled
[ ] Registrar 2FA enabled
[ ] Google account 2FA enabled
[ ] Main branch protected
[ ] Secrets not committed
[ ] Secret scanning enabled
[ ] Environment variables separated by environment
[ ] Production secrets not exposed to browser
[ ] Authentication server-side
[ ] Authorization server-side
[ ] Input validation implemented
[ ] Rate limiting implemented for sensitive endpoints
[ ] Security headers configured
[ ] CSP tested
[ ] HTTPS enforced
[ ] DNSSEC considered/enabled
[ ] Error pages do not leak internals
[ ] Logs do not contain secrets
[ ] Dependencies reviewed
[ ] Backup/restore process exists
[ ] Rollback process tested
```

---

# 42. Final Production Launch Checklist

## Phase A — Ownership

```text
[ ] Repository private
[ ] License matches intended ownership
[ ] Third-party licenses reviewed
[ ] Contributor ownership documented
```

## Phase B — Domain

```text
[ ] Correct domain purchased
[ ] Domain account secured
[ ] Auto-renew enabled
[ ] Domain added to Vercel
[ ] Domain added to Cloudflare if using Cloudflare DNS
```

## Phase C — DNS

```text
[ ] Cloudflare authoritative nameservers configured
[ ] Vercel records correct
[ ] Email records correct
[ ] TXT verification records correct
[ ] No conflicting records
```

## Phase D — HTTPS

```text
[ ] HTTPS works
[ ] HTTP redirects
[ ] Canonical hostname redirects
[ ] Certificate valid
[ ] Cloudflare Full (strict) used if Cloudflare is proxying
```

## Phase E — Security

```text
[ ] Vercel Firewall reviewed
[ ] Cloudflare WAF reviewed if proxying
[ ] Rate limits configured
[ ] Security headers verified
[ ] CSP tested
[ ] Secrets verified
```

## Phase F — SEO

```text
[ ] Production URL used everywhere
[ ] Titles
[ ] Descriptions
[ ] Canonicals
[ ] robots.txt
[ ] sitemap.xml
[ ] JSON-LD
[ ] Open Graph
[ ] Favicon
[ ] Internal links
```

## Phase G — Search engines

```text
[ ] Google Search Console verified
[ ] Sitemap submitted
[ ] Homepage inspected
[ ] Important pages inspected
[ ] Bing Webmaster Tools configured
```

## Phase H — Operations

```text
[ ] Monitoring
[ ] Logs
[ ] Uptime
[ ] Backups
[ ] Restore procedure
[ ] Rollback
[ ] Incident procedure
```

---

# 43. Post-Launch Schedule

## Daily during initial launch

Check:

```text
[ ] Site availability
[ ] Vercel deployment status
[ ] Errors
[ ] Cloudflare security events if proxying
```

## Weekly

```text
[ ] Google Search Console
[ ] Bing Webmaster Tools
[ ] Vercel logs
[ ] Uptime
[ ] Security alerts
```

## Monthly

```text
[ ] Dependency updates
[ ] Performance review
[ ] Search performance
[ ] Broken links
[ ] DNS review
[ ] Domain renewal status
```

## Quarterly

```text
[ ] Full security review
[ ] Backup restore test
[ ] Access review
[ ] Remove unused accounts
[ ] Remove unused API keys
[ ] Review firewall rules
[ ] Review CSP
[ ] Review dependencies
```

---

# 44. Incident Response

When production fails:

## Step 1 — Confirm

```text
Is it:
- DNS?
- Vercel?
- Cloudflare?
- application code?
- database?
- third-party API?
```

## Step 2 — Check Vercel

Review:

```text
deployment
logs
functions
firewall
status
```

## Step 3 — Check DNS

```bash
dig A sababisha.com +short
dig NS sababisha.com
```

## Step 4 — Check HTTP

```bash
curl -I https://sababisha.com
```

## Step 5 — Roll back

If a deployment caused the incident:

```text
rollback to last known good deployment
```

## Step 6 — Fix

Create:

```text
hotfix/*
```

test it, then deploy.

## Step 7 — Document

Record:

```text
time
symptoms
root cause
impact
fix
prevention
```

---

# 45. Recommended Project Structure

A production Next.js project may look approximately like:

```text
project/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── security.yml
│
├── public/
│   ├── favicon.ico
│   ├── icon.png
│   ├── apple-icon.png
│   ├── og-image.png
│   ├── robots.txt
│   └── ...
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   └── api/
│   │       └── ...
│   │
│   ├── components/
│   ├── lib/
│   └── ...
│
├── .env.example
├── .gitignore
├── CONTRIBUTING.md
├── DEVOPS.md
├── README.md
├── SECURITY.md
├── package.json
└── ...
```

The exact structure depends on your current application.

Do not reorganize a working project merely to match this diagram.

---

# 46. Common Mistakes to Avoid

## Mistake 1 — Keeping MIT while expecting exclusive code ownership

If proprietary ownership is the goal:

```text
MIT = wrong license
```

Review licensing before launch.

## Mistake 2 — Making `sababisha.vercel.app` the canonical URL

After buying the real domain:

```text
canonical = production domain
```

## Mistake 3 — Assuming Cloudflare is mandatory

It is not.

Vercel already provides its own platform infrastructure and firewall capabilities.

Use Cloudflare because you have a reason.

## Mistake 4 — Blindly enabling Cloudflare proxy

Start with:

```text
DNS-only
```

unless you have a specific reason for reverse proxying.

## Mistake 5 — Blindly copying a CSP

A broken CSP can break:

```text
analytics
fonts
images
scripts
APIs
authentication
```

Build it around the actual application.

## Mistake 6 — Using robots.txt as security

Robots.txt is not authentication.

## Mistake 7 — Thinking sitemap guarantees ranking

It does not.

## Mistake 8 — Requesting Google indexing repeatedly

Google controls crawling/indexing.

## Mistake 9 — Putting secrets in `NEXT_PUBLIC_*`

That exposes them to browser code.

## Mistake 10 — Blindly copying DNS records from tutorials

Use the exact values shown by your current Vercel/Cloudflare dashboards.

## Mistake 11 — Proxying email records

Do not orange-cloud:

```text
MX
DKIM
SPF
DMARC
```

records.

## Mistake 12 — Using fake structured data

Do not invent:

```text
reviews
ratings
prices
awards
```

## Mistake 13 — Optimizing only for Lighthouse

Real-user performance matters.

## Mistake 14 — Never testing backups

A backup that cannot be restored is not a proven recovery mechanism.

---

# 47. Official Documentation

Use official documentation as the source of truth because dashboards, product capabilities and configuration requirements change.

## Vercel

- Custom domains: https://vercel.com/docs/domains
- Vercel Firewall: https://vercel.com/docs/vercel-firewall
- Reverse proxies: https://vercel.com/docs/security/reverse-proxy
- Vercel Knowledge Base: https://vercel.com/kb

## Cloudflare

- Cloudflare onboarding: https://developers.cloudflare.com/fundamentals/manage-domains/add-site/
- DNS: https://developers.cloudflare.com/dns/
- SSL/TLS: https://developers.cloudflare.com/ssl/
- Full (strict): https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/
- DNSSEC: https://developers.cloudflare.com/dns/dnssec/
- WAF: https://developers.cloudflare.com/waf/

## Google

- Google Search Central: https://developers.google.com/search
- Search Console: https://search.google.com/search-console
- SEO starter guidance: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Structured data: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Organization structured data: https://developers.google.com/search/docs/appearance/structured-data/organization
- Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals

## Bing

- Bing Webmaster Tools: https://www.bing.com/webmasters

## GitHub

- GitHub Docs: https://docs.github.com/
- Repository security: https://docs.github.com/en/code-security

## Next.js

- Next.js documentation: https://nextjs.org/docs
- Metadata: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Robots: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Sitemap: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

---

# 48. Production Definition of Done

The Sababisha application should be considered production-ready only when all of the following are true:

```text
                    SOURCE
                      |
              Private GitHub repo
                      |
              Protected main branch
                      |
                    CI/CD
                      |
                      v
                VERCEL
                      |
          +-----------+-----------+
          |                       |
       Preview                 Production
          |                       |
       Protected            Custom domain
                                  |
                                  v
                              CLOUDFLARE
                         DNS / optional proxy
                                  |
                                  v
                               HTTPS
                                  |
                                  v
                             NEXT.JS APP
                                  |
                    +-------------+-------------+
                    |                           |
                 Security                    SEO
                    |                           |
             Firewall/WAF                Metadata
             Rate limiting               Canonicals
             Headers                     Sitemap
             Validation                  robots
                    |                    JSON-LD
                    |                    Search Console
                    |
                    v
              Monitoring
                    |
              Backups / DR
                    |
                 Rollback
```

The final production system should satisfy:

```text
[ ] Code ownership is clearly established.
[ ] Licensing matches the intended ownership model.
[ ] Repository is private.
[ ] Accounts use strong authentication/2FA.
[ ] Main branch is protected.
[ ] CI runs before production.
[ ] Custom domain is owned and secured.
[ ] Domain is correctly connected to Vercel.
[ ] Cloudflare DNS is correctly configured if used.
[ ] Cloudflare proxy architecture has been deliberately chosen.
[ ] HTTPS works.
[ ] DNSSEC is configured where appropriate.
[ ] Security headers are configured and tested.
[ ] Secrets are protected.
[ ] APIs are validated and rate-limited where necessary.
[ ] Production metadata uses the real domain.
[ ] Canonicals are correct.
[ ] robots.txt is correct.
[ ] sitemap.xml is correct.
[ ] JSON-LD is accurate.
[ ] Open Graph is configured.
[ ] Google Search Console is verified.
[ ] Sitemap is submitted.
[ ] Important pages have been inspected.
[ ] Bing Webmaster Tools is configured.
[ ] Core Web Vitals are measured.
[ ] Monitoring exists.
[ ] Backups exist.
[ ] Restore has been tested.
[ ] Rollback is understood.
[ ] Incident response is documented.
```

---

# 49. Exact Recommended Implementation Order

Do not configure all of this randomly.

Follow this sequence.

## Stage 1 — Ownership

```text
1. Review MIT license.
2. Decide proprietary vs open source.
3. Change the license if appropriate.
4. Secure GitHub.
5. Protect main.
6. Enable 2FA.
7. Enable secret scanning.
```

## Stage 2 — Domain

```text
8. Choose exact production domain.
9. Buy/register domain.
10. Enable auto-renew.
11. Secure registrar.
12. Add domain to Vercel.
```

## Stage 3 — DNS

```text
13. Add domain to Cloudflare if Cloudflare will manage DNS.
14. Review imported records.
15. Change registrar nameservers.
16. Add exact Vercel DNS records.
17. Verify Vercel domain.
18. Verify DNS with dig.
```

## Stage 4 — HTTPS

```text
19. Verify Vercel certificate.
20. Verify HTTPS.
21. Decide canonical www/non-www.
22. Test redirects.
23. Enable HSTS after HTTPS is stable.
24. Enable DNSSEC.
```

## Stage 5 — Cloudflare

```text
25. Start DNS-only.
26. Verify application.
27. Decide whether a reverse proxy is actually required.
28. If yes, test proxied mode carefully.
29. Configure Full (strict) if proxying.
30. Add security rules gradually.
```

## Stage 6 — Application security

```text
31. Environment variables.
32. Security headers.
33. CSP.
34. API validation.
35. Rate limiting.
36. Error handling.
37. Logging.
```

## Stage 7 — SEO

```text
38. Production metadataBase.
39. Page titles.
40. Meta descriptions.
41. Canonicals.
42. robots.txt.
43. sitemap.
44. JSON-LD.
45. Open Graph.
46. favicon.
47. Semantic HTML.
48. Image alt text.
```

## Stage 8 — Search engines

```text
49. Google Search Console.
50. Domain verification.
51. Submit sitemap.
52. Inspect homepage.
53. Inspect important pages.
54. Bing Webmaster Tools.
```

## Stage 9 — Performance

```text
55. Lighthouse.
56. PageSpeed Insights.
57. Vercel Speed Insights.
58. Optimize LCP.
59. Optimize INP.
60. Fix CLS.
```

## Stage 10 — Operations

```text
61. Monitoring.
62. Uptime checks.
63. Backups.
64. Restore test.
65. Rollback test.
66. Incident response.
```

## Stage 11 — Launch

```text
67. Run final checklist.
68. Verify domain.
69. Verify DNS.
70. Verify HTTPS.
71. Verify SEO.
72. Verify security.
73. Verify monitoring.
74. Launch.
```

---

# 50. Final Mental Model

The most important thing to remember is that these services solve different problems.

```text
GitHub
   = source code + collaboration + history

Vercel
   = application deployment + Next.js hosting + CDN + deployments + firewall

Cloudflare
   = DNS + optional HTTP edge/security layer

Domain Registrar
   = ownership/control of the domain

Google Search Console
   = relationship with Google Search

Sitemap
   = URL discovery signal

robots.txt
   = crawler access instructions

Canonical
   = preferred URL signal

JSON-LD
   = structured meaning for search engines

Analytics
   = understand users/traffic

Monitoring
   = know when production breaks

Backups
   = recover data

Rollback
   = recover the application
```

The final architecture should be intentional rather than simply adding every popular DevOps service.

For this particular Vercel deployment, the safest starting point is:

```text
YOUR REAL DOMAIN
       |
       v
CLOUDFLARE DNS
       |
       | DNS-only initially
       v
VERCEL
       |
       v
NEXT.JS
```

Then introduce Cloudflare HTTP proxying only if you have a concrete requirement that justifies the trade-offs.

---

**Last reviewed: August 2026**
