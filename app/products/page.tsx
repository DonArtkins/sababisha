import type { Metadata } from "next";
import { Products as ProductsComponent } from "@/components/Products";

const BASE_URL = process.env.SITE_URL || "https://sababisha.vercel.app";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Sababisha Solutions' product offerings including fintech platforms, enterprise systems, and custom software solutions for organizations in Kenya and across Africa.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Products | Sababisha Solutions Limited",
    description:
      "Explore our product offerings including fintech platforms, enterprise systems, and custom software solutions.",
    url: `${BASE_URL}/products`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | Sababisha Solutions Limited",
    description:
      "Explore our product offerings including fintech platforms, enterprise systems, and custom software solutions.",
  },
};

export function Products() {
  return (
    <main className="bg-transparent pt-32 min-h-screen">
      <ProductsComponent variant="page" />
      
    </main>
  );
}
export default Products;
