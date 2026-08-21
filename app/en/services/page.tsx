import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { ARZENAL_SECTIONS_EN } from "@/lib/site-links";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "Metadata.services" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/en/services",
      languages: { hu: "/arzenal", en: "/en/services", "x-default": "/arzenal" },
    },
    openGraph: { title: t("title"), description: t("description") },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

function DevFrame({
  header,
  headerRight,
  children,
}: {
  header: string;
  headerRight?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-[var(--rule)] bg-[var(--panel)]">
      <div className="flex flex-wrap justify-between gap-3 px-6 py-2.5 border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)]">
        <span>{header}</span>
        {headerRight && <span>{headerRight}</span>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function ServiceBlock({
  id,
  n,
  label,
  title,
  paragraphs,
  features,
  device,
}: {
  id: string;
  n: string;
  label: string;
  title: string;
  paragraphs: React.ReactNode[];
  features: string[];
  device: React.ReactNode;
}) {
  return (
    <section id={id} className="border-b border-[var(--rule)]">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(150px,20%)_1fr] gap-[var(--space-8)] sm:gap-[var(--space-12)] px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)] sm:pb-[var(--space-10)]">
        <div>
          <div className="font-display font-black [font-size:var(--text-svc-num)] leading-[0.76] tracking-[-0.06em] text-[var(--rule)]">
            {n}
          </div>
          <div className="mt-[var(--space-4)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase text-[var(--mid)]">
            {label}
          </div>
        </div>
        <div>
          <h2 className="font-display font-extrabold [font-size:var(--text-svc-title)] tracking-[-0.038em] leading-[1.02] max-w-[20ch] mb-[var(--space-5)]">
            {title}
          </h2>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[52ch] mt-[var(--space-4)] first:mt-0"
            >
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[var(--rule)]">
        {features.map((feat, i) => (
          <div
            key={feat}
            className={`px-6 py-[var(--space-4)] [font-size:var(--text-base)] text-[var(--ink-2)] border-b border-[var(--rule)] ${
              i % 2 === 0 ? "sm:border-r" : ""
            }`}
          >
            {feat}
          </div>
        ))}
      </div>

      {device}
    </section>
  );
}

const B = (chunks: React.ReactNode) => <strong className="text-[var(--ink)]">{chunks}</strong>;

export default async function EnglishServices() {
  const t = await getTranslations({ locale: "en", namespace: "Services" });
  const faq = t.raw("faq") as { question: string; answer: string }[];
  const adsRows = t.raw("ads.sampleRows") as { label: string; value: string }[];
  const opsLog = t.raw("ops.logLines") as { t: string; msg: string }[];
  const findings = t.raw("access.findingsTable") as {
    finding: string;
    meaning: string;
    severity: string;
  }[];

  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/en` },
          { name: "Services", url: `${SITE_URL}/en/services` },
        ])}
      />
      <JsonLd data={faqPageSchema(faq, { inLanguage: "en" })} />
      {ARZENAL_SECTIONS_EN.map((item) => (
        <JsonLd
          key={item.id}
          data={serviceSchema({
            name: item.name,
            description: t(`${item.id === "pulse" ? "pulse" : item.id}.headline`),
            url: `${SITE_URL}/en/services#${item.id}`,
            inLanguage: "en",
          })}
        />
      ))}

      {/* ===== DARK HEADER + INDEX ===== */}
      <Rail label="Services" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <h1 className="font-display font-black leading-[0.86] tracking-[-0.055em] [font-size:var(--text-display)]">
            {t("headline")}
          </h1>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[46ch] mt-[var(--space-8)]">
            {t("intro1")}
          </p>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[46ch] mt-[var(--space-5)]">
            {t.rich("intro2", { b: B })}
          </p>
        </section>

        <div className="border-t border-[var(--rule)]">
          {ARZENAL_SECTIONS_EN.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="grid grid-cols-[56px_1fr_auto] sm:grid-cols-[88px_1fr_auto] gap-[var(--space-4)] sm:gap-[var(--space-8)] px-6 py-[var(--space-5)] sm:py-[var(--space-6)] border-b border-[var(--rule)] items-center group hover:bg-[color-mix(in_srgb,var(--ground)_60%,var(--panel))] transition-colors"
            >
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-sm)] tracking-[0.14em] text-[var(--dim)] group-hover:text-[var(--signal)] transition-colors">
                {item.n}
              </span>
              <h2 className="font-display font-bold [font-size:var(--text-3xl)] tracking-[-0.03em] leading-tight text-[var(--ink)]">
                {item.name}
              </h2>
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-sm)] text-[var(--rule-strong)] group-hover:text-[var(--signal)] transition-colors">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== 01 WEB ===== */}
      <Rail label="01 / Web">
        <ServiceBlock
          id="web"
          n="01"
          label="Web and commerce"
          title={t("web.headline")}
          paragraphs={[t("web.p1"), t("web.p2")]}
          features={t.raw("web.items") as string[]}
          device={
            <DevFrame header={t("web.deviceHeader")}>
              <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed">
                We built this page too — using the same principles.
              </p>
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== 02 MARKETING ===== */}
      <Rail label="02 / Marketing">
        <ServiceBlock
          n="02"
          id="ads"
          label="Performance marketing"
          title={t("ads.headline")}
          paragraphs={[t("ads.p1"), t("ads.p2")]}
          features={t.raw("ads.items") as string[]}
          device={
            <DevFrame header="What a weekly report looks like" headerRight="Sample">
              <table className="w-full border-collapse [font-size:var(--text-sm)]">
                <tbody>
                  {adsRows.map((row) => (
                    <tr key={row.label} className="border-b border-[var(--rule-soft)] last:border-b-0">
                      <td className="py-[var(--space-3)] text-[var(--mid)]">{row.label}</td>
                      <td className="py-[var(--space-3)] text-[var(--signal-deep)] text-right [font-family:var(--font-mono)]">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-[var(--space-4)] [font-size:var(--text-sm)] text-[var(--mid)]">
                {t("ads.deviceBelow")}
              </p>
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== 03 AI ===== */}
      <Rail label="03 / AI">
        <ServiceBlock
          n="03"
          label="AI integration"
          id="ai"
          title={t("ai.headline")}
          paragraphs={[
            t("ai.p1"),
            <span key="p2">
              {t.rich("ai.p2", {
                link: (chunks) => (
                  <Link href="/ai-tajekoztato" className="text-[var(--ink)] underline">
                    {chunks}
                  </Link>
                ),
              })}
            </span>,
          ]}
          features={t.raw("ai.items") as string[]}
          device={
            <DevFrame header="What the chat can actually do" headerRight="Example">
              <div className="[font-size:var(--text-base)]">
                <div className="grid grid-cols-1 sm:grid-cols-[86px_1fr] gap-[var(--space-2)] sm:gap-[var(--space-4)] py-[var(--space-3)] border-b border-[var(--rule-soft)]">
                  <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    {t("ai.transcript.visitorLabel")}
                  </span>
                  <p className="m-0 text-[var(--ink-2)]">{t("ai.transcript.visitorMessage")}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[86px_1fr] gap-[var(--space-2)] sm:gap-[var(--space-4)] py-[var(--space-3)]">
                  <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--signal-deep)]">
                    {t("ai.transcript.botLabel")}
                  </span>
                  <p className="m-0 text-[var(--ink-2)]">{t("ai.transcript.botMessage")}</p>
                </div>
              </div>
              <p className="mt-[var(--space-4)] pt-[var(--space-4)] border-t border-[var(--rule-soft)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--mid)]">
                {t("ai.deviceBelow")}
              </p>
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== 04 VIDEO ===== */}
      <Rail label="04 / Video">
        <ServiceBlock
          n="04"
          label="Video and content"
          title={t("video.headline")}
          id="video"
          paragraphs={[t("video.p1")]}
          features={t.raw("video.items") as string[]}
          device={
            <div className="border-t border-[var(--rule)] grid grid-cols-1 sm:grid-cols-3">
              {(t.raw("video.items") as string[]).slice(0, 3).map((feat, i) => (
                <div
                  key={feat}
                  className={`relative aspect-[4/3] sm:aspect-square border-b sm:border-b-0 border-[var(--rule)] ${
                    i < 2 ? "sm:border-r" : ""
                  }`}
                  style={{ background: "linear-gradient(150deg, var(--rule-soft), var(--rule))" }}
                >
                  <span className="absolute left-4 bottom-3.5 [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          }
        />
      </Rail>

      {/* ===== 05 OPS ===== */}
      <Rail label="05 / Operations">
        <ServiceBlock
          id="ops"
          n="05"
          label="Operations"
          title={t("ops.headline")}
          paragraphs={[t("ops.p1"), t("ops.p2")]}
          features={t.raw("ops.items") as string[]}
          device={
            <DevFrame header={t("ops.deviceHeader")} headerRight="Log">
              <div className="[font-family:var(--font-mono)] text-[length:var(--text-sm)] text-[var(--ink-2)]">
                {opsLog.map((line, i) => (
                  <div
                    key={line.t}
                    className={`grid grid-cols-[74px_1fr] gap-[var(--space-4)] py-[var(--space-2)] ${
                      i < opsLog.length - 1 ? "border-b border-[var(--rule-soft)]" : ""
                    }`}
                  >
                    <b className="text-[var(--signal-deep)] font-medium">{line.t}</b>
                    <span>{line.msg}</span>
                  </div>
                ))}
              </div>
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== 06 ACCESSIBILITY ===== */}
      <Rail label="06 / Accessibility">
        <ServiceBlock
          id="access"
          n="06"
          label="Accessibility"
          title={t("access.headline")}
          paragraphs={[
            t("access.p1"),
            <span key="p2">{t.rich("access.p2", { b: B })}</span>,
            <span key="p3">{t.rich("access.emphasis", { b: B })}</span>,
          ]}
          features={t.raw("access.items") as string[]}
          device={
            <DevFrame header={t("access.deviceHeader")} headerRight="Sample">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse [font-size:var(--text-sm)]">
                  <thead>
                    <tr className="border-b border-[var(--rule-soft)]">
                      <th className="py-[var(--space-2)] pr-[var(--space-3)] text-left font-normal [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--mid)]">
                        Finding
                      </th>
                      <th className="py-[var(--space-2)] pr-[var(--space-3)] text-left font-normal [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--mid)]">
                        Meaning
                      </th>
                      <th className="py-[var(--space-2)] text-right font-normal [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--mid)]">
                        Severity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {findings.map((row) => (
                      <tr key={row.finding} className="border-b border-[var(--rule-soft)] last:border-b-0">
                        <td className="py-[var(--space-3)] pr-[var(--space-3)] text-[var(--ink-2)]">
                          {row.finding}
                        </td>
                        <td className="py-[var(--space-3)] pr-[var(--space-3)] text-[var(--mid)]">
                          {row.meaning}
                        </td>
                        <td className="py-[var(--space-3)] text-right [font-family:var(--font-mono)] text-[var(--signal-deep)] whitespace-nowrap">
                          {row.severity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-[var(--space-4)] [font-size:var(--text-sm)] text-[var(--mid)]">
                {t("access.deviceBelow")}
              </p>
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== 07 PULSE ===== */}
      <Rail label="07 / Pulse">
        <ServiceBlock
          id="pulse"
          n="07"
          label="Pulse"
          title={t("pulse.headline")}
          paragraphs={[
            t("pulse.p1"),
            <span key="p2">{t.rich("pulse.p2", { b: B })}</span>,
            <span key="e1">{t.rich("pulse.emphasis1", { b: B })}</span>,
            <span key="e2">{t.rich("pulse.emphasis2", { b: B })}</span>,
          ]}
          features={t.raw("pulse.items") as string[]}
          device={
            <DevFrame header={t("pulse.deviceHeader")} headerRight="Sample">
              <div className="[font-size:var(--text-sm)] text-[var(--ink-2)] space-y-[var(--space-4)]">
                <p className="m-0 font-display font-bold [font-size:var(--text-lg)] text-[var(--ink)]">
                  {t("pulse.letter.title")}
                </p>
                <div>
                  <p className="m-0 mb-[var(--space-1)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    {t("pulse.letter.siteLabel")}
                  </p>
                  <p className="m-0 leading-relaxed">{t("pulse.letter.siteLine1")}</p>
                  <p className="m-0 leading-relaxed text-[var(--attention)]">
                    {t("pulse.letter.siteLine2")}
                  </p>
                </div>
                <div>
                  <p className="m-0 mb-[var(--space-1)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    {t("pulse.letter.googleLabel")}
                  </p>
                  <p className="m-0 leading-relaxed">{t("pulse.letter.googleLine")}</p>
                </div>
                <div>
                  <p className="m-0 mb-[var(--space-1)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    {t("pulse.letter.watchLabel")}
                  </p>
                  <p className="m-0 leading-relaxed">{t("pulse.letter.watchLine")}</p>
                </div>
                <div>
                  <p className="m-0 mb-[var(--space-1)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    {t("pulse.letter.actionsLabel")}
                  </p>
                  <ol className="m-0 pl-[1.1em] space-y-[var(--space-1)]">
                    <li>{t("pulse.letter.action1")}</li>
                    <li>{t("pulse.letter.action2")}</li>
                  </ol>
                </div>
              </div>
              <p className="mt-[var(--space-4)] pt-[var(--space-4)] border-t border-[var(--rule-soft)] [font-size:var(--text-sm)] text-[var(--mid)]">
                {t("pulse.deviceBelow")}
              </p>
            </DevFrame>
          }
        />
      </Rail>

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
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[16ch] text-[var(--ink)]">
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
          <p className="[font-size:var(--text-base)] text-[var(--ink-2)] max-w-[52ch] leading-relaxed mb-[var(--space-8)]">
            {t("ctaBody")}
          </p>
          <Button asChild>
            <Link href="/en/contact">{t("ctaButton")}</Link>
          </Button>
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)] mt-[var(--space-6)]">
            Or email directly: gabor@thegbr.eu
          </p>
        </section>
      </Rail>
    </main>
  );
}
