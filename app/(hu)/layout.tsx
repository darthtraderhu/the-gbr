import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google"; // ÚJ IMPORT: A hivatalos GA4 modul
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { SITE_URL } from "@/lib/site";
import { organizationSchema } from "@/lib/jsonld";
import { fontDisplay, fontBody, fontMono } from "@/lib/fonts";

// Importáljuk a komponenseket
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AiChat from "@/app/components/AiChat";
import JsonLd from "@/app/components/JsonLd";

// Villanásmentes témabeállítás — a tárolt választást már a hidratáció előtt
// alkalmazza, mielőtt a böngésző a világos alapértelmezéssel kifestene
// (ld. ThemeToggle és globals.css [data-theme] blokkjai).
const THEME_INIT_SCRIPT = `
try {
  var t = localStorage.getItem("gbr-theme");
  if (t === "dark" || t === "light") document.documentElement.dataset.theme = t;
} catch (e) {}
`;

// Globális fallback — csak akkor jelenik meg, ha egy oldal nem ad meg saját
// metadata-t (minden route-nak van sajátja, ld. SEO-audit). A szöveg a
// homepage HOME_DESCRIPTION-jével egyező hangot követi, nem a régi
// "sötét/neon terminál" márkahangot.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "THE GBR | Fejlesztés és üzemeltetés B2B cégeknek",
  description:
    "Weboldalak és webshopok, amiket mi építünk és mi üzemeltetünk tovább — Next.js alapokon, kizárólag B2B cégeknek.",
  alternates: {
    canonical: "/",
    languages: {
      hu: SITE_URL,
      en: `${SITE_URL}/en`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    title: "THE GBR | Fejlesztés és üzemeltetés B2B cégeknek",
    description:
      "Weboldalak és webshopok, amiket mi építünk és mi üzemeltetünk tovább — Next.js alapokon, kizárólag B2B cégeknek.",
    url: SITE_URL,
    siteName: "THE GBR",
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE GBR | Fejlesztés és üzemeltetés B2B cégeknek",
    description:
      "Weboldalak és webshopok, amiket mi építünk és mi üzemeltetünk tovább — Next.js alapokon, kizárólag B2B cégeknek.",
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

        {/* Vercel Analytics — a hoszting platform saját, cookie nélküli látogatómérése */}
        <Analytics />
      </body>

      {/* A hivatalos, szupergyors Google Analytics 4 integráció! */}
      <GoogleAnalytics gaId="G-HLK1LCQB5C" />
    </html>
  );
}
