"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";
import { FactStrip } from "@/app/components/SalesBlocks";
import { formatHungarianDate } from "@/lib/date";

// Az írások listaoldala, HU és EN közös váza. Nem szürke címlista: a
// legfrissebb írás lime blokkban, a következő kettő kártyán, a többi
// sorszámozott sorban, mindegyiknél olvasható méretű kivonattal.

export type IndexPost = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category?: string;
  readTime: string;
};

type Locale = "hu" | "en";

const TEXT = {
  hu: {
    rail: "Írások",
    heading: (
      <>
        Amit közben
        <br />
        megtanulunk<span className="text-[var(--signal)]">.</span>
      </>
    ),
    lead: "Nem tartalomgyár. Amit leírunk, azt előbb megcsináltuk.",
    fallback: "Általános",
    all: "Mind",
    filterLabel: "Szűrés témakör szerint",
    factPosts: "megjelent írás",
    factTopics: "témakör",
    factMinutes: "perc olvasnivaló",
    latest: "Legfrissebb",
    newest: "Friss",
    read: "Elolvasom",
    readSuffix: "olvasás",
    listRail: "Összes",
    moreRail: "Továbbiak",
    loadMore: "Régebbi írások betöltése",
    empty: "Ebben a témakörben még nincs írás.",
    ctaRail: "Kapcsolat",
    ctaEyebrow: "Kapcsolat",
    ctaTitle: "Hasonló problémád van?",
    ctaBody:
      "Írd le, mit szeretnél elérni, és két munkanapon belül válaszolunk. Ha nem illünk össze, azt is megmondjuk.",
    ctaButton: "Pitcheld el a projekted",
    ctaHref: "/init",
    ctaMail: "Vagy írj közvetlenül: gabor@thegbr.eu",
    basePath: "/hirek",
  },
  en: {
    rail: "Writing",
    heading: (
      <>
        Writing<span className="text-[var(--signal)]">.</span>
      </>
    ),
    lead: "Not a content mill. What we write about, we did first — on our own site or in a client project.",
    fallback: "Writing",
    all: "All",
    filterLabel: "Filter by topic",
    factPosts: "articles published",
    factTopics: "topics",
    factMinutes: "minutes of reading",
    latest: "Latest",
    newest: "Recent",
    read: "Read it",
    readSuffix: "read",
    listRail: "All",
    moreRail: "More",
    loadMore: "Load older articles",
    empty: "No articles in this topic yet.",
    ctaRail: "Contact",
    ctaEyebrow: "Similar problem?",
    ctaTitle: "Let's see where you stand",
    ctaBody:
      "You'll get a list of what's missing at the end of the assessment — even if you don't continue with us. We reply within two business days.",
    ctaButton: "Get started",
    ctaHref: "/en/contact",
    ctaMail: "Or email directly: gabor@thegbr.eu",
    basePath: "/en/writing",
  },
} as const;

const PAGE_SIZE = 8;

function formatDate(iso: string, locale: Locale): string {
  if (locale === "hu") return formatHungarianDate(iso);
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(date);
}

function minutesOf(readTime: string): number {
  const n = parseInt(readTime, 10);
  return Number.isFinite(n) ? n : 0;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function ArticleIndex({ posts, locale }: { posts: IndexPost[]; locale: Locale }) {
  const t = TEXT[locale];
  const [active, setActive] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categoryOf = (post: IndexPost) => post.category || t.fallback;

  // Sorszám = megjelenési sorrend (a legelső írás az 01). Szűréskor is marad.
  const numberOf = new Map(posts.map((post, i) => [post.id, posts.length - i]));

  const categoryCounts = new Map<string, number>();
  posts.forEach((post) => {
    const cat = categoryOf(post);
    categoryCounts.set(cat, (categoryCounts.get(cat) ?? 0) + 1);
  });
  const categories = Array.from(categoryCounts.entries()).sort((a, b) => b[1] - a[1]);
  const totalMinutes = posts.reduce((sum, post) => sum + minutesOf(post.readTime), 0);

  const filtered = active ? posts.filter((post) => categoryOf(post) === active) : posts;
  const [featured, ...rest] = filtered;
  const cards = rest.slice(0, 2);
  const listed = rest.slice(2);
  const visibleList = listed.slice(0, visibleCount);
  const hasMore = listed.length > visibleCount;

  const selectCategory = (value: string | null) => {
    setActive(value);
    setVisibleCount(PAGE_SIZE);
  };

  const href = (post: IndexPost) => `${t.basePath}/${post.id}`;

  const chip = (label: string, count: number, value: string | null) => {
    const on = active === value;
    return (
      <button
        key={label}
        type="button"
        aria-pressed={on}
        onClick={() => selectCategory(value)}
        className={`inline-flex items-center gap-[10px] border px-[14px] py-[10px] font-display font-semibold [font-size:var(--text-sm)] tracking-[-0.01em] transition-colors ${
          on
            ? "bg-[var(--signal)] border-[var(--signal)] text-[var(--on-signal)]"
            : "border-[var(--rule)] text-[var(--ink-2)] hover:border-[var(--signal)] hover:text-[var(--ink)]"
        }`}
      >
        {label}
        <span
          className={`[font-family:var(--font-mono)] text-[length:var(--text-2xs)] font-normal ${
            on ? "text-[var(--on-signal)]" : "text-[var(--dim)]"
          }`}
        >
          {count}
        </span>
      </button>
    );
  };

  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      {/* ===== SÖTÉT FEJLÉC, TÉNYSZALAG, SZŰRŐ ===== */}
      <Rail label={t.rail} dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <h1 className="font-display font-black leading-[0.88] tracking-[-0.055em] [font-size:var(--text-display)]">
            {t.heading}
          </h1>
          <p className="font-display font-semibold [font-size:var(--text-2xl)] leading-[1.25] tracking-[-0.015em] text-[var(--ink)] max-w-[34ch] mt-[var(--space-8)]">
            {t.lead}
          </p>
        </section>

        <FactStrip
          facts={[
            { value: String(posts.length), label: t.factPosts },
            { value: String(categories.length), label: t.factTopics },
            { value: String(totalMinutes), label: t.factMinutes },
          ]}
        />

        {categories.length > 1 && (
          <div
            role="group"
            aria-label={t.filterLabel}
            className="flex flex-wrap gap-[10px] px-6 py-[var(--space-6)] border-t border-[var(--rule)]"
          >
            {chip(t.all, posts.length, null)}
            {categories.map(([name, count]) => chip(name, count, name))}
          </div>
        )}
      </Rail>

      <Seam />

      {!featured && (
        <Rail label={t.listRail}>
          <p className="px-6 py-[var(--space-16)] [font-size:var(--text-xl)] text-[var(--ink-2)]">
            {t.empty}
          </p>
        </Rail>
      )}

      {/* ===== LEGFRISSEBB: LIME BLOKK ===== */}
      {featured && (
        <Rail label={t.latest}>
          <Link
            href={href(featured)}
            className="group grid grid-cols-1 lg:grid-cols-[minmax(260px,0.8fr)_1.6fr] border-b border-[var(--rule)]"
          >
            <div className="relative bg-[var(--signal)] text-[var(--on-signal)] px-6 py-[var(--space-8)] lg:py-[clamp(34px,4vw,62px)] flex lg:flex-col justify-between gap-[var(--space-6)] overflow-hidden">
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase">
                {t.latest} · {categoryOf(featured)}
              </span>
              <span
                aria-hidden="true"
                className="font-display font-black leading-[0.8] tracking-[-0.06em] [font-size:var(--text-error-code)] lg:-mb-[0.12em]"
              >
                {pad(numberOf.get(featured.id) ?? 0)}
              </span>
            </div>
            <div className="px-6 py-[var(--space-8)] lg:py-[clamp(34px,4vw,62px)] bg-[var(--panel)] group-hover:bg-[var(--ground)] transition-colors">
              <div className="flex flex-wrap gap-[var(--space-4)] [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.16em] uppercase text-[var(--mid)] mb-[var(--space-5)]">
                <span>{formatDate(featured.date, locale)}</span>
                <span>
                  {featured.readTime} {t.readSuffix}
                </span>
              </div>
              <h2 className="font-display font-bold [font-size:var(--text-5xl)] leading-[1.02] tracking-[-0.04em] max-w-[20ch] m-0">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="[font-size:var(--text-xl)] leading-[1.6] text-[var(--ink-2)] max-w-[54ch] mt-[var(--space-6)] mb-0">
                  {featured.excerpt}
                </p>
              )}
              <span className="inline-flex items-center gap-2 mt-[var(--space-8)] bg-[var(--ink)] text-[var(--ground)] px-[22px] py-[13px] font-display font-semibold [font-size:var(--text-sm)] group-hover:bg-[var(--signal)] group-hover:text-[var(--on-signal)] transition-colors">
                {t.read}
                <span aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </div>
          </Link>
        </Rail>
      )}

      {/* ===== KÖVETKEZŐ KETTŐ: KÁRTYÁK ===== */}
      {cards.length > 0 && (
        <Rail label={t.newest}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {cards.map((post, i) => (
              <Link
                key={post.id}
                href={href(post)}
                className={`group relative flex flex-col px-6 py-[clamp(30px,3.4vw,52px)] border-b border-[var(--rule)] hover:bg-[var(--panel)] transition-colors ${
                  i === 0 && cards.length > 1 ? "md:border-r" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-[3px] w-0 bg-[var(--signal)] motion-safe:transition-[width] motion-safe:duration-300 group-hover:w-full"
                />
                <div className="flex items-baseline justify-between gap-[var(--space-4)] mb-[var(--space-5)]">
                  <span className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.16em] uppercase text-[var(--signal-deep)]">
                    {categoryOf(post)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-display font-black [font-size:var(--text-5xl)] leading-none tracking-[-0.05em] text-[var(--rule-strong)] group-hover:text-[var(--signal)] transition-colors"
                  >
                    {pad(numberOf.get(post.id) ?? 0)}
                  </span>
                </div>
                <h2 className="font-display font-bold [font-size:var(--text-3xl)] leading-[1.08] tracking-[-0.03em] max-w-[24ch] m-0">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="[font-size:var(--text-lg)] leading-[1.6] text-[var(--ink-2)] mt-[var(--space-4)] mb-0 max-w-[52ch]">
                    {post.excerpt}
                  </p>
                )}
                <span className="mt-auto pt-[var(--space-6)] [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                  {formatDate(post.date, locale)} · {post.readTime}
                </span>
              </Link>
            ))}
          </div>
        </Rail>
      )}

      {/* ===== A TÖBBI: SORSZÁMOZOTT SOROK ===== */}
      {visibleList.length > 0 && (
        <Rail label={t.moreRail}>
          <ol className="m-0 p-0 list-none">
            {visibleList.map((post) => (
              <li key={post.id} className="border-b border-[var(--rule)]">
                <Link
                  href={href(post)}
                  className="group grid grid-cols-[56px_1fr] sm:grid-cols-[clamp(80px,9vw,128px)_1fr_auto] gap-x-[var(--space-4)] sm:gap-x-[clamp(16px,2.4vw,40px)] gap-y-[var(--space-2)] px-6 py-[clamp(24px,2.8vw,38px)] items-start hover:bg-[var(--panel)] transition-colors"
                >
                  <span
                    aria-hidden="true"
                    className="font-display font-black [font-size:var(--text-4xl)] leading-[0.9] tracking-[-0.05em] text-[var(--rule-strong)] group-hover:text-[var(--signal)] transition-colors"
                  >
                    {pad(numberOf.get(post.id) ?? 0)}
                  </span>
                  <div className="min-w-0">
                    <span className="block [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.16em] uppercase text-[var(--signal-deep)] mb-[var(--space-2)]">
                      {categoryOf(post)}
                    </span>
                    <h3 className="font-display font-bold [font-size:var(--text-2xl)] leading-[1.15] tracking-[-0.025em] max-w-[34ch] m-0">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="[font-size:var(--text-base)] sm:[font-size:var(--text-lg)] leading-[1.6] text-[var(--ink-2)] mt-[var(--space-3)] mb-0 max-w-[64ch] line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  <span className="col-start-2 sm:col-start-auto [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.14em] uppercase text-[var(--mid)] whitespace-nowrap sm:pt-[6px]">
                    {post.readTime}
                    <span
                      aria-hidden="true"
                      className="hidden sm:inline-block ml-3 text-[var(--ink)] motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          {hasMore && (
            <div className="flex justify-center px-6 py-[clamp(30px,3.4vw,48px)]">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="border-2 border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--ground)] transition-colors px-[30px] py-[14px] font-display font-semibold [font-size:var(--text-base)] text-[var(--ink)]"
              >
                {t.loadMore} ({listed.length - visibleCount})
              </button>
            </div>
          )}
        </Rail>
      )}

      <Seam />

      {/* ===== CTA ===== */}
      <Rail label={t.ctaRail} dark>
        <section className="px-6 py-[clamp(52px,6.4vw,102px)]">
          <Eyebrow>{t.ctaEyebrow}</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-claim)] leading-[0.96] tracking-[-0.048em] max-w-[15ch] mb-[var(--space-5)] text-[var(--ink)]">
            {t.ctaTitle}
          </h2>
          <p className="[font-size:var(--text-lg)] leading-relaxed text-[var(--ink-2)] max-w-[52ch] mb-[var(--space-7)]">
            {t.ctaBody}
          </p>
          <Button asChild>
            <Link href={t.ctaHref}>{t.ctaButton} &rarr;</Link>
          </Button>
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)] mt-[var(--space-6)]">
            {t.ctaMail}
          </p>
        </section>
      </Rail>
    </main>
  );
}
