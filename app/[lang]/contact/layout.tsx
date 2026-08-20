import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sababisha Solutions for project discovery, fintech platforms, enterprise systems, analytics dashboards, custom software, consultancy, support, and service-specific inquiries. Submit a guided inquiry and our team will follow up by email.",
  keywords: [
    "contact Sababisha Solutions",
    "software company Nairobi contact",
    "fintech platform inquiry",
    "enterprise software inquiry",
    "custom software consultation Kenya",
    "technology support Nairobi",
    "service inquiry form Kenya",
    "Sababisha contact email",
  ],
  alternates: {
    canonical: "/en/contact",
  },
  openGraph: {
    title: "Contact | Sababisha Solutions Limited",
    description:
      "Send a service-specific inquiry to Sababisha Solutions and share your project goals, timeline, and support needs. We respond by email.",
    url: "/en/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Sababisha Solutions Limited",
    description:
      "Start a project, service, support, or partnership inquiry with Sababisha Solutions — we follow up by email.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
