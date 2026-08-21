import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { SITE_URL } from "@/lib/site";
import { organizationSchema } from "@/lib/jsonld";
import { fontDisplay, fontBody, fontMono } from "@/lib/fonts";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AiChat from "@/app/components/AiChat";
import JsonLd from "@/app/components/JsonLd";

// Ugyanaz a villanásmentes témabeállítás, mint a (hu) gyökér layoutban —
// mindkét nyelvi fa saját root layout, mert az <html lang> nyelvenként más
// (ld. Next.js "multiple root layouts" mintája, route-csoportokkal).
const THEME_INIT_SCRIPT = `
try {
  var t = localStorage.getItem("gbr-theme");
  if (t === "dark" || t === "light") document.documentElement.dataset.theme = t;
} catch (e) {}
`;

const EN_DESCRIPTION =
  "EU-based development studio. Next.js builds, commerce, and ongoing operations — as your team, white-label or named.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "THE GBR — Development partner for agencies",
  description: EN_DESCRIPTION,
  alternates: {
    canonical: "/en",
    languages: {
      hu: SITE_URL,
      en: `${SITE_URL}/en`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    title: "THE GBR — Development partner for agencies",
    description: EN_DESCRIPTION,
    url: `${SITE_URL}/en`,
    siteName: "THE GBR",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE GBR — Development partner for agencies",
    description: EN_DESCRIPTION,
  },
};

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`scroll-smooth ${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="font-body bg-[var(--ground)] text-[var(--ink)] antialiased pb-[66px] md:pb-0">
        <JsonLd data={organizationSchema()} />

        <Navbar />

        {children}

        <Footer />

        <AiChat />

        <Analytics />
      </body>

      <GoogleAnalytics gaId="G-HLK1LCQB5C" />
    </html>
  );
}
