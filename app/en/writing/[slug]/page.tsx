import { getEnPostData, getSortedEnPostsData } from "@/lib/posts-en";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { blogPostingSchema, breadcrumbSchema, softwareApplicationSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";
import ShareBar from "./ShareBar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getEnPostData(slug);

  return {
    title: `${postData.title} | THE GBR`,
    description: postData.excerpt,
    alternates: {
      canonical: `/en/writing/${slug}`,
      languages: {
        hu: `/hirek/${postData.huSlug}`,
        en: `/en/writing/${slug}`,
        "x-default": `/hirek/${postData.huSlug}`,
      },
    },
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      type: "article",
      publishedTime: postData.date,
      authors: ["Tóth Gábor"],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description: postData.excerpt,
    },
  };
}

function getRelatedPosts(
  allPosts: ReturnType<typeof getSortedEnPostsData>,
  currentId: string
) {
  return allPosts.filter((p) => p.id !== currentId).slice(0, 3);
}

export default async function EnglishArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await getEnPostData(slug);
  const allPosts = getSortedEnPostsData();
  const relatedPosts = getRelatedPosts(allPosts, slug);

  const articleUrl = `${SITE_URL}/en/writing/${slug}`;
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
            inLanguage: "en",
          }),
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/en` },
            { name: "Writing", url: `${SITE_URL}/en/writing` },
            { name: postData.title, url: articleUrl },
          ]),
          ...(slug === "why-build-your-own-product"
            ? [
                softwareApplicationSchema({
                  name: "Gimbal",
                  description:
                    "A financial ledger application built on accounting logic for business owners and traders — recorded entries cannot be overwritten, only reversed. Currently in closed beta.",
                  url: articleUrl,
                  inLanguage: "en",
                }),
              ]
            : []),
        ]}
      />

      <Rail label="Article" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-6)] sm:pb-[var(--space-8)]">
          <div className="flex flex-wrap items-center gap-[var(--space-4)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-6)]">
            <span className="text-[var(--signal)]">{postData.category || "Writing"}</span>
            <span>
              {new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(postData.date))}
            </span>
            <span>{postData.readTime} read</span>
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
          <Link href="/en/writing" className="hover:text-[var(--signal)] transition-colors">
            &larr; Back to writing
          </Link>
          <span>Tóth Gábor</span>
        </div>
      </Rail>

      <Seam />

      <Rail label="Content">
        <section className="px-6 py-[clamp(44px,5.4vw,86px)]">
          <article className="prose-gbr" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </section>

        <div className="flex flex-wrap justify-between items-center gap-[var(--space-4)] px-6 py-[clamp(28px,3.2vw,44px)] border-t border-[var(--rule)]">
          <ShareBar linkedInShareUrl={linkedInShareUrl} articleUrl={articleUrl} />
          {showUpdated && (
            <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase text-[var(--mid)]">
              Updated:{" "}
              {new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(
                new Date(postData.updated!)
              )}
            </span>
          )}
        </div>
      </Rail>

      <Seam />

      <Rail label="Contact" dark>
        <section className="px-6 py-[clamp(40px,4.6vw,72px)]">
          <Eyebrow>Similar problem?</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.02] tracking-[-0.04em] max-w-[18ch] mb-[var(--space-5)] text-[var(--ink)]">
            Let&apos;s see where you stand
          </h2>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[52ch] mb-[var(--space-7)]">
            You&apos;ll get a list of what&apos;s missing at the end of the assessment — even if
            you don&apos;t continue with us. We reply within two business days.
          </p>
          <Button asChild>
            <Link href="/en/contact">Get started &rarr;</Link>
          </Button>
        </section>
      </Rail>

      <Seam />

      {relatedPosts.length > 0 && (
        <Rail label="Related">
          <section className="px-6 pt-[clamp(44px,5vw,80px)] pb-[var(--space-6)] sm:pb-[var(--space-8)]">
            <Eyebrow>More writing</Eyebrow>
          </section>
          <div className="border-t border-[var(--rule)]">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/en/writing/${post.id}`}
                className="grid grid-cols-1 sm:grid-cols-[minmax(120px,16%)_1fr_auto] gap-[var(--space-3)] sm:gap-[clamp(16px,2.6vw,44px)] px-6 py-[clamp(22px,2.6vw,34px)] border-b border-[var(--rule)] items-baseline hover:bg-[var(--panel)] transition-colors"
              >
                <span className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.18em] uppercase text-[var(--mid)]">
                  {post.category || "Writing"}
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
