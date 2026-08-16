"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Rendszerhiba:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 text-center font-sans">
      <p className="font-mono font-bold text-xs md:text-sm tracking-[0.4em] text-red-500 uppercase mb-6">
        SYS.ERROR: 500
      </p>
      <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6">
        Rendszerhiba <span className="text-[#e7ff00]">Történt.</span>
      </h1>
      <p className="max-w-md text-gray-400 text-base md:text-lg mb-10">
        Valami elromlott a háttérben. A csapat automatikusan értesítést kap róla — próbáld újra.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="px-10 py-4 rounded bg-[#e7ff00] text-[#0a0a0a] font-black italic uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-[0_0_30px_rgba(231,255,0,0.3)]"
        >
          Újrapróbálkozás
        </button>
        <Link
          href="/"
          className="px-10 py-4 rounded bg-[#121212] text-white font-black italic uppercase tracking-[0.2em] text-sm border border-white/10 hover:border-white/30 transition-all"
        >
          Vissza a főoldalra
        </Link>
      </div>
    </main>
  );
}
