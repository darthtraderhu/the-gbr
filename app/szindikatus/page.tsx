import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";

const DESCRIPTION =
  "Húsz év értékesítési tapasztalat, hat éves cég, és egy szűk csapat megbízható partnerekkel. Így dolgozunk, és ezt vállaljuk.";

export const metadata: Metadata = {
  title: "Rólunk | THE GBR",
  description: DESCRIPTION,
  alternates: {
    canonical: "/szindikatus",
  },
  openGraph: {
    title: "Rólunk | THE GBR",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rólunk | THE GBR",
    description: DESCRIPTION,
  },
};

const TIMELINE = [
  {
    year: "2002",
    color: "#e7ff00",
    title: "Értékesítés",
    text: "Direkt értékesítéssel kezdtem. Itt tanultam meg a legfontosabbat: a vevőt nem a termék érdekli, hanem hogy megoldja-e a problémáját. Ez azóta is minden döntés alapja.",
    current: false,
  },
  {
    year: "2015",
    color: "#00E5FF",
    title: "Digitális átállás",
    text: "A piac átment online-ra. Az értékesítési tapasztalatot hirdetéskezeléssel és konverzióra épített oldalakkal kötöttem össze. Innentől mérhető lett, mi működik és mi nem.",
    current: false,
  },
  {
    year: "2020",
    color: "#9d00ff",
    title: "A cég",
    text: "Megalakult a GBR Marketing Solutions Kft. Nem ügynökségnek indult, hanem annak, hogy amit addig egyedül csináltam, az rendszerré váljon.",
    current: false,
  },
  {
    year: "2026 // Jelen",
    color: "#e7ff00",
    title: "Fejlesztés és üzemeltetés",
    text: "Ma már nem csak hirdetünk: megépítjük a rendszert is, ami mögötte áll. Saját termékeket is fejlesztünk és üzemeltetünk — nem referenciának, hanem azért, mert így értjük meg, mit jelent egy élő rendszerért felelni.",
    current: true,
  },
];

const NETWORK_BLOCKS = [
  {
    title: "Ami házon belül készül",
    text: "Fejlesztés, technikai SEO, üzemeltetés, arculat. Ezekért közvetlenül felelünk, és ezeket nem adjuk ki.",
    color: "#e7ff00",
  },
  {
    title: "Amihez partnert hívunk",
    text: "Videógyártás, jogi háttér, és a projekthez szükséges speciális szakértelem. Ellenőrzött partnerek, akikkel korábban is dolgoztunk — nem alkalmi alvállalkozók.",
    color: "#00E5FF",
  },
  {
    title: "Egy kapcsolattartó",
    text: "Nem kell szolgáltatókat koordinálnod. Egy emberrel beszélsz, aki ismeri a projektet, és aki felel a szállításért.",
    color: "#9d00ff",
  },
  {
    title: "Amit nem vállalunk",
    text: "Van, amit nem csinálunk — és ezt előre megmondjuk. Jobban jársz azzal, ha időben elküldünk valakihez, aki ért hozzá, mint ha belefognánk.",
    color: "#e7ff00",
  },
];

const PRINCIPLES = [
  {
    title: "01. Megmondjuk, ha valami nem működik",
    color: "#e7ff00",
    text: "Ha egy kampány nem hoz eredményt, azt jelentjük, nem szépítjük. Ha a projekt csúszik, előre szólunk, nem a határidő napján. A rossz hír időben többet ér, mint a jó hír későn.",
  },
  {
    title: "02. Nem ígérünk olyat, amit nem tudunk mérni",
    color: "#00E5FF",
    text: "Rangsort, megtérülést, ügyfélszámot nem garantálunk — azokat nem mi határozzuk meg. Amit igen: a technikai minőséget, a határidőt és azt, hogy ellenőrizhető legyen, mi készült el.",
  },
  {
    title: "03. Nem vállalunk el mindent",
    color: "#9d00ff",
    text: "Ha egy projekt nem illik hozzánk, azt az elején mondjuk meg, nem a felénél. Ezért kérdezünk előbb, és ezért van az űrlapon költségkeret-kérdés.",
  },
];

export default function Szindikatus() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#e7ff00] selection:text-black relative font-sans overflow-hidden">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Rólunk", url: `${SITE_URL}/szindikatus` },
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

        .bg-blueprint {
          background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Idővonal vonal effekt */
        .git-branch { position: relative; }
        .git-branch::before {
          content: ''; position: absolute; left: 23px; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, #e7ff00, #00E5FF, #9d00ff);
          opacity: 0.5; z-index: 0;
        }

        /* Hálózat Pulzálás */
        @keyframes network-pulse { 0% { box-shadow: 0 0 0 0 rgba(231,255,0, 0.4); } 70% { box-shadow: 0 0 0 20px rgba(231,255,0, 0); } 100% { box-shadow: 0 0 0 0 rgba(231,255,0, 0); } }
        .animate-network { animation: network-pulse 2s infinite; }
      `,
        }}
      />

      {/* =========================================
          HÁTTÉR
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-blueprint">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#e7ff00]/5 blur-[200px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#9d00ff]/5 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#e7ff00]/10 to-transparent scanline-effect opacity-50"></div>
      </div>

      {/* =========================================
          HERO
      ========================================= */}
      <section className="relative z-10 w-full pt-40 pb-20 px-6 flex flex-col items-center text-center">
        <div className="w-full border-y border-white/5 bg-[#050505] py-3 flex items-center justify-center gap-4 mb-12 shadow-[inset_0_0_20px_rgba(231,255,0,0.02)]">
          <span className="text-gray-600 font-mono font-bold text-sm tracking-widest">{"//"}</span>
          <span className="font-mono font-bold text-xs md:text-sm tracking-[0.4em] text-[#e7ff00] uppercase drop-shadow-[0_0_10px_rgba(231,255,0,0.5)]">
            RÓLUNK
          </span>
          <span className="text-gray-600 font-mono font-bold text-sm tracking-widest">{"//"}</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-tight mb-6 uppercase text-white drop-shadow-2xl">
          Nem fejlesztőként <br className="hidden md:block" />
          <span className="text-[#00E5FF] drop-shadow-[0_0_30px_rgba(0,229,255,0.4)]">
            kezdtük.
          </span>
        </h1>
        <p className="max-w-3xl text-gray-400 font-medium text-lg md:text-xl leading-relaxed mb-16 border-l-4 border-[#00E5FF] pl-4 text-left md:text-center md:border-none md:pl-0 mx-auto">
          Húsz évet töltöttem értékesítéssel és marketinggel, mielőtt egy sor kódot írattam volna.
          Ezért nem az a kérdés nálunk, hogy milyen technológiával épül a rendszer, hanem hogy hoz-e
          ügyfelet.{" "}
          <strong className="text-white">
            A THE GBR hat éves. A tapasztalat, ami mögötte van, jóval régebbi.
          </strong>
        </p>

        {/* Trust-sáv */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-mono text-[10px] md:text-xs text-gray-500 uppercase tracking-widest bg-[#121212] border border-white/10 px-8 py-4 rounded-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[#e7ff00] font-black text-lg">20+ év</span>
            <span>Értékesítési tapasztalat</span>
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[#00E5FF] font-black text-lg">6 év</span>
            <span>A cég működése</span>
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[#9d00ff] font-black text-lg">B2B</span>
            <span>Amire specializálódtunk</span>
          </div>
        </div>
      </section>

      {/* =========================================
          IDŐVONAL (AZ ÚT)
      ========================================= */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <p className="text-center font-mono text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
          Az út
        </p>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-16 text-center">
          Hogyan jutottunk idáig
        </h2>

        <div className="git-branch space-y-16">
          {TIMELINE.map((item) => (
            <div key={item.year} className="relative pl-16 group">
              {item.current ? (
                <div className="absolute left-3 top-0.5 w-6 h-6 rounded-full bg-[#e7ff00]/20 flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 rounded-full bg-[#0a0a0a] border-4 border-[#e7ff00] z-10"></div>
                </div>
              ) : (
                <div
                  className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-[#0a0a0a] border-4 z-10 group-hover:scale-125 transition-transform"
                  style={{ borderColor: item.color, boxShadow: `0 0 15px ${item.color}80` }}
                ></div>
              )}
              <div
                className="font-mono text-[10px] uppercase tracking-widest mb-1"
                style={{ color: item.current ? item.color : "#6b7280" }}
              >
                {item.year}
              </div>
              <h3 className="text-2xl font-black italic uppercase text-white mb-3">{item.title}</h3>
              <div
                className={
                  item.current
                    ? "bg-gradient-to-br from-[#121212] to-[#0a0a0a] border border-[#e7ff00]/50 rounded-lg p-8 shadow-[0_0_30px_rgba(231,255,0,0.1)]"
                    : "bg-[#121212] border border-white/5 rounded-lg p-6 transition-colors"
                }
              >
                <p
                  className={
                    item.current
                      ? "text-gray-300 text-base leading-relaxed font-medium"
                      : "text-gray-400 text-sm leading-relaxed font-medium"
                  }
                >
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          AHOGY DOLGOZUNK (a hálózat-szekció helyett)
      ========================================= */}
      <section className="relative z-10 w-full bg-[#050505] border-y border-white/5 py-32 overflow-hidden">
        {/* Háttér radar effekt */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div
            className="w-[80vw] h-[80vw] rounded-full border border-[#00E5FF] animate-ping"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute w-[60vw] h-[60vw] rounded-full border border-[#e7ff00] animate-ping"
            style={{ animationDuration: "3s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <p className="font-mono text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
              Ahogy dolgozunk
            </p>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 text-white">
              Szűk csapat, <span className="text-[#00E5FF]">megbízható partnerek</span>
            </h2>
            <p className="text-gray-400 font-medium text-lg md:text-xl leading-relaxed mb-4">
              Nem vagyunk nagy ügynökség, és nem is akarunk azzá válni. A munka nagy részét házon
              belül végezzük — ott, ahol a minőségért közvetlenül felelni tudunk. Amihez külön
              szakértelem kell, ahhoz partnereket hívunk, akikkel korábban is dolgoztunk.
            </p>
            <p className="text-gray-400 font-medium text-lg md:text-xl leading-relaxed">
              Neked viszont <strong className="text-white">egy kapcsolattartód van.</strong> A
              koordináció a mi dolgunk, nem a tiéd.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NETWORK_BLOCKS.map((block) => (
              <div
                key={block.title}
                className="bg-[#121212] border border-white/10 rounded-xl p-8 transition-colors group"
              >
                <h3 className="text-xl md:text-2xl font-black italic uppercase text-white mb-4">
                  <span style={{ color: block.color }}>—</span> {block.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          ALAPELVEK
      ========================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <p className="text-center font-mono text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
          Alapelvek
        </p>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-12 text-center">
          Három dolog, amit betartunk
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="bg-[#121212] border border-white/5 rounded-lg p-8">
              <h3
                className="text-lg md:text-xl font-black uppercase mb-3 border-b border-white/10 pb-3"
                style={{ color: p.color }}
              >
                {p.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          CTA
      ========================================= */}
      <section className="relative z-10 w-full px-6 pb-32">
        <div className="relative w-full max-w-5xl mx-auto rounded-3xl bg-[#e7ff00] p-12 md:p-20 text-center shadow-[0_0_40px_rgba(231,255,0,0.15)] transform transition-transform duration-500 hover:scale-[1.02]">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-black uppercase italic leading-none tracking-tighter mb-8">
            Ha ez így hangzik jól
          </h2>
          <p className="text-black/70 text-sm md:text-base font-semibold max-w-xl mx-auto mb-10">
            Írd le, mit szeretnél elérni, és két munkanapon belül válaszolunk. Ha nem illünk össze,
            azt is megmondjuk.
          </p>

          <Link
            href="/init"
            className="inline-flex items-center gap-3 bg-black text-white font-black uppercase text-sm md:text-base tracking-widest px-10 py-5 transition-all duration-300 hover:bg-white hover:text-black shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] group"
          >
            Pitcheld el a projekted{" "}
            <span className="text-[#e7ff00] group-hover:text-black transition-colors duration-300">
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
