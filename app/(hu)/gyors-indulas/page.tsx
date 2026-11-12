import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import KostoloJel from "@/app/components/KostoloJel";
import { FactStrip } from "@/app/components/SalesBlocks";
import { Button, Eyebrow, Rail, Seam } from "@/app/components/ui";
import { GYORS_INDULAS_PATH, TERMEKEK, formatFt, termekPath } from "@/lib/gyors-indulas";

const TITLE = "Fix áras első lépések: kicsi munka, pontos ár, határidő | THE GBR";
const DESCRIPTION =
  "Kicsi, rögzített tartalmú munkák cégeknek, pontos nettó árral és határidővel: megkeresés-teszt, gyorsátvilágítás, alvó ajánlatok újraélesztése, javítócsomag, jogi-technikai gyorsellenőrzés, AI-láthatósági felmérés. Díjbekérővel, előfizetés nélkül.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: GYORS_INDULAS_PATH },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function GyorsIndulas() {
  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Fix áras első lépések", url: `${SITE_URL}${GYORS_INDULAS_PATH}` },
        ])}
      />

      {/* ===== FEJLÉC ===== */}
      <Rail label="Fix áron" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-10)] sm:pb-[var(--space-16)]">
          <KostoloJel className="mb-[var(--space-5)]" />
          <h1 className="font-display font-black leading-[0.9] tracking-[-0.052em] [font-size:var(--text-claim)] max-w-[15ch]">
            Kicsiben kezdünk, fix áron, határidővel
            <span className="text-[var(--signal)]">.</span>
          </h1>
          <div className="mt-[var(--space-8)] space-y-[var(--space-5)]">
            <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[56ch]">
              Nem kell rögtön nagy projektbe vágnod ahhoz, hogy kiderüljön, hol veszítesz vevőt. Ezek
              kicsi, rögzített tartalmú munkák: tudod, mit kapsz, mennyiért és mikorra.
            </p>
            <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch]">
              Kiválasztod, kitöltöd a rendelőűrlapot, két munkanapon belül küldjük a díjbekérőt.
              Nincs előfizetés, nincs ajánlatkérés, nincs alkudozás.
            </p>
          </div>
        </section>
        <FactStrip
          facts={[
            { value: "Fix ár", label: "nettó, az oldalon kiírva" },
            { value: "Határidő", label: "minden terméknél kiírva, munkanapban vagy órában" },
            { value: "Cégeknek", label: "díjbekérővel, átutalással, előfizetés nélkül" },
          ]}
        />
      </Rail>

      <Seam />

      {/* ===== TERMÉKEK ===== */}
      <Rail label="Termékek">
        <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)]">
          <Eyebrow>Válassz egyet</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch]">
            Ezekkel indulhatsz most
          </h2>
        </section>
        <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 border-t border-l border-[var(--rule)]">
          {TERMEKEK.map((t) => (
            <li key={t.id} className="relative border-r border-b border-[var(--rule)] bg-[var(--ground)] hover:bg-[var(--panel)] transition-colors group">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-[3px] w-0 bg-[var(--signal)] motion-safe:transition-[width] motion-safe:duration-300 group-hover:w-full"
              />
              <div className="p-[var(--space-6)] sm:p-[var(--space-8)] flex flex-col h-full">
                <span className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.14em] text-[var(--signal-deep)]">
                  {t.n} · {t.hatarido}
                </span>
                <h3 className="mt-[var(--space-3)] font-display font-black [font-size:var(--text-3xl)] tracking-[-0.035em] leading-tight">
                  <Link href={termekPath(t.id)} className="after:absolute after:inset-0">
                    {t.name}
                  </Link>
                </h3>
                <p className="mt-[var(--space-3)] [font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[52ch] flex-1">
                  {t.summary}
                </p>
                <p className="mt-[var(--space-6)] flex items-baseline gap-[var(--space-3)]">
                  <span className="font-display font-black [font-size:var(--text-3xl)] tracking-[-0.04em] leading-none">
                    {formatFt(t.arNetto)}
                  </span>
                  <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    + ÁFA
                  </span>
                  <span aria-hidden="true" className="ml-auto font-display font-bold text-[var(--signal-deep)]">
                    &rarr;
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Rail>

      <Seam />

      {/* ===== NAGYOBB MUNKA ===== */}
      <Rail label="Kapcsolat" dark>
        <section className="px-6 py-[var(--space-16)] sm:py-[var(--space-24)]">
          <Eyebrow>Ha ennél többre van szükséged</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[17ch] mb-[var(--space-6)]">
            Nagyobb munkára egyedi ajánlatot adunk
          </h2>
          <p className="[font-size:var(--text-lg)] text-[var(--ink-2)] max-w-[56ch] leading-relaxed mb-[var(--space-8)]">
            Weboldal, webáruház, értékesítési rendszer, automatizáció: ezeknél előbb megnézzük, mi
            kell valójában, és utána mondunk árat.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/init">Írd meg, min dolgoznál &rarr;</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/arzenal">Szolgáltatások</Link>
            </Button>
          </div>
        </section>
      </Rail>
    </main>
  );
}
