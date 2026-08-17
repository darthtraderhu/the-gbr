import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "../../lib/posts";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "Írások | THE GBR",
  description:
    "B2B marketing, Next.js fejlesztés és AI-integráció — amit megcsinálunk, arról írunk is.",
  alternates: {
    canonical: "/hirek",
  },
  openGraph: {
    title: "Írások | THE GBR",
    description: "B2B marketing, Next.js fejlesztés és AI-integráció.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Írások | THE GBR",
    description: "B2B marketing, Next.js fejlesztés és AI-integráció.",
  },
};

export default function Hirek() {
  const allPostsData = getSortedPostsData();

  const featuredPost = allPostsData[0];
  const gridPosts = allPostsData.slice(1);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#e7ff00] selection:text-black relative font-sans overflow-hidden">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Írások", url: `${SITE_URL}/hirek` },
        ])}
      />
      {/* =========================================
          STÍLUSOK ÉS ANIMÁCIÓK
      ========================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        body { scroll-behavior: smooth; }

        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .scanline-effect { animation: scanline 8s linear infinite; }

        .bg-grid {
          background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `,
        }}
      />

      {/* =========================================
          HÁTTÉR
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-grid">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#00E5FF]/5 blur-[200px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#e7ff00]/5 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF]/10 to-transparent scanline-effect opacity-50"></div>
      </div>

      {/* =========================================
          HERO
      ========================================= */}
      <section className="relative z-10 w-full pt-40 pb-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-8">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
              Írások
            </p>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-white drop-shadow-2xl">
              Amit közben
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600">
                megtanulunk.
              </span>
            </h1>
          </div>
          <div className="max-w-md text-right">
            <p className="text-gray-400 text-sm font-medium leading-relaxed">
              Nem tartalomgyár. Amit leírunk, azt előbb megcsináltuk.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          KIEMELT ÍRÁS
      ========================================= */}
      {featuredPost && (
        <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
          <Link href={`/hirek/${featuredPost.id}`}>
            <div className="group cursor-pointer bg-[#121212] border border-white/10 rounded-xl overflow-hidden hover:border-[#e7ff00]/50 transition-all duration-500 shadow-2xl relative flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 aspect-video md:aspect-auto bg-[#1a1a1a] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 hidden md:block"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 md:hidden"></div>
                <div className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 bg-cubes-pattern"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg
                    className="w-24 h-24 text-[#e7ff00]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>

                <div className="absolute top-4 left-4 z-20 font-mono text-[9px] text-[#e7ff00] uppercase tracking-widest bg-black/50 px-2 py-1 border border-[#e7ff00]/30 rounded backdrop-blur-sm">
                  [SYS.FILE: ALPHA-01]
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-20 bg-gradient-to-l from-[#121212] to-transparent">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black bg-[#e7ff00] px-3 py-1 rounded shadow-[0_0_10px_rgba(231,255,0,0.5)]">
                    {featuredPost.category || "Kiemelt írás"}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 border border-white/10 px-2 py-1 rounded">
                    Olvasás: {featuredPost.readTime || "5 perc"}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-6 group-hover:text-[#e7ff00] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium mb-8">
                  {featuredPost.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-[#e7ff00] transition-colors mt-auto">
                  Tovább az íráshoz{" "}
                  <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* =========================================
          TOVÁBBI ÍRÁSOK (GRID)
      ========================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-4">
          <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>
          <h2 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
            / TOVÁBBI ÍRÁSOK ({gridPosts.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post, idx) => (
            <Link key={post.id} href={`/hirek/${post.id}`}>
              <div className="group cursor-pointer flex flex-col h-full">
                <div className="w-full aspect-video bg-[#121212] rounded-xl border border-white/10 mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1c22] to-[#0a0a0a] group-hover:scale-105 transition-transform duration-700"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <svg
                      className="w-16 h-16 text-[#00E5FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  </div>
                  <div className="absolute bottom-3 right-3 font-mono text-[9px] text-gray-500 uppercase">
                    SYS.FILE: 0{idx + 42}
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#00E5FF] border border-[#00E5FF]/30 bg-[#00E5FF]/10 px-2 py-1 rounded">
                    {post.category || "Általános"}
                  </span>
                  <span className="text-[10px] font-mono text-gray-600">
                    {post.readTime || "3 perc"}
                  </span>
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight text-white mb-3 group-hover:text-[#00E5FF] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed line-clamp-3 mb-6 flex-grow">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
