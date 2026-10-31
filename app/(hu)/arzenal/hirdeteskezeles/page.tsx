import type { Metadata } from "next";
import ServicePage from "@/app/components/ServicePage";
import { DevFrame, ReportRows } from "@/app/components/ServiceFrame";
import { ADS_FAQ, ADS_FEATURES, ADS_SERVICE, AD_SAMPLE_ROWS, SIZE_FAQ } from "@/lib/szolgaltatasok";

// A kapcsolódó cikkek listája miatt naponta frissül (ütemezett cikkek).
export const revalidate = 86400;

const TITLE = "Google- és Meta-hirdetéskezelés B2B cégeknek | THE GBR";
const DESCRIPTION =
  "Google- és Meta-kampányok B2B fókusszal: a kattintástól a megkeresésig mérve, saját landing page-dzsel és heti jelentéssel érthető nyelven.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: ADS_SERVICE.path },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    title: "Mérés a megkeresésig",
    body: "Beállítjuk a konverziómérést úgy, hogy ne csak a kattintás látsszon, hanem az is, lett-e belőle megkeresés.",
  },
  {
    title: "Kampány saját landing page-dzsel",
    body: "A hirdetés a kampányhoz készült oldalra visz, nem a főoldalra.",
  },
  {
    title: "Heti jelentés",
    body: "Hetente megkapod, mi hozott ügyfelet és mi nem, érthető nyelven.",
  },
  {
    title: "Ami nem működik, leáll",
    body: "Ha egy csatorna nem hoz megkeresést, megmondjuk, és nem költjük tovább rá a keretet.",
  },
];

export default function Hirdeteskezeles() {
  return (
    <ServicePage
      n="02"
      railLabel="02 / Marketing"
      name="Hirdetéskezelés"
      path={ADS_SERVICE.path}
      schemaName={ADS_SERVICE.name}
      schemaDescription={ADS_SERVICE.description}
      title="Google- és Meta-hirdetéskezelés, ahol a megkeresés számít"
      lead={[
        <>
          A legtöbb kampányjelentés arról szól, hány ember látta a hirdetést. Ez nem eredmény. Mi
          végig követjük az utat a{" "}
          <strong className="text-[var(--ink)]">kattintástól a megkeresésig</strong>, és hetente
          megmutatjuk, mi hozott ügyfelet és mi nem.
        </>,
        "Ha egy csatorna nem működik, azt megmondjuk — nem költjük tovább.",
      ]}
      features={ADS_FEATURES}
      device={
        <DevFrame header="Így néz ki egy heti jelentés" headerRight="Minta">
          <ReportRows rows={AD_SAMPLE_ROWS} />
          <p className="mt-[var(--space-4)] [font-size:var(--text-sm)] text-[var(--mid)]">
            Szemléltetés — a valós számokat az első hónap végén te látod először.
          </p>
        </DevFrame>
      }
      steps={STEPS}
      relatedSlugs={[
        "roas-alapu-skalazas",
        "hirdetes-meres-nelkul",
        "kampany-visszahivas",
        "meta-hirdetesek-uj-korszaka",
        "b2b-lead-generalas",
        "adatvezerelt-dontesek",
      ]}
      faq={[...ADS_FAQ, SIZE_FAQ]}
    />
  );
}
