# Contributing to Sababisha Solutions

Thank you for your interest in contributing to Sababisha Solutions! We welcome contributions of all kinds — bug fixes, new features, documentation improvements, and more.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Environment and Resend](#environment-and-resend)
- [Development Workflow](#development-workflow)
- [Project Conventions](#project-conventions)
- [Modals and Lottie](#modals-and-lottie)
- [SEO, Sitemap, and Robots](#seo-sitemap-and-robots)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

By contributing, you agree to be respectful, inclusive, and constructive. Harassment, discrimination, or abusive behavior will not be tolerated.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/DonArtkins/sababisha.git
   cd sababisha
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Configure env vars** for local work:
   ```bash
   cp .env.example .env.local
   ```
   Fill in a Resend API key and use the development sender described below.
5. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```
6. **Start** the development server:
   ```bash
   npm run dev
   ```

## Environment and Resend

Contact and newsletter delivery use Resend through `lib/email.ts`. Never commit `.env.local` or real API keys.

| Variable            | Purpose                                                |
| ------------------- | ------------------------------------------------------ |
| `SITE_URL`          | Canonical origin for metadata, sitemap, and robots.txt |
| `RESEND_API_KEY`    | Server-only Resend API key                             |
| `RESEND_FROM_EMAIL` | Sender identity passed to Resend as `from`             |
| `CONTACT_TO_EMAIL`  | Inbox that receives form notifications (`to`)          |

### Development (required)

Always test with Resend’s shared test sender:

```env
RESEND_FROM_EMAIL="Sababisha Website <onboarding@resend.dev>"
CONTACT_TO_EMAIL=your-resend-account-email@example.com
```

- `onboarding@resend.dev` can only send to the email on your Resend account.
- Confirm the message shows **Delivered** in the Resend dashboard, not only a success modal in the UI.

### Production

1. Verify a domain you own in [Resend → Domains](https://resend.com/domains).
2. Point `RESEND_FROM_EMAIL` at an address on that verified domain.
3. Set `CONTACT_TO_EMAIL` to the real team inbox.
4. On Vercel, set the same keys for Production (and Preview if needed), then redeploy.

`*.vercel.app` hosts cannot be verified as Resend sending domains. Hosting on a free Vercel URL is fine if `from` uses a verified custom domain. Full guide: [`research/RESEND.md`](./research/RESEND.md).

## Development Workflow

1. Make your changes in the appropriate directories
2. Test your changes locally (`npm run dev`)
3. If you touch forms or email, send a real test with `onboarding@resend.dev` and check Resend → Emails
4. Ensure the project builds without errors (`npm run build`)
5. Commit your changes with a clear, descriptive message
6. Push to your fork and submit a Pull Request

## Project Conventions

### File Structure

- **Pages** go in `app/[lang]/` as `page.tsx` files inside named directories
- **Components** go in `components/` — one component per file
- **Layouts** go in `layouts/`
- **Utilities** go in `lib/`
- **Shared data** such as products, services, gallery items, AI topics, R&D blogs, and teams lives in `lib/db.ts`
- **API route handlers** go in `app/api/` and must keep secrets server-side
- **Research notes** go in `research/` (internal docs, not public routes)

### Code Style

- **TypeScript** is required for all code files
- **Tailwind CSS 4** for styling — no inline styles or CSS modules
- **`"use client"`** directive is required on any component using React hooks, browser APIs, or interactivity
- Use Next.js `<Link>` for internal navigation (never `<a>` tags)
- Use Next.js `<Image>` or the `<OptimizedImage>` wrapper for images (never `<img>` tags)
- Use `@/` path alias for imports (e.g., `@/components/Button`)
- Use existing shared components such as `AnimatedLink`, `Pagination`, `Button`, `FormStatusModal`, and `LiveSiteUnavailableModal` before creating new UI patterns
- Keep light and dark mode classes in sync for new forms, dropdowns, cards, and modals
- Place new Lottie JSON under `public/lottie/` and document it in [`research/LOTTIE-MODALS.md`](./research/LOTTIE-MODALS.md)

### Naming Conventions

- **Components**: PascalCase (`Header.tsx`, `FooterCTA.tsx`)
- **Pages**: `page.tsx` inside a route directory (`app/[lang]/services/page.tsx`)
- **Utilities**: camelCase (`utils.ts`)
- **CSS classes**: Tailwind utility classes only

### Services, Forms, and Email

- Add or modify services in `lib/db.ts`; every service needs a stable `slug`, `category`, `iconKey`, `desc`, and `points`
- Service cards should link to `/en/contact?service={slug}` through `AnimatedLink`
- Keep the services page limited to six cards per page so pagination remains predictable as the service list grows
- Contact and newsletter submissions must go through App Router route handlers under `app/api/`
- Validate form fields on both the client and server
- Keep honeypot fields in place for bot resistance
- Send email through the server-only Resend helper in `lib/email.ts`; never expose `RESEND_API_KEY` to client code
- Use `FormStatusModal` for success and error states instead of browser alerts (Lottie assets: `form-success.json`, `form-error.json`)
- Treat Resend non-success responses as form failures in the UI
- Do not ship production with `onboarding@resend.dev` as the permanent sender
- When email conventions change, update `README.md`, `AGENTS.md`, `.env.example`, and `research/RESEND.md`

### Modals and Lottie

All user-facing modals must use a **local Lottie** from `public/lottie/` for the primary visual — do not ship icon-only status modals.

| Modal | Reuse | Asset |
| ----- | ----- | ----- |
| Form success / error | `FormStatusModal` | `/lottie/form-success.json`, `/lottie/form-error.json` |
| Live site unavailable | `LiveSiteUnavailableModal` | `/lottie/site-unavailable.json` |
| Careers job details | careers page modal | `/lottie/careers-info.json` |

Rules:

- Load `@lottiefiles/react-lottie-player` with `dynamic(..., { ssr: false })`
- Prefer local JSON over remote CDN URLs for production modals
- Match existing modal behavior (portal, GSAP open/close, Lenis lock, Escape to close)
- When adding a modal, add the JSON asset and update `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, and [`research/LOTTIE-MODALS.md`](./research/LOTTIE-MODALS.md)

### Commit Messages

Use clear, imperative commit messages:

```
feat: add careers page with job listings
fix: resolve header dropdown z-index issue
docs: update README with routing table
refactor: extract animation logic into custom hook
```

## SEO, Sitemap, and Robots

When you add or change public pages, service/contact flows, modal/Lottie UX, or crawl behavior:

1. Add or update route metadata (`title`, `description`, `canonical`, Open Graph / Twitter) on the page or a colocated `layout.tsx`
2. Confirm `app/sitemap.ts` discovers the new `page.tsx` (automatic) and add a `ROUTE_CONFIG` entry if priority should differ from the default
3. Update `app/[lang]/sitemap-page/page.tsx` link groups when public routes change
4. Update `app/robots.ts` if a path must be disallowed (API, private folders, internal docs)
5. Keep `SITE_URL` accurate so sitemap, robots, and `metadataBase` stay aligned
6. Sync docs in `README.md`, `CONTRIBUTING.md`, `AGENTS.md`, and the relevant `research/` note (`RESEND.md`, `LOTTIE-MODALS.md`)

Current crawl rules in `app/robots.ts`: allow `/`; disallow `/api/`, `/_next/`, `/bugs/`, `/research/`.

`public/lottie/` files are static assets and are not sitemap routes.

## Submitting Changes

1. Ensure your branch is up to date with `main`
2. Run the build to verify everything compiles:
   ```bash
   npm run build
   ```
3. Push your branch and open a Pull Request against `main`
4. Provide a clear description of your changes in the PR
5. Link any related issues

### Pull Request Checklist

- [ ] Code compiles without errors (`npm run build`)
- [ ] New components include `"use client"` if they use hooks
- [ ] New pages are placed in `app/[lang]/` directory
- [ ] No raw HTML `<a>`, `<img>` tags — use Next.js components
- [ ] Changes are responsive (tested on mobile + desktop)
- [ ] Form changes include inline validation, loading states, Lottie success/error modal states, and server validation
- [ ] New or changed modals use local Lottie from `public/lottie/` (see `research/LOTTIE-MODALS.md`)
- [ ] Email changes use `lib/email.ts`, keep Resend secrets server-side, and were tested with `onboarding@resend.dev` when possible
- [ ] SEO changes update relevant metadata, `app/sitemap.ts` priorities, HTML sitemap groups, robots rules, and documentation
- [ ] Documentation is updated in `README.md`, `CONTRIBUTING.md`, `AGENTS.md`, and `research/` (`RESEND.md`, `LOTTIE-MODALS.md`) when email, modal, or crawl conventions change
- [ ] Commit messages are clear and descriptive

## Reporting Issues

When reporting a bug, please include:

1. **Description** — What happened vs. what you expected
2. **Steps to reproduce** — How to trigger the issue
3. **Environment** — Browser, OS, Node.js version
4. **Screenshots** — If applicable
5. **Email issues** — Resend dashboard status (**Failed** / **Delivered**) and the exact error from the email detail page (never paste live API keys)

Open an issue on GitHub with the label `bug` for bugs or `enhancement` for feature requests.

---

Thank you for helping make Sababisha Solutions better!
