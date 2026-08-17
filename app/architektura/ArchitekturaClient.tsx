"use client";

import Link from "next/link";
import { useState } from "react";

export default function ArchitekturaClient() {
  // ROI Kalkulátor Állapot (State)
  const [budget, setBudget] = useState(500000);

  // Számítások
  const estimatedLeads = Math.floor((budget / 100000) * 3.5);
  const roas = budget < 1000000 ? "250-300%" : "350-500%+";
  const systemLoad = (budget / 5000000) * 100;

  // Erőforrás Allokáció (100% elosztása)
  const metaBudget = Math.floor(budget * 0.35); // 35%
  const googleBudget = Math.floor(budget * 0.3); // 30%
  const videoBudget = Math.floor(budget * 0.2); // 20% - Videó hirdetés
  const retentionBudget = Math.floor(budget * 0.15); // 15%

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#e7ff00] selection:text-black relative font-sans">
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
        
        @keyframes radar-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-radar-spin { animation: radar-spin 4s linear infinite; }
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
          HERO & KALKULÁTOR
      ========================================= */}
      <section className="relative z-10 w-full pt-40 pb-20 px-6 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-tight mb-6 uppercase text-white drop-shadow-2xl">
          Befektetés. <br />
          <span className="text-[#e7ff00] drop-shadow-[0_0_30px_rgba(231,255,0,0.4)]">
            Nem Költség.
          </span>
        </h1>
        <p className="max-w-2xl text-gray-400 font-medium text-lg leading-relaxed mb-16 border-l-4 border-[#e7ff00] pl-4 text-left md:text-center md:border-none md:pl-0 mx-auto">
          Egy patika rendszer nem viszi a pénzt, hanem termeli. Tervezd meg a digitális
          architektúrád, és számold ki a várható megtérülést a THE GBR intelligens ROI motorjával.
        </p>

        {/* INTERAKTÍV ROI KALKULÁTOR */}
        <div className="w-full max-w-5xl bg-gradient-to-b from-[#121212] to-[#0a0a0a] border-2 border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(231,255,0,0.05)] relative overflow-hidden text-left">
          <div className="absolute top-[-50px] right-[-50px] w-48 h-48 border border-white/5 rounded-full flex items-center justify-center opacity-30 animate-radar-spin">
            <div className="w-full h-full border-t-2 border-[#e7ff00] rounded-full"></div>
            <div className="absolute w-1/2 h-px bg-[#e7ff00] top-1/2 left-1/2 origin-left"></div>
          </div>

          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4 relative z-10">
            <span className="w-3 h-3 bg-[#e7ff00] rounded-sm animate-pulse"></span>
            <h3 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
              SYS.CALC // Lead, Video & ROAS Szimulátor
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            {/* Csúszka rész */}
            <div>
              <label className="block text-2xl font-black italic uppercase text-white mb-2">
                Havi Marketing Keret
              </label>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-8">
                Állítsd be a tervezett hirdetési büdzsét
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
              />
              <div className="flex justify-between mt-2 font-mono text-[10px] text-gray-600 font-bold">
                <span>300.000 Ft</span>
                <span>5.000.000+ Ft</span>
              </div>

              {/* Erőforrás Allokáció */}
              <div className="mt-10 p-6 bg-[#050505] border border-white/5 rounded-lg">
                <h4 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                  Erőforrás Allokáció (AI Becslés)
                </h4>
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
                  {/* UV LILA VIDEÓS SÁV */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#9d00ff] drop-shadow-[0_0_5px_rgba(157,0,255,0.5)]">
                        Videó Hirdetés & Reels (20%)
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
                        {new Intl.NumberFormat("hu-HU").format(retentionBudget)} Ft
                      </span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded">
                      <div className="h-full bg-[#e7ff00] w-[15%] rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Eredmény rész */}
            <div className="bg-[#050505] rounded-xl border border-white/5 p-8 flex flex-col justify-center shadow-inner">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                    Várható B2B Leadek
                  </div>
                  <div className="text-4xl font-black text-white drop-shadow-md">
                    ~{estimatedLeads}{" "}
                    <span className="text-lg text-gray-500 font-normal">/ hó</span>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                    Kalkulált ROAS
                  </div>
                  <div className="text-4xl font-black text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">
                    {roas}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <div className="flex justify-between font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">
                  <span>Rendszer Terheltség</span>
                  <span className="text-[#e7ff00] font-bold">{Math.round(systemLoad)}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#e7ff00] shadow-[0_0_15px_rgba(231,255,0,0.6)] transition-all duration-300"
                    style={{ width: `${systemLoad}%` }}
                  ></div>
                </div>
                <p className="mt-4 font-mono text-[9px] text-gray-600 uppercase">
                  * A fenti adatok tájékoztató jellegűek és a B2B iparági átlagokon (B2B SaaS, Ipari
                  gyártás) alapulnak.
                </p>
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
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 hover:border-[#e7ff00]/30 transition-all flex flex-col group">
            <div className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Fázis 01
            </div>
            <h3 className="text-3xl font-black italic uppercase text-white mb-4">Web Presence</h3>
            <p className="text-gray-400 text-sm mb-6 h-12">
              Belépő a profi B2B ligába. Brutális sebesség és reszponzív dizájn.
            </p>

            <div className="text-2xl font-black text-white mb-8 border-b border-white/10 pb-8 group-hover:text-[#e7ff00] transition-colors">
              Egyedi{" "}
              <span className="text-sm text-gray-500 font-normal uppercase tracking-widest">
                / Ajánlat
              </span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {[
                "Vállalati Next.js Weboldal",
                "Alapvető UI/UX Tervezés",
                "Kapcsolati Űrlapok",
                "Technikai SEO optimalizálás",
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                  <span className="text-gray-500 font-bold">✔</span> {feat}
                </li>
              ))}
            </ul>
            <Link
              href="/init"
              className="w-full py-4 text-center rounded border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-[#e7ff00] hover:text-black hover:border-[#e7ff00] transition-all mt-auto"
            >
              Indítás
            </Link>
          </div>

          {/* Csomag 2 */}
          <div className="bg-[#050505] border-2 border-[#e7ff00] rounded-2xl p-8 transform lg:-translate-y-4 shadow-[0_0_50px_rgba(231,255,0,0.15)] flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#e7ff00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="absolute top-0 right-8 bg-[#e7ff00] text-[#0a0a0a] px-4 py-1.5 font-black italic text-xs uppercase tracking-widest rounded-b-md shadow-[0_0_15px_rgba(231,255,0,0.5)]">
              Legnépszerűbb
            </div>

            <div className="font-mono text-[10px] font-bold text-[#e7ff00] uppercase tracking-widest mb-2 relative z-10">
              Fázis 02
            </div>
            <h3 className="text-3xl font-black italic uppercase text-white mb-4 relative z-10">
              Scale & E-Comm
            </h3>
            <p className="text-gray-400 text-sm mb-6 h-12 relative z-10">
              A skálázás motorja. Konverzió-optimalizált rendszerek, videós és adatalapú hirdetések.
            </p>

            <div className="text-3xl font-black text-[#e7ff00] mb-8 border-b border-white/10 pb-8 relative z-10 drop-shadow-[0_0_10px_rgba(231,255,0,0.3)]">
              Teljes{" "}
              <span className="text-sm text-gray-500 font-normal uppercase tracking-widest text-white">
                / Infrastruktúra
              </span>
            </div>

            <ul className="space-y-4 mb-10 flex-1 relative z-10">
              <li className="flex items-center gap-3 text-white font-bold text-sm">
                <span className="text-[#e7ff00]">✔</span> Mindent az előző csomagból
              </li>
              {[
                "B2B Webshop & Dashboard",
                "Meta & Google Ads Menedzsment",
                "Rövid Videós Hirdetések (Reels)",
                "Folyamatos ROI Analitika",
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                  <span className="text-[#e7ff00]">✔</span> {feat}
                </li>
              ))}
            </ul>
            <Link
              href="/init"
              className="w-full py-5 text-center rounded bg-[#e7ff00] text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(231,255,0,0.2)] mt-auto relative z-10 hover:-translate-y-1"
            >
              Kiválasztom
            </Link>
          </div>

          {/* Csomag 3 */}
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 hover:border-[#00E5FF]/40 transition-all flex flex-col group">
            <div className="font-mono text-[10px] font-bold text-[#00E5FF] uppercase tracking-widest mb-2">
              Fázis 03
            </div>
            <h3 className="text-3xl font-black italic uppercase text-white mb-4">
              Full-Stack Autopilot
            </h3>
            <p className="text-gray-400 text-sm mb-6 h-12">
              Az emberi beavatkozás nélküli növekedés. Minden rendszer egy kézben.
            </p>

            <div className="text-2xl font-black text-white mb-8 border-b border-white/10 pb-8 group-hover:text-[#00E5FF] transition-colors">
              Végtelen{" "}
              <span className="text-sm text-gray-500 font-normal uppercase tracking-widest">
                / Skálázás
              </span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-3 text-white font-bold text-sm">
                <span className="text-[#00E5FF] font-black">✔</span> Teljes Tech & Marketing
                jelenlét
              </li>
              {[
                "AI Chatbot Ügyfélszolgálat",
                "Önjáró Hírmotor és SEO Blog",
                "High-End Videógyártás & Hirdetés",
                "Dedikált IT Projektmenedzser",
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                  <span className="text-[#00E5FF] font-bold">✔</span> {feat}
                </li>
              ))}
            </ul>
            <Link
              href="/init"
              className="w-full py-4 text-center rounded border border-[#00E5FF]/40 text-white font-bold uppercase tracking-widest text-xs hover:bg-[#00E5FF] hover:text-black transition-all mt-auto"
            >
              Konzultáció
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          SLA ÉS GARANCIA SZEKCIÓ (ENTERPRISE TRUST)
      ========================================= */}
      <section className="relative z-10 w-full bg-[#050505] border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">
              Vállalati <span className="text-[#e7ff00]">SLA</span> & Garanciák
            </h2>
            <p className="text-gray-400 font-medium">
              B2B partnereink számára zéró toleranciát alkalmazunk a leállásokra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-white/10 rounded-xl bg-[#0a0a0a] hover:border-[#e7ff00]/30 transition-colors">
              <span className="text-3xl font-black text-white block mb-2">99.9%</span>
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                Garantált Üzemidő
              </span>
            </div>
            <div className="p-6 border border-white/10 rounded-xl bg-[#0a0a0a] hover:border-[#e7ff00]/30 transition-colors">
              <span className="text-3xl font-black text-[#e7ff00] block mb-2">&lt;2 Óra</span>
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                Kritikus hibajavítás
              </span>
            </div>
            <div className="p-6 border border-white/10 rounded-xl bg-[#0a0a0a] hover:border-[#9d00ff]/50 transition-colors">
              <span className="text-3xl font-black text-[#9d00ff] block mb-2 drop-shadow-[0_0_5px_rgba(157,0,255,0.5)]">
                48 Óra
              </span>
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                Videó Anyagok Vágása
              </span>
            </div>
            <div className="p-6 border border-white/10 rounded-xl bg-[#0a0a0a] hover:border-[#00E5FF]/50 transition-colors">
              <span className="text-3xl font-black text-[#00E5FF] block mb-2">100%</span>
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                GDPR Megfelelés
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          ÚJ: GYAKORI KÉRDÉSEK (FAQ)
      ========================================= */}
      <section className="relative z-10 w-full bg-[#0a0a0a] border-t border-white/5 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 justify-center mb-12">
            <span className="w-12 h-px bg-white/20"></span>
            <h2 className="text-2xl font-black italic uppercase tracking-widest text-center text-gray-500">
              Rendszer <span className="text-white">Paraméterek</span> (GYIK)
            </h2>
            <span className="w-12 h-px bg-white/20"></span>
          </div>

          <div className="space-y-4">
            <div className="border border-white/10 bg-[#121212] rounded p-6 hover:border-[#e7ff00]/30 transition-colors group">
              <h4 className="font-bold text-white mb-2 uppercase tracking-wide group-hover:text-[#e7ff00] transition-colors">
                Hogyan számoljátok a megtérülést (ROAS)?
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                A fenti kalkulátor a The GBR meglévő ügyfeleinek (B2B SaaS, Ipar, Kereskedelem)
                átlagos számai alapján dolgozik. A konkrét, szerződésben is rögzíthető célszámokat
                egy alapos audit és piacelemzés után határozzuk meg a projektindítás első 14
                napjában.
              </p>
            </div>
            <div className="border border-white/10 bg-[#121212] rounded p-6 hover:border-[#00E5FF]/30 transition-colors group">
              <h4 className="font-bold text-white mb-2 uppercase tracking-wide group-hover:text-[#00E5FF] transition-colors">
                Van nálatok kötelező hűségidő?
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Nincs kötelező &quot;aprbetűs&quot; hűségidő. A rendszerünk transzparens: a
                fejlesztési sprintek (web, chatbot, infrastruktúra) projekt alapon, a marketing
                menedzsment (ads, videó, SEO) pedig havidíjas alapon fut. Azt javasoljuk, hogy a
                teljes megtérülés méréséhez hagyj minimum 3 hónapot a kampányoknak.
              </p>
            </div>
            <div className="border border-white/10 bg-[#121212] rounded p-6 hover:border-[#9d00ff]/50 transition-colors group">
              <h4 className="font-bold text-white mb-2 uppercase tracking-wide group-hover:text-[#9d00ff] transition-colors">
                Mi történik, ha teljesen egyedi szoftverre / platformra van szükségem?
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Az ajánlataink modulárisak. A Next.js és Supabase architektúra pontosan azért a mi
                fegyverünk, mert bármilyen külső API-t be tudunk húzni, és egyedi belső rendszereket
                (ERP, CRM) tudunk ráfejleszteni. Egyedi igények esetén konzultációt követően
                testreszabott projekttervet adunk.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
