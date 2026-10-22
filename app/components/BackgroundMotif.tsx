"use client";

import { usePathname } from "next/navigation";

// Háttérmotívum: a graffiti-nyúl minden oldalon, a jobb szélen kifutva a
// képből. A rajz csak maszkként szolgál (public/motif/nyul.webp, az eredeti
// SVG-be ágyazott maszkképből), a színt, a fedést, a keverési módot és a
// pozíciót a .background-motif adja (ld. globals.css).
// Dekoráció: aria-hidden, nem kattintható, nincs animáció.
export default function BackgroundMotif() {
  const pathname = usePathname();

  // Az /init (és angolul a /en/contact) fókuszált folyamat — ott, ahogy a
  // Navbar és a Footer, a motívum sem jelenik meg.
  if (pathname === "/init" || pathname === "/en/contact") return null;

  return <div aria-hidden="true" className="background-motif" />;
}
