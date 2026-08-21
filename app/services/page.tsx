import type { Metadata } from "next";
import { Services as ServicesComponent } from "@/components/Services";

const BASE_URL = process.env.SITE_URL || "https://sababisha.vercel.app";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Sababisha Solutions' six core service areas: fintech platforms, consultancy, enterprise systems, analytics, custom software development, and ongoing support, each linked to a prefilled service inquiry flow.",
  keywords: [
    "Sababisha services",
    "fintech software services Kenya",
    "enterprise systems development",
    "custom software development Nairobi",
    "analytics dashboards Kenya",
    "technology consultancy Kenya",
    "software support and maintenance",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Sababisha Solutions Limited",
    description:
      "Six focused service areas for fintech, enterprise systems, analytics, software engineering, consultancy, and long-term support.",
    url: `${BASE_URL}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Sababisha Solutions Limited",
    description:
      "Explore Sababisha Solutions' service areas and start a prefilled inquiry for the exact service you need.",
  },
};

export function Services() {
  return (
    <main className="bg-transparent pt-32 min-h-screen">
      <ServicesComponent />
      
    </main>
  );
}
export default Services;
