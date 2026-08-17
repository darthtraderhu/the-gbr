import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "A Szindikátus | THE GBR",
  description:
    "2002 óta az értékesítésben — a THE GBR története és a 400+ hitelesített szakértőből álló decentralizált hálózat, ami a full-stack ügynökség mögött áll.",
  alternates: {
    canonical: "/szindikatus",
  },
  openGraph: {
    title: "A Szindikátus | THE GBR",
    description: "2002 óta az értékesítésben — a THE GBR története és szakértői hálózata.",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Szindikátus | THE GBR",
    description: "2002 óta az értékesítésben — a THE GBR története és szakértői hálózata.",
  },
};

export default function Szindikatus() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#e7ff00] selection:text-black relative font-sans overflow-hidden">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Hálózat", url: `${SITE_URL}/szindikatus` },
        ])}
      />
      {/* =========================================
          STÍLUSOK ÉS ANIMÁCIÓK
      ========================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        body { scroll-behavior: smooth; }
        
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .scanline-effect { animation: scanline 8s linear infinite; }
        
        .bg-blueprint {
          background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Git Commit Vonal Effektek */
        .git-branch { position: relative; }
        .git-branch::before {
          content: ''; position: absolute; left: 23px; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, #e7ff00, #00E5FF, #9d00ff);
          opacity: 0.5; z-index: 0;
        }

        /* Hálózat Pulzálás */
        @keyframes network-pulse { 0% { box-shadow: 0 0 0 0 rgba(231,255,0, 0.4); } 70% { box-shadow: 0 0 0 20px rgba(231,255,0, 0); } 100% { box-shadow: 0 0 0 0 rgba(231,255,0, 0); } }
        .animate-network { animation: network-pulse 2s infinite; }
      `,
        }}
      />

      {/* =========================================
          HÁTTÉR
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-blueprint">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#e7ff00]/5 blur-[200px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#9d00ff]/5 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#e7ff00]/10 to-transparent scanline-effect opacity-50"></div>
      </div>

      {/* =========================================
          HERO: A SZINDIKÁTUS
      ========================================= */}
      <section className="relative z-10 w-full pt-40 pb-20 px-6 flex flex-col items-center text-center">
        <div className="w-full border-y border-white/5 bg-[#050505] py-3 flex items-center justify-center gap-4 mb-12 shadow-[inset_0_0_20px_rgba(231,255,0,0.02)]">
          <span className="text-gray-600 font-mono font-bold text-sm tracking-widest">{"//"}</span>
          <span className="font-mono font-bold text-xs md:text-sm tracking-[0.4em] text-[#e7ff00] uppercase drop-shadow-[0_0_10px_rgba(231,255,0,0.5)]">
            SYS.NODE: SYNDICATE_HQ
          </span>
          <span className="text-gray-600 font-mono font-bold text-sm tracking-widest">{"//"}</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-tight mb-6 uppercase text-white drop-shadow-2xl">
          Operatív <br />
          <span className="text-[#00E5FF] drop-shadow-[0_0_30px_rgba(0,229,255,0.4)]">Törzs.</span>
        </h1>
        <p className="max-w-3xl text-gray-400 font-medium text-lg md:text-xl leading-relaxed mb-16 border-l-4 border-[#00E5FF] pl-4 text-left md:text-center md:border-none md:pl-0 mx-auto">
          Nem egy tegnap alakult startup vagyunk, akik a YouTube-ról tanultak kódolni.{" "}
          <strong className="text-white">2002 óta vagyunk a piacon.</strong> Értékesítéssel kezdtük,
          így pontosan tudjuk, hogy egy weboldalnak nem szépnek kell lennie, hanem eladnia kell.
        </p>

        {/* Cég Adatsor / Trust Factor */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-mono text-[10px] md:text-xs text-gray-500 uppercase tracking-widest bg-[#121212] border border-white/10 px-8 py-4 rounded-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[#e7ff00] font-black text-lg">2002</span>
            <span>Alapítás</span>
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[#00E5FF] font-black text-lg">Zéró</span>
            <span>Kapacitáskorlát</span>
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[#9d00ff] font-black text-lg">B2B</span>
            <span>Exkluzív Fókusz</span>
          </div>
        </div>
      </section>

      {/* =========================================
          GIT COMMIT IDŐVONAL (A TÖRTÉNETÜNK)
      ========================================= */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-16 text-center">
          Rendszer <span className="text-gray-500">Frissítések</span>
        </h2>

        <div className="git-branch space-y-16">
          {/* v1.0 */}
          <div className="relative pl-16 group">
            <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-[#0a0a0a] border-4 border-[#e7ff00] z-10 group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(231,255,0,0.5)]"></div>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-3">
              <span className="bg-white/5 px-2 py-1 rounded text-[#e7ff00]">commit: 0x1A2B</span>
              <span>2002</span>
            </div>
            <h3 className="text-2xl font-black italic uppercase text-white mb-3">
              v1.0 // Az Alapkőletétel
            </h3>
            <div className="bg-[#121212] border border-white/5 rounded-lg p-6 hover:border-[#e7ff00]/30 transition-colors">
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                Inicializáltuk a rendszert. Offline és direkt értékesítéssel kezdtük a piacot. Itt
                tanultuk meg a legfontosabb leckét: a technológia csak egy eszköz, a végső cél
                mindig az eladás és a profit maximalizálása. Ez a DNS-ünk alapja.
              </p>
            </div>
          </div>

          {/* v2.5 */}
          <div className="relative pl-16 group">
            <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-[#0a0a0a] border-4 border-[#00E5FF] z-10 group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.5)]"></div>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-3">
              <span className="bg-white/5 px-2 py-1 rounded text-[#00E5FF]">commit: 3F4C</span>
              <span>2015</span>
            </div>
            <h3 className="text-2xl font-black italic uppercase text-white mb-3">
              v2.5 // A Digitális Átállás
            </h3>
            <div className="bg-[#121212] border border-white/5 rounded-lg p-6 hover:border-[#00E5FF]/30 transition-colors">
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                A piac megváltozott, és mi vele együtt. Beléptünk a digitális térbe. Az értékesítési
                tapasztalatunkat adatalapú performance marketing kampányokkal (Meta, Google) és
                konverzióra kihegyezett landing page-ekkel ötvöztük.
              </p>
            </div>
          </div>

          {/* v4.0 */}
          <div className="relative pl-16 group">
            <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-[#0a0a0a] border-4 border-[#9d00ff] z-10 group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(157,0,255,0.5)]"></div>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-3">
              <span className="bg-white/5 px-2 py-1 rounded text-[#9d00ff]">commit: 8D9E</span>
              <span>2022</span>
            </div>
            <h3 className="text-2xl font-black italic uppercase text-white mb-3">
              v4.0 // E-Commerce & Scale
            </h3>
            <div className="bg-[#121212] border border-white/5 rounded-lg p-6 hover:border-[#9d00ff]/50 transition-colors">
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                Szintet léptünk. A &quot;szép weboldalak&quot; kora lejárt. Komplett B2B webáruház
                motorokat, egyedi fizetési integrációkat és CRM rendszereket kezdtünk építeni
                ügyfeleinknek, hogy automatizáljuk az online növekedésüket.
              </p>
            </div>
          </div>

          {/* v5.0 (JELEN) */}
          <div className="relative pl-16 group">
            <div className="absolute left-3 top-0.5 w-6 h-6 rounded-full bg-[#e7ff00]/20 flex items-center justify-center animate-pulse">
              <div className="w-4 h-4 rounded-full bg-[#0a0a0a] border-4 border-[#e7ff00] z-10"></div>
            </div>
            <div className="font-mono text-[10px] text-[#e7ff00] uppercase tracking-widest mb-1 flex items-center gap-3 font-bold">
              <span className="bg-[#e7ff00]/10 border border-[#e7ff00]/30 px-2 py-1 rounded text-[#e7ff00]">
                HEAD -&gt; master
              </span>
              <span>2026 // Jelen</span>
            </div>
            <h3 className="text-3xl font-black italic uppercase text-white mb-3">
              v5.0 // Full-Stack Szindikátus
            </h3>
            <div className="bg-gradient-to-br from-[#121212] to-[#0a0a0a] border border-[#e7ff00]/50 rounded-lg p-8 shadow-[0_0_30px_rgba(231,255,0,0.1)]">
              <p className="text-gray-300 text-base leading-relaxed font-medium">
                Létrehoztuk a végső ökoszisztémát. Lépést váltottunk a szűk belső csapatról egy
                országos, decentralizált szakértői hálózatra. Next.js fejlesztés, AI integráció,
                videógyártás – bármire is van szükséged, a The GBR hálózata azonnal képes lefedni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          ÚJ SZEKCIÓ: A KITERJESZTETT HÁLÓZAT (AZ ELIT OSZTAG HELYETT)
      ========================================= */}
      <section className="relative z-10 w-full bg-[#050505] border-y border-white/5 py-32 overflow-hidden">
        {/* Háttér radar effekt */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div
            className="w-[80vw] h-[80vw] rounded-full border border-[#00E5FF] animate-ping"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute w-[60vw] h-[60vw] rounded-full border border-[#e7ff00] animate-ping"
            style={{ animationDuration: "3s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[10px] font-bold tracking-[0.2em] text-[#00E5FF] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse"></span>
              Decentralizált Infrastruktúra
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 text-white">
              Az <span className="text-[#00E5FF]">Elit</span> Osztag
            </h2>
            <p className="text-gray-400 font-medium text-lg md:text-xl leading-relaxed">
              Felejtsd el a kapacitáshiányra panaszkodó kisméretű ügynökségeket. A THE GBR egy
              kiterjesztett hálózat.{" "}
              <strong className="text-white">
                Országosan több mint 400 hitelesített szakértő, partner és fejlesztő áll mögöttünk.
              </strong>{" "}
              Nincs az a technológiai, szoftveres vagy marketing kihívás, amit a mi ökoszisztémánk
              ne tudna azonnal megoldani.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kapacitás Blokk 1 */}
            <div className="bg-[#121212] border border-white/10 hover:border-[#e7ff00]/50 rounded-xl p-8 transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#e7ff00]/10 flex items-center justify-center animate-network">
                  <span className="text-[#e7ff00] font-black text-xl">400+</span>
                </div>
                <h3 className="text-2xl font-black italic uppercase text-white group-hover:text-[#e7ff00] transition-colors">
                  Szakértői Csomópont
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Legyen szó egyedi ERP rendszer fejlesztésről, komplex Next.js API integrációkról,
                vagy nagy volumenű videós forgatásokról, azonnal tudjuk allokálni az ország
                legkomolyabb, hitelesített szakembereit az adott feladatra.
              </p>
            </div>

            {/* Kapacitás Blokk 2 */}
            <div className="bg-[#121212] border border-white/10 hover:border-[#00E5FF]/50 rounded-xl p-8 transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded bg-[#00E5FF]/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#00E5FF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-black italic uppercase text-white group-hover:text-[#00E5FF] transition-colors">
                  Végtelen Skálázhatóság
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Mi nem a projektet próbáljuk belezsúfolni az irodánk kereteibe. Mi a csapatot
                skálázzuk a te projekted igényeihez. Hatalmas büdzsék és agresszív határidők esetén
                egyszerűen több erőforrást vonunk be a hálózatból.
              </p>
            </div>

            {/* Kapacitás Blokk 3 */}
            <div className="bg-[#121212] border border-white/10 hover:border-[#9d00ff]/50 rounded-xl p-8 transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded bg-[#9d00ff]/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#9d00ff]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-black italic uppercase text-white group-hover:text-[#9d00ff] transition-colors">
                  360° Lefedettség
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Nincs olyan, hogy &quot;mi ilyet nem vállalunk&quot;. Ha a te B2B ökoszisztémádnak
                egy speciális AI képfelismerő algoritmusa van szüksége, a THE GBR szindikátusában
                megtaláljuk és rendszerbe állítjuk az embert, aki lefejleszti.
              </p>
            </div>

            {/* Kapacitás Blokk 4 */}
            <div className="bg-gradient-to-br from-[#121212] to-[#1a1a00] border border-[#e7ff00]/30 hover:border-[#e7ff00] rounded-xl p-8 transition-all shadow-[0_0_20px_rgba(231,255,0,0.05)] group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded border border-[#e7ff00] bg-[#e7ff00]/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#e7ff00]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-black italic uppercase text-white group-hover:text-[#e7ff00] transition-colors">
                  Központi Irányítás
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed font-medium">
                Bár a hálózatunk decentralizált, a projektmenedzsment és a minőség-ellenőrzés
                szigorúan központosított. A THE GBR felelősséget vállal a szállításért. Számodra mi
                vagyunk az egyetlen kapcsolattartó pont: minden kód és kreatív rajtunk megy
                keresztül.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          ALAPELVEK (MANIFESTO)
      ========================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-12 text-center">
          A Szindikátus <span className="text-[#e7ff00]">Kódexe</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#121212] border border-white/5 rounded-lg p-8">
            <h4 className="text-xl font-black uppercase text-[#e7ff00] mb-3 border-b border-white/10 pb-3">
              01. Zéró Bullshit
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Nem dobálózunk üres marketinges kifejezésekkel. Számokban, KPI-okban és kőkemény
              adatokban kommunikálunk. Ha valami nem működik, megmondjuk. Ha skálázható, rátoljuk a
              gázt.
            </p>
          </div>
          <div className="bg-[#121212] border border-white/5 rounded-lg p-8">
            <h4 className="text-xl font-black uppercase text-[#00E5FF] mb-3 border-b border-white/10 pb-3">
              02. Nyers Teljesítmény
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              A kódunk patika. A dizájnunk konvertál. A videóink eladnak. Nem elégszünk meg az
              iparági átlaggal, mi diktáljuk a tempót és a technológiai sztenderdeket a partnereink
              piacán.
            </p>
          </div>
          <div className="bg-[#121212] border border-white/5 rounded-lg p-8">
            <h4 className="text-xl font-black uppercase text-[#9d00ff] mb-3 border-b border-white/10 pb-3">
              03. B2B Fókusz
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Csak olyan vállalatokkal dolgozunk, akik értik a befektetés és a költség közötti
              különbséget. Nem vállalunk el mindent: csak ott építünk rendszert, ahol garantálni
              tudjuk a szintlépést.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
