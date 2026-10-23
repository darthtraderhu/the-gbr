"use client";

import { usePathname } from "next/navigation";

// Háttérmotívum: a graffiti-nyúl minden oldalon, a jobb szélen kifutva a
// képből. A rajz csak maszkként szolgál (public/motif/nyul.webp, az eredeti
// SVG-be ágyazott maszkképből), a színt, a fedést, a keverési módot és a
// pozíciót a .background-motif adja (ld. globals.css).
// Dekoráció: aria-hidden, nem kattintható, nincs animáció.
export default function BackgroundMotif() {
  const pathname = usePathname();

  // Az /init (és angolul a /en/contact) fókuszált folyamat: nincs rajta
  // Navbar és Footer, ezért ott a motívum kisebb és feljebb ül.
  const compact = pathname === "/init" || pathname === "/en/contact";

  return (
    <div
      aria-hidden="true"
      className={
        compact ? "background-motif background-motif--compact" : "background-motif"
      }
    />
  );
}
