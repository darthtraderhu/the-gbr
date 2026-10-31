import Link from "next/link";
import { Rail } from "@/app/components/ui";
import type { TocItem } from "@/lib/article-toc";

// A cikk törzse, HU és EN közös váza. Széles kijelzőn a jobb oldali üres
// sáv helyett tapadó tartalomjegyzék a cikk valódi h2-szakaszaiból.

const TEXT = {
  hu: { rail: "Tartalom", toc: "Ebben az írásban", read: "olvasás", back: "Vissza az írásokhoz" },
  en: { rail: "Content", toc: "In this article", read: "read", back: "Back to writing" },
} as const;

export default function ArticleBody({
  html,
  toc,
  readTime,
  backHref,
  locale,
  children,
}: {
  html: string;
  toc: TocItem[];
  readTime: string;
  backHref: string;
  locale: "hu" | "en";
  children?: React.ReactNode;
}) {
  const t = TEXT[locale];
  return (
    <Rail label={t.rail}>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] gap-x-[clamp(32px,5vw,96px)] px-6 py-[clamp(44px,5.4vw,86px)]">
        <article
          className="prose-gbr prose-article min-w-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <aside className="hidden lg:block">
          <div className="sticky top-[110px] border-t-[3px] border-[var(--signal)] pt-[var(--space-5)]">
            <p className="font-display font-black [font-size:var(--text-4xl)] leading-none tracking-[-0.05em] m-0">
              {readTime}
            </p>
            <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mt-[var(--space-2)] mb-[var(--space-6)]">
              {t.read}
            </p>
            {toc.length > 1 && (
              <nav aria-label={t.toc}>
                <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-3)]">
                  {t.toc}
                </p>
                <ol className="m-0 p-0 list-none border-t border-[var(--rule)]">
                  {toc.map((item, i) => (
                    <li key={item.id} className="border-b border-[var(--rule)]">
                      <a
                        href={`#${item.id}`}
                        className="group grid grid-cols-[28px_1fr] gap-2 py-[10px] font-display font-semibold [font-size:var(--text-sm)] leading-snug text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors"
                      >
                        <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] font-normal pt-[3px] text-[var(--signal-deep)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <Link
              href={backHref}
              className="inline-block mt-[var(--space-6)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase text-[var(--mid)] hover:text-[var(--signal-deep)] transition-colors"
            >
              &larr; {t.back}
            </Link>
          </div>
        </aside>
      </div>
      {children}
    </Rail>
  );
}
