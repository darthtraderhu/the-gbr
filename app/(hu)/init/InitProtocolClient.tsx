"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Rail } from "@/app/components/ui";

const TARGET_OPTIONS = [
  {
    id: "web",
    label: "Weboldal vagy webshop",
    desc: "Új rendszer, vagy a mostani lecserélése",
  },
  {
    id: "marketing",
    label: "Marketing és tartalom",
    desc: "Hirdetés, videó, tartalomgyártás",
  },
  {
    id: "uzemeltetes",
    label: "Fejlesztés és üzemeltetés",
    desc: "Teljes lefedettség, folyamatosan",
  },
  {
    id: "nem-tudom",
    label: "Még nem tudom",
    desc: "Beszéljük meg",
  },
] as const;

const BUDGET_OPTIONS = [
  { val: "1-3M", label: "1 - 3M Ft" },
  { val: "3-8M", label: "3 - 8M Ft" },
  { val: "8M+", label: "8M+ Ft" },
  { val: "nem-tudom", label: "Még nem tudom" },
] as const;

const SCALE_ITEMS = [
  { n: 1, label: "01 — A projekt" },
  { n: 2, label: "02 — Keret és határidő" },
  { n: 3, label: "03 — Kapcsolat" },
];

const SIDE_LABELS: Record<number, string> = {
  1: "01 / A projekt",
  2: "02 / Keret",
  3: "03 / Kapcsolat",
  4: "Kész",
};

const MIN_DESC_LENGTH = 100;
const CONTACT_EMAIL = "gabor@thegbr.eu";

type SubmitError = { kind: "server" | "network"; detail?: string };

function StepFrame({
  n,
  label,
  numeralColor,
  children,
}: {
  n: string;
  label: string;
  numeralColor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[minmax(120px,16%)_1fr] gap-[clamp(20px,3.4vw,56px)] items-start">
      <div>
        <div
          className="font-display font-black [font-size:var(--text-step-n)] leading-[0.8] tracking-[-0.06em]"
          style={{ color: numeralColor ?? "var(--rule)" }}
        >
          {n}
        </div>
        <div className="mt-[var(--space-3)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.24em] uppercase text-[var(--dim)]">
          {label}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function InitProtocolClient() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<SubmitError | null>(null);
  const [submittedStatus, setSubmittedStatus] = useState<number | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [submittedAt, setSubmittedAt] = useState<number | null>(null);
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

  const nextStep = () => {
    setSubmitError(null);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setSubmitError(null);
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
    setSubmitError(null);

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
        const data = await response.json().catch(() => null);
        setSubmittedStatus(response.status);
        setSubmittedId(typeof data?.id === "string" ? data.id : null);
        setSubmittedAt(Date.now());
        setStep(4);
      } else {
        const errorData = await response.json().catch(() => null);
        console.error("Contact API hiba:", errorData);
        setSubmitError({ kind: "server", detail: errorData?.error });
      }
    } catch (error) {
      console.error("Hálózati hiba:", error);
      setSubmitError({ kind: "network" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      data-theme="dark"
      style={{ backgroundColor: "var(--ground)", color: "var(--ink)" }}
      className="min-h-screen flex flex-col font-body"
    >
      {/* Vizuálisan rejtett h1 — az oldalnak nincs látható nagy címsora
          (fókuszált konverziós folyamat), de a lépés-címek (h2) alá kell
          egy valódi h1, hogy a címsor-hierarchia és a képernyőolvasók
          számára a lapcím ne maradjon ki. */}
      <h1 className="sr-only">Beszéljünk a projektedről</h1>

      {/* ===== FEJLÉC ===== */}
      <div className="border-b border-[var(--rule)]">
        <div className="flex items-center gap-4 flex-wrap px-6 py-[18px]">
          <Link
            href="/"
            className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)] hover:text-[var(--ink)] transition-colors"
          >
            &larr; Vissza a főoldalra
          </Link>
          <span className="mx-auto font-display font-extrabold text-[19px] tracking-[-0.045em]">
            THE GBR<span className="text-[var(--signal)]">.</span>
          </span>
          <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--dim)]">
            Válasz 2 munkanapon belül
          </span>
        </div>
      </div>

      {/* ===== HALADÁS-LÉC ===== */}
      <div className="grid grid-cols-3 border-b border-[var(--rule)]">
        {SCALE_ITEMS.map((item) => {
          const isOn = step === item.n;
          const isDone = step > item.n;
          return (
            <div
              key={item.n}
              className={`relative px-3 sm:px-6 py-[11px] border-r border-[var(--rule)] last:border-r-0 [font-family:var(--font-mono)] text-[9px] sm:text-[length:var(--text-2xs)] tracking-[0.12em] sm:tracking-[0.2em] uppercase ${
                isOn ? "text-[var(--ink)]" : isDone ? "text-[var(--mid)]" : "text-[var(--dim)]"
              }`}
            >
              {item.label}
              <span
                className="absolute left-0 bottom-[-1px] h-px bg-[var(--signal)] transition-[width] duration-500 ease-out"
                style={{ width: isOn || isDone ? "100%" : "0%" }}
              />
            </div>
          );
        })}
      </div>

      {/* ===== TÖRZS ===== */}
      <Rail label={SIDE_LABELS[step]} dark className="flex-1">
        <div className="px-6 py-[clamp(36px,5vw,80px)] sm:pb-[clamp(40px,5vw,90px)]">
          {step === 1 && (
            <p className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] leading-[2] tracking-[0.08em] text-[var(--mid)] max-w-[60ch] mb-[clamp(30px,4vw,52px)]">
              Három lépés, kb. két perc.
              <br />
              <strong className="font-normal text-[var(--signal)]">
                Nem minden projektet vállalunk el — ezért kérdezünk előbb.
              </strong>
            </p>
          )}

          {/* LÉPÉS 1: A PROJEKT */}
          {step === 1 && (
            <StepFrame n="01" label="A projekt">
              <h2 className="font-display font-extrabold [font-size:var(--text-svc-title)] tracking-[-0.04em] leading-[1.02] max-w-[20ch] mb-[clamp(24px,3vw,38px)]">
                Mivel tudunk segíteni?
              </h2>

              <div className="border-t border-[var(--rule)] mb-[var(--space-8)]">
                {TARGET_OPTIONS.map((option, i) => {
                  const selected = formData.target === option.id;
                  return (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => setFormData({ ...formData, target: option.id })}
                      className="w-full text-left grid grid-cols-[34px_1fr_auto] gap-[var(--space-4)] items-center py-[var(--space-4)] border-b border-[var(--rule)] bg-transparent hover:bg-[var(--panel)] transition-colors"
                    >
                      <span
                        className="justify-self-center w-[14px] h-[14px]"
                        style={{
                          backgroundColor: selected ? "var(--signal)" : "transparent",
                          border: `1px solid ${selected ? "var(--signal)" : "#39413C"}`,
                        }}
                      />
                      <span>
                        <span className="block font-display font-semibold [font-size:var(--text-lg)] tracking-[-0.02em] text-[var(--ink)]">
                          {option.label}
                        </span>
                        <span className="block [font-size:var(--text-sm)] text-[var(--mid)] mt-[var(--space-1)]">
                          {option.desc}
                        </span>
                      </span>
                      <span
                        className={`[font-family:var(--font-mono)] text-[length:var(--text-xs)] ${
                          selected ? "text-[var(--signal)]" : "text-[var(--dim)]"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-3)]">
                  Mi a helyzet most, és mit szeretnél elérni?
                </label>
                <textarea
                  rows={4}
                  placeholder="Pl.: Van egy WooCommerce webshopunk, ami nagyon lassú és elavult. Szeretnénk átépíteni Next.js-re úgy, hogy a bolt közben ne álljon le. Kb. 400 termék, tavaszra kellene kész lennie."
                  className="w-full bg-transparent border-0 border-b border-[#2C3438] text-[var(--ink)] py-[var(--space-3)] [font-size:var(--text-lg)] resize-none focus:outline-none focus:border-b-[var(--signal)]"
                  style={{ overflow: "hidden" }}
                  value={formData.description}
                  onChange={handleDescriptionChange}
                />
                <div className="flex items-center gap-[var(--space-3)] mt-[var(--space-3)]">
                  <div className="flex-1 max-w-[160px] h-[2px] bg-[#20272B] relative">
                    <div
                      className="h-full"
                      style={{
                        width: `${Math.min(100, (descriptionLength / MIN_DESC_LENGTH) * 100)}%`,
                        backgroundColor: descriptionReady ? "var(--signal)" : "var(--mid)",
                      }}
                    />
                  </div>
                  <span
                    className={`[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase whitespace-nowrap ${
                      descriptionReady ? "text-[var(--signal)]" : "text-[var(--dim)]"
                    }`}
                  >
                    {descriptionReady ? "✓ Készen áll" : `még ${descriptionRemaining} karakter`}
                  </span>
                </div>
                <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--dim)] mt-[var(--space-3)]">
                  Minél konkrétabb, annál pontosabb választ tudunk adni.
                </div>
              </div>

              <div className="flex justify-end pt-[var(--space-6)] mt-[clamp(30px,3.6vw,50px)] border-t border-[var(--rule)]">
                <Button onClick={nextStep} disabled={!step1Valid}>
                  Tovább &rarr;
                </Button>
              </div>
            </StepFrame>
          )}

          {/* LÉPÉS 2: KERET ÉS HATÁRIDŐ */}
          {step === 2 && (
            <StepFrame n="02" label="Keret">
              <h2 className="font-display font-extrabold [font-size:var(--text-svc-title)] tracking-[-0.04em] leading-[1.02] max-w-[20ch] mb-[clamp(24px,3vw,38px)]">
                Mekkora keretet terveztek erre?
              </h2>
              <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch] mb-[var(--space-6)]">
                Azért kérdezzük, hogy ne pazaroljuk egymás idejét. Ha a keret nem reális a
                feladathoz, azt inkább most mondjuk meg, mint három egyeztetés után.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--rule)] border border-[var(--rule)] mb-[var(--space-6)]">
                {BUDGET_OPTIONS.map((budget) => {
                  const selected = formData.budget === budget.val;
                  return (
                    <button
                      type="button"
                      key={budget.val}
                      onClick={() => setFormData({ ...formData, budget: budget.val })}
                      className={`px-3 py-5 [font-size:var(--text-base)] font-display font-semibold tracking-[-0.01em] transition-colors ${
                        selected
                          ? "bg-[var(--signal)] text-[#101400]"
                          : "bg-[var(--ground)] text-[var(--mid)] hover:bg-[var(--panel)] hover:text-[var(--ink)]"
                      }`}
                    >
                      {budget.label}
                    </button>
                  );
                })}
              </div>

              <div className="mb-[var(--space-6)]">
                <label className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-3)]">
                  Határidő (opcionális)
                </label>
                <input
                  type="text"
                  placeholder="pl. 2026 Q4, vagy egy konkrét dátum"
                  className="w-full bg-transparent border-0 border-b border-[#2C3438] text-[var(--ink)] py-[var(--space-3)] [font-size:var(--text-lg)] focus:outline-none focus:border-b-[var(--signal)]"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>

              <div className="flex justify-between items-center pt-[var(--space-6)] mt-[clamp(30px,3.6vw,50px)] border-t border-[var(--rule)]">
                <button
                  type="button"
                  onClick={prevStep}
                  className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)] hover:text-[var(--ink)] transition-colors"
                >
                  &larr; Vissza
                </button>
                <Button onClick={nextStep} disabled={!step2Valid}>
                  Tovább &rarr;
                </Button>
              </div>
            </StepFrame>
          )}

          {/* LÉPÉS 3: KAPCSOLAT */}
          {step === 3 && (
            <StepFrame n="03" label="Kapcsolat">
              <h2 className="font-display font-extrabold [font-size:var(--text-svc-title)] tracking-[-0.04em] leading-[1.02] max-w-[20ch] mb-[clamp(24px,3vw,38px)]">
                Kapcsolat
              </h2>

              <div className="space-y-[var(--space-6)]">
                <div>
                  <label className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-3)]">
                    Neved
                  </label>
                  <input
                    type="text"
                    placeholder="Kovács János"
                    className="w-full bg-transparent border-0 border-b border-[#2C3438] text-[var(--ink)] py-[var(--space-3)] [font-size:var(--text-lg)] focus:outline-none focus:border-b-[var(--signal)]"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-3)]">
                    Cégnév
                  </label>
                  <input
                    type="text"
                    placeholder="Cégnév"
                    className="w-full bg-transparent border-0 border-b border-[#2C3438] text-[var(--ink)] py-[var(--space-3)] [font-size:var(--text-lg)] focus:outline-none focus:border-b-[var(--signal)]"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-3)]">
                    E-mail cím
                  </label>
                  <input
                    type="email"
                    placeholder="nev@ceged.hu"
                    className="w-full bg-transparent border-0 border-b border-[#2C3438] text-[var(--ink)] py-[var(--space-3)] [font-size:var(--text-lg)] focus:outline-none focus:border-b-[var(--signal)]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-3)]">
                    Telefonszám (opcionális)
                  </label>
                  <input
                    type="tel"
                    placeholder="+36 30 123 4567"
                    className="w-full bg-transparent border-0 border-b border-[#2C3438] text-[var(--ink)] py-[var(--space-3)] [font-size:var(--text-lg)] focus:outline-none focus:border-b-[var(--signal)]"
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

                <div className="grid grid-cols-[18px_1fr] gap-[var(--space-3)] items-start pt-[var(--space-5)] mt-[var(--space-2)] border-t border-[var(--rule)]">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-[3px] w-[16px] h-[16px]"
                    style={{ accentColor: "var(--signal)" }}
                  />
                  <label
                    htmlFor="privacy"
                    className="[font-size:var(--text-sm)] text-[var(--mid)] leading-[1.55] cursor-pointer select-none"
                  >
                    Elfogadom az{" "}
                    <Link
                      href="/adatkezeles"
                      target="_blank"
                      className="text-[var(--signal)] hover:text-[var(--ink)] transition-colors underline"
                    >
                      Adatkezelési Tájékoztatót
                    </Link>
                    , és hozzájárulok, hogy a THE GBR a megadott adataimat kapcsolatfelvétel
                    céljából kezelje.
                  </label>
                </div>
              </div>

              {isSubmitting && (
                <div className="mt-[var(--space-6)] [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.1em] uppercase text-[var(--signal)] animate-pulse">
                  Küldés folyamatban…
                </div>
              )}
              {submitError && (
                <div
                  className="mt-[var(--space-6)] pl-[var(--space-4)] [font-size:var(--text-sm)] leading-relaxed max-w-[56ch]"
                  style={{ borderLeft: "2px solid var(--attention)", color: "var(--attention)" }}
                >
                  {submitError.kind === "server" ? (
                    submitError.detail ? (
                      <>
                        {submitError.detail} Írj közvetlenül:{" "}
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="underline hover:text-[var(--ink)]"
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </>
                    ) : (
                      <>
                        A küldés nem sikerült. Próbáld újra pár másodperc múlva — ha akkor sem megy,
                        írj közvetlenül:{" "}
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="underline hover:text-[var(--ink)]"
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </>
                    )
                  ) : (
                    <>
                      Nem sikerült elérni a szervert. Ellenőrizd az internetkapcsolatot, vagy írj
                      közvetlenül:{" "}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="underline hover:text-[var(--ink)]"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center pt-[var(--space-6)] mt-[clamp(30px,3.6vw,50px)] border-t border-[var(--rule)]">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)] hover:text-[var(--ink)] transition-colors disabled:opacity-50"
                >
                  &larr; Vissza
                </button>
                <Button onClick={handleSubmit} disabled={!step3Valid || isSubmitting}>
                  {isSubmitting ? "Küldés..." : "Küldés"}
                </Button>
              </div>
            </StepFrame>
          )}

          {/* LÉPÉS 4: SIKER — csak valós 2xx válasz esetén */}
          {step === 4 && (
            <StepFrame n="✓" label="Kész" numeralColor="var(--signal)">
              <h2 className="font-display font-extrabold [font-size:var(--text-svc-title)] tracking-[-0.04em] leading-[1.02] mb-[var(--space-5)]">
                Megkaptuk<span className="text-[var(--signal)]">.</span>
              </h2>
              <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch] mb-[var(--space-4)]">
                Küldtünk egy visszaigazolást a megadott e-mail címre — ha pár percen belül nem
                érkezik meg, nézd meg a spam mappát is.
              </p>
              <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch]">
                Két munkanapon belül válaszolunk. Ha közben eszedbe jut valami, írj nyugodtan:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--signal)] underline">
                  {CONTACT_EMAIL}
                </a>
              </p>

              <div className="border border-[var(--rule)] bg-[var(--panel)] max-w-[520px] mt-[clamp(30px,3.6vw,50px)]">
                <div className="px-[18px] py-[11px] border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)]">
                  Beérkezés visszaigazolása
                </div>
                <div className="px-[18px] py-[16px] [font-family:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--mid)]">
                  <div className="flex justify-between gap-[var(--space-4)] py-[6px]">
                    <span>Beérkezett</span>
                    <b className="text-[var(--ink)] font-medium">
                      {submittedAt
                        ? new Intl.DateTimeFormat("hu-HU", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(submittedAt)
                        : "—"}
                    </b>
                  </div>
                  <div className="flex justify-between gap-[var(--space-4)] py-[6px]">
                    <span>Azonosító</span>
                    <b className="text-[var(--ink)] font-medium">
                      {submittedId ? submittedId.slice(0, 8) : (submittedStatus ?? "—")}
                    </b>
                  </div>
                  <div className="flex justify-between gap-[var(--space-4)] py-[6px]">
                    <span>Válaszadás</span>
                    <b className="text-[var(--ink)] font-medium">2 munkanapon belül</b>
                  </div>
                </div>
              </div>

              <div className="pt-[var(--space-6)] mt-[clamp(30px,3.6vw,50px)] border-t border-[var(--rule)]">
                <Link
                  href="/"
                  className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)] hover:text-[var(--ink)] transition-colors"
                >
                  &larr; Vissza a főoldalra
                </Link>
              </div>
            </StepFrame>
          )}
        </div>
      </Rail>
    </main>
  );
}
