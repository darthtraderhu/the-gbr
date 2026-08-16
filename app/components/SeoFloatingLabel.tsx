"use client";

import Link from "next/link";

export default function SeoFloatingLabel() {
  return (
    <Link 
      href="/seo" 
      className="fixed left-0 top-1/2 -translate-y-1/2 z-[60] group flex items-center"
      aria-label="SEO Protokoll"
    >
      {/* 
        A Kőkemény B2B Címke: 
        Fekete doboz, vékony fehér keret a széleken, ami hoverre neon-sárga lesz.
      */}
      <div className="flex items-center bg-[#050505]/90 backdrop-blur-md border-y border-r border-white/10 group-hover:border-[#e7ff00]/50 rounded-r-lg px-1.5 py-4 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_20px_rgba(231,255,0,0.15)] overflow-hidden relative">
        
        {/* Futurisztikus letapogató fény (scanline) ami végigfut rajta */}
        <div className="absolute inset-0 w-full h-[200%] bg-gradient-to-b from-transparent via-[#e7ff00]/10 to-transparent animate-[scanline_3s_linear_infinite] opacity-0 group-hover:opacity-100"></div>

        {/* Függőleges szöveg (Lentről felfelé olvasva) */}
        <span className="[writing-mode:vertical-lr] rotate-180 font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors duration-300 z-10">
          sys.<span className="text-[#e7ff00] drop-shadow-[0_0_5px_rgba(231,255,0,0.4)]">seo_protocol</span>
        </span>

        {/* Lebegő, pulzáló neon csík a címke belső szélén */}
        <div className="ml-2 w-0.5 h-12 bg-gradient-to-b from-transparent via-[#e7ff00] to-transparent opacity-50 group-hover:opacity-100 animate-pulse rounded-full z-10"></div>
      </div>
    </Link>
  );
}