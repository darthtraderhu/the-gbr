import { getPostData } from "../../../lib/posts";
import Link from "next/link";
import { Metadata } from "next"; // <-- BEHÚZZUK A METADATA TÍPUST A SEO-HOZ

// =========================================================================
// DINAMIKUS SEO MOTOR: Ez olvassa be a Facebook/Google részére a cikk adatait
// =========================================================================
export async function generateMetadata({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}): Promise<Metadata> {
  // Kezeljük le, hogy a params Promise-ként vagy sima objektumként érkezik-e (Next 15 kompatibilitás)
  const resolvedParams = params instanceof Promise ? await params : params;
  const postData = await getPostData(resolvedParams.id);

  return {
    title: `${postData.title} | THE GBR Akták`,
    description: postData.excerpt,
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      type: "article",
      publishedTime: postData.date,
      authors: ["THE GBR Intelligence"],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description: postData.excerpt,
    },
  };
}

// =========================================================================
// MEGJELENÍTŐ (PAGE): Ez rendereli le a dizájnt a felhasználónak
// =========================================================================
export default async function PosztOldal({ params }: { params: Promise<{ id: string }> }) {
  // Kőkeményen megvárjuk, amíg a Mátrix kibontja az URL paramétert
  const resolvedParams = await params;

  // A valós ID-t adjuk át a motornak az undefined helyett
  const postData = await getPostData(resolvedParams.id);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 md:px-12 font-sans bg-cubes-pattern bg-opacity-5">
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
          Vissza az Adatbázisba
        </Link>

        {/* Fejléc */}
        <div className="mb-10">
          <div className="font-mono text-xs text-[#e7ff00] tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e7ff00] animate-pulse"></span>
            SYS.DATE: {postData.date}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
            {postData.title}
          </h1>
        </div>

        {/* A tartalom maga */}
        <div
          className="prose prose-invert prose-p:text-gray-400 prose-headings:text-white prose-a:text-[#e7ff00] max-w-none prose-strong:text-[#e7ff00] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </div>
    </div>
  );
}
