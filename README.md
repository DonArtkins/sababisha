# Sababisha Solutions

A modern, high-performance company website built with **Next.js 16**, **Tailwind CSS 4**, and **GSAP** — featuring smooth scroll animations, cinematic page transitions, and a polished, interactive UI.

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
- **Dynamic Routing** — Locale-prefixed routes (`/en/services`, `/sw/products`)
- **SEO Optimized** — Dynamic sitemap, robots.txt, and structured metadata
- **Accessibility** — Skip-to-content link, focus-visible outlines, semantic HTML

## 🛠️ Tech Stack

| Category       | Technology                                  |
| -------------- | ------------------------------------------- |
| Framework      | [Next.js 16.3.1](https://nextjs.org)        |
| Styling        | [Tailwind CSS 4.3](https://tailwindcss.com) |
| Animations     | [GSAP 3](https://gsap.com), [Motion](https://motion.dev), [Lenis](https://lenis.darkroom.engineering) |
| UI Primitives  | [Radix UI](https://radix-ui.com)            |
| Icons          | [Lucide React](https://lucide.dev)          |
| Language       | [TypeScript 7](https://typescriptlang.org)  |

## 📁 Project Structure

```
sababisha/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Robots.txt config
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
├── lib/                    # Utility functions
├── public/                 # Static assets
└── app/globals.css         # Global styles + Tailwind theme
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 20
- [npm](https://npmjs.com) >= 10

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/sababisha.git
cd sababisha

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start development server (Turbopack) |
| `npm run build`   | Create production build              |
| `npm run start`   | Start production server              |
| `npm run lint`    | Run Next.js linter                   |
| `npm run clean`   | Remove `.next` and `node_modules`    |

## 🌍 Routing

Routes follow a **locale-prefixed** pattern inspired by Binance:

| URL Pattern                      | Page          |
| -------------------------------- | ------------- |
| `/en`                            | Home          |
| `/en/services`                   | Services      |
| `/en/products`                   | Products      |
| `/en/contact`                    | Contact       |
| `/en/blog`                       | Blog          |
| `/en/faq`                        | FAQ           |
| `/en/team`                       | Team          |
| `/en/gallery`                    | Gallery       |
| `/en/testimonials`               | Testimonials  |
| `/en/explore/projects`           | Projects      |
| `/en/explore/rd-blogs`           | R&D Blogs     |
| `/en/explore/ai-topics`          | AI Topics     |
| `/en/explore/careers`            | Careers       |

The root `/` redirects permanently to `/en`.

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](./CONTRIBUTING.md) before submitting a pull request.

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

**Sababisha Solutions** — *We make it happen.*
