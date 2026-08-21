import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { websiteSchema, professionalServiceSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, SectionHeader, Rail, Seam, Eyebrow } from "@/app/components/ui";
import HeroInstrument from "./HeroInstrument";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Metadata.home" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/en",
      languages: { hu: "/", en: "/en", "x-default": "/" },
    },
    openGraph: { title: t("title"), description: t("description") },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

export default async function EnglishHome() {
  const t = await getTranslations({ locale: "en", namespace: "Home" });

  const fourPoints = t.raw("fourPoints") as { title: string; body: string }[];
  const developItems = t.raw("developItems") as string[];
  const manageItems = t.raw("manageItems") as string[];
  const workCards = t.raw("workCards") as {
    tag: string;
    title: string;
    body: string;
    footer: string;
  }[];
  const whyRows = t.raw("whyRows") as { heading: string; body: string }[];

  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd data={websiteSchema({ locale: "en" })} />
      <JsonLd data={professionalServiceSchema()} />

      {/* ===== 01 / INSTRUMENT ===== */}
      <Rail label="01 / Instrument" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-10)]">
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.24em] uppercase text-[var(--mid)] flex items-center gap-3 mb-[var(--space-8)]">
            <span className="w-1.5 h-1.5 bg-[var(--signal)] block animate-pulse" />
            {t("topStrip")}
          </p>
          <h1 className="font-display font-black leading-[0.86] tracking-[-0.055em] [font-size:var(--text-display)]">
            {t("headlineLine1")}
            <br />
            <span className="text-[var(--dim)]">{t("headlineLine2")}</span>
            <span className="text-[var(--signal)]">.</span>
          </h1>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[46ch] mt-[var(--space-8)]">
            {t("subhead1")}
          </p>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[46ch] mt-[var(--space-3)]">
            {t("subhead2")}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-[var(--space-8)]">
            <Button asChild>
              <Link href="/en/contact">{t("ctaPrimary")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/en/engagement">{t("ctaSecondary")}</Link>
            </Button>
            <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)]">
              {t("ctaFinePrint")}
            </span>
          </div>
        </section>

        <HeroInstrument />
      </Rail>

      <Seam />

      {/* ===== 02 / VIDEO ===== */}
      <Rail label="02 / Video">
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)]">
          <span>{t("videoEyebrow")}</span>
          <span>{t("videoCaption")}</span>
        </div>
        <div
          className="aspect-[21/9] flex items-center justify-center border-b border-[var(--rule)]"
          style={{
            background:
              "linear-gradient(150deg, var(--rule-soft) 0%, var(--rule) 50%, var(--ground) 100%)",
          }}
        >
          <div
            className="w-[var(--space-20)] h-[var(--space-20)] rounded-full border border-[var(--ink)] flex items-center justify-center"
            style={{ backgroundColor: "color-mix(in srgb, var(--panel) 55%, transparent)" }}
          >
            <span
              className="ml-1 block w-0 h-0"
              style={{
                borderTop: "11px solid transparent",
                borderBottom: "11px solid transparent",
                borderLeft: "18px solid var(--ink)",
              }}
            />
          </div>
        </div>
      </Rail>

      {/* ===== 03 / FOR AGENCIES ===== */}
      <Rail label="03 / For agencies">
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <Eyebrow>{t("forAgenciesEyebrow")}</Eyebrow>
          <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[16ch] text-[var(--ink)]">
            {t("forAgenciesHeadline")}
          </h2>
          <p className="[font-size:var(--text-lg)] leading-relaxed text-[var(--ink-2)] max-w-[62ch] mt-[var(--space-6)]">
            {t("forAgenciesP1")}
          </p>
          <p className="[font-size:var(--text-lg)] leading-relaxed text-[var(--ink-2)] max-w-[62ch] mt-[var(--space-4)]">
            {t.rich("forAgenciesP2", { b: (chunks) => <strong className="text-[var(--ink)]">{chunks}</strong> })}
          </p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[var(--rule)]">
          {fourPoints.map((point, i) => (
            <div
              key={point.title}
              className={`px-6 py-[var(--space-8)] sm:py-[var(--space-10)] ${
                i < fourPoints.length - 1 ? "border-b sm:border-b-0 sm:border-r border-[var(--rule)]" : ""
              }`}
            >
              <h3 className="font-display font-bold [font-size:var(--text-lg)] mb-[var(--space-2)] text-[var(--ink)]">
                {point.title}
              </h3>
              <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </Rail>

      {/* ===== 04 / WHAT WE DO ===== */}
      <Rail label="04 / What we do">
        <div className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-10)]">
          <SectionHeader eyebrow={t("whatWeDoEyebrow")} title={t("whatWeDoHeadline")} lead={t("whatWeDoIntro")} />
        </div>
        <div className="border-t border-[var(--rule)]">
          {[
            { n: "01", lab: "Develop", title: t("developTitle"), desc: t("developIntro"), items: developItems },
            { n: "02", lab: "Manage", title: t("manageTitle"), desc: t("manageIntro"), items: manageItems },
          ].map((row) => (
            <div
              key={row.n}
              className="group grid grid-cols-1 lg:grid-cols-[minmax(140px,20%)_1fr_minmax(0,34%)] gap-[var(--space-6)] sm:gap-[var(--space-10)] px-6 py-[var(--space-8)] sm:py-[var(--space-12)] border-b border-[var(--rule)] items-start"
            >
              <div>
                <div className="font-display font-black [font-size:var(--text-numeral-xl)] leading-[0.78] tracking-[-0.06em] text-[var(--rule)] transition-colors group-hover:text-[var(--signal)]">
                  {row.n}
                </div>
                <div className="mt-[var(--space-3)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase text-[var(--mid)]">
                  {row.lab}
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold [font-size:var(--text-3xl)] leading-[1.05] tracking-[-0.03em] mb-[var(--space-4)]">
                  {row.title}
                </h3>
                <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[44ch]">
                  {row.desc}
                </p>
              </div>
              <ul className="m-0 p-0 list-none">
                {row.items.map((item, i) => (
                  <li
                    key={item}
                    className={`[font-size:var(--text-base)] text-[var(--ink-2)] py-[var(--space-3)] ${i === 0 ? "" : "border-t border-[var(--rule-soft)]"}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Rail>

      {/* ===== 05 / STACK ===== */}
      <Rail label="05 / Stack">
        <section className="px-6 py-[var(--space-16)] sm:py-[var(--space-20)]">
          <Eyebrow>{t("stackHeadline")}</Eyebrow>
          <p className="font-display font-extrabold [font-size:var(--text-wall)] leading-[1.02] tracking-[-0.045em] text-[var(--ink)] [overflow-wrap:anywhere]">
            {t("stackList")}
          </p>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch] mt-[var(--space-8)]">
            {t("stackIntro")}
          </p>
        </section>
      </Rail>

      {/* ===== 06 / WORK ===== */}
      <Rail label="06 / Work">
        <div className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-10)]">
          <SectionHeader eyebrow={t("workEyebrow")} title={t("workHeadline")} lead={t("workIntro")} />
        </div>
        <div className="border-t border-[var(--rule)]">
          {workCards.map((project, i) => (
            <div
              key={project.title}
              className="grid grid-cols-[40px_1fr] sm:grid-cols-[56px_1.1fr_1.5fr_minmax(0,180px)] gap-x-[var(--space-4)] sm:gap-x-[var(--space-8)] gap-y-[var(--space-3)] px-6 py-[var(--space-8)] sm:py-[var(--space-10)] border-b border-[var(--rule)] items-baseline hover:bg-[var(--panel)] transition-colors"
            >
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--mid)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div
                  className={`[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase mb-2 ${
                    project.tag.includes("CLIENT") ? "text-[var(--signal-deep)]" : "text-[var(--mid)]"
                  }`}
                >
                  {project.tag}
                </div>
                <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em]">
                  {project.title}
                </h3>
              </div>
              <p className="col-span-2 sm:col-span-1 [font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed">
                {project.body}
              </p>
              <div className="col-span-2 sm:col-span-1 [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--mid)] sm:text-right">
                {project.footer}
              </div>
            </div>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== 07 / WHY IT MATTERS ===== */}
      <Rail label="07 / Why it matters" dark>
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <Eyebrow>{t("whyEyebrow")}</Eyebrow>
          <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[16ch] text-[var(--ink)]">
            {t("whyHeadline")}
          </h2>
          <p className="[font-size:var(--text-xl)] leading-relaxed text-[var(--ink-2)] max-w-[58ch] mt-[var(--space-6)]">
            {t("whyIntro")}
          </p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[var(--rule)]">
          {whyRows.map((claim, i) => (
            <div
              key={claim.heading}
              className={`px-6 py-[var(--space-8)] sm:py-[var(--space-10)] ${
                i < whyRows.length - 1 ? "border-b sm:border-b-0 sm:border-r border-[var(--rule)]" : ""
              }`}
            >
              <h3 className="font-display font-bold [font-size:var(--text-lg)] mb-[var(--space-2)] text-[var(--ink)]">
                {claim.heading}
              </h3>
              <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed">
                {claim.body}
              </p>
            </div>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== 08 / CONTACT ===== */}
      <Rail label="08 / Contact" dark>
        <section className="px-6 py-[var(--space-20)] sm:py-[var(--space-32)]">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="font-display font-black [font-size:var(--text-final)] leading-[0.9] tracking-[-0.055em] max-w-[15ch] mb-[var(--space-6)] text-[var(--ink)]">
            {t("closingHeadline")}
          </h2>
          <p className="[font-size:var(--text-lg)] text-[var(--ink-2)] max-w-[52ch] leading-relaxed mb-[var(--space-8)]">
            {t("closingBody")}
          </p>
          <Button asChild>
            <Link href="/en/contact">{t("closingButton")}</Link>
          </Button>
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)] mt-[var(--space-6)]">
            {t("closingBelow")}
          </p>
        </section>
      </Rail>
    </main>
  );
}
