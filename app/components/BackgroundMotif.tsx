"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const MOTIF_SRC = "/motif/nyul.webp";

// Háttérmotívum: a graffiti-nyúl minden oldalon, a jobb szélen kifutva a
// képből. A rajz csak maszkként szolgál (public/motif/nyul.webp, az eredeti
// SVG-be ágyazott maszkképből), a színt, a fedést, a keverési módot és a
// pozíciót a .background-motif adja (ld. globals.css).
// Dekoráció: aria-hidden, nem kattintható; mozgás nincs, csak egy egyszeri
// áttűnés a megjelenéskor.
export default function BackgroundMotif() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  // A réteg átlátszóan festődik ki, és csak a maszkkép dekódolása után kapja
  // meg a fedését (ld. globals.css .is-ready). Így a mobilon legnagyobb
  // felületű, de alig látható dekoráció nem számít a betöltés mért
  // főelemének (LCP). A kép ugyanaz, amit a CSS kér — a böngésző egyszer
  // tölti le; a CSS mask CORS-módban kér, ezért itt is azzal kérjük.
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = MOTIF_SRC;
    const show = () => {
      if (!cancelled) setReady(true);
    };
    // Ha a dekódolás nem sikerül, a rajz akkor is előjön — legrosszabb
    // esetben a CSS maszk nélkül üres marad, ahogy eddig is.
    img.decode().then(show, show);
    return () => {
      cancelled = true;
    };
  }, []);

  // Az /init (és angolul a /en/contact) fókuszált folyamat: nincs rajta
  // Navbar és Footer, ezért ott a motívum kisebb és feljebb ül.
  const compact = pathname === "/init" || pathname === "/en/contact";

  const className = [
    "background-motif",
    compact && "background-motif--compact",
    ready && "is-ready",
  ]
    .filter(Boolean)
    .join(" ");

  return <div aria-hidden="true" className={className} />;
}
