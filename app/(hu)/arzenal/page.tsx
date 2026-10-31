import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import ProposalSample, { type ProposalPage } from "@/app/components/ProposalSample";
import StackProof, { type StackProofItem, type StackProofSource } from "@/app/components/StackProof";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";
import { DevFrame, FindingsTable, LogLines, ReportRows } from "@/app/components/ServiceFrame";
import {
  ACCESS_FAQ,
  ACCESS_FEATURES,
  ACCESS_SAMPLE_ROWS,
  ACCESS_SERVICE,
  AD_SAMPLE_ROWS,
  ADS_FEATURES,
  ADS_SERVICE,
  AI_FEATURES,
  AI_SERVICE,
  IT_FAQ,
  IT_FEATURES,
  IT_SAMPLE_ROWS,
  IT_SERVICE,
  OPS_FEATURES,
  OPS_SERVICE,
  PULZUS_FAQ,
  PULZUS_FEATURES,
  PULZUS_SERVICE,
  SIZE_FAQ,
  SOFTWARE_FAQ,
  SOFTWARE_FEATURES,
  SOFTWARE_LOG,
  SOFTWARE_SERVICE,
  VIDEO_FEATURES,
  VIDEO_SERVICE,
  WEB_FAQ,
  WEB_FEATURES,
  WEB_SERVICE,
} from "@/lib/szolgaltatasok";

export const metadata: Metadata = {
  title: "Weboldal, webshop, hirdetés és IT-üzemeltetés cégeknek | THE GBR",
  description:
    "Weboldal és webshop fejlesztés, performance marketing, egyedi szoftver és automatizáció, AI-integráció, videó, web-üzemeltetés, akadálymentesítés, Pulzus és irodai IT-üzemeltetés. Kilenc terület, egy felelős kapcsolattartóval — B2B ügyfeleknek.",
  alternates: {
    canonical: "/arzenal",
    languages: { hu: "/arzenal", en: "/en/services", "x-default": "/arzenal" },
  },
  openGraph: {
    title: "Weboldal, webshop, hirdetés és IT-üzemeltetés cégeknek | THE GBR",
    description:
      "Weboldal és webshop fejlesztés, performance marketing, egyedi szoftver és automatizáció, AI-integráció, videó, web-üzemeltetés, akadálymentesítés, Pulzus és irodai IT-üzemeltetés. Kilenc terület, egy felelős kapcsolattartóval.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weboldal, webshop, hirdetés és IT-üzemeltetés cégeknek | THE GBR",
    description:
      "Weboldal és webshop fejlesztés, performance marketing, egyedi szoftver és automatizáció, AI-integráció, videó, web-üzemeltetés, akadálymentesítés, Pulzus és irodai IT-üzemeltetés. Kilenc terület, egy felelős kapcsolattartóval.",
  },
};

const INDEX_ITEMS = [
  { id: "web", n: "01", name: "Web és webshop" },
  { id: "ads", n: "02", name: "Performance marketing" },
  { id: "software", n: "03", name: "Egyedi szoftver és automatizáció" },
  { id: "ai", n: "04", name: "AI és chatbot" },
  { id: "video", n: "05", name: "Videó és tartalom" },
  { id: "ops", n: "06", name: "Web-üzemeltetés és fejlesztés" },
  { id: "access", n: "07", name: "Akadálymentesítés" },
  { id: "pulzus", n: "08", name: "Pulzus" },
  { id: "it", n: "09", name: "IT-üzemeltetés" },
];

// Egész mondatos leírás szolgáltatásonként — a Service séma description
// mezője, hogy az AI-keresők idézhető kontextust kapjanak (AEO), ne csak
// kulcsszavakat. A Service séma URL-je a szolgáltatás saját aloldala.
const SERVICE_SCHEMA_ITEMS: { id: string; name: string; description: string; path: string }[] = [
  { id: "web", name: "Web és webshop", description: WEB_SERVICE.description, path: WEB_SERVICE.path },
  { id: "ads", name: ADS_SERVICE.name, description: ADS_SERVICE.description, path: ADS_SERVICE.path },
  {
    id: "software",
    name: SOFTWARE_SERVICE.name,
    description: SOFTWARE_SERVICE.description,
    path: SOFTWARE_SERVICE.path,
  },
  { id: "ai", name: AI_SERVICE.name, description: AI_SERVICE.description, path: AI_SERVICE.path },
  { id: "video", name: VIDEO_SERVICE.name, description: VIDEO_SERVICE.description, path: VIDEO_SERVICE.path },
  { id: "ops", name: OPS_SERVICE.name, description: OPS_SERVICE.description, path: OPS_SERVICE.path },
  {
    id: "access",
    name: ACCESS_SERVICE.name,
    description: ACCESS_SERVICE.description,
    path: ACCESS_SERVICE.path,
  },
  {
    id: "pulzus",
    name: PULZUS_SERVICE.name,
    description: PULZUS_SERVICE.description,
    path: PULZUS_SERVICE.path,
  },
  { id: "it", name: IT_SERVICE.name, description: IT_SERVICE.description, path: IT_SERVICE.path },
];


// Csak olyan márka, ami a forrásban név szerint szerepel. Ha a Showcase
// változik, a listát és a megtekintés dátumát együtt frissítsd.
const STACK_ITEMS: StackProofItem[] = [
  {
    name: "Nike",
    tag: "Webáruház",
    body: "A Next.js hivatalos bemutatóoldalán, a webáruházak (Composable Commerce) között.",
  },
  {
    name: "Sonos",
    tag: "Webáruház",
    body: "Ugyanott, ugyanebben a kategóriában.",
  },
  {
    name: "OpenAI és Claude",
    tag: "AI",
    body: "Az OpenAI és az Anthropic (Claude) oldala is a bemutatóoldalon szerepel, az AI kategóriában.",
  },
  {
    name: "Netflix Jobs",
    tag: "Webalkalmazás",
    body: "A Netflix karrieroldala, a webalkalmazások között.",
  },
  {
    name: "Elkjøp",
    tag: "Esettanulmány",
    body: "Északi elektronikai kiskereskedő, Angularról állt át. A Vercel szerint a betöltés (LCP) 50%-kal, a kattintásra adott válasz (INP) 60%-kal javult, a kiadási ciklus 7 hétről 1 napra rövidült. Ezek a Vercel számai, nem a mi mérésünk.",
  },
  {
    name: "thegbr.eu",
    tag: "Saját munkánk",
    body: "Ez az oldal is Next.js 16-on és React 19-en fut, ugyanezekkel az elvekkel építettük.",
  },
];

const STACK_SOURCES: StackProofSource[] = [
  { label: "nextjs.org/showcase", href: "https://nextjs.org/showcase" },
  {
    label: "Vercel: Elkjøp-esettanulmány",
    href: "https://vercel.com/customers/elkjops-digital-transformation-with-next-js-and-vercel",
  },
  { label: "react.dev", href: "https://react.dev/" },
];

const PROPOSAL_PAGES: ProposalPage[] = [
  {
    src: "/minta/dizajnajanlas/01-tartalom.webp",
    alt: "Dizájnajánlás tartalomjegyzéke tizenhat fejezettel",
    caption: "Tartalom",
  },
  {
    src: "/minta/dizajnajanlas/02-tipografia.webp",
    alt: "Tipográfiai fejezet: betűpár és arculati lap a látványtervből",
    caption: "Tipográfia",
  },
  {
    src: "/minta/dizajnajanlas/03-szinpaletta.webp",
    alt: "Színpaletta hat színnel és WCAG kontrasztarány-táblázattal",
    caption: "Színpaletta",
  },
  {
    src: "/minta/dizajnajanlas/04-fooldal.webp",
    alt: "A főoldal látványterve és szakaszonkénti felépítése",
    caption: "Főoldal",
  },
  {
    src: "/minta/dizajnajanlas/05-termekoldal.webp",
    alt: "A termékoldal látványterve lépésenkénti termékválasztóval",
    caption: "Termékoldal",
  },
];













const OPS_LOG = [
  { t: "06:00", msg: "Tartalomgenerálás elindítva" },
  { t: "06:04", msg: "Cikk közzétéve a blogon" },
  { t: "06:05", msg: "Sitemap frissítve, keresők értesítve" },
];

const FAQ_ITEMS = [...WEB_FAQ, SIZE_FAQ, ...ACCESS_FAQ, ...PULZUS_FAQ, ...IT_FAQ, ...SOFTWARE_FAQ];

function ServiceBlock({
  id,
  n,
  label,
  title,
  paragraphs,
  features,
  device,
  detail,
}: {
  id: string;
  n: string;
  label: string;
  title: string;
  paragraphs: React.ReactNode[];
  features: string[];
  device: React.ReactNode;
  // A szolgáltatás saját aloldala és a link szövege.
  detail: { href: string; label: string };
}) {
  return (
    <section id={id} className="border-b border-[var(--rule)]">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(150px,20%)_1fr] gap-[var(--space-8)] sm:gap-[var(--space-12)] px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)] sm:pb-[var(--space-10)]">
        <div>
          <div className="font-display font-black [font-size:var(--text-svc-num)] leading-[0.76] tracking-[-0.06em] text-[var(--rule)]">
            {n}
          </div>
          <div className="mt-[var(--space-4)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase text-[var(--mid)]">
            {label}
          </div>
        </div>
        <div>
          <h2 className="font-display font-extrabold [font-size:var(--text-svc-title)] tracking-[-0.038em] leading-[1.02] max-w-[20ch] mb-[var(--space-5)]">
            {title}
          </h2>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[52ch]"
            >
              {p}
            </p>
          ))}
          <p className="mt-[var(--space-5)] [font-size:var(--text-base)] text-[var(--ink-2)]">
            Részletesen:{" "}
            <Link href={detail.href} className="text-[var(--ink)] underline">
              {detail.label}
            </Link>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[var(--rule)]">
        {features.map((feat, i) => (
          <div
            key={feat}
            className={`px-6 py-[var(--space-4)] [font-size:var(--text-base)] text-[var(--ink-2)] border-b border-[var(--rule)] ${
              i % 2 === 0 ? "sm:border-r" : ""
            }`}
          >
            {feat}
          </div>
        ))}
      </div>

      {device}
    </section>
  );
}

export default function Arzenal() {
  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Szolgáltatások", url: `${SITE_URL}/arzenal` },
        ])}
      />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
      {SERVICE_SCHEMA_ITEMS.map((item) => (
        <JsonLd
          key={item.id}
          data={serviceSchema({
            name: item.name,
            description: item.description,
            url: `${SITE_URL}${item.path}`,
          })}
        />
      ))}

      {/* ===== SÖTÉT FEJLÉC + INDEX ===== */}
      <Rail label="Szolgáltatások" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <h1 className="font-display font-black leading-[0.86] tracking-[-0.055em] [font-size:var(--text-display)]">
            Szolgáltatások<span className="text-[var(--signal)]">.</span>
          </h1>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[46ch] mt-[var(--space-8)]">
            Kilenc terület. A legtöbbet házon belül végezzük, a videót és az irodai informatikát
            visszatérő partnerekkel, de a kapcsolattartó ilyenkor is mi vagyunk. Ha egy projekthez
            nem mind a kilenc kell, nem is adjuk el mind a kilencet.
          </p>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[46ch] mt-[var(--space-5)]">
            Fejlesztési partnerként is dolgozunk — magyar és nyugat-európai ügynökségeknek
            egyaránt.
          </p>
        </section>

        <div className="border-t border-[var(--rule)]">
          {INDEX_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="grid grid-cols-[56px_1fr_auto] sm:grid-cols-[88px_1fr_auto] gap-[var(--space-4)] sm:gap-[var(--space-8)] px-6 py-[var(--space-5)] sm:py-[var(--space-6)] border-b border-[var(--rule)] items-center group hover:bg-[color-mix(in_srgb,var(--ground)_60%,var(--panel))] transition-colors"
            >
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-sm)] tracking-[0.14em] text-[var(--dim)] group-hover:text-[var(--signal)] transition-colors">
                {item.n}
              </span>
              <h2 className="font-display font-bold [font-size:var(--text-3xl)] tracking-[-0.03em] leading-tight text-[var(--ink)]">
                {item.name}
              </h2>
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-sm)] text-[var(--rule-strong)] group-hover:text-[var(--signal)] transition-colors">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== 01 WEB ===== */}
      <Rail label="01 / Web">
        <ServiceBlock
          id="web"
          n="01"
          label="Web és webshop"
          title="Weboldal és webshop, ami mérhetően gyors"
          paragraphs={[
            <>
              A sablonoldalak problémája nem az, hogy csúnyák — hanem hogy lassúak, és senki nem
              tudja megmondani, miért.{" "}
              <strong className="text-[var(--ink)]">Next.js alapon építünk</strong>, ahol a
              betöltési sebesség, a keresőoptimalizálás és a biztonság nem utólagos javítás, hanem a
              szerkezet része.
            </>,
            "Élő webshopnál nem kapcsolunk le semmit: fokozatosan cseréljük az oldalakat, a bolt közben forgalmaz.",
          ]}
          detail={{ href: WEB_SERVICE.path, label: "weboldal- és webshopfejlesztés lépésről lépésre" }}
          features={WEB_FEATURES}
          device={
            <>
              <DevFrame header="Így néz ki egy dizájnajánlásunk" headerRight="Anonimizált részlet">
                <ProposalSample
                  intro={
                    <>
                      Öt oldal egy 24 oldalas arculati és webdizájn-ajánlásból, amit egy kézműves
                      webáruháznak készítettünk az oldaluk auditja után: tipográfia, színpaletta
                      kontrasztméréssel, főoldal- és termékoldal-látványterv. A márkát, a
                      termékneveket és az árakat kitakartuk, mert az ügyfeleink anyagai nem
                      nyilvánosak.
                    </>
                  }
                  pages={PROPOSAL_PAGES}
                  openLabel="megnyitás teljes méretben"
                />
              </DevFrame>
              <DevFrame header="Miért Next.js és React" headerRight="Nyilvános források">
                <StackProof
                  intro="A Next.js a Vercel webes keretrendszere, a React a Meta felületépítő könyvtára, erre épül a Next.js. Nem webshop-motor és nem sablon, hanem alap, amire az oldalt a te kínálatodra és folyamataidra tervezzük. Nagy nemzetközi márkák is erre építenek:"
                  items={STACK_ITEMS}
                  note="Hogy ők erre építenek, az nem ígéret arra, hogy a te oldalad ugyanannyit javul. Azt mutatja, hogy a technológia bírja a nagy forgalmat, és hosszú távon karbantartott. Mikor nem éri meg: ha a kínálatod és a folyamataid jól beleférnek egy sablonba, a bérelt platform olcsóbb, és ezt meg is mondjuk."
                  sourcesLabel="Források:"
                  sources={STACK_SOURCES}
                  checked="megtekintve 2026. 10. 27."
                />
              </DevFrame>
            </>
          }
        />
      </Rail>

      {/* ===== 02 MARKETING ===== */}
      <Rail label="02 / Marketing">
        <ServiceBlock
          n="02"
          id="ads"
          label="Performance marketing"
          title="Hirdetés, aminek a végén van egy szám"
          paragraphs={[
            <>
              A legtöbb kampányjelentés arról szól, hány ember látta a hirdetést. Ez nem eredmény.
              Mi végig követjük az utat a{" "}
              <strong className="text-[var(--ink)]">kattintástól a megkeresésig</strong>, és hetente
              megmutatjuk, mi hozott ügyfelet és mi nem.
            </>,
            "Ha egy csatorna nem működik, azt megmondjuk — nem költjük tovább.",
          ]}
          detail={{ href: ADS_SERVICE.path, label: "hirdetéskezelés, ahol a megkeresés számít" }}
          features={ADS_FEATURES}
          device={
            <DevFrame header="Így néz ki egy heti jelentés" headerRight="Minta">
              <ReportRows rows={AD_SAMPLE_ROWS} />
              <p className="mt-[var(--space-4)] [font-size:var(--text-sm)] text-[var(--mid)]">
                Szemléltetés — a valós számokat az első hónap végén te látod először.
              </p>
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== 03 EGYEDI SZOFTVER ÉS AUTOMATIZÁCIÓ ===== */}
      <Rail label="03 / Szoftver">
        <ServiceBlock
          id="software"
          n="03"
          label="Szoftver és automatizáció"
          title="Ami ma kézzel megy, holnap magától"
          paragraphs={[
            "A legtöbb cégnél van valaki, aki naponta átmásol valamit egyik helyről a másikra: a webshop rendeléseit a számlázóba, az űrlapról érkező megkereséseket egy táblázatba, a táblázatot a havi jelentésbe. Ez nem hiba, csak drága — és éppen akkor marad el, amikor a legnagyobb a hajtás.",
            <>
              <strong className="text-[var(--ink)]">
                Ezeket a rendszereket összekötjük, hogy a munka magától fusson.
              </strong>{" "}
              Ahol elég egy kész automatizációs eszköz, azt használjuk; ahol nem, saját kódot
              írunk. Ha egy folyamathoz nincs megfelelő szoftver, megépítjük: belső rendszert,
              ügyfélportált, adminfelületet.
            </>,
            "Felméréssel kezdünk: írásban megkapod, melyik folyamatot érdemes automatizálni, és melyiket nem. Minden automatizáció naplóz és hiba esetén riaszt, mert egy csendben leállt folyamat rosszabb, mint a kézi munka.",
          ]}
          detail={{ href: SOFTWARE_SERVICE.path, label: "folyamat-automatizálás és egyedi szoftver" }}
          features={SOFTWARE_FEATURES}
          device={
            <DevFrame header="Egy automatizáció naplója" headerRight="Minta">
              <LogLines lines={SOFTWARE_LOG} />
              <p className="mt-[var(--space-4)] [font-size:var(--text-sm)] text-[var(--mid)]">
                Szemléltetés. A lépések a folyamattól függenek.
              </p>
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== 04 AI ===== */}
      <Rail label="04 / AI">
        <ServiceBlock
          n="04"
          label="AI és chatbot"
          id="ai"
          title="AI, ami a helyén van"
          paragraphs={[
            "Az AI nem varázslat és nem is helyettesíti az ügyfélszolgálatot. Arra jó, hogy a látogató éjjel is választ kapjon az egyszerű kérdésekre, és eljusson oda, ahol valóban tudsz vele foglalkozni.",
            <>
              Ezen az oldalon is fut egy — kipróbálhatod. Az adattovábbítás részleteit az{" "}
              <Link href="/ai-tajekoztato" className="text-[var(--ink)] underline">
                AI-használati tájékoztató
              </Link>{" "}
              írja le.
            </>,
          ]}
          detail={{ href: AI_SERVICE.path, label: "AI-chatbot a weboldalon" }}
          features={AI_FEATURES}
          device={
            <DevFrame header="Amit a chat valóban tud" headerRight="Példa">
              <div className="[font-size:var(--text-base)]">
                <div className="grid grid-cols-1 sm:grid-cols-[86px_1fr] gap-[var(--space-2)] sm:gap-[var(--space-4)] py-[var(--space-3)] border-b border-[var(--rule-soft)]">
                  <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    Látogató
                  </span>
                  <p className="m-0 text-[var(--ink-2)]">
                    Építesz webshopot meglévő WooCommerce fölé?
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[86px_1fr] gap-[var(--space-2)] sm:gap-[var(--space-4)] py-[var(--space-3)]">
                  <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--signal-deep)]">
                    GBR AI
                  </span>
                  <p className="m-0 text-[var(--ink-2)]">
                    Igen, ez a leggyakoribb felállás — a motor marad, a felület újul. A részletekhez
                    a legjobb, ha leírod a projektet itt: /init
                  </p>
                </div>
              </div>
              <p className="mt-[var(--space-4)] pt-[var(--space-4)] border-t border-[var(--rule-soft)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--mid)]">
                A chat tájékoztat, nem ajánl. Árat és határidőt ember mond.
              </p>
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== 05 VIDEÓ ===== */}
      <Rail label="05 / Videó">
        <ServiceBlock
          n="05"
          label="Videó és tartalom"
          title="A weboldal önmagában nem elég"
          id="video"
          paragraphs={[
            <>
              Egy jó oldalra tartalom is kell. Reklámfilm, termékvideó, közösségi formátumok —{" "}
              <strong className="text-[var(--ink)]">a mi irányításunk alatt</strong>, ugyanabban az
              arculatban, mint a weboldal. Így nem lesz külön a „szép oldal” és a „valahonnan
              összeszedett videó”. A gyártást videós partnerünk végzi.
            </>,
          ]}
          detail={{ href: VIDEO_SERVICE.path, label: "céges videó és tartalom" }}
          features={VIDEO_FEATURES}
          device={
            <div className="border-t border-[var(--rule)] grid grid-cols-1 sm:grid-cols-3">
              {VIDEO_FEATURES.slice(0, 3).map((feat, i) => (
                <div
                  key={feat}
                  className={`relative aspect-[4/3] sm:aspect-square border-b sm:border-b-0 border-[var(--rule)] ${
                    i < 2 ? "sm:border-r" : ""
                  }`}
                  style={{
                    background: "linear-gradient(150deg, var(--rule-soft), var(--rule))",
                  }}
                >
                  <span className="absolute left-4 bottom-3.5 [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          }
        />
      </Rail>

      {/* ===== 06 ÜZEMELTETÉS ===== */}
      <Rail label="06 / Web-üzemeltetés">
        <ServiceBlock
          id="ops"
          n="06"
          label="Web-üzemeltetés"
          title="Az átadás nem a vége"
          paragraphs={[
            <>
              A legtöbb ügynökség itt hagyja abba. Pedig egy weboldal az élesítés után kezd el pénzt
              termelni — és akkor kezd el elromlani is. Ha kéred,{" "}
              <strong className="text-[var(--ink)]">visszük tovább</strong>: figyeljük, javítjuk,
              fejlesztjük.
            </>,
            "Egy felelős emberrel dolgozol, aki ismeri a projekted. Nem ügyfélszolgálati sorszámot kapsz.",
            <>
              Ezt nem csak ügyfeleknek mondjuk: a saját termékünket, a Gimbalt is mi
              üzemeltetjük — el is mondtuk,{" "}
              <Link href="/hirek/miert-epit-sajat-termeket" className="text-[var(--ink)] underline">
                mit tanultunk belőle
              </Link>
              .
            </>,
          ]}
          detail={{ href: OPS_SERVICE.path, label: "weboldal-üzemeltetés és folyamatos fejlesztés" }}
          features={OPS_FEATURES}
          device={
            <DevFrame header="Egy nap a tartalommotorból" headerRight="Napló">
              <LogLines lines={OPS_LOG} />
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== 07 AKADÁLYMENTESÍTÉS ===== */}
      <Rail label="07 / Akadálymentesítés">
        <ServiceBlock
          id="access"
          n="07"
          label="Akadálymentesítés"
          title="Van, aki nem tudja használni az oldaladat"
          paragraphs={[
            "Aki képernyőolvasót használ, aki csak billentyűzettel navigál, akinek gyengébb a látása vagy remeg a keze — ők ugyanúgy vásárolnának, csak sokszor nem tudnak. Nem azért, mert az oldal rossz, hanem mert senki nem gondolt rájuk a tervezésekor.",
            <>
              Emellett az uniós akadálymentesítési szabályozás 2025 óta a fogyasztóknak szóló
              online szolgáltatásokra is kiterjed. Hogy ez pontosan kire és hogyan vonatkozik, azt
              jogász mondja meg —{" "}
              <strong className="text-[var(--ink)]">
                mi a technikai oldalt tudjuk felmérni és rendbe tenni
              </strong>
              .
            </>,
            <>
              A megfelelés jogi kérdés, és arról ügyvéd nyilatkozik. Mi azt vállaljuk, hogy{" "}
              <strong className="text-[var(--ink)]">
                a technikai akadályokat felmérjük, dokumentáljuk és megszüntetjük
              </strong>{" "}
              — és hogy a végén írásban megkapod, mi változott.
            </>,
            <>
              Részletesebben írtunk arról,{" "}
              <Link href="/hirek/akadalymentesites" className="text-[var(--ink)] underline">
                mit jelent az, hogy egy weboldal akadálymentes
              </Link>
              .
            </>,
          ]}
          detail={{ href: ACCESS_SERVICE.path, label: "weboldal-akadálymentesítés" }}
          features={ACCESS_FEATURES}
          device={
            <DevFrame header="Amit egy felmérés tipikusan talál" headerRight="Minta">
              <FindingsTable
                rows={ACCESS_SAMPLE_ROWS}
                note="Illusztráció. A tényleges lista a felmérés után áll össze, oldalanként eltér."
              />
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== 08 PULZUS ===== */}
      <Rail label="08 / Pulzus">
        <ServiceBlock
          id="pulzus"
          n="08"
          label="Pulzus"
          title="Havonta egy levél arról, hogyan lát téged az internet"
          paragraphs={[
            "A legtöbb weboldal elkészül, aztán senki nem nézi meg többé. Ha lelassul, ha lejár egy tanúsítvány, ha elromlik a kapcsolati űrlap — az derül ki, amikor egy ügyfél szól. Vagy nem derül ki.",
            <>
              A Pulzus ezt figyeli helyette —{" "}
              <strong className="text-[var(--ink)]">havonta megméri, és megmondja, mi változott</strong>
              . Nem pontszámokat küldünk, hanem egy levelet arról, mi változott, és mit érdemes
              tenni.
            </>,
            <>
              <strong className="text-[var(--ink)]">Nem kérünk csillagot, csak véleményt.</strong>{" "}
              A Google tiltja, hogy egy vállalkozás kizárólag pozitív értékelést kérjen. Mi nem is
              tesszük: a vásárló egy semleges kérést kap. Ha jó a munka, a jó értékelés magától
              jön.
            </>,
            <>
              <strong className="text-[var(--ink)]">A választ a gép írja, de te küldöd.</strong>{" "}
              Elkészítjük a válaszjavaslatot, de a nevedben soha nem posztolunk automatikusan.
              Egy elhamarkodott válasz többet árt, mint amennyit tíz köszönőlevél használ.
            </>,
            <>
              <strong className="text-[var(--ink)]">Jogi modul: mi mérünk, a jogász minősít.</strong>{" "}
              Az adatkezelési és a süti-tájékoztató akkor avul el, amikor az oldal változik: egy új
              chat vagy hirdetési mérőkód, és a dokumentum már mást ír, mint amit az oldal csinál.
              Havonta megnézzük, mit tölt ténylegesen az oldal, és a változást webjogász partnerünk
              értékeli. A megfelelésről ő nyilatkozik, nem mi.
            </>,
            <>
              Egy konkrét esetet is megmutatunk arról,{" "}
              <Link href="/hirek/pulzus-ot-masodperc" className="text-[var(--ink)] underline">
                mi derül ki, ha valaki tényleg megméri az oldalt
              </Link>
              .
            </>,
          ]}
          detail={{ href: PULZUS_SERVICE.path, label: "a Pulzus havi weboldal-figyelés" }}
          features={PULZUS_FEATURES}
          device={
            <DevFrame header="Így néz ki egy havi levél" headerRight="Minta">
              <div className="[font-size:var(--text-sm)] text-[var(--ink-2)] space-y-[var(--space-4)]">
                <p className="m-0 font-display font-bold [font-size:var(--text-lg)] text-[var(--ink)]">
                  Augusztusi összefoglaló
                </p>
                <div>
                  <p className="m-0 mb-[var(--space-1)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    Az oldala
                  </p>
                  <p className="m-0 leading-relaxed">
                    Egész hónapban elérhető volt. A betöltési idő 2,1 mp — ez rendben van.
                  </p>
                  <p className="m-0 leading-relaxed text-[var(--attention)]">
                    ⚠️ Az SSL-tanúsítványod 24 nap múlva lejár. Ha nem újul meg, a böngészők „nem
                    biztonságos” jelzést tesznek az oldaladra.
                  </p>
                </div>
                <div>
                  <p className="m-0 mb-[var(--space-1)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    Ahogy a Google látja
                  </p>
                  <p className="m-0 leading-relaxed">
                    8 új értékelés érkezett. Az átlaga 4,7-ről 4,8-ra emelkedett.
                  </p>
                </div>
                <div>
                  <p className="m-0 mb-[var(--space-1)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    Jogi dokumentumok
                  </p>
                  <p className="m-0 leading-relaxed">
                    Augusztus 12. óta egy új hirdetési mérőkód fut az oldalon. A süti-tájékoztató nem
                    említi — a technikai leírást továbbítottuk a jogász partnernek.
                  </p>
                </div>
                <div>
                  <p className="m-0 mb-[var(--space-1)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    Amit érdemes megnézni
                  </p>
                  <p className="m-0 leading-relaxed">
                    Két értékelés említi, hogy nehéz telefonon elérni. Ha ez visszatér, érdemes
                    lehet visszahívás-kérést tenni az oldalra.
                  </p>
                </div>
                <div>
                  <p className="m-0 mb-[var(--space-1)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    Amit ebben a hónapban tehetsz
                  </p>
                  <ol className="m-0 pl-[1.1em] space-y-[var(--space-1)]">
                    <li>SSL megújítása — intézzük, ha kéred</li>
                    <li>Nyitvatartás frissítése a Google-profilban a hosszú hétvégére</li>
                  </ol>
                </div>
              </div>
              <p className="mt-[var(--space-4)] pt-[var(--space-4)] border-t border-[var(--rule-soft)] [font-size:var(--text-sm)] text-[var(--mid)]">
                Minta. A tényleges levél a te adataidból áll össze.
              </p>
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== 09 IT-ÜZEMELTETÉS ===== */}
      <Rail label="09 / IT">
        <ServiceBlock
          id="it"
          n="09"
          label="IT-üzemeltetés"
          title="Az irodai informatika, amire nem kell gondolnod"
          paragraphs={[
            "Egy irodában ritkán az a gond, hogy nincs informatika. Inkább az, hogy senki nem tudja egészben: ki fér hozzá mihez, van-e mentés, és kit kell hívni, ha reggel nem indul a levelezés.",
            <>
              <strong className="text-[var(--ink)]">IT-partnerünkkel végezzük</strong>, aki 15 éve
              üzemeltet informatikai rendszereket kis és nagyobb irodáknak, home office-ban dolgozó
              csapatoknak — a szervertől a nyomtatón át a munkatársak telefonjáig. A kapcsolattartó
              ilyenkor is mi vagyunk.
            </>,
            "Felméréssel kezdünk: megnézzük, mi van most, és írásban megkapod, mit találtunk és mit javasolunk. Utána te döntöd el, mit bízol ránk.",
          ]}
          detail={{ href: IT_SERVICE.path, label: "irodai IT-üzemeltetés és rendszergazdai szolgáltatás" }}
          features={IT_FEATURES}
          device={
            <DevFrame header="Amit egy IT-felmérés tipikusan talál" headerRight="Minta">
              <FindingsTable
                rows={IT_SAMPLE_ROWS}
                note="Illusztráció. A tényleges lista a felmérés után áll össze, irodánként eltér."
              />
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== GYIK ===== */}
      <Rail label="GYIK">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .faq-q .faq-pm-plus { display: inline; }
          .faq-q .faq-pm-minus { display: none; }
          .faq-q[open] .faq-pm-plus { display: none; }
          .faq-q[open] .faq-pm-minus { display: inline; }
        `,
          }}
        />
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-9)]">
          <Eyebrow>Gyakori kérdések</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[16ch] text-[var(--ink)]">
            Amit tényleg meg szoktak kérdezni
          </h2>
        </section>
        <div className="border-t border-[var(--rule)]">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={item.question}
              className="faq-q border-b border-[var(--rule)]"
              open={i === 0}
            >
              <summary className="list-none cursor-pointer grid grid-cols-[1fr_28px] gap-[var(--space-5)] items-baseline px-6 py-[var(--space-6)] font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.022em] hover:bg-[var(--panel)] transition-colors [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span className="[font-family:var(--font-mono)] [font-size:var(--text-lg)] text-[var(--signal-deep)] text-right">
                  <span className="faq-pm-plus">+</span>
                  <span className="faq-pm-minus">&minus;</span>
                </span>
              </summary>
              <div className="px-6 pb-[var(--space-8)]">
                <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed max-w-[64ch]">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== CTA ===== */}
      <Rail label="Kapcsolat" dark>
        <section className="px-6 py-[var(--space-20)] sm:py-[var(--space-32)]">
          <Eyebrow>Beszéljünk róla</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-final)] leading-[0.92] tracking-[-0.055em] max-w-[13ch] mb-[var(--space-6)] text-[var(--ink)]">
            Mondd el, mit szeretnél elérni
          </h2>
          <p className="[font-size:var(--text-base)] text-[var(--ink-2)] max-w-[52ch] leading-relaxed mb-[var(--space-8)]">
            Nem minden projektet vállalunk el — ezért kérdezünk előbb. Két munkanapon belül
            válaszolunk. Ha nem illünk össze, azt is megmondjuk.
          </p>
          <Button asChild>
            <Link href="/init">Pitcheld el a projekted &rarr;</Link>
          </Button>
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)] mt-[var(--space-6)]">
            Vagy írj közvetlenül: gabor@thegbr.eu
          </p>
        </section>
      </Rail>
    </main>
  );
}
