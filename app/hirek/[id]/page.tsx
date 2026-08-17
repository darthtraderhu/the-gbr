import { getPostData, getSortedPostsData } from "../../../lib/posts";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";

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

function formatHungarianDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("hu-HU", { dateStyle: "long" }).format(date);
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

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 md:px-12 font-sans bg-cubes-pattern bg-opacity-5">
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
      <div className="max-w-3xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-xl p-8 md:p-12 shadow-[0_0_40px_rgba(231,255,0,0.05)] relative overflow-hidden">
        {/* Dekorcsík */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e7ff00]/20 via-[#e7ff00] to-[#e7ff00]/20"></div>

        {/* Vissza gomb */}
        <Link
          href="/hirek"
          className="inline-flex items-center gap-2 text-[#e7ff00] hover:text-white transition-colors mb-8 text-sm font-mono tracking-widest uppercase"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Vissza az írásokhoz
        </Link>

        {/* Fejléc */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="font-mono text-xs text-gray-500 tracking-widest uppercase">
              <span className="text-[#e7ff00]">{postData.category || "Írások"}</span>
              {" · "}
              {formatHungarianDate(postData.date)}
              {" · "}
              {postData.readTime} olvasás
            </div>
            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-[#e7ff00] transition-colors border border-white/10 hover:border-[#e7ff00]/40 rounded px-3 py-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Megosztás
            </a>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
            {postData.title}
          </h1>
        </div>

        {/* A tartalom maga */}
        <div
          className="prose prose-invert prose-p:text-gray-400 prose-headings:text-white prose-a:text-[#e7ff00] max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />

        {/* CTA */}
        <div className="mt-16 pt-10 border-t border-white/10 text-center">
          <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white mb-3">
            Hasonló problémád van?
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-lg mx-auto">
            Írd le, mit szeretnél elérni, és két munkanapon belül válaszolunk.
          </p>
          <Link
            href="/init"
            className="inline-flex items-center gap-2 px-8 py-4 rounded bg-[#e7ff00] text-[#0a0a0a] font-black italic uppercase tracking-[0.2em] text-sm hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(231,255,0,0.25)]"
          >
            Pitcheld el a projekted <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Kapcsolódó írások */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/10">
            <h2 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
              Kapcsolódó írások
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link key={post.id} href={`/hirek/${post.id}`} className="group">
                  <div className="border border-white/10 rounded-lg p-5 h-full flex flex-col hover:border-[#e7ff00]/40 transition-colors">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#00E5FF] border border-[#00E5FF]/30 bg-[#00E5FF]/10 px-2 py-1 rounded w-fit mb-3">
                      {post.category || "Általános"}
                    </span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight leading-snug group-hover:text-[#e7ff00] transition-colors line-clamp-3">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
