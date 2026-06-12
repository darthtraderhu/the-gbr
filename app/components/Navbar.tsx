"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Az /init oldalon (terminál varázsló) teljesen elrejtjük a menüt a maximális fókuszért!
  if (pathname === "/init") return null;

  // Navigációs adatok (Link, Név, Szín, és Ikon az applikációs menühöz)
  const navLinks = [
    { 
      name: "Központ", 
      href: "/", 
      activeColor: "text-white", 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> 
    },
    { 
      name: "Arzenál", 
      href: "/arzenal", 
      activeColor: "text-[#e7ff00]", 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> 
    },
    { 
      name: "Csomagok", 
      href: "/architektura", 
      activeColor: "text-[#00E5FF]", 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /> 
    },
    { 
      name: "Hálózat", 
      href: "/szindikatus", 
      activeColor: "text-[#9d00ff]", 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> 
    },
    { 
      name: "Hírmotor", 
      href: "/hirek", 
      activeColor: "text-white", 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /> 
    },
  ];

  return (
    <>
      {/* =========================================
          ASZTALI / FELSŐ FEJLÉC (Minden eszközön)
      ========================================= */}
      <header className="fixed top-0 left-0 w-full z-[90] border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-24 flex items-center justify-between">
          
          {/* Logó */}
          <Link href="/" className="text-3xl md:text-5xl font-black italic tracking-[-0.05em] flex items-center hover:opacity-80 transition-opacity">
            <span className="text-white">THE</span>
            <span className="text-[#e7ff00] drop-shadow-[0_0_15px_rgba(231,255,0,0.4)]">GBR</span>
          </Link>

          {/* Desktop Menü (Csak gépen látszik) */}
          <nav className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-[0.2em] items-center">
            {navLinks.slice(1).map((link) => { // A "Központ" (Főoldal) gombot elrejtjük asztalon, mert a Logó visz oda
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`transition-colors relative flex items-center gap-2 ${isActive ? link.activeColor : "text-gray-500 hover:text-white"}`}
                >
                  {isActive && <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${link.activeColor.replace('text-', 'bg-')}`}></span>}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Akció gomb (A mobilon kisebb, de ott is látszik felül) */}
          <Link href="/init" className="px-4 py-2 md:px-6 md:py-3 rounded bg-[#e7ff00] text-[#0a0a0a] text-[9px] md:text-xs font-black italic uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_20px_rgba(231,255,0,0.2)]">
            Indítás
          </Link>
        </div>
      </header>

      {/* =========================================
          MOBIL APPLIKÁCIÓS ALSÓ MENÜ (TAB BAR)
      ========================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-[90] bg-[#050505]/95 backdrop-blur-2xl border-t border-white/10 pb-6 pt-3 px-2 flex justify-around items-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`flex flex-col items-center gap-1.5 w-1/5 ${isActive ? link.activeColor : 'text-gray-600'}`}
            >
              <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/5 scale-110' : 'bg-transparent scale-100'}`}>
                {/* Ha aktív, akkor bevillan egy finom glow a háttérben */}
                {isActive && <div className={`absolute inset-0 blur-md opacity-30 ${link.activeColor.replace('text-', 'bg-')}`}></div>}
                
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {link.icon}
                </svg>
              </div>
              <span className="text-[8px] font-bold uppercase tracking-widest">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}