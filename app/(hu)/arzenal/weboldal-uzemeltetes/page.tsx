import type { Metadata } from "next";
import Link from "next/link";
import ServicePage from "@/app/components/ServicePage";
import { OPS_FAQ, OPS_FEATURES, OPS_SERVICE, SIZE_FAQ, WEB_FAQ } from "@/lib/szolgaltatasok";

// A kapcsolódó cikkek listája miatt naponta frissül (ütemezett cikkek).
export const revalidate = 86400;

const TITLE = "Weboldal-üzemeltetés és folyamatos fejlesztés | THE GBR";
const DESCRIPTION =
  "Monitoring és hibariasztás, havi fejlesztési óraszám, rendszeres riport és egy felelős kapcsolattartó. Az élesítés után is visszük tovább az oldalt.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: OPS_SERVICE.path },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    title: "Figyelés és riasztás",
    body: "Monitoring és hibariasztás: előbb tudunk a hibáról, mint te.",
  },
  {
    title: "Fejlesztés havi óraszámban",
    body: "A havi keretben folyamatosan javítjuk és fejlesztjük az oldalt.",
  },
  {
    title: "Riport és egy kapcsolattartó",
    body: "Heti vagy kétheti riportot kapsz, és egy felelős emberrel dolgozol.",
  },
];

export default function WeboldalUzemeltetes() {
  return (
    <ServicePage
      n="06"
      railLabel="06 / Web-üzemeltetés"
      name="Weboldal-üzemeltetés"
      path={OPS_SERVICE.path}
      schemaName={OPS_SERVICE.name}
      schemaDescription={OPS_SERVICE.description}
      title="Weboldal-üzemeltetés és folyamatos fejlesztés"
      lead={[
        <>
          A legtöbb ügynökség itt hagyja abba. Pedig egy weboldal az élesítés után kezd el pénzt
          termelni — és akkor kezd el elromlani is. Ha kéred,{" "}
          <strong className="text-[var(--ink)]">visszük tovább</strong>: figyeljük, javítjuk,
          fejlesztjük.
        </>,
        "Egy felelős emberrel dolgozol, aki ismeri a projekted. Nem ügyfélszolgálati sorszámot kapsz.",
        <>
          Ezt nem csak ügyfeleknek mondjuk: a saját termékünket, a Gimbalt is mi üzemeltetjük — el
          is mondtuk,{" "}
          <Link href="/hirek/miert-epit-sajat-termeket" className="text-[var(--ink)] underline">
            mit tanultunk belőle
          </Link>
          .
        </>,
      ]}
      features={OPS_FEATURES}
      steps={STEPS}
      relatedSlugs={[
        "a-gbr-standard",
        "kie-a-weboldalad",
        "csendes-hiba",
        "oldalak-amikrol-nem-tudsz",
        "miert-epit-sajat-termeket",
      ]}
      faq={[...OPS_FAQ, WEB_FAQ[4], SIZE_FAQ]}
    />
  );
}
