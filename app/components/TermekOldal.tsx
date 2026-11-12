import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { ORGANIZATION, breadcrumbSchema, faqPageSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import RendelesForm from "@/app/components/RendelesForm";
import { FactStrip, FeatureGrid } from "@/app/components/SalesBlocks";
import { Button, Eyebrow, Rail, Seam } from "@/app/components/ui";
import { GYORS_INDULAS_PATH, formatFt, termekPath, type Termek } from "@/lib/gyors-indulas";

// Egy fix áras termék aloldala (/gyors-indulas/<termék>): ár és határidő a
// hero-ban, mit kapsz, mire van szükségünk, menet, GYIK, rendelőűrlap.
export default function TermekOldal({ termek }: { termek: Termek }) {
  const path = termekPath(termek.id);
  const arSzoveg = `${formatFt(termek.arNetto)} + ÁFA`;

  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Fix áras első lépések", url: `${SITE_URL}${GYORS_INDULAS_PATH}` },
          { name: termek.name, url: `${SITE_URL}${path}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: termek.name,
          description: termek.schemaDescription,
          url: `${SITE_URL}${path}`,
          inLanguage: "hu-HU",
          provider: ORGANIZATION,
          offers: {
            "@type": "Offer",
            url: `${SITE_URL}${path}`,
            priceCurrency: "HUF",
            price: termek.arNetto,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: termek.arNetto,
              priceCurrency: "HUF",
              valueAddedTaxIncluded: false,
            },
            seller: ORGANIZATION,
          },
        }}
      />
      <JsonLd data={faqPageSchema(termek.faq)} />

      {/* ===== FEJLÉC ===== */}
      <Rail label={`${termek.n} / ${termek.name}`} dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-10)] sm:pb-[var(--space-16)]">
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase text-[var(--dim)] mb-[var(--space-5)]">
            <Link href={GYORS_INDULAS_PATH} className="hover:text-[var(--signal)] transition-colors">
              Fix áras első lépések
            </Link>{" "}
            / {termek.n}
          </p>
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.22em] uppercase text-[var(--signal)] flex items-center gap-3 mb-[var(--space-5)]">
            <span aria-hidden="true" className="w-1.5 h-1.5 bg-[var(--signal)] block" />
            {termek.name} · {termek.kicker}
          </p>
          <h1 className="font-display font-black leading-[0.9] tracking-[-0.052em] [font-size:var(--text-claim)] max-w-[16ch]">
            {termek.title}
            <span className="text-[var(--signal)]">.</span>
          </h1>
          <div className="mt-[var(--space-8)] space-y-[var(--space-5)]">
            {termek.lead.map((p, i) => (
              <p
                key={i}
                className={`leading-relaxed text-[var(--ink-2)] max-w-[56ch] ${
                  i === 0 ? "[font-size:var(--text-xl)] leading-snug" : "[font-size:var(--text-base)]"
                }`}
              >
                {p}
              </p>
            ))}
          </div>
          <div className="mt-[var(--space-8)] flex flex-wrap items-end gap-x-[var(--space-8)] gap-y-[var(--space-4)]">
            <p className="m-0">
              <span className="block font-display font-black [font-size:var(--text-4xl)] leading-none tracking-[-0.045em]">
                {formatFt(termek.arNetto)}
              </span>
              <span className="block mt-[var(--space-2)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                + ÁFA · fix ár · díjbekérővel
              </span>
            </p>
            <Button asChild>
              <a href="#rendeles">Megrendelem</a>
            </Button>
          </div>
        </section>
        <FactStrip facts={termek.facts} />
      </Rail>

      <Seam />

      {/* ===== AMIT KAPSZ ===== */}
      <Rail label="Amit kapsz">
        <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)]">
          <Eyebrow>Benne van az árban</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch]">
            Ez kerül az asztalodra
          </h2>
        </section>
        <FeatureGrid features={termek.features} />
      </Rail>

      {/* ===== AMIRE SZÜKSÉGÜNK VAN ===== */}
      <Rail label="Tőled">
        <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-10)]">
          <Eyebrow>Amire szükségünk van</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch] mb-[var(--space-8)]">
            Ennyi kell tőled az induláshoz
          </h2>
          <ul className="m-0 p-0 list-none grid gap-[var(--space-4)] max-w-[64ch]">
            {termek.needs.map((need) => (
              <li key={need} className="grid grid-cols-[14px_1fr] gap-[var(--space-3)] [font-size:var(--text-lg)] leading-relaxed text-[var(--ink-2)]">
                <span aria-hidden="true" className="mt-[0.6em] w-2 h-2 bg-[var(--signal)] block" />
                {need}
              </li>
            ))}
          </ul>
        </section>
      </Rail>

      {/* ===== MENET ===== */}
      <Rail label="Menet">
        <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)]">
          <Eyebrow>Hogyan zajlik</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch]">
            A rendeléstől a riportig
          </h2>
        </section>
        <ol className="border-t border-[var(--rule)] m-0 p-0 list-none">
          {termek.steps.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-[56px_1fr] sm:grid-cols-[88px_1fr] gap-[var(--space-4)] sm:gap-[var(--space-8)] px-6 py-[var(--space-6)] border-b border-[var(--rule)]"
            >
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-sm)] tracking-[0.14em] text-[var(--signal-deep)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.022em] leading-tight mb-[var(--space-2)]">
                  {step.title}
                </h3>
                <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[60ch]">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Rail>

      {/* ===== GYIK ===== */}
      <Rail label="GYIK">
        <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)]">
          <Eyebrow>Gyakori kérdések</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch]">
            Amit meg szoktak kérdezni
          </h2>
        </section>
        <dl className="border-t border-[var(--rule)] m-0">
          {termek.faq.map((item) => (
            <div key={item.question} className="px-6 py-[var(--space-6)] border-b border-[var(--rule)]">
              <dt className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.022em] leading-tight mb-[var(--space-3)]">
                {item.question}
              </dt>
              <dd className="m-0 [font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed max-w-[64ch]">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
        <p className="px-6 py-[var(--space-8)] [font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed max-w-[64ch]">
          {termek.next.text}{" "}
          <Link href={termek.next.href} className="underline hover:text-[var(--signal-deep)]">
            {termek.next.label} &rarr;
          </Link>
        </p>
      </Rail>

      <Seam />

      {/* ===== RENDELÉS ===== */}
      <Rail label="Rendelés" dark>
        <section id="rendeles" className="scroll-mt-24 px-6 py-[var(--space-16)] sm:py-[var(--space-24)]">
          <Eyebrow>{termek.name} · {arSzoveg}</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[16ch] mb-[var(--space-6)]">
            Rendeld meg most<span className="text-[var(--signal)]">.</span>
          </h2>
          <p className="[font-size:var(--text-lg)] text-[var(--ink-2)] max-w-[56ch] leading-relaxed mb-[var(--space-8)]">
            Két munkanapon belül küldjük a díjbekérőt. A határidő ({termek.hatarido}) {termek.hataridoKezdet} számít. Cégeknek, nettó áron.
          </p>
          <RendelesForm
            termek={termek.id}
            termekNev={termek.name}
            arSzoveg={arSzoveg}
            noteLabel={termek.noteLabel}
            noteHint={termek.noteHint}
          />
        </section>
      </Rail>
    </main>
  );
}
