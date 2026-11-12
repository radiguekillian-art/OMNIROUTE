import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import localFont from "next/font/local";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { isPaymentConfigured } from "@/lib/payments";

import "./globals.css";

/** Titres et éléments fonctionnels. ⚠️ Version démo : licence commerciale à acquérir. */
const akira = localFont({
  src: "../assets/fonts/akira-expanded.woff2",
  weight: "100 900",
  variable: "--font-akira",
  display: "swap",
});

/** Textes éditoriaux. */
const aquiline = localFont({
  src: "../assets/fonts/aquiline-two.woff2",
  weight: "100 900",
  variable: "--font-aquiline",
  display: "swap",
});

/** Secours pour les glyphes absents d'Akira démo (accents, €). */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
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
    <html lang="fr" className={`${akira.variable} ${aquiline.variable} ${archivo.variable}`} suppressHydrationWarning>
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
