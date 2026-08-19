import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.SITE_URL || "https://sababisha.com";
const SUPPORTED_LANGS = ["en"];

/**
 * Recursively discovers all page.tsx files under app/[lang]/
 * and returns their route paths relative to [lang].
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

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const langDir = path.join(process.cwd(), "app", "[lang]");
  const routes = discoverRoutes(langDir);

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of SUPPORTED_LANGS) {
    for (const route of routes) {
      const urlPath = route ? `/${lang}/${route}` : `/${lang}`;

      entries.push({
        url: `${BASE_URL}${urlPath}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : route.includes("explore") ? 0.7 : 0.8,
      });
    }
  }

  return entries;
}
