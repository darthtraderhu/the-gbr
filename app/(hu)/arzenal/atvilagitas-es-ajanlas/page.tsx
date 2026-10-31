import type { Metadata } from "next";
import ServicePage from "@/app/components/ServicePage";
import ProposalSample from "@/app/components/ProposalSample";
import { DevFrame } from "@/app/components/ServiceFrame";
import { FindingChapters } from "@/app/components/SalesBlocks";
import { Rail, Eyebrow } from "@/app/components/ui";
import { PROPOSAL_INTRO, PROPOSAL_PAGES } from "@/lib/minta";
import {
  AUDIT_CHAPTERS,
  AUDIT_FAQ,
  AUDIT_FEATURES,
  AUDIT_PITCH,
  AUDIT_SERVICE,
  SIZE_FAQ,
} from "@/lib/szolgaltatasok";

// A kapcsolódó cikkek listája miatt naponta frissül (ütemezett cikkek).
export const revalidate = 86400;

const TITLE = "Weboldal-átvilágítás: hol veszítesz ügyfelet, miért nem lát a Google | THE GBR";
const DESCRIPTION =
  "Weboldal- és webáruház-átvilágítás kívülről: lassúság, SEO és AEO, árak, jogi hiányosságok, és hogy az oldal névjegy vagy értékesítési felület. Sorrendbe tett teendőlista, utána dizájn- és rendszerajánlás kattintható látványtervvel.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: AUDIT_SERVICE.path },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    title: "Elküldöd az oldal címét",
    body: "És egy mondatban, mit árulsz és kinek. Hozzáférés nem kell, és azt sem kell tudnod, mit kérj.",
  },
  {
    title: "Átvilágítás kívülről",
    body: "Sebesség és mobil, Google és AI-keresők, használhatóság, adatkezelés és sütik, kívülről látható biztonsági beállítások. Írásos riport, sorrendbe tett teendőlistával.",
  },
  {
    title: "Dizájn- és rendszerajánlás",
    body: "Ha a riport után tovább lépnél: arculat, koncepció, oldaltervek mobilra is, és az értékesítési ökoszisztéma terve, hogy honnan jön és hová fut be a megkeresés.",
  },
  {
    title: "Kattintható látványterv",
    body: "A dizájnajánlás mellé működő látványterv, a saját kínálatod adataival. Döntés előtt végig tudod kattintani.",
  },
  {
    title: "Hogyan tovább",
    body: "Szakaszokra bontva: mi az első lépés, mi oldható meg a mostani rendszeren, és hol kezdődik az új.",
  },
];

export default function AtvilagitasEsAjanlas() {
  return (
    <ServicePage
      n="10"
      railLabel="10 / Átvilágítás"
      name="Átvilágítás, dizájn- és rendszerajánlás"
      path={AUDIT_SERVICE.path}
      schemaName={AUDIT_SERVICE.name}
      schemaDescription={AUDIT_SERVICE.description}
      kicker={AUDIT_PITCH.kicker}
      title="Weboldal-átvilágítás: megmutatjuk, hol veszítesz most ügyfelet"
      lead={[
        <>
          Az oldalad most is veszít vevőket. Lassan tölt, a Google nem érti, az AI nem idézi, az ár
          nem ott van, ahol keresik, és a jogi oldalakon olyan áll, ami nem igaz.{" "}
          <strong className="text-[var(--ink)]">
            Eddig minden átvilágított oldalon találtunk ezekből.
          </strong>
        </>,
        <>
          Kívülről nézzük meg, hozzáférés nélkül, és írásban, sorrendbe téve kapod meg, mit javíts
          először. Utána, ha kéred, jön a{" "}
          <strong className="text-[var(--ink)]">dizájn- és rendszerajánlás</strong>: hogyan lesz a
          névjegyből értékesítési felület, egy kattintható látványtervvel a saját kínálatod
          adataival.
        </>,
      ]}
      facts={AUDIT_PITCH.facts}
      angleTitle={AUDIT_PITCH.angleTitle}
      angle={AUDIT_PITCH.angle}
      cta={AUDIT_PITCH.cta}
      afterHero={
        <Rail label="Amit találunk">
          <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-10)]">
            <Eyebrow>Valós találatok · anonimizálva</Eyebrow>
            <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[16ch] text-[var(--ink)]">
              Ezeket találtuk a legutóbbi átvilágításainkban
              <span className="text-[var(--signal)]">.</span>
            </h2>
            <p className="mt-[var(--space-6)] [font-size:var(--text-lg)] leading-relaxed text-[var(--ink-2)] max-w-[58ch]">
              Nem kitalált példák, hanem kiküldött riportokból vett sorok, cégnév nélkül. Működő
              cégek működő oldalai, amelyek közben vevőket veszítettek.
            </p>
          </section>
          <FindingChapters chapters={AUDIT_CHAPTERS} findingLabel="Amit találtunk" costLabel="Amibe kerül" />
        </Rail>
      }
      features={AUDIT_FEATURES}
      device={
        <DevFrame header="Így néz ki egy dizájnajánlásunk" headerRight="Anonimizált részlet">
          <ProposalSample intro={PROPOSAL_INTRO} pages={PROPOSAL_PAGES} openLabel="megnyitás teljes méretben" />
        </DevFrame>
      }
      steps={STEPS}
      relatedSlugs={[
        "mielott-uj-weboldalt-rendelsz",
        "ajanlat-kep-helyett-terv",
        "oldalak-amikrol-nem-tudsz",
        "technikai-seo-audit",
        "kie-a-weboldalad",
        "sablon-weboldalak-halala",
      ]}
      faq={[...AUDIT_FAQ, SIZE_FAQ]}
    />
  );
}
