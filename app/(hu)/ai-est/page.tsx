import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { NEXTJS_BRANDS, NEXTJS_CHECKED_HU } from "@/lib/nextjs-proof";
import { AJANDEK_ERTEK, EST, EST_AJANDEK_PATH, EST_PATH, estDatumSzoveg } from "@/lib/ai-est";
import Prezentacio from "./Prezentacio";

// Az AI demo est prezentációja (lib/ai-est.ts). Eseményoldal: nem kerül a
// sitemapbe, és a keresők sem indexelik.

const TITLE = `${EST.nev}: a bemutató | THE GBR`;
const DESCRIPTION =
  "Amit az esten mutattunk: napi menetrend az eladónak, egy címből elemzés és első levél, weboldal a világmárkák alapján, és ami az eladás után jön. Kitalált cég adataival.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: EST_PATH },
  robots: { index: false, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${EST_PATH}` },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

// A márkafal: a főoldali lista első nyolca, egy forrásból (lib/nextjs-proof.ts).
const BRANDS = NEXTJS_BRANDS.slice(0, 8);
const FORRAS_DATUM = NEXTJS_CHECKED_HU.replace(/^megtekintve\s*/, "");

export default function AiEstOldal() {
  return (
    <main>
      <h1 className="sr-only">{EST.nev}: a THE GBR bemutatója</h1>
      <Prezentacio
        estNev={EST.nev}
        datum={estDatumSzoveg()}
        brands={BRANDS}
        forrasDatum={FORRAS_DATUM}
        ajandekHref={EST_AJANDEK_PATH}
        ajandekErtek={AJANDEK_ERTEK}
      />
    </main>
  );
}
