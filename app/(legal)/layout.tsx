import Link from "next/link";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 md:px-12 pb-24 font-sans">
      <div className="max-w-3xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-xl p-8 md:p-12 shadow-[0_0_40px_rgba(231,255,0,0.05)] relative overflow-hidden">
        {/* Dekorcsík */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e7ff00]/20 via-[#e7ff00] to-[#e7ff00]/20"></div>

        {/* Vissza gomb */}
        <Link
          href="/"
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
          Vissza a főoldalra
        </Link>

        <article className="prose prose-invert prose-p:text-gray-400 prose-headings:text-white prose-a:text-[#e7ff00] prose-strong:text-[#e7ff00] prose-th:text-white prose-td:text-gray-300 prose-hr:border-white/10 max-w-none leading-relaxed">
          {children}
        </article>
      </div>
    </div>
  );
}
