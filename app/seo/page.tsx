import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search & Answer Engine Optimization | THE GBR",
  description: "Technológiai alapú keresőoptimalizálás és AI-adatstrukturálás (AEO). Készítsük fel az entitásodat a következő generációs keresőmotorokra.",
};

export default function SeoAeoPage() {
  return (
    <main className="min-h-screen bg-[#020202] relative overflow-hidden text-white font-sans selection:bg-[#e7ff00] selection:text-black">
      
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
              sys.protocol: indexation_v2
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] font-black uppercase tracking-tighter mb-8 text-white transition-all duration-700">
              Kereshetőség. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-200 to-white">Újrakódolva.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              A B2B felfedezés már nem a kulcsszavakon múlik. Az AI modellek és az algoritmikus keresők korában a technológiai alapozás és az adatszerkezet dönti el, ki uralja a piacot. Az algoritmusok nem olvasnak marketing szöveget. Adatstruktúrákat elemeznek.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="#architektura" className="border border-white/20 hover:border-[#e7ff00] bg-white/[0.03] backdrop-blur-md px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#e7ff00]/10 hover:text-[#e7ff00] hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(231,255,0,0.2)]">
                Rendszer megismerése
              </Link>
            </div>
          </div>
          
          <div className="lg:w-2/5 w-full">
            <div className="relative aspect-square rounded-full border border-white/5 bg-[#050505]/50 backdrop-blur-md flex items-center justify-center overflow-hidden transition-transform duration-1000 hover:scale-105 hover:border-[#e7ff00]/20">
               {/* Forgó technikai gyűrűk animációja */}
               <div className="absolute inset-5 border border-[#e7ff00]/20 rounded-full border-dashed animate-[spin_40s_linear_infinite]"></div>
               <div className="absolute inset-10 border border-white/10 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
               <div className="text-center transform transition-transform duration-500 hover:scale-110">
                 <span className="block text-5xl font-black text-[#e7ff00] mb-2 drop-shadow-[0_0_15px_rgba(231,255,0,0.2)]">99/100</span>
                 <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Core Web Vitals</span>
               </div>
            </div>
          </div>
        </div>

        {/* PARADIGMAVÁLTÁS SZEKCIÓ */}
        <div id="architektura" className="mb-24 relative rounded-[2rem] bg-[#070707]/90 backdrop-blur-xl border border-white/[0.05] p-10 md:p-16 lg:p-20 overflow-hidden transition-all duration-700 hover:border-white/10 hover:shadow-[0_0_40px_-20px_rgba(255,255,255,0.05)]">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#e7ff00] to-transparent opacity-50"></div>
          <div className="max-w-3xl relative z-10">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6">A Paradigma Eltolódott</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              A monolitikus rendszerek elérték a határaikat. A modern keresőmotorok tizedmásodpercek alatt értékelik a weboldalad front-end kódját. A lassú szerverválasz, a felvillanó layout (CLS) és az optimalizálatlan médiafájlok ma már nem UX problémák, hanem kőkemény rangsorolási faktorok.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Ezzel párhuzamosan a felhasználói szokások átalakultak. A jövő döntéshozói egyre ritkábban keresnek kulcsszavakra – inkább komplex kérdéseket tesznek fel az LLM (Large Language Model) alapú rendszereknek. Ha a céged adatai nincsenek szemantikusan strukturálva, a mesterséges intelligencia számára láthatatlan maradsz.
            </p>
          </div>
        </div>

        {/* BENTO GRID: A KÉT PILLÉR */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          
          {/* TECHNIKAI SEO PANEL */}
          <div className="group relative rounded-[2rem] bg-[#070707]/90 backdrop-blur-xl border border-white/[0.05] shadow-2xl p-10 md:p-14 overflow-hidden transition-all duration-500 hover:border-[#e7ff00]/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(231,255,0,0.1)]">
            <div className="w-14 h-14 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-10 text-white transition-all duration-500 group-hover:text-[#e7ff00] group-hover:border-[#e7ff00]/50 group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Core Architecture (SEO)</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-10">
              Golyóálló technológiai alapozás. A Next.js szerveroldali renderelése (SSR) és statikus generálása (SSG) biztosítja, hogy a keresőrobotok azonnal, várakozás nélkül olvassák be az indexelendő tartalmat.
            </p>

            <ul className="space-y-0 relative z-10">
              {[
                { title: 'Server-Side Rendering', desc: 'Azonnali forráskód-elérhetőség a feltérképező robotok számára.' },
                { title: 'Dinamikus Sitemaps', desc: 'Szerver szinten generált feltérképezési útvonalak.' },
                { title: 'Mobile-First Vitals', desc: 'Tökéletes LCP és FID pontszámok a Google algoritmusának.' }
              ].map((item, i) => (
                <li key={i} className="border-t border-white/[0.05] py-4 transition-colors duration-300 hover:bg-[#0a0a0a] px-3 -mx-3 rounded-lg">
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Answer Engine (AEO)</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-10">
              Optimalizálás a gépi intelligenciára. Adatstrukturálási protokolljaink felkészítik az entitásodat arra, hogy a ChatGPT és a Gemini megértse, validálja és referenciaként használja a válaszaiban.
            </p>

            <ul className="space-y-0 relative z-10">
              {[
                { title: 'Schema.org & JSON-LD', desc: 'Mélyreható mikroadat-struktúrák a kontextus tökéletes átadására.' },
                { title: 'Entitás Térképezés', desc: 'A márka összekötése megbízható globális tudásbázisokkal.' },
                { title: 'Konverzációs Tartalom', desc: 'Szemantikus optimalizálás a természetes nyelvű (NLP) lekérdezésekre.' }
              ].map((item, i) => (
                <li key={i} className="border-t border-white/[0.05] py-4 transition-colors duration-300 hover:bg-[#0a0a0a] px-3 -mx-3 rounded-lg">
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

        {/* A PROTOKOLL (Lépéses folyamat) */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tight">Integrációs Protokoll</h2>
            <p className="text-gray-500 mt-4 text-sm uppercase tracking-widest font-mono">01_Audit - 02_Build - 03_Scale</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative group/steps">
            {/* Összekötő vonal (csak asztalin látszik) */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0 transition-all duration-700 group-hover/steps:via-[#e7ff00]/30"></div>
            
            {[
              { num: '01', title: 'Adatvezérelt Audit', desc: 'Sebességtesztek, forráskód-analízis és indexelési státusz felmérése.' },
              { num: '02', title: 'Architektúra Építés', desc: 'A rendszerek leváltása Next.js alapú, API-vezérelt ökoszisztémára.' },
              { num: '03', title: 'Entitás Skálázás', desc: 'Gépi tanulási modellekre optimalizált folyamatos tartalomfejlesztés.' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 bg-[#070707] border border-white/5 p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-500 hover:border-[#e7ff00]/40 hover:-translate-y-3 hover:shadow-[0_15px_30px_-15px_rgba(231,255,0,0.15)] group/card">
                <div className="w-14 h-14 bg-[#020202] border border-white/10 rounded-full flex items-center justify-center text-[#e7ff00] font-black text-xl mb-6 shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover/card:scale-125 group-hover/card:border-[#e7ff00]/50">
                  {step.num}
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-3">{step.title}</h4>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ÚJ BRUTÁLIS CTA BLOKK (A feltöltött kép alapján) */}
        <div className="relative w-full max-w-5xl mx-auto rounded-3xl bg-[#e7ff00] p-12 md:p-20 text-center shadow-[0_0_40px_rgba(231,255,0,0.15)] transform transition-transform duration-500 hover:scale-[1.02] mt-24">
          
          <p className="text-black text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-8">
            Rendszer követelmény: Ambíció
          </p>
          
          <div className="flex flex-col items-center justify-center mb-12">
            <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-black text-black uppercase italic leading-none tracking-tighter">
              Indítsd el a
            </h2>
            {/* A kőkemény döntött fekete doboz a képről */}
            <div className="bg-black px-6 py-2 md:py-4 mt-2 transform -rotate-2 shadow-2xl">
              <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-black text-[#e7ff00] uppercase italic leading-none tracking-tighter">
                Protokollt
              </h2>
            </div>
          </div>

          <Link
            href="/init"
            className="inline-flex items-center gap-3 bg-black text-white font-black uppercase text-sm md:text-base tracking-widest px-10 py-5 transition-all duration-300 hover:bg-white hover:text-black shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] group"
          >
            Kapcsolatfelvétel <span className="text-[#e7ff00] group-hover:text-black transition-colors duration-300">•</span>
          </Link>
          
        </div>

      </div>
    </main>
  );
}