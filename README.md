# Sababisha Solutions

A modern, high-performance company website for **Sababisha Solutions Limited** — a Nairobi-based technology firm specializing in fintech platforms, expert consultancy, enterprise systems, analytics, custom software, and long-term support. Built with **Next.js 16**, **Tailwind CSS 4**, and **GSAP** — featuring smooth scroll animations, cinematic page transitions, service-aware contact flows, Lottie status modals, and a polished, interactive UI.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?logo=nextdotjs)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178c6?logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

---

## ✨ Features

- **Smooth Scroll** — Lenis-powered buttery scroll with GSAP ScrollTrigger integration
- **Page Transitions** — Cinematic curtain-sweep transitions between routes
- **Custom Cursor** — Interactive cursor that reacts to hoverable elements
- **Preloader** — Branded loading screen on initial visit
- **Responsive Design** — Fully responsive from mobile to ultra-wide
- **Services Catalog** — Data-backed service cards with six-card pagination limits, dynamic counters, and animated inquiry links
- **Service-Aware Contact Form** — `/en/contact?service=...` preselects and prefills the exact service inquiry
- **Email Delivery** — Contact and newsletter submissions are sent through server-only Resend API routes
- **Status Modals** — Shared success/error Lottie modal for contact and newsletter responses
- **Dynamic Routing** — Locale-prefixed routes (`/en/services`, `/en/products`)
- **SEO Optimized** — Dynamic sitemap, robots.txt, canonical metadata, Open Graph, and Twitter card metadata
- **Accessibility** — Skip-to-content link, focus-visible outlines, semantic HTML

## 🏢 About Sababisha Solutions

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

## 🛠️ Tech Stack

| Category      | Technology                                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| Framework     | [Next.js 16.3.1](https://nextjs.org)                                                                  |
| Styling       | [Tailwind CSS 4.3](https://tailwindcss.com)                                                           |
| Animations    | [GSAP 3](https://gsap.com), [Motion](https://motion.dev), [Lenis](https://lenis.darkroom.engineering) |
| UI Primitives | [Radix UI](https://radix-ui.com)                                                                      |
| Icons         | [Lucide React](https://lucide.dev)                                                                    |
| Language      | [TypeScript 7](https://typescriptlang.org)                                                            |

## 📁 Project Structure

```
sababisha/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Robots.txt config
│   ├── api/                # Server route handlers
│   │   ├── contact/        # Service inquiry email endpoint
│   │   └── newsletter/     # Newsletter subscription endpoint
│   └── [lang]/             # Dynamic locale segment
│       ├── page.tsx         # Home
│       ├── services/
│       ├── products/
│       ├── contact/
│       ├── blog/
│       ├── faq/
│       ├── team/
│       ├── gallery/
│       ├── testimonials/
│       └── explore/
│           ├── projects/
│           ├── rd-blogs/
│           ├── ai-topics/
│           └── careers/
├── components/             # Reusable UI components
├── layouts/                # Layout wrappers
├── lib/                    # Data, email, form, type, and utility helpers
├── public/                 # Static assets, icons, and Lottie animations
└── app/globals.css         # Global styles + Tailwind theme
```

## 🚀 Getting Started

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

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Canonical site origin used by metadata, sitemap, and robots.txt |
| `RESEND_API_KEY` | Server-only API key for contact and newsletter email delivery |
| `RESEND_FROM_EMAIL` | Verified sender identity, for example `Sababisha Website <website@sababisha.com>` |
| `SABABISHA_CONTACT_EMAIL` | Inbox that receives service inquiries and newsletter signups |

### Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start development server (Turbopack) |
| `npm run build` | Create production build              |
| `npm run start` | Start production server              |
| `npm run lint`  | Run Next.js linter                   |
| `npm run clean` | Remove `.next` and `node_modules`    |

## 🌍 Routing

Routes follow a **locale-prefixed** pattern inspired by Binance:

| URL Pattern             | Page         |
| ----------------------- | ------------ |
| `/en`                   | Home         |
| `/en/services`          | Services     |
| `/en/products`          | Products     |
| `/en/contact`           | Contact      |
| `/en/blog`              | Blog         |
| `/en/faq`               | FAQ          |
| `/en/team`              | Team         |
| `/en/gallery`           | Gallery      |
| `/en/testimonials`      | Testimonials |
| `/en/explore/projects`  | Projects     |
| `/en/explore/rd-blogs`  | R&D Blogs    |
| `/en/explore/ai-topics` | AI Topics    |
| `/en/explore/careers`   | Careers      |

The root `/` redirects permanently to `/en`.

## Services and Inquiry Flow

Services are defined in `lib/db.ts` and typed in `lib/types.ts`. Each service includes a stable `slug`, `category`, `iconKey`, description, and capability points.

The services page:

- Displays service stats from the same `SERVICES` data source
- Shows up to six service cards per page
- Uses animated `Discuss Service` links
- Routes users to `/en/contact?service={service-slug}`

The contact page:

- Reads the `service` query parameter
- Preselects the matching service
- Prefills the message with service details
- Validates name, email, phone, service, and message fields on the client and server
- Uses a honeypot `website` field to silently ignore bot submissions
- Shows shared Lottie success/error modals

## Forms and Email Delivery

Form submissions are handled by App Router API routes:

| Route | Purpose |
| --- | --- |
| `/api/contact` | Sends service inquiries to the Sababisha inbox |
| `/api/newsletter` | Sends footer newsletter signup notifications |

Both routes normalize input, escape HTML, validate fields, and call Resend through `lib/email.ts`. API keys are never exposed to the browser.

## SEO and Crawl Files

- `app/layout.tsx` defines global metadata, canonical URL, keywords, Open Graph, and Twitter card settings.
- `app/[lang]/services/page.tsx` defines services-specific metadata.
- `app/[lang]/contact/layout.tsx` defines contact-specific metadata while keeping the page interactive.
- `app/sitemap.ts` automatically discovers public `page.tsx` files and assigns higher priority to home, services, contact, products, and project pages.
- `app/robots.ts` allows public content and disallows `/api/`, `/_next/`, and `/bugs/`.

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](./CONTRIBUTING.md) before submitting a pull request.

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

**Sababisha Solutions** — _We Make It Happen._
