import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts"; // <-- BEHÚZZUK A MOTORT!
import { websiteSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";

const HOME_DESCRIPTION =
  "Weboldalak és webshopok, amiket mi építünk és mi üzemeltetünk tovább — Next.js alapokon, kizárólag B2B cégeknek. Válasz két munkanapon belül.";

export const metadata: Metadata = {
  title: "THE GBR | Fejlesztés és üzemeltetés B2B cégeknek",
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "THE GBR | Fejlesztés és üzemeltetés B2B cégeknek",
    description: HOME_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "THE GBR | Fejlesztés és üzemeltetés B2B cégeknek",
    description: HOME_DESCRIPTION,
  },
};

const DEVELOP_ITEMS = [
  "Weboldal és webshop nulláról, vagy meglévő rendszer fölé",
  "Telefonra telepíthető webalkalmazás (PWA) — ikonként a kezdőlapon, alkalmazásbolt nélkül",
  "Technikai SEO: sitemap, strukturált adat, mérhető eredmény",
  "Biztonság és teljesítmény alapból, nem utólag",
  "Arculat, design rendszer és szövegezés, ha még nincs",
  "Videó és vizuális tartalom a bevezetéshez",
];

const MANAGE_ITEMS = [
  "Üzemeltetés, monitoring, hibariasztás",
  "Folyamatos fejlesztés havi keretben",
  "Tartalom, kampány, mérés",
  "Automatizált tartalommotor: a blog magától frissül",
  "Jogi megfelelés karbantartása a változásokkal együtt",
  "Egy felelős kapcsolattartó — nem ügyfélszolgálati sorszám",
];

const VIDEO_ITEMS = [
  "Cégbemutató és imázsvideó",
  "Termékvideó webshophoz",
  "Rövid formátumok közösségi médiára",
];

const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "WooCommerce",
  "Vercel",
  "OpenAI API",
];

const PROJECTS = [
  {
    badge: "Ügyfél · Folyamatban",
    badgeColor: "text-[#00E5FF]",
    badgeBorder: "border-[#00E5FF]/30",
    badgeBg: "bg-[#00E5FF]/10",
    title: "Kisgép-forgalmazó webshop",
    desc: "Több évtizede piacon lévő kizárólagos importőr. Élő, forgalmazó webáruház fokozatos újraépítése — a bolt egy percre sem áll le.",
    meta: "~400 termék · Next.js",
  },
  {
    badge: "Saját termék · Élő",
    badgeColor: "text-[#e7ff00]",
    badgeBorder: "border-[#e7ff00]/30",
    badgeBg: "bg-[#e7ff00]/10",
    title: "Pénzügyi alkalmazás",
    desc: "Saját fejlesztés, saját infrastruktúrán. Nincs kire mutogatni, ha elromlik — ezért tudjuk, mit jelent üzemeltetni.",
    meta: "Élő · Supabase",
  },
  {
    badge: "Saját termék · Élő",
    badgeColor: "text-[#e7ff00]",
    badgeBorder: "border-[#e7ff00]/30",
    badgeBg: "bg-[#e7ff00]/10",
    title: "Tőzsdei oktatóplatform",
    desc: "Tartalom, közösség és eszközök egy helyen. Kétnyelvű felépítés, folyamatos üzemeltetés.",
    meta: "Next.js · Kétnyelvű",
  },
];

const TRUST_CLAIMS = [
  {
    head: "Mi üzemeltetjük",
    text: "Amit építünk, azt visszük tovább. Monitoring, riasztás, hibakezelés — nem külön megállapodás kérdése.",
  },
  {
    head: "Válasz két munkanapon belül",
    text: "Vállalás, nem ígéret. Ha csúszunk, előre szólunk.",
  },
  {
    head: "Egy felelős ember",
    text: "Nem ügyfélszolgálati sorszámot kapsz, hanem valakit, aki ismeri a projekted.",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Felmérés",
    text: "Megnézzük, mi van most — kód, adatok, számok. Nem tippelünk. Ennek a végén tudod, mibe kerül és mennyi idő.",
  },
  {
    num: "02",
    title: "Terv és keret",
    text: "Fix hatókör, fix árazás, írásos szerződés — szellemi tulajdonnal és adatkezeléssel együtt. Nem ad hoc.",
  },
  {
    num: "03",
    title: "Építés szakaszokban",
    text: "Kéthetente látható eredmény. Élő rendszernél fokozatos átállás — a bolt nem áll le.",
  },
  {
    num: "04",
    title: "Átadás és üzemeltetés",
    text: "Dokumentáció, monitoring, riasztás. Innentől jön a „manage” rész — ha kéred.",
  },
];

export default function Home() {
  // Lekérjük a cikkeket, és csak a legújabb 3 darabot vesszük ki a főoldalra
  const allPostsData = getSortedPostsData();
  const recentPosts = allPostsData.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#e7ff00] selection:text-black overflow-hidden relative cursor-default font-sans">
      <JsonLd data={websiteSchema()} />
      {/* =========================================
          ANIMÁCIÓK ÉS STÍLUSOK
      ========================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        body { scroll-behavior: smooth; }

        @keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-float { animation: floatUp 4s ease-in-out infinite; }

        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .scanline-effect { animation: scanline 8s linear infinite; }

        /* Száguldó fénycsík elválasztók */
        @keyframes dataSweep { 0% { left: -50%; } 100% { left: 150%; } }
        .animate-sweep-fast { animation: dataSweep 4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-sweep-slow { animation: dataSweep 6s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse; }
      `,
        }}
      />

      {/* =========================================
          HÁTTÉR EFFEKTEK
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#e7ff00]/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00E5FF]/5 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-cubes-pattern opacity-[0.15]"></div>
        <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#e7ff00]/20 to-transparent scanline-effect opacity-50"></div>
      </div>

      {/* =========================================
          HERO SZEKCIÓ — a hero maga a bizonyíték
          (a mért műszer külön feladat, ez a kör csak a
          címsort, alcímet és a CTA-kat adja)
      ========================================= */}
      <section className="relative z-10 w-full pt-32 pb-16 lg:pt-48 lg:pb-24 flex flex-col items-center text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black italic tracking-tighter leading-[0.85] mb-8 uppercase text-white drop-shadow-2xl">
            Nem mondjuk <br className="hidden md:block" />
            <span className="text-gray-500">
              hogy gyors<span className="text-[#e7ff00]">.</span>
            </span>
          </h1>

          <p className="max-w-3xl text-lg md:text-xl lg:text-2xl text-gray-400 mb-14 leading-relaxed font-medium border-l-4 border-[#e7ff00] pl-6 py-2 text-left md:text-center md:border-none md:pl-0 mx-auto">
            Megmutatjuk. Az alábbi számokat nem mi írtuk ide — a te böngésződ mérte, most, ahogy
            betöltötte ezt az oldalt.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center">
            <Link
              href="/init"
              className="px-12 py-5 rounded bg-[#e7ff00] text-[#0a0a0a] font-black italic uppercase tracking-[0.3em] text-sm hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_0_40px_rgba(231,255,0,0.3)]"
            >
              Pitcheld el a projekted &rarr;
            </Link>
            <Link
              href="#folyamat"
              className="px-12 py-5 rounded bg-[#121212] text-white font-black italic uppercase tracking-[0.3em] text-sm border border-white/10 hover:border-[#00E5FF]/50 hover:text-[#00E5FF] transition-all duration-300"
            >
              Hogyan dolgozunk
            </Link>
          </div>
          <p className="mt-6 font-mono text-[10px] md:text-xs text-gray-600 uppercase tracking-widest">
            Válasz két munkanapon belül
          </p>
        </div>
      </section>

      {/* =========================================
          CÉGBEMUTATÓ VIDEÓ — placeholder, amíg nincs
          kész anyag; nincs valódi lejátszás, ezért nincs
          rákattintható affordancia sem
      ========================================= */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <p className="text-center font-mono text-xs md:text-sm tracking-[0.3em] text-gray-500 uppercase mb-8">
          Két perc arról, hogyan dolgozunk
        </p>
        <div className="relative aspect-video rounded-xl border border-white/10 bg-[#121212] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]"></div>
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-white/15 flex items-center justify-center">
              <svg className="w-6 h-6 text-white/30 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">
              Videó hamarosan
            </span>
          </div>
        </div>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-8 text-center">
          Bemutatjuk, hogyan dolgozunk egy projekt indulásától az üzemeltetésig — felméréstől az
          élesítésig, saját szavainkkal.
        </p>
      </section>

      {/* =========================================
          MIÉRT LÉTEZIK A THE GBR
      ========================================= */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center">
        <span className="block font-mono text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
          A cég mögött
        </span>
        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-8">
          Húsz év értékesítés, aztán a felismerés
        </h2>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-4">
          Több mint két évtizedet töltöttem értékesítéssel és marketinggel. A THE GBR-t azért
          indítottam, mert a legjobb kampány sem segít, ha a rendszer mögötte nem működik: lassú az
          oldal, elveszik a megkeresés, senki nem méri, mi történik.
        </p>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
          Ma egy hatéves cég vagyunk, és pontosan ezt a két oldalt kötjük össze — az értékesítési
          logikát és a technológiát.
        </p>
        <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          Tóth Gábor · Sales &amp; Management
        </p>
      </section>

      {/* =========================================
          ANIMÁLT ELVÁLASZTÓ 1.
      ========================================= */}
      <div className="w-full h-px relative z-20 overflow-hidden bg-transparent">
        <div className="absolute top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent animate-sweep-fast opacity-50"></div>
      </div>

      {/* =========================================
          AMIT CSINÁLUNK — DEVELOP / MANAGE
      ========================================= */}
      <section id="amit-csinalunk" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <span className="block font-mono text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
            Amit csinálunk
          </span>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
            Két dolog, <span className="text-[#e7ff00]">nem tizenkettő</span>
          </h2>
          <p className="text-gray-400 font-medium text-lg max-w-2xl mx-auto">
            A „mindent tudunk” lista senkit nem győz meg. Két dologban vagyunk jók, és a kettő
            összetartozik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 rounded-xl bg-[#121212] border-2 border-white/5 hover:border-[#e7ff00]/50 transition-all duration-500 group shadow-2xl relative overflow-hidden animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e7ff00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 rounded border-2 border-[#e7ff00]/30 bg-[#e7ff00]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_20px_rgba(231,255,0,0.4)] relative z-10">
              <svg
                className="w-8 h-8 text-[#e7ff00]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                ></path>
              </svg>
            </div>
            <span className="font-mono text-xs text-gray-500 tracking-widest relative z-10">
              01 — DEVELOP
            </span>
            <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white mt-2 mb-4 relative z-10">
              Megépítjük
            </h3>
            <p className="text-gray-400 text-sm font-semibold leading-relaxed mb-6 relative z-10">
              Weboldalak és webshopok Next.js alapon, a mérnöki részletekkel együtt — nem csak úgy,
              hogy szép legyen a nyitóképernyő.
            </p>
            <ul className="space-y-3 relative z-10">
              {DEVELOP_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300 text-sm font-medium">
                  <span className="text-[#e7ff00] mt-0.5">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="p-10 rounded-xl bg-[#121212] border-2 border-white/5 hover:border-[#00E5FF]/50 transition-all duration-500 group shadow-2xl relative overflow-hidden animate-float"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 rounded border-2 border-[#00E5FF]/30 bg-[#00E5FF]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_20px_rgba(0,229,255,0.4)] relative z-10">
              <svg
                className="w-8 h-8 text-[#00E5FF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            </div>
            <span className="font-mono text-xs text-gray-500 tracking-widest relative z-10">
              02 — MANAGE
            </span>
            <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white mt-2 mb-4 relative z-10">
              És visszük tovább
            </h3>
            <p className="text-gray-400 text-sm font-semibold leading-relaxed mb-6 relative z-10">
              Itt dől el, hogy egy projekt siker lesz-e. Az átadás nem a vége — onnantól kezd el
              pénzt termelni.
            </p>
            <ul className="space-y-3 relative z-10">
              {MANAGE_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300 text-sm font-medium">
                  <span className="text-[#00E5FF] mt-0.5">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================
          VIDEÓ ÉS VIZUÁLIS TARTALOM
      ========================================= */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
        <span className="block font-mono text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
          Videó
        </span>
        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-6">
          A weboldal önmagában nem elég
        </h2>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
          Egy jó oldalra tartalom is kell. Reklámfilm, termékvideó, közösségi formátumok — a mi
          irányításunk alatt, ugyanabban az arculatban, mint a weboldal. Így nem lesz külön a „szép
          oldal” és a „valahonnan összeszedett videó”.
        </p>
        <ul className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 font-mono text-xs text-gray-400 uppercase tracking-widest">
          {VIDEO_ITEMS.map((item) => (
            <li key={item} className="flex items-center justify-center gap-2">
              <span className="text-[#e7ff00]">✔</span> {item}
            </li>
          ))}
        </ul>
      </section>

      {/* =========================================
          MŰSZAKI ALAP — statikus, fegyelmezett rács
          (nem mozgó szalag — az AI-generált oldalak
          jellegzetes eleme volt, kivezetve)
      ========================================= */}
      <section className="relative z-10 w-full border-y border-white/5 bg-[#050505] py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="block font-mono text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">
            Műszaki alap
          </span>
          <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-3">
            Amivel dolgozunk
          </h2>
          <p className="text-gray-500 text-sm mb-10 max-w-xl mx-auto">
            Nem minden projektre ugyanaz kell. Ezekkel dolgozunk napi szinten, és ezekért felelünk
            is.
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 font-mono text-sm md:text-base font-bold tracking-widest uppercase text-[#e7ff00]">
            {TECH_STACK.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          MUNKÁK
      ========================================= */}
      <section id="munkak" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <span className="block font-mono text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
            Munkák
          </span>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
            Amin dolgozunk
          </h2>
          <p className="text-gray-400 font-medium text-lg max-w-2xl mx-auto">
            Ügyfélmunka és saját termék. Az utóbbi nem portfólió-töltelék: azért van itt, mert
            ezeket magunk üzemeltetjük, és ez a különbség.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="p-8 rounded-xl bg-[#121212] border border-white/10 flex flex-col gap-4"
            >
              <span
                className={`inline-block w-fit text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border ${project.badgeColor} ${project.badgeBorder} ${project.badgeBg}`}
              >
                {project.badge}
              </span>
              <h3 className="text-xl font-black italic uppercase tracking-tight text-white">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{project.desc}</p>
              <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest border-t border-white/5 pt-4">
                {project.meta}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          ANIMÁLT ELVÁLASZTÓ 2.
      ========================================= */}
      <div className="w-full h-[2px] relative z-20 overflow-hidden bg-white/5">
        <div className="absolute top-0 w-1/4 h-full bg-gradient-to-l from-transparent via-[#e7ff00] to-transparent animate-sweep-slow opacity-60"></div>
      </div>

      {/* =========================================
          A SÖTÉT SZEKCIÓ — a legkeményebb állítás
      ========================================= */}
      <section className="relative z-10 w-full bg-[#050505] py-32 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="block font-mono text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
            Miért számít
          </span>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-6">
            Aki csak épít, annak nincsenek számai
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-16">
            A portfólió megmutatja, mi készült el. Nem mutatja meg, hogy mi lett vele fél évvel
            később. Az átadás után kezdődik az igazi munka — és a legtöbb ügynökség pont ott hagyja
            abba.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            {TRUST_CLAIMS.map((claim) => (
              <div key={claim.head}>
                <h3 className="text-lg font-black uppercase italic text-white mb-3">
                  {claim.head}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{claim.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          CSOMAGOK
      ========================================= */}
      <section id="packages" className="relative z-10 max-w-7xl mx-auto px-6 py-32 bg-[#0a0a0a]">
        <div className="text-center mb-16">
          <span className="block font-mono text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
            Együttműködés
          </span>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
            Hogyan dolgozunk együtt
          </h2>
          <p className="text-gray-400 font-medium text-lg max-w-2xl mx-auto">
            Minden projekt más, ezért fix árlista nincs. Három tipikus felállás — a tiéd
            valószínűleg valamelyikhez közel esik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-10 hover:border-white/30 transition-all flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">
              Belépő
            </span>
            <h3 className="text-3xl font-black italic uppercase text-white mb-6">
              Weboldal és arculat
            </h3>
            <div className="text-4xl font-black text-white mb-8 border-b border-white/10 pb-8">
              Egyedi <span className="text-lg text-gray-500 font-normal">ajánlat</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                <span className="text-[#e7ff00]">✔</span> Vállalati weboldal, egyedi dizájn
              </li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                <span className="text-[#e7ff00]">✔</span> Design rendszer, ami később is használható
              </li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                <span className="text-[#e7ff00]">✔</span> Technikai SEO alapok, mérhető eredménnyel
              </li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                <span className="text-[#e7ff00]">✔</span> Szövegezés, ha kell
              </li>
            </ul>
            <Link
              href="/init?csomag=web-arculat"
              className="w-full py-4 rounded border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all mt-auto block text-center"
            >
              Beszéljünk róla
            </Link>
          </div>

          <div className="bg-gradient-to-b from-[#1a1c00] to-[#121212] border border-[#e7ff00]/50 rounded-2xl p-10 hover:border-[#e7ff00] transition-all transform md:-translate-y-4 shadow-[0_0_30px_rgba(231,255,0,0.15)] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#e7ff00]"></div>
            <span className="text-[10px] font-bold text-[#e7ff00] uppercase tracking-widest mb-2 block">
              A leggyakoribb
            </span>
            <h3 className="text-3xl font-black italic uppercase text-white mb-6">
              Webshop és skálázás
            </h3>
            <div className="text-4xl font-black text-[#e7ff00] mb-8 border-b border-white/10 pb-8">
              Teljes <span className="text-lg text-gray-500 font-normal">infrastruktúra</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-3 text-white font-medium text-sm">
                <span className="text-[#e7ff00]">✔</span> Minden az előzőből
              </li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                <span className="text-[#e7ff00]">✔</span> Webshop nulláról vagy meglévő rendszer
                fölé
              </li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                <span className="text-[#e7ff00]">✔</span> Telefonra telepíthető változat (PWA) — a
                vásárló kezdőlapján
              </li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                <span className="text-[#e7ff00]">✔</span> Fizetés, szállítás, számlázás integrálva
              </li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                <span className="text-[#e7ff00]">✔</span> Admin felület, amit a kollégák is
                használni tudnak
              </li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                <span className="text-[#e7ff00]">✔</span> Kampánykezelés és mérés
              </li>
            </ul>
            <Link
              href="/init?csomag=webshop-skalazas"
              className="w-full py-4 rounded bg-[#e7ff00] text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(231,255,0,0.2)] mt-auto block text-center"
            >
              Beszéljünk róla
            </Link>
          </div>

          <div className="bg-[#121212] border border-white/10 rounded-2xl p-10 hover:border-[#00E5FF]/40 transition-all flex flex-col relative overflow-hidden group">
            <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-widest mb-2 block relative z-10">
              Teljes lefedettség
            </span>
            <h3 className="text-3xl font-black italic uppercase text-white mb-6 relative z-10">
              Fejlesztés és üzemeltetés
            </h3>
            <div className="text-4xl font-black text-white mb-8 border-b border-white/10 pb-8 relative z-10">
              Havi <span className="text-lg text-gray-500 font-normal">keret</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1 relative z-10">
              <li className="flex items-center gap-3 text-white font-medium text-sm">
                <span className="text-[#00E5FF]">✔</span> Minden az előzőből
              </li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                <span className="text-[#00E5FF]">✔</span> Folyamatos fejlesztés havi óraszámban
              </li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                <span className="text-[#00E5FF]">✔</span> Monitoring, hibariasztás, ügyelet
              </li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                <span className="text-[#00E5FF]">✔</span> Tartalom, videó és kampány
              </li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                <span className="text-[#00E5FF]">✔</span> Jogi megfelelés karbantartása
              </li>
              <li className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                <span className="text-[#00E5FF]">✔</span> Egy felelős kapcsolattartó
              </li>
            </ul>
            <Link
              href="/init?csomag=fejlesztes-uzemeltetes"
              className="w-full py-4 rounded border border-[#00E5FF]/40 text-white font-bold uppercase tracking-widest text-xs hover:bg-[#00E5FF]/10 transition-all mt-auto relative z-10 block text-center"
            >
              Beszéljünk róla
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          FOLYAMAT
      ========================================= */}
      <section id="folyamat" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <span className="block font-mono text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
            Folyamat
          </span>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
            Nincs meglepetés a végén
          </h2>
          <p className="text-gray-400 font-medium text-lg max-w-2xl mx-auto">
            Minden szakasz végén van valami, amit meg tudsz nézni.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {PROCESS_STEPS.map((step) => (
            <div key={step.num}>
              <span className="block text-5xl font-black italic text-white/10 mb-4">
                {step.num}
              </span>
              <h3 className="text-lg font-black uppercase italic text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          ANIMÁLT ELVÁLASZTÓ 3.
      ========================================= */}
      <div className="w-full h-px relative z-20 overflow-hidden bg-transparent">
        <div className="absolute top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent animate-sweep-fast opacity-50"></div>
      </div>

      {/* =========================================
          BLOG — DINAMIKUS VÁLTOZAT
      ========================================= */}
      <section
        id="blog"
        className="relative z-10 w-full bg-[#050505] py-32 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="block font-mono text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
                Írások
              </span>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-4">
                Amit közben megtanulunk
              </h2>
              <p className="text-gray-400 font-medium text-lg max-w-xl">
                Nem tartalomgyár. Amit leírunk, azt előbb megcsináltuk.
              </p>
            </div>
            <Link
              href="/hirek"
              className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#e7ff00] transition-colors border-b border-transparent hover:border-[#e7ff00] pb-1"
            >
              Összes írás &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => {
              // Beállítjuk a THE GBR színeket (sárga, cián, fehér) a 3 kártyához
              const colorClasses = ["text-[#e7ff00]", "text-[#00E5FF]", "text-gray-300"];
              const borderClasses = [
                "border-[#e7ff00]/30",
                "border-[#00E5FF]/30",
                "border-gray-500/30",
              ];
              const bgClasses = ["bg-[#e7ff00]/10", "bg-[#00E5FF]/10", "bg-white/5"];
              const hoverClasses = [
                "group-hover:text-[#e7ff00]",
                "group-hover:text-[#00E5FF]",
                "group-hover:text-white",
              ];

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
                        <svg
                          className={`w-16 h-16 ${color}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest ${color} border ${border} ${bg} px-2 py-1 rounded`}
                      >
                        {post.category || "Hírek"}
                      </span>
                    </div>
                    <h3
                      className={`text-2xl font-black italic uppercase tracking-tight text-white mb-3 transition-colors line-clamp-2 ${hover}`}
                    >
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
          ZÁRÓ CTA
      ========================================= */}
      <section id="contact" className="relative z-10 w-full px-6 py-32 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#121212] via-[#0a0a0a] to-[#121212] border-2 border-[#e7ff00]/20 rounded-2xl p-12 md:p-20 text-center shadow-[0_0_50px_rgba(231,255,0,0.1)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#e7ff00]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 relative z-10">
            Pitcheld el a <span className="text-[#e7ff00]">projekted</span>
          </h2>
          <p className="text-lg text-gray-400 font-semibold mb-12 max-w-2xl mx-auto relative z-10">
            Nem minden projektet vállalunk el — ezért kérdezünk előbb. Írd le, mit szeretnél elérni,
            és két munkanapon belül válaszolunk. Ha nem illünk össze, azt is megmondjuk.
          </p>

          <Link
            href="/init"
            className="inline-block px-14 py-6 rounded bg-[#e7ff00] text-[#0a0a0a] font-black italic uppercase tracking-[0.3em] text-sm hover:bg-white transition-all shadow-[0_0_40px_rgba(231,255,0,0.3)] relative z-10"
          >
            Kezdjük &rarr;
          </Link>
          <p className="mt-6 text-xs text-gray-500 font-mono uppercase tracking-widest relative z-10">
            Vagy írj közvetlenül:{" "}
            <a href="mailto:gabor@thegbr.eu" className="text-gray-400 hover:text-[#e7ff00]">
              gabor@thegbr.eu
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
