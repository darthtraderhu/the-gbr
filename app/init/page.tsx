"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const TARGET_OPTIONS = [
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
    color: "hover:border-[#9d00ff] hover:text-[#9d00ff] border-[#9d00ff]/30 text-[#9d00ff]",
  },
] as const;

const BUDGET_OPTIONS = [
  { val: "1-3M", label: "1 - 3M Ft" },
  { val: "3-8M", label: "3 - 8M Ft" },
  { val: "8M+", label: "8M+ Ft" },
  { val: "nem-tudom", label: "Még nem tudom" },
] as const;

const MIN_DESC_LENGTH = 100;
const TOTAL_STEPS = 3;

export default function InitProtocol() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedStatus, setSubmittedStatus] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    target: "",
    description: "",
    budget: "",
    deadline: "",
    // Honeypot — valódi felhasználó ezt sosem tölti ki.
    website: "",
  });

  // Az űrlap megjelenésének időpontja — időalapú bot-szűréshez az API-n.
  const [formStartedAt] = useState(() => Date.now());

  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

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

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value });
    // Automatikus magasság-növelés — a textarea a tartalommal együtt nő.
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const descriptionLength = formData.description.trim().length;
  const descriptionRemaining = Math.max(0, MIN_DESC_LENGTH - descriptionLength);
  const descriptionReady = descriptionLength >= MIN_DESC_LENGTH;
  const step1Valid = formData.target !== "" && descriptionReady;
  const step2Valid = formData.budget !== "";
  const step3Valid = !!formData.name && !!formData.company && !!formData.email && privacyAccepted;

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    const targetOption = TARGET_OPTIONS.find((t) => t.id === formData.target);
    const kategoria = targetOption?.label ?? formData.target;

    // A Formspree egyelőre párhuzamosan fut tovább (átmeneti, nem blokkoló) —
    // a UI-t kizárólag a saját /api/contact végpont válasza vezérli.
    const formspreeForm = new FormData();
    formspreeForm.append("Név", formData.name);
    formspreeForm.append("Cég", formData.company);
    formspreeForm.append("Telefon", formData.phone);
    formspreeForm.append("Email", formData.email);
    formspreeForm.append("Célpont (Rendszer)", kategoria);
    formspreeForm.append("Projekt leírása", formData.description);
    formspreeForm.append("Kiválasztott Büdzsé", formData.budget);
    formspreeForm.append("Határidő", formData.deadline);
    formspreeForm.append("Adatkezelés elfogadva", "IGEN");
    formspreeForm.append("_replyto", formData.email);
    formspreeForm.append("_subject", `THE GBR LEAD: ${formData.company} - ${formData.budget}`);

    fetch("https://formspree.io/f/mykabnno", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formspreeForm,
    }).catch((err) => {
      console.warn("Formspree (párhuzamos, nem blokkoló) hiba:", err);
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nev: formData.name,
          ceg: formData.company,
          email: formData.email,
          telefon: formData.phone,
          kategoria,
          leiras: formData.description,
          keret: formData.budget,
          hatarido: formData.deadline,
          honeypot: formData.website,
          startedAt: formStartedAt,
        }),
      });

      if (response.ok) {
        setSubmittedStatus(response.status);
        setStep(4);
      } else {
        const errorData = await response.json().catch(() => null);
        console.error("Contact API hiba:", errorData);
        setSubmitError(
          errorData?.error
            ? `> API_HIBA: ${errorData.error}`
            : "> API_HIBA: Sikertelen adatküldés! Próbáld újra, vagy írj közvetlenül: gabor@thegbr.eu"
        );
      }
    } catch (error) {
      console.error("Hálózati hiba:", error);
      setSubmitError(
        "> SYS_ERROR: Hálózati hiba blokkolja a jelet! Próbáld újra, vagy írj közvetlenül: gabor@thegbr.eu"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercent = step > TOTAL_STEPS ? 100 : (step / TOTAL_STEPS) * 100;

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

        input[type="text"]:focus, input[type="email"]:focus, input[type="tel"]:focus, textarea:focus {
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
          {step <= TOTAL_STEPS && (
            <span className="ml-auto text-[10px] text-gray-600 uppercase tracking-widest">
              {step}. lépés / {TOTAL_STEPS}
            </span>
          )}
        </div>

        {/* Terminál Test */}
        <div className="border-x border-b border-white/10 bg-[#050505] rounded-b-lg p-8 md:p-12 min-h-[400px] shadow-[0_0_50px_rgba(231,255,0,0.05)] relative">
          {/* Lépésjelző */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <div
              className="h-full bg-[#e7ff00] transition-all duration-500 shadow-[0_0_10px_rgba(231,255,0,0.5)]"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* LÉPÉS 1: A PROJEKT */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="whitespace-pre-line text-sm text-gray-400 mb-8 h-16">
                {bootText}
                <span className="animate-blink text-[#e7ff00]">█</span>
              </div>

              <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-8 border-l-2 border-[#e7ff00] pl-4">
                01 // A Projekt
              </h2>

              <div className="space-y-3 mb-8">
                <label className="block text-[10px] text-gray-500 uppercase tracking-widest">
                  Melyik rendszert aktiváljuk?
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {TARGET_OPTIONS.map((option) => (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => setFormData({ ...formData, target: option.id })}
                      className={`w-full text-left p-4 border ${formData.target === option.id ? "border-white bg-white/10" : "border-white/10"} bg-[#0a0a0a] transition-all text-sm uppercase tracking-widest text-gray-300 ${option.color} group flex justify-between items-center`}
                    >
                      <span>{option.label}</span>
                      {formData.target === option.id && <span className="text-[#e7ff00]">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                  Mi a helyzet most, és mit szeretnél elérni?
                </label>
                <textarea
                  ref={descriptionRef}
                  rows={4}
                  placeholder="Pl.: Van egy WooCommerce webshopunk, ami nagyon lassú és elavult. Szeretnénk átépíteni Next.js-re úgy, hogy a bolt közben ne álljon le. Kb. 400 termék, tavaszra kellene kész lennie."
                  className="w-full bg-transparent border-b border-white/20 text-white p-2 text-sm transition-all resize-none overflow-hidden"
                  style={{ overflow: "hidden" }}
                  value={formData.description}
                  onChange={handleDescriptionChange}
                />
                <div className="mt-2 text-[10px] uppercase tracking-widest">
                  {descriptionReady ? (
                    <span className="text-[#e7ff00]/60">✓ Készen áll</span>
                  ) : (
                    <span className="text-gray-500">még {descriptionRemaining} karakter</span>
                  )}
                </div>
              </div>

              <div className="mt-12 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!step1Valid}
                  className="px-8 py-3 bg-[#e7ff00] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tovább &rarr;
                </button>
              </div>
            </div>
          )}

          {/* LÉPÉS 2: KERET ÉS HATÁRIDŐ */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-8 border-l-2 border-[#9d00ff] pl-4">
                02 // Keret és Határidő
              </h2>
              <p className="text-xs text-gray-500 tracking-widest uppercase mb-6">
                Mekkora büdzsét terveztek erre a projektre?
              </p>

              <div className="grid grid-cols-2 gap-4">
                {BUDGET_OPTIONS.map((budget) => (
                  <button
                    type="button"
                    key={budget.val}
                    onClick={() => setFormData({ ...formData, budget: budget.val })}
                    className={`p-4 border ${formData.budget === budget.val ? "border-[#e7ff00] text-[#e7ff00]" : "border-white/10 text-gray-400"} bg-[#0a0a0a] hover:border-[#e7ff00] hover:text-[#e7ff00] transition-all text-sm font-bold tracking-widest`}
                  >
                    {budget.label}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                  Határidő (opcionális)
                </label>
                <input
                  type="text"
                  placeholder="pl. 2026 Q4, vagy egy konkrét dátum"
                  className="w-full bg-transparent border-b border-white/20 text-white p-2 text-sm transition-all"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>

              <div className="mt-12 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-xs text-gray-500 hover:text-white uppercase tracking-widest"
                >
                  &larr; Vissza
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!step2Valid}
                  className="px-8 py-3 bg-[#e7ff00] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tovább &rarr;
                </button>
              </div>
            </div>
          )}

          {/* LÉPÉS 3: KAPCSOLAT */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-8 border-l-2 border-[#00E5FF] pl-4">
                03 // Kapcsolat
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                    Engedélyezett Név
                  </label>
                  <input
                    type="text"
                    placeholder="Vezeték és Keresztnév"
                    className="w-full bg-transparent border-b border-white/20 text-white p-2 text-sm transition-all"
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
                    className="w-full bg-transparent border-b border-white/20 text-white p-2 text-sm transition-all"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                    Kommunikációs Csatorna (Email)
                  </label>
                  <input
                    type="email"
                    placeholder="titkosított@email.com"
                    className="w-full bg-transparent border-b border-white/20 text-white p-2 text-sm transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                    Telefonos Elérhetőség (opcionális)
                  </label>
                  <input
                    type="tel"
                    placeholder="+36 30 123 4567"
                    className="w-full bg-transparent border-b border-white/20 text-white p-2 text-sm transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Honeypot — CSS-sel elrejtve, csak botok töltik ki. */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                >
                  <label htmlFor="website">Cégünk weboldala</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
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

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="text-xs text-gray-500 hover:text-white uppercase tracking-widest disabled:opacity-50"
                >
                  &larr; Vissza
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!step3Valid || isSubmitting}
                  className="px-8 py-3 bg-[#e7ff00] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Küldés..." : "Küldés"}
                </button>
              </div>
            </div>
          )}

          {/* LÉPÉS 4: SIKER / VÉGREHAJTÁS — csak valós 2xx válasz esetén */}
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
                A célpont rögzítve. Adatok titkosítva. <br />A THE GBR operatív törzse két
                munkanapon belül felveszi veled a kapcsolatot.
              </p>

              {/* Terminál státusz blokk — a ténylegesen kapott válaszkódot mutatja */}
              <div className="font-mono text-[10px] text-gray-500 bg-[#0a0a0a] border border-white/5 p-4 rounded inline-block text-left">
                <span className="text-[#e7ff00]">sys.status:</span> {submittedStatus ?? "—"}_OK{" "}
                <br />
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
