import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts"; // <-- BEHÚZZUK A MOTORT!
import { websiteSchema, professionalServiceSchema, videoObjectSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, SectionHeader, Rail, Seam, Eyebrow } from "@/app/components/ui";
import ServiceIndex from "@/app/components/ServiceIndex";
import { ARZENAL_SECTIONS } from "@/lib/site-links";
import IntroVideo from "@/app/components/IntroVideo";
import HeroInstrument from "./HeroInstrument";
import { Okoszisztema } from "@/app/components/SalesBlocks";
import { ECO_STAGES_HU } from "@/lib/okoszisztema";
import { NEXTJS_BRANDS, NEXTJS_CHECKED_HU } from "@/lib/nextjs-proof";

// A cikk-ütemezés (lib/posts.ts) miatt a főoldal legutóbbi-cikkek blokkja is
// naponta frissül — enélkül egy ütemezett cikk a dátuma napján sem jelenne
// meg, amíg nincs új deploy.
export const revalidate = 86400;

const HOME_DESCRIPTION =
  "Nem csak weboldal vagy webshop: értékesítési ökoszisztéma B2B cégeknek. Next.js alapon építjük, összekötjük a hirdetéssel, az automatizációval és az utánkövetéssel, és mi üzemeltetjük tovább. Válasz két munkanapon belül.";

export const metadata: Metadata = {
  title: "THE GBR | Weboldal, webshop és IT-üzemeltetés B2B cégeknek",
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
    languages: {
      hu: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "THE GBR | Weboldal, webshop és IT-üzemeltetés B2B cégeknek",
    description: HOME_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "THE GBR | Weboldal, webshop és IT-üzemeltetés B2B cégeknek",
    description: HOME_DESCRIPTION,
  },
};

// A weboldal-átvilágítás fejezetei — ugyanazok, mint a kiküldött riportoké.
// Az AI-láthatóság szekció tényei — a /seo oldal AEO-felmérésével egyeznek
// (AEO_CHECKS: 8 pont, AI_TEST_FACTS: felületek, ismétlés, átadás).
const AEO_FACTS = [
  { value: "8", label: "pont, amit az oldaladon megnézünk" },
  { value: "5", label: "AI-felület, ahol rákérdezünk" },
  { value: "3×", label: "legalább minden kérdés" },
  { value: "72 óra", label: "alatt kész az írásos eredmény" },
];

const AUDIT_CHAPTERS = [
  "Első benyomás és sebesség, mobilon is",
  "Mit lát a Google és a mesterséges intelligencia (SEO, AEO)",
  "Használható-e mindenkinek (akadálymentesség)",
  "Adatkezelés, sütik, hozzájárulás, cégadatok",
  "Ami kívülről látszik: biztonsági beállítások, elavult elemek",
];

const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "WooCommerce",
  "Vercel",
];

const PROJECTS = [
  {
    tag: "Ügyfél · folyamatban",
    client: true,
    title: "Kisgép-forgalmazó webshop",
    desc: "Több évtizede piacon lévő kizárólagos importőr. Élő webáruház fokozatos újraépítése — a bolt egy percre sem áll le.",
    meta: ["~400 termék", "Next.js"],
  },
  {
    tag: "Saját termék · fejlesztés alatt",
    client: false,
    title: "Értékesítési rendszer",
    desc: "Ipari és műszaki cégeknek, amelyek egyedi árajánlatból élnek. Arra a szakaszra építjük, ahol az üzlet csendben elcsúszhat: a beérkező megkeresés és az aláírt megrendelés között.",
    meta: ["Fejlesztés alatt", "Ipari B2B"],
  },
  {
    tag: "Saját termék · élő",
    client: false,
    title: "Pénzügyi alkalmazás",
    desc: "Saját fejlesztés, saját infrastruktúrán. Nincs kire mutogatni, ha elromlik — ezért tudjuk, mit jelent üzemeltetni.",
    meta: ["Élő", "Supabase"],
  },
  {
    tag: "Saját termék · élő",
    client: false,
    title: "Tőzsdei oktatóplatform",
    desc: "Tartalom, közösség és eszközök egy helyen. Kétnyelvű felépítés, folyamatos üzemeltetés.",
    meta: ["Kétnyelvű", "Next.js"],
  },
];

const TRUST_CLAIMS = [
  {
    head: "Mi üzemeltetjük",
    text: "Amit építünk, azt visszük tovább. Monitoring, riasztás, hibakezelés — nem külön megállapodás kérdése.",
  },
  {
    head: "Válasz két munkanapon belül",
    text: "Vállalás, nem ígéret. Ha csúszunk, előre szólunk.",
  },
  {
    head: "Egy felelős ember",
    text: "Nem ügyfélszolgálati sorszámot kapsz, hanem valakit, aki ismeri a projekted.",
  },
];

const PACKAGE_COLUMNS = [
  {
    tag: "Belépő",
    name: "Weboldal és arculat",
    price: "Egyedi ajánlat",
    hot: false,
    href: "/init?csomag=web-arculat",
  },
  {
    tag: "A leggyakoribb",
    name: "Webshop és skálázás",
    price: "Teljes infrastruktúra",
    hot: true,
    href: "/init?csomag=webshop-skalazas",
  },
  {
    tag: "Teljes lefedettség",
    name: "Fejlesztés és üzemeltetés",
    price: "Havi keret",
    hot: false,
    href: "/init?csomag=fejlesztes-uzemeltetes",
  },
];

const PACKAGE_ROWS: { label: string; values: [boolean, boolean, boolean] }[] = [
  { label: "Weboldal, dizájn", values: [true, true, true] },
  { label: "Technikai SEO", values: [true, true, true] },
  { label: "Webshop, PWA", values: [false, true, true] },
  { label: "Fizetés, szállítás, számlázás", values: [false, true, true] },
  { label: "Kampány és mérés", values: [false, true, true] },
  { label: "Üzemeltetés, monitoring", values: [false, false, true] },
  { label: "Videó és tartalom", values: [false, false, true] },
  { label: "Egy felelős kapcsolattartó", values: [false, false, true] },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Felmérés",
    text: "Megnézzük, mi van most — kód, adatok, számok. Nem tippelünk. Ennek a végén tudod, mibe kerül és mennyi idő.",
  },
  {
    num: "02",
    title: "Terv és keret",
    text: "Fix hatókör, fix árazás, írásos szerződés — szellemi tulajdonnal és adatkezeléssel együtt. Nem ad hoc.",
  },
  {
    num: "03",
    title: "Építés szakaszokban",
    text: "Kéthetente látható eredmény. Élő rendszernél fokozatos átállás — a bolt nem áll le.",
  },
  {
    num: "04",
    title: "Átadás és üzemeltetés",
    text: "Dokumentáció, monitoring, riasztás. Innentől jön a „manage” rész — ha kéred.",
  },
];

// A cégbemutató videó — forrása a video/ mappa Remotion-projektje. Ha a
// videó szövege változik, ez a leirat is frissítendő.
const INTRO_VIDEO = {
  src: "/video/cegbemutato.mp4",
  poster: "/video/cegbemutato-poster.jpg",
  transcript:
    "A legjobb kampány sem segít, ha a rendszer mögötte nem működik. Két dolgot csinálunk, nem tizenkettőt: megépítjük a weboldalt vagy webshopot Next.js alapon, és visszük tovább — üzemeltetés, monitoring, folyamatos fejlesztés. A folyamat négy szakasza: felmérés, ahol megnézzük, mi van most, és a végén tudod, mibe kerül és mennyi idő; terv és keret fix hatókörrel, fix árazással és írásos szerződéssel; építés szakaszokban, kéthetente látható eredménnyel; végül átadás és üzemeltetés dokumentációval, monitoringgal és riasztással. Minden szakasz végén van valami, amit meg tudsz nézni. Pitcheld el a projekted a thegbr.eu/init oldalon — válasz 2 munkanapon belül.",
};

export default function Home() {
  const allPostsData = getSortedPostsData();
  const [leadPost, ...restPosts] = allPostsData;
  const minorPosts = restPosts.slice(0, 2);

  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd data={websiteSchema()} />
      <JsonLd data={professionalServiceSchema()} />
      <JsonLd
        data={videoObjectSchema({
          name: "THE GBR cégbemutató: hogyan dolgozunk",
          description:
            "Egyperces bemutató arról, hogyan építünk és üzemeltetünk weboldalakat B2B cégeknek, és milyen szakaszokban halad egy projekt.",
          contentPath: INTRO_VIDEO.src,
          thumbnailPath: INTRO_VIDEO.poster,
          uploadDate: "2026-10-23",
          duration: "PT1M4S",
          transcript: INTRO_VIDEO.transcript,
        })}
      />

      {/* ===== 01 / MŰSZER — a hero maga a bizonyíték ===== */}
      <Rail label="01 / Műszer" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-10)]">
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.24em] uppercase text-[var(--mid)] flex items-center gap-3 mb-[var(--space-8)]">
            <span className="w-1.5 h-1.5 bg-[var(--signal)] block animate-pulse" />
            Ez az oldal most megméri magát
          </p>
          <h1 className="font-display font-black leading-[0.86] tracking-[-0.055em] [font-size:var(--text-display)]">
            Nem mondjuk
            <br />
            <span className="text-[var(--dim)]">hogy gyors</span>
            <span className="text-[var(--signal)]">.</span>
          </h1>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[46ch] mt-[var(--space-8)]">
            Megmutatjuk. Az alábbi számokat nem mi írtuk ide — a te böngésződ mérte, most, ahogy
            betöltötte ezt az oldalt.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-[var(--space-8)]">
            <Button asChild>
              <Link href="/init">Pitcheld el a projekted</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="#folyamat">Hogyan dolgozunk</Link>
            </Button>
            <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)]">
              Válasz 2 munkanapon belül
            </span>
          </div>
        </section>

        <HeroInstrument />
      </Rail>

      <Seam />

      {/* ===== 02 / VIDEÓ — élig futó ===== */}
      <Rail label="02 / Videó">
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)]">
          <span>Egy perc arról, hogyan dolgozunk</span>
          <span>Cégbemutató · 1:04 · Hang nélkül</span>
        </div>
        <IntroVideo
          src={INTRO_VIDEO.src}
          poster={INTRO_VIDEO.poster}
          label="THE GBR cégbemutató: hogyan dolgozunk"
          playLabel="Lejátszás: THE GBR cégbemutató"
        />
        <details className="group px-6 py-3.5 border-b border-[var(--rule)]">
          <summary className="cursor-pointer [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] hover:text-[var(--ink)]">
            A videó szövege
          </summary>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[72ch] mt-[var(--space-4)] mb-[var(--space-2)]">
            {INTRO_VIDEO.transcript}
          </p>
        </details>
      </Rail>

      {/* ===== 03 / A CÉG MÖGÖTT — óriás idézet ===== */}
      <Rail label="03 / A cég mögött">
        <section className="px-6 py-[var(--space-16)] sm:py-[var(--space-24)] grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-[var(--space-10)] lg:gap-[var(--space-20)] items-start">
          <blockquote className="m-0 font-display font-bold [font-size:var(--text-quote)] leading-[1.06] tracking-[-0.038em]">
            A legjobb kampány sem segít,{" "}
            <em className="not-italic text-[var(--rule-strong)]">
              ha a rendszer mögötte nem működik.
            </em>
          </blockquote>
          <div>
            <Eyebrow>A cég mögött</Eyebrow>
            <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[42ch] mb-[var(--space-4)]">
              Több mint két évtizedet töltöttem értékesítéssel és marketinggel. A THE GBR-t azért
              indítottam, mert újra és újra ugyanazt láttam: lassú az oldal, elveszik a megkeresés,
              senki nem méri, mi történik.
            </p>
            <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[42ch] mb-[var(--space-4)]">
              Ma egy hatéves cég vagyunk, és pontosan ezt a két oldalt kötjük össze — az
              értékesítési logikát és a technológiát.
            </p>
            <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[42ch]">
              Fejlesztési partnerként is dolgozunk — magyar és nyugat-európai ügynökségeknek
              egyaránt.
            </p>
            <div className="mt-[var(--space-6)] pt-[var(--space-4)] border-t border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)]">
              Tóth Gábor · Sales &amp; Management
            </div>
          </div>
        </section>
      </Rail>

      <Seam />

      {/* ===== 04 / ÖKOSZISZTÉMA — nem weboldal, értékesítési rendszer ===== */}
      <Rail label="04 / Ökoszisztéma" dark>
        <Okoszisztema
          stages={ECO_STAGES_HU}
          eyebrow="Amit csinálunk"
          title={
            <>
              Nem weboldalt adunk el. Értékesítési ökoszisztémát
              <span className="text-[var(--signal)]">.</span>
            </>
          }
          lead="Egy weboldal önmagában névjegy. Ami eladja a cégedet, az az út, amin egy idegenből vevő lesz: megtalál, meggyőződik, kérdez, ajánlatot kér, és közben nem vész el. Ezt az utat építjük meg és visszük tovább, egy felelős kapcsolattartóval."
          note="Nem kell mind az öt szakasz. A felmérés megmutatja, hol szivárog most a legtöbb."
        />
      </Rail>

      <Seam />

      {/* ===== 04b / SZOLGÁLTATÁSOK — tíz terület ===== */}
      <Rail label="04 / Szolgáltatás">
        <ServiceIndex
          eyebrow="Tíz terület · mindegyik a saját szögéből"
          lead="Mindegyik szolgáltatás egy szakaszt visz, és mindegyiknél ott kezdjük, ahol a piac szokásos megoldása megáll."
          items={ARZENAL_SECTIONS}
          basePath="/arzenal"
        />
      </Rail>

      {/* ===== 05 / ÁTVILÁGÍTÁS — belépési pont ===== */}
      <Rail label="05 / Átvilágítás">
        <section className="px-6 py-[var(--space-16)] sm:py-[var(--space-20)] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[var(--space-10)] lg:gap-[var(--space-16)] items-start border-t border-[var(--rule)]">
          <div>
            <Eyebrow>Weboldal-átvilágítás</Eyebrow>
            <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[16ch] text-[var(--ink)]">
              Mielőtt bármit ajánlanánk, megnézzük, mi van most
            </h2>
            <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[46ch] mt-[var(--space-6)]">
              A meglévő weboldaladat kívülről vizsgáljuk meg, hozzáférést nem kérünk. Az eredményt
              írásos riportban kapod meg: mi működik, mi nem, és mit érdemes először javítani.
            </p>
            <div className="mt-[var(--space-8)]">
              <Button asChild>
                <Link href="/init">Kérj átvilágítást</Link>
              </Button>
              <Link
                href="/arzenal/atvilagitas-es-ajanlas"
                className="ml-[var(--space-5)] [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.16em] uppercase text-[var(--ink)] border-b-2 border-[var(--signal)] pb-1"
              >
                Mit kapsz &rarr;
              </Link>
            </div>
          </div>
          <div>
            <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-4)]">
              Amit megvizsgálunk
            </p>
            <ol className="m-0 p-0 list-none border-t border-[var(--rule)]">
              {AUDIT_CHAPTERS.map((chapter, i) => (
                <li
                  key={chapter}
                  className="grid grid-cols-[40px_1fr] gap-[var(--space-4)] py-[var(--space-4)] border-b border-[var(--rule)] items-baseline"
                >
                  <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--mid)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="[font-size:var(--text-base)] text-[var(--ink-2)]">{chapter}</span>
                </li>
              ))}
            </ol>
            <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--mid)] mt-[var(--space-4)]">
              Riport PDF-ben · sorrendbe tett teendőlistával
            </p>
          </div>
        </section>
      </Rail>

      {/* ===== 06 / AI-LÁTHATÓSÁG — AEO ===== */}
      <Rail label="06 / AI-láthatóság">
        <section className="px-6 py-[var(--space-16)] sm:py-[var(--space-20)] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[var(--space-10)] lg:gap-[var(--space-16)] items-start border-t border-[var(--rule)]">
          <div>
            <Eyebrow>AI-láthatóság (AEO)</Eyebrow>
            <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[16ch] text-[var(--ink)]">
              Ha az AI-t kérdezik, a te cégedet említi?
            </h2>
            <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[46ch] mt-[var(--space-6)]">
              Egyre több vevő nem a Google-ben keres szállítót, hanem megkérdezi a ChatGPT-t. Megnézzük,
              mit lát belőled egy AI, többször és több felületen rákérdezünk, és leírjuk, mit kell
              javítani, hogy legyen mit idéznie rólad.
            </p>
            <p className="[font-size:var(--text-sm)] leading-relaxed text-[var(--mid)] max-w-[46ch] mt-[var(--space-4)]">
              Azt, hogy egy AI téged ajánl, senki nem tudja garantálni. Azt igen, hogy az oldalad
              olvasható legyen számára.
            </p>
            <div className="mt-[var(--space-8)]">
              <Button asChild variant="ghost">
                <Link href="/seo">Hogyan csináljuk &rarr;</Link>
              </Button>
            </div>
          </div>
          <dl className="m-0 grid grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)]">
            {AEO_FACTS.map((fact) => (
              <div key={fact.label} className="bg-[var(--panel)] px-[var(--space-5)] py-[var(--space-6)]">
                <dt className="font-display font-black [font-size:var(--text-3xl)] leading-none tracking-[-0.04em] text-[var(--ink)]">
                  {fact.value}
                </dt>
                <dd className="m-0 mt-[var(--space-3)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--mid)]">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </Rail>

      {/* ===== 07 / STACK — Next.js, amire a világmárkák építenek ===== */}
      <Rail label="07 / Stack">
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-20)] pb-[var(--space-8)]">
          <Eyebrow>Műszaki alap · Next.js</Eyebrow>
          <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[15ch] text-[var(--ink)]">
            Amire a világmárkák építenek, arra építjük a te oldaladat is
            <span className="text-[var(--signal)]">.</span>
          </h2>
        </section>
        <ul className="m-0 p-0 list-none grid grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--rule)]">
          {NEXTJS_BRANDS.map((brand) => (
            <li
              key={brand}
              className="px-6 py-[var(--space-8)] border-r border-b border-[var(--rule)] font-display font-black [font-size:var(--text-4xl)] tracking-[-0.045em] leading-none text-[var(--ink)] hover:text-[var(--signal-deep)] transition-colors"
            >
              {brand}
            </li>
          ))}
        </ul>
        <div className="px-6 py-[var(--space-8)] grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-[var(--space-8)] items-start">
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch]">
            Ezek a márkák a Next.js hivatalos bemutatóoldalán szerepelnek. Ugyanez a keretrendszer
            van a mi oldalaink alatt is: a sebesség, a keresőoptimalizálás és a biztonság a
            szerkezet része, nem utólagos bővítmény. Nem ígéret arra, hogy a te oldalad ugyanannyit
            javul, hanem bizonyíték arra, hogy a technológia bírja a nagy forgalmat.{" "}
            <a
              href="https://nextjs.org/showcase"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] underline"
            >
              Forrás: nextjs.org/showcase
            </a>{" "}
            <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)] whitespace-nowrap">
              {NEXTJS_CHECKED_HU}
            </span>
          </p>
          <div>
            <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-3)]">
              Amivel napi szinten dolgozunk
            </p>
            <p className="font-display font-extrabold [font-size:var(--text-2xl)] leading-snug tracking-[-0.025em] text-[var(--ink)]">
              {TECH_STACK.map((tech, i) => (
                <span key={tech}>
                  {i > 0 && <span className="text-[var(--signal)]"> · </span>}
                  {tech}
                </span>
              ))}
            </p>
          </div>
        </div>
      </Rail>

      {/* ===== 08 / MUNKÁK — jegyzék ===== */}
      <Rail label="08 / Munkák">
        <div className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-10)]">
          <SectionHeader
            eyebrow="Munkák"
            title="Amin dolgozunk"
            lead="Ügyfélmunka és saját termékek, élők és fejlesztés alattiak. A sajátjainknál nincs kire mutogatni, ha valami nem működik, és ez meglátszik azon, ahogy az ügyfeleknek építünk."
          />
        </div>
        <div className="border-t border-[var(--rule)]">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className="grid grid-cols-[40px_1fr] sm:grid-cols-[56px_1.1fr_1.5fr_minmax(0,180px)] gap-x-[var(--space-4)] sm:gap-x-[var(--space-8)] gap-y-[var(--space-3)] px-6 py-[var(--space-8)] sm:py-[var(--space-10)] border-b border-[var(--rule)] items-baseline hover:bg-[var(--panel)] transition-colors"
            >
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--mid)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div
                  className={`[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase mb-2 ${project.client ? "text-[var(--signal-deep)]" : "text-[var(--mid)]"}`}
                >
                  {project.tag}
                </div>
                <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em]">
                  {project.title}
                </h3>
              </div>
              <p className="col-span-2 sm:col-span-1 [font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed">
                {project.desc}
              </p>
              <div className="col-span-2 sm:col-span-1 [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--mid)] sm:text-right">
                {project.meta.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== 09 / MIÉRT SZÁMÍT — sötét állítás ===== */}
      <Rail label="09 / Miért számít" dark>
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <Eyebrow>Miért számít</Eyebrow>
          <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[14ch] text-[var(--ink)]">
            Aki csak épít, annak nincsenek számai
          </h2>
          <p className="[font-size:var(--text-xl)] leading-relaxed text-[var(--ink-2)] max-w-[58ch] mt-[var(--space-6)]">
            A portfólió megmutatja, mi készült el. Nem mutatja meg, hogy mi lett vele fél évvel
            később. Az átadás után kezdődik az igazi munka — és a legtöbb ügynökség pont ott hagyja
            abba.
          </p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[var(--rule)]">
          {TRUST_CLAIMS.map((claim, i) => (
            <div
              key={claim.head}
              className={`px-6 py-[var(--space-8)] sm:py-[var(--space-10)] ${i < TRUST_CLAIMS.length - 1 ? "border-b sm:border-b-0 sm:border-r border-[var(--rule)]" : ""}`}
            >
              <h3 className="font-display font-bold [font-size:var(--text-lg)] mb-[var(--space-2)] text-[var(--ink)]">
                {claim.head}
              </h3>
              <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed">
                {claim.text}
              </p>
            </div>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== 10 / CSOMAGOK — összehasonlító táblázat ===== */}
      <Rail label="10 / Csomagok" dark={false}>
        <section id="packages" className="px-6 py-[var(--space-16)] sm:py-[var(--space-24)]">
          <SectionHeader
            eyebrow="Együttműködés"
            title="Hogyan dolgozunk együtt"
            lead="Minden projekt más, ezért fix árlista nincs. Három tipikus felállás — a tiéd valószínűleg valamelyikhez közel esik."
          />

          <div className="overflow-x-auto mt-[var(--space-8)]">
            <table className="w-full border-collapse min-w-[640px]">
              <colgroup>
                <col />
                <col />
                <col style={{ backgroundColor: "var(--panel)" }} />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th className="text-left align-bottom p-[var(--space-4)] pt-0"></th>
                  {PACKAGE_COLUMNS.map((pkg) => (
                    <th key={pkg.name} className="text-left align-bottom p-[var(--space-4)] pt-0">
                      <span
                        className={`block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase mb-[var(--space-2)] ${pkg.hot ? "text-[var(--signal-deep)]" : "text-[var(--mid)]"}`}
                      >
                        {pkg.tag}
                      </span>
                      <span className="block font-display font-bold [font-size:var(--text-xl)] tracking-[-0.025em] mb-[var(--space-2)]">
                        {pkg.name}
                      </span>
                      <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--mid)]">
                        {pkg.price}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PACKAGE_ROWS.map((row) => (
                  <tr key={row.label}>
                    <th className="text-left font-normal [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)] border-t border-[var(--rule)] p-[var(--space-4)] w-[26%]">
                      {row.label}
                    </th>
                    {row.values.map((yes, i) => (
                      <td
                        key={i}
                        className="border-t border-[var(--rule)] p-[var(--space-4)] [font-size:var(--text-base)]"
                      >
                        {yes ? (
                          <span className="font-display font-bold text-[var(--signal-deep)]">
                            ✓
                          </span>
                        ) : (
                          <span className="text-[var(--rule-strong)]">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="p-[var(--space-4)] pt-[var(--space-6)] border-t border-[var(--rule)]"></td>
                  {PACKAGE_COLUMNS.map((pkg) => (
                    <td
                      key={pkg.name}
                      className="p-[var(--space-4)] pt-[var(--space-6)] border-t border-[var(--rule)]"
                    >
                      <Button asChild variant={pkg.hot ? "primary" : "ghost"} size="sm">
                        <Link href={pkg.href}>Beszéljünk róla</Link>
                      </Button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </Rail>

      {/* ===== 11 / FOLYAMAT ===== */}
      <Rail label="11 / Folyamat">
        <div className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-10)]">
          <SectionHeader
            eyebrow="Folyamat"
            title="Nincs meglepetés a végén"
            lead="Minden szakasz végén van valami, amit meg tudsz nézni."
          />
        </div>
        <div className="border-t border-[var(--rule)]">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              id={step.num === "01" ? "folyamat" : undefined}
              className="grid grid-cols-1 sm:grid-cols-[minmax(110px,16%)_1fr] gap-[var(--space-4)] sm:gap-[var(--space-10)] px-6 py-[var(--space-8)] sm:py-[var(--space-10)] border-b border-[var(--rule)] items-start"
            >
              <div className="font-display font-black [font-size:var(--text-numeral-lg)] leading-[0.8] tracking-[-0.06em] text-[var(--rule)]">
                {step.num}
              </div>
              <div>
                <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] mb-[var(--space-3)]">
                  {step.title}
                </h3>
                <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[62ch]">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Rail>

      {/* ===== 12 / ÍRÁSOK — kiemelt + lista ===== */}
      <Rail label="12 / Írások">
        <div className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-10)]">
          <SectionHeader
            eyebrow="Írások"
            title="Amit közben megtanulunk"
            lead="Nem tartalomgyár. Amit leírunk, azt előbb megcsináltuk."
          />
        </div>
        {leadPost && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] border-t border-[var(--rule)]">
            <Link
              href={`/hirek/${leadPost.id}`}
              className="block px-6 py-[var(--space-10)] sm:py-[var(--space-12)] border-b lg:border-b-0 lg:border-r border-[var(--rule)] hover:bg-[var(--panel)] transition-colors group"
            >
              <div className="flex flex-wrap gap-4 [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase text-[var(--mid)] mb-[var(--space-5)]">
                <span className="text-[var(--signal-deep)]">{leadPost.category || "Írások"}</span>
                <span>
                  {new Intl.DateTimeFormat("hu-HU", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date(leadPost.date))}
                </span>
                <span>{leadPost.readTime}</span>
              </div>
              <h3 className="font-body font-semibold [font-size:var(--text-4xl)] leading-[1.14] tracking-[-0.015em] max-w-[22ch] mb-[var(--space-4)]">
                {leadPost.title}
              </h3>
              <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed max-w-[44ch]">
                {leadPost.excerpt}
              </p>
              <span className="inline-block mt-[var(--space-6)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] group-hover:text-[var(--signal-deep)] transition-colors">
                Elolvasom &rarr;
              </span>
            </Link>
            <div className="flex flex-col">
              {minorPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/hirek/${post.id}`}
                  className="block px-6 py-[var(--space-6)] sm:py-[var(--space-8)] border-b border-[var(--rule)] hover:bg-[var(--panel)] transition-colors flex-1 group"
                >
                  <div className="flex flex-wrap gap-3 [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase text-[var(--mid)]">
                    <span className="text-[var(--signal-deep)]">{post.category || "Írások"}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-body font-semibold [font-size:var(--text-xl)] leading-[1.24] tracking-[-0.008em] mt-[var(--space-3)] group-hover:text-[var(--signal-deep)] transition-colors">
                    {post.title}
                  </h3>
                </Link>
              ))}
              <Link
                href="/hirek"
                className="flex justify-between px-6 py-[var(--space-5)] border-t border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] hover:text-[var(--ink)] hover:bg-[var(--panel)] transition-colors"
              >
                <span>Összes írás</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        )}
      </Rail>

      <Seam />

      {/* ===== 13 / KAPCSOLAT — záró CTA ===== */}
      <Rail label="13 / Kapcsolat" dark>
        <section id="contact" className="px-6 py-[var(--space-20)] sm:py-[var(--space-32)]">
          <Eyebrow>Kapcsolat</Eyebrow>
          <h2 className="font-display font-black [font-size:var(--text-final)] leading-[0.9] tracking-[-0.055em] max-w-[12ch] mb-[var(--space-6)] text-[var(--ink)]">
            Pitcheld el a projekted
          </h2>
          <p className="[font-size:var(--text-lg)] text-[var(--ink-2)] max-w-[52ch] leading-relaxed mb-[var(--space-8)]">
            Nem minden projektet vállalunk el — ezért kérdezünk előbb. Írd le, mit szeretnél elérni,
            és két munkanapon belül válaszolunk. Ha nem illünk össze, azt is megmondjuk.
          </p>
          <Button asChild>
            <Link href="/init">Kezdjük &rarr;</Link>
          </Button>
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)] mt-[var(--space-6)]">
            Vagy írj közvetlenül: gabor@thegbr.eu
          </p>
        </section>
      </Rail>
    </main>
  );
}
