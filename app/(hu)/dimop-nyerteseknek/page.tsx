import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, faqPageSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, Eyebrow, Rail } from "@/app/components/ui";

// DIMOP-nyerteseknek szóló ajánlat: a pályázat MELLÉ tesszük az értékesítési
// folyamatot, a cég saját keretéből. Szabály: nem adjuk el újra a katalógus
// tételeit, nem írunk pályázatot, nem ígérünk forgalmat. A pályázat-térkép
// tartalma (melyik célhoz melyik tétel) és az ár nem kerül az oldalra.

const PATH = "/dimop-nyerteseknek";
const TITLE = "DIMOP-nyerteseknek: legyen a fejlesztésből megkeresés is | THE GBR";
const DESCRIPTION =
  "A DIMOP-ból kapott eszközöket a katalógus szállítója hozza. Mi a folyamatot tesszük mellé: ki válaszol, mennyi idő alatt, mi lesz az ajánlattal. A saját keretedből, az elszámoláshoz nem nyúlva.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${PATH}` },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const LEPESEK = [
  {
    n: "01",
    cim: "Pályázat-térkép",
    ido: "30 perc + 5 munkanap",
    szoveg:
      "Átnézzük a támogatói okiratot és a vállalt fejlesztési célokat. Írásban megkapod, mi jön a katalógusból, és mi az, ami mellé kell ahhoz, hogy megkeresés legyen belőle.",
  },
  {
    n: "02",
    cim: "Értékesítési rendszer bekötése",
    ido: "3–4 hét",
    szoveg:
      "Minden megkeresés egy helyre fut, felelőssel. Válaszvázlat, lejárat előtti jelzés, alvó ajánlatok, heti riport. Ahol a kapott eszköz engedi, hozzá kötjük.",
  },
  {
    n: "03",
    cim: "Az első 90 nap",
    ido: "havidíj",
    szoveg:
      "Havonta mért számok: hány megkeresés jött, mennyi idő alatt kapott választ, hány ajánlat lett belőle és hány zárult. Előtte–utána összevetéssel.",
  },
] as const;

const VALLALJUK = [
  "Fix ár a leírt hatókörre, a beszélgetés után írásban.",
  "Egy kapcsolattartó az első hívástól.",
  "Semmi nem megy ki az ügyfeleidnek a jóváhagyásod nélkül.",
] as const;

const NEM = [
  "Nem írunk pályázatot, és nem végezzük az elszámolást.",
  "Nem vásárolunk katalóguson kívül a támogatásból.",
  "Nem ígérünk forgalmat vagy bevételt. Azt mérjük, ami történik.",
] as const;

const GYIK = [
  {
    question: "Megvehetem tőletek a pályázat pénzéből?",
    answer:
      "Nem ezt ajánljuk. A kamarai pályázói segédlet szerint ha egy termék szerepel a szállítói katalógusban, azt onnan kell beszerezni, különben a végelszámolás elutasítható. A mi munkánk ezért a pályázat mellé kerül, a saját keretedből, és nem érinti az elszámolást.",
  },
  {
    question: "Pályázatot vagy elszámolást is vállaltok?",
    answer:
      "Nem. Az a pályázatíród feladata. Mi azt nézzük meg, mi kell a kapott eszközök mellé ahhoz, hogy megkeresés és megrendelés legyen belőlük.",
  },
  {
    question: "Mennyibe kerül?",
    answer:
      "Fix ár a leírt hatókörre. A 30 perces beszélgetés után írásban kapod meg, a cégedre szabva.",
  },
  {
    question: "Mi kell tőlem az induláshoz?",
    answer:
      "A támogatói okirat vagy a vállalt fejlesztési célok listája, és 30 perc. A többit mi kérdezzük.",
  },
  {
    question: "Mikor érdemes szólni?",
    answer:
      "Minél előbb. A megvalósításra legfeljebb 24 hónap van, és a folyamatot könnyebb az eszközökkel együtt felépíteni, mint utólag ráhúzni.",
  },
];

const H2 =
  "font-display font-black [font-size:var(--text-section)] leading-[0.95] tracking-[-0.045em] max-w-[18ch] text-[var(--ink)]";
const LEAD = "[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch]";
const SECTION = "px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-10)] border-t border-[var(--rule)]";

function Pont() {
  return <span className="text-[var(--signal)]">.</span>;
}

export default function DimopNyerteseknek() {
  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "DIMOP-nyerteseknek", url: `${SITE_URL}${PATH}` },
        ])}
      />
      <JsonLd data={faqPageSchema(GYIK, { inLanguage: "hu-HU" })} />

      {/* ===== HERO ===== */}
      <Rail label="DIMOP">
        <section className="px-6 pt-[var(--space-10)] sm:pt-[var(--space-16)] pb-[var(--space-12)] sm:pb-[var(--space-16)]">
          <Eyebrow>DIMOP-nyerteseknek · a pályázat mellé</Eyebrow>
          <h1 className="font-display font-black leading-[0.92] tracking-[-0.05em] [font-size:var(--text-claim)] max-w-[14ch]">
            A támogatás eszközt ad. Vevőt a folyamat hoz<Pont />
          </h1>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[52ch] mt-[var(--space-8)]">
            A DIMOP-ból kapott honlap, ügyfélkezelő és felhőszolgáltatás a kamarai katalógus szállítójától
            érkezik, egységáron. Ettől még senki nem válaszol gyorsabban egy megkeresésre, és egy ajánlat
            sem kerül elő újra a harmadik napon. Mi ezt a részt tesszük mellé: a saját keretedből, a
            pályázat elszámolásához nem nyúlva.
          </p>
          <div className="mt-[var(--space-8)] flex flex-wrap gap-[var(--space-3)]">
            <Button asChild>
              <Link href="/init">Küldöm az okiratot</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="#lepesek">Mit csinálunk pontosan?</Link>
            </Button>
          </div>

          <div className="mt-[var(--space-12)] grid grid-cols-1 md:grid-cols-2 border border-[var(--rule)] bg-[var(--panel)]">
            <div className="p-[var(--space-6)]">
              <Eyebrow className="!mb-[var(--space-2)]">A pályázatból</Eyebrow>
              <h2 className="font-display font-bold text-[length:var(--text-lg)] tracking-[-0.02em]">Az eszközök</h2>
              <p className="mt-[var(--space-2)] text-[var(--ink-2)]">
                Honlap, ügyfélkezelő, felhő, e-számla, IT-biztonság. A katalógus szállítója szállítja, a
                pályázatíród számol el vele.
              </p>
            </div>
            <div className="p-[var(--space-6)] border-t md:border-t-0 md:border-l border-[var(--rule)]">
              <Eyebrow className="!mb-[var(--space-2)]">Mellé, tőlünk</Eyebrow>
              <h2 className="font-display font-bold text-[length:var(--text-lg)] tracking-[-0.02em]">A folyamat</h2>
              <p className="mt-[var(--space-2)] text-[var(--ink-2)]">
                Ki válaszol, mennyi idő alatt, mi történik az ajánlattal, és honnan látod hétről hétre, hogy
                működik.
              </p>
            </div>
          </div>
        </section>
      </Rail>

      {/* ===== LÉPÉSEK ===== */}
      <Rail label="Lépések">
        <section id="lepesek" className={SECTION}>
          <Eyebrow>Amit vállalunk</Eyebrow>
          <h2 className={H2}>
            Három lépés, mindegyik határidővel<Pont />
          </h2>
          <ol className="mt-[var(--space-10)] border-t border-[var(--ink)] list-none p-0 m-0">
            {LEPESEK.map((l) => (
              <li
                key={l.n}
                className="grid grid-cols-[40px_1fr] sm:grid-cols-[56px_1fr_160px] gap-[var(--space-4)] py-[var(--space-6)] border-b border-[var(--rule)]"
              >
                <span className="[font-family:var(--font-mono)] text-[length:var(--text-sm)] text-[var(--signal-ink)] font-semibold pt-1">
                  {l.n}
                </span>
                <div>
                  <h3 className="font-display font-bold text-[length:var(--text-xl)] tracking-[-0.02em]">{l.cim}</h3>
                  <p className={`${LEAD} mt-[var(--space-2)]`}>{l.szoveg}</p>
                </div>
                <span className="col-start-2 sm:col-start-auto [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.08em] text-[var(--dim)] sm:text-right pt-1">
                  {l.ido}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </Rail>

      {/* ===== FONTOS TUDNI ===== */}
      <Rail label="Fontos" dark>
        <section className="px-6 py-[var(--space-16)] sm:py-[var(--space-20)]">
          <Eyebrow>Fontos tudni a végelszámolás előtt</Eyebrow>
          <p className="[font-size:var(--text-xl)] leading-snug max-w-[60ch] text-[var(--ink)]">
            A kamarai pályázói segédlet szerint{" "}
            <strong className="text-[var(--signal)] font-semibold">
              ha egy termék szerepel a szállítói katalógusban, azt onnan kell beszerezni
            </strong>
            , különben a végelszámolás elutasítható. Ezért mi nem a katalógus tételeit adjuk el újra, és nem a
            pályázat pénzéből dolgozunk. A projekt megvalósítására legfeljebb 24 hónapod van.
          </p>
        </section>
      </Rail>

      {/* ===== VÁLLALJUK / NEM ===== */}
      <Rail label="Keret">
        <section className={SECTION}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-10)]">
            <div>
              <Eyebrow>Amit vállalunk</Eyebrow>
              <h2 className="font-display font-black text-[length:var(--text-2xl)] tracking-[-0.03em]">
                Leírt hatókör, határidő, mért számok<Pont />
              </h2>
              <ul className="mt-[var(--space-5)] space-y-[var(--space-3)] text-[var(--ink-2)] list-disc pl-5">
                {VALLALJUK.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>Amit nem</Eyebrow>
              <h2 className="font-display font-black text-[length:var(--text-2xl)] tracking-[-0.03em]">
                Ami a pályázatíródé<Pont />
              </h2>
              <ul className="mt-[var(--space-5)] space-y-[var(--space-3)] text-[var(--ink-2)] list-disc pl-5">
                {NEM.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Rail>

      {/* ===== GYIK ===== */}
      <Rail label="Kérdések">
        <section className={SECTION}>
          <Eyebrow>Gyakori kérdések</Eyebrow>
          <h2 className={H2}>
            Amit a nyertesek kérdeznek<Pont />
          </h2>
          <div className="mt-[var(--space-10)] border-t border-[var(--rule)]">
            {GYIK.map((k) => (
              <div key={k.question} className="py-[var(--space-6)] border-b border-[var(--rule)]">
                <h3 className="font-display font-bold text-[length:var(--text-lg)] tracking-[-0.02em]">{k.question}</h3>
                <p className={`${LEAD} mt-[var(--space-2)]`}>{k.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </Rail>

      {/* ===== CTA ===== */}
      <Rail label="Egy lépés">
        <section className={`${SECTION} pb-[var(--space-24)]`}>
          <div className="border border-[var(--ink)] bg-[var(--panel)] p-[var(--space-8)] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[var(--space-6)] items-center">
            <div>
              <Eyebrow>Egy lépés</Eyebrow>
              <h2 className="font-display font-black text-[length:var(--text-3xl)] tracking-[-0.04em] leading-[0.95]">
                Küldd át a támogatói okiratot<Pont />
              </h2>
              <p className={`${LEAD} mt-[var(--space-4)]`}>
                Vagy csak a vállalt célok listáját. 30 percben megnézzük együtt, mi jön a pályázatból, és mi kell
                mellé.
              </p>
            </div>
            <Button asChild>
              <Link href="/init">Kérem a 30 percet</Link>
            </Button>
          </div>
          <p className="mt-[var(--space-6)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.06em] text-[var(--dim)] max-w-[80ch]">
            Ez az oldal nem pályázati tanácsadás. A pályázattal kapcsolatos döntésekhez és az elszámoláshoz
            fordulj a pályázatíródhoz.
          </p>
        </section>
      </Rail>
    </main>
  );
}
