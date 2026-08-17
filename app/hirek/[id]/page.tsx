import { getPostData, getSortedPostsData } from "../../../lib/posts";
import { formatHungarianDate } from "../../../lib/date";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";
import ShareBar from "./ShareBar";

// =========================================================================
// DINAMIKUS SEO MOTOR: Ez olvassa be a Facebook/Google részére a cikk adatait
// =========================================================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const postData = await getPostData(id);

  return {
    title: `${postData.title} | THE GBR`,
    description: postData.excerpt,
    alternates: {
      canonical: `/hirek/${id}`,
    },
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      type: "article",
      publishedTime: postData.date,
      authors: ["THE GBR"],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description: postData.excerpt,
    },
  };
}

function getRelatedPosts(
  allPosts: ReturnType<typeof getSortedPostsData>,
  currentId: string,
  category: string | undefined
) {
  const others = allPosts.filter((p) => p.id !== currentId);
  const sameCategory = category ? others.filter((p) => p.category === category) : [];
  const rest = others.filter((p) => !sameCategory.includes(p));
  return [...sameCategory, ...rest].slice(0, 3);
}

// =========================================================================
// MEGJELENÍTŐ (PAGE): Ez rendereli le a dizájnt a felhasználónak
// =========================================================================
export default async function PosztOldal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postData = await getPostData(id);
  const allPosts = getSortedPostsData();
  const relatedPosts = getRelatedPosts(allPosts, id, postData.category);

  const articleUrl = `${SITE_URL}/hirek/${id}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
  const showUpdated = postData.updated && postData.updated !== postData.date;

  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd
        data={[
          blogPostingSchema({
            headline: postData.title,
            description: postData.excerpt,
            datePublished: postData.date,
            dateModified: postData.updated ?? postData.date,
            url: articleUrl,
            image: `${articleUrl}/opengraph-image`,
          }),
          breadcrumbSchema([
            { name: "Főoldal", url: SITE_URL },
            { name: "Írások", url: `${SITE_URL}/hirek` },
            { name: postData.title, url: articleUrl },
          ]),
        ]}
      />

      {/* ===== SÖTÉT CIKKFEJLÉC ===== */}
      <Rail label="Írás" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-6)] sm:pb-[var(--space-8)]">
          <div className="flex flex-wrap items-center gap-[var(--space-4)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-6)]">
            <span className="text-[var(--signal)]">{postData.category || "Írások"}</span>
            <span>{formatHungarianDate(postData.date)}</span>
            <span>{postData.readTime} olvasás</span>
          </div>
          <h1 className="font-display font-extrabold leading-[1.0] tracking-[-0.045em] [font-size:var(--text-4xl)] sm:[font-size:var(--text-6xl)] max-w-[20ch]">
            {postData.title}
          </h1>
          {postData.excerpt && (
            <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[52ch] mt-[var(--space-6)]">
              {postData.excerpt}
            </p>
          )}
        </section>
        <div className="flex flex-wrap justify-between gap-[var(--space-4)] px-6 py-[13px] border-t border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase text-[var(--dim)]">
          <Link href="/hirek" className="hover:text-[var(--signal)] transition-colors">
            &larr; Vissza az írásokhoz
          </Link>
          <span>THE GBR</span>
        </div>
      </Rail>

      <Seam />

      {/* ===== CIKK TÖRZS ===== */}
      <Rail label="Tartalom">
        <section className="px-6 py-[clamp(44px,5.4vw,86px)]">
          <article
            className="prose-gbr"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </section>

        <div className="flex flex-wrap justify-between items-center gap-[var(--space-4)] px-6 py-[clamp(28px,3.2vw,44px)] border-t border-[var(--rule)]">
          <ShareBar linkedInShareUrl={linkedInShareUrl} articleUrl={articleUrl} />
          {showUpdated && (
            <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase text-[var(--mid)]">
              Frissítve: {formatHungarianDate(postData.updated!)}
            </span>
          )}
        </div>
      </Rail>

      <Seam />

      {/* ===== CTA ===== */}
      <Rail label="Kapcsolat" dark>
        <section className="px-6 py-[clamp(40px,4.6vw,72px)]">
          <Eyebrow>Hasonló problémád van?</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.02] tracking-[-0.04em] max-w-[18ch] mb-[var(--space-5)] text-[var(--ink)]">
            Nézzük meg, hol tartasz
          </h2>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[52ch] mb-[var(--space-7)]">
            A felmérés végén kapsz egy listát arról, mi hiányzik — akkor is, ha nem velünk dolgozol
            tovább. Két munkanapon belül válaszolunk.
          </p>
          <Button asChild>
            <Link href="/init">Pitcheld el a projekted &rarr;</Link>
          </Button>
        </section>
      </Rail>

      <Seam />

      {/* ===== KAPCSOLÓDÓ ÍRÁSOK ===== */}
      {relatedPosts.length > 0 && (
        <Rail label="Kapcsolódó">
          <section className="px-6 pt-[clamp(44px,5vw,80px)] pb-[var(--space-6)] sm:pb-[var(--space-8)]">
            <Eyebrow>Kapcsolódó írások</Eyebrow>
          </section>
          <div className="border-t border-[var(--rule)]">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/hirek/${post.id}`}
                className="grid grid-cols-1 sm:grid-cols-[minmax(120px,16%)_1fr_auto] gap-[var(--space-3)] sm:gap-[clamp(16px,2.6vw,44px)] px-6 py-[clamp(22px,2.6vw,34px)] border-b border-[var(--rule)] items-baseline hover:bg-[var(--panel)] transition-colors"
              >
                <span className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.18em] uppercase text-[var(--mid)]">
                  {post.category || "Általános"}
                </span>
                <h3 className="[font-size:var(--text-xl)] font-semibold leading-tight tracking-[-0.01em] max-w-[32ch] m-0">
                  {post.title}
                </h3>
                <span className="hidden sm:block [font-family:var(--font-mono)] text-[length:var(--text-sm)] text-[var(--rule-strong)]">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </Rail>
      )}
    </main>
  );
}
