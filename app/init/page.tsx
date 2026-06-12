"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function InitProtocol() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    target: "",
    budget: "",
  });

  // Gépelési effekt szimulálása a betöltésnél
  const [bootText, setBootText] = useState("");
  const fullBootText = "> RENDSZER INICIALIZÁLÁSA... \n> KAPCSOLAT TITKOSÍTVA... \n> VÁROM AZ AZONOSÍTÁST...";

  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < fullBootText.length) {
        currentText += fullBootText[currentIndex];
        setBootText(currentText);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, []);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <main className="min-h-screen bg-[#050505] text-[#e7ff00] selection:bg-[#e7ff00] selection:text-black relative font-mono overflow-hidden flex flex-col items-center justify-center">
      
      {/* =========================================
          STÍLUSOK ÉS ANIMÁCIÓK
      ========================================= */}
      <style dangerouslySetInnerHTML={{__html: `
        body { background-color: #050505; }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .scanline-effect { animation: scanline 8s linear infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s step-end infinite; }
        
        /* Egyedi input stílusok */
        input:focus { outline: none; border-bottom-color: #e7ff00; box-shadow: 0 4px 15px -3px rgba(231,255,0,0.3); }
        .glitch-text { text-shadow: 2px 0 #00E5FF, -2px 0 #ff00e5; }
      `}} />

      {/* =========================================
          HÁTTÉR EFFEKTEK
      ========================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#e7ff00]/20 to-transparent scanline-effect opacity-30"></div>
      </div>

      {/* =========================================
          KILÉPÉS GOMB (ESC)
      ========================================= */}
      <Link href="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
        <div className="border border-gray-600 group-hover:border-white px-2 py-1 rounded text-xs">ESC</div>
        <span className="text-xs tracking-widest uppercase">Megszakítás</span>
      </Link>

      {/* =========================================
          RADAR / STÁTUSZ (JOBB FENT)
      ========================================= */}
      <div className="absolute top-8 right-8 z-50 flex items-center gap-3">
        <span className="text-[10px] tracking-widest uppercase text-gray-500">Kapcsolat: <span className="text-[#00E5FF]">Biztonságos</span></span>
        <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></div>
      </div>

      {/* =========================================
          VARÁZSLÓ (WIZARD) KONTÉNER
      ========================================= */}
      <div className="relative z-10 w-full max-w-2xl px-6">
        
        {/* Terminál Fejléc */}
        <div className="border border-white/10 bg-[#0a0a0a] rounded-t-lg p-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <span className="ml-4 text-[10px] text-gray-500 uppercase tracking-widest">root@thegbr:~ /init_protocol</span>
        </div>

        {/* Terminál Test */}
        <div className="border-x border-b border-white/10 bg-[#050505] rounded-b-lg p-8 md:p-12 min-h-[400px] shadow-[0_0_50px_rgba(231,255,0,0.05)] relative">
          
          {/* Lépésjelző */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <div 
              className="h-full bg-[#e7ff00] transition-all duration-500 shadow-[0_0_10px_rgba(231,255,0,0.5)]"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>

          {/* LÉPÉS 1: AZONOSÍTÁS */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="whitespace-pre-line text-sm text-gray-400 mb-8 h-16">{bootText}<span className="animate-blink text-[#e7ff00]">█</span></div>
              
              <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-8 border-l-2 border-[#e7ff00] pl-4">01 // Azonosítási Protokoll</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Engedélyezett Név</label>
                  <input 
                    type="text" 
                    placeholder="Vezeték és Keresztnév"
                    className="w-full bg-transparent border-b border-white/20 text-white p-2 text-sm transition-all focus:border-[#e7ff00]"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Vállalat / Entitás</label>
                  <input 
                    type="text" 
                    placeholder="Cégnév"
                    className="w-full bg-transparent border-b border-white/20 text-white p-2 text-sm transition-all focus:border-[#e7ff00]"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Kommunikációs Csatorna (Email)</label>
                  <input 
                    type="email" 
                    placeholder="titkosított@email.com"
                    className="w-full bg-transparent border-b border-white/20 text-white p-2 text-sm transition-all focus:border-[#e7ff00]"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="mt-12 flex justify-end">
                <button 
                  onClick={nextStep}
                  disabled={!formData.name || !formData.company || !formData.email}
                  className="px-8 py-3 bg-[#e7ff00] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Hitelesítés &rarr;
                </button>
              </div>
            </div>
          )}

          {/* LÉPÉS 2: CÉLPONT KIJELÖLÉSE */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-8 border-l-2 border-[#00E5FF] pl-4">02 // Célpont Kijelölése</h2>
              <p className="text-xs text-gray-500 tracking-widest uppercase mb-6">Melyik rendszert aktiváljuk a(z) <span className="text-white">{formData.company}</span> számára?</p>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: "web", label: "High-End Web & Shop", color: "hover:border-[#e7ff00] hover:text-[#e7ff00]" },
                  { id: "marketing", label: "Performance Marketing & Videó", color: "hover:border-[#00E5FF] hover:text-[#00E5FF]" },
                  { id: "full", label: "Full-Stack Autopilot (Minden)", color: "hover:border-[#9d00ff] hover:text-[#9d00ff] border-[#9d00ff]/30 text-[#9d00ff]" }
                ].map((option) => (
                  <button 
                    key={option.id}
                    onClick={() => { setFormData({...formData, target: option.id}); nextStep(); }}
                    className={`w-full text-left p-4 border ${formData.target === option.id ? 'border-white bg-white/10' : 'border-white/10'} bg-[#0a0a0a] transition-all text-sm uppercase tracking-widest text-gray-300 ${option.color} group flex justify-between items-center`}
                  >
                    <span>{option.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">Aktiválás &rarr;</span>
                  </button>
                ))}
              </div>

              <div className="mt-12 flex justify-start">
                <button onClick={prevStep} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest">&larr; Vissza</button>
              </div>
            </div>
          )}

          {/* LÉPÉS 3: ERŐFORRÁS ALLOKÁCIÓ */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-8 border-l-2 border-[#9d00ff] pl-4">03 // Erőforrás Allokáció</h2>
              <p className="text-xs text-gray-500 tracking-widest uppercase mb-6">Mekkora havi keretet különítesz el a fegyverkezésre?</p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "300k-500k", label: "300 - 500e Ft" },
                  { val: "500k-1m", label: "500e - 1M Ft" },
                  { val: "1m-3m", label: "1M - 3M Ft" },
                  { val: "3m+", label: "3M+ Ft" }
                ].map((budget) => (
                  <button 
                    key={budget.val}
                    onClick={() => { setFormData({...formData, budget: budget.val}); nextStep(); }}
                    className={`p-4 border ${formData.budget === budget.val ? 'border-[#e7ff00] text-[#e7ff00]' : 'border-white/10 text-gray-400'} bg-[#0a0a0a] hover:border-[#e7ff00] hover:text-[#e7ff00] transition-all text-sm font-bold tracking-widest`}
                  >
                    {budget.label}
                  </button>
                ))}
              </div>

              <div className="mt-12 flex justify-start">
                <button onClick={prevStep} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest">&larr; Vissza</button>
              </div>
            </div>
          )}

          {/* LÉPÉS 4: SIKER / VÉGREHAJTÁS */}
          {step === 4 && (
            <div className="text-center animate-fade-in py-12">
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-[#00E5FF] border-t-transparent animate-spin mb-8"></div>
              
              <h2 className="text-3xl font-black uppercase tracking-widest text-[#00E5FF] glitch-text mb-4">Protokoll Elindítva</h2>
              <p className="text-gray-400 text-sm tracking-widest mb-8 uppercase leading-relaxed">
                A célpont rögzítve. Adatok titkosítva. <br/>
                A THE GBR operatív törzse 24 órán belül felveszi veled a kapcsolatot.
              </p>
              
              <div className="font-mono text-[10px] text-gray-600">
                &gt; CONNECTION_CLOSED <br/>
                &gt; WAITING_FOR_AGENT
              </div>

              <Link href="/" className="inline-block mt-12 px-8 py-3 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">
                Vissza a Bázisra
              </Link>
            </div>
          )}

        </div>
      </div>

    </main>
  );
}