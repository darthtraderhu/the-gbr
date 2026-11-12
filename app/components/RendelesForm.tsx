"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Field } from "@/app/components/ui";
import type { TermekId } from "@/lib/gyors-indulas";

const CONTACT_EMAIL = "gabor@thegbr.eu";

type Props = {
  termek: TermekId;
  termekNev: string;
  arSzoveg: string;
  noteLabel: string;
  noteHint: string;
};

type Allapot =
  | { kind: "urlap" }
  | { kind: "kuldes" }
  | { kind: "hiba"; uzenet: string }
  | { kind: "kesz"; id: string; at: number };

// Fix áras termék rendelőűrlapja. Sikert csak akkor mutat, ha a szerver
// azonosítóval igazolta, hogy a rendelés bekerült (lib/leads.ts).
export default function RendelesForm({ termek, termekNev, arSzoveg, noteLabel, noteHint }: Props) {
  const [startedAt] = useState(() => Date.now());
  const [adat, setAdat] = useState({
    nev: "",
    ceg: "",
    email: "",
    telefon: "",
    weboldal: "",
    megjegyzes: "",
    website: "",
  });
  const [sajatCeg, setSajatCeg] = useState(false);
  const [adatkezeles, setAdatkezeles] = useState(false);
  const [allapot, setAllapot] = useState<Allapot>({ kind: "urlap" });

  const ervenyes =
    adat.nev.trim() !== "" &&
    adat.ceg.trim() !== "" &&
    adat.email.trim() !== "" &&
    adat.weboldal.trim().length >= 3 &&
    sajatCeg &&
    adatkezeles;

  const set = (mezo: keyof typeof adat) => (e: { target: { value: string } }) =>
    setAdat((a) => ({ ...a, [mezo]: e.target.value }));

  async function kuldes(e: React.FormEvent) {
    e.preventDefault();
    if (!ervenyes || allapot.kind === "kuldes") return;
    setAllapot({ kind: "kuldes" });
    try {
      const res = await fetch("/api/rendeles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          termek,
          nev: adat.nev,
          ceg: adat.ceg,
          email: adat.email,
          telefon: adat.telefon,
          weboldal: adat.weboldal,
          megjegyzes: adat.megjegyzes,
          sajatCeg: true,
          honeypot: adat.website,
          startedAt,
        }),
      });
      const body: unknown = await res.json().catch(() => null);
      const id =
        body && typeof body === "object" && "id" in body && typeof body.id === "string" ? body.id : null;
      if (res.ok && id) {
        setAllapot({ kind: "kesz", id, at: Date.now() });
        return;
      }
      const hiba =
        body && typeof body === "object" && "error" in body && typeof body.error === "string"
          ? body.error
          : "A rendelést nem sikerült rögzíteni.";
      setAllapot({ kind: "hiba", uzenet: hiba });
    } catch {
      setAllapot({ kind: "hiba", uzenet: "Hálózati hiba, a rendelés nem ment el." });
    }
  }

  if (allapot.kind === "kesz") {
    return (
      <div role="status" className="border border-[var(--rule)] bg-[var(--panel)] p-[var(--space-6)] max-w-[620px]">
        <p className="font-display font-extrabold [font-size:var(--text-2xl)] tracking-[-0.03em] leading-tight">
          Megkaptuk a rendelésed<span className="text-[var(--signal)]">.</span>
        </p>
        <p className="mt-[var(--space-3)] [font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)]">
          {termekNev}, {arSzoveg}. Két munkanapon belül küldjük a díjbekérőt. A visszaigazolást
          elküldtük a megadott e-mail-címre; ha pár percen belül nem érkezik meg, nézd meg a spam
          mappát is.
        </p>
        <dl className="mt-[var(--space-5)] [font-family:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--mid)] border-t border-[var(--rule)] pt-[var(--space-4)] grid grid-cols-[auto_1fr] gap-x-[var(--space-4)] gap-y-[var(--space-2)]">
          <dt>Beérkezett</dt>
          <dd className="m-0 text-[var(--ink)]">
            {new Intl.DateTimeFormat("hu-HU", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }).format(allapot.at)}
          </dd>
          <dt>Azonosító</dt>
          <dd className="m-0 text-[var(--ink)] break-all">{allapot.id}</dd>
        </dl>
      </div>
    );
  }

  return (
    <form onSubmit={kuldes} noValidate className="grid gap-[var(--space-5)] max-w-[620px]">
      <div className="grid gap-[var(--space-5)] sm:grid-cols-2">
        <Field label="Neved" autoComplete="name" required value={adat.nev} onChange={set("nev")} />
        <Field label="Cégnév" autoComplete="organization" required value={adat.ceg} onChange={set("ceg")} />
        <Field label="E-mail-cím" type="email" autoComplete="email" required value={adat.email} onChange={set("email")} />
        <Field label="Telefon (nem kötelező)" type="tel" autoComplete="tel" value={adat.telefon} onChange={set("telefon")} />
      </div>
      <Field
        label="A weboldal címe"
        inputMode="url"
        placeholder="ceged.hu"
        required
        value={adat.weboldal}
        onChange={set("weboldal")}
      />
      <Field
        multiline
        label={noteLabel}
        hint={noteHint}
        maxLength={3000}
        value={adat.megjegyzes}
        onChange={set("megjegyzes")}
      />

      {/* Honeypot — CSS-sel elrejtve, csak botok töltik ki. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}
      >
        <label htmlFor={`website-${termek}`}>Cégünk weboldala</label>
        <input
          type="text"
          id={`website-${termek}`}
          tabIndex={-1}
          autoComplete="off"
          value={adat.website}
          onChange={set("website")}
        />
      </div>

      <div className="grid gap-[var(--space-3)] border-t border-[var(--rule)] pt-[var(--space-5)]">
        <label className="grid grid-cols-[18px_1fr] gap-[var(--space-3)] items-start [font-size:var(--text-sm)] text-[var(--ink-2)] leading-[1.55] cursor-pointer">
          <input
            type="checkbox"
            checked={sajatCeg}
            onChange={(e) => setSajatCeg(e.target.checked)}
            className="mt-[3px] w-[16px] h-[16px]"
            style={{ accentColor: "var(--signal)" }}
          />
          <span>A saját cégemre rendelem, vagy olyanra, amelynek a nevében eljárhatok.</span>
        </label>
        <label className="grid grid-cols-[18px_1fr] gap-[var(--space-3)] items-start [font-size:var(--text-sm)] text-[var(--ink-2)] leading-[1.55] cursor-pointer">
          <input
            type="checkbox"
            checked={adatkezeles}
            onChange={(e) => setAdatkezeles(e.target.checked)}
            className="mt-[3px] w-[16px] h-[16px]"
            style={{ accentColor: "var(--signal)" }}
          />
          <span>
            Elfogadom az{" "}
            <Link href="/adatkezeles" target="_blank" className="underline hover:text-[var(--signal-deep)]">
              Adatkezelési Tájékoztatót
            </Link>
            , és hozzájárulok, hogy a THE GBR a megadott adataimat a rendelés teljesítéséhez kezelje.
          </span>
        </label>
      </div>

      {allapot.kind === "hiba" && (
        <p
          role="alert"
          className="pl-[var(--space-4)] [font-size:var(--text-sm)] leading-relaxed"
          style={{ borderLeft: "2px solid var(--attention)", color: "var(--attention)" }}
        >
          {allapot.uzenet} Írj közvetlenül:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-[var(--space-4)]">
        <Button type="submit" disabled={!ervenyes} loading={allapot.kind === "kuldes"}>
          Megrendelem · {arSzoveg}
        </Button>
        <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)]">
          Díjbekérő 2 munkanapon belül · nincs kártyás fizetés
        </span>
      </div>
    </form>
  );
}
