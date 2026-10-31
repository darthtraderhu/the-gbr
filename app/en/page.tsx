import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { websiteSchema, professionalServiceSchema, videoObjectSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, SectionHeader, Rail, Seam, Eyebrow } from "@/app/components/ui";
import ServiceIndex from "@/app/components/ServiceIndex";
import { ARZENAL_SECTIONS_EN } from "@/lib/site-links";
import IntroVideo from "@/app/components/IntroVideo";
import HeroInstrument from "./HeroInstrument";
import { Okoszisztema } from "@/app/components/SalesBlocks";
import { ECO_STAGES_EN } from "@/lib/okoszisztema";
import { PITCH_EN } from "@/lib/szolgaltatasok-en";
import { NEXTJS_BRANDS, NEXTJS_CHECKED_EN } from "@/lib/nextjs-proof";

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

// Az angol cégbemutató videó — forrása a video/ mappa Remotion-projektje
// (IntroEn kompozíció). A leirat a messages/en.json Home.videoTranscript kulcsa.
const INTRO_VIDEO_EN = {
  src: "/video/intro-en.mp4",
  poster: "/video/intro-en-poster.jpg",
};

export default async function EnglishHome() {
  const t = await getTranslations({ locale: "en", namespace: "Home" });

  const fourPoints = t.raw("fourPoints") as { title: string; body: string }[];
  const workCards = t.raw("workCards") as {
    tag: string;
    title: string;
    body: string;
    footer: string;
  }[];
  const whyRows = t.raw("whyRows") as { heading: string; body: string }[];
  const auditChapters = t.raw("auditChapters") as string[];
  const aeoFacts = t.raw("aeoFacts") as { value: string; label: string }[];
  const serviceIndexItems = ARZENAL_SECTIONS_EN.map((item) => ({
    ...item,
    headline: PITCH_EN[item.id].headline,
  }));

  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd data={websiteSchema({ locale: "en" })} />
      <JsonLd data={professionalServiceSchema()} />
      <JsonLd
        data={videoObjectSchema({
          name: t("videoTitle"),
          description: t("videoDescription"),
          contentPath: INTRO_VIDEO_EN.src,
          thumbnailPath: INTRO_VIDEO_EN.poster,
          uploadDate: "2026-10-23",
          duration: "PT1M4S",
          transcript: t("videoTranscript"),
          inLanguage: "en",
        })}
      />

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
        <IntroVideo
          src={INTRO_VIDEO_EN.src}
          poster={INTRO_VIDEO_EN.poster}
          label={t("videoTitle")}
          playLabel={t("videoPlay")}
        />
        <details className="group px-6 py-3.5 border-b border-[var(--rule)]">
          <summary className="cursor-pointer [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] hover:text-[var(--ink)]">
            {t("videoTranscriptLabel")}
          </summary>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[72ch] mt-[var(--space-4)] mb-[var(--space-2)]">
            {t("videoTranscript")}
          </p>
        </details>
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

      <Seam />

      {/* ===== 04 / ECOSYSTEM ===== */}
      <Rail label="04 / Ecosystem" dark>
        <Okoszisztema
          stages={ECO_STAGES_EN}
          eyebrow={t("ecoEyebrow")}
          title={
            <>
              {t("ecoHeadline")}
              <span className="text-[var(--signal)]">.</span>
            </>
          }
          lead={t("ecoLead")}
          note={t("ecoNote")}
        />
      </Rail>

      <Seam />

      {/* ===== 04b / WHAT WE DO ===== */}
      <Rail label="04 / What we do">
        <ServiceIndex
          eyebrow={t("serviceIndexEyebrow")}
          lead={t("serviceIndexLead")}
          items={serviceIndexItems}
          basePath="/en/services"
        />
      </Rail>

      {/* ===== 05 / AUDIT ===== */}
      <Rail label="05 / Audit">
        <section className="px-6 py-[var(--space-16)] sm:py-[var(--space-20)] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[var(--space-10)] lg:gap-[var(--space-16)] items-start border-t border-[var(--rule)]">
          <div>
            <Eyebrow>{t("auditEyebrow")}</Eyebrow>
            <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[16ch] text-[var(--ink)]">
              {t("auditHeadline")}
            </h2>
            <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[46ch] mt-[var(--space-6)]">
              {t("auditIntro")}
            </p>
            <div className="mt-[var(--space-8)]">
              <Button asChild>
                <Link href="/en/contact">{t("auditCta")}</Link>
              </Button>
            </div>
          </div>
          <div>
            <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-4)]">
              {t("auditListLabel")}
            </p>
            <ol className="m-0 p-0 list-none border-t border-[var(--rule)]">
              {auditChapters.map((chapter, i) => (
                <li
                  key={chapter}
                  className="grid grid-cols-[40px_1fr] gap-[var(--space-4)] py-[var(--space-4)] border-b border-[var(--rule)] items-baseline"
                >
                  <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--mid)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="[font-size:var(--text-base)] text-[var(--ink-2)]">{chapter}</span>
                </li>
              ))}
            </ol>
            <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--mid)] mt-[var(--space-4)]">
              {t("auditDeliverable")}
            </p>
          </div>
        </section>
      </Rail>

      {/* ===== 06 / AI VISIBILITY ===== */}
      <Rail label="06 / AI visibility">
        <section className="px-6 py-[var(--space-16)] sm:py-[var(--space-20)] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[var(--space-10)] lg:gap-[var(--space-16)] items-start border-t border-[var(--rule)]">
          <div>
            <Eyebrow>{t("aeoEyebrow")}</Eyebrow>
            <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[16ch] text-[var(--ink)]">
              {t("aeoHeadline")}
            </h2>
            <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[46ch] mt-[var(--space-6)]">
              {t("aeoIntro")}
            </p>
            <p className="[font-size:var(--text-sm)] leading-relaxed text-[var(--mid)] max-w-[46ch] mt-[var(--space-4)]">
              {t("aeoNote")}
            </p>
            <div className="mt-[var(--space-8)]">
              <Button asChild variant="ghost">
                <Link href="/en/seo">{t("aeoCta")}</Link>
              </Button>
            </div>
          </div>
          <dl className="m-0 grid grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)]">
            {aeoFacts.map((fact) => (
              <div key={fact.label} className="bg-[var(--panel)] px-[var(--space-5)] py-[var(--space-6)]">
                <dt className="font-display font-black [font-size:var(--text-3xl)] leading-none tracking-[-0.04em] text-[var(--ink)]">
                  {fact.value}
                </dt>
                <dd className="m-0 mt-[var(--space-3)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--mid)]">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </Rail>

      {/* ===== 07 / STACK — Next.js ===== */}
      <Rail label="07 / Stack">
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-20)] pb-[var(--space-8)]">
          <Eyebrow>{t("nextjsEyebrow")}</Eyebrow>
          <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[16ch] text-[var(--ink)]">
            {t("nextjsHeadline")}
            <span className="text-[var(--signal)]">.</span>
          </h2>
        </section>
        <ul className="m-0 p-0 list-none grid grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--rule)]">
          {NEXTJS_BRANDS.map((brand) => (
            <li
              key={brand}
              className="px-6 py-[var(--space-8)] border-r border-b border-[var(--rule)] font-display font-black [font-size:var(--text-4xl)] tracking-[-0.045em] leading-none text-[var(--ink)] hover:text-[var(--signal-deep)] transition-colors"
            >
              {brand}
            </li>
          ))}
        </ul>
        <div className="px-6 py-[var(--space-8)] grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-[var(--space-8)] items-start">
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch]">
            {t("nextjsBody")}{" "}
            <a
              href="https://nextjs.org/showcase"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] underline"
            >
              {t("nextjsSource")}
            </a>{" "}
            <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)] whitespace-nowrap">
              {NEXTJS_CHECKED_EN}
            </span>
          </p>
          <div>
            <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-3)]">
              {t("nextjsDaily")}
            </p>
            <p className="font-display font-extrabold [font-size:var(--text-2xl)] leading-snug tracking-[-0.025em] text-[var(--ink)]">
              {t("stackList")}
            </p>
          </div>
        </div>
      </Rail>

      {/* ===== 08 / WORK ===== */}
      <Rail label="08 / Work">
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

      {/* ===== 09 / WHY IT MATTERS ===== */}
      <Rail label="09 / Why it matters" dark>
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

      {/* ===== 10 / CONTACT ===== */}
      <Rail label="10 / Contact" dark>
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
