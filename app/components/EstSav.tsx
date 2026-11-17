"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

type Props = {
  nev: string;
  // Kiírt dátum („2026. november 20.”) és ugyanez ÉÉÉÉ-HH-NN alakban.
  datum: string | null;
  datumIso: string | null;
  // Az ajándék határideje (ÉÉÉÉ-HH-NN): utána a sáv eltűnik.
  hatarido: string;
  href: string;
};

// A mai nap a böngészőben, budapesti idő szerint. Szerveren null: a statikus
// HTML az est előtti szöveget viszi, a böngésző hidratáláskor igazít.
const nincsFeliratkozas = () => () => {};
function maiNap(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Budapest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// Vékony, kattintható sáv a magyar oldalak tetején az AI demo esthez
// (lib/ai-est.ts). A layout csak akkor rendereli, ha be van kapcsolva.
// Az /init fókuszált folyamatán és magukon az est oldalain nem jelenik meg.
export default function EstSav({ nev, datum, datumIso, hatarido, href }: Props) {
  const pathname = usePathname();
  const ma = useSyncExternalStore(nincsFeliratkozas, maiNap, () => null);
  if (pathname === "/init" || pathname?.startsWith(href)) return null;
  if (ma && ma > hatarido) return null;
  const utana = Boolean(ma && datumIso && ma > datumIso);

  return (
    <Link
      href={href}
      data-theme="dark"
      className="est-sav group relative z-[60] flex items-center justify-center gap-[var(--space-3)] bg-[var(--ground)] text-[var(--ink)] border-b border-[var(--rule)] px-4 py-[9px] [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.08em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--signal)]"
    >
      <span aria-hidden="true" className="est-sav-pont inline-block w-[7px] h-[7px] rounded-full bg-[var(--signal)] shrink-0" />
      {utana ? (
        <span className="truncate text-[var(--ink-2)]">
          Lemaradtál az <span className="text-[var(--signal)]">{nev}</span>ről?
          <span className="hidden sm:inline"> Nézd meg a bemutatót</span>
        </span>
      ) : (
        <span className="truncate">
          <span className="uppercase text-[var(--signal)]">{nev}</span>
          {datum && <span className="text-[var(--ink-2)]"> · {datum}</span>}
          <span className="hidden sm:inline text-[var(--ink-2)]"> · Nézd meg a bemutatót, és kérd az ajándék átvilágítást</span>
          <span className="sm:hidden text-[var(--ink-2)]"> · Bemutató és ajándék</span>
        </span>
      )}
      <span
        aria-hidden="true"
        className="text-[var(--signal)] transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none"
      >
        →
      </span>
    </Link>
  );
}
