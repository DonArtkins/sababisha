# Lottie modals (Sababisha UX convention)

Every user-facing modal in this project uses a **local Lottie animation** from `public/lottie/` for clearer status and feedback. Do not ship modals that rely only on static Lucide icons for the primary visual.

**Related project docs:** [`README.md`](../README.md), [`CONTRIBUTING.md`](../CONTRIBUTING.md), [`AGENTS.md`](../AGENTS.md).

---

## Inventory

| Modal / surface | Component / location | Lottie asset | Used on |
| --- | --- | --- | --- |
| Form success | `components/FormStatusModal.tsx` | `/lottie/form-success.json` | Contact page, Footer newsletter, Article comment forms (R&D Blogs + AI Topics) |
| Form error | `components/FormStatusModal.tsx` | `/lottie/form-error.json` | Contact page, Footer newsletter, Article comment forms (R&D Blogs + AI Topics) |
| Live site unavailable | `components/LiveSiteUnavailableModal.tsx` | `/lottie/site-unavailable.json` | Home Products, Home Work / projects |
| Careers job details | `app/[lang]/explore/careers/page.tsx` | `/lottie/careers-info.json` | Careers explore page |
| 404 illustration | `app/not-found.tsx` | Remote Lottie URL (exception) | Global not-found |

`public/lottie/_try.json` is a scratch/test asset — do not wire it into production modals.

---

## Implementation rules

1. **Dynamic import** `@lottiefiles/react-lottie-player` with `{ ssr: false }` so the Player never runs during SSR (`document is not defined`).
2. Prefer **local** JSON under `public/lottie/` over remote CDN URLs for production modals (404 may keep a remote URL until a local asset is added).
3. Match existing modal UX: GSAP open/close, Lenis stop/start via `window.__lenis`, body scroll lock, Escape to close, portal to `document.body`.
4. Reuse `FormStatusModal` for any new form success/error flow instead of inventing a second status modal.
5. When adding a new modal, add a matching `.json` under `public/lottie/`, wire it in the component, and update this note plus `README.md`, `CONTRIBUTING.md`, and `AGENTS.md`.

### Player snippet (canonical)

```tsx
import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

// ...
<Player
  autoplay
  keepLastFrame
  loop={false} // or loop for ambient/info animations
  src="/lottie/your-animation.json"
  style={{ height: "180px", width: "100%" }}
/>
```

- Form status: `loop={false}` + `keepLastFrame` so the animation settles on the final frame.
- Info / ambient modals (site unavailable, careers): `loop` is fine.

---

## Crawl / SEO note

Lottie JSON under `public/lottie/` is a static public asset path, not an App Router page. It is **not** listed in `app/sitemap.ts`. Keep `/research/` disallowed in `app/robots.ts` so this guide is never indexed if the folder is ever exposed.

When modal or Lottie conventions change, sync root docs and this file. Sitemap route priorities only need edits when public `page.tsx` routes change — not when modal assets change.
