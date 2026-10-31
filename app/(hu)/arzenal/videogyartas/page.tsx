import type { Metadata } from "next";
import ServicePage from "@/app/components/ServicePage";
import { SIZE_FAQ, VIDEO_FAQ, VIDEO_FEATURES, VIDEO_PITCH, VIDEO_SERVICE } from "@/lib/szolgaltatasok";

// A kapcsolódó cikkek listája miatt naponta frissül (ütemezett cikkek).
export const revalidate = 86400;

const TITLE = "Céges videó, termékvideó és közösségi tartalom | THE GBR";
const DESCRIPTION =
  "Cégbemutató, termékvideó webshophoz és rövid formátumok közösségi médiára, a weboldal arculatával egységesen. A gyártást videós partnerünk végzi.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: VIDEO_SERVICE.path },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    title: "Arculat a weboldalhoz igazítva",
    body: "A videó ugyanabban az arculatban készül, mint az oldal, hogy egységes legyen a megjelenés.",
  },
  {
    title: "Gyártás partnerrel, a mi irányításunk alatt",
    body: "A forgatást és a vágást videós partnerünk végzi, a kapcsolattartó végig mi vagyunk.",
  },
  {
    title: "Utómunka és formátumok",
    body: "Vágás, színkezelés, feliratozás, és a weboldalra meg a közösségi médiára szánt formátumok.",
  },
];

export default function Videogyartas() {
  return (
    <ServicePage
      n="05"
      railLabel="05 / Videó"
      name="Videógyártás"
      path={VIDEO_SERVICE.path}
      schemaName={VIDEO_SERVICE.name}
      schemaDescription={VIDEO_SERVICE.description}
      kicker={VIDEO_PITCH.kicker}
      title="Céges videó, ami ugyanazt mondja, mint a weboldalad"
      lead={[
        <>
          A videó nem dísz, hanem érv: ott dolgozik, ahol a vevő mérlegel. Ezért{" "}
          <strong className="text-[var(--ink)]">ugyanabban az arculatban készül, mint a weboldal</strong>
          , és oda kerül, ahol a döntés születik: termékoldalra, nyitóképre, közösségi rövid
          változatba.
        </>,
        "A gyártást videós partnerünk végzi, a mi irányításunk alatt. A kapcsolattartó végig mi vagyunk, így nem kell két szállítót egyeztetned.",
      ]}
      facts={VIDEO_PITCH.facts}
      angleTitle={VIDEO_PITCH.angleTitle}
      angle={VIDEO_PITCH.angle}
      ecosystemId="video"
      features={VIDEO_FEATURES}
      steps={STEPS}
      relatedSlugs={["premium-video-konverzio", "tiktok-b2b-kampanyok"]}
      faq={[...VIDEO_FAQ, SIZE_FAQ]}
    />
  );
}
