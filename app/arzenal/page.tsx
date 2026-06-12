import Link from "next/link";

export default function Arzenal() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#e7ff00] selection:text-black relative font-sans">
      
      {/* =========================================
          STÍLUSOK ÉS ANIMÁCIÓK (SPIRÁZVA)
      ========================================= */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,800;1,900&display=swap');
        body { font-family: 'Montserrat', sans-serif; scroll-behavior: smooth; }
        
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .scanline-effect { animation: scanline 8s linear infinite; }
        
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s step-end infinite; }
        
        @keyframes pulse-slow { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }

        @keyframes pulse-radar { 0% { transform: scale(0.8); opacity: 0.8; } 100% { transform: scale(2); opacity: 0; } }
        .animate-radar { animation: pulse-radar 2s cubic-bezier(0.0, 0.0, 0.2, 1) infinite; }

        /* Blueprint Rács Háttér */
        .bg-blueprint {
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        /* Hover Glitch Effekt a címeken */
        .hover-glitch:hover {
          text-shadow: 2px 0 #e7ff00, -2px 0 #00E5FF;
          transition: all 0.1s ease;
        }
      `}} />

      {/* =========================================
          LEBEGŐ RENDSZER MONITOR (ÚJ)
      ========================================= */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#050505] border border-white/10 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <div className="relative flex h-3 w-3">
          <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-[#e7ff00] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e7ff00]"></span>
        </div>
        <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400">Sys: <span className="text-white">Online</span></span>
      </div>

      {/* =========================================
          HÁTTÉR
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#e7ff00]/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00E5FF]/5 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.10]"></div>
        <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#e7ff00]/10 to-transparent scanline-effect opacity-50"></div>
      </div>

      {/* =========================================
          FEJLÉC
      ========================================= */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          <Link href="/" className="text-3xl md:text-5xl font-black italic tracking-[-0.05em] flex items-center hover:opacity-80 transition-opacity">
            <span className="text-white">THE</span>
            <span className="text-[#e7ff00] drop-shadow-[0_0_15px_rgba(231,255,0,0.4)]">GBR</span>
          </Link>
          <div className="hidden md:flex items-center gap-4 border border-[#e7ff00]/30 bg-[#e7ff00]/10 px-4 py-2 rounded">
            <span className="w-2 h-2 rounded-full bg-[#e7ff00] animate-pulse"></span>
            <span className="font-mono text-[10px] text-[#e7ff00] uppercase tracking-widest">Sys.Node: Arsenal_Active</span>
          </div>
          <Link href="/#contact" className="px-6 py-3 rounded bg-[#e7ff00] text-[#0a0a0a] text-[10px] md:text-xs font-black italic uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_20px_rgba(231,255,0,0.2)]">
            Projekt Indítása
          </Link>
        </div>
      </header>

      {/* =========================================
          FŐ TARTALOM (OSZTOTT KÉPERNYŐ)
      ========================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32 lg:pt-48 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* BAL OLDAL: STICKY VEZÉRLŐPANEL */}
        <aside className="lg:w-1/3 relative">
          <div className="sticky top-32">
            <h1 className="text-5xl lg:text-6xl font-black italic uppercase tracking-tighter mb-8 text-white hover-glitch">
              A <span className="text-[#e7ff00]">Fegyver</span>tár.
            </h1>
            <p className="text-gray-400 font-medium text-sm leading-relaxed mb-10 border-l-2 border-[#e7ff00] pl-4 bg-gradient-to-r from-[#e7ff00]/5 to-transparent py-2">
              Válaszd ki a célt. Integrált digitális ügynökségként a webfejlesztéstől a hirdetéskezelésig minden rendszert in-house építünk a B2B szektor számára.
            </p>

            <nav className="flex flex-col gap-2 font-mono text-xs uppercase tracking-widest font-bold">
              {[
                { id: "web", name: "High-End Web & Shop", color: "#e7ff00" },
                { id: "ads", name: "Performance Marketing", color: "#00E5FF" },
                { id: "ai", name: "AI & Chatbot Integráció", color: "#e7ff00" },
                { id: "video", name: "Prémium Videógyártás", color: "#00E5FF" },
                { id: "auto", name: "Autopilot Rendszerek", color: "#e7ff00" },
                { id: "pm", name: "IT Projektmenedzsment", color: "#00E5FF" }
              ].map((item, index) => (
                <Link key={index} href={`#${item.id}`} className="p-4 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-l-4 hover:border-l-[#e7ff00] transition-all rounded flex items-center justify-between group">
                  <span className="group-hover:text-white transition-colors text-gray-500 flex items-center gap-3">
                    <span className="text-[#e7ff00]">[{String(index + 1).padStart(2, '0')}]</span>
                    {item.name}
                  </span>
                  <span className="text-gray-700 group-hover:text-[#e7ff00] transition-colors font-black">&rarr;</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* JOBB OLDAL: MODULOK (GÖRGETHETŐ) */}
        <div className="lg:w-2/3 flex flex-col gap-32">

          {/* [01] WEB */}
          <section id="web" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
              <span className="text-4xl font-black italic text-[#e7ff00] drop-shadow-[0_0_10px_rgba(231,255,0,0.3)]">01</span>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white hover-glitch cursor-default">High-End Webfejlesztés</h2>
            </div>
            {/* ÚJ: bg-blueprint a kártyákon */}
            <div className="bg-[#121212] bg-blueprint border border-white/5 rounded-xl p-8 relative overflow-hidden group hover:border-[#e7ff00]/50 hover:shadow-[0_0_40px_rgba(231,255,0,0.1)] transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e7ff00]/10 blur-[50px] group-hover:bg-[#e7ff00]/20 transition-colors"></div>
              
              <h3 className="text-xl font-bold text-white mb-4 relative z-10">Kőkemény technológiai fölény a versenytársakkal szemben.</h3>
              <p className="text-gray-300 font-medium leading-relaxed mb-8 relative z-10">
                A B2B webfejlesztés 2026-ban túlmutat a sablonokon. Egyedi, <strong className="text-white border-b border-[#e7ff00]">Next.js alapú architektúrákat</strong> építünk, amelyek villámgyorsak, biztonságosak és 100%-ban keresőoptimalizáltak (SEO).
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {['Egyedi UI/UX Dizájn', 'Technikai SEO alapok', 'Supabase Adatbázisok', 'B2B Webáruházak'].map((feat, i) => (
                  <div key={i} className="bg-[#050505] p-4 rounded border border-white/5 flex items-start gap-3 group-hover:border-white/10 transition-colors">
                    <span className="text-[#e7ff00] font-black">✔</span>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{feat}</p>
                  </div>
                ))}
              </div>

              {/* Kód szimuláció */}
              <div className="mt-8 bg-[#050505] border border-white/10 rounded-lg p-4 font-mono text-[10px] text-gray-500 overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e7ff00]"></div>
                <div className="text-gray-600 mb-2 pl-3">// INIT_NEXTJS_APP</div>
                <div className="text-[#e7ff00] pl-3">export default function <span className="text-white">EnterpriseMatrix</span>() {'{'}</div>
                <div className="pl-7">return {'<'}Performance optimized={`{true}`} seo={`{maximum}`} /{'>'}</div>
                <div className="text-[#e7ff00] pl-3">{'}'}</div>
              </div>
            </div>
          </section>

          {/* [02] ADS */}
          <section id="ads" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
              <span className="text-4xl font-black italic text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">02</span>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white hover-glitch cursor-default">Performance Marketing</h2>
            </div>
            <div className="bg-[#121212] bg-blueprint border border-white/5 rounded-xl p-8 relative overflow-hidden group hover:border-[#00E5FF]/50 hover:shadow-[0_0_40px_rgba(0,229,255,0.1)] transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 blur-[50px] group-hover:bg-[#00E5FF]/20 transition-colors"></div>
              
              <h3 className="text-xl font-bold text-white mb-4 relative z-10">Befektetünk, nem pedig hirdetési büdzsét égetünk.</h3>
              <p className="text-gray-300 font-medium leading-relaxed mb-8 relative z-10">
                A klasszikus ügynökségi modell halott. Mi <strong className="text-white border-b border-[#00E5FF]">B2B lead generálásra</strong> specializálódtunk. Full-funnel Meta és Google Ads kampányokat építünk fel. Célunk a mérhető ROI.
              </p>

              {/* Grafikon szimuláció hover effekttel */}
              <div className="mt-8 bg-[#050505] border border-white/10 rounded-lg p-6 relative group-hover:border-[#00E5FF]/30 transition-colors">
                 <div className="flex justify-between items-end h-24 border-b border-l border-white/10 px-2 pb-2 gap-2 relative">
                    {/* Zöld növekedési vonal (SVG) */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                       <polyline points="0,80 20,60 40,70 60,40 80,15 100,0" fill="none" stroke="#00E5FF" strokeWidth="2" className="opacity-50" />
                    </svg>
                    <div className="w-1/6 bg-white/5 h-[20%] rounded-t relative z-10 hover:bg-white/20 transition-colors"></div>
                    <div className="w-1/6 bg-white/10 h-[40%] rounded-t relative z-10 hover:bg-white/30 transition-colors"></div>
                    <div className="w-1/6 bg-white/20 h-[30%] rounded-t relative z-10 hover:bg-white/40 transition-colors"></div>
                    <div className="w-1/6 bg-[#00E5FF]/40 h-[60%] rounded-t relative z-10 hover:bg-[#00E5FF]/60 transition-colors"></div>
                    <div className="w-1/6 bg-[#00E5FF]/70 h-[85%] rounded-t relative z-10 hover:bg-[#00E5FF]/90 transition-colors"></div>
                    <div className="w-1/6 bg-[#00E5FF] h-[100%] rounded-t shadow-[0_0_15px_rgba(0,229,255,0.5)] relative z-10"></div>
                 </div>
                 <div className="flex justify-between mt-2 font-mono text-[9px] text-gray-500 uppercase font-bold">
                    <span>Q1</span> <span>Q2</span> <span>Q3</span> <span className="text-[#00E5FF]">Q4 (ROAS: +312%)</span>
                 </div>
              </div>
            </div>
          </section>

          {/* [03] AI */}
          <section id="ai" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
              <span className="text-4xl font-black italic text-[#e7ff00] drop-shadow-[0_0_10px_rgba(231,255,0,0.3)]">03</span>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white hover-glitch cursor-default">AI & Chatbot Integráció</h2>
            </div>
            <div className="bg-[#121212] bg-blueprint border border-white/5 rounded-xl p-8 relative overflow-hidden group hover:border-[#e7ff00]/50 hover:shadow-[0_0_40px_rgba(231,255,0,0.1)] transition-all duration-500">
              <h3 className="text-xl font-bold text-white mb-4 relative z-10">Az intelligens munkatársad, aki sosem alszik.</h3>
              <p className="text-gray-300 font-medium leading-relaxed mb-8 relative z-10">
                Implementáljuk a legfejlettebb <strong className="text-white border-b border-[#e7ff00]">OpenAI alapú chatbotokat</strong> a weboldaladba. Képesek árajánlatot adni, időpontot foglalni és 24/7 ügyfélszolgálatot biztosítani a látogatóknak.
              </p>
              
              {/* Terminál Chat - Fade in animáció a bot válaszára */}
              <div className="mt-8 bg-[#050505] border border-white/10 rounded-lg p-4 font-mono text-xs shadow-inner">
                <div className="flex items-start gap-2 mb-4">
                  <span className="text-gray-600">&gt; User:</span>
                  <span className="text-gray-300">Mennyibe kerül egy B2B webáruház?</span>
                </div>
                <div className="flex items-start gap-2 border-l-2 border-[#e7ff00] pl-3 group-hover:opacity-100 opacity-50 transition-opacity duration-1000">
                  <span className="text-[#e7ff00] font-bold">GBR_AI:</span>
                  <span className="text-white">A komplexitástól függ, de az átlagos ROI 3 hónap. Kérhetek egy e-mail címet? <span className="animate-blink text-[#e7ff00]">█</span></span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* =========================================
          MASSZÍV CTA SZEKCIÓ
      ========================================= */}
      <section className="relative z-10 w-full px-6 py-24">
        <div className="max-w-5xl mx-auto bg-[#e7ff00] rounded-xl p-12 text-center text-[#0a0a0a] shadow-[0_0_60px_rgba(231,255,0,0.4)] transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer group">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] mb-4 opacity-70">Rendszer Követelmény: Ambíció</div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 group-hover:tracking-tight transition-all">
            Indítsd el a <span className="bg-black text-[#e7ff00] px-4 py-1 ml-2 inline-block -rotate-2">Protokollt</span>
          </h2>
          <div className="inline-flex items-center justify-center gap-3 bg-black text-white px-10 py-5 rounded font-black uppercase tracking-widest hover:bg-gray-900 transition-colors">
            <span>Kapcsolatfelvétel</span>
            <span className="text-[#e7ff00] animate-pulse">●</span>
          </div>
        </div>
      </section>

      {/* =========================================
          SEO GYAKORI KÉRDÉSEK (FAQ)
      ========================================= */}
      <div className="border-t border-white/5 bg-[#050505] py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 justify-center mb-12">
            <span className="w-12 h-px bg-white/20"></span>
            <h2 className="text-2xl font-black italic uppercase tracking-widest text-center text-gray-500">Intelligencia <span className="text-white">Bázis</span></h2>
            <span className="w-12 h-px bg-white/20"></span>
          </div>
          
          <div className="space-y-4">
            <div className="border border-white/10 bg-[#0a0a0a] rounded p-6 hover:border-[#e7ff00]/30 transition-colors">
              <h4 className="font-bold text-white mb-2 uppercase tracking-wide">Miért Next.js-ben építitek a weboldalakat?</h4>
              <p className="text-gray-400 text-sm leading-relaxed">A Next.js a React legmodernebb keretrendszere. Lehetővé teszi az SSR (Server-Side Rendering) használatát, ami elengedhetetlen a kiemelkedő betöltési sebességhez és a Google technikai SEO követelményeinek maximalizálásához.</p>
            </div>
            <div className="border border-white/10 bg-[#0a0a0a] rounded p-6 hover:border-[#00E5FF]/30 transition-colors">
              <h4 className="font-bold text-white mb-2 uppercase tracking-wide">Csak nagyvállalatokkal dolgoztok?</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Kifejezetten B2B és E-commerce fókuszunk van. Bár architektúráink a nagyvállalati sztenderdeket követik, skálázni vágyó, agresszíven növekvő KKV-k számára is biztosítunk rendszereket a gyors piaci előnyszerzés érdekében.</p>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}