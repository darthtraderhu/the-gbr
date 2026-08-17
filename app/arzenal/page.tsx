import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, faqPageSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "Szolgáltatások | THE GBR",
  description:
    "Weboldal és webshop fejlesztés, performance marketing, AI-integráció, videó és üzemeltetés. Öt terület, házon belül — B2B ügyfeleknek.",
  alternates: {
    canonical: "/arzenal",
  },
  openGraph: {
    title: "Szolgáltatások | THE GBR",
    description:
      "Weboldal és webshop fejlesztés, performance marketing, AI-integráció, videó és üzemeltetés. Öt terület, házon belül.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Szolgáltatások | THE GBR",
    description:
      "Weboldal és webshop fejlesztés, performance marketing, AI-integráció, videó és üzemeltetés. Öt terület, házon belül.",
  },
};

const NAV_ITEMS = [
  { id: "web", name: "Web és webshop" },
  { id: "ads", name: "Performance marketing" },
  { id: "ai", name: "AI és chatbot" },
  { id: "video", name: "Videó és tartalom" },
  { id: "ops", name: "Üzemeltetés és fejlesztés" },
];

const WEB_FEATURES = [
  "Egyedi dizájn és design rendszer",
  "Technikai SEO: sitemap, strukturált adat, canonical",
  "Telefonra telepíthető változat (PWA)",
  "Meglévő rendszer fölé építés — WooCommerce, Shopify",
  "Biztonsági fejlécek, rate limiting, input validáció",
];

const VIDEO_FEATURES = [
  "Cégbemutató és imázsvideó",
  "Termékvideó webshophoz",
  "Rövid formátumok közösségi médiára",
  "Vágás, színkezelés, feliratozás",
];

const OPS_FEATURES = [
  "Monitoring és hibariasztás — előbb tudunk róla, mint te",
  "Folyamatos fejlesztés havi óraszámban",
  "Automatizált tartalommotor: a blog magától frissül",
  "Jogi megfelelés karbantartása a változásokkal együtt",
  "Heti vagy kétheti előrehaladási riport",
  "Egy felelős kapcsolattartó",
];

const FAQ_ITEMS = [
  {
    question: "Mennyibe kerül egy weboldal vagy webshop?",
    answer:
      "Nincs fix árlista, mert nincs két egyforma projekt. A felmérés végén viszont fix árat és határidőt kapsz, nem sávot. A tipikus felállásokat a csomagoknál látod.",
  },
  {
    question: "Mennyi idő alatt készül el?",
    answer:
      "Egy weboldal jellemzően 4–8 hét. Egy élő webshop újraépítése ennél lényegesen több, mert szakaszosan megy — de az első látható változás már hetek alatt megjelenik.",
  },
  {
    question: "Mi történik a régi oldalammal, ha lecseréljük?",
    answer:
      "Nem kapcsoljuk le, amíg az új nem működik bizonyítottan. Az URL-eket átirányítjuk, hogy a Google-találatok ne vesszenek el — ez a legdrágább hiba, amit egy platformváltásnál el lehet követni.",
  },
  {
    question: "Kell hozzá értenem a technikához?",
    answer: "Nem. Ami viszont kell: tudd megmondani, mit szeretnél elérni. A többi a mi dolgunk.",
  },
  {
    question: "Mi van, ha átadás után elromlik valami?",
    answer:
      "Ha üzemeltetést is kérsz, mi észleljük előbb, és javítjuk. Ha nem, akkor is felelünk a leszállított munkáért — a részleteket a szerződés rögzíti.",
  },
  {
    question: "Csak nagyvállalatokkal dolgoztok?",
    answer:
      "Nem. Van egy alsó határ, ami alatt nem érdemes belefogni — ezt az űrlapon a költségkeret-kérdés szűri. Fölötte a cégméret nem szempont.",
  },
];

export default function Arzenal() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#e7ff00] selection:text-black relative font-sans">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Szolgáltatások", url: `${SITE_URL}/arzenal` },
        ])}
      />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
      {/* =========================================
          STÍLUSOK ÉS ANIMÁCIÓK
      ========================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        body { scroll-behavior: smooth; }

        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .scanline-effect { animation: scanline 8s linear infinite; }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s step-end infinite; }

        /* Blueprint Rács Háttér */
        .bg-blueprint {
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `,
        }}
      />

      {/* =========================================
          HÁTTÉR
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#e7ff00]/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00E5FF]/5 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-cubes-pattern opacity-[0.10]"></div>
        <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#e7ff00]/10 to-transparent scanline-effect opacity-50"></div>
      </div>

      {/* =========================================
          FŐ TARTALOM (OSZTOTT KÉPERNYŐ)
      ========================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 md:pt-32 md:pb-32 lg:pt-48 flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* BAL OLDAL: STICKY VEZÉRLŐPANEL */}
        <aside className="lg:w-1/3 relative">
          <div className="sticky top-32">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter mb-6 lg:mb-8 text-white">
              Szolgáltatások<span className="text-[#e7ff00]">.</span>
            </h1>
            <p className="text-gray-400 font-medium text-xs md:text-sm leading-relaxed mb-8 md:mb-10 border-l-2 border-[#e7ff00] pl-4 bg-gradient-to-r from-[#e7ff00]/5 to-transparent py-2">
              Öt terület, amit házon belül végzünk. Ha egy projekthez nem mind az öt kell, nem is
              adjuk el mind az ötöt.
            </p>

            <nav className="flex flex-col gap-2 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold">
              {NAV_ITEMS.map((item, index) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className="p-3 md:p-4 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-l-4 hover:border-l-[#e7ff00] transition-all rounded flex items-center justify-between group"
                >
                  <span className="group-hover:text-white transition-colors text-gray-500 flex items-center gap-2 md:gap-3">
                    <span className="text-[#e7ff00]">[{String(index + 1).padStart(2, "0")}]</span>
                    {item.name}
                  </span>
                  <span className="text-gray-700 group-hover:text-[#e7ff00] transition-colors font-black">
                    &rarr;
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* JOBB OLDAL: MODULOK (GÖRGETHETŐ) */}
        <div className="lg:w-2/3 flex flex-col gap-16 md:gap-32">
          {/* [01] WEB */}
          <section id="web" className="scroll-mt-32">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 border-b border-white/10 pb-4">
              <span className="text-3xl md:text-4xl font-black italic text-[#e7ff00] drop-shadow-[0_0_10px_rgba(231,255,0,0.3)]">
                01
              </span>
              <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white">
                Weboldal és webshop, ami mérhetően gyors
              </h2>
            </div>
            <div className="bg-[#121212] bg-blueprint border border-white/5 rounded-xl p-6 md:p-8 relative overflow-hidden group hover:border-[#e7ff00]/50 hover:shadow-[0_0_40px_rgba(231,255,0,0.1)] transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e7ff00]/10 blur-[50px] group-hover:bg-[#e7ff00]/20 transition-colors"></div>

              <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed mb-4 relative z-10">
                A sablonoldalak problémája nem az, hogy csúnyák — hanem hogy lassúak, és senki nem
                tudja megmondani, miért.{" "}
                <strong className="text-white border-b border-[#e7ff00]">
                  Next.js alapon építünk
                </strong>
                , ahol a betöltési sebesség, a keresőoptimalizálás és a biztonság nem utólagos
                javítás, hanem a szerkezet része.
              </p>
              <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed mb-8 relative z-10">
                Élő webshopnál nem kapcsolunk le semmit: fokozatosan cseréljük az oldalakat, a bolt
                közben forgalmaz.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {WEB_FEATURES.map((feat) => (
                  <div
                    key={feat}
                    className="bg-[#050505] p-3 md:p-4 rounded border border-white/5 flex items-start gap-3 group-hover:border-white/10 transition-colors"
                  >
                    <span className="text-[#e7ff00] font-black">✔</span>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {feat}
                    </p>
                  </div>
                ))}
              </div>

              {/* Valós, ellenőrizhető adat a kód-szimuláció helyett — a
                  tényleges mérőszám a hero mérő-műszerével együtt kerül ide,
                  az egy külön feladat; addig nem teszünk ki kitalált számot. */}
              <p className="mt-8 text-gray-500 text-xs md:text-sm font-mono border-t border-white/10 pt-6 relative z-10">
                Ezt az oldalt is mi építettük — ugyanezekkel az elvekkel.
              </p>
            </div>
          </section>

          {/* [02] ADS */}
          <section id="ads" className="scroll-mt-32">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 border-b border-white/10 pb-4">
              <span className="text-3xl md:text-4xl font-black italic text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">
                02
              </span>
              <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white">
                Hirdetés, aminek a végén van egy szám
              </h2>
            </div>
            <div className="bg-[#121212] bg-blueprint border border-white/5 rounded-xl p-6 md:p-8 relative overflow-hidden group hover:border-[#00E5FF]/50 hover:shadow-[0_0_40px_rgba(0,229,255,0.1)] transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 blur-[50px] group-hover:bg-[#00E5FF]/20 transition-colors"></div>

              <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed mb-4 relative z-10">
                A legtöbb kampányjelentés arról szól, hány ember látta a hirdetést. Ez nem eredmény.
                Mi végig követjük az utat a{" "}
                <strong className="text-white border-b border-[#00E5FF]">
                  kattintástól a megkeresésig
                </strong>
                , és hetente megmutatjuk, mi hozott ügyfelet és mi nem.
              </p>
              <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed mb-8 relative z-10">
                Ha egy csatorna nem működik, azt megmondjuk — nem költjük tovább.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 mb-8">
                {[
                  "Google és Meta kampányok, B2B fókusszal",
                  "Konverziómérés és attribúció — a megkeresésig követve",
                  "Heti jelentés, érthető nyelven",
                  "Landing page a kampányhoz, nem a főoldalra terelés",
                ].map((feat) => (
                  <div
                    key={feat}
                    className="bg-[#050505] p-3 md:p-4 rounded border border-white/5 flex items-start gap-3 group-hover:border-white/10 transition-colors"
                  >
                    <span className="text-[#00E5FF] font-black">✔</span>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {feat}
                    </p>
                  </div>
                ))}
              </div>

              {/* Minta heti jelentés a kitalált ROAS-grafikon helyett */}
              <div className="bg-[#050505] border border-white/10 rounded-lg p-4 md:p-6 relative group-hover:border-[#00E5FF]/30 transition-colors">
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4">
                  Minta — heti jelentés
                </p>
                <div className="space-y-2 font-mono text-[11px] md:text-xs text-gray-300">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Kattintás → megkeresés</span>
                    <span className="text-[#00E5FF]">követve</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Legjobb csatorna a héten</span>
                    <span className="text-[#00E5FF]">megnevezve</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amit nem folytatunk</span>
                    <span className="text-[#00E5FF]">indokolva</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-500 text-[10px] md:text-xs font-mono">
                  Szemléltetés — a valós számokat az első hónap végén te látod először.
                </p>
              </div>
            </div>
          </section>

          {/* [03] AI */}
          <section id="ai" className="scroll-mt-32">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 border-b border-white/10 pb-4">
              <span className="text-3xl md:text-4xl font-black italic text-[#e7ff00] drop-shadow-[0_0_10px_rgba(231,255,0,0.3)]">
                03
              </span>
              <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white">
                AI, ami a helyén van
              </h2>
            </div>
            <div className="bg-[#121212] bg-blueprint border border-white/5 rounded-xl p-6 md:p-8 relative overflow-hidden group hover:border-[#e7ff00]/50 hover:shadow-[0_0_40px_rgba(231,255,0,0.1)] transition-all duration-500">
              <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed mb-4 relative z-10">
                Az AI nem varázslat és nem is helyettesíti az ügyfélszolgálatot. Arra jó, hogy a
                látogató éjjel is választ kapjon az egyszerű kérdésekre, és eljusson oda, ahol
                valóban tudsz vele foglalkozni.
              </p>
              <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed mb-8 relative z-10">
                Ezen az oldalon is fut egy — kipróbálhatod. Az adattovábbítás részleteit az{" "}
                <Link href="/ai-tajekoztato" className="text-white border-b border-[#e7ff00]">
                  AI-használati tájékoztató
                </Link>{" "}
                írja le.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 mb-8">
                {[
                  "OpenAI-alapú chat a weboldalon, saját tartalomra hangolva",
                  "Átirányítás emberhez, ha a kérdés komoly",
                  "Jogi megfelelés: AI-tájékoztató, adattovábbítás dokumentálva",
                  "Belső automatizációk: dokumentumfeldolgozás, összefoglalás",
                ].map((feat) => (
                  <div
                    key={feat}
                    className="bg-[#050505] p-3 md:p-4 rounded border border-white/5 flex items-start gap-3 group-hover:border-white/10 transition-colors"
                  >
                    <span className="text-[#e7ff00] font-black">✔</span>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {feat}
                    </p>
                  </div>
                ))}
              </div>

              {/* Terminál Chat — azt mutatja, amit a chat valóban tud */}
              <div className="bg-[#050505] border border-white/10 rounded-lg p-3 md:p-4 font-mono text-[10px] md:text-xs shadow-inner overflow-x-auto">
                <div className="flex items-start gap-2 mb-4 whitespace-nowrap">
                  <span className="text-gray-600">&gt; Látogató:</span>
                  <span className="text-gray-300">Építesz webshopot meglévő WooCommerce fölé?</span>
                </div>
                <div className="flex items-start gap-2 border-l-2 border-[#e7ff00] pl-2 md:pl-3">
                  <span className="text-[#e7ff00] font-bold">GBR_AI:</span>
                  <span className="text-white min-w-0">
                    Igen, ez a leggyakoribb felállás — a motor marad, a felület újul. A részletekhez
                    a legjobb, ha leírod a projektet itt: /init{" "}
                    <span className="animate-blink text-[#e7ff00]">█</span>
                  </span>
                </div>
              </div>
              <p className="mt-3 text-gray-500 text-[10px] md:text-xs font-mono relative z-10">
                A chat tájékoztat, nem ajánl. Árat és határidőt ember mond.
              </p>
            </div>
          </section>

          {/* [04] VIDEO */}
          <section id="video" className="scroll-mt-32">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 border-b border-white/10 pb-4">
              <span className="text-3xl md:text-4xl font-black italic text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">
                04
              </span>
              <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white">
                A weboldal önmagában nem elég
              </h2>
            </div>
            <div className="bg-[#121212] bg-blueprint border border-white/5 rounded-xl p-6 md:p-8 relative overflow-hidden group hover:border-[#00E5FF]/50 hover:shadow-[0_0_40px_rgba(0,229,255,0.1)] transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 blur-[50px] group-hover:bg-[#00E5FF]/20 transition-colors"></div>

              <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed mb-8 relative z-10">
                Egy jó oldalra tartalom is kell. Reklámfilm, termékvideó, közösségi formátumok —{" "}
                <strong className="text-white border-b border-[#00E5FF]">
                  a mi irányításunk alatt
                </strong>
                , ugyanabban az arculatban, mint a weboldal. Így nem lesz külön a „szép oldal” és a
                „valahonnan összeszedett videó”.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {VIDEO_FEATURES.map((feat) => (
                  <div
                    key={feat}
                    className="bg-[#050505] p-3 md:p-4 rounded border border-white/5 flex items-start gap-3 group-hover:border-white/10 transition-colors"
                  >
                    <span className="text-[#00E5FF] font-black">✔</span>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {feat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* [05] ÜZEMELTETÉS ÉS FOLYAMATOS FEJLESZTÉS
              (az Autopilot Rendszerek és az IT Projektmenedzsment összevonva) */}
          <section id="ops" className="scroll-mt-32">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 border-b border-white/10 pb-4">
              <span className="text-3xl md:text-4xl font-black italic text-[#e7ff00] drop-shadow-[0_0_10px_rgba(231,255,0,0.3)]">
                05
              </span>
              <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white">
                Az átadás nem a vége
              </h2>
            </div>
            <div className="bg-[#121212] bg-blueprint border border-white/5 rounded-xl p-6 md:p-8 relative overflow-hidden group hover:border-[#e7ff00]/50 hover:shadow-[0_0_40px_rgba(231,255,0,0.1)] transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e7ff00]/10 blur-[50px] group-hover:bg-[#e7ff00]/20 transition-colors"></div>

              <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed mb-4 relative z-10">
                A legtöbb ügynökség itt hagyja abba. Pedig egy weboldal az élesítés után kezd el
                pénzt termelni — és akkor kezd el elromlani is. Ha kéred,{" "}
                <strong className="text-white border-b border-[#e7ff00]">visszük tovább</strong>:
                figyeljük, javítjuk, fejlesztjük.
              </p>
              <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed mb-8 relative z-10">
                Egy felelős emberrel dolgozol, aki ismeri a projekted. Nem ügyfélszolgálati
                sorszámot kapsz.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {OPS_FEATURES.map((feat) => (
                  <div
                    key={feat}
                    className="bg-[#050505] p-3 md:p-4 rounded border border-white/5 flex items-start gap-3 group-hover:border-white/10 transition-colors"
                  >
                    <span className="text-[#e7ff00] font-black">✔</span>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {feat}
                    </p>
                  </div>
                ))}
              </div>

              {/* Ütemezési napló — ez ténylegesen fut (app/api/autopilot),
                  csak a nem létező "social poszt" sor kerül ki belőle. */}
              <div className="mt-8 bg-[#050505] border border-white/10 rounded-lg p-4 font-mono text-[9px] md:text-[10px] text-gray-500 overflow-x-auto relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e7ff00]"></div>
                <div className="pl-3 whitespace-nowrap">
                  <span className="text-[#e7ff00]">06:00</span> → Tartalomgenerálás elindítva
                </div>
                <div className="pl-3 whitespace-nowrap">
                  <span className="text-[#e7ff00]">06:04</span> → Cikk közzétéve a blogon
                </div>
                <div className="pl-3 whitespace-nowrap">
                  <span className="text-[#e7ff00]">06:05</span> → Sitemap frissítve, keresők
                  értesítve
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* =========================================
          CTA SZEKCIÓ
      ========================================= */}
      <section className="relative z-10 w-full px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#e7ff00] p-8 md:p-12 lg:p-20 text-center shadow-[0_0_40px_rgba(231,255,0,0.15)] transform transition-transform duration-500 hover:scale-[1.02]">
          <p className="text-black text-[10px] md:text-xs lg:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 md:mb-8">
            Beszéljünk róla
          </p>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black uppercase italic leading-none tracking-tighter mb-8 md:mb-10">
            Mondd el, mit szeretnél elérni
          </h2>

          <p className="text-black/70 text-sm md:text-base font-semibold max-w-xl mx-auto mb-10 md:mb-12">
            Nem minden projektet vállalunk el — ezért kérdezünk előbb. Két munkanapon belül
            válaszolunk. Ha nem illünk össze, azt is megmondjuk.
          </p>

          <Link
            href="/init"
            className="inline-flex items-center gap-2 md:gap-3 bg-black text-white font-black uppercase text-xs md:text-sm lg:text-base tracking-widest px-6 md:px-10 py-4 md:py-5 transition-all duration-300 hover:bg-white hover:text-black shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] group"
          >
            Pitcheld el a projekted{" "}
            <span className="text-[#e7ff00] group-hover:text-black transition-colors duration-300">
              &rarr;
            </span>
          </Link>
          <p className="mt-6 text-black/60 text-xs font-mono uppercase tracking-widest">
            Vagy írj közvetlenül:{" "}
            <a href="mailto:gabor@thegbr.eu" className="underline hover:text-black">
              gabor@thegbr.eu
            </a>
          </p>
        </div>
      </section>

      {/* =========================================
          GYAKORI KÉRDÉSEK (FAQ)
      ========================================= */}
      <div className="border-t border-white/5 bg-[#050505] py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 md:gap-4 justify-center mb-8 md:mb-12">
            <span className="w-8 md:w-12 h-px bg-white/20"></span>
            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-widest text-center text-gray-500">
              Gyakori <span className="text-white">kérdések</span>
            </h2>
            <span className="w-8 md:w-12 h-px bg-white/20"></span>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={item.question}
                className={`border border-white/10 bg-[#0a0a0a] rounded p-5 md:p-6 transition-colors ${
                  index % 2 === 0 ? "hover:border-[#e7ff00]/30" : "hover:border-[#00E5FF]/30"
                }`}
              >
                <h3 className="font-bold text-white mb-2 uppercase tracking-wide text-sm md:text-base">
                  {item.question}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
