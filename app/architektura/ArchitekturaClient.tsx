"use client";

import Link from "next/link";
import { useState } from "react";
import { faqPageSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";

// A tervező kimenete tartomány, nem pontszám — nem ígérünk eredményt
// (lead-szám, ROAS), csak azt mutatjuk meg, mekkora terjedelmet tudunk
// leszállítani egy adott keretből. A sávhatárok szakmai becslések a
// tipikus kapacitásról, nem mért ügyfél-átlagok.
type Deliverables = {
  channels: string;
  creatives: string;
  video: string;
  landing: string;
  reporting: string;
  optimization: string;
};

function getDeliverables(budget: number): Deliverables {
  if (budget < 800000) {
    return {
      channels: "1–2 platform",
      creatives: "3–5 hirdetésváltozat",
      video: "1–2 rövid formátum",
      landing: "1 megosztott oldal",
      reporting: "Kétheti, írásban",
      optimization: "Havi",
    };
  }
  if (budget < 2000000) {
    return {
      channels: "2–3 platform",
      creatives: "6–10 hirdetésváltozat",
      video: "2–4 rövid formátum",
      landing: "1 dedikált oldal",
      reporting: "Heti, írásban",
      optimization: "Kétheti",
    };
  }
  if (budget < 3500000) {
    return {
      channels: "3–4 platform",
      creatives: "10–16 hirdetésváltozat",
      video: "4–6 rövid formátum",
      landing: "1–2 dedikált oldal",
      reporting: "Heti, írásban",
      optimization: "Heti",
    };
  }
  return {
    channels: "4+ platform",
    creatives: "16–24 hirdetésváltozat",
    video: "6–10 rövid formátum",
    landing: "2–3 dedikált oldal",
    reporting: "Heti, írásban + konzultáció",
    optimization: "Heti + ad hoc",
  };
}

const DELIVERABLE_LABELS: { key: keyof Deliverables; label: string }[] = [
  { key: "channels", label: "Aktív csatorna" },
  { key: "creatives", label: "Kreatív / hónap" },
  { key: "video", label: "Videós anyag / hónap" },
  { key: "landing", label: "Landing page" },
  { key: "reporting", label: "Jelentés" },
  { key: "optimization", label: "Optimalizálási kör" },
];

function getRecommendedPackage(budget: number) {
  if (budget < 1000000) {
    return { name: "Weboldal és arculat", anchor: "csomag-web-arculat" };
  }
  if (budget < 3000000) {
    return { name: "Webshop és skálázás", anchor: "csomag-webshop-skalazas" };
  }
  return { name: "Fejlesztés és üzemeltetés", anchor: "csomag-fejlesztes-uzemeltetes" };
}

const FAQ_ITEMS = [
  {
    question: "Hogyan alakul ki a végleges ár?",
    answer:
      "A felmérés után. Az első beszélgetésen megbeszéljük, mit szeretnél elérni; utána átnézzük a meglévő rendszereidet, és fix árat meg határidőt adunk — nem sávot. Ha a felmérés során kiderül, hogy másra van szükséged, mint amit kértél, azt megmondjuk.",
  },
  {
    question: "Van kötelező hűségidő?",
    answer:
      "Nincs. A fejlesztés projekt alapon fut, az üzemeltetés és a marketing havidíjas — utóbbi bármikor felmondható a szerződésben rögzített határidővel. Egy dolgot viszont érdemes tudni: egy kampány három hónapnál rövidebb idő alatt nem ad értékelhető adatot. Ha egy hónap után döntenél, még nem lesz mit értékelni.",
  },
  {
    question: "Mi van, ha teljesen egyedi rendszerre van szükségem?",
    answer:
      "Ez a leggyakoribb eset. A Next.js és a Supabase pont azért jó választás, mert bármilyen külső rendszerhez tudunk kapcsolódni — ügyviteli szoftverhez, számlázóhoz, raktárkezelőhöz. Ilyenkor a felmérés hosszabb, mert előbb meg kell értenünk, hogyan működik a cég.",
  },
  {
    question: "Mi történik a régi oldalammal?",
    answer:
      "Nem kapcsoljuk le, amíg az új nem működik bizonyítottan. Az URL-eket átirányítjuk, hogy a Google-találatok ne vesszenek el — platformváltásnál ez a legdrágább hiba, amit el lehet követni.",
  },
  {
    question: "Kell hozzá értenem a technikához?",
    answer: "Nem. Ami kell: tudd megmondani, mit szeretnél elérni. A többi a mi dolgunk.",
  },
];

const SLA_ITEMS = [
  {
    title: "Infrastruktúra",
    text: "A Vercel platformján üzemeltetünk, ami globális CDN-t és automatikus skálázást ad. A rendelkezésre állásra a szolgáltató saját garanciája érvényes — ezt nem mi ígérjük, hanem ők.",
  },
  {
    title: "Hibakezelés",
    text: "Monitoring fut az általunk üzemeltetett rendszereken. Kritikus hiba esetén munkanapokon néhány órán belül reagálunk — a konkrét reakcióidőt az üzemeltetési szerződés rögzíti, nem egy weboldali felirat.",
  },
  {
    title: "Adatvédelem",
    text: "Adatkezelési tájékoztató, cookie-kezelés, adatfeldolgozói szerződés — mindegyik a projekt része, nem utólagos toldalék. A megfelelés folyamatos munka, ezért karbantartjuk.",
  },
  {
    title: "Átláthatóság",
    text: "Heti vagy kétheti írásos jelentés arról, mi történt és mi következik. Ha valami csúszik, azt előre megmondjuk.",
  },
];

export default function ArchitekturaClient() {
  const [budget, setBudget] = useState(1500000);

  const deliverables = getDeliverables(budget);
  const recommended = getRecommendedPackage(budget);

  // Csatorna-felosztás — szakmai kiindulási javaslat, nem "AI becslés".
  const metaBudget = Math.floor(budget * 0.35); // 35%
  const googleBudget = Math.floor(budget * 0.3); // 30%
  const videoBudget = Math.floor(budget * 0.2); // 20%
  const retargetingBudget = Math.floor(budget * 0.15); // 15%

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#e7ff00] selection:text-black relative font-sans">
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
      {/* =========================================
          STÍLUSOK ÉS ANIMÁCIÓK
      ========================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        body { scroll-behavior: smooth; }
        .bg-blueprint {
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        input[type=range] { -webkit-appearance: none; background: transparent; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 24px; width: 24px; border-radius: 50%; background: #e7ff00; cursor: pointer; margin-top: -10px; box-shadow: 0 0 15px rgba(231,255,0,0.5); border: 2px solid #000; }
        input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 4px; cursor: pointer; background: rgba(255,255,255,0.1); border-radius: 2px; }
      `,
        }}
      />

      {/* =========================================
          HÁTTÉR
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-blueprint">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[60vw] h-[60vw] bg-[#e7ff00]/5 blur-[200px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-[#00E5FF]/5 blur-[150px] rounded-full"></div>
      </div>

      {/* =========================================
          HERO & TERVEZŐ
      ========================================= */}
      <section className="relative z-10 w-full pt-40 pb-20 px-6 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-tight mb-6 uppercase text-white drop-shadow-2xl">
          Csomagok <br />
          <span className="text-[#e7ff00] drop-shadow-[0_0_30px_rgba(231,255,0,0.4)]">
            és árazás.
          </span>
        </h1>
        <p className="max-w-2xl text-gray-400 font-medium text-lg leading-relaxed mb-16 border-l-4 border-[#e7ff00] pl-4 text-left md:text-center md:border-none md:pl-0 mx-auto">
          Nincs fix árlista, mert nincs két egyforma projekt. Van viszont három tipikus felállás, és
          egy tervező, amiből látod, mit kapsz egy adott keretből.
        </p>

        {/* TERVEZŐ */}
        <div className="w-full max-w-5xl bg-gradient-to-b from-[#121212] to-[#0a0a0a] border-2 border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(231,255,0,0.05)] relative overflow-hidden text-left">
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4 relative z-10">
            <span className="w-3 h-3 bg-[#e7ff00] rounded-sm animate-pulse"></span>
            <h3 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
              TERVEZŐ // Mit kapsz egy adott keretből?
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            {/* Csúszka rész */}
            <div>
              <label className="block text-2xl font-black italic uppercase text-white mb-2">
                Havi marketing keret
              </label>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-8">
                Húzd el, és lásd, mi fér bele
              </p>

              <div className="mb-6">
                <span className="text-5xl font-black text-[#e7ff00] drop-shadow-[0_0_15px_rgba(231,255,0,0.3)]">
                  {new Intl.NumberFormat("hu-HU").format(budget)} Ft
                </span>
              </div>

              <input
                type="range"
                min="300000"
                max="5000000"
                step="100000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full"
                aria-label="Havi marketing keret"
              />
              <div className="flex justify-between mt-2 font-mono text-[10px] text-gray-600 font-bold">
                <span>300.000 Ft</span>
                <span>5.000.000+ Ft</span>
              </div>

              {/* Csatorna-felosztás */}
              <div className="mt-10 p-6 bg-[#050505] border border-white/5 rounded-lg">
                <h4 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1 border-b border-white/5 pb-2">
                  Javasolt csatorna-felosztás
                </h4>
                <p className="text-[10px] text-gray-600 mb-4 mt-2 leading-relaxed">
                  Kiindulási javaslat. A tényleges felosztás az iparágtól és a célközönségtől függ —
                  az első hónapban közösen kalibráljuk.
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#00E5FF]">Meta Ads (35%)</span>{" "}
                      <span className="text-white">
                        {new Intl.NumberFormat("hu-HU").format(metaBudget)} Ft
                      </span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded">
                      <div className="h-full bg-[#00E5FF] w-[35%] rounded"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-yellow-400">Google Ads (30%)</span>{" "}
                      <span className="text-white">
                        {new Intl.NumberFormat("hu-HU").format(googleBudget)} Ft
                      </span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded">
                      <div className="h-full bg-yellow-400 w-[30%] rounded"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#9d00ff] drop-shadow-[0_0_5px_rgba(157,0,255,0.5)]">
                        Videó hirdetés & Reels (20%)
                      </span>{" "}
                      <span className="text-white">
                        {new Intl.NumberFormat("hu-HU").format(videoBudget)} Ft
                      </span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded">
                      <div className="h-full bg-[#9d00ff] w-[20%] rounded shadow-[0_0_10px_rgba(157,0,255,0.5)]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#e7ff00]">Retargeting (15%)</span>{" "}
                      <span className="text-white">
                        {new Intl.NumberFormat("hu-HU").format(retargetingBudget)} Ft
                      </span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded">
                      <div className="h-full bg-[#e7ff00] w-[15%] rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kimenet: teljesítés, nem eredmény */}
            <div className="bg-[#050505] rounded-xl border border-white/5 p-8 flex flex-col justify-center shadow-inner">
              <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-3">
                Ebből ennyit tudunk hozni
              </h4>
              <div className="space-y-4">
                {DELIVERABLE_LABELS.map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {label}
                    </span>
                    <span className="text-sm md:text-base font-black text-white text-right">
                      {deliverables[key]}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-8 font-mono text-[9px] text-gray-600 uppercase leading-relaxed">
                A számok a tipikus terjedelmet mutatják, nem eredményt. Hogy egy kampány mennyit
                hoz, az az iparágtól, a terméktől és a piaci helyzettől függ — ezt az első hónap
                végén együtt látjuk meg, nem előre.
              </p>

              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
                  Ehhez a kerethez illik
                </p>
                <Link
                  href={`#${recommended.anchor}`}
                  className="inline-flex items-center gap-2 text-[#e7ff00] font-black italic uppercase tracking-wide text-lg hover:text-white transition-colors"
                >
                  {recommended.name} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          PRICING GRID
      ========================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Csomag 1 */}
          <div
            id="csomag-web-arculat"
            className="scroll-mt-32 bg-[#121212] border border-white/10 rounded-2xl p-8 hover:border-[#e7ff00]/30 transition-all flex flex-col group"
          >
            <div className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Belépő
            </div>
            <h3 className="text-3xl font-black italic uppercase text-white mb-4">
              Weboldal és arculat
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Ha most nincs oldalad, vagy a mostani lassú és nem hoz megkeresést. Ez az alap, amire
              később építeni lehet.
            </p>

            <div className="text-2xl font-black text-white mb-8 border-b border-white/10 pb-8 group-hover:text-[#e7ff00] transition-colors">
              Egyedi{" "}
              <span className="text-sm text-gray-500 font-normal uppercase tracking-widest">
                / Ajánlat
              </span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {[
                "Vállalati weboldal Next.js alapon",
                "Egyedi dizájn és design rendszer",
                "Kapcsolati űrlap, ami tényleg működik",
                "Technikai SEO: sitemap, strukturált adat, canonical",
                "Szövegezés, ha kell",
              ].map((feat) => (
                <li
                  key={feat}
                  className="flex items-center gap-3 text-gray-300 font-medium text-sm"
                >
                  <span className="text-gray-500 font-bold">✔</span> {feat}
                </li>
              ))}
            </ul>
            <Link
              href="/init?csomag=web-arculat"
              className="w-full py-4 text-center rounded border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-[#e7ff00] hover:text-black hover:border-[#e7ff00] transition-all mt-auto"
            >
              Beszéljünk róla
            </Link>
          </div>

          {/* Csomag 2 */}
          <div
            id="csomag-webshop-skalazas"
            className="scroll-mt-32 bg-[#050505] border-2 border-[#e7ff00] rounded-2xl p-8 transform lg:-translate-y-4 shadow-[0_0_50px_rgba(231,255,0,0.15)] flex flex-col relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#e7ff00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="absolute top-0 right-8 bg-[#e7ff00] text-[#0a0a0a] px-4 py-1.5 font-black italic text-xs uppercase tracking-widest rounded-b-md shadow-[0_0_15px_rgba(231,255,0,0.5)]">
              A leggyakoribb
            </div>

            <div className="font-mono text-[10px] font-bold text-[#e7ff00] uppercase tracking-widest mb-2 relative z-10">
              A leggyakoribb
            </div>
            <h3 className="text-3xl font-black italic uppercase text-white mb-4 relative z-10">
              Webshop és skálázás
            </h3>
            <p className="text-gray-400 text-sm mb-6 relative z-10">
              Ha eladni is akarsz, nem csak jelen lenni. Webshop, hirdetés és mérés egy rendszerben.
            </p>

            <div className="text-3xl font-black text-[#e7ff00] mb-8 border-b border-white/10 pb-8 relative z-10 drop-shadow-[0_0_10px_rgba(231,255,0,0.3)]">
              Teljes{" "}
              <span className="text-sm text-gray-500 font-normal uppercase tracking-widest text-white">
                / Infrastruktúra
              </span>
            </div>

            <ul className="space-y-4 mb-10 flex-1 relative z-10">
              <li className="flex items-center gap-3 text-white font-bold text-sm">
                <span className="text-[#e7ff00]">✔</span> Minden az előző csomagból
              </li>
              {[
                "Webshop nulláról vagy meglévő rendszer fölé",
                "Telefonra telepíthető változat (PWA)",
                "Fizetés, szállítás, számlázás integrálva",
                "Admin felület, amit a kollégák is használni tudnak",
                "Google és Meta kampányok, videós hirdetésekkel",
                "Heti jelentés, érthető nyelven",
              ].map((feat) => (
                <li
                  key={feat}
                  className="flex items-center gap-3 text-gray-300 font-medium text-sm"
                >
                  <span className="text-[#e7ff00]">✔</span> {feat}
                </li>
              ))}
            </ul>
            <Link
              href="/init?csomag=webshop-skalazas"
              className="w-full py-5 text-center rounded bg-[#e7ff00] text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(231,255,0,0.2)] mt-auto relative z-10 hover:-translate-y-1"
            >
              Beszéljünk róla
            </Link>
          </div>

          {/* Csomag 3 */}
          <div
            id="csomag-fejlesztes-uzemeltetes"
            className="scroll-mt-32 bg-[#121212] border border-white/10 rounded-2xl p-8 hover:border-[#00E5FF]/40 transition-all flex flex-col group"
          >
            <div className="font-mono text-[10px] font-bold text-[#00E5FF] uppercase tracking-widest mb-2">
              Teljes lefedettség
            </div>
            <h3 className="text-3xl font-black italic uppercase text-white mb-4">
              Fejlesztés és üzemeltetés
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Ha nem akarsz szolgáltatókat koordinálni. Egy felelős, minden a helyén.
            </p>

            <div className="text-2xl font-black text-white mb-8 border-b border-white/10 pb-8 group-hover:text-[#00E5FF] transition-colors">
              Havi{" "}
              <span className="text-sm text-gray-500 font-normal uppercase tracking-widest">
                / Keret
              </span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-3 text-white font-bold text-sm">
                <span className="text-[#00E5FF] font-black">✔</span> Minden az előző csomagból
              </li>
              {[
                "Folyamatos fejlesztés havi óraszámban",
                "Monitoring és hibariasztás",
                "AI chat a weboldalon",
                "Automatizált tartalommotor: a blog magától frissül",
                "Videó és tartalomgyártás",
                "Jogi megfelelés karbantartása",
                "Egy felelős kapcsolattartó",
              ].map((feat) => (
                <li
                  key={feat}
                  className="flex items-center gap-3 text-gray-300 font-medium text-sm"
                >
                  <span className="text-[#00E5FF] font-black">✔</span> {feat}
                </li>
              ))}
            </ul>
            <Link
              href="/init?csomag=fejlesztes-uzemeltetes"
              className="w-full py-4 text-center rounded border border-[#00E5FF]/40 text-white font-bold uppercase tracking-widest text-xs hover:bg-[#00E5FF] hover:text-black transition-all mt-auto"
            >
              Beszéljünk róla
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          AHOGY DOLGOZUNK (korábban: SLA & Garanciák)
      ========================================= */}
      <section className="relative z-10 w-full bg-[#050505] border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="block font-mono text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
              Ahogy dolgozunk
            </span>
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">
              Mire számíthatsz
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SLA_ITEMS.map((item) => (
              <div
                key={item.title}
                className="p-6 border border-white/10 rounded-xl bg-[#0a0a0a] hover:border-[#e7ff00]/30 transition-colors"
              >
                <h3 className="font-black text-white uppercase italic text-lg mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 max-w-3xl mx-auto text-center text-gray-600 text-xs font-mono leading-relaxed">
            Ha lesz valós uptime-monitoring és ügyeleti rend, ez a szekció visszakaphatja a számokat
            — akkor viszont a szerződésben is szerepelniük kell, kötbérrel együtt. Addig ez a forma
            erősebb, mert igaz.
          </p>
        </div>
      </section>

      {/* =========================================
          GYAKORI KÉRDÉSEK (FAQ)
      ========================================= */}
      <section className="relative z-10 w-full bg-[#0a0a0a] border-t border-white/5 py-24">
        <div className="max-w-4xl mx-auto px-6">
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
                className={`border border-white/10 bg-[#121212] rounded p-6 transition-colors ${
                  index % 2 === 0 ? "hover:border-[#e7ff00]/30" : "hover:border-[#00E5FF]/30"
                }`}
              >
                <h3 className="font-bold text-white mb-2 uppercase tracking-wide">
                  {item.question}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          ZÁRÓ CTA
      ========================================= */}
      <section className="relative z-10 w-full px-6 py-24 bg-[#050505] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-6 text-white">
            Nem tudod, melyik illik hozzád?
          </h2>
          <p className="text-gray-400 font-medium text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Írd le, mit szeretnél elérni, és megmondjuk, mire van valóban szükséged. Két munkanapon
            belül válaszolunk. Ha nem illünk össze, azt is megmondjuk.
          </p>
          <Link
            href="/init"
            className="inline-flex items-center gap-3 px-12 py-5 rounded bg-[#e7ff00] text-[#0a0a0a] font-black italic uppercase tracking-[0.3em] text-sm hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_0_40px_rgba(231,255,0,0.3)]"
          >
            Pitcheld el a projekted <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
