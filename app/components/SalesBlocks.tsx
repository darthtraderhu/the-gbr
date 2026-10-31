import Link from "next/link";
import type { EcoStage, ServiceId } from "@/lib/okoszisztema";
import { Eyebrow } from "@/app/components/ui";

// Értékesítési szemszögű építőelemek a szolgáltatásoldalakhoz, az
// /arzenalhoz és a főoldalhoz. Az oldal maga a referencia arra, mit kap az
// ügyfél: szürke felsorolás helyett összevetés, ábra, számozott kártyák.

export type Fact = { value: string; label: string };
export type AngleRow = { usual: string; ours: string };
export type Feature = { title: string; body: string };

// Hero alatti tényszalag: három rövid, ellenőrizhető állítás.
export function FactStrip({ facts }: { facts: Fact[] }) {
  return (
    <dl className="m-0 grid grid-cols-1 sm:grid-cols-3 border-t border-[var(--rule)]">
      {facts.map((fact, i) => (
        <div
          key={fact.label}
          className={`px-6 py-[var(--space-6)] border-b sm:border-b-0 border-[var(--rule)] ${
            i < facts.length - 1 ? "sm:border-r" : ""
          }`}
        >
          <dt className="font-display font-black [font-size:var(--text-4xl)] leading-none tracking-[-0.045em] text-[var(--ink)]">
            {fact.value}
            <span className="text-[var(--signal)]">.</span>
          </dt>
          <dd className="m-0 mt-[var(--space-3)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)] max-w-[30ch] leading-relaxed">
            {fact.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

// „Ahol a piac megáll, ott kezdünk” — a szolgáltatás saját szöge, a szokásos
// megoldással szemben. Bal oldalt áthúzva a szokásos, jobbra a mienk.
export function AngleTable({
  eyebrow,
  title,
  usualLabel,
  oursLabel,
  rows,
}: {
  eyebrow: string;
  title: string;
  usualLabel: string;
  oursLabel: string;
  rows: AngleRow[];
}) {
  return (
    <>
      <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-8)]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[16ch] text-[var(--ink)]">
          {title}
        </h2>
      </section>
      <div className="hidden md:grid grid-cols-[1fr_48px_1.15fr] gap-[var(--space-6)] px-6 py-3 border-t border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase">
        <span className="text-[var(--dim)]">{usualLabel}</span>
        <span />
        <span className="text-[var(--signal)]">{oursLabel}</span>
      </div>
      <ol className="m-0 p-0 list-none border-t border-[var(--rule)]">
        {rows.map((row) => (
          <li
            key={row.ours}
            className="group grid grid-cols-1 md:grid-cols-[1fr_48px_1.15fr] gap-[var(--space-3)] md:gap-[var(--space-6)] items-baseline px-6 py-[var(--space-6)] border-b border-[var(--rule)] transition-colors hover:bg-[var(--panel)]"
          >
            <p className="m-0 [font-size:var(--text-lg)] leading-snug text-[var(--mid)] line-through decoration-[var(--rule-strong)] decoration-1">
              <span className="md:hidden [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase no-underline inline-block mr-2 text-[var(--dim)]">
                {usualLabel}:
              </span>
              {row.usual}
            </p>
            <span
              aria-hidden="true"
              className="hidden md:block font-display font-black [font-size:var(--text-2xl)] text-[var(--signal)] transition-transform motion-safe:group-hover:translate-x-1"
            >
              &rarr;
            </span>
            <p className="m-0 font-display font-bold [font-size:var(--text-2xl)] leading-[1.15] tracking-[-0.02em] text-[var(--ink)]">
              {row.ours}
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}

// Számozott kártyarács: mit szállítunk le. Cím + egy mondat, nem szürke sor.
export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--rule)]">
      {features.map((feat, i) => (
        <li
          key={feat.title}
          className="group relative p-[var(--space-6)] border-r border-b border-[var(--rule)] bg-[var(--ground)] hover:bg-[var(--panel)] transition-colors"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-[3px] w-0 bg-[var(--signal)] motion-safe:transition-[width] motion-safe:duration-300 group-hover:w-full"
          />
          <span className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.14em] text-[var(--signal-deep)]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-[var(--space-3)] font-display font-bold [font-size:var(--text-xl)] tracking-[-0.02em] leading-tight text-[var(--ink)]">
            {feat.title}
          </h3>
          <p className="mt-[var(--space-2)] [font-size:var(--text-sm)] leading-relaxed text-[var(--ink-2)]">
            {feat.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

// Az értékesítési ökoszisztéma ábrája: öt szakasz, szakaszonként a hozzá
// tartozó szolgáltatások. Az aktív szolgáltatás szakasza ki van emelve.
export function Okoszisztema({
  stages,
  active,
  eyebrow,
  title,
  lead,
  note,
  youAreHere,
}: {
  stages: EcoStage[];
  active?: ServiceId;
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  note?: string;
  youAreHere?: string;
}) {
  return (
    <div>
      <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-10)] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[var(--space-8)] lg:gap-[var(--space-16)] items-end">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.92] tracking-[-0.052em] max-w-[13ch] text-[var(--ink)]">
            {title}
          </h2>
        </div>
        <p className="[font-size:var(--text-lg)] leading-relaxed text-[var(--ink-2)] max-w-[52ch]">
          {lead}
        </p>
      </section>
      <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-5 border-t border-[var(--rule)]">
        {stages.map((stage, i) => {
          const isActive = active ? stage.links.some((l) => l.id === active) : false;
          return (
            <li
              key={stage.n}
              className={`relative flex flex-col p-[var(--space-6)] border-b md:border-b-0 border-[var(--rule)] ${
                i < stages.length - 1 ? "md:border-r" : ""
              } ${isActive ? "bg-[var(--panel)]" : ""}`}
            >
              {isActive && (
                <span aria-hidden="true" className="absolute left-0 top-0 h-[4px] w-full bg-[var(--signal)]" />
              )}
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`font-display font-black [font-size:var(--text-numeral-lg)] leading-[0.8] tracking-[-0.06em] ${
                    isActive ? "text-[var(--signal)]" : "text-[var(--rule)]"
                  }`}
                >
                  {stage.n}
                </span>
                {i < stages.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden md:block [font-family:var(--font-mono)] text-[length:var(--text-sm)] text-[var(--rule-strong)]"
                  >
                    &rarr;
                  </span>
                )}
              </div>
              <h3 className="mt-[var(--space-5)] font-display font-extrabold [font-size:var(--text-2xl)] tracking-[-0.025em] leading-tight text-[var(--ink)]">
                {stage.name}
              </h3>
              <p className="mt-[var(--space-2)] [font-size:var(--text-sm)] leading-relaxed text-[var(--ink-2)] flex-1">
                {stage.body}
              </p>
              <ul className="m-0 mt-[var(--space-5)] p-0 list-none flex flex-wrap gap-2">
                {stage.links.map((link) => {
                  const here = link.id === active;
                  return (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        aria-current={here ? "page" : undefined}
                        className={`inline-block px-2.5 py-1.5 border [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.12em] uppercase transition-colors ${
                          here
                            ? "bg-[var(--ink)] text-[var(--ground)] border-[var(--ink)]"
                            : "border-[var(--rule-strong)] text-[var(--ink-2)] hover:border-[var(--signal)] hover:text-[var(--ink)]"
                        }`}
                      >
                        {link.label}
                        {here && youAreHere ? ` · ${youAreHere}` : ""}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
      {note && (
        <p className="px-6 py-[var(--space-5)] border-t border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
          {note}
        </p>
      )}
    </div>
  );
}
