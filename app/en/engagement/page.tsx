import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, faqPageSchema, offerSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Metadata.engagement" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/en/engagement",
      languages: { hu: "/architektura", en: "/en/engagement", "x-default": "/architektura" },
    },
    openGraph: { title: t("title"), description: t("description") },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

type Model = {
  id: string;
  tag: string;
  name: string;
  priceNote: string;
  desc: string;
  items: string[];
  notIncluded: string;
};

export default async function EnglishEngagement() {
  const t = await getTranslations({ locale: "en", namespace: "Engagement" });
  const models = t.raw("models") as Model[];
  const deliverableLabels = t.raw("deliverableLabels") as Record<string, string>;
  const howWeWorkItems = t.raw("howWeWorkItems") as { title: string; body: string }[];
  const faq = t.raw("faq") as { question: string; answer: string }[];

  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/en` },
          { name: "Engagement", url: `${SITE_URL}/en/engagement` },
        ])}
      />
      <JsonLd data={faqPageSchema(faq, { inLanguage: "en" })} />
      {models.map((m) => (
        <JsonLd
          key={m.id}
          data={offerSchema({
            name: m.name,
            description: `${m.desc} Price: ${m.priceNote} — no fixed price list, the final quote follows scoping.`,
            url: `${SITE_URL}/en/engagement#${m.id}`,
            inLanguage: "en",
          })}
        />
      ))}

      {/* ===== DARK HEADER + PLANNER ===== */}
      <Rail label="Engagement" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <h1 className="font-display font-black leading-[0.88] tracking-[-0.055em] [font-size:var(--text-display)]">
            {t("headline")}
          </h1>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[50ch] mt-[var(--space-8)]">
            {t("intro")}
          </p>
        </section>

        <div className="border-t border-[var(--rule)]">
          <div className="flex flex-wrap justify-between gap-3 px-6 py-3 border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)]">
            <span>{t("plannerHeader")} · {t("plannerSubheader")}</span>
          </div>
          <div className="px-6 py-[var(--space-8)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)]">
            {t("plannerLeftLabel")} — {t("plannerLeftHint")}
          </div>
          <div className="px-6 py-3 border-b border-t border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)]">
            {t("plannerRightLabel")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {Object.entries(deliverableLabels).map(([key, label], i) => (
              <div
                key={key}
                className={`px-6 py-[var(--space-5)] border-b border-[var(--rule)] ${
                  i % 2 === 0 ? "sm:border-r" : ""
                }`}
              >
                <span className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-2)]">
                  {label}
                </span>
                <div className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.04em] leading-[0.95]">
                  —
                </div>
              </div>
            ))}
          </div>
          <p className="px-6 py-[var(--space-4)] pb-[var(--space-10)] border-t border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] text-[var(--mid)] leading-[1.7]">
            {t("plannerFootnote")}
          </p>
        </div>
      </Rail>

      <Seam />

      {/* ===== MODELS ===== */}
      {models.map((model, idx) => (
        <Rail key={model.id} label={`0${idx + 1} / ${model.tag}`}>
          <section id={model.id} className="border-b border-[var(--rule)]">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(150px,20%)_1fr_minmax(0,26%)] gap-[var(--space-6)] sm:gap-[var(--space-10)] px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)] sm:pb-[var(--space-9)]">
              <div>
                <div className="font-display font-black [font-size:var(--text-numeral-xl)] leading-[0.78] tracking-[-0.06em] text-[var(--rule)]">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div
                  className={`mt-[var(--space-3)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase ${
                    model.tag === "MOST COMMON" ? "text-[var(--signal-deep)]" : "text-[var(--mid)]"
                  }`}
                >
                  {model.tag}
                </div>
              </div>
              <div>
                <h2 className="font-display font-extrabold [font-size:var(--text-svc-title)] tracking-[-0.036em] leading-[1.03] mb-[var(--space-3)]">
                  {model.name}
                </h2>
                <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[52ch]">
                  {model.desc}
                </p>
              </div>
              <div className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.14em] uppercase text-[var(--mid)] lg:pt-[var(--space-2)]">
                {model.priceNote}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-[var(--rule)]">
              {model.items.map((item, i) => (
                <div
                  key={item}
                  className={`px-6 py-[var(--space-4)] [font-size:var(--text-sm)] text-[var(--ink-2)] border-b border-[var(--rule)] ${
                    i % 2 === 0 ? "sm:border-r" : "sm:border-r-0"
                  } ${i % 3 !== 2 ? "lg:border-r" : "lg:border-r-0"}`}
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-baseline gap-x-[var(--space-4)] gap-y-[var(--space-2)] px-6 py-[var(--space-5)] bg-[var(--panel)] border-b border-[var(--rule)]">
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] whitespace-nowrap">
                Doesn&apos;t include
              </span>
              <p className="m-0 [font-size:var(--text-sm)] text-[var(--mid)]">{model.notIncluded}</p>
            </div>

            <div className="px-6 py-[var(--space-6)] sm:py-[var(--space-8)]">
              <Button asChild variant={model.tag === "MOST COMMON" ? "primary" : "ghost"}>
                <Link href="/en/contact">Get started &rarr;</Link>
              </Button>
            </div>
          </section>
        </Rail>
      ))}

      <Seam />

      {/* ===== HOW WE WORK ===== */}
      <Rail label="How we work" dark>
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-9)]">
          <Eyebrow>{t("howWeWorkEyebrow")}</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch] text-[var(--ink)] mb-[var(--space-5)]">
            {t("howWeWorkHeadline")}
          </h2>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch]">
            {t("howWeWorkIntro")}
          </p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[var(--rule)]">
          {howWeWorkItems.map((item, i) => (
            <div
              key={item.title}
              className={`px-6 py-[var(--space-8)] sm:py-[var(--space-10)] border-b border-[var(--rule)] ${
                i % 2 === 0 ? "sm:border-r" : ""
              }`}
            >
              <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] mb-[var(--space-3)] text-[var(--ink)]">
                {item.title}
              </h3>
              <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed max-w-[44ch]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== FAQ ===== */}
      <Rail label="FAQ">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .faq-q .faq-pm-plus { display: inline; }
          .faq-q .faq-pm-minus { display: none; }
          .faq-q[open] .faq-pm-plus { display: none; }
          .faq-q[open] .faq-pm-minus { display: inline; }
        `,
          }}
        />
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-9)]">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch] text-[var(--ink)]">
            {t("faqHeading")}
          </h2>
        </section>
        <div className="border-t border-[var(--rule)]">
          {faq.map((item, i) => (
            <details key={item.question} className="faq-q border-b border-[var(--rule)]" open={i === 0}>
              <summary className="list-none cursor-pointer grid grid-cols-[1fr_28px] gap-[var(--space-5)] items-baseline px-6 py-[var(--space-6)] font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.022em] hover:bg-[var(--panel)] transition-colors [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span className="[font-family:var(--font-mono)] [font-size:var(--text-lg)] text-[var(--signal-deep)] text-right">
                  <span className="faq-pm-plus">+</span>
                  <span className="faq-pm-minus">&minus;</span>
                </span>
              </summary>
              <div className="px-6 pb-[var(--space-8)]">
                <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed max-w-[64ch]">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== CTA ===== */}
      <Rail label="Contact" dark>
        <section className="px-6 py-[var(--space-20)] sm:py-[var(--space-32)]">
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-final)] leading-[0.92] tracking-[-0.055em] max-w-[16ch] mb-[var(--space-6)] text-[var(--ink)]">
            {t("ctaHeadline")}
          </h2>
          <p className="[font-size:var(--text-base)] text-[var(--ink-2)] max-w-[54ch] leading-relaxed mb-[var(--space-8)]">
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
