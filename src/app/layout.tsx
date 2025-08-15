// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Manrope, Roboto_Mono } from "next/font/google";
import "./globals.css";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import StickyCtaMobile from "@/components/sticky-cta-mobile";
import AccessibilityControls from "@/components/accessibility-controls";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vitaneo.example"),
  title: "Vitanéo — La vitalité au soleil, à votre rythme",
  description:
    "Séjours non médicalisés pour seniors autonomes, en hôtels 4–5★ en Tunisie. Assistance légère, activités à la carte, transparence des tarifs.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://vitaneo.example",
    title: "Vitanéo — La vitalité au soleil, à votre rythme",
    description:
      "Séjours non médicalisés pour seniors autonomes, en hôtels 4–5★ en Tunisie.",
  },
  alternates: { canonical: "/", languages: { fr: "/", "x-default": "/" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${manrope.variable} ${mono.variable} bg-background text-foreground antialiased`}
      >
        {/* Lien d’évitement */}
        <a
          className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 rounded bg-azur px-3 py-2 text-white shadow-elev2"
          href="#contenu"
        >
          Aller au contenu
        </a>

        {/* Contrôles d’accessibilité (taille/contraste, etc.) */}
        <div className="container flex items-center justify-end py-2">
          <AccessibilityControls />
        </div>

        <SiteHeader />

        <main id="contenu">{children}</main>

        <SiteFooter />
        <StickyCtaMobile />
      </body>
    </html>
  );
}
