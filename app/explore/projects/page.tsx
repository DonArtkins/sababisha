import type { Metadata } from "next";
import { Work } from "@/components/Work";

const BASE_URL = process.env.SITE_URL || "https://sababisha.vercel.app";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Sababisha Solutions' project portfolio showcasing fintech platforms, enterprise systems, custom software development, and digital transformation solutions for organizations in Kenya and across Africa.",
  alternates: {
    canonical: "/en/explore/projects",
  },
  openGraph: {
    title: "Projects | Sababisha Solutions Limited",
    description:
      "Explore our project portfolio showcasing fintech platforms, enterprise systems, custom software development, and digital transformation solutions.",
    url: `${BASE_URL}/en/explore/projects`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Sababisha Solutions Limited",
    description:
      "Explore our project portfolio showcasing fintech platforms, enterprise systems, custom software development, and digital transformation solutions.",
  },
};

export function Projects() {
  return (
    <main className="bg-transparent pt-24 min-h-screen">
      <Work variant="page" />
    </main>
  );
}

export default Projects;
