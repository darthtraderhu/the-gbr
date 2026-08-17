"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Rail, Eyebrow } from "@/app/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Rendszerhiba:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[var(--ground)] text-[var(--ink)] font-body">
      <Rail label="Hiba" dark>
        <section className="min-h-[78vh] flex items-center px-6 py-[clamp(48px,6vw,100px)]">
          <div className="w-full">
            <Eyebrow>Váratlan hiba</Eyebrow>
            <div className="font-display font-black leading-[0.8] tracking-[-0.07em] [font-size:var(--text-error-code)] text-[var(--rule)]">
              5<span className="text-[var(--signal)]">0</span>0
            </div>
            <h2 className="font-display font-extrabold [font-size:var(--text-error-h2)] leading-[1.02] tracking-[-0.042em] max-w-[18ch] mt-[var(--space-8)] mb-[var(--space-5)] text-[var(--ink)]">
              Rendszerhiba <span className="text-[var(--signal)]">történt</span>.
            </h2>
            <p className="[font-size:var(--text-lg)] leading-relaxed text-[var(--ink-2)] max-w-[52ch] mb-[var(--space-8)]">
              Valami elromlott a háttérben. A csapat automatikusan értesítést kap róla — próbáld
              újra.
            </p>
            <div className="flex flex-wrap gap-[var(--space-3)]">
              <button
                type="button"
                onClick={() => reset()}
                className="font-display font-bold text-[14px] px-6 py-[14px] bg-[var(--signal)] text-[#101400] border border-[var(--signal)] hover:bg-[var(--signal-deep)] hover:border-[var(--signal-deep)] transition-colors"
              >
                Újratöltés
              </button>
              <Link
                href="/"
                className="font-display font-bold text-[14px] px-6 py-[14px] bg-transparent text-[var(--ink)] border border-[var(--rule-strong)] hover:border-[var(--ink)] transition-colors"
              >
                Vissza a főoldalra
              </Link>
            </div>
          </div>
        </section>

        {error.digest && (
          <div className="border-t border-[var(--rule)] mt-[clamp(40px,5vw,70px)]">
            <div className="px-6 py-[11px] border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)]">
              Hibaazonosító — ezt add meg, ha írsz
            </div>
            <div className="px-6 py-[var(--space-5)] [font-family:var(--font-mono)] text-[13px] tracking-[0.2em] text-[var(--signal)]">
              {error.digest}
            </div>
          </div>
        )}
      </Rail>
    </main>
  );
}
