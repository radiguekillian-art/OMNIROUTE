import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { isPaymentConfigured } from "@/lib/payments";

import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "FADIYE — L’élégance dans le détail",
    template: "%s — FADIYE",
  },
  description: siteConfig.description,
  applicationName: "FADIYE",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "FADIYE",
    title: "FADIYE — L’élégance dans le détail",
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "FADIYE — Cardigan signature" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FADIYE — L’élégance dans le détail",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Active les apparitions progressives uniquement si JavaScript est disponible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-svh overflow-x-clip">
        <CartProvider paymentsEnabled={isPaymentConfigured()}>
          <Header />
          <main id="contenu" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
