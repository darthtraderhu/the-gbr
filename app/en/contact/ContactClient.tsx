"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Rail } from "@/app/components/ui";

const TARGET_OPTIONS = [
  {
    id: "new",
    label: "Build something new",
    desc: "Web app, store or platform from scratch",
  },
  {
    id: "existing",
    label: "Take over something existing",
    desc: "Inherited codebase, stalled build, or migration",
  },
  {
    id: "ongoing",
    label: "Ongoing capacity",
    desc: "Reserved hours each month",
  },
  {
    id: "unsure",
    label: "Not sure yet",
    desc: "Let's talk it through",
  },
] as const;

// A belső érték (val) ugyanaz a négy kód, amit a magyar /init is küld
// (1-3M/3-8M/8M+/nem-tudom) — az /api/contact zod-sémája ezt validálja.
// Csak a megjelenő címke EUR-sáv, hogy ne kelljen a backendet módosítani.
const BUDGET_OPTIONS = [
  { val: "1-3M", label: "€3–8k" },
  { val: "3-8M", label: "€8–20k" },
  { val: "8M+", label: "€20k+" },
  { val: "nem-tudom", label: "Not sure yet" },
] as const;

const SCALE_ITEMS = [
  { n: 1, label: "01 — The project" },
  { n: 2, label: "02 — Budget and timing" },
  { n: 3, label: "03 — Contact" },
];

const SIDE_LABELS: Record<number, string> = {
  1: "01 / The project",
  2: "02 / Budget",
  3: "03 / Contact",
  4: "Done",
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

export default function ContactClient() {
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
    website: "",
  });

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
          lang: "en",
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
        console.error("Contact API error:", errorData);
        setSubmitError({ kind: "server", detail: errorData?.error });
      }
    } catch (error) {
      console.error("Network error:", error);
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
      <h1 className="sr-only">Start a conversation</h1>

      <div className="border-b border-[var(--rule)]">
        <div className="flex items-center gap-4 flex-wrap px-6 py-[18px]">
          <Link
            href="/en"
            className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)] hover:text-[var(--ink)] transition-colors"
          >
            &larr; Back to home
          </Link>
          <span className="mx-auto font-display font-extrabold text-[19px] tracking-[-0.045em]">
            THE GBR<span className="text-[var(--signal)]">.</span>
          </span>
          <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--dim)]">
            Reply within 2 business days
          </span>
        </div>
      </div>

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

      <Rail label={SIDE_LABELS[step]} dark className="flex-1">
        <div className="px-6 py-[clamp(36px,5vw,80px)] sm:pb-[clamp(40px,5vw,90px)]">
          {step === 1 && (
            <p className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] leading-[2] tracking-[0.08em] text-[var(--mid)] max-w-[60ch] mb-[clamp(30px,4vw,52px)]">
              Three steps, about two minutes.
              <br />
              <strong className="font-normal text-[var(--signal)]">
                We don&apos;t take every project — which is why we ask first.
              </strong>
            </p>
          )}

          {step === 1 && (
            <StepFrame n="01" label="The project">
              <h2 className="font-display font-extrabold [font-size:var(--text-svc-title)] tracking-[-0.04em] leading-[1.02] max-w-[20ch] mb-[clamp(24px,3vw,38px)]">
                What are we looking at?
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
                  What are you dealing with, and what does success look like?
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g. We've won a client with a WooCommerce store — 400 products, very slow, needs a full frontend rebuild without downtime. Our team is booked until Q1 and we need someone who can start in September."
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
                    {descriptionReady ? "✓ ready" : `${descriptionRemaining} characters to go`}
                  </span>
                </div>
                <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--dim)] mt-[var(--space-3)]">
                  The more specific, the more useful our answer.
                </div>
              </div>

              <div className="flex justify-end pt-[var(--space-6)] mt-[clamp(30px,3.6vw,50px)] border-t border-[var(--rule)]">
                <Button onClick={nextStep} disabled={!step1Valid}>
                  Next &rarr;
                </Button>
              </div>
            </StepFrame>
          )}

          {step === 2 && (
            <StepFrame n="02" label="Budget">
              <h2 className="font-display font-extrabold [font-size:var(--text-svc-title)] tracking-[-0.04em] leading-[1.02] max-w-[20ch] mb-[clamp(24px,3vw,38px)]">
                What budget are you working with?
              </h2>
              <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch] mb-[var(--space-6)]">
                We ask because it saves us both time. If the budget doesn&apos;t match the work,
                we&apos;d rather say so now than after three calls.
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
                  Timeline (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Q4 2026, or a specific date"
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
                  &larr; Back
                </button>
                <Button onClick={nextStep} disabled={!step2Valid}>
                  Next &rarr;
                </Button>
              </div>
            </StepFrame>
          )}

          {step === 3 && (
            <StepFrame n="03" label="Contact">
              <h2 className="font-display font-extrabold [font-size:var(--text-svc-title)] tracking-[-0.04em] leading-[1.02] max-w-[20ch] mb-[clamp(24px,3vw,38px)]">
                Contact
              </h2>

              <div className="space-y-[var(--space-6)]">
                <div>
                  <label className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-3)]">
                    Your name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    className="w-full bg-transparent border-0 border-b border-[#2C3438] text-[var(--ink)] py-[var(--space-3)] [font-size:var(--text-lg)] focus:outline-none focus:border-b-[var(--signal)]"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-3)]">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Digital"
                    className="w-full bg-transparent border-0 border-b border-[#2C3438] text-[var(--ink)] py-[var(--space-3)] [font-size:var(--text-lg)] focus:outline-none focus:border-b-[var(--signal)]"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-3)]">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full bg-transparent border-0 border-b border-[#2C3438] text-[var(--ink)] py-[var(--space-3)] [font-size:var(--text-lg)] focus:outline-none focus:border-b-[var(--signal)]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-3)]">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+44 20 1234 5678"
                    className="w-full bg-transparent border-0 border-b border-[#2C3438] text-[var(--ink)] py-[var(--space-3)] [font-size:var(--text-lg)] focus:outline-none focus:border-b-[var(--signal)]"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

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
                  <label htmlFor="website">Company website</label>
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

                <div className="grid grid-cols-[18px_1fr_1fr] sm:grid-cols-[18px_1fr] gap-[var(--space-3)] items-start pt-[var(--space-5)] mt-[var(--space-2)] border-t border-[var(--rule)]">
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
                    className="col-span-2 sm:col-span-1 [font-size:var(--text-sm)] text-[var(--mid)] leading-[1.55] cursor-pointer select-none"
                  >
                    I accept the{" "}
                    <Link
                      href="/adatkezeles"
                      target="_blank"
                      className="text-[var(--signal)] hover:text-[var(--ink)] transition-colors underline"
                    >
                      Privacy Notice
                    </Link>{" "}
                    (published in Hungarian), and consent to THE GBR processing the data I&apos;ve
                    provided for the purpose of getting in touch.
                  </label>
                </div>
              </div>

              {isSubmitting && (
                <div className="mt-[var(--space-6)] [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.1em] uppercase text-[var(--signal)] animate-pulse">
                  Sending…
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
                        {submitError.detail} Email us directly:{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-[var(--ink)]">
                          {CONTACT_EMAIL}
                        </a>
                      </>
                    ) : (
                      <>
                        Something went wrong. Try again in a moment — if it still fails, email us
                        directly:{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-[var(--ink)]">
                          {CONTACT_EMAIL}
                        </a>
                      </>
                    )
                  ) : (
                    <>
                      We couldn&apos;t reach the server. Check your connection, or email us
                      directly:{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-[var(--ink)]">
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
                  &larr; Back
                </button>
                <Button onClick={handleSubmit} disabled={!step3Valid || isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </div>
            </StepFrame>
          )}

          {step === 4 && (
            <StepFrame n="✓" label="Done" numeralColor="var(--signal)">
              <h2 className="font-display font-extrabold [font-size:var(--text-svc-title)] tracking-[-0.04em] leading-[1.02] mb-[var(--space-5)]">
                Got it<span className="text-[var(--signal)]">.</span>
              </h2>
              <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch] mb-[var(--space-4)]">
                We&apos;ve sent a confirmation to the address you gave — if it doesn&apos;t arrive
                within a few minutes, check your spam folder.
              </p>
              <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch]">
                We&apos;ll reply within two business days. If anything else comes to mind
                meanwhile, just write:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--signal)] underline">
                  {CONTACT_EMAIL}
                </a>
              </p>

              <div className="border border-[var(--rule)] bg-[var(--panel)] max-w-[520px] mt-[clamp(30px,3.6vw,50px)]">
                <div className="px-[18px] py-[11px] border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)]">
                  Receipt
                </div>
                <div className="px-[18px] py-[16px] [font-family:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--mid)]">
                  <div className="flex justify-between gap-[var(--space-4)] py-[6px]">
                    <span>Received</span>
                    <b className="text-[var(--ink)] font-medium">
                      {submittedAt
                        ? new Intl.DateTimeFormat("en-GB", {
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
                    <span>Reference</span>
                    <b className="text-[var(--ink)] font-medium">
                      {submittedId ? submittedId.slice(0, 8) : (submittedStatus ?? "—")}
                    </b>
                  </div>
                  <div className="flex justify-between gap-[var(--space-4)] py-[6px]">
                    <span>Response</span>
                    <b className="text-[var(--ink)] font-medium">Within 2 business days</b>
                  </div>
                </div>
              </div>

              <div className="pt-[var(--space-6)] mt-[clamp(30px,3.6vw,50px)] border-t border-[var(--rule)]">
                <Link
                  href="/en"
                  className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)] hover:text-[var(--ink)] transition-colors"
                >
                  &larr; Back to home
                </Link>
              </div>
            </StepFrame>
          )}
        </div>
      </Rail>
    </main>
  );
}
