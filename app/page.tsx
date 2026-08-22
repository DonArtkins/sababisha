import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ScrollVideoSequence } from "@/components/ScrollVideoSequence";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { Products } from "@/components/Products";
import { Brands } from "@/components/Brands";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FooterCTA } from "@/components/FooterCTA";

const BASE_URL = process.env.SITE_URL || "https://sababisha.vercel.app";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Sababisha Solutions Limited builds secure fintech platforms, enterprise systems, custom software, AI automation, analytics dashboards, integrations, service-aware inquiry workflows, and digital transformation solutions for organizations in Kenya and across Africa.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Home | Sababisha Solutions Limited",
    description:
      "Secure fintech platforms, enterprise systems, custom software, AI automation, analytics, integrations, service inquiry workflows, and digital transformation solutions for Kenya and Africa.",
    url: `${BASE_URL}/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Sababisha Solutions Limited",
    description:
      "Secure fintech platforms, enterprise systems, custom software, AI automation, analytics, integrations, service inquiry workflows, and digital transformation solutions for Kenya and Africa.",
  },
};

export function Home() {
  return (
    <main className="bg-transparent">
      <Hero />
      <About />
      <Work />
      <Products />
      <Brands />
      <TestimonialsSection />
      <FooterCTA />
    </main>
  );
}

export default Home;
