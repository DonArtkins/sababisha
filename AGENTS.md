# Sababisha Solutions — Agent Rules

## Project Overview

Sababisha Solutions is a modern company website built with **Next.js 16.3.1**, **Tailwind CSS 4.3**, **GSAP**, **Lenis**, and **Motion (Framer Motion)**. It features smooth scroll animations, page transitions, a custom cursor, a data-backed services catalog, service-aware contact inquiries, Resend-backed form delivery, Lottie-powered modals, and a polished UI.

## Tech Stack

| Layer         | Technology                                 |
| ------------- | ------------------------------------------ |
| Framework     | Next.js 16.3.1 (App Router, Turbopack)     |
| Styling       | Tailwind CSS 4.3 (`@tailwindcss/postcss`)  |
| Animations    | GSAP 3, Lenis (smooth scroll), Motion 13   |
| Lottie        | `@lottiefiles/react-lottie-player` (SSR-off dynamic import) |
| UI Primitives | Radix UI (Accordion, Dropdown, Tabs, Slot) |
| Icons         | Lucide React                               |
| Email         | Resend HTTP API (`lib/email.ts`)           |
| Language      | TypeScript 7                               |

## Directory Structure

```
sababisha/
├── app/                        # Next.js App Router
│   ├── globals.css             # Global CSS (Tailwind + custom)
│   ├── layout.tsx              # Root layout (Server Component) + global SEO metadata
│   ├── not-found.tsx           # Global 404 page
│   ├── sitemap.ts              # Dynamic sitemap generator
│   ├── robots.ts               # Robots.txt generator
│   ├── api/                    # Server route handlers
│   │   ├── contact/route.ts    # Service inquiry email endpoint
│   │   ├── newsletter/route.ts # Footer newsletter email endpoint
│   │   └── comment/route.ts    # Article comment email endpoint (R&D + AI)
│   ├── page.tsx                # Home page
│   ├── blog/page.tsx
│   ├── contact/page.tsx
│   ├── contact/layout.tsx      # Contact route SEO metadata
│   ├── faq/page.tsx
│   ├── gallery/page.tsx
│   ├── products/page.tsx
│   ├── services/page.tsx
│   ├── team/page.tsx
│   ├── testimonials/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── sitemap-page/page.tsx
│   └── explore/
│       ├── ai-topics/page.tsx
│       ├── careers/page.tsx
│       ├── projects/page.tsx
│       └── rd-blogs/page.tsx
├── components/                 # Reusable UI components (all "use client")
├── layouts/                    # Layout wrappers (ClientLayout)
├── lib/                        # Data, type, email, form, and utility helpers
├── research/                   # Internal research notes (not a public route)
│   ├── RESEND.md               # Resend setup, domain verify, .vercel.app workarounds
│   └── LOTTIE-MODALS.md        # Modal inventory + Lottie UX convention
├── assets/                     # Static assets
├── public/                     # Public files served at root
│   └── lottie/                 # Local Lottie JSON for all production modals
├── next.config.mjs             # Next.js configuration
├── postcss.config.mjs          # PostCSS config for Tailwind 4
├── tsconfig.json               # TypeScript config
├── .env.example                # Env var template (no secrets)
└── package.json
```

## Routing Convention

This project uses **standard Next.js 16 App Router routing**:

- All user-facing routes live directly under `app/`
- URLs follow the pattern: `https://domain.com/services`, `https://domain.com/explore/projects`
- The root `/` serves the home page directly

## Key Conventions

1. **Client vs Server Components**: All components using React hooks, GSAP, browser APIs, or interactivity MUST have `"use client"` at the top. The root `layout.tsx` is a Server Component; it wraps children in `<ClientLayout>`.
2. **Imports**: Use the `@/` path alias which maps to the project root (e.g., `@/components/Header`).
3. **Images**: Use the `<OptimizedImage>` wrapper component or Next.js `<Image>` with `fill` and `unoptimized` for images without known dimensions. Never use raw `<img>` tags.
4. **Links**: Always use Next.js `<Link>` with `href=` (not `to=`). Never use raw `<a>` tags for internal navigation.
5. **Icons**: `lucide-react` no longer ships brand icons (Facebook, Twitter, etc.). These are defined as inline SVGs in `components/Footer.tsx`. Use `lucide-react` only for generic UI icons.
6. **Animations**: GSAP and Lenis are initialized in `layouts/ClientLayout.tsx`. ScrollTrigger is used throughout components. Always register GSAP plugins before use.
7. **Styling**: Tailwind CSS 4.3 is used via PostCSS (`@tailwindcss/postcss`). Theme tokens are in `app/globals.css` under `@theme`. No `tailwind.config.js` file — configuration is CSS-first.
8. **Services Data**: Service cards are driven by `SERVICES` in `lib/db.ts` and the `Service` type in `lib/types.ts`. Each service needs a stable `slug`, `category`, `iconKey`, `desc`, and `points`.
9. **Services Page**: The services page uses a six-card page limit, dynamic counters from service data, and `AnimatedLink` CTAs to `/en/contact?service={slug}`. Keep cards compact and avoid large fixed heights that strand the CTA far below the content.
10. **Forms**: Contact, newsletter, and article comment forms validate on the client and server, include honeypot fields, submit to `app/api/contact`, `app/api/newsletter`, and `app/api/comment`, and show `FormStatusModal` success/error states with local Lottie files from `public/lottie/`.
11. **Lottie Modals (required UX)**: Every user-facing modal must use a local Lottie animation from `public/lottie/` — never a static Lucide icon as the primary modal visual. Load `@lottiefiles/react-lottie-player` with `dynamic(..., { ssr: false })`.
   - `FormStatusModal` → `/lottie/form-success.json`, `/lottie/form-error.json` (contact, newsletter, article comments)
   - `LiveSiteUnavailableModal` → `/lottie/site-unavailable.json` (Products + Work)
   - Careers job details modal → `/lottie/careers-info.json`
   - Reuse existing modal components before creating new ones; add a matching JSON asset when a new modal is required.
   - Full inventory and Player rules: [`research/LOTTIE-MODALS.md`](./research/LOTTIE-MODALS.md).
12. **Email Delivery (Resend)**: Email is sent server-side through `lib/email.ts` using Resend's HTTP API. Keep secrets in environment variables only — never client-side.
   - Resend keys used by this app: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, plus the app inbox `CONTACT_TO_EMAIL` (the `to` recipient).
   - **Development:** always set `RESEND_FROM_EMAIL` to `Sababisha Website <onboarding@resend.dev>` and set `CONTACT_TO_EMAIL` to the Resend account email. The `resend.dev` sender can only deliver to that account inbox.
   - **Production:** verify a domain you own in Resend → Domains, then set `RESEND_FROM_EMAIL` to an address on that verified domain (for example `Sababisha Website <support@sababisha.com>`).
   - Resend verifies the **`from` domain**, not the website hostname. An app on `*.vercel.app` cannot use `@….vercel.app` as `from`; send from a verified custom domain instead (or keep using `onboarding@resend.dev` for throwaway demos only).
   - Gate UI success on Resend accepting the send; confirm **Delivered** in the Resend dashboard when cutting over.
   - Full walkthrough: [`research/RESEND.md`](./research/RESEND.md).
   - Article comments use `renderArticleCommentEmail` and include the article title, type (R&D Blog / AI Topic), category, author, date, excerpt, and URL. Reuse `ArticleCommentForm` on detail pages — do not duplicate inline comment forms.
13. **SEO and Crawl Files**: Update route metadata, `app/sitemap.ts`, `app/robots.ts`, and root markdown docs (`README.md`, `CONTRIBUTING.md`, `AGENTS.md`) whenever public routes, service/contact flows, email delivery behavior, modal/Lottie UX conventions, or crawl rules change. Also update [`research/LOTTIE-MODALS.md`](./research/LOTTIE-MODALS.md) when modal inventory changes.
    - Global SEO lives in `app/layout.tsx` (`metadataBase`, canonical, Open Graph, Twitter, robots).
    - Route SEO examples: `app/services/page.tsx`, `app/contact/layout.tsx`.
    - `app/sitemap.ts` auto-discovers `page.tsx` under `app/` and applies route priorities. Lottie assets under `public/lottie/` are static files — not sitemap routes.
    - `app/robots.ts` allows public pages and disallows `/api/`, `/_next/`, `/bugs/`, and `/research/`.
    - HTML sitemap: `app/sitemap-page/page.tsx` — keep link groups in sync when public routes change.
14. **Adding New Pages**: Create a new directory under `app/` with a `page.tsx` file. The dynamic sitemap at `app/sitemap.ts` will automatically discover it. Add an explicit `ROUTE_CONFIG` entry when the page needs a non-default priority, and add page-level metadata for SEO.
15. **Research Notes**: Keep long-form setup guides under `research/` (including `RESEND.md` and `LOTTIE-MODALS.md`). These are repo docs only — not public App Router routes. Do not put secrets in research notes.

## Do NOT

- Import from `react-router-dom` — this project uses Next.js App Router
- Use `<a>` or `<img>` HTML tags — use Next.js `<Link>` and `<Image>`
- Create components without `"use client"` if they use hooks or browser APIs
- Add `tailwind.config.js` — Tailwind 4 uses CSS-based configuration
- Reference `src/` paths — the project root is the source root
- Ship a modal whose primary visual is only a static icon — use a local Lottie from `public/lottie/`
- Import `@lottiefiles/react-lottie-player` without `{ ssr: false }` dynamic import
- Expose `RESEND_API_KEY` (or any Resend secret) to client components or public docs
- Ship production traffic with `onboarding@resend.dev` as the permanent `from` address
- Attempt to verify `*.vercel.app` as a Resend sending domain
