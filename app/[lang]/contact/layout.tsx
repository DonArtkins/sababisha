import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sababisha Solutions for project discovery, fintech platforms, enterprise systems, analytics dashboards, custom software, consultancy, support, and service-specific inquiries.",
  keywords: [
    "contact Sababisha Solutions",
    "software company Nairobi contact",
    "fintech platform inquiry",
    "enterprise software inquiry",
    "custom software consultation Kenya",
    "technology support Nairobi",
  ],
  alternates: {
    canonical: "/en/contact",
  },
  openGraph: {
    title: "Contact | Sababisha Solutions Limited",
    description:
      "Send a service-specific inquiry to Sababisha Solutions and share your project goals, timeline, and support needs.",
    url: "/en/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Sababisha Solutions Limited",
    description:
      "Start a project, service, support, or partnership inquiry with Sababisha Solutions.",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
