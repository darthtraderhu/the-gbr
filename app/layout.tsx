import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Importáljuk a komponenseket
import Navbar from "./components/Navbar";
import AiChat from "./components/AiChat";
import CallButton from "./components/CallButton";

// Beállítjuk a betűtípust
const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"]
});

// BUMM! Kőkemény globális B2B SEO és OpenGraph adatok integrálva
export const metadata: Metadata = {
  metadataBase: new URL("https://www.thegbr.eu"), // EZ A KULCS A FACEBOOK KÉPHEZ!
  title: "THE GBR | Full-Stack B2B Agency",
  description: "A marketing és az IT összeolvadt. A Jövő Egy Kézből. Next.js alapú architektúrák, AI integráció és adatvezérelt marketing.",
  openGraph: {
    title: "THE GBR | Full-Stack B2B Agency",
    description: "A marketing és az IT összeolvadt. A Jövő Egy Kézből.",
    url: "https://www.thegbr.eu", 
    siteName: "THE GBR",
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE GBR | Full-Stack B2B Agency",
    description: "A marketing és az IT összeolvadt. A Jövő Egy Kézből.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className="scroll-smooth">
      <body className={`${montserrat.className} bg-[#0a0a0a] text-white selection:bg-[#e7ff00] selection:text-black antialiased`}>
        
        {/* A Globális Menü */}
        <Navbar />

        {/* Az adott aloldal tartalma */}
        {children}

        {/* Lebegő Forródrót Gomb (BAL OLDAL) */}
        <CallButton />

        {/* A Globális AI Asszisztens (JOBB OLDAL) */}
        <AiChat />

      </body>
    </html>
  );
}