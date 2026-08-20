# Contributing to Sababisha Solutions

Thank you for your interest in contributing to Sababisha Solutions! We welcome contributions of all kinds — bug fixes, new features, documentation improvements, and more.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Conventions](#project-conventions)
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
4. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Start** the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

1. Make your changes in the appropriate directories
2. Test your changes locally (`npm run dev`)
3. Ensure the project builds without errors (`npm run build`)
4. Commit your changes with a clear, descriptive message
5. Push to your fork and submit a Pull Request

## Project Conventions

### File Structure

- **Pages** go in `app/[lang]/` as `page.tsx` files inside named directories
- **Components** go in `components/` — one component per file
- **Layouts** go in `layouts/`
- **Utilities** go in `lib/`
- **Shared data** such as products, services, gallery items, AI topics, R&D blogs, and teams lives in `lib/db.ts`
- **API route handlers** go in `app/api/` and must keep secrets server-side

### Code Style

- **TypeScript** is required for all code files
- **Tailwind CSS 4** for styling — no inline styles or CSS modules
- **`"use client"`** directive is required on any component using React hooks, browser APIs, or interactivity
- Use Next.js `<Link>` for internal navigation (never `<a>` tags)
- Use Next.js `<Image>` or the `<OptimizedImage>` wrapper for images (never `<img>` tags)
- Use `@/` path alias for imports (e.g., `@/components/Button`)
- Use existing shared components such as `AnimatedLink`, `Pagination`, `Button`, and `FormStatusModal` before creating new UI patterns
- Keep light and dark mode classes in sync for new forms, dropdowns, cards, and modals

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
- Use `FormStatusModal` for success and error states instead of browser alerts

### Commit Messages

Use clear, imperative commit messages:

```
feat: add careers page with job listings
fix: resolve header dropdown z-index issue
docs: update README with routing table
refactor: extract animation logic into custom hook
```

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
- [ ] Form changes include inline validation, loading states, success/error modal states, and server validation
- [ ] SEO changes update relevant metadata, sitemap priorities, robots rules, and documentation
- [ ] Documentation is updated in `README.md`, `CONTRIBUTING.md`, and `AGENTS.md` when conventions or workflows change
- [ ] Commit messages are clear and descriptive

## Reporting Issues

When reporting a bug, please include:

1. **Description** — What happened vs. what you expected
2. **Steps to reproduce** — How to trigger the issue
3. **Environment** — Browser, OS, Node.js version
4. **Screenshots** — If applicable

Open an issue on GitHub with the label `bug` for bugs or `enhancement` for feature requests.

---

Thank you for helping make Sababisha Solutions better! 🚀
