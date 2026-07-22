import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppProviders from "@/components/providers/AppProviders";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.borahoneys.in"),
  title: {
    default: "Bora Honeys | Luxury Indian Couture & Bespoke Bridal Wear",
    template: "%s | Bora Honeys",
  },
  description:
    "Bora Honeys — Luxury Indian Couture. Hand-Embroidered, Custom Made in India, Shipping Worldwide. New Collection 2026, Bespoke Couture, Timeless Classics.",
  keywords: [
    "Bora Honeys",
    "luxury Indian couture",
    "bespoke couture",
    "hand embroidered lehenga",
    "custom bridal wear",
    "Indian bridal couture",
    "designer lehenga",
    "couture gowns",
    "made in India fashion",
  ],
  openGraph: {
    title: "Bora Honeys | Luxury Indian Couture & Bespoke Bridal Wear",
    description:
      "Luxury Indian Couture. Hand-Embroidered, Custom Made in India, Shipping Worldwide. New Collection 2026, Bespoke Couture, Timeless Classics.",
    url: "https://www.borahoneys.in",
    siteName: "Bora Honeys",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bora Honeys | Luxury Indian Couture & Bespoke Bridal Wear",
    description:
      "Luxury Indian Couture. Hand-Embroidered, Custom Made in India, Shipping Worldwide.",
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
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", raleway.variable)}
    >
      <body className="min-h-full w-screen overflow-x-hidden flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
