import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google"; // ÚJ IMPORT: A hivatalos GA4 modul
import "./globals.css";
import { SITE_URL } from "@/lib/site";

// Importáljuk a komponenseket
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AiChat from "./components/AiChat";
import CallButton from "./components/CallButton";

// Beállítjuk a betűtípust
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

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
  verification: {
    // Ha a Search Console HTML címkés hitelesítést ad, a kódot (content="") ide másold!
    // Ha DNS rekorddal hitelesíted (ez a profibb), ezt a sort nyugodtan hagyhatod így, vagy kitörölheted.
    google: "IDE_JÖHET_A_SEARCH_CONSOLE_KÓD_HA_KELL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className="scroll-smooth">
      {/* 
        A "select-none" osztály letiltja, hogy bárki egérrel kijelölje a szöveget! 
        A selection:bg-... dolgok bent maradhatnak, ha valahol mégis engednénk egy inputot.
      */}
      <body
        className={`${montserrat.className} bg-[#0a0a0a] text-white select-none selection:bg-[#e7ff00] selection:text-black antialiased`}
      >
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
