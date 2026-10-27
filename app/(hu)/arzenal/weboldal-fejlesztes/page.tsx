import type { Metadata } from "next";
import Link from "next/link";
import ServicePage from "@/app/components/ServicePage";
import { DevFrame } from "@/app/components/ServiceFrame";
import { SIZE_FAQ, WEB_FAQ, WEB_FEATURES, WEB_SERVICE } from "@/lib/szolgaltatasok";

// A kapcsolódó cikkek listája miatt naponta frissül (ütemezett cikkek).
export const revalidate = 86400;

const TITLE = "Weboldal- és webshopfejlesztés B2B cégeknek | THE GBR";
const DESCRIPTION =
  "Egyedi weboldal és webshop Next.js alapokon, technikai SEO-val és biztonsági beállításokkal. Fix ár és határidő a felmérés után, élő webshopnál leállás nélkül.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: WEB_SERVICE.path },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    title: "Elmondod, mit szeretnél elérni",
    body: "Az űrlapon leírod a projektet. Két munkanapon belül válaszolunk, és ha nem illünk össze, azt is megmondjuk.",
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
      title="Weboldal- és webshopfejlesztés B2B cégeknek"
      lead={[
        <>
          A sablonoldalak problémája nem az, hogy csúnyák — hanem hogy lassúak, és senki nem tudja
          megmondani, miért.{" "}
          <strong className="text-[var(--ink)]">Next.js alapon építünk</strong>, ahol a betöltési
          sebesség, a keresőoptimalizálás és a biztonság nem utólagos javítás, hanem a szerkezet
          része.
        </>,
        "Építünk a meglévő rendszered fölé is (WooCommerce, Shopify): a motor marad, a felület újul. Élő webshopnál nem kapcsolunk le semmit.",
      ]}
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
