import type { Metadata } from "next";
import Link from "next/link";
import ServicePage from "@/app/components/ServicePage";
import { DevFrame } from "@/app/components/ServiceFrame";
import StackProof from "@/app/components/StackProof";
import { Rail } from "@/app/components/ui";
import { NEXTJS_CHECKED_HU, NEXTJS_ITEMS_HU, NEXTJS_SOURCES_HU } from "@/lib/nextjs-proof";
import { SIZE_FAQ, WEB_FAQ, WEB_FEATURES, WEB_PITCH, WEB_SERVICE } from "@/lib/szolgaltatasok";

// A kapcsolódó cikkek listája miatt naponta frissül (ütemezett cikkek).
export const revalidate = 86400;

const TITLE = "Weboldal- és webshopfejlesztés B2B cégeknek, Next.js alapon | THE GBR";
const DESCRIPTION =
  "Weboldal és webshop, ami értékesítési felület, nem névjegy: Next.js alapon, technikai SEO-val, megkeresés-útvonallal. Fix ár és határidő a felmérés után, élő webshopnál leállás nélkül.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: WEB_SERVICE.path },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    title: "Elmondod, mit kell eladnia az oldalnak",
    body: "Nem azzal kezdünk, milyen színű legyen, hanem hogy ki a vevőd, mit keres, és hol veszíted el most. Két munkanapon belül válaszolunk; ha nem illünk össze, azt is megmondjuk.",
  },
  {
    title: "Felmérés, fix ár és határidő",
    body: "Megnézzük a mostani oldalt és a céljaidat. A felmérés végén fix árat és határidőt kapsz, nem sávot.",
  },
  {
    title: "Tervezés és építés",
    body: "Egy weboldal jellemzően 4–8 hét. Egy élő webshop újraépítése szakaszosan megy: fokozatosan cseréljük az oldalakat, a bolt közben forgalmaz.",
  },
  {
    title: "Élesítés átirányításokkal",
    body: "A régi oldalt nem kapcsoljuk le, amíg az új nem működik bizonyítottan. A régi URL-eket átirányítjuk, hogy a Google-találatok ne vesszenek el.",
  },
  {
    title: "Üzemeltetés, ha kéred",
    body: "Az élesítés után is figyeljük, javítjuk és fejlesztjük az oldalt, egy felelős kapcsolattartóval.",
  },
];

export default function WeboldalFejlesztes() {
  return (
    <ServicePage
      n="01"
      railLabel="01 / Web"
      name="Weboldal- és webshopfejlesztés"
      path={WEB_SERVICE.path}
      schemaName={WEB_SERVICE.name}
      schemaDescription={WEB_SERVICE.description}
      kicker={WEB_PITCH.kicker}
      title={WEB_PITCH.headline}
      lead={[
        <>
          A legtöbb céges weboldal egy szép névjegy, ami csendben pénzt veszít: lassan tölt, a
          megkeresés egy postafiókban landol, és senki nem tudja megmondani, hány ügyfelet hozott
          tavaly.{" "}
          <strong className="text-[var(--ink)]">
            Mi nem oldalt építünk, hanem az értékesítésed első szakaszát.
          </strong>
        </>,
        <>
          <strong className="text-[var(--ink)]">Next.js alapon dolgozunk</strong>, ugyanazon a
          technológián, amire a Nike, a Sonos vagy a Netflix karrieroldala épít. Nem a divat miatt:
          itt a sebesség, a keresőoptimalizálás és a biztonság a szerkezet része, nem utólag
          ráragasztott bővítmény.
        </>,
        "Élő webshopnál nem kapcsolunk le semmit. A motor (WooCommerce, Shopify) maradhat, a felület újul, a bolt közben forgalmaz.",
      ]}
      facts={WEB_PITCH.facts}
      angleTitle={WEB_PITCH.angleTitle}
      angle={WEB_PITCH.angle}
      ecosystemId="web"
      features={WEB_FEATURES}
      device={
        <DevFrame header="Bizonyíték · ezt az oldalt is mi építettük">
          <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed">
            Ezt az oldalt is mi építettük, ugyanezekkel az elvekkel. A sitemapet, a strukturált
            adatot és a robots.txt-t a{" "}
            <Link href="/seo" className="text-[var(--ink)] underline">
              SEO-oldalon
            </Link>{" "}
            meg is nézheted. Egy anonimizált dizájnajánlás-részletet a{" "}
            <Link href="/arzenal#web" className="text-[var(--ink)] underline">
              szolgáltatások között
            </Link>{" "}
            mutatunk.
          </p>
        </DevFrame>
      }
      extra={
        <Rail label="Next.js">
          <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)]">
            <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase text-[var(--dim)] mb-[var(--space-5)]">
              Miért Next.js
            </p>
            <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[15ch]">
              Amire a világmárkák építenek, arra építünk mi is
              <span className="text-[var(--signal)]">.</span>
            </h2>
          </section>
          <div className="px-6 pb-[var(--space-12)] sm:pb-[var(--space-16)]">
            <StackProof
              intro="A Next.js a Vercel webes keretrendszere, a Meta React könyvtárára épül. Nem webshop-motor és nem sablon, hanem alap, amire az oldalt a te kínálatodra és folyamataidra tervezzük. A márkák a Next.js hivatalos bemutatóoldaláról és a Vercel esettanulmányaiból valók:"
              items={NEXTJS_ITEMS_HU}
              note="Hogy ők erre építenek, az nem ígéret arra, hogy a te oldalad ugyanannyit javul. Azt mutatja, hogy a technológia bírja a nagy forgalmat, és hosszú távon karbantartott. Mikor nem éri meg: ha a kínálatod és a folyamataid jól beleférnek egy sablonba, a bérelt platform olcsóbb, és ezt meg is mondjuk."
              sourcesLabel="Források:"
              sources={NEXTJS_SOURCES_HU}
              checked={NEXTJS_CHECKED_HU}
            />
          </div>
        </Rail>
      }
      steps={STEPS}
      relatedSlugs={[
        "nextjs-vs-wordpress2",
        "sablon-weboldalak-halala",
        "seo-betoltesi-sebesseg",
        "technikai-seo-audit",
        "headless-ecommerce-b2b",
        "kie-a-weboldalad",
      ]}
      faq={[...WEB_FAQ, SIZE_FAQ]}
    />
  );
}
