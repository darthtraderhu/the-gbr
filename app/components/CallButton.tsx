"use client";

export default function CallButton() {
  return (
    <div className="fixed bottom-28 md:bottom-6 left-4 md:left-6 z-[100]">
      {/* A "tel:" link biztosítja, hogy mobilon azonnal megnyíljon a tárcsázó, 
        gépen pedig felajánlja a hívást (pl. FaceTime, Skype, Telefon összekapcsolás).
      */}
      <a 
        href="tel:+36705139838"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0a0a0a] border-2 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-110 hover:bg-[#00E5FF] hover:text-black transition-all duration-300 group"
      >
        {/* Háttér radar pulzálás */}
        <span className="absolute inset-0 rounded-full border border-[#00E5FF] animate-ping opacity-30"></span>
        
        {/* Telefon Ikon */}
        <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
        </svg>

        {/* Hover Tooltip (Asztali nézethez) */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-[#050505] border border-white/10 px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-2 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse"></span>
          <span className="text-[9px] uppercase tracking-widest text-white">Azonnali Hívás</span>
        </div>
      </a>
    </div>
  );
}