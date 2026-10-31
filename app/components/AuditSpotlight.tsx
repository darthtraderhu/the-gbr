import Link from "next/link";
import { Button } from "@/app/components/ui";
import { FactStrip, type Fact } from "@/app/components/SalesBlocks";

// A főoldali átvilágítás-kiemelés (HU és EN): a szolgáltatás belépési pontja,
// ezért közvetlenül a hero után áll. Fejezetenként egy valós, anonimizált
// találat — a teljes lista a szolgáltatás saját oldalán van.
export type SpotlightChapter = { n: string; title: string; finding: string; cost: string };

export default function AuditSpotlight({
  kicker,
  headline,
  lead,
  facts,
  chapters,
  findingsLabel,
  closer,
  primary,
  secondary,
}: {
  kicker: string;
  headline: string;
  lead: string;
  facts: Fact[];
  chapters: SpotlightChapter[];
  findingsLabel: string;
  closer: { title: string; body: string };
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <section id="atvilagitas" aria-labelledby="atvilagitas-cim" className="scroll-mt-24">
      <div className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-20)] pb-[var(--space-10)]">
        <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.24em] uppercase text-[var(--mid)] flex items-center gap-3 mb-[var(--space-6)]">
          <span className="w-1.5 h-1.5 bg-[var(--signal)] block motion-safe:animate-pulse" />
          {kicker}
        </p>
        <h2
          id="atvilagitas-cim"
          className="font-display font-black [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[18ch] text-[var(--ink)]"
        >
          {headline}
          <span className="text-[var(--signal)]">.</span>
        </h2>
        <p className="[font-size:var(--text-lg)] leading-relaxed text-[var(--ink-2)] max-w-[60ch] mt-[var(--space-6)]">
          {lead}
        </p>
        <div className="flex flex-wrap items-center gap-x-[var(--space-5)] gap-y-3 mt-[var(--space-8)]">
          <Button asChild>
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          <Link
            href={secondary.href}
            className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.16em] uppercase text-[var(--ink)] border-b-2 border-[var(--signal)] pb-1"
          >
            {secondary.label} &rarr;
          </Link>
        </div>
      </div>

      <FactStrip facts={facts} />

      <p className="m-0 px-6 py-3.5 border-t border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)]">
        {findingsLabel}
      </p>
      <ol className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[var(--rule)]">
        {chapters.map((c) => (
          <li
            key={c.n}
            className="px-6 py-[var(--space-8)] border-b border-[var(--rule)] sm:border-r flex flex-col gap-[var(--space-3)]"
          >
            <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] text-[var(--signal)]">
              {c.n}
            </span>
            <h3 className="m-0 font-display font-bold [font-size:var(--text-lg)] leading-[1.15] tracking-[-0.02em] text-[var(--ink)]">
              {c.title}
            </h3>
            <p className="m-0 [font-size:var(--text-sm)] leading-relaxed text-[var(--ink-2)]">
              <span aria-hidden="true" className="text-[var(--mid)] mr-2">
                &times;
              </span>
              {c.finding}
            </p>
            <p className="m-0 [font-size:var(--text-sm)] leading-relaxed text-[var(--mid)]">{c.cost}</p>
          </li>
        ))}
        <li className="px-6 py-[var(--space-8)] border-b border-[var(--rule)] bg-[var(--signal)] text-[#101400] flex flex-col justify-between gap-[var(--space-6)]">
          <div>
            <h3 className="m-0 font-display font-black [font-size:var(--text-xl)] leading-[1.05] tracking-[-0.03em]">
              {closer.title}
            </h3>
            <p className="m-0 mt-[var(--space-3)] [font-size:var(--text-sm)] leading-relaxed">{closer.body}</p>
          </div>
          <Link
            href={primary.href}
            className="self-start font-display font-bold text-[13px] px-[17px] py-[10px] bg-[#101400] text-[var(--signal)] hover:opacity-90 transition-opacity"
          >
            {primary.label}
          </Link>
        </li>
      </ol>
    </section>
  );
}
