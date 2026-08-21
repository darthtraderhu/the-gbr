import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, faqPageSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";

const DESCRIPTION =
  "Technikai SEO és strukturált adat, amitől a Google és az AI-keresők is megtalálják a céged. Ezt az oldalt is így építettük — ellenőrizheted.";

export const metadata: Metadata = {
  title: "Keresőoptimalizálás és AI-láthatóság (SEO és AEO) | THE GBR",
  description: DESCRIPTION,
  alternates: {
    canonical: "/seo",
    languages: { hu: "/seo", en: "/en/seo", "x-default": "/seo" },
  },
  openGraph: {
    title: "Keresőoptimalizálás és AI-láthatóság (SEO és AEO) | THE GBR",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Keresőoptimalizálás és AI-láthatóság (SEO és AEO) | THE GBR",
    description: DESCRIPTION,
  },
};

const PROOF_ITEMS = [
  {
    label: "Dinamikus sitemap",
    where: "thegbr.eu/sitemap.xml",
    href: "/sitemap.xml",
  },
  {
    label: "Robots.txt sitemap-hivatkozással",
    where: "thegbr.eu/robots.txt",
    href: "/robots.txt",
  },
  {
    label: "Strukturált adat (JSON-LD)",
    where: "Google Rich Results Test",
    href: `https://search.google.com/test/rich-results?url=${encodeURIComponent(SITE_URL)}`,
  },
  {
    label: "Mért teljesítmény",
    where: "PageSpeed Insights",
    href: `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE_URL)}`,
  },
];

const SEO_ITEMS = [
  {
    title: "Szerveroldali renderelés",
    desc: "A robot azonnal olvassa a tartalmat, nem kell rá várnia.",
  },
  {
    title: "Automatikus sitemap és robots.txt",
    desc: "Minden új oldal magától bekerül. Nem kell rá emlékezni.",
  },
  {
    title: "Core Web Vitals: LCP, INP, CLS",
    desc: "A három metrika, amit a Google ténylegesen mér.",
  },
  {
    title: "Canonical URL-ek és átirányítások",
    desc: "Platformváltásnál ez a legdrágább hiba, ha kimarad.",
  },
];

const AEO_ITEMS = [
  {
    title: "Schema.org és JSON-LD",
    desc: "Cégadatok, cikkek, szolgáltatások, gyakori kérdések — géppel olvasható formában.",
  },
  {
    title: "Gyakori kérdések strukturálva",
    desc: "Megjelenhetnek közvetlenül a Google találati listájában, kattintás előtt.",
  },
  {
    title: "Egyértelmű cégadatok",
    desc: "Név, cím, elérhetőség, tevékenység — mindenhol ugyanaz, ellentmondás nélkül. Ez alapján azonosít egy AI.",
  },
  {
    title: "Kérdésre válaszoló tartalom",
    desc: "Nem kulcsszóhalmozás, hanem az, hogy tényleg megválaszolod, amit kérdeznek.",
  },
];

const CWV_METRICS = [
  { code: "LCP", label: "Betöltés" },
  { code: "INP", label: "Reakció" },
  { code: "CLS", label: "Stabilitás" },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Felmérés",
    desc: "Megnézzük, hol tartasz: sebesség, indexeltség, szerkezet, strukturált adat. A végén kapsz egy listát arról, mi hiányzik — akkor is, ha nem velünk dolgozol tovább.",
  },
  {
    num: "02",
    title: "Építés",
    desc: "A technikai alapok rendbetétele. Ha a mostani rendszer nem bírja, akkor újraépítés — de fokozatosan, hogy közben ne veszíts forgalmat.",
  },
  {
    num: "03",
    title: "Karbantartás",
    desc: "A keresők változnak, és a te oldalad is. Ha üzemeltetést is kérsz, ezt folyamatosan követjük.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Mennyi idő alatt látszik eredmény?",
    answer:
      "A technikai javítások hatása hetek alatt megjelenik az indexelésben. A rangsor-változás lassabb — három-hat hónap, ha versenyzett kifejezésekről van szó. Aki gyorsabbat ígér, az vagy nem érti, vagy nem mond igazat.",
  },
  {
    question: "Garantáltok első helyet a Google-ben?",
    answer:
      "Nem, és aki ilyet ígér, azt kerüld el. A rangsort a Google határozza meg, nem a szolgáltatód. Amit garantálni tudunk: a technikai alapok rendben lesznek, mérhetők, és ellenőrizheted.",
  },
  {
    question: "Mi az az AEO, és tényleg kell?",
    answer:
      "Az AI-keresőkre való felkészítés. Ma még kevés forgalmat hoz, de gyorsan nő — és a strukturált adat, amit hozzá kell építeni, a hagyományos Google-találatokban is segít. Vagyis nem elszórt pénz akkor sem, ha az AI-keresés lassabban terjed, mint várjuk.",
  },
  {
    question: "Meglévő oldalt is tudtok javítani, vagy csak újat építeni?",
    answer:
      "Mindkettő megy. A felmérés végén megmondjuk, melyik éri meg jobban — van, amikor a meglévő rendszer javítása olcsóbb és gyorsabb.",
  },
  {
    question: "Honnan tudom, hogy tényleg megcsináltátok?",
    answer:
      "Ugyanúgy, ahogy nálunk is ellenőrizheted: sitemap, robots.txt, Rich Results Test, PageSpeed. Ezek nyilvános, ingyenes eszközök — nem kell hinned nekünk.",
  },
];

export default function SeoAeoPage() {
  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "SEO", url: `${SITE_URL}/seo` },
        ])}
      />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
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

      {/* ===== SÖTÉT FEJLÉC + ELLENŐRZŐ PANEL ===== */}
      <Rail label="SEO és AEO" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <h1 className="font-display font-black leading-[0.9] tracking-[-0.052em] [font-size:var(--text-display)] max-w-[15ch]">
            Attól, hogy jó a szöveged,{" "}
            <span className="text-[var(--dim)]">még nem talál meg senki</span>
            <span className="text-[var(--signal)]">.</span>
          </h1>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[52ch] mt-[var(--space-8)]">
            A keresés két irányba ment el. A Google továbbra is a technikai alapokat méri: mennyi
            idő alatt töltődik be az oldal, tiszta-e a szerkezet, érti-e a robot, miről szól. Az
            AI-keresők pedig strukturált adatot olvasnak, nem marketingszöveget.
          </p>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[52ch] mt-[var(--space-4)]">
            Mi mindkettőt megépítjük — és nem csak beszélünk róla.
          </p>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[52ch] mt-[var(--space-6)]">
            A legtöbb SEO-ügynökség oldalán nincs sitemap. Nézd meg — komolyan, nyisd meg. A miénken
            van, és ellenőrizheted te is.
          </p>
          <div className="mt-[var(--space-8)]">
            <Button asChild variant="ghost">
              <Link href="#bizonyitek">Nézd meg az eredményt</Link>
            </Button>
          </div>
        </section>

        <div id="bizonyitek" className="border-t border-[var(--rule)]">
          <div className="flex flex-wrap justify-between gap-3 px-6 py-3 border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)]">
            <span>Bizonyíték · ezt az oldalt is így építettük</span>
            <span>Kattintható</span>
          </div>

          {PROOF_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[28px_1fr_auto] sm:grid-cols-[34px_1fr_1.15fr_auto] gap-[var(--space-4)] sm:gap-[var(--space-8)] px-6 py-[var(--space-5)] sm:py-[var(--space-6)] border-b border-[var(--rule)] items-center hover:bg-[var(--panel)] transition-colors"
            >
              <span className="[font-family:var(--font-mono)] [font-size:var(--text-lg)] text-[var(--signal)]">
                ✓
              </span>
              <span className="font-display font-semibold [font-size:var(--text-lg)] tracking-[-0.02em] text-[var(--ink)]">
                {item.label}
              </span>
              <span className="hidden sm:block [font-family:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--mid)] truncate group-hover:text-[var(--signal)] transition-colors">
                {item.where}
              </span>
              <span className="[font-family:var(--font-mono)] [font-size:var(--text-sm)] text-[var(--rule-strong)] group-hover:text-[var(--signal)] transition-colors">
                &rarr;
              </span>
            </a>
          ))}

          <p className="px-6 py-[var(--space-4)] pb-[var(--space-9)] sm:pb-[var(--space-12)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)] max-w-[60ch]">
            Ez nem screenshot, hanem kattintható link. Ha bármelyik nem működne, szólj — és
            javítjuk.
          </p>
        </div>
      </Rail>

      <Seam />

      {/* ===== MI VÁLTOZOTT — két keresés ===== */}
      <Rail label="Mi változott">
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-9)]">
          <Eyebrow>Mi változott</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch] text-[var(--ink)]">
            Két külön keresés lett belőle
          </h2>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-[var(--rule)]">
          <div className="border-b lg:border-b-0 lg:border-r border-[var(--rule)]">
            <div className="px-6 py-3 border-b border-[var(--rule)] bg-[var(--panel)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)]">
              01 — A klasszikus találati lista
            </div>
            <div className="px-6 py-[var(--space-8)] sm:py-[var(--space-10)]">
              <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.028em] mb-[var(--space-4)]">
                A Google technikai része szigorodott
              </h3>
              <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[46ch]">
                A betöltési sebesség, a szerkezet stabilitása és a válaszidő ma rangsorolási tényező
                — nem kényelmi kérdés. Egy lassú oldal nem azért veszít, mert csúnya, hanem mert a
                Google hátrébb sorolja.
              </p>

              <div className="bg-[var(--panel)] border border-[var(--rule)] p-4 sm:p-5 mt-[var(--space-6)]">
                <div className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--mid)]">
                  thegbr.eu › szolgaltatasok
                </div>
                <div className="font-display font-semibold [font-size:var(--text-lg)] tracking-[-0.015em] text-[#1a4fa0] mt-[var(--space-2)] mb-[var(--space-2)]">
                  Szolgáltatások | THE GBR
                </div>
                <p className="[font-size:var(--text-sm)] text-[var(--ink-2)] m-0">
                  Weboldal és webshop fejlesztés, performance marketing, AI-integráció, videó,
                  üzemeltetés és akadálymentesítés. Hét terület, házon belül…
                </p>
                <div className="mt-[var(--space-3)] pt-[var(--space-3)] border-t border-[var(--rule-soft)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.12em] uppercase text-[var(--signal-deep)]">
                  Gyakori kérdések · 8 elem megjelenítve
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="px-6 py-3 border-b border-[var(--rule)] bg-[var(--panel)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)]">
              02 — Az AI-válasz
            </div>
            <div className="px-6 py-[var(--space-8)] sm:py-[var(--space-10)]">
              <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.028em] mb-[var(--space-4)]">
                És megjelent egy második út
              </h3>
              <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[46ch]">
                Egyre többen kérdezik meg egyszerűen az AI-t. Ezek a rendszerek nem kulcsszavakat
                olvasnak, hanem struktúrát. Ha ez nincs gépi olvasásra alkalmas formában, a
                válaszban más szerepel.
              </p>

              <div className="bg-[var(--panel)] border border-[var(--rule)] p-4 sm:p-5 mt-[var(--space-6)]">
                <div className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.1em] uppercase text-[var(--mid)] mb-[var(--space-3)]">
                  „Ki csinál Magyarországon B2B webshopot?&rdquo;
                </div>
                <p className="[font-size:var(--text-sm)] leading-relaxed text-[var(--ink-2)] m-0">
                  Több ügynökség foglalkozik ezzel. Például a{" "}
                  <strong className="font-display font-bold text-[var(--ink)]">THE GBR</strong> (GBR
                  Marketing Solutions Kft.) Next.js alapú B2B webshopokat épít, meglévő rendszerek
                  fölé is…
                </p>
                <div className="mt-[var(--space-3)] pt-[var(--space-3)] border-t border-[var(--rule-soft)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] text-[var(--mid)]">
                  Forrás: thegbr.eu — Organization, Service séma
                </div>
              </div>
            </div>
          </div>
        </div>
      </Rail>

      {/* ===== KÉT PILLÉR ===== */}
      <Rail label="A két pillér">
        {/* SEO */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(140px,19%)_1fr_minmax(0,38%)] gap-[var(--space-8)] sm:gap-[var(--space-10)] px-6 pt-[var(--space-16)] sm:pt-[var(--space-20)] pb-[var(--space-10)] sm:pb-[var(--space-14)] border-t border-[var(--rule)] items-start">
          <div>
            <div className="font-display font-black [font-size:var(--text-numeral-xl)] leading-[0.78] tracking-[-0.06em] text-[var(--rule)]">
              01
            </div>
            <div className="mt-[var(--space-3)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase text-[var(--mid)]">
              SEO
            </div>
          </div>
          <div>
            <h3 className="font-display font-bold [font-size:var(--text-3xl)] tracking-[-0.032em] leading-[1.05] mb-[var(--space-4)]">
              Technikai alap
            </h3>
            <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[44ch]">
              Amit a Google mér. A Next.js szerveroldali renderelése miatt a keresőrobot azonnal
              látja a tartalmat — nem kell megvárnia, míg a böngésző összerakja.
            </p>
            <div className="flex gap-px bg-[var(--rule)] border border-[var(--rule)] mt-[var(--space-6)]">
              {CWV_METRICS.map((m) => (
                <span
                  key={m.code}
                  className="flex-1 bg-[var(--panel)] text-center py-[var(--space-3)] px-[var(--space-2)]"
                >
                  <span className="block [font-family:var(--font-mono)] [font-size:var(--text-sm)] tracking-[0.1em] text-[var(--ink)]">
                    {m.code}
                  </span>
                  <span className="block mt-[var(--space-1)] [font-family:var(--font-mono)] text-[length:8.5px] tracking-[0.18em] uppercase text-[var(--mid)]">
                    {m.label}
                  </span>
                </span>
              ))}
              <span className="flex-1 bg-[var(--panel)] text-center py-[var(--space-3)] px-[var(--space-2)]">
                <span className="block [font-family:var(--font-mono)] [font-size:var(--text-sm)] tracking-[0.1em] text-[var(--rule-strong)] line-through">
                  FID
                </span>
                <span className="block mt-[var(--space-1)] [font-family:var(--font-mono)] text-[length:8.5px] tracking-[0.18em] uppercase text-[var(--mid)]">
                  2024-ben kivezetve
                </span>
              </span>
            </div>
          </div>
          <dl className="m-0">
            {SEO_ITEMS.map((item, i) => (
              <div key={item.title} className={i > 0 ? "mt-[var(--space-1)]" : ""}>
                <dt
                  className={`font-display font-bold [font-size:var(--text-base)] tracking-[-0.01em] pt-[var(--space-4)] pb-[var(--space-1)] ${
                    i > 0 ? "border-t border-[var(--rule-soft)]" : ""
                  }`}
                >
                  {item.title}
                </dt>
                <dd className="m-0 mb-[var(--space-2)] [font-size:var(--text-sm)] text-[var(--mid)]">
                  {item.desc}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* AEO */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(140px,19%)_1fr_minmax(0,38%)] gap-[var(--space-8)] sm:gap-[var(--space-10)] px-6 pt-[var(--space-10)] sm:pt-[var(--space-14)] pb-[var(--space-16)] sm:pb-[var(--space-20)] border-t border-[var(--rule)] items-start">
          <div>
            <div className="font-display font-black [font-size:var(--text-numeral-xl)] leading-[0.78] tracking-[-0.06em] text-[var(--rule)]">
              02
            </div>
            <div className="mt-[var(--space-3)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase text-[var(--mid)]">
              AEO
            </div>
          </div>
          <div>
            <h3 className="font-display font-bold [font-size:var(--text-3xl)] tracking-[-0.032em] leading-[1.05] mb-[var(--space-4)]">
              AI-láthatóság
            </h3>
            <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[44ch]">
              Amit a nyelvi modellek olvasnak. Nem tudjuk garantálni, hogy egy AI éppen téged idéz —
              ezt senki nem tudja. Azt viszont meg tudjuk csinálni, hogy{" "}
              <strong className="text-[var(--ink)]">legyen mit idéznie</strong>: tiszta struktúra,
              egyértelmű adatok, gépi olvasásra alkalmas formában.
            </p>
            <div
              data-theme="dark"
              style={{ backgroundColor: "var(--ground)" }}
              className="border border-[var(--rule)] mt-[var(--space-6)]"
            >
              <div className="px-4 py-[var(--space-2)] border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)]">
                Amit egy AI a te oldaladról lát
              </div>
              <pre className="m-0 p-4 [font-family:var(--font-mono)] text-[length:var(--text-xs)] leading-[1.75] text-[var(--ink-2)] overflow-x-auto">
                {"{\n  "}
                <span className="text-[var(--signal)]">&quot;@type&quot;</span>
                {": "}
                <span>&quot;Organization&quot;</span>
                {",\n  "}
                <span className="text-[var(--signal)]">&quot;name&quot;</span>
                {": "}
                <span>&quot;GBR Marketing Solutions Kft.&quot;</span>
                {",\n  "}
                <span className="text-[var(--signal)]">&quot;alternateName&quot;</span>
                {": "}
                <span>&quot;THE GBR&quot;</span>
                {",\n  "}
                <span className="text-[var(--signal)]">&quot;email&quot;</span>
                {": "}
                <span>&quot;gabor@thegbr.eu&quot;</span>
                {",\n  "}
                <span className="text-[var(--signal)]">&quot;address&quot;</span>
                {": {\n    "}
                <span className="text-[var(--signal)]">&quot;addressLocality&quot;</span>
                {": "}
                <span>&quot;Tar&quot;</span>
                {",\n    "}
                <span className="text-[var(--signal)]">&quot;addressCountry&quot;</span>
                {": "}
                <span>&quot;HU&quot;</span>
                {"\n  }\n}"}
              </pre>
            </div>
          </div>
          <dl className="m-0">
            {AEO_ITEMS.map((item, i) => (
              <div key={item.title} className={i > 0 ? "mt-[var(--space-1)]" : ""}>
                <dt
                  className={`font-display font-bold [font-size:var(--text-base)] tracking-[-0.01em] pt-[var(--space-4)] pb-[var(--space-1)] ${
                    i > 0 ? "border-t border-[var(--rule-soft)]" : ""
                  }`}
                >
                  {item.title}
                </dt>
                <dd className="m-0 mb-[var(--space-2)] [font-size:var(--text-sm)] text-[var(--mid)]">
                  {item.desc}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Rail>

      {/* ===== FOLYAMAT ===== */}
      <Rail label="Folyamat">
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-9)] border-t border-[var(--rule)]">
          <Eyebrow>Folyamat</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[16ch] text-[var(--ink)]">
            Három lépés
          </h2>
        </section>
        <div className="border-t border-[var(--rule)]">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`grid grid-cols-1 sm:grid-cols-[minmax(90px,15%)_1fr] gap-[var(--space-6)] sm:gap-[var(--space-10)] px-6 py-[var(--space-8)] sm:py-[var(--space-10)] items-start ${
                i < PROCESS_STEPS.length - 1 ? "border-b border-[var(--rule)]" : ""
              }`}
            >
              <div className="font-display font-black [font-size:var(--text-numeral-lg)] leading-[0.8] tracking-[-0.06em] text-[var(--rule)]">
                {step.num}
              </div>
              <div>
                <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] mb-[var(--space-3)]">
                  {step.title}
                </h3>
                <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed max-w-[62ch] m-0">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Rail>

      {/* ===== GYIK ===== */}
      <Rail label="GYIK">
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-9)] border-t border-[var(--rule)]">
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
          <Eyebrow>Felmérés</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-final)] leading-[0.92] tracking-[-0.055em] max-w-[13ch] mb-[var(--space-6)] text-[var(--ink)]">
            Nézzük meg, hol tartasz
          </h2>
          <p className="[font-size:var(--text-base)] text-[var(--ink-2)] max-w-[54ch] leading-relaxed mb-[var(--space-8)]">
            A felmérés végén kapsz egy listát arról, mi hiányzik a technikai alapokból — akkor is,
            ha nem velünk dolgozol tovább. Két munkanapon belül válaszolunk.
          </p>
          <Button asChild>
            <Link href="/init">Kérj felmérést &rarr;</Link>
          </Button>
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)] mt-[var(--space-6)]">
            Vagy írj közvetlenül: gabor@thegbr.eu
          </p>
        </section>
      </Rail>
    </main>
  );
}
