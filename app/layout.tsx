import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google"; // ÚJ IMPORT: A hivatalos GA4 modul
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { organizationSchema } from "@/lib/jsonld";
import { montserrat, fontDisplay, fontBody, fontMono } from "@/lib/fonts";

// Importáljuk a komponenseket
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AiChat from "./components/AiChat";
import CallButton from "./components/CallButton";
import JsonLd from "./components/JsonLd";

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
      className={`scroll-smooth ${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      {/* 
        A "select-none" osztály letiltja, hogy bárki egérrel kijelölje a szöveget! 
        A selection:bg-... dolgok bent maradhatnak, ha valahol mégis engednénk egy inputot.
      */}
      <body
        className={`${montserrat.className} bg-[#0a0a0a] text-white select-none selection:bg-[#e7ff00] selection:text-black antialiased`}
      >
        {/* Szervezeti JSON-LD — minden oldalon jelen van, ez a kiadó/publisher. */}
        <JsonLd data={organizationSchema()} />

        {/* A Globális Menü */}
        <Navbar />

        {/* Az adott aloldal tartalma */}
        {children}

        {/* A Globális Lábléc */}
        <Footer />

        {/* Lebegő Forródrót Gomb (BAL OLDAL) */}
        <CallButton />

        {/* A Globális AI Asszisztens (JOBB OLDAL) */}
        <AiChat />
      </body>

      {/* A hivatalos, szupergyors Google Analytics 4 integráció! */}
      <GoogleAnalytics gaId="G-HLK1LCQB5C" />
    </html>
  );
}
