import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/layouts/ClientLayout";

const BASE_URL = process.env.SITE_URL || "https://sababisha.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Sababisha Solutions Limited | Fintech, Consultancy & Custom Tech Solutions",
    template: "%s | Sababisha Solutions Limited",
  },
  description:
    "Sababisha Solutions Limited provides cutting-edge Fintech, Consultancy, and Custom Tech Solutions to drive digital transformation and innovation in Kenya and across Africa.",
  keywords: [
    "Sababisha",
    "Sababisha Solutions Limited",
    "Fintech",
    "Consultancy",
    "Custom Tech Solutions",
    "Kenya tech company",
    "technology",
    "software",
    "digital services",
    "web development",
    "AI",
  ],
  authors: [{ name: "Sababisha Solutions Limited" }],
  creator: "Sababisha Solutions Limited",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Sababisha Solutions Limited",
    title: "Sababisha Solutions Limited | Fintech, Consultancy & Custom Tech Solutions",
    description:
      "Cutting-edge Fintech, Consultancy, and Custom Tech Solutions to drive digital transformation and innovation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sababisha Solutions Limited | Fintech, Consultancy & Custom Tech Solutions",
    description:
      "Cutting-edge Fintech, Consultancy, and Custom Tech Solutions to drive digital transformation and innovation.",
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
