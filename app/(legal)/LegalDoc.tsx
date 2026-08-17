import Link from "next/link";
import type { getLegalDoc } from "@/lib/legal";
import { Rail, Seam, Eyebrow } from "@/app/components/ui";

type Doc = Awaited<ReturnType<typeof getLegalDoc>>;

const LEGAL_DOCS = [
  { slug: "adatkezeles", label: "Adatkezelés" },
  { slug: "cookie-tajekoztato", label: "Cookie-tájékoztató" },
  { slug: "ai-tajekoztato", label: "AI-használat" },
  { slug: "szolgaltatasi-feltetelek", label: "Szolgáltatási feltételek" },
  { slug: "impresszum", label: "Impresszum" },
];

function getCrossLinks(currentSlug: string) {
  const currentIndex = LEGAL_DOCS.findIndex((d) => d.slug === currentSlug);
  const rest = LEGAL_DOCS.filter((d) => d.slug !== currentSlug);
  const next = LEGAL_DOCS[(currentIndex + 1) % LEGAL_DOCS.length];
  const related = rest.filter((d) => d.slug !== next.slug);
  return [{ ...next, kind: "Következő" }, ...related.map((d) => ({ ...d, kind: "Kapcsolódó" }))];
}

export default function LegalDoc({ doc }: { doc: Doc }) {
  const displayTitle = doc.title.replace(/\s*\|\s*THE GBR\s*$/, "");
  const crossLinks = getCrossLinks(doc.slug);

  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      {/* ===== SÖTÉT FEJLÉC ===== */}
      <Rail label="Jogi" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-6)] sm:pb-[var(--space-8)]">
          <Eyebrow>Jogi dokumentum</Eyebrow>
          <h1 className="font-display font-extrabold leading-[0.96] tracking-[-0.05em] [font-size:var(--text-legal-h1)] max-w-[16ch]">
            {displayTitle}
            <span className="text-[var(--signal)]">.</span>
          </h1>
        </section>
        {doc.meta.length > 0 && (
          <div
            className={`grid grid-cols-1 ${
              doc.meta.length === 3
                ? "sm:grid-cols-3"
                : doc.meta.length === 2
                  ? "sm:grid-cols-2"
                  : "sm:grid-cols-1"
            } border-t border-[var(--rule)]`}
          >
            {doc.meta.map((m, i) => (
              <div
                key={m.label}
                className={`px-6 py-[var(--space-4)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--dim)] ${
                  i < doc.meta.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""
                } border-[var(--rule)]`}
              >
                {m.label}
                <b className="block text-[var(--ink)] font-medium normal-case tracking-normal text-[11.5px] mt-[var(--space-2)] [font-family:var(--font-mono)]">
                  {m.value}
                </b>
              </div>
            ))}
          </div>
        )}
      </Rail>

      <Seam />

      {/* ===== TARTALOMJEGYZÉK + SZÖVEG ===== */}
      <Rail label="Tartalom">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,24%)_1fr]">
          <nav className="border-b lg:border-b-0 lg:border-r border-[var(--rule)] px-6 lg:px-[clamp(20px,2vw,28px)] py-[clamp(30px,3.4vw,50px)]">
            <div className="lg:sticky lg:top-16">
              <h4 className="[font-family:var(--font-mono)] text-[length:9.5px] tracking-[0.2em] uppercase text-[var(--mid)] font-normal mb-[var(--space-4)]">
                Tartalom
              </h4>
              {doc.toc.map((entry, i) => (
                <a
                  key={entry.id}
                  href={`#${entry.id}`}
                  className={`grid grid-cols-[24px_1fr] gap-[var(--space-2)] py-[var(--space-2)] [font-size:13.5px] text-[var(--ink-2)] leading-[1.35] hover:text-[var(--signal-deep)] transition-colors ${
                    i > 0 ? "border-t border-[var(--rule-soft)]" : ""
                  }`}
                >
                  <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] text-[var(--mid)]">
                    {entry.number}
                  </span>
                  <span>{entry.title}</span>
                </a>
              ))}
            </div>
          </nav>

          <div className="px-6 py-[clamp(30px,3.6vw,58px)]">
            <article
              className="prose-gbr prose-legal"
              dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 border-t border-[var(--rule)]">
          {crossLinks.map((link, i) => (
            <Link
              key={link.slug}
              href={`/${link.slug}`}
              className={`px-6 py-[var(--space-6)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase text-[var(--mid)] hover:bg-[var(--panel)] hover:text-[var(--ink)] transition-colors border-[var(--rule)] ${
                i < crossLinks.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""
              }`}
            >
              {link.kind}
              <b className="block font-body text-[15px] normal-case tracking-normal text-[var(--ink)] font-semibold mt-[var(--space-2)]">
                {link.label}
              </b>
            </Link>
          ))}
        </div>
      </Rail>
    </main>
  );
}
