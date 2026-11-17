"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  nev: string;
  datum: string | null;
  href: string;
};

// Vékony, kattintható sáv a magyar oldalak tetején az AI demo esthez
// (lib/ai-est.ts). A layout csak akkor rendereli, ha be van kapcsolva.
// Az /init fókuszált folyamatán és magukon az est oldalain nem jelenik meg.
export default function EstSav({ nev, datum, href }: Props) {
  const pathname = usePathname();
  if (pathname === "/init" || pathname?.startsWith(href)) return null;

  return (
    <Link
      href={href}
      data-theme="dark"
      className="est-sav group relative z-[60] flex items-center justify-center gap-[var(--space-3)] bg-[var(--ground)] text-[var(--ink)] border-b border-[var(--rule)] px-4 py-[9px] [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.08em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--signal)]"
    >
      <span aria-hidden="true" className="est-sav-pont inline-block w-[7px] h-[7px] rounded-full bg-[var(--signal)] shrink-0" />
      <span className="truncate">
        <span className="uppercase text-[var(--signal)]">{nev}</span>
        {datum && <span className="text-[var(--ink-2)]"> · {datum}</span>}
        <span className="hidden sm:inline text-[var(--ink-2)]"> · Nézd meg a bemutatót, és kérd az ajándék átvilágítást</span>
        <span className="sm:hidden text-[var(--ink-2)]"> · Bemutató és ajándék</span>
      </span>
      <span
        aria-hidden="true"
        className="text-[var(--signal)] transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none"
      >
        →
      </span>
    </Link>
  );
}
