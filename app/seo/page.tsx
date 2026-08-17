import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, faqPageSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";

const DESCRIPTION =
  "Technikai SEO és strukturált adat, amitől a Google és az AI-keresők is megtalálják a céged. Ezt az oldalt is így építettük — ellenőrizheted.";

export const metadata: Metadata = {
  title: "Keresőoptimalizálás és AI-láthatóság (SEO és AEO) | THE GBR",
  description: DESCRIPTION,
  alternates: {
    canonical: "/seo",
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
    <main className="min-h-screen bg-[#020202] relative overflow-hidden text-white font-sans selection:bg-[#e7ff00] selection:text-black">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "SEO", url: `${SITE_URL}/seo` },
        ])}
      />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
      {/* 1. KŐKEMÉNY NEURÁLIS/MÁTRIX HÁTTÉR */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Mátrix Dot-Grid (Neuron pontok) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#e7ff00_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.04]"></div>
        {/* Hálózati összekötő vonalak */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        {/* Fókusz maszk - Széleken elsötétül, hogy a tartalom keretbe kerüljön */}
        <div className="absolute inset-0 bg-[#020202] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_0%,black_100%)]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 pt-32 pb-32 relative z-10">
        {/* HERO SZEKCIÓ */}
        <div className="mb-32 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16 group/hero">
          <div className="lg:w-3/5 relative">
            <p className="text-[#e7ff00] text-xs font-mono tracking-[0.4em] uppercase mb-8 flex items-center justify-center lg:justify-start gap-4">
              <span className="w-8 h-[1px] bg-[#e7ff00] transform origin-left transition-transform duration-700 group-hover/hero:scale-x-150"></span>
              Keresőoptimalizálás és AI-láthatóság
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] font-black uppercase tracking-tighter mb-8 text-white transition-all duration-700">
              Attól, hogy jó a szöveged, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-200 to-white">
                még nem talál meg senki.
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              A keresés két irányba ment el. A Google továbbra is a technikai alapokat méri: mennyi
              idő alatt töltődik be az oldal, tiszta-e a szerkezet, érti-e a robot, miről szól. Az
              AI-keresők pedig strukturált adatot olvasnak, nem marketingszöveget.
            </p>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mt-4">
              Mi mindkettőt megépítjük — és nem csak beszélünk róla.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="#bizonyitek"
                className="border border-white/20 hover:border-[#e7ff00] bg-white/[0.03] backdrop-blur-md px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#e7ff00]/10 hover:text-[#e7ff00] hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(231,255,0,0.2)]"
              >
                Nézd meg az eredményt
              </Link>
            </div>
          </div>

          <div className="lg:w-2/5 w-full">
            <div className="relative aspect-square rounded-full border border-white/5 bg-[#050505]/50 backdrop-blur-md flex items-center justify-center overflow-hidden transition-transform duration-1000 hover:scale-105 hover:border-[#e7ff00]/20">
              {/* Forgó technikai gyűrűk animációja */}
              <div className="absolute inset-5 border border-[#e7ff00]/20 rounded-full border-dashed animate-[spin_40s_linear_infinite]"></div>
              <div className="absolute inset-10 border border-white/10 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
              <div className="text-center transform transition-transform duration-500 hover:scale-110">
                <span className="block text-3xl md:text-4xl font-black text-[#e7ff00] mb-2 drop-shadow-[0_0_15px_rgba(231,255,0,0.2)] tracking-tight">
                  LCP · INP · CLS
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">
                  Amit ténylegesen mérünk
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BIZONYÍTÉK SZEKCIÓ */}
        <div
          id="bizonyitek"
          className="mb-32 scroll-mt-32 relative rounded-[2rem] bg-[#070707]/90 backdrop-blur-xl border border-[#e7ff00]/20 p-10 md:p-16 lg:p-20 overflow-hidden transition-all duration-700 hover:border-[#e7ff00]/30"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#e7ff00] to-transparent opacity-70"></div>
          <div className="max-w-3xl relative z-10">
            <p className="text-[#e7ff00] text-xs font-mono tracking-[0.4em] uppercase mb-4">
              Bizonyíték
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">
              Ezt az oldalt is így építettük
            </h2>
            <p className="text-gray-400 leading-relaxed mb-10">
              A legtöbb SEO-ügynökség oldalán nincs sitemap. Nézd meg — komolyan, nyisd meg. A
              miénken van, és ellenőrizheted te is.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            {PROOF_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/proof flex items-center justify-between gap-4 border border-white/10 bg-[#0a0a0a] rounded-xl p-5 hover:border-[#e7ff00]/50 transition-colors"
              >
                <span>
                  <span className="block text-sm font-bold text-white uppercase tracking-wide">
                    {item.label}
                  </span>
                  <span className="block text-xs text-gray-500 font-mono mt-1">{item.where}</span>
                </span>
                <span className="text-gray-600 group-hover/proof:text-[#e7ff00] transition-colors font-black text-lg">
                  &rarr;
                </span>
              </a>
            ))}
          </div>

          <p className="mt-8 text-gray-600 text-xs font-mono relative z-10">
            Ez nem screenshot, hanem kattintható link. Ha bármelyik nem működne, szólj — és
            javítjuk.
          </p>
        </div>

        {/* PARADIGMAVÁLTÁS SZEKCIÓ */}
        <div className="mb-24 relative rounded-[2rem] bg-[#070707]/90 backdrop-blur-xl border border-white/[0.05] p-10 md:p-16 lg:p-20 overflow-hidden transition-all duration-700 hover:border-white/10 hover:shadow-[0_0_40px_-20px_rgba(255,255,255,0.05)]">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#e7ff00] to-transparent opacity-50"></div>
          <div className="max-w-3xl relative z-10">
            <p className="text-[#e7ff00] text-xs font-mono tracking-[0.4em] uppercase mb-4">
              Mi változott
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6">
              Két külön keresés lett belőle
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              A Google technikai része szigorodott. A betöltési sebesség, a szerkezet stabilitása és
              a válaszidő ma rangsorolási tényező — nem kényelmi kérdés. Egy lassú oldal nem azért
              veszít, mert csúnya, hanem mert a Google hátrébb sorolja.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              És megjelent egy második út. Egyre többen kérdezik meg egyszerűen az AI-t, hogy „ki
              csinál Magyarországon B2B webshopot”. Ezek a rendszerek nem kulcsszavakat olvasnak,
              hanem struktúrát: mi a cég neve, mivel foglalkozik, hol található, mit ír a saját
              oldalán. Ha ez nincs gépi olvasásra alkalmas formában, akkor a válaszban más szerepel.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Ez a második rész új, és még kevesen csinálják. Ezért is éri meg most.
            </p>
          </div>
        </div>

        {/* BENTO GRID: A KÉT PILLÉR */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          {/* TECHNIKAI SEO PANEL */}
          <div className="group relative rounded-[2rem] bg-[#070707]/90 backdrop-blur-xl border border-white/[0.05] shadow-2xl p-10 md:p-14 overflow-hidden transition-all duration-500 hover:border-[#e7ff00]/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(231,255,0,0.1)]">
            <div className="w-14 h-14 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-10 text-white transition-all duration-500 group-hover:text-[#e7ff00] group-hover:border-[#e7ff00]/50 group-hover:scale-110">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>

            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
              Technikai alap (SEO)
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-10">
              Amit a Google mér. A Next.js szerveroldali renderelése miatt a keresőrobot azonnal
              látja a tartalmat — nem kell megvárnia, míg a böngésző összerakja. Ez a különbség a
              másodperc törtrészében dől el, de a rangsorban is meglátszik.
            </p>

            <ul className="space-y-0 relative z-10">
              {SEO_ITEMS.map((item) => (
                <li
                  key={item.title}
                  className="border-t border-white/[0.05] py-4 transition-colors duration-300 hover:bg-[#0a0a0a] px-3 -mx-3 rounded-lg"
                >
                  <div className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e7ff00] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500 pl-3.5">{item.desc}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* AEO PANEL */}
          <div className="group relative rounded-[2rem] bg-[#070707]/90 backdrop-blur-xl border border-white/[0.05] shadow-2xl p-10 md:p-14 overflow-hidden transition-all duration-500 hover:border-[#e7ff00]/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(231,255,0,0.1)]">
            <div className="w-14 h-14 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-10 text-white transition-all duration-500 group-hover:text-[#e7ff00] group-hover:border-[#e7ff00]/50 group-hover:scale-110">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>

            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
              AI-láthatóság (AEO)
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-10">
              Amit a nyelvi modellek olvasnak. Nem tudjuk garantálni, hogy egy AI éppen téged idéz —
              ezt senki nem tudja. Azt viszont meg tudjuk csinálni, hogy legyen mit idéznie: tiszta
              struktúra, egyértelmű adatok, gépi olvasásra alkalmas formában.
            </p>

            <ul className="space-y-0 relative z-10">
              {AEO_ITEMS.map((item) => (
                <li
                  key={item.title}
                  className="border-t border-white/[0.05] py-4 transition-colors duration-300 hover:bg-[#0a0a0a] px-3 -mx-3 rounded-lg"
                >
                  <div className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e7ff00] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500 pl-3.5">{item.desc}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FOLYAMAT */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <p className="text-[#e7ff00] text-xs font-mono tracking-[0.4em] uppercase mb-4">
              Folyamat
            </p>
            <h2 className="text-4xl font-black uppercase tracking-tight">Három lépés</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative group/steps">
            {/* Összekötő vonal (csak asztalin látszik) */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0 transition-all duration-700 group-hover/steps:via-[#e7ff00]/30"></div>

            {PROCESS_STEPS.map((step) => (
              <div
                key={step.num}
                className="relative z-10 bg-[#070707] border border-white/5 p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-500 hover:border-[#e7ff00]/40 hover:-translate-y-3 hover:shadow-[0_15px_30px_-15px_rgba(231,255,0,0.15)] group/card"
              >
                <div className="w-14 h-14 bg-[#020202] border border-white/10 rounded-full flex items-center justify-center text-[#e7ff00] font-black text-xl mb-6 shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover/card:scale-125 group-hover/card:border-[#e7ff00]/50">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GYAKORI KÉRDÉSEK */}
        <div className="mb-32 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 justify-center mb-12">
            <span className="w-12 h-px bg-white/20"></span>
            <h2 className="text-2xl font-black italic uppercase tracking-widest text-center text-gray-500">
              Gyakori <span className="text-white">kérdések</span>
            </h2>
            <span className="w-12 h-px bg-white/20"></span>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={item.question}
                className={`border border-white/10 bg-[#070707] rounded-xl p-6 transition-colors ${
                  index % 2 === 0 ? "hover:border-[#e7ff00]/30" : "hover:border-white/20"
                }`}
              >
                <h3 className="font-bold text-white mb-2 uppercase tracking-wide text-sm md:text-base">
                  {item.question}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative w-full max-w-5xl mx-auto rounded-3xl bg-[#e7ff00] p-12 md:p-20 text-center shadow-[0_0_40px_rgba(231,255,0,0.15)] transform transition-transform duration-500 hover:scale-[1.02]">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-black uppercase italic leading-none tracking-tighter mb-8">
            Nézzük meg, hol tartasz
          </h2>
          <p className="text-black/70 text-sm md:text-base font-semibold max-w-xl mx-auto mb-10">
            A felmérés végén kapsz egy listát arról, mi hiányzik a technikai alapokból — akkor is,
            ha nem velünk dolgozol tovább. Két munkanapon belül válaszolunk.
          </p>

          <Link
            href="/init"
            className="inline-flex items-center gap-3 bg-black text-white font-black uppercase text-sm md:text-base tracking-widest px-10 py-5 transition-all duration-300 hover:bg-white hover:text-black shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] group"
          >
            Kérj felmérést{" "}
            <span className="text-[#e7ff00] group-hover:text-black transition-colors duration-300">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
