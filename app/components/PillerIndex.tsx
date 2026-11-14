import Link from "next/link";
import { Eyebrow } from "@/app/components/ui";
import { PILLEREK, pillerSzekciok } from "@/lib/site-links";

// Főoldali szolgáltatás-index a pozicionálás szerint: három pillér
// (Átvilágítás → Rendszer → Felület) és a kiegészítő szolgáltatások. A
// szolgáltatások a lib/site-links.ts listáiból jönnek, így a menüvel együtt
// változnak.
export default function PillerIndex({ eyebrow, lead }: { eyebrow: string; lead: string }) {
  const fo = PILLEREK.filter((p) => p.id !== "kiegeszito");
  const extra = PILLEREK.find((p) => p.id === "kiegeszito");

  return (
    <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-16)] pb-[var(--space-12)] sm:pb-[var(--space-16)]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[52ch] mb-[var(--space-8)]">
        {lead}
      </p>

      <ol className="m-0 p-0 list-none grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[auto_auto] border-t border-l border-[var(--rule)]">
        {fo.map((p) => (
          <li key={p.id} className="border-r border-b border-[var(--rule)] flex flex-col lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:gap-0">
            <div className="p-[var(--space-6)] flex flex-col gap-[var(--space-3)] grow">
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase text-[var(--mid)]">
                {p.n}
                <span className="text-[var(--signal)]"> · </span>
                {p.id === "atvilagitas" ? "Belépő" : p.id === "rendszer" ? "A fő termék" : "Ami a rendszert eteti"}
              </span>
              <h3 className="font-display font-black [font-size:var(--text-3xl)] tracking-[-0.04em] leading-none text-[var(--ink)]">
                {p.name}
                <span className="text-[var(--signal)]">.</span>
              </h3>
              <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)]">{p.lead}</p>
              <Link
                href={p.href}
                className="mt-auto pt-[var(--space-2)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--ink)] hover:text-[var(--signal-deep)] transition-colors"
              >
                {p.linkLabel} &rarr;
              </Link>
            </div>
            <ul className="m-0 p-0 list-none border-t border-[var(--rule)] self-start w-full">
              {pillerSzekciok(p).map((s) => (
                <li key={s.id} className="border-b border-[var(--rule)] last:border-b-0">
                  <Link
                    href={s.href}
                    className="group flex items-center justify-between gap-3 px-[var(--space-6)] py-[var(--space-3)] hover:bg-[var(--panel)] transition-colors"
                  >
                    <span className="[font-size:var(--text-sm)] text-[var(--ink-2)] group-hover:text-[var(--ink)]">
                      {s.name}
                    </span>
                    <span aria-hidden="true" className="text-[var(--rule-strong)] group-hover:text-[var(--signal)] transition-colors">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      {extra && (
        <div className="mt-[var(--space-6)] flex flex-col sm:flex-row sm:items-baseline gap-[var(--space-2)] sm:gap-[var(--space-6)]">
          <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase text-[var(--mid)] shrink-0">
            {extra.name}
          </span>
          <p className="[font-size:var(--text-sm)] leading-relaxed text-[var(--ink-2)]">
            {pillerSzekciok(extra).map((s, i) => (
              <span key={s.id}>
                {i > 0 && ", "}
                <Link href={s.href} className="underline decoration-[var(--rule-strong)] underline-offset-4 hover:decoration-[var(--signal)]">
                  {s.name}
                </Link>
              </span>
            ))}
            . {extra.lead}
          </p>
        </div>
      )}
    </section>
  );
}
