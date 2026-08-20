import { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL || "https://sababisha.com";

/**
 * Crawl policy for public marketing pages.
 * Keep disallow list in sync with README / CONTRIBUTING / AGENTS when paths change.
 * `/research/` is repo documentation only and must not be indexed if ever exposed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/bugs/",
          "/research/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
