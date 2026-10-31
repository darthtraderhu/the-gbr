import localFont from "next/font/local";

// Design token réteg (2026.08 arculatváltás). A .variable módot használjuk —
// ez a CSS változót definiálja, a tényleges font-family-t a globals.css
// @theme inline blokkja köti be Tailwind osztályokként (font-display,
// font-body, var(--font-mono)). A korábbi Montserrat (a <body> alap-betűje
// az átépítés előtt) kivezetve — ld. AGENTS.md.
//
// A betűfájlok a repóban vannak (assets/fonts, OFL licenc), így a build nem
// tölt le semmit a Google Fonts-ról: 2026-10-31-én a Vercel buildje a
// next/font/google letöltésen akadt el. A fájlok a Google Fonts forrásaiból
// készültek: latin + latin-ext karakterkészlet egy fájlban, a változó
// tengely csak a használt súlytartományra szűkítve.
// ---------------------------------------------------------------------

// Display — címsorokhoz (változó súly, 500–700).
export const fontDisplay = localFont({
  src: [{ path: "../assets/fonts/archivo.woff2", weight: "500 700", style: "normal" }],
  variable: "--font-archivo",
  display: "swap",
});

// Törzsszöveg (változó súly, 400–600).
export const fontBody = localFont({
  src: [{ path: "../assets/fonts/source-serif-4.woff2", weight: "400 600", style: "normal" }],
  variable: "--font-source-serif",
  display: "swap",
});

// Adat és címke — csak számokon/metaadaton, sosem folyószövegben (ld. AGENTS.md).
export const fontMono = localFont({
  src: [
    { path: "../assets/fonts/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});
