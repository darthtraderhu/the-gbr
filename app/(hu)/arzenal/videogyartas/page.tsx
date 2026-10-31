import type { Metadata } from "next";
import ServicePage from "@/app/components/ServicePage";
import { SIZE_FAQ, VIDEO_FAQ, VIDEO_FEATURES, VIDEO_SERVICE } from "@/lib/szolgaltatasok";

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
      title="Céges videó és tartalom, a weboldallal egy arculatban"
      lead={[
        <>
          Egy jó oldalra tartalom is kell. Reklámfilm, termékvideó, közösségi formátumok —{" "}
          <strong className="text-[var(--ink)]">a mi irányításunk alatt</strong>, ugyanabban az
          arculatban, mint a weboldal. Így nem lesz külön a „szép oldal” és a „valahonnan
          összeszedett videó”. A gyártást videós partnerünk végzi.
        </>,
      ]}
      features={VIDEO_FEATURES}
      steps={STEPS}
      relatedSlugs={["premium-video-konverzio", "tiktok-b2b-kampanyok"]}
      faq={[...VIDEO_FAQ, SIZE_FAQ]}
    />
  );
}
