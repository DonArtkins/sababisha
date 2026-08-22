# Sababisha Solutions

A modern, high-performance company website for **Sababisha Solutions Limited** — a Nairobi-based technology firm specializing in fintech platforms, expert consultancy, enterprise systems, analytics, custom software, and long-term support. Built with **Next.js 16**, **Tailwind CSS 4**, and **GSAP** — featuring smooth scroll animations, cinematic page transitions, service-aware contact flows, Lottie-powered modals, and a polished, interactive UI.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?logo=nextdotjs)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178c6?logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

---

## Features

- **Smooth Scroll** — Lenis-powered buttery scroll with GSAP ScrollTrigger integration
- **Page Transitions** — Cinematic curtain-sweep transitions between routes
- **Custom Cursor** — Interactive cursor that reacts to hoverable elements
- **Preloader** — Branded loading screen on initial visit
- **Responsive Design** — Fully responsive from mobile to ultra-wide
- **Services Catalog** — Data-backed service cards with six-card pagination limits, dynamic counters, and animated inquiry links
- **Service-Aware Contact Form** — `/contact?service=...` preselects and prefills the exact service inquiry
- **Email Delivery** — Contact, newsletter, and article comment submissions are sent through server-only Resend API routes
- **Status Modals** — All user-facing modals use local Lottie animations (`FormStatusModal`, `LiveSiteUnavailableModal`, careers job details)
- **Dynamic Routing** — Standard locale-free routes (`/services`, `/products`, etc.)
- **SEO Optimized** — Dynamic sitemap, robots.txt, HTML sitemap page, canonical metadata, Open Graph, and Twitter card metadata
- **Accessibility** — Skip-to-content link, focus-visible outlines, semantic HTML

## About Sababisha Solutions

### About Us

We are a premier innovative technology firm based in Nairobi, Kenya.
We specialize in fintech solutions, expert consultancy, and custom Enterprise level software development.

Our team is dedicated to transforming innovative ideas into powerful digital solutions tailored to your business needs.

Partner with us to drive growth and achieve your digital transformation goals.

### Our Mission

**Empowering Businesses Through Innovation**

Innovation is the cornerstone of our approach. We strive to revolutionize the way businesses operate by harnessing cutting-edge technologies and creative solutions. Our goal is to empower businesses to thrive in a dynamic and competitive landscape.

We are dedicated to being your trusted partner, delivering top-notch services and expertise tailored to meet the unique needs of each client.

Our commitment to excellence and passion for technology fuels our efforts to help you navigate the ever-evolving digital landscape with confidence. We believe in the power of innovation to drive progress and transform industries. By staying ahead of the curve and embracing change, we enable businesses to seize new opportunities and achieve sustainable growth.

### Our Vision

**Driving Digital Evolution with Innovative Solutions**

To innovation, reliability, and client success. We strive to create a future where businesses of all sizes can harness the power of technology to achieve their goals and realize their full potential.

By continuously pushing the boundaries of what's possible, we aim to set new standards in the IT industry and be the go-to ally for companies seeking to thrive in the digital age.

## Tech Stack

| Category      | Technology                                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| Framework     | [Next.js 16.3.1](https://nextjs.org)                                                                  |
| Styling       | [Tailwind CSS 4.3](https://tailwindcss.com)                                                           |
| Animations    | [GSAP 3](https://gsap.com), [Motion](https://motion.dev), [Lenis](https://lenis.darkroom.engineering) |
| Lottie        | [`@lottiefiles/react-lottie-player`](https://www.npmjs.com/package/@lottiefiles/react-lottie-player) (local JSON in `public/lottie/`) |
| UI Primitives | [Radix UI](https://radix-ui.com)                                                                      |
| Icons         | [Lucide React](https://lucide.dev)                                                                    |
| Email         | [Resend](https://resend.com) via `lib/email.ts`                                                       |
| Language      | [TypeScript 7](https://typescriptlang.org)                                                            |

## Project Structure

```
sababisha/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout + global SEO metadata
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Robots.txt config
│   ├── api/                # Server route handlers
│   │   ├── contact/        # Service inquiry email endpoint
│   │   ├── newsletter/     # Newsletter subscription endpoint
│   │   └── comment/        # Article comment email endpoint
│   ├── page.tsx            # Home
│   ├── services/
│   ├── products/
│   ├── contact/
│   ├── blog/
│   ├── faq/
│   ├── team/
│   ├── gallery/
│   ├── testimonials/
│   ├── privacy-policy/
│   ├── sitemap-page/
│   └── explore/
│       ├── projects/
│       ├── rd-blogs/
│       ├── ai-topics/
│       └── careers/
├── components/             # Reusable UI components
├── layouts/                # Layout wrappers
├── lib/                    # Data, email, form, type, and utility helpers
├── research/               # Internal setup notes (not a public route)
│   ├── RESEND.md           # Resend domain verify + .vercel.app guidance
│   └── LOTTIE-MODALS.md    # Modal inventory + Lottie UX convention
├── public/                 # Static assets, icons, and Lottie animations
│   └── lottie/             # Local JSON for all production modals
└── app/globals.css         # Global styles + Tailwind theme
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 20
- [npm](https://npmjs.com) >= 10

### Installation

```bash
# Clone the repository
git clone https://github.com/DonArtkins/sababisha.git
cd sababisha

# Install dependencies
npm install

# Create local environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable            | Purpose                                                              |
| ------------------- | -------------------------------------------------------------------- |
| `SITE_URL`          | Canonical site origin used by metadata, sitemap, and robots.txt      |
| `RESEND_API_KEY`    | Server-only API key for contact and newsletter email delivery        |
| `RESEND_FROM_EMAIL` | Sender identity (`from`). Use `onboarding@resend.dev` in development |
| `CONTACT_TO_EMAIL`  | Inbox that receives inquiries, newsletter signups, and article comments (`to`) |

#### Development (default for local testing)

```env
SITE_URL=http://localhost:3000
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL="Sababisha Website <onboarding@resend.dev>"
CONTACT_TO_EMAIL=your-resend-account-email@example.com
```

`onboarding@resend.dev` only delivers to the email address on your Resend account. Always confirm **Delivered** in the Resend dashboard when testing.

#### Production

1. Verify your sending domain in [Resend → Domains](https://resend.com/domains).
2. Set `RESEND_FROM_EMAIL` to an address on that verified domain, for example `Sababisha Website <support@sababisha.com>`.
3. Set `CONTACT_TO_EMAIL` to the real team inbox.
4. Set the same variables in Vercel → Project → Settings → Environment Variables, then redeploy.

Resend verifies the **`from` domain**, not the website URL. Apps hosted only on `*.vercel.app` cannot send as `@….vercel.app`. Use a verified custom domain for `from`, or keep `onboarding@resend.dev` for throwaway demos. Details: [`research/RESEND.md`](./research/RESEND.md).

### Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start development server (Turbopack) |
| `npm run build` | Create production build              |
| `npm run start` | Start production server              |
| `npm run lint`  | Run Next.js linter                   |
| `npm run clean` | Remove `.next` and `node_modules`    |

## Routing

Routes follow standard Next.js App Router conventions (no locale prefix):

| URL Pattern             | Page           |
| ----------------------- | -------------- |
| `/`                     | Home           |
| `/services`             | Services       |
| `/products`             | Products       |
| `/contact`              | Contact        |
| `/blog`                 | Blog           |
| `/faq`                  | FAQ            |
| `/team`                 | Team           |
| `/gallery`              | Gallery        |
| `/testimonials`         | Testimonials   |
| `/privacy-policy`       | Privacy Policy |
| `/sitemap-page`         | HTML Sitemap   |
| `/explore/projects`     | Projects       |
| `/explore/rd-blogs`     | R&D Blogs      |
| `/explore/ai-topics`    | AI Topics      |
| `/explore/careers`       | Careers        |

## Services and Inquiry Flow

Services are defined in `lib/db.ts` and typed in `lib/types.ts`. Each service includes a stable `slug`, `category`, `iconKey`, description, and capability points.

The services page:

- Displays service stats from the same `SERVICES` data source
- Shows up to six service cards per page
- Uses animated `Discuss Service` links
- Routes users to `/contact?service={service-slug}`

The contact page:

- Reads the `service` query parameter
- Preselects the matching service
- Prefills the message with service details
- Validates name, email, phone, service, and message fields on the client and server
- Uses a honeypot `website` field to silently ignore bot submissions
- Shows shared Lottie success/error modals (`FormStatusModal` + `/lottie/form-success.json` / `form-error.json`)

### Article comment forms (R&D Blogs + AI Topics)

Detail pages reuse `components/ArticleCommentForm.tsx`, which:

- Validates name, email, and message on the client and server
- Uses a honeypot `website` field to silently ignore bot submissions
- Posts to `/api/comment` with the article source (`rd-blog` | `ai-topic`) and slug
- Looks up article metadata server-side and emails title, type, category, author, date, excerpt, and URL
- Shows the same Lottie `FormStatusModal` success/error states as contact and newsletter

## Modals and Lottie UX

Every user-facing modal uses a **local Lottie** from `public/lottie/` (not a static icon as the primary visual). Player is loaded with `dynamic(..., { ssr: false })`.

| Modal | Component | Asset |
| ----- | --------- | ----- |
| Form success / error | `components/FormStatusModal.tsx` | `form-success.json`, `form-error.json` |
| Live site unavailable | `components/LiveSiteUnavailableModal.tsx` | `site-unavailable.json` |
| Careers job details | `app/[lang]/explore/careers/page.tsx` | `careers-info.json` |

Full inventory and contributor rules: [`research/LOTTIE-MODALS.md`](./research/LOTTIE-MODALS.md).

## Forms and Email Delivery

Form submissions are handled by App Router API routes:

| Route             | Purpose                                         |
| ----------------- | ----------------------------------------------- |
| `/api/contact`    | Sends service inquiries to the configured inbox |
| `/api/newsletter` | Sends footer newsletter signup notifications    |
| `/api/comment`    | Sends R&D Blog / AI Topic article comments      |

These routes normalize input, escape HTML, validate fields, and call Resend through `lib/email.ts`. API keys are never exposed to the browser.

| Stage             | `RESEND_FROM_EMAIL`                         | Recipient notes                   |
| ----------------- | ------------------------------------------- | --------------------------------- |
| Local development | `Sababisha Website <onboarding@resend.dev>` | Must be your Resend account email |
| Production        | Address on a **verified** custom domain     | Real team inbox                   |

UI success only means the API route accepted Resend’s response. Use the Resend dashboard status as the delivery source of truth.

## SEO and Crawl Files

- `app/layout.tsx` defines global metadata, `metadataBase`, canonical URL, keywords, Open Graph, Twitter cards, and indexing robots directives.
- `app/services/page.tsx` defines services-specific metadata.
- `app/contact/layout.tsx` defines contact-specific metadata while keeping the page interactive.
- `app/sitemap.ts` automatically discovers public `page.tsx` files under `app/` and assigns priorities (home highest; services/contact/products elevated; legal/sitemap pages lower). Lottie files under `public/lottie/` are static assets and are **not** sitemap entries.
- `app/sitemap-page/page.tsx` is the human-readable HTML sitemap; keep its link groups aligned with public routes.
- `app/robots.ts` allows public content and disallows `/api/`, `/_next/`, `/bugs/`, and `/research/`.
- `SITE_URL` must match the public origin so sitemap URLs, robots `host`/`sitemap`, and canonical metadata stay consistent.
- When routes, crawl rules, email, or modal/Lottie conventions change, also update `README.md`, `CONTRIBUTING.md`, `AGENTS.md`, and the matching `research/` note.

## Research Notes

Internal setup guides live in [`research/`](./research/):

- [`research/RESEND.md`](./research/RESEND.md) — Resend API keys, `onboarding@resend.dev` testing, domain verification, and `.vercel.app` workarounds
- [`research/LOTTIE-MODALS.md`](./research/LOTTIE-MODALS.md) — modal inventory, Player rules, and required Lottie UX convention

## Contributing

Contributions are welcome! Please read the [Contributing Guide](./CONTRIBUTING.md) before submitting a pull request. Agent and coding conventions live in [`AGENTS.md`](./AGENTS.md).

## License

This project is licensed under the [MIT License](./LICENSE).

---

**Sababisha Solutions** — _We Make It Happen._
