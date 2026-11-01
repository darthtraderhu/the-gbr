import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ServicePage from "@/app/components/ServicePage";
import ProposalSample from "@/app/components/ProposalSample";
import StackProof from "@/app/components/StackProof";
import PulseLetter, { type PulseLetterContent } from "@/app/components/PulseLetter";
import { DevFrame, FindingsTable, LogLines, ReportRows } from "@/app/components/ServiceFrame";
import { FindingChapters } from "@/app/components/SalesBlocks";
import { Eyebrow, Rail } from "@/app/components/ui";
import { NEXTJS_CHECKED_EN, NEXTJS_ITEMS_EN, NEXTJS_SOURCES_EN } from "@/lib/nextjs-proof";
import { AUDIT_EN, AUDIT_SPOTLIGHT_EN, PITCH_EN } from "@/lib/szolgaltatasok-en";
import { EN_SERVICE_PAGES, type EnServicePage } from "@/lib/szolgaltatasok-en-pages";

// Az angol szolgáltatás-aloldalak (/en/services/<slug>), a magyar
// /arzenal/... aloldalak párjai. A kapcsolódó cikkek listája miatt naponta
// frissül (ütemezett cikkek).
export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return EN_SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

function findPage(slug: string): EnServicePage | undefined {
  return EN_SERVICE_PAGES.find((page) => page.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) return {};
  const path = `/en/services/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: path,
      languages: { hu: page.huPath, en: path, "x-default": page.huPath },
    },
    openGraph: { title: page.metaTitle, description: page.metaDescription, locale: "en_GB" },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription },
  };
}

// Ugyanazok az anonimizált oldalképek, mint a magyar átvilágítás-aloldalon.
const PROPOSAL_FILES = [
  "/minta/dizajnajanlas/01-tartalom.webp",
  "/minta/dizajnajanlas/02-tipografia.webp",
  "/minta/dizajnajanlas/03-szinpaletta.webp",
  "/minta/dizajnajanlas/04-fooldal.webp",
  "/minta/dizajnajanlas/05-termekoldal.webp",
];

const FINDINGS_HEADERS = { finding: "Finding", meaning: "Meaning", severity: "Severity" };

type Findings = { finding: string; meaning: string; severity: string }[];
type Log = { t: string; msg: string }[];

const B = (chunks: React.ReactNode) => <strong className="text-[var(--ink)]">{chunks}</strong>;

const NOTE_CLASS = "mt-[var(--space-4)] [font-size:var(--text-sm)] text-[var(--mid)]";

export default async function EnglishServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) notFound();

  const t = await getTranslations({ locale: "en", namespace: "Services" });
  const pitch = PITCH_EN[page.id];

  let lead: React.ReactNode[] = [];
  let device: React.ReactNode = null;
  let extra: React.ReactNode = null;
  let afterHero: React.ReactNode = null;
  let features: string[] = [];

  switch (page.id) {
    case "web":
      lead = [t("web.p1"), t("web.p2")];
      features = t.raw("web.items") as string[];
      device = (
        <DevFrame header="Proof · we built this site too">
          <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed">
            We built this site on the same principles. You can check the sitemap, the structured
            data and robots.txt on the{" "}
            <Link href="/en/seo" className="text-[var(--ink)] underline">
              SEO page
            </Link>
            . An anonymised design proposal excerpt is on the{" "}
            <Link href="/en/services/audit-and-proposal" className="text-[var(--ink)] underline">
              audit page
            </Link>
            .
          </p>
        </DevFrame>
      );
      extra = (
        <Rail label="Next.js">
          <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)]">
            <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase text-[var(--dim)] mb-[var(--space-5)]">
              Why Next.js
            </p>
            <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[15ch]">
              What global brands build on, we build on too
              <span className="text-[var(--signal)]">.</span>
            </h2>
          </section>
          <div className="px-6 pb-[var(--space-12)] sm:pb-[var(--space-16)]">
            <StackProof
              intro={t("web.stackIntro")}
              items={NEXTJS_ITEMS_EN}
              note={t("web.stackNote")}
              sourcesLabel={t("web.stackSourcesLabel")}
              sources={NEXTJS_SOURCES_EN}
              checked={NEXTJS_CHECKED_EN}
            />
          </div>
        </Rail>
      );
      break;
    case "ads":
      lead = [t("ads.p1"), t("ads.p2")];
      features = t.raw("ads.items") as string[];
      device = (
        <DevFrame header="What a weekly report looks like" headerRight="Sample">
          <ReportRows rows={t.raw("ads.sampleRows") as { label: string; value: string }[]} />
          <p className={NOTE_CLASS}>{t("ads.deviceBelow")}</p>
        </DevFrame>
      );
      break;
    case "software":
      lead = [t("software.p1"), t.rich("software.p2", { b: B }), t("software.p3")];
      features = t.raw("software.items") as string[];
      device = (
        <DevFrame header={t("software.deviceHeader")} headerRight="Sample">
          <LogLines lines={t.raw("software.logLines") as Log} />
          <p className={NOTE_CLASS}>{t("software.deviceBelow")}</p>
        </DevFrame>
      );
      break;
    case "ai":
      lead = [
        t("ai.p1"),
        t.rich("ai.p2", {
          link: (chunks) => (
            <Link href="/ai-tajekoztato" className="text-[var(--ink)] underline">
              {chunks}
            </Link>
          ),
        }),
      ];
      features = t.raw("ai.items") as string[];
      device = (
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
          <p className={NOTE_CLASS}>{t("ai.deviceBelow")}</p>
        </DevFrame>
      );
      break;
    case "video":
      lead = [t("video.p1")];
      features = t.raw("video.items") as string[];
      break;
    case "ops":
      lead = [t("ops.p1"), t("ops.p2")];
      features = t.raw("ops.items") as string[];
      device = (
        <DevFrame header={t("ops.deviceHeader")} headerRight="Log">
          <LogLines lines={t.raw("ops.logLines") as Log} />
        </DevFrame>
      );
      break;
    case "access":
      lead = [
        t("access.p1"),
        t.rich("access.p2", { b: B }),
        t.rich("access.emphasis", { b: B }),
      ];
      features = t.raw("access.items") as string[];
      device = (
        <DevFrame header={t("access.deviceHeader")} headerRight="Sample">
          <FindingsTable
            rows={t.raw("access.findingsTable") as Findings}
            note={t("access.deviceBelow")}
            headers={FINDINGS_HEADERS}
          />
        </DevFrame>
      );
      break;
    case "pulse":
      lead = [
        t("pulse.p1"),
        t.rich("pulse.p2", { b: B }),
        t.rich("pulse.emphasis1", { b: B }),
        t.rich("pulse.emphasis2", { b: B }),
        t.rich("pulse.emphasis3", { b: B }),
      ];
      features = t.raw("pulse.items") as string[];
      device = (
        <DevFrame header={t("pulse.deviceHeader")} headerRight="Sample">
          <PulseLetter
            letter={t.raw("pulse.letter") as PulseLetterContent}
            note={t("pulse.deviceBelow")}
          />
        </DevFrame>
      );
      break;
    case "it":
      lead = [t("it.p1"), t.rich("it.p2", { b: B }), t("it.p3")];
      features = t.raw("it.items") as string[];
      device = (
        <DevFrame header={t("it.deviceHeader")} headerRight="Sample">
          <FindingsTable
            rows={t.raw("it.findingsTable") as Findings}
            note={t("it.deviceBelow")}
            headers={FINDINGS_HEADERS}
          />
        </DevFrame>
      );
      break;
    case "audit":
      lead = AUDIT_EN.paragraphs;
      features = AUDIT_EN.items;
      afterHero = (
        <Rail label="What we find">
          <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-10)]">
            <Eyebrow>Real findings · anonymised</Eyebrow>
            <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[16ch] text-[var(--ink)]">
              What we found in our most recent audits
              <span className="text-[var(--signal)]">.</span>
            </h2>
            <p className="mt-[var(--space-6)] [font-size:var(--text-lg)] leading-relaxed text-[var(--ink-2)] max-w-[58ch]">
              Not invented examples: lines taken from reports we sent, without company names.
              Working companies with working sites that were losing buyers in the meantime.
            </p>
          </section>
          <FindingChapters
            chapters={AUDIT_SPOTLIGHT_EN.map((ch) => ({
              n: ch.n,
              title: ch.title,
              lead: "",
              rows: [{ finding: ch.finding, cost: ch.cost }],
            }))}
            findingLabel="What we found"
            costLabel="What it costs"
          />
        </Rail>
      );
      device = (
        <DevFrame header={t("web.sampleHeader")} headerRight={t("web.sampleTag")}>
          <ProposalSample
            intro={t("web.sampleIntro")}
            pages={(["contents", "typography", "palette", "home", "product"] as const).map(
              (key, i) => ({
                src: PROPOSAL_FILES[i],
                alt: t(`web.samplePages.${key}.alt`),
                caption: t(`web.samplePages.${key}.caption`),
              }),
            )}
            openLabel={t("web.sampleOpen")}
          />
        </DevFrame>
      );
      break;
  }

  return (
    <ServicePage
      locale="en"
      n={page.n}
      railLabel={page.railLabel}
      name={page.name}
      path={`/en/services/${page.slug}`}
      schemaName={page.schemaName}
      schemaDescription={page.schemaDescription}
      kicker={pitch.kicker}
      title={page.title}
      lead={lead}
      facts={pitch.facts}
      angleTitle={pitch.angleTitle}
      angle={pitch.angle}
      ecosystemId={page.ecosystemId}
      cta={pitch.cta}
      features={features.map((title) => ({ title }))}
      device={device}
      extra={extra}
      afterHero={afterHero}
      steps={page.steps}
      relatedSlugs={page.relatedSlugs}
      faq={page.faq}
    />
  );
}
