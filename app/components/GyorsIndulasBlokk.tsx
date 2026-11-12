import Link from "next/link";
import { Button, Eyebrow } from "@/app/components/ui";
import { GYORS_INDULAS_PATH, TERMEKEK, formatFt, termekPath } from "@/lib/gyors-indulas";

// Főoldali blokk a fix áras első lépésekhez: mind a hat termék tömören,
// árral és határidővel, egy kattintással a saját aloldalára.
export default function GyorsIndulasBlokk() {
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-8)] grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-[var(--space-6)] lg:gap-[var(--space-16)] items-end">
        <div>
          <Eyebrow>Fix áron · kérdezés nélkül</Eyebrow>
          <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[16ch]">
            Kezdd kicsiben, pontos árral
            <span className="text-[var(--signal)]">.</span>
          </h2>
        </div>
        <p className="[font-size:var(--text-lg)] leading-relaxed text-[var(--ink-2)] max-w-[52ch] m-0">
          Nem kell rögtön nagy projekt. Hat kicsi, rögzített tartalmú munka nettó árral és
          határidővel: kiválasztod, megrendeled, két munkanapon belül jön a díjbekérő.
        </p>
      </div>
      <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--rule)]">
        {TERMEKEK.map((t) => (
          <li
            key={t.id}
            className="group relative border-r border-b border-[var(--rule)] bg-[var(--ground)] hover:bg-[var(--panel)] transition-colors"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-[3px] w-0 bg-[var(--signal)] motion-safe:transition-[width] motion-safe:duration-300 group-hover:w-full"
            />
            <div className="p-[var(--space-6)] flex flex-col h-full">
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.14em] text-[var(--signal-deep)]">
                {t.n} · {t.hatarido}
              </span>
              <h3 className="mt-[var(--space-3)] font-display font-bold [font-size:var(--text-xl)] tracking-[-0.02em] leading-tight flex-1">
                <Link href={termekPath(t.id)} className="after:absolute after:inset-0">
                  {t.name}
                </Link>
              </h3>
              <p className="mt-[var(--space-4)] m-0 flex items-baseline gap-[var(--space-2)]">
                <span className="font-display font-black [font-size:var(--text-2xl)] tracking-[-0.04em] leading-none">
                  {formatFt(t.arNetto)}
                </span>
                <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                  + ÁFA
                </span>
                <span aria-hidden="true" className="ml-auto font-display font-bold text-[var(--signal-deep)]">
                  &rarr;
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="px-6 py-[var(--space-8)]">
        <Button asChild variant="ghost">
          <Link href={GYORS_INDULAS_PATH}>Mind a hat, részletesen &rarr;</Link>
        </Button>
      </div>
    </section>
  );
}
