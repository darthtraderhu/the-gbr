import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, faqPageSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Metadata.seo" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/en/seo",
      languages: { hu: "/seo", en: "/en/seo", "x-default": "/seo" },
    },
    openGraph: { title: t("title"), description: t("description") },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

const B = (chunks: React.ReactNode) => <strong className="text-[var(--ink)]">{chunks}</strong>;

export default async function EnglishSeo() {
  const t = await getTranslations({ locale: "en", namespace: "Seo" });
  const proofPanel = t.raw("proofPanel") as { claim: string; where: string }[];
  const pillarSeoItems = t.raw("pillarSeoItems") as string[];
  const pillarAeoItems = t.raw("pillarAeoItems") as string[];
  const processSteps = t.raw("processSteps") as { title: string; body: string }[];
  const faq = t.raw("faq") as { question: string; answer: string }[];

  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/en` },
          { name: "SEO", url: `${SITE_URL}/en/seo` },
        ])}
      />
      <JsonLd data={faqPageSchema(faq, { inLanguage: "en" })} />

      <Rail label="SEO / AEO" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <h1 className="font-display font-black leading-[0.86] tracking-[-0.055em] [font-size:var(--text-display)]">
            {t("headlineLine1")}
            <br />
            {t("headlineLine2")}
          </h1>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[52ch] mt-[var(--space-8)]">
            {t("intro")}
          </p>
        </section>

        <div className="border-t border-[var(--rule)]">
          {proofPanel.map((item, i) => (
            <div
              key={item.claim}
              className={`flex flex-wrap justify-between gap-4 px-6 py-[var(--space-4)] [font-family:var(--font-mono)] text-[length:var(--text-sm)] ${
                i > 0 ? "border-t border-[var(--rule)]" : ""
              }`}
            >
              <span className="text-[var(--ink-2)]">{item.claim}</span>
              <span className="text-[var(--signal-deep)]">{item.where}</span>
            </div>
          ))}
          <p className="px-6 py-[var(--space-6)] border-t border-[var(--rule)] [font-size:var(--text-sm)] text-[var(--mid)] max-w-[64ch]">
            {t("proofClosing")}
          </p>
        </div>
      </Rail>

      <Seam />

      {/* ===== WHAT CHANGED ===== */}
      <Rail label="What changed">
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-9)]">
          <Eyebrow>What changed</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[16ch] text-[var(--ink)]">
            {t("changedHeadline")}
          </h2>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[var(--rule)]">
          <div className="px-6 py-[var(--space-8)] sm:py-[var(--space-10)] sm:border-r border-b sm:border-b-0 border-[var(--rule)]">
            <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] mb-[var(--space-3)]">
              {t("changedLeftTitle")}
            </h3>
            <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed">
              {t("changedLeftBody")}
            </p>
          </div>
          <div className="px-6 py-[var(--space-8)] sm:py-[var(--space-10)]">
            <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] mb-[var(--space-3)]">
              {t("changedRightTitle")}
            </h3>
            <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed">
              {t("changedRightBody")}
            </p>
          </div>
        </div>
      </Rail>

      {/* ===== TWO PILLARS ===== */}
      <Rail label="Two pillars">
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[var(--rule)]">
          <div className="px-6 py-[var(--space-10)] sm:border-r border-b sm:border-b-0 border-[var(--rule)]">
            <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] mb-[var(--space-3)]">
              {t("pillarSeoTitle")}
            </h3>
            <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed mb-[var(--space-5)]">
              {t("pillarSeoIntro")}
            </p>
            <ul className="m-0 p-0 list-none">
              {pillarSeoItems.map((item, i) => (
                <li
                  key={item}
                  className={`[font-size:var(--text-sm)] text-[var(--ink-2)] py-[var(--space-3)] ${
                    i > 0 ? "border-t border-[var(--rule-soft)]" : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 py-[var(--space-10)]">
            <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] mb-[var(--space-3)]">
              {t("pillarAeoTitle")}
            </h3>
            <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed mb-[var(--space-5)]">
              {t.rich("pillarAeoIntro", { b: B })}
            </p>
            <ul className="m-0 p-0 list-none">
              {pillarAeoItems.map((item, i) => (
                <li
                  key={item}
                  className={`[font-size:var(--text-sm)] text-[var(--ink-2)] py-[var(--space-3)] ${
                    i > 0 ? "border-t border-[var(--rule-soft)]" : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Rail>

      <Seam />

      {/* ===== PROCESS ===== */}
      <Rail label="Process">
        <div className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-9)]">
          <Eyebrow>Process</Eyebrow>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[var(--rule)]">
          {processSteps.map((step, i) => (
            <div
              key={step.title}
              className={`px-6 py-[var(--space-8)] sm:py-[var(--space-10)] border-b sm:border-b-0 ${
                i < processSteps.length - 1 ? "sm:border-r" : ""
              } border-[var(--rule)]`}
            >
              <h3 className="font-display font-bold [font-size:var(--text-xl)] tracking-[-0.025em] mb-[var(--space-3)]">
                {step.title}
              </h3>
              <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed">
                {step.body}
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
