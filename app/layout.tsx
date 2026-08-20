import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/layouts/ClientLayout";
import { ThemeProvider } from "@/components/ThemeProvider";

const BASE_URL = process.env.SITE_URL || "https://sababisha.com";
const SITE_NAME = "Sababisha Solutions Limited";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Sababisha Solutions Limited | Fintech Software, Enterprise Systems & Digital Transformation",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Sababisha Solutions Limited builds secure fintech platforms, enterprise systems, custom software, AI automation, analytics dashboards, integrations, service-aware inquiry workflows, and digital transformation solutions for organizations in Kenya and across Africa. Reach us through the contact form for project and support inquiries.",
  keywords: [
    "Sababisha",
    "Sababisha Solutions Limited",
    "Fintech",
    "fintech software Kenya",
    "loan management system",
    "SACCO software",
    "insurance agency management system",
    "hospital management system",
    "enterprise software development",
    "custom software development Kenya",
    "Consultancy",
    "Custom Tech Solutions",
    "Kenya tech company",
    "Nairobi software company",
    "technology",
    "software",
    "digital services",
    "web development",
    "AI",
    "AI automation",
    "enterprise integrations",
    "analytics dashboards",
    "service inquiry Kenya",
    "contact Sababisha Solutions",
    "software support Kenya",
    "business systems Kenya",
    "technology consultancy Nairobi",
    "digital transformation Africa",
  ],
  authors: [{ name: "Sababisha Solutions Limited" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Technology",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
    },
  },
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
    url: `${BASE_URL}/en`,
    siteName: SITE_NAME,
    title: "Sababisha Solutions Limited | Fintech Software, Enterprise Systems & Digital Transformation",
    description:
      "Secure fintech platforms, enterprise systems, custom software, AI automation, analytics, integrations, service inquiry workflows, and digital transformation solutions for Kenya and Africa.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Sababisha Solutions Limited logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sababisha Solutions Limited | Fintech Software, Enterprise Systems & Digital Transformation",
    description:
      "Secure fintech platforms, enterprise systems, custom software, AI automation, analytics, integrations, service inquiry workflows, and digital transformation solutions for Kenya and Africa.",
    images: ["/logo.png"],
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
