import { Archivo, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";

// Design token réteg (2026.08 arculatváltás). A .variable módot használjuk —
// ez a CSS változót definiálja, a tényleges font-family-t a globals.css
// @theme inline blokkja köti be Tailwind osztályokként (font-display,
// font-body, var(--font-mono)). A korábbi Montserrat (a <body> alap-betűje
// az átépítés előtt) kivezetve — ld. AGENTS.md.
// ---------------------------------------------------------------------

// Display — címsorokhoz.
export const fontDisplay = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-archivo",
});

// Törzsszöveg.
export const fontBody = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-serif",
});

// Adat és címke — csak számokon/metaadaton, sosem folyószövegben (ld. AGENTS.md).
export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});
