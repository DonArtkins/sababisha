import { SERVICES } from "@/lib/db";
import type { Service } from "@/lib/types";

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

export function normalizeLongText(value: unknown, maxLength = 1600) {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim().slice(0, maxLength);
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
