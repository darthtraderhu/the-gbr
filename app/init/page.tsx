"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function InitProtocol() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    target: "",
    budget: "",
  });

  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [bootText, setBootText] = useState("");
  const fullBootText =
    "> RENDSZER INICIALIZÁLÁSA... \n> KAPCSOLAT TITKOSÍTVA... \n> VÁROM AZ AZONOSÍTÁST...";

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

  const nextStep = () => {
    setSubmitError("");
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setSubmitError("");
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (budgetVal: string) => {
    setIsSubmitting(true);
    setSubmitError("");

    const finalData = { ...formData, budget: budgetVal };

    const form = new FormData();
    form.append("Név", finalData.name);
    form.append("Cég", finalData.company);
    form.append("Telefon", finalData.phone);
    form.append("Email", finalData.email);
    form.append("Célpont (Rendszer)", finalData.target);
    form.append("Kiválasztott Büdzsé", finalData.budget);
    form.append("Adatkezelés elfogadva", "IGEN");
    form.append("_replyto", finalData.email);
    form.append("_subject", `THE GBR LEAD: ${finalData.company} - ${finalData.budget}`);

    try {
      const response = await fetch("https://formspree.io/f/mykabnno", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: form,
      });

      if (response.ok) {
        setStep(4);
      } else {
        const errorData = await response.json();
        console.error("Formspree Hiba:", errorData);
        setSubmitError(`> API_HIBA: Sikertelen adatküldés!`);
      }
    } catch (error) {
      console.error("Hálózati hiba:", error);
      setSubmitError("> SYS_ERROR: Hálózati hiba blokkolja a jelet!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#e7ff00] selection:bg-[#e7ff00] selection:text-black relative font-mono overflow-hidden flex flex-col items-center justify-center">
      {/* =========================================
          STÍLUSOK ÉS ANIMÁCIÓK
      ========================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        body { background-color: #050505; }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .scanline-effect { animation: scanline 8s linear infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s step-end infinite; }
        
        input[type="text"]:focus, input[type="email"]:focus, input[type="tel"]:focus { 
          outline: none; 
          border-bottom-color: #e7ff00; 
          box-shadow: 0 4px 15px -3px rgba(231,255,0,0.3); 
        }
        
        input[type="checkbox"] {
          accent-color: #e7ff00;
          cursor: pointer;
        }
      `,
        }}
      />

      {/* =========================================
          HÁTTÉR EFFEKTEK
      ========================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-cubes-pattern opacity-5"></div>
        <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#e7ff00]/20 to-transparent scanline-effect opacity-30"></div>
      </div>

      {/* =========================================
          KILÉPÉS GOMB (ESC)
      ========================================= */}
      <Link
        href="/"
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
      >
        <div className="border border-gray-600 group-hover:border-white px-2 py-1 rounded text-xs">
          ESC
        </div>
        <span className="text-xs tracking-widest uppercase">Megszakítás</span>
      </Link>

      {/* =========================================
          RADAR / STÁTUSZ (JOBB FENT)
      ========================================= */}
      <div className="absolute top-8 right-8 z-50 flex items-center gap-3">
        <span className="text-[10px] tracking-widest uppercase text-gray-500">
          Kapcsolat: <span className="text-[#00E5FF]">Biztonságos</span>
        </span>
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
          <span className="ml-4 text-[10px] text-gray-500 uppercase tracking-widest">
            root@thegbr:~ /init_protocol
          </span>
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
              <div className="whitespace-pre-line text-sm text-gray-400 mb-8 h-16">
                {bootText}
                <span className="animate-blink text-[#e7ff00]">█</span>
              </div>

              <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-8 border-l-2 border-[#e7ff00] pl-4">
                01 // Azonosítási Protokoll
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                    Engedélyezett Név
                  </label>
                  <input
                    type="text"
                    placeholder="Vezeték és Keresztnév"
                    className="w-full bg-transparent border-b border-white/20 text-white p-2 text-sm transition-all focus:border-[#e7ff00]"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                    Vállalat / Entitás
                  </label>
                  <input
                    type="text"
                    placeholder="Cégnév"
                    className="w-full bg-transparent border-b border-white/20 text-white p-2 text-sm transition-all focus:border-[#e7ff00]"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                    Telefonos Elérhetőség
                  </label>
                  <input
                    type="tel"
                    placeholder="+36 30 123 4567"
                    className="w-full bg-transparent border-b border-white/20 text-white p-2 text-sm transition-all focus:border-[#e7ff00]"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                    Kommunikációs Csatorna (Email)
                  </label>
                  <input
                    type="email"
                    placeholder="titkosított@email.com"
                    className="w-full bg-transparent border-b border-white/20 text-white p-2 text-sm transition-all focus:border-[#e7ff00]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4"
                  />
                  <label
                    htmlFor="privacy"
                    className="text-[10px] text-gray-500 leading-relaxed cursor-pointer select-none"
                  >
                    Elfogadom az{" "}
                    <Link
                      href="/adatkezeles"
                      target="_blank"
                      className="text-[#e7ff00] hover:text-white transition-colors underline"
                    >
                      Adatkezelési Tájékoztatót
                    </Link>
                    , és hozzájárulok, hogy a THE GBR a megadott adataimat kapcsolatfelvétel
                    céljából kezelje.
                  </label>
                </div>
              </div>

              <div className="mt-12 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    !formData.name ||
                    !formData.company ||
                    !formData.phone ||
                    !formData.email ||
                    !privacyAccepted
                  }
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
              <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-8 border-l-2 border-[#00E5FF] pl-4">
                02 // Célpont Kijelölése
              </h2>
              <p className="text-xs text-gray-500 tracking-widest uppercase mb-6">
                Melyik rendszert aktiváljuk a(z){" "}
                <span className="text-white">{formData.company}</span> számára?
              </p>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    id: "web",
                    label: "High-End Web & Shop",
                    color: "hover:border-[#e7ff00] hover:text-[#e7ff00]",
                  },
                  {
                    id: "marketing",
                    label: "Performance Marketing & Videó",
                    color: "hover:border-[#00E5FF] hover:text-[#00E5FF]",
                  },
                  {
                    id: "full",
                    label: "Full-Stack Autopilot (Minden)",
                    color:
                      "hover:border-[#9d00ff] hover:text-[#9d00ff] border-[#9d00ff]/30 text-[#9d00ff]",
                  },
                ].map((option) => (
                  <button
                    type="button"
                    key={option.id}
                    onClick={() => {
                      setFormData({ ...formData, target: option.id });
                      nextStep();
                    }}
                    className={`w-full text-left p-4 border ${formData.target === option.id ? "border-white bg-white/10" : "border-white/10"} bg-[#0a0a0a] transition-all text-sm uppercase tracking-widest text-gray-300 ${option.color} group flex justify-between items-center`}
                  >
                    <span>{option.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      Aktiválás &rarr;
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-12 flex justify-start">
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-xs text-gray-500 hover:text-white uppercase tracking-widest"
                >
                  &larr; Vissza
                </button>
              </div>
            </div>
          )}

          {/* LÉPÉS 3: ERŐFORRÁS ALLOKÁCIÓ ÉS KÜLDÉS */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-8 border-l-2 border-[#9d00ff] pl-4">
                03 // Erőforrás Allokáció
              </h2>
              <p className="text-xs text-gray-500 tracking-widest uppercase mb-6">
                Mekkora havi keretet különítesz el a fegyverkezésre?
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "300k-500k", label: "300 - 500e Ft" },
                  { val: "500k-1m", label: "500e - 1M Ft" },
                  { val: "1m-3m", label: "1M - 3M Ft" },
                  { val: "3m+", label: "3M+ Ft" },
                ].map((budget) => (
                  <button
                    type="button"
                    key={budget.val}
                    disabled={isSubmitting}
                    onClick={() => handleSubmit(budget.val)}
                    className={`p-4 border ${formData.budget === budget.val ? "border-[#e7ff00] text-[#e7ff00]" : "border-white/10 text-gray-400"} bg-[#0a0a0a] hover:border-[#e7ff00] hover:text-[#e7ff00] transition-all text-sm font-bold tracking-widest disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {budget.label}
                  </button>
                ))}
              </div>

              {/* Töltés és Hibaüzenetek kezelése */}
              <div className="mt-6 min-h-[40px]">
                {isSubmitting && (
                  <div className="text-center text-[#e7ff00] animate-pulse text-xs tracking-widest uppercase">
                    &gt; Adatok kódolása és továbbítása...
                  </div>
                )}
                {submitError && (
                  <div className="text-center text-red-500 font-bold text-xs tracking-widest uppercase mt-2">
                    {submitError}
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-start">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="text-xs text-gray-500 hover:text-white uppercase tracking-widest disabled:opacity-50"
                >
                  &larr; Vissza
                </button>
              </div>
            </div>
          )}

          {/* LÉPÉS 4: SIKER / VÉGREHAJTÁS (ÚJ, FUTURISZTIKUS DIZÁJN) */}
          {step === 4 && (
            <div className="text-center animate-fade-in py-12">
              {/* Futurisztikus töltőgyűrű */}
              <div className="relative w-24 h-24 mx-auto mb-10 flex items-center justify-center">
                <div className="absolute inset-0 border-t-2 border-[#e7ff00] rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-r-2 border-white/10 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
                <div className="w-2 h-2 bg-[#e7ff00] rounded-full animate-pulse shadow-[0_0_15px_#e7ff00]"></div>
              </div>

              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.2em] text-white mb-6">
                Protokoll{" "}
                <span className="text-[#e7ff00] drop-shadow-[0_0_15px_rgba(231,255,0,0.2)]">
                  Elindítva
                </span>
              </h2>

              <p className="text-gray-400 text-sm tracking-widest mb-8 uppercase leading-relaxed max-w-md mx-auto">
                A célpont rögzítve. Adatok titkosítva. <br />A THE GBR operatív törzse hamarosan
                felveszi veled a kapcsolatot.
              </p>

              {/* Terminál státusz blokk */}
              <div className="font-mono text-[10px] text-gray-500 bg-[#0a0a0a] border border-white/5 p-4 rounded inline-block text-left">
                <span className="text-[#e7ff00]">sys.status:</span> 200_OK <br />
                <span className="text-gray-600">connection:</span> CLOSED <br />
                <span className="text-gray-600">agent_routing:</span> ACTIVE
              </div>

              <div className="mt-12">
                <Link
                  href="/"
                  className="inline-block px-8 py-3 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-[#e7ff00] hover:text-black hover:border-[#e7ff00] transition-all shadow-[0_0_0_rgba(231,255,0,0)] hover:shadow-[0_0_20px_rgba(231,255,0,0.3)]"
                >
                  Vissza a Bázisra
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
