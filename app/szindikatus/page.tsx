import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";

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

const FACTS = [
  { k: "Értékesítési tapasztalat", v: "20+", suffix: "év" },
  { k: "A cég működése", v: "6", suffix: "év" },
  { k: "Amire specializálódtunk", v: "B2B", suffix: null },
];

const TIMELINE = [
  {
    year: "2002",
    label: "Értékesítés",
    heading: "Direkt értékesítéssel kezdtem",
    body: "Itt tanultam meg a legfontosabbat: a vevőt nem a termék érdekli, hanem hogy megoldja-e a problémáját. Ez azóta is minden döntés alapja.",
    current: false,
  },
  {
    year: "2015",
    label: "Digitális átállás",
    heading: "A piac átment online-ra",
    body: "Az értékesítési tapasztalatot hirdetéskezeléssel és konverzióra épített oldalakkal kötöttem össze. Innentől mérhető lett, mi működik és mi nem.",
    current: false,
  },
  {
    year: "2020",
    label: "A cég",
    heading: "Megalakult a GBR Marketing Solutions Kft.",
    body: "Nem ügynökségnek indult, hanem annak, hogy amit addig egyedül csináltam, az rendszerré váljon.",
    current: false,
  },
  {
    year: "2026",
    label: "Most",
    heading: "Fejlesztés és üzemeltetés",
    body: "Ma már nem csak hirdetünk: megépítjük a rendszert is, ami mögötte áll. Saját termékeket is fejlesztünk és üzemeltetünk — nem referenciának, hanem azért, mert így értjük meg, mit jelent egy élő rendszerért felelni.",
    current: true,
  },
];

const IN_HOUSE_ITEMS = [
  "Fejlesztés — weboldal, webshop, integrációk",
  "Technikai SEO és strukturált adat",
  "Üzemeltetés, monitoring, hibakezelés",
  "Arculat, design rendszer, szövegezés",
  "Kampánykezelés és mérés",
];

const PARTNER_ITEMS = [
  "Videógyártás és utómunka",
  "Jogi háttér — adatvédelem, szerződések",
  "Könyvelés és számlázási integráció",
  "A projekthez szükséges speciális szakértelem",
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Megmondjuk, ha valami nem működik",
    text: "Ha egy kampány nem hoz eredményt, azt jelentjük, nem szépítjük. Ha a projekt csúszik, előre szólunk, nem a határidő napján. A rossz hír időben többet ér, mint a jó hír későn.",
  },
  {
    n: "02",
    title: "Nem ígérünk olyat, amit nem tudunk mérni",
    text: "Rangsort, megtérülést, ügyfélszámot nem garantálunk — azokat nem mi határozzuk meg. Amit igen: a technikai minőséget, a határidőt és azt, hogy ellenőrizhető legyen, mi készült el.",
  },
  {
    n: "03",
    title: "Nem vállalunk el mindent",
    text: "Ha egy projekt nem illik hozzánk, azt az elején mondjuk meg, nem a felénél. Ezért kérdezünk előbb, és ezért van az űrlapon költségkeret-kérdés.",
  },
];

const MARKER_TOP = "clamp(38px,3.9vw,58px)";

function TimelineRow({
  item,
  isFirst,
  isLast,
}: {
  item: (typeof TIMELINE)[number];
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[34px_1fr] sm:grid-cols-[minmax(100px,15%)_56px_1fr] ${
        isLast ? "" : "border-b border-[var(--rule)]"
      }`}
    >
      <div
        className={`hidden sm:block text-right pl-6 py-[clamp(30px,3.4vw,50px)] font-display font-extrabold [font-size:var(--text-tl-year)] tracking-[-0.045em] leading-none ${
          item.current ? "text-[var(--ink)]" : "text-[var(--mid)]"
        }`}
      >
        {item.year}
      </div>

      <div className="relative">
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px"
          style={{
            top: isFirst ? MARKER_TOP : 0,
            bottom: isLast ? undefined : 0,
            height: isLast ? MARKER_TOP : undefined,
            background: item.current
              ? "linear-gradient(to bottom, var(--rule) 0%, var(--signal) 30%, var(--signal) 100%)"
              : "var(--rule)",
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: MARKER_TOP,
            transform: "translate(-50%, -50%)",
            width: item.current ? 13 : 9,
            height: item.current ? 13 : 9,
            background: item.current ? "var(--signal)" : "var(--ground)",
            border: `1px solid ${item.current ? "var(--signal)" : "var(--mid)"}`,
          }}
        />
      </div>

      <div className="py-[clamp(30px,3.4vw,50px)] pr-6 sm:pl-0 pl-2">
        <div
          className={`sm:hidden font-display font-extrabold [font-size:var(--text-tl-year)] tracking-[-0.045em] leading-none mb-[var(--space-3)] ${
            item.current ? "text-[var(--ink)]" : "text-[var(--mid)]"
          }`}
        >
          {item.year}
        </div>
        <div
          className={`[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase mb-[var(--space-2)] ${
            item.current ? "text-[var(--signal-deep)]" : "text-[var(--mid)]"
          }`}
        >
          {item.label}
        </div>
        <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.028em] mb-[var(--space-3)]">
          {item.heading}
        </h3>
        <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch] m-0">
          {item.body}
        </p>
      </div>
    </div>
  );
}

export default function Szindikatus() {
  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Rólunk", url: `${SITE_URL}/szindikatus` },
        ])}
      />

      {/* ===== SÖTÉT FEJLÉC ===== */}
      <Rail label="Rólunk" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <h1 className="font-display font-black leading-[0.88] tracking-[-0.055em] [font-size:var(--text-display)] max-w-[14ch]">
            Nem fejlesztőként kezdtük<span className="text-[var(--signal)]">.</span>
          </h1>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[52ch] mt-[var(--space-8)]">
            Húsz évet töltöttem értékesítéssel és marketinggel, mielőtt egy sor kódot írattam volna.
            Ezért nem az a kérdés nálunk, hogy milyen technológiával épül a rendszer, hanem hogy
            hoz-e ügyfelet.{" "}
            <strong className="text-[var(--ink)]">
              A THE GBR hat éves. A tapasztalat, ami mögötte van, jóval régebbi.
            </strong>
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[var(--rule)]">
          {FACTS.map((fact, i) => (
            <div
              key={fact.k}
              className={`px-6 py-[clamp(22px,2.6vw,34px)] border-[var(--rule)] ${
                i < FACTS.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""
              }`}
            >
              <span className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-3)]">
                {fact.k}
              </span>
              <div className="font-display font-extrabold [font-size:var(--text-gauge)] tracking-[-0.05em] leading-[0.88] text-[var(--ink)]">
                {fact.v}
                {fact.suffix && (
                  <span className="text-[0.3em] font-semibold text-[var(--mid)] ml-[var(--space-1)]">
                    {fact.suffix}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== IDŐVONAL ===== */}
      <Rail label="Az út">
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-8)]">
          <Eyebrow>Az út</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch] text-[var(--ink)]">
            Hogyan jutottunk idáig
          </h2>
        </section>
        <div className="border-t border-[var(--rule)]">
          {TIMELINE.map((item, i) => (
            <TimelineRow
              key={item.year}
              item={item}
              isFirst={i === 0}
              isLast={i === TIMELINE.length - 1}
            />
          ))}
        </div>
      </Rail>

      {/* ===== A CSAPAT / HÁLÓZAT ===== */}
      <Rail label="A csapat">
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-8)] sm:pb-[var(--space-10)] border-t border-[var(--rule)]">
          <Eyebrow>Ahogy dolgozunk</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch] text-[var(--ink)] mb-[var(--space-5)]">
            Szűk csapat, megbízható partnerek
          </h2>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[64ch]">
            Nem vagyunk nagy ügynökség, és nem is akarunk azzá válni. A munka nagy részét házon
            belül végezzük — ott, ahol a minőségért közvetlenül felelni tudunk. Amihez külön
            szakértelem kell, ahhoz partnereket hívunk, akikkel korábban is dolgoztunk.
          </p>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[64ch] mt-[var(--space-4)]">
            Fejlesztési partnerként is dolgozunk — magyar és nyugat-európai ügynökségeknek
            egyaránt.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[var(--rule)]">
          <div className="px-6 py-[clamp(28px,3.2vw,46px)] border-b sm:border-b-0 sm:border-r border-[var(--rule)]">
            <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] mb-[var(--space-2)]">
              Ami házon belül készül
            </h3>
            <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-5)]">
              Ezekért közvetlenül felelünk
            </div>
            <ul className="m-0 p-0 list-none">
              {IN_HOUSE_ITEMS.map((item, i) => (
                <li
                  key={item}
                  className={`[font-size:var(--text-base)] text-[var(--ink-2)] py-[var(--space-3)] ${
                    i > 0 ? "border-t border-[var(--rule-soft)]" : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 py-[clamp(28px,3.2vw,46px)]">
            <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] mb-[var(--space-2)]">
              Amihez partnert hívunk
            </h3>
            <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-5)]">
              Ellenőrzött, visszatérő partnerek
            </div>
            <ul className="m-0 p-0 list-none">
              {PARTNER_ITEMS.map((item, i) => (
                <li
                  key={item}
                  className={`[font-size:var(--text-base)] text-[var(--ink-2)] py-[var(--space-3)] ${
                    i > 0 ? "border-t border-[var(--rule-soft)]" : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,32%)_1fr] gap-[var(--space-6)] sm:gap-[var(--space-10)] px-6 py-[clamp(28px,3.2vw,46px)] border-t border-b border-[var(--rule)] items-start">
          <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] m-0">
            Egy kapcsolattartó
          </h3>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[60ch] m-0">
            Nem kell szolgáltatókat koordinálnod. Egy emberrel beszélsz, aki ismeri a projektet, és
            aki felel a szállításért. A koordináció a mi dolgunk, nem a tiéd.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,32%)_1fr] gap-[var(--space-6)] sm:gap-[var(--space-10)] px-6 py-[clamp(28px,3.2vw,46px)] border-b border-[var(--rule)] bg-[var(--panel)] items-start">
          <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] m-0">
            Amit nem vállalunk
          </h3>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[60ch] m-0">
            Van, amit nem csinálunk — és ezt előre megmondjuk. Jobban jársz azzal, ha időben
            elküldünk valakihez, aki ért hozzá, mint ha belefognánk.
          </p>
        </div>
      </Rail>

      <Seam />

      {/* ===== ALAPELVEK ===== */}
      <Rail label="Alapelvek" dark>
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-8)]">
          <Eyebrow>Alapelvek</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch] text-[var(--ink)]">
            Három dolog, amit betartunk
          </h2>
        </section>
        <div className="border-t border-[var(--rule)]">
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.n}
              className={`grid grid-cols-1 sm:grid-cols-[minmax(80px,10%)_1fr] gap-[var(--space-4)] sm:gap-[var(--space-10)] px-6 py-[clamp(30px,3.6vw,54px)] items-start ${
                i < PRINCIPLES.length - 1 ? "border-b border-[var(--rule)]" : ""
              }`}
            >
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-sm)] tracking-[0.16em] text-[var(--signal)] pt-[var(--space-2)]">
                {p.n}
              </span>
              <div>
                <h3 className="font-display font-bold [font-size:var(--text-svc-title)] tracking-[-0.032em] leading-[1.05] max-w-[22ch] mb-[var(--space-4)] text-[var(--ink)]">
                  {p.title}
                </h3>
                <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[60ch] m-0">
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== CTA ===== */}
      <Rail label="Kapcsolat" dark>
        <section className="px-6 py-[var(--space-20)] sm:py-[var(--space-32)]">
          <Eyebrow>Kapcsolat</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-final)] leading-[0.92] tracking-[-0.055em] max-w-[13ch] mb-[var(--space-6)] text-[var(--ink)]">
            Ha ez így hangzik jól
          </h2>
          <p className="[font-size:var(--text-base)] text-[var(--ink-2)] max-w-[54ch] leading-relaxed mb-[var(--space-8)]">
            Írd le, mit szeretnél elérni, és két munkanapon belül válaszolunk. Ha nem illünk össze,
            azt is megmondjuk.
          </p>
          <Button asChild>
            <Link href="/init">Pitcheld el a projekted &rarr;</Link>
          </Button>
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)] mt-[var(--space-6)]">
            Vagy írj közvetlenül: gabor@thegbr.eu
          </p>
        </section>
      </Rail>
    </main>
  );
}
