import Link from "next/link";
import { getSortedPostsData } from "../lib/posts"; // <-- BEHÚZZUK A MOTORT!

export default function Home() {
  // Lekérjük a cikkeket, és csak a legújabb 3 darabot vesszük ki a főoldalra
  const allPostsData = getSortedPostsData();
  const recentPosts = allPostsData.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#e7ff00] selection:text-black overflow-hidden relative cursor-default font-sans">
      
      {/* =========================================
          ANIMÁCIÓK ÉS STÍLUSOK
      ========================================= */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,800;1,900&display=swap');
        
        body { font-family: 'Montserrat', sans-serif; scroll-behavior: smooth; }

        @keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-float { animation: floatUp 4s ease-in-out infinite; }

        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .scanline-effect { animation: scanline 8s linear infinite; }

        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 20s linear infinite; }

        /* Új: Száguldó fénycsík elválasztók */
        @keyframes dataSweep { 0% { left: -50%; } 100% { left: 150%; } }
        .animate-sweep-fast { animation: dataSweep 4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-sweep-slow { animation: dataSweep 6s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse; }
      `}} />

      {/* =========================================
          HÁTTÉR EFFEKTEK
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#e7ff00]/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00E5FF]/5 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.15]"></div>
        <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#e7ff00]/20 to-transparent scanline-effect opacity-50"></div>
      </div>

      {/* =========================================
          FEJLÉC
      ========================================= */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          <Link href="/" className="text-3xl md:text-5xl font-black italic tracking-[-0.05em] flex items-center">
            <span className="text-white">THE</span>
            <span className="text-[#e7ff00] drop-shadow-[0_0_15px_rgba(231,255,0,0.4)]">GBR</span>
          </Link>

          <nav className="hidden lg:flex gap-10 text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
            <Link href="#services" className="hover:text-[#e7ff00] transition-colors">Arzenál</Link>
            <Link href="#packages" className="hover:text-white transition-colors">Csomagok</Link>
            <Link href="/hirek" className="hover:text-[#00E5FF] transition-colors">Hírmotor</Link>
          </nav>

          <Link href="#contact" className="px-6 py-3 rounded bg-[#e7ff00] text-[#0a0a0a] text-[10px] md:text-xs font-black italic uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_20px_rgba(231,255,0,0.2)]">
            Projekt Indítása
          </Link>
        </div>
      </header>

      {/* =========================================
          HERO SZEKCIÓ
      ========================================= */}
      <section className="relative z-10 w-full pt-32 pb-16 lg:pt-48 lg:pb-24 flex flex-col items-center text-center">
        <div className="w-full border-y border-white/5 bg-[#050505] py-3 flex items-center justify-center gap-4 mb-12 shadow-[inset_0_0_20px_rgba(231,255,0,0.02)]">
          <span className="text-gray-600 font-mono font-bold text-sm tracking-widest">//</span>
          <span className="font-mono font-bold text-xs md:text-sm tracking-[0.4em] text-[#e7ff00] uppercase drop-shadow-[0_0_10px_rgba(231,255,0,0.5)]">
            SYS.NODE: FULL_STACK_AGENCY
          </span>
          <span className="text-gray-600 font-mono font-bold text-sm tracking-widest">//</span>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black italic tracking-tighter leading-[0.85] mb-8 uppercase text-white drop-shadow-2xl">
            A Jövő <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#e7ff00] to-[#b3c700] drop-shadow-[0_0_40px_rgba(231,255,0,0.5)] relative inline-block">
              Egy Kézből.
            </span>
          </h1>
          
          <p className="max-w-4xl text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 leading-relaxed font-medium border-l-4 border-[#e7ff00] pl-6 py-2 text-left md:text-center md:border-none md:pl-0 mx-auto">
            A marketing és az IT összeolvadt. Olyan <span className="text-white font-bold">teljeskörű ökoszisztémákat</span> építünk, amik gépként termelik a profitot. Nyers kód, AI-vezérelt ügyfélszolgálat, videós tartalomgyártás, adatvezérelt hirdetések és kompromisszummentes projektmenedzsment.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-14 font-mono text-[10px] md:text-xs text-gray-500 uppercase tracking-widest bg-white/5 border border-white/10 px-6 py-3 rounded-md">
            <div className="flex items-center gap-2">
              <span className="text-[#e7ff00] font-black">EST. 2002</span>
              <span>Óta Az Értékesítésben</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20"></div>
            <div className="flex items-center gap-2">
              <span className="text-[#00E5FF] font-black">100%</span>
              <span>B2B Fókusz</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20"></div>
            <div className="flex items-center gap-2">
              <span className="text-[#e7ff00] font-black">NXT</span>
              <span>Generációs Rendszerek</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link href="#services" className="px-12 py-5 rounded bg-[#e7ff00] text-[#0a0a0a] font-black italic uppercase tracking-[0.3em] text-sm hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_0_40px_rgba(231,255,0,0.3)]">
              Fegyvertár &rarr;
            </Link>
            <Link href="#packages" className="px-12 py-5 rounded bg-[#121212] text-white font-black italic uppercase tracking-[0.3em] text-sm border border-white/10 hover:border-[#00E5FF]/50 hover:text-[#00E5FF] transition-all duration-300">
              Csomagok
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          TECH STACK GÖRGETŐ 
      ========================================= */}
      <div className="relative z-10 w-full overflow-hidden border-y border-white/5 bg-[#050505] py-6 flex items-center mt-8">
        <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10"></div>
        <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10"></div>
        <div className="flex w-[200%] animate-scroll">
          <div className="flex w-1/2 justify-around items-center opacity-40 font-mono text-xl font-bold tracking-widest uppercase text-[#e7ff00]">
            <span>NEXT.JS</span> <span>•</span> <span>META ADS</span> <span>•</span> <span>OPENAI CHAT</span> <span>•</span> <span>PREMIERE PRO</span> <span>•</span> <span>SUPABASE</span> <span>•</span> <span>TIKTOK ADS</span>
          </div>
          <div className="flex w-1/2 justify-around items-center opacity-40 font-mono text-xl font-bold tracking-widest uppercase text-[#e7ff00]">
            <span>NEXT.JS</span> <span>•</span> <span>META ADS</span> <span>•</span> <span>OPENAI CHAT</span> <span>•</span> <span>PREMIERE PRO</span> <span>•</span> <span>SUPABASE</span> <span>•</span> <span>TIKTOK ADS</span>
          </div>
        </div>
      </div>

      {/* =========================================
          ANIMÁLT ELVÁLASZTÓ 1. 
      ========================================= */}
      <div className="w-full h-px relative z-20 overflow-hidden bg-transparent">
        <div className="absolute top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent animate-sweep-fast opacity-50"></div>
      </div>

      {/* =========================================
          SZOLGÁLTATÁSOK (FEGYVERTÁR)
      ========================================= */}
      <section id="services" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
            Digitális <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Mátrix</span>
          </h2>
          <p className="text-gray-400 font-medium text-lg">Minden eszköz, amire egy piacvezető vállalatnak szüksége van. Egy helyen.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-10 rounded-xl bg-[#121212] border-2 border-white/5 hover:border-[#e7ff00]/50 transition-all duration-500 group shadow-2xl relative overflow-hidden animate-float" style={{ animationDelay: '0s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#e7ff00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 rounded border-2 border-[#e7ff00]/30 bg-[#e7ff00]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_20px_rgba(231,255,0,0.4)]">
              <svg className="w-8 h-8 text-[#e7ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4 relative z-10 group-hover:text-[#e7ff00] transition-colors">High-End Web & Shop</h3>
            <p className="text-gray-400 text-sm font-semibold leading-relaxed relative z-10 tracking-wide">
              Villámgyors vállalati weboldalak és maximális konverzióra optimalizált webáruházak Next.js alapokon. Nincs sablon, csak nyers teljesítmény.
            </p>
          </div>

          <div className="p-10 rounded-xl bg-[#121212] border-2 border-white/5 hover:border-[#00E5FF]/50 transition-all duration-500 group shadow-2xl relative overflow-hidden animate-float" style={{ animationDelay: '0.1s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 rounded border-2 border-[#00E5FF]/30 bg-[#00E5FF]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]">
              <svg className="w-8 h-8 text-[#00E5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4 relative z-10 group-hover:text-[#00E5FF] transition-colors">Performance Marketing</h3>
            <p className="text-gray-400 text-sm font-semibold leading-relaxed relative z-10 tracking-wide">
              Adatvezérelt Google, Meta és TikTok kampányok. Nem költjük a pénzed, hanem befektetjük. Maximális ROI és folyamatos analitika.
            </p>
          </div>

          <div className="p-10 rounded-xl bg-[#121212] border-2 border-white/5 hover:border-[#e7ff00]/50 transition-all duration-500 group shadow-2xl relative overflow-hidden animate-float" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#e7ff00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 rounded border-2 border-[#e7ff00]/30 bg-[#e7ff00]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_20px_rgba(231,255,0,0.4)]">
              <svg className="w-8 h-8 text-[#e7ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4 relative z-10 group-hover:text-[#e7ff00] transition-colors">AI & Chatbot Integráció</h3>
            <p className="text-gray-400 text-sm font-semibold leading-relaxed relative z-10 tracking-wide">
              0-24 órás intelligens ügyfélszolgálat és lead generálás. AI asszisztensek, amik válaszolnak és eladnak a weboldaladon, amíg te alszol.
            </p>
          </div>

          <div className="p-10 rounded-xl bg-[#121212] border-2 border-white/5 hover:border-[#00E5FF]/50 transition-all duration-500 group shadow-2xl relative overflow-hidden animate-float" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 rounded border-2 border-[#00E5FF]/30 bg-[#00E5FF]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]">
              <svg className="w-8 h-8 text-[#00E5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4 relative z-10 group-hover:text-[#00E5FF] transition-colors">Prémium Videógyártás</h3>
            <p className="text-gray-400 text-sm font-semibold leading-relaxed relative z-10 tracking-wide">
              Lélegzetelállító reklámfilmek, TikTok/Reels kampányok és vállalati imázsvideók. Vizuális történetmesélés a legmagasabb minőségben.
            </p>
          </div>

          <div className="p-10 rounded-xl bg-[#121212] border-2 border-white/5 hover:border-[#e7ff00]/50 transition-all duration-500 group shadow-2xl relative overflow-hidden animate-float" style={{ animationDelay: '0.4s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#e7ff00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 rounded border-2 border-[#e7ff00]/30 bg-[#e7ff00]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_20px_rgba(231,255,0,0.4)]">
              <svg className="w-8 h-8 text-[#e7ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4 relative z-10 group-hover:text-[#e7ff00] transition-colors">Autopilot Rendszerek</h3>
            <p className="text-gray-400 text-sm font-semibold leading-relaxed relative z-10 tracking-wide">
              Marketing automatizációk, okos hírlevelek és önjáró blogmotorok. A szoftver dolgozik helyetted emberi beavatkozás nélkül.
            </p>
          </div>

          <div className="p-10 rounded-xl bg-[#121212] border-2 border-white/5 hover:border-[#00E5FF]/50 transition-all duration-500 group shadow-2xl relative overflow-hidden animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 rounded border-2 border-[#00E5FF]/30 bg-[#00E5FF]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]">
              <svg className="w-8 h-8 text-[#00E5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4 relative z-10 group-hover:text-[#00E5FF] transition-colors">IT Projektmenedzsment</h3>
            <p className="text-gray-400 text-sm font-semibold leading-relaxed relative z-10 tracking-wide">
              Levesszük a terhet a válladról. Teljeskörű IT és marketing projektvezetés a legmagasabb nagyvállalati sztenderdek szerint, határidőre.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          ANIMÁLT ELVÁLASZTÓ 2.
      ========================================= */}
      <div className="w-full h-[2px] relative z-20 overflow-hidden bg-white/5">
        <div className="absolute top-0 w-1/4 h-full bg-gradient-to-l from-transparent via-[#e7ff00] to-transparent animate-sweep-slow opacity-60"></div>
      </div>

      {/* =========================================
          PRÉMIUM AJÁNLATOK
      ========================================= */}
      <section id="packages" className="relative z-10 max-w-7xl mx-auto px-6 py-32 bg-[#0a0a0a]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
            Digitális <span className="text-[#e7ff00]">Arzenál</span>
          </h2>
          <p className="text-gray-400 font-medium text-lg">Válassz a kőkemény csomagjaink közül, vagy kérj egyedi architektúrát.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-10 hover:border-white/30 transition-all flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Belépő Szint</span>
            <h3 className="text-3xl font-black italic uppercase text-white mb-6">Web & Arculat</h3>
            <div className="text-4xl font-black text-white mb-8 border-b border-white/10 pb-8">Egyedi <span className="text-lg text-gray-500 font-normal">ajánlat</span></div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm"><span className="text-[#e7ff00]">✔</span> Prémium Vállalati Weboldal</li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm"><span className="text-[#e7ff00]">✔</span> Egyedi UI/UX Dizájn</li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm"><span className="text-[#e7ff00]">✔</span> Villámgyors Next.js alapok</li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm"><span className="text-[#e7ff00]">✔</span> SEO felépítés és Copywriting</li>
            </ul>
            <button className="w-full py-4 rounded border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all mt-auto">Érdekel</button>
          </div>

          <div className="bg-gradient-to-b from-[#1a1c00] to-[#121212] border border-[#e7ff00]/50 rounded-2xl p-10 hover:border-[#e7ff00] transition-all transform md:-translate-y-4 shadow-[0_0_30px_rgba(231,255,0,0.15)] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#e7ff00]"></div>
            <span className="text-[10px] font-bold text-[#e7ff00] uppercase tracking-widest mb-2 block">A Standard Sztenderd</span>
            <h3 className="text-3xl font-black italic uppercase text-white mb-6">E-Commerce & Scale</h3>
            <div className="text-4xl font-black text-[#e7ff00] mb-8 border-b border-white/10 pb-8">Teljes <span className="text-lg text-gray-500 font-normal">infrastruktúra</span></div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-3 text-white font-medium text-sm"><span className="text-[#e7ff00]">✔</span> Mindent az előző csomagból</li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm"><span className="text-[#e7ff00]">✔</span> Konverzió-optimalizált Webshop</li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm"><span className="text-[#e7ff00]">✔</span> Stripe & Barion integráció</li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm"><span className="text-[#e7ff00]">✔</span> Egyedi admin és Dashboard</li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm"><span className="text-[#e7ff00]">✔</span> Meta & Google Ads menedzsment</li>
            </ul>
            <button className="w-full py-4 rounded bg-[#e7ff00] text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(231,255,0,0.2)] mt-auto">Kiválasztom</button>
          </div>

          <div className="bg-[#121212] border border-white/10 rounded-2xl p-10 hover:border-[#00E5FF]/40 transition-all flex flex-col relative overflow-hidden group">
            <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-widest mb-2 block relative z-10">Mindent Bele</span>
            <h3 className="text-3xl font-black italic uppercase text-white mb-6 relative z-10">Full-Stack Ügynökség</h3>
            <div className="text-4xl font-black text-white mb-8 border-b border-white/10 pb-8 relative z-10">Végtelen <span className="text-lg text-gray-500 font-normal">skálázás</span></div>
            <ul className="space-y-4 mb-10 flex-1 relative z-10">
              <li className="flex items-center gap-3 text-white font-medium text-sm"><span className="text-[#00E5FF]">✔</span> Teljes Tech & Marketing lefedettség</li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm"><span className="text-[#00E5FF]">✔</span> Hírmotor és Blog automatizáció</li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm"><span className="text-[#00E5FF]">✔</span> AI Chatbot ügyfélszolgálat</li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm"><span className="text-[#00E5FF]">✔</span> Prémium videó- és tartalomgyártás</li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm"><span className="text-[#00E5FF]">✔</span> Dedikált IT Projektmenedzser</li>
            </ul>
            <button className="w-full py-4 rounded border border-[#00E5FF]/40 text-white font-bold uppercase tracking-widest text-xs hover:bg-[#00E5FF]/10 transition-all mt-auto relative z-10">Konzultáció Kérése</button>
          </div>
        </div>
      </section>

      {/* =========================================
          ANIMÁLT ELVÁLASZTÓ 3.
      ========================================= */}
      <div className="w-full h-px relative z-20 overflow-hidden bg-transparent">
        <div className="absolute top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent animate-sweep-fast opacity-50"></div>
      </div>

      {/* =========================================
          CIKKEK / BEMUTATÓ (INTEL) - DINAMIKUS VÁLTOZAT
      ========================================= */}
      <section id="blog" className="relative z-10 w-full bg-[#050505] py-32 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#e7ff00]/10 border border-[#e7ff00]/30 text-[10px] font-bold tracking-[0.2em] text-[#e7ff00] uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e7ff00] animate-pulse"></span>
                Autopilot Rendszer
              </div>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                Legfrissebb <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600">Kutatások</span>
              </h2>
            </div>
            <Link href="/hirek" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#e7ff00] transition-colors border-b border-transparent hover:border-[#e7ff00] pb-1">
              Összes cikk &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => {
              // Beállítjuk a THE GBR színeket (sárga, cián, fehér) a 3 kártyához
              const colorClasses = ["text-[#e7ff00]", "text-[#00E5FF]", "text-gray-300"];
              const borderClasses = ["border-[#e7ff00]/30", "border-[#00E5FF]/30", "border-gray-500/30"];
              const bgClasses = ["bg-[#e7ff00]/10", "bg-[#00E5FF]/10", "bg-white/5"];
              const hoverClasses = ["group-hover:text-[#e7ff00]", "group-hover:text-[#00E5FF]", "group-hover:text-white"];
              
              const color = colorClasses[index % colorClasses.length];
              const border = borderClasses[index % borderClasses.length];
              const bg = bgClasses[index % bgClasses.length];
              const hover = hoverClasses[index % hoverClasses.length];

              return (
                <Link key={post.id} href={`/hirek/${post.id}`}>
                  <div className="group cursor-pointer h-full flex flex-col">
                    <div className="w-full aspect-video bg-[#121212] rounded-xl border border-white/10 mb-6 overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] group-hover:scale-105 transition-transform duration-700"></div>
                       <div className="absolute inset-0 flex items-center justify-center opacity-20">
                         <svg className={`w-16 h-16 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${color} border ${border} ${bg} px-2 py-1 rounded`}>
                        {post.category || 'Hírek'}
                      </span>
                    </div>
                    <h3 className={`text-2xl font-black italic uppercase tracking-tight text-white mb-3 transition-colors line-clamp-2 ${hover}`}>
                      {post.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================
          FINAL CTA
      ========================================= */}
      <section id="contact" className="relative z-10 w-full px-6 py-32 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#121212] via-[#0a0a0a] to-[#121212] border-2 border-[#e7ff00]/20 rounded-2xl p-12 md:p-20 text-center shadow-[0_0_50px_rgba(231,255,0,0.1)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#e7ff00]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 relative z-10">
            Készen állsz a <span className="text-[#e7ff00]">Szintlépésre?</span>
          </h2>
          <p className="text-lg text-gray-400 font-semibold mb-12 max-w-2xl mx-auto relative z-10">
            Ne a versenytársaidat másold. Építs olyan digitális infrastruktúrát, amit ők fognak próbálni lemásolni. Bízd ránk a kódolást, a videókat és a hirdetéseket.
          </p>
          
          <a href="mailto:hello@thegbr.com" className="inline-block px-14 py-6 rounded bg-[#e7ff00] text-[#0a0a0a] font-black italic uppercase tracking-[0.3em] text-sm hover:bg-white transition-all shadow-[0_0_40px_rgba(231,255,0,0.3)] relative z-10">
            Kapcsolatfelvétel &rarr;
          </a>
        </div>
      </section>

    </main>
  );
}