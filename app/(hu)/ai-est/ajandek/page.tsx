import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { TERMEKEK } from "@/lib/gyors-indulas";
import { AJANDEK, AJANDEK_ERTEK, EST, EST_AJANDEK_PATH, EST_PATH } from "@/lib/ai-est";
import { Eyebrow } from "@/app/components/ui";
import EstAjandekForm from "./EstAjandekForm";

// Az AI demo est résztvevőinek QR-kódos oldala: ajándék gyorsátvilágítás.
// A jelentkezés a sales-rendszer Beérkezőjébe fut (/api/est-ajandek).
// Eseményoldal: nem kerül a sitemapbe, és a keresők sem indexelik.

const TITLE = `Ajándék átvilágítás az ${EST.nev} résztvevőinek | THE GBR`;
const DESCRIPTION = `Ott voltál az esten? A ${AJANDEK_ERTEK} értékű gyorsátvilágítást ajándékba adjuk: az oldalad tíz legfontosabb hibája, sorrendben, javítással.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: EST_AJANDEK_PATH },
  robots: { index: false, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${EST_AJANDEK_PATH}` },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

// Amit a riport tartalmaz: a gyorsátvilágítás saját leírásából, hogy a kettő
// ne térhessen el egymástól.
const gyors = TERMEKEK.find((t) => t.id === "gyorsatvilagitas");
const TARTALOM = gyors?.features ?? [];

const TENYEK = [
  { ertek: "10", cimke: "legfontosabb hiba, sorrendben, javítással" },
  { ertek: "0", cimke: "hozzáférés kell: kívülről vizsgálunk" },
  { ertek: "0 Ft", cimke: `neked, ${AJANDEK_ERTEK} helyett` },
];

export default function EstAjandekOldal() {
  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      {/* ===== Nyitás + űrlap ===== */}
      <section className="px-6 pt-[var(--space-10)] sm:pt-[var(--space-16)] pb-[var(--space-12)] max-w-[1200px] mx-auto">
        <Eyebrow>
          <span className="inline-block w-[7px] h-[7px] rounded-full bg-[var(--signal)] mr-[10px] align-middle" aria-hidden="true" />
          {EST.nev} · résztvevőknek
        </Eyebrow>
        <h1 className="font-display font-black leading-[0.95] tracking-[-0.05em] [font-size:var(--text-6xl)] max-w-[15ch]">
          Ott voltál? A te oldaladat is megnézzük<span className="text-[var(--signal)]">.</span>
        </h1>
        <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[52ch] mt-[var(--space-6)]">
          Az est résztvevőinek ajándék: a {AJANDEK_ERTEK} értékű {AJANDEK.nev.toLowerCase()}, díjmentesen. Az
          oldalad tíz legfontosabb hibája fontossági sorrendben, mindegyik mellett a javítással, PDF-ben.
        </p>

        <dl className="mt-[var(--space-8)] grid grid-cols-1 sm:grid-cols-3 border border-[var(--rule)] bg-[var(--panel)]">
          {TENYEK.map((t, n) => (
            <div
              key={t.cimke}
              className={`p-[var(--space-5)] ${n > 0 ? "border-t sm:border-t-0 sm:border-l border-[var(--rule)]" : ""}`}
            >
              <dt className="sr-only">{t.cimke}</dt>
              <dd className="m-0">
                <span className="block font-display font-black [font-size:var(--text-4xl)] tracking-[-0.04em] leading-none">
                  {t.ertek}
                </span>
                <span className="block mt-[var(--space-2)] [font-family:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--mid)]">
                  {t.cimke}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div id="jelentkezes" className="mt-[var(--space-12)] grid gap-[var(--space-10)] lg:grid-cols-[minmax(0,620px)_minmax(0,1fr)]">
          <div>
            <h2 className="font-display font-extrabold [font-size:var(--text-3xl)] tracking-[-0.03em] leading-tight mb-[var(--space-6)]">
              Kérem az ajándékot
            </h2>
            <EstAjandekForm ajandekNev={AJANDEK.nev} ertek={AJANDEK_ERTEK} />
          </div>

          <aside className="border-t lg:border-t-0 lg:border-l border-[var(--rule)] pt-[var(--space-8)] lg:pt-0 lg:pl-[var(--space-10)]">
            <Eyebrow>Mi van a riportban</Eyebrow>
            <ul className="grid gap-[var(--space-5)]">
              {TARTALOM.map((f) => (
                <li key={f.title}>
                  <h3 className="font-display font-bold text-[length:var(--text-lg)] tracking-[-0.02em]">{f.title}</h3>
                  <p className="mt-[var(--space-1)] text-[var(--ink-2)] leading-relaxed">{f.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-[var(--space-8)] text-[var(--ink-2)] leading-relaxed">
              Ez ugyanaz a riport, amit{" "}
              <Link href={AJANDEK.termekHref} className="underline hover:text-[var(--signal-deep)]">
                {AJANDEK_ERTEK} áron
              </Link>{" "}
              bárki megrendelhet. Te ajándékba kapod, és hogy mit kezdesz vele, a te döntésed.
            </p>
            <p className="mt-[var(--space-4)]">
              <Link
                href={EST_PATH}
                className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.08em] uppercase underline hover:text-[var(--signal-deep)]"
              >
                Nézd vissza az est bemutatóját →
              </Link>
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
