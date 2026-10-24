import Image from "next/image";

// Oldalképek egy valódi dizájnajánlásból. Az ügyfél nevét, a termékneveket és
// az árakat a képeken kitakartuk; ha egy ügyfél hozzájárul a nevesített
// bemutatáshoz, ugyanezzel a komponenssel mellé tehető a teljes anyag is.
export type ProposalPage = {
  src: string;
  alt: string;
  caption: string;
};

export default function ProposalSample({
  intro,
  pages,
  openLabel,
}: {
  intro: React.ReactNode;
  pages: ProposalPage[];
  openLabel: string;
}) {
  return (
    <div>
      <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed max-w-[60ch]">
        {intro}
      </p>
      <ul className="mt-[var(--space-6)] -mx-6 px-6 flex gap-[var(--space-4)] overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-[var(--space-2)] lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible">
        {pages.map((page, i) => (
          <li key={page.src} className="snap-start shrink-0 w-[62%] sm:w-[38%] lg:w-auto">
            <a
              href={page.src}
              target="_blank"
              rel="noopener"
              aria-label={`${page.alt} — ${openLabel}`}
              className="block border border-[var(--rule)] bg-[var(--ground)] hover:border-[var(--ink)] focus-visible:border-[var(--ink)] transition-colors motion-reduce:transition-none"
            >
              <Image
                src={page.src}
                alt={page.alt}
                width={1242}
                height={1756}
                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 38vw, 62vw"
                className="w-full h-auto"
              />
            </a>
            <div className="mt-[var(--space-2)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--mid)]">
              <span className="text-[var(--dim)]">{String(i + 1).padStart(2, "0")}</span>{" "}
              {page.caption}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
