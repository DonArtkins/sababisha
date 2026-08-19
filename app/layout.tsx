import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/layouts/ClientLayout";

const BASE_URL = process.env.SITE_URL || "https://sababisha.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Sababisha Solutions — We Make It Happen",
    template: "%s | Sababisha Solutions",
  },
  description:
    "Sababisha Solutions delivers innovative technology services, products, and digital experiences. We make it happen.",
  keywords: [
    "Sababisha",
    "Sababisha Solutions",
    "technology",
    "software",
    "digital services",
    "web development",
    "AI",
  ],
  authors: [{ name: "Sababisha Solutions" }],
  creator: "Sababisha Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Sababisha Solutions",
    title: "Sababisha Solutions — We Make It Happen",
    description:
      "Innovative technology services, products, and digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sababisha Solutions — We Make It Happen",
    description:
      "Innovative technology services, products, and digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
