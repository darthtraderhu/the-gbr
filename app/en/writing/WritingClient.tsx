"use client";

import { useState } from "react";
import Link from "next/link";
import type { getSortedEnPostsData } from "@/lib/posts-en";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";

type Post = ReturnType<typeof getSortedEnPostsData>[number];

const CATEGORY_FALLBACK = "Writing";
const PAGE_SIZE = 7;

function getCategory(post: Post): string {
  return post.category || CATEGORY_FALLBACK;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(date);
}

export default function WritingClient({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categoryCounts = new Map<string, number>();
  posts.forEach((post) => {
    const cat = getCategory(post);
    categoryCounts.set(cat, (categoryCounts.get(cat) ?? 0) + 1);
  });
  const categories = Array.from(categoryCounts.entries()).sort((a, b) => b[1] - a[1]);

  const filtered = active ? posts.filter((post) => getCategory(post) === active) : posts;
  const [featured, ...rest] = filtered;
  const visibleRest = rest.slice(0, visibleCount);
  const hasMore = rest.length > visibleCount;

  const selectCategory = (value: string | null) => {
    setActive(value);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <Rail label="Writing" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <h1 className="font-display font-black leading-[0.88] tracking-[-0.055em] [font-size:var(--text-display)]">
            Writing<span className="text-[var(--signal)]">.</span>
          </h1>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[50ch] mt-[var(--space-8)]">
            Not a content mill. What we write about, we did first — on our own site or in a client
            project.
          </p>
        </section>

        {categories.length > 1 && (
          <div className="flex flex-wrap border-t border-[var(--rule)]">
            <button
              type="button"
              onClick={() => selectCategory(null)}
              className={`flex-1 min-w-[130px] text-left border-r border-[var(--rule)] px-[14px] py-[15px] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase transition-colors flex justify-between gap-[var(--space-3)] ${
                active === null
                  ? "text-[var(--ink)] border-t-2 border-t-[var(--signal)] -mt-[2px]"
                  : "text-[var(--mid)] hover:bg-[var(--panel)] hover:text-[var(--ink)] border-t-2 border-t-transparent -mt-[2px]"
              }`}
            >
              <span>All</span>
              <b className={active === null ? "text-[var(--signal)] font-normal" : "text-[var(--dim)] font-normal"}>
                {posts.length}
              </b>
            </button>
            {categories.map(([name, count]) => (
              <button
                key={name}
                type="button"
                onClick={() => selectCategory(name)}
                className={`flex-1 min-w-[130px] text-left border-r border-[var(--rule)] last:border-r-0 px-[14px] py-[15px] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase transition-colors flex justify-between gap-[var(--space-3)] ${
                  active === name
                    ? "text-[var(--ink)] border-t-2 border-t-[var(--signal)] -mt-[2px]"
                    : "text-[var(--mid)] hover:bg-[var(--panel)] hover:text-[var(--ink)] border-t-2 border-t-transparent -mt-[2px]"
                }`}
              >
                <span>{name}</span>
                <b className={active === name ? "text-[var(--signal)] font-normal" : "text-[var(--dim)] font-normal"}>
                  {count}
                </b>
              </button>
            ))}
          </div>
        )}
      </Rail>

      <Seam />

      {featured && (
        <Rail label="Featured">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] border-t border-[var(--rule)]">
            <Link
              href={`/en/writing/${featured.id}`}
              className="border-b lg:border-b-0 lg:border-r border-[var(--rule)] px-6 py-[clamp(34px,4vw,62px)] hover:bg-[var(--panel)] transition-colors group"
            >
              <div className="flex flex-wrap gap-[var(--space-4)] [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.18em] uppercase text-[var(--mid)] mb-[var(--space-6)]">
                <span className="text-[var(--signal-deep)]">{getCategory(featured)}</span>
                <span>{formatDate(featured.date)}</span>
                <span>{featured.readTime} read</span>
              </div>
              <h2 className="[font-size:var(--text-4xl)] font-semibold leading-[1.12] tracking-[-0.018em] max-w-[22ch] mb-[var(--space-5)]">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="[font-size:var(--text-lg)] leading-relaxed text-[var(--ink-2)] max-w-[46ch] m-0">
                  {featured.excerpt}
                </p>
              )}
              <span className="inline-block mt-[var(--space-7)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] group-hover:text-[var(--signal-deep)] transition-colors">
                Read more &rarr;
              </span>
            </Link>
            <div
              className="relative min-h-[200px] lg:min-h-[280px]"
              style={{ background: "linear-gradient(150deg, var(--panel), var(--rule-soft))" }}
            >
              <span className="absolute left-[22px] bottom-5 [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.18em] uppercase text-[var(--mid)]">
                Featured
              </span>
            </div>
          </div>
        </Rail>
      )}

      <Rail label="All">
        <div className="border-t border-[var(--rule)]">
          {visibleRest.map((post, i) => (
            <Link
              key={post.id}
              href={`/en/writing/${post.id}`}
              className="grid grid-cols-[40px_1fr] sm:grid-cols-[56px_minmax(130px,15%)_1fr_auto] gap-[var(--space-3)] sm:gap-[clamp(14px,2.2vw,36px)] px-6 py-[clamp(22px,2.5vw,32px)] border-b border-[var(--rule)] items-baseline hover:bg-[var(--panel)] transition-colors group"
            >
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-sm)] text-[var(--mid)]">
                {String(i + 2).padStart(2, "0")}
              </span>
              <span className="hidden sm:block [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.18em] uppercase text-[var(--mid)]">
                {getCategory(post)}
              </span>
              <h3 className="[font-size:var(--text-2xl)] font-semibold leading-[1.22] tracking-[-0.01em] max-w-[36ch] m-0 group-hover:text-[var(--signal-deep)] transition-colors">
                {post.title}
              </h3>
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.14em] uppercase text-[var(--mid)] whitespace-nowrap">
                {post.readTime} read
              </span>
            </Link>
          ))}
        </div>
        {hasMore && (
          <div className="flex justify-center px-6 py-[clamp(30px,3.4vw,48px)]">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="border border-[var(--rule)] hover:border-[var(--signal-deep)] hover:text-[var(--signal-deep)] transition-colors px-[30px] py-[14px] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--ink)]"
            >
              Load older posts
            </button>
          </div>
        )}
      </Rail>

      <Seam />

      <Rail label="Contact" dark>
        <section className="px-6 py-[clamp(52px,6.4vw,102px)]">
          <Eyebrow>Similar problem?</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-claim)] leading-[0.96] tracking-[-0.048em] max-w-[15ch] mb-[var(--space-5)] text-[var(--ink)]">
            Let&apos;s see where you stand
          </h2>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[52ch] mb-[var(--space-7)]">
            You&apos;ll get a list of what&apos;s missing at the end of the assessment — even if
            you don&apos;t continue with us. We reply within two business days.
          </p>
          <Button asChild>
            <Link href="/en/contact">Get started &rarr;</Link>
          </Button>
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)] mt-[var(--space-6)]">
            Or email directly: gabor@thegbr.eu
          </p>
        </section>
      </Rail>
    </main>
  );
}
