import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 text-center font-sans">
      <p className="font-mono font-bold text-xs md:text-sm tracking-[0.4em] text-[#e7ff00] uppercase mb-6 drop-shadow-[0_0_10px_rgba(231,255,0,0.5)]">
        SYS.ERROR: 404
      </p>
      <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-6">
        Nincs <span className="text-[#e7ff00]">Jel.</span>
      </h1>
      <p className="max-w-md text-gray-400 text-base md:text-lg mb-10">
        Ez az oldal nem létezik, vagy elköltözött. Térj vissza a bázisra.
      </p>
      <Link
        href="/"
        className="px-10 py-4 rounded bg-[#e7ff00] text-[#0a0a0a] font-black italic uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-[0_0_30px_rgba(231,255,0,0.3)]"
      >
        Vissza a főoldalra
      </Link>
    </main>
  );
}
