import { Montserrat, Archivo, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";

// Az aktív betűtípus — ez marad érvényben, amíg a vizuális átépítés meg nem
// történik. A className-jét kapja a <body>, tehát ez rendereli ténylegesen.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// ---------------------------------------------------------------------
// Design token réteg (2026.08 arculatváltás alapozása). A .variable módot
// használjuk, NEM a .className-t — ez csak a CSS változót definiálja,
// font-family-t nem állít be semmin, tehát a jelenlegi megjelenést nem
// érinti. A tényleges bekötés a következő körben történik.
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
