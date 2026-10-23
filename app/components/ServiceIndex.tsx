import Link from "next/link";
import { Eyebrow } from "@/app/components/ui";

// Főoldali szolgáltatás-index: mind a kilenc /arzenal (EN: /en/services)
// szekció egy-egy linkként. Az elemek a lib/site-links.ts listáiból jönnek,
// így egy új szolgáltatás a menüvel együtt itt is megjelenik.
export interface ServiceIndexItem {
  id: string;
  n: string;
  name: string;
  headline: string;
}

export default function ServiceIndex({
  eyebrow,
  lead,
  items,
  basePath,
}: {
  eyebrow: string;
  lead: string;
  items: ServiceIndexItem[];
  basePath: string;
}) {
  return (
    <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-16)] pb-[var(--space-12)] sm:pb-[var(--space-16)]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[46ch] mb-[var(--space-8)]">
        {lead}
      </p>
      <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[var(--rule)]">
        {items.map((item) => (
          <li key={item.id} className="border-r border-b border-[var(--rule)]">
            <Link
              href={`${basePath}#${item.id}`}
              className="group flex h-full flex-col gap-[var(--space-3)] p-[var(--space-5)] hover:bg-[var(--panel)] transition-colors"
            >
              <span className="flex items-center justify-between [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase text-[var(--mid)]">
                <span className="group-hover:text-[var(--signal-deep)] transition-colors">
                  {item.n}
                </span>
                <span
                  aria-hidden="true"
                  className="text-[var(--rule-strong)] group-hover:text-[var(--signal)] transition-colors"
                >
                  &rarr;
                </span>
              </span>
              <h3 className="font-display font-bold [font-size:var(--text-xl)] tracking-[-0.02em] leading-tight text-[var(--ink)]">
                {item.name}
              </h3>
              <p className="[font-size:var(--text-sm)] leading-relaxed text-[var(--ink-2)]">
                {item.headline}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
