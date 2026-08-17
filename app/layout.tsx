import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google"; // ÚJ IMPORT: A hivatalos GA4 modul
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { organizationSchema } from "@/lib/jsonld";
import { fontDisplay, fontBody, fontMono } from "@/lib/fonts";

// Importáljuk a komponenseket
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AiChat from "./components/AiChat";
import JsonLd from "./components/JsonLd";

// Villanásmentes témabeállítás — a tárolt választást már a hidratáció előtt
// alkalmazza, mielőtt a böngésző a világos alapértelmezéssel kifestene
// (ld. ThemeToggle és globals.css [data-theme] blokkjai).
const THEME_INIT_SCRIPT = `
try {
  var t = localStorage.getItem("gbr-theme");
  if (t === "dark" || t === "light") document.documentElement.dataset.theme = t;
} catch (e) {}
`;

// BUMM! Kőkemény globális B2B SEO, OpenGraph és Analytics alapok
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "THE GBR | Full-Stack B2B Agency",
  description:
    "A marketing és az IT összeolvadt. A Jövő Egy Kézből. Next.js alapú architektúrák, AI integráció és adatvezérelt marketing.",
  openGraph: {
    title: "THE GBR | Full-Stack B2B Agency",
    description: "A marketing és az IT összeolvadt. A Jövő Egy Kézből.",
    url: SITE_URL,
    siteName: "THE GBR",
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE GBR | Full-Stack B2B Agency",
    description: "A marketing és az IT összeolvadt. A Jövő Egy Kézből.",
  },
  // A Search Console-hitelesítés még nincs beállítva. Ha a HTML meta-tages
  // módot használjuk, ide kerül a valós kód: verification: { google: "..." }.
  // Amíg nincs valós token, üresen hagyva jobb, mint egy placeholdert kiadni.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hu"
      suppressHydrationWarning
      className={`scroll-smooth ${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="font-body bg-[var(--ground)] text-[var(--ink)] antialiased pb-[66px] md:pb-0">
        {/* Szervezeti JSON-LD — minden oldalon jelen van, ez a kiadó/publisher. */}
        <JsonLd data={organizationSchema()} />

        {/* A Globális Menü — felül asztalon, alul mobilon */}
        <Navbar />

        {/* Az adott aloldal tartalma */}
        {children}

        {/* A Globális Lábléc */}
        <Footer />

        {/* A Globális AI Asszisztens */}
        <AiChat />
      </body>

      {/* A hivatalos, szupergyors Google Analytics 4 integráció! */}
      <GoogleAnalytics gaId="G-HLK1LCQB5C" />
    </html>
  );
}
