import type { Metadata } from "next";
import ServicePage from "@/app/components/ServicePage";
import { PULZUS_FAQ, PULZUS_FEATURES, PULZUS_PITCH, PULZUS_SERVICE, SIZE_FAQ } from "@/lib/szolgaltatasok";

// A kapcsolódó cikkek listája miatt naponta frissül (ütemezett cikkek).
export const revalidate = 86400;

const TITLE = "Pulzus: havi weboldal-figyelés jogi modullal | THE GBR";
const DESCRIPTION =
  "Elérhetőség, sebesség, SSL, kapcsolati űrlap, indexeltség és Google-értékelések havi figyelése, egy magyar nyelvű levélben. Jogi modul webjogász partnerrel.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PULZUS_SERVICE.path },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    title: "Havi mérés",
    body: "Elérhetőség, betöltési sebesség, SSL-tanúsítvány, kapcsolati űrlap, indexeltség és Google-értékelések.",
  },
  {
    title: "Jogi modul",
    body: "Feltérképezzük, milyen sütiket és külső kódokat tölt az oldal, és fut-e mérőkód a hozzájárulás előtt. A változást webjogász partnerünk értékeli.",
  },
  {
    title: "Havi levél",
    body: "Magyarul, konkrét javaslatokkal. A javítás külön megrendelés, vagy a havi órakeret terhére megy, ha azt választod.",
  },
];

export default function Pulzus() {
  return (
    <ServicePage
      n="08"
      railLabel="08 / Pulzus"
      name="Pulzus"
      path={PULZUS_SERVICE.path}
      schemaName={PULZUS_SERVICE.name}
      schemaDescription={PULZUS_SERVICE.description}
      kicker={PULZUS_PITCH.kicker}
      title="Pulzus: havonta egy levél arról, hogyan lát téged az internet"
      lead={[
        "A legtöbb weboldal elkészül, aztán senki nem nézi meg többé. Ha lelassul, ha lejár egy tanúsítvány, ha elromlik a kapcsolati űrlap, az akkor derül ki, amikor egy ügyfél szól. Vagy soha.",
        <>
          A Pulzus ezt figyeli helyetted:{" "}
          <strong className="text-[var(--ink)]">havonta megméri, és megmondja, mi változott</strong>
          . Nem pontszámot küldünk, hanem egy levelet arról, mi történt és mit érdemes tenni.
        </>,
        <>
          <strong className="text-[var(--ink)]">Jogi modul: mi mérünk, a jogász minősít.</strong>{" "}
          Havonta megnézzük, mit tölt ténylegesen az oldal, és a változást webjogász partnerünk
          értékeli. A megfelelésről ő nyilatkozik, nem mi.
        </>,
      ]}
      facts={PULZUS_PITCH.facts}
      angleTitle={PULZUS_PITCH.angleTitle}
      angle={PULZUS_PITCH.angle}
      ecosystemId="pulzus"
      cta={PULZUS_PITCH.cta}
      features={PULZUS_FEATURES}
      steps={STEPS}
      relatedSlugs={["pulzus-ot-masodperc", "adatkezelesi-tajekoztato-ami-mast-ir"]}
      faq={[...PULZUS_FAQ, SIZE_FAQ]}
    />
  );
}
