<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Sababisha Solutions — Agent Rules

## Project Overview

Sababisha Solutions is a modern company website built with **Next.js 16.3.1**, **Tailwind CSS 4.3**, **GSAP**, **Lenis**, and **Motion (Framer Motion)**. It features smooth scroll animations, page transitions, a custom cursor, and a polished UI.

## Tech Stack

| Layer        | Technology                                    |
| ------------ | --------------------------------------------- |
| Framework    | Next.js 16.3.1 (App Router, Turbopack)        |
| Styling      | Tailwind CSS 4.3 (`@tailwindcss/postcss`)     |
| Animations   | GSAP 3, Lenis (smooth scroll), Motion 13      |
| UI Primitives| Radix UI (Accordion, Dropdown, Tabs, Slot)    |
| Icons        | Lucide React                                  |
| Language     | TypeScript 7                                  |

## Directory Structure

```
sababisha/
├── app/                        # Next.js App Router
│   ├── globals.css             # Global CSS (Tailwind + custom)
│   ├── layout.tsx              # Root layout (Server Component)
│   ├── not-found.tsx           # Global 404 page
│   ├── sitemap.ts              # Dynamic sitemap generator
│   ├── robots.ts               # Robots.txt generator
│   └── [lang]/                 # Dynamic locale segment (e.g. /en, /sw)
│       ├── page.tsx            # Home page
│       ├── blog/page.tsx
│       ├── contact/page.tsx
│       ├── faq/page.tsx
│       ├── gallery/page.tsx
│       ├── products/page.tsx
│       ├── services/page.tsx
│       ├── team/page.tsx
│       ├── testimonials/page.tsx
│       └── explore/
│           ├── ai-topics/page.tsx
│           ├── careers/page.tsx
│           ├── projects/page.tsx
│           └── rd-blogs/page.tsx
├── components/                 # Reusable UI components (all "use client")
├── layouts/                    # Layout wrappers (ClientLayout)
├── lib/                        # Utility functions (utils.ts)
├── assets/                     # Static assets
├── public/                     # Public files served at root
├── next.config.mjs             # Next.js configuration
├── postcss.config.mjs          # PostCSS config for Tailwind 4
├── tsconfig.json               # TypeScript config
└── package.json
```

## Routing Convention

This project uses **Binance-style locale-prefixed routing**:
- All user-facing routes live under `app/[lang]/`
- URLs follow the pattern: `https://domain.com/en/services`, `https://domain.com/en/explore/projects`
- The root `/` permanently redirects to `/en` via `next.config.mjs`

## Key Conventions

1. **Client vs Server Components**: All components using React hooks, GSAP, browser APIs, or interactivity MUST have `"use client"` at the top. The root `layout.tsx` is a Server Component; it wraps children in `<ClientLayout>`.
2. **Imports**: Use the `@/` path alias which maps to the project root (e.g., `@/components/Header`).
3. **Images**: Use the `<OptimizedImage>` wrapper component or Next.js `<Image>` with `fill` and `unoptimized` for images without known dimensions. Never use raw `<img>` tags.
4. **Links**: Always use Next.js `<Link>` with `href=` (not `to=`). Never use raw `<a>` tags for internal navigation.
5. **Icons**: `lucide-react` no longer ships brand icons (Facebook, Twitter, etc.). These are defined as inline SVGs in `components/Footer.tsx`. Use `lucide-react` only for generic UI icons.
6. **Animations**: GSAP and Lenis are initialized in `layouts/ClientLayout.tsx`. ScrollTrigger is used throughout components. Always register GSAP plugins before use.
7. **Styling**: Tailwind CSS 4.3 is used via PostCSS (`@tailwindcss/postcss`). Theme tokens are in `app/globals.css` under `@theme`. No `tailwind.config.js` file — configuration is CSS-first.
8. **Adding New Pages**: Create a new directory under `app/[lang]/` with a `page.tsx` file. The dynamic sitemap at `app/sitemap.ts` will automatically discover it.

## Do NOT

- Import from `react-router-dom` — this project uses Next.js App Router
- Use `<a>` or `<img>` HTML tags — use Next.js `<Link>` and `<Image>`
- Create components without `"use client"` if they use hooks or browser APIs
- Add `tailwind.config.js` — Tailwind 4 uses CSS-based configuration
- Reference `src/` paths — the project root is the source root
