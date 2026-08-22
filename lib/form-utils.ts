import { AI_TOPICS, RD_BLOGS, SERVICES } from "@/lib/db";
import type { AITopic, RDBlog, Service } from "@/lib/types";

export type ArticleCommentSource = "rd-blog" | "ai-topic";

export type CommentArticle = {
  source: ArticleCommentSource;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  slug: string;
};

export const SUPPORT_EMAIL = "support@sababisha.com";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_PATTERN = /^[+()\-\s\d]{7,24}$/;

export const OTHER_SERVICE_OPTION = {
  slug: "other",
  title: "Other project inquiry",
  category: "GENERAL",
  iconKey: "GENERAL",
  desc: "A general inquiry for projects, partnerships, demos, support, or digital transformation guidance.",
  points: [
    "Project discovery and scoping",
    "Product demos and support",
    "Partnership or implementation inquiry",
  ],
} satisfies Service;

export const CONTACT_SERVICE_OPTIONS: Service[] = [
  ...SERVICES,
  OTHER_SERVICE_OPTION,
];

export function getContactServiceBySlug(slug?: string | null) {
  if (!slug) return undefined;
  return CONTACT_SERVICE_OPTIONS.find((service) => service.slug === slug);
}

export function createServiceInquiryMessage(service: Service) {
  const points = service.points.map((point) => `- ${point}`).join("\n");

  return `Hi Sababisha team,

I would like to discuss ${service.title}.

Service category: ${service.category}
Service summary: ${service.desc}

Areas I am interested in:
${points}

My context, goals, timeline, and budget range:
`;
}

export function normalizeText(value: unknown, maxLength = 500) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export function normalizeLongText(value: unknown, maxLength?: number) {
  if (typeof value !== "string") return "";
  const text = value.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
  return typeof maxLength === "number" ? text.slice(0, maxLength) : text;
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function toCommentArticle(
  source: ArticleCommentSource,
  article: AITopic | RDBlog,
): CommentArticle {
  return {
    source,
    title: article.title,
    excerpt: article.excerpt,
    author: article.author,
    date: article.date,
    category: article.category,
    slug: article.slug,
  };
}

export function getCommentArticleBySlug(
  source: unknown,
  slug: unknown,
): CommentArticle | undefined {
  if (typeof source !== "string" || typeof slug !== "string") return undefined;

  const normalizedSlug = slug.startsWith("/en/") ? slug.slice(3) : slug;

  if (source === "rd-blog") {
    const blog = RD_BLOGS.find((item) => item.slug === slug || item.slug === normalizedSlug);
    return blog ? toCommentArticle("rd-blog", blog) : undefined;
  }

  if (source === "ai-topic") {
    const topic = AI_TOPICS.find((item) => item.slug === slug || item.slug === normalizedSlug);
    return topic ? toCommentArticle("ai-topic", topic) : undefined;
  }

  return undefined;
}

export function getArticleCommentSourceLabel(source: ArticleCommentSource) {
  return source === "rd-blog" ? "R&D Blog" : "AI Topic";
}
