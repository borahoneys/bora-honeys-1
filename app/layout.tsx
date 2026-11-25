import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppProviders from "@/components/providers/AppProviders";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME, ADDRESS, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { preconnect } from "react-dom";

// Videos (and full-size media) are served straight from this S3 bucket; opening
// the connection early saves the DNS + TLS round trips (~0.5s+ from India).
const MEDIA_ORIGIN = "https://bora-honey-bucket-737759272707-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com";

const geomini = localFont({
  src: [
    { path: "../fonts/Geomini-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../fonts/Geomini-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/Geomini-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Geomini-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/Geomini-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/Geomini-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/Geomini-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-geomini",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "fashion",
  alternates: {
    canonical: "/",
    languages: { "x-default": "/", "en-IN": "/", en: "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  title: {
    default: "BORA HONEY'S | Luxury Indian Couture & Bespoke Bridal Wear",
    template: "%s | BORA HONEY'S",
  },
  description:
    "BORA HONEY'S. Luxury Indian Couture. Hand-Embroidered, Custom Made in India, Shipping Worldwide. New Collection 2026, Bespoke Couture, Timeless Classics.",
  keywords: [
    "BORA HONEY'S",
    "luxury Indian couture",
    "bespoke couture",
    "hand embroidered lehenga",
    "custom bridal wear",
    "Indian bridal couture",
    "designer lehenga",
    "couture gowns",
    "made in India fashion",
    "Indian wedding lehenga online",
    "designer bridal lehenga worldwide shipping",
    "Indian designer wear USA UK Canada Australia UAE",
    "luxury Indian fashion designer Delhi",
    "custom lehenga",
    "Indian couture designer",
    "Honey Nanda",
  ],
  openGraph: {
    title: "BORA HONEY'S | Luxury Indian Couture & Bespoke Bridal Wear",
    description:
      "Luxury Indian Couture. Hand-Embroidered, Custom Made in India, Shipping Worldwide. New Collection 2026, Bespoke Couture, Timeless Classics.",
    url: "https://www.borahoneys.in",
    siteName: "BORA HONEY'S",
    locale: "en_IN",
    alternateLocale: ["en_US", "en_GB", "en_CA", "en_AU", "en_AE"],
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "BORA HONEY'S luxury Indian couture" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BORA HONEY'S | Luxury Indian Couture & Bespoke Bridal Wear",
    description:
      "Luxury Indian Couture. Hand-Embroidered, Custom Made in India, Shipping Worldwide.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect(MEDIA_ORIGIN);
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geomini.variable)}
    >
      <body className="min-h-full w-screen overflow-x-hidden flex flex-col">
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": ["Organization", "ClothingStore"],
              "@id": `${SITE_URL}/#organization`,
              name: SITE_NAME,
              url: SITE_URL,
              logo: absoluteUrl("/logo.png"),
              image: absoluteUrl(DEFAULT_OG_IMAGE),
              description:
                "Luxury Indian couture label founded by Honey Nanda in 2022. Hand-embroidered bridal wear, bespoke couture and occasion wear, made in India and shipped worldwide.",
              founder: { "@type": "Person", name: "Honey Nanda" },
              foundingDate: "2022",
              email: "info@borahoneys.in",
              telephone: "+919138881112",
              address: ADDRESS,
              areaServed: "Worldwide",
              priceRange: "$$$$",
              knowsAbout: ["Indian bridal couture", "Lehenga", "Bespoke couture", "Hand embroidery"],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: SITE_NAME,
              inLanguage: "en",
              publisher: { "@id": `${SITE_URL}/#organization` },
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/products?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
          ]}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
