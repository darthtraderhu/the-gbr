"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Az /init oldalon (terminál varázsló) itt is elrejtjük, ahogy a Navbar is teszi.
  if (pathname === "/init") return null;

  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#050505] py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10 md:gap-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-3xl font-black italic tracking-tighter flex items-center mb-2">
            <span className="text-white">THE</span>
            <span className="text-[#e7ff00]">GBR</span>
          </div>
          <p className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">Mérnöki Precizitás 2002 Óta.</p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-8 text-center md:text-left">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Navigáció</span>
            <Link href="/" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Főoldal</Link>
            <Link href="/arzenal" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Arzenál</Link>
            <Link href="/architektura" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Csomagok</Link>
            <Link href="/seo" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">SEO</Link>
            <Link href="/szindikatus" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Hálózat</Link>
            <Link href="/hirek" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Hírmotor</Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Jogi</span>
            <Link href="/adatkezeles" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Adatkezelés</Link>
            <Link href="/cookie-tajekoztato" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Cookie-tájékoztató</Link>
            <Link href="/ai-tajekoztato" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">AI-tájékoztató</Link>
            <Link href="/szolgaltatasi-feltetelek" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">ÁSZF</Link>
            <Link href="/impresszum" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Impresszum</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-white/5 text-[10px] font-mono text-gray-600 uppercase tracking-widest text-center md:text-right">
        © {new Date().getFullYear()} THE GBR. Minden jog fenntartva.
      </div>
    </footer>
  );
}
