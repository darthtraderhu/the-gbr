import type { Metadata } from "next";
import ServicePage from "@/app/components/ServicePage";
import ProposalSample from "@/app/components/ProposalSample";
import { DevFrame } from "@/app/components/ServiceFrame";
import { PROPOSAL_INTRO, PROPOSAL_PAGES } from "@/lib/minta";
import {
  AUDIT_FAQ,
  AUDIT_FEATURES,
  AUDIT_PITCH,
  AUDIT_SERVICE,
  SIZE_FAQ,
} from "@/lib/szolgaltatasok";

// A kapcsolódó cikkek listája miatt naponta frissül (ütemezett cikkek).
export const revalidate = 86400;

const TITLE = "Weboldal-átvilágítás, dizájn- és rendszerajánlás | THE GBR";
const DESCRIPTION =
  "Weboldal- és webáruház-átvilágítás kívülről, hozzáférés nélkül, sorrendbe tett teendőlistával. Utána dizájn- és rendszerajánlás az értékesítési ökoszisztémára, kattintható látványtervvel.";

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
      title="Átvilágítás, dizájn- és rendszerajánlás, döntés előtt kézbe véve"
      lead={[
        <>
          A legtöbb cég úgy kér ajánlatot weboldalra, hogy nem tudja, mit kérjen. Nem is kell tudnia.{" "}
          <strong className="text-[var(--ink)]">Ez a mi dolgunk:</strong> megnézzük, mi van most,
          leírjuk, mi működik és mi nem, és megmutatjuk, hogyan nézne ki jobban.
        </>,
        <>
          Az átvilágítás kívülről készül, hozzáférés nélkül. Utána, ha kéred, jön a{" "}
          <strong className="text-[var(--ink)]">dizájn- és rendszerajánlás</strong>: nem csak egy új
          oldal képe, hanem az egész értékesítési ökoszisztéma terve, egy kattintható
          látványtervvel a saját kínálatod adataival.
        </>,
      ]}
      facts={AUDIT_PITCH.facts}
      angleTitle={AUDIT_PITCH.angleTitle}
      angle={AUDIT_PITCH.angle}
      cta={AUDIT_PITCH.cta}
      features={AUDIT_FEATURES}
      device={
        <DevFrame header="Így néz ki egy dizájnajánlásunk" headerRight="Anonimizált részlet">
          <ProposalSample intro={PROPOSAL_INTRO} pages={PROPOSAL_PAGES} openLabel="megnyitás teljes méretben" />
        </DevFrame>
      }
      steps={STEPS}
      relatedSlugs={["technikai-seo-audit", "kie-a-weboldalad", "sablon-weboldalak-halala"]}
      faq={[...AUDIT_FAQ, SIZE_FAQ]}
    />
  );
}
