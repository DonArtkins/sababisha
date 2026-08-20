import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.SITE_URL || "https://sababisha.com";
const SUPPORTED_LANGS = ["en"];

type SitemapEntry = MetadataRoute.Sitemap[number];
type RouteConfig = {
  changeFrequency: NonNullable<SitemapEntry["changeFrequency"]>;
  priority: number;
};

/**
 * Explicit priorities for known public routes.
 * Contact/services stay elevated because they drive inquiry conversion.
 * New pages under app/[lang]/ are still auto-discovered; add an entry here
 * when the default priority is wrong.
 *
 * Not included: static assets such as public/lottie/*.json (modals use these
 * for UX; they are not App Router pages). When public routes or modal/Lottie
 * conventions change, sync README.md, CONTRIBUTING.md, AGENTS.md, and
 * research/LOTTIE-MODALS.md. Also update app/[lang]/sitemap-page/page.tsx.
 */
const ROUTE_CONFIG: Record<string, RouteConfig> = {
  "": { changeFrequency: "daily", priority: 1.0 },
  services: { changeFrequency: "weekly", priority: 0.95 },
  contact: { changeFrequency: "weekly", priority: 0.9 },
  products: { changeFrequency: "weekly", priority: 0.9 },
  "explore/projects": { changeFrequency: "weekly", priority: 0.8 },
  "explore/rd-blogs": { changeFrequency: "weekly", priority: 0.75 },
  "explore/ai-topics": { changeFrequency: "weekly", priority: 0.75 },
  "explore/careers": { changeFrequency: "weekly", priority: 0.7 },
  blog: { changeFrequency: "weekly", priority: 0.75 },
  faq: { changeFrequency: "monthly", priority: 0.7 },
  team: { changeFrequency: "monthly", priority: 0.7 },
  gallery: { changeFrequency: "monthly", priority: 0.65 },
  testimonials: { changeFrequency: "monthly", priority: 0.65 },
  "privacy-policy": { changeFrequency: "yearly", priority: 0.4 },
  "sitemap-page": { changeFrequency: "monthly", priority: 0.45 },
};

/**
 * Recursively discovers all page files under app/[lang]/ and returns route
 * paths relative to [lang]. New public pages are included automatically.
 */
function discoverRoutes(dir: string, basePath = ""): string[] {
  const routes: string[] = [];

  if (!fs.existsSync(dir)) return routes;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Skip directories that are dynamic segments (other than [lang] which we handle at top level)
      if (entry.name.startsWith("[") && entry.name.endsWith("]")) continue;
      // Skip private folders (prefixed with _)
      if (entry.name.startsWith("_")) continue;

      const nestedPath = basePath ? `${basePath}/${entry.name}` : entry.name;
      routes.push(...discoverRoutes(path.join(dir, entry.name), nestedPath));
    } else if (entry.name === "page.tsx" || entry.name === "page.ts" || entry.name === "page.jsx" || entry.name === "page.js") {
      // Found a page — the basePath is the route
      routes.push(basePath);
    }
  }

  return routes.sort((a, b) => a.localeCompare(b));
}

function getRouteConfig(route: string): RouteConfig {
  if (ROUTE_CONFIG[route]) return ROUTE_CONFIG[route];

  if (route.includes("privacy-policy") || route.includes("sitemap-page")) {
    return { changeFrequency: "monthly", priority: 0.45 };
  }

  if (route.includes("explore")) {
    return { changeFrequency: "weekly", priority: 0.7 };
  }

  return { changeFrequency: "weekly", priority: 0.8 };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const langDir = path.join(process.cwd(), "app", "[lang]");
  const routes = discoverRoutes(langDir);
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of SUPPORTED_LANGS) {
    for (const route of routes) {
      const urlPath = route ? `/${lang}/${route}` : `/${lang}`;
      const config = getRouteConfig(route);

      entries.push({
        url: `${BASE_URL}${urlPath}`,
        lastModified,
        changeFrequency: config.changeFrequency,
        priority: config.priority,
      });
    }
  }

  return entries;
}
