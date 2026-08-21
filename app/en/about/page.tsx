import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Metadata.about" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/en/about",
      languages: { hu: "/szindikatus", en: "/en/about", "x-default": "/szindikatus" },
    },
    openGraph: { title: t("title"), description: t("description") },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

export default async function EnglishAbout() {
  const t = await getTranslations({ locale: "en", namespace: "About" });
  const facts = t.raw("facts") as { value: string; label: string }[];
  const timeline = t.raw("timeline") as {
    year: string;
    label: string;
    heading: string;
    body: string;
  }[];
  const inHouseItems = t.raw("inHouseItems") as string[];
  const partnersItems = t.raw("partnersItems") as string[];
  const principles = t.raw("principles") as { title: string; body: string }[];

  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/en` },
          { name: "About", url: `${SITE_URL}/en/about` },
        ])}
      />

      <Rail label="About" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <h1 className="font-display font-black leading-[0.88] tracking-[-0.055em] [font-size:var(--text-display)] max-w-[16ch]">
            {t("headline")}
          </h1>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[52ch] mt-[var(--space-8)]">
            {t("intro1")}
          </p>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[52ch] mt-[var(--space-4)]">
            {t("intro2")}
          </p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[var(--rule)]">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className={`px-6 py-[var(--space-8)] ${
                i < facts.length - 1 ? "border-b sm:border-b-0 sm:border-r border-[var(--rule)]" : ""
              }`}
            >
              <div className="font-display font-black [font-size:var(--text-numeral-lg)] tracking-[-0.05em] text-[var(--signal)]">
                {fact.value}
              </div>
              <div className="mt-[var(--space-2)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)]">
                {fact.label}
              </div>
            </div>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== TIMELINE ===== */}
      <Rail label="The path">
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-8)]">
          <Eyebrow>{t("pathEyebrow")}</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch] text-[var(--ink)]">
            {t("pathHeadline")}
          </h2>
        </section>
        <div className="border-t border-[var(--rule)]">
          {timeline.map((item, i) => (
            <div
              key={item.year}
              className={`grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-[var(--space-4)] sm:gap-[var(--space-8)] px-6 py-[var(--space-8)] sm:py-[var(--space-10)] ${
                i < timeline.length - 1 ? "border-b border-[var(--rule)]" : ""
              }`}
            >
              <div>
                <div className="font-display font-extrabold [font-size:var(--text-tl-year)] tracking-[-0.045em] leading-none text-[var(--ink)]">
                  {item.year}
                </div>
                <div className="mt-[var(--space-2)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--signal-deep)]">
                  {item.label}
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.028em] mb-[var(--space-3)]">
                  {item.heading}
                </h3>
                <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch] m-0">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Rail>

      {/* ===== HOW WE WORK ===== */}
      <Rail label="How we work">
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-8)] sm:pb-[var(--space-10)] border-t border-[var(--rule)]">
          <Eyebrow>{t("howWeWorkEyebrow")}</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch] text-[var(--ink)] mb-[var(--space-5)]">
            {t("howWeWorkHeadline")}
          </h2>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[64ch]">
            {t("howWeWorkIntro")}
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[var(--rule)]">
          <div className="px-6 py-[clamp(28px,3.2vw,46px)] border-b sm:border-b-0 sm:border-r border-[var(--rule)]">
            <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] mb-[var(--space-2)]">
              {t("inHouseTitle")}
            </h3>
            <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-5)]">
              {t("inHouseSub")}
            </div>
            <ul className="m-0 p-0 list-none">
              {inHouseItems.map((item, i) => (
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
              {t("partnersTitle")}
            </h3>
            <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] mb-[var(--space-5)]">
              {t("partnersSub")}
            </div>
            <ul className="m-0 p-0 list-none">
              {partnersItems.map((item, i) => (
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
            {t("contactTitle")}
          </h3>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[60ch] m-0">
            {t("contactBody")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,32%)_1fr] gap-[var(--space-6)] sm:gap-[var(--space-10)] px-6 py-[clamp(28px,3.2vw,46px)] border-b border-[var(--rule)] bg-[var(--panel)] items-start">
          <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] m-0">
            {t("declineTitle")}
          </h3>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[60ch] m-0">
            {t("declineBody")}
          </p>
        </div>
        <div className="px-6 py-[clamp(28px,3.2vw,46px)] border-b border-[var(--rule)]">
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[64ch] m-0">
            {t("alsoLine")}
          </p>
        </div>
      </Rail>

      <Seam />

      {/* ===== PRINCIPLES ===== */}
      <Rail label="Principles" dark>
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-9)]">
          <Eyebrow>{t("principlesEyebrow")}</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch] text-[var(--ink)]">
            {t("principlesHeadline")}
          </h2>
        </section>
        <div className="border-t border-[var(--rule)]">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className={`px-6 py-[var(--space-8)] sm:py-[var(--space-10)] ${
                i < principles.length - 1 ? "border-b border-[var(--rule)]" : ""
              }`}
            >
              <h3 className="font-display font-bold [font-size:var(--text-xl)] tracking-[-0.025em] mb-[var(--space-3)]">
                {p.title}
              </h3>
              <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed max-w-[64ch]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Rail>

      <Seam />

      <Rail label="Contact" dark>
        <section className="px-6 py-[var(--space-20)] sm:py-[var(--space-32)]">
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-final)] leading-[0.92] tracking-[-0.055em] max-w-[16ch] mb-[var(--space-6)] text-[var(--ink)]">
            {t("ctaHeadline")}
          </h2>
          <p className="[font-size:var(--text-base)] text-[var(--ink-2)] max-w-[52ch] leading-relaxed mb-[var(--space-8)]">
            {t("ctaBody")}
          </p>
          <Button asChild>
            <Link href="/en/contact">{t("ctaButton")}</Link>
          </Button>
        </section>
      </Rail>
    </main>
  );
}
