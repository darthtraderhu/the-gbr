import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/jsonld";
import { getSortedPostsData } from "@/lib/posts";
import { getSortedEnPostsData } from "@/lib/posts-en";
import type { FaqItem } from "@/lib/szolgaltatasok";
import JsonLd from "@/app/components/JsonLd";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";
import {
  AngleTable,
  FactStrip,
  FeatureGrid,
  Okoszisztema,
  type AngleRow,
  type Fact,
  type Feature,
} from "@/app/components/SalesBlocks";
import { ECO_STAGES_EN, ECO_STAGES_HU, type ServiceId } from "@/lib/okoszisztema";

// A magyar (/arzenal/...) és az angol (/en/services/...) aloldal ugyanaz a
// szerkezet, csak a keret szövegei és a linkek térnek el.
const LABELS = {
  hu: {
    home: "Főoldal",
    homeHref: "/",
    services: "Szolgáltatások",
    servicesHref: "/arzenal",
    contactHref: "/init",
    writingHref: "/hirek",
    heroButton: "Pitcheld el a projekted",
    reply: "Válasz 2 munkanapon belül",
    angleRail: "A szögünk",
    angleEyebrow: "Ahol mások megállnak",
    usual: "A szokásos",
    ours: "Nálunk",
    deliverRail: "Amit kapsz",
    deliverEyebrow: "Amit leszállítunk",
    deliverTitle: "Ez kerül az asztalodra",
    ecoRail: "Ökoszisztéma",
    ecoEyebrowActive: "Ahol ez a szolgáltatás ül",
    ecoEyebrowAll: "Amit végignézünk",
    ecoTitleActive: "Nem különálló munka. Egy értékesítési rendszer része",
    ecoTitleAll: "Mind az öt szakaszt megnézzük, mielőtt bármit ajánlanánk",
    ecoLead:
      "A vevőd nem egy kattintással dönt: keres, összehasonlít, kérdez, ajánlatot kér, és közben bármikor eltűnhet. Mi ezt az utat egyben nézzük. Nem kell mind az öt szakasz, de mindegyiknél tudjuk, mi jön előtte és utána.",
    youAreHere: "itt vagy",
    stepsRail: "Menet",
    stepsEyebrow: "Hogyan zajlik",
    stepsTitle: "Így lesz belőle élő rendszer",
    relatedRail: "Írások",
    relatedEyebrow: "Kapcsolódó írások",
    relatedTitle: "Amit erről írtunk",
    faqRail: "GYIK",
    faqEyebrow: "Gyakori kérdések",
    faqTitle: "Amit meg szoktak kérdezni",
    ctaRail: "Kapcsolat",
    ctaEyebrow: "Egy kérdés, mielőtt bármit ajánlanánk",
    ctaButton: "Írd meg nekünk",
    direct: "Vagy írj közvetlenül:",
  },
  en: {
    home: "Home",
    homeHref: "/en",
    services: "Services",
    servicesHref: "/en/services",
    contactHref: "/en/contact",
    writingHref: "/en/writing",
    heroButton: "Start a conversation",
    reply: "Reply within 2 business days",
    angleRail: "Our angle",
    angleEyebrow: "Where others stop",
    usual: "The usual",
    ours: "With us",
    deliverRail: "What you get",
    deliverEyebrow: "What we deliver",
    deliverTitle: "What lands on your desk",
    ecoRail: "Ecosystem",
    ecoEyebrowActive: "Where this service sits",
    ecoEyebrowAll: "What we look at",
    ecoTitleActive: "Not a separate job. Part of one sales system",
    ecoTitleAll: "We look at all five stages before recommending anything",
    ecoLead:
      "Buyers don't decide in one click: they search, compare, ask, request a quote, and can drop off at any point. We look at that path as a whole. Not every project needs all five stages, but at each one we know what comes before and after.",
    youAreHere: "you are here",
    stepsRail: "Process",
    stepsEyebrow: "How it works",
    stepsTitle: "How it becomes a live system",
    relatedRail: "Writing",
    relatedEyebrow: "Related writing",
    relatedTitle: "What we've written about it",
    faqRail: "FAQ",
    faqEyebrow: "Frequently asked",
    faqTitle: "What people actually ask",
    ctaRail: "Contact",
    ctaEyebrow: "One question before we recommend anything",
    ctaButton: "Ask us",
    direct: "Or write directly:",
  },
};

// Egy szolgáltatás önálló aloldala (/arzenal/..., angolul /en/services/...). Az /arzenal az áttekintő,
// ez a részletes oldal: saját title, H1, Service séma és GYIK, hogy a
// szolgáltatásra külön is rangsorolható legyen.

export interface ServicePageProps {
  n: string;
  railLabel: string;
  name: string;
  path: string;
  schemaName: string;
  schemaDescription: string;
  // A H1 fölötti rövid, merész állítás.
  kicker: string;
  title: string;
  lead: React.ReactNode[];
  facts: Fact[];
  // A szolgáltatás saját szöge: a szokásos megoldás és a mienk.
  angleTitle: string;
  angle: AngleRow[];
  features: Feature[];
  steps: { title: string; body: string }[];
  device?: React.ReactNode;
  // A szolgáltatás helye az értékesítési ökoszisztémában. Ha nincs (pl. az
  // átvilágítás, ami mind az öt szakaszt végignézi), egyik sincs kiemelve.
  ecosystemId?: ServiceId;
  // Szolgáltatáshoz illő záró kérdés — nem „mondd el, mit szeretnél”.
  cta: { question: string; body: string; button?: string };
  // Opcionális többlet blokk a kártyák után (pl. Next.js-márkák a webnél).
  extra?: React.ReactNode;
  // Opcionális blokk közvetlenül a fejléc után (pl. az átvilágítás találatai).
  afterHero?: React.ReactNode;
  // A kapcsolódó cikkek slugjai — csak a már megjelent cikkek látszanak, az
  // ütemezett cikk a dátuma napján magától bekerül (ld. revalidate).
  relatedSlugs: string[];
  faq: FaqItem[];
  locale?: "hu" | "en";
}

export default function ServicePage({
  n,
  railLabel,
  name,
  path,
  schemaName,
  schemaDescription,
  kicker,
  title,
  lead,
  facts,
  angleTitle,
  angle,
  features,
  steps,
  device,
  ecosystemId,
  cta,
  extra,
  afterHero,
  relatedSlugs,
  faq,
  locale = "hu",
}: ServicePageProps) {
  const L = LABELS[locale];
  const inLanguage = locale === "en" ? "en" : undefined;
  const posts = locale === "en" ? getSortedEnPostsData() : getSortedPostsData();
  const related = posts.filter((post) => relatedSlugs.includes(post.id));

  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd
        data={breadcrumbSchema([
          { name: L.home, url: `${SITE_URL}${locale === "en" ? L.homeHref : ""}` },
          { name: L.services, url: `${SITE_URL}${L.servicesHref}` },
          { name, url: `${SITE_URL}${path}` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: schemaName,
          description: schemaDescription,
          url: `${SITE_URL}${path}`,
          inLanguage,
        })}
      />
      <JsonLd data={faqPageSchema(faq, inLanguage ? { inLanguage } : undefined)} />

      {/* ===== FEJLÉC ===== */}
      <Rail label={railLabel} dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-10)] sm:pb-[var(--space-16)]">
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase text-[var(--dim)] mb-[var(--space-5)]">
            <Link href={L.servicesHref} className="hover:text-[var(--signal)] transition-colors">
              {L.services}
            </Link>{" "}
            / {n}
          </p>
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.22em] uppercase text-[var(--signal)] flex items-center gap-3 mb-[var(--space-5)]">
            <span aria-hidden="true" className="w-1.5 h-1.5 bg-[var(--signal)] block motion-safe:animate-pulse" />
            {kicker}
          </p>
          <h1 className="font-display font-black leading-[0.9] tracking-[-0.052em] [font-size:var(--text-claim)] max-w-[15ch]">
            {title}
            <span className="text-[var(--signal)]">.</span>
          </h1>
          <div className="mt-[var(--space-8)] space-y-[var(--space-5)]">
            {lead.map((p, i) => (
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
          <div className="flex flex-wrap items-center gap-3 mt-[var(--space-8)]">
            <Button asChild>
              <Link href={L.contactHref}>{L.heroButton}</Link>
            </Button>
            <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)]">
              {L.reply}
            </span>
          </div>
        </section>
        <FactStrip facts={facts} />
      </Rail>

      <Seam />

      {afterHero}

      {/* ===== A SZÖGÜNK ===== */}
      <Rail label={L.angleRail}>
        <AngleTable
          eyebrow={L.angleEyebrow}
          title={angleTitle}
          usualLabel={L.usual}
          oursLabel={L.ours}
          rows={angle}
        />
      </Rail>

      {/* ===== AMIT KAPSZ ===== */}
      <Rail label={L.deliverRail}>
        <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)]">
          <Eyebrow>{L.deliverEyebrow}</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch]">
            {L.deliverTitle}
          </h2>
        </section>
        <FeatureGrid features={features} />
        {device}
      </Rail>

      {extra}

      <Seam />

      {/* ===== ÖKOSZISZTÉMA ===== */}
      <Rail label={L.ecoRail} dark>
        <Okoszisztema
          stages={locale === "en" ? ECO_STAGES_EN : ECO_STAGES_HU}
          active={ecosystemId}
          eyebrow={ecosystemId ? L.ecoEyebrowActive : L.ecoEyebrowAll}
          title={
            ecosystemId ? (
              <>
                {L.ecoTitleActive}
                <span className="text-[var(--signal)]">.</span>
              </>
            ) : (
              <>
                {L.ecoTitleAll}
                <span className="text-[var(--signal)]">.</span>
              </>
            )
          }
          lead={L.ecoLead}
          youAreHere={L.youAreHere}
        />
      </Rail>

      {/* ===== MENET ===== */}
      <Rail label={L.stepsRail}>
        <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)]">
          <Eyebrow>{L.stepsEyebrow}</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch]">
            {L.stepsTitle}
          </h2>
        </section>
        <ol className="border-t border-[var(--rule)]">
          {steps.map((step, i) => (
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

      {/* ===== KAPCSOLÓDÓ ÍRÁSOK ===== */}
      {related.length > 0 && (
        <Rail label={L.relatedRail}>
          <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)]">
            <Eyebrow>{L.relatedEyebrow}</Eyebrow>
            <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch]">
              {L.relatedTitle}
            </h2>
          </section>
          <div className="border-t border-[var(--rule)]">
            {related.map((post) => (
              <Link
                key={post.id}
                href={`${L.writingHref}/${post.id}`}
                className="block px-6 py-[var(--space-5)] border-b border-[var(--rule)] group hover:bg-[var(--panel)] transition-colors"
              >
                <span className="block font-display font-bold [font-size:var(--text-xl)] tracking-[-0.02em] leading-snug group-hover:text-[var(--signal-deep)] transition-colors">
                  {post.title}
                </span>
                {post.excerpt && (
                  <span className="block mt-[var(--space-2)] [font-size:var(--text-sm)] text-[var(--mid)] max-w-[64ch]">
                    {post.excerpt}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </Rail>
      )}

      {/* ===== GYIK ===== */}
      <Rail label={L.faqRail}>
        <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)]">
          <Eyebrow>{L.faqEyebrow}</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch]">
            {L.faqTitle}
          </h2>
        </section>
        <dl className="border-t border-[var(--rule)]">
          {faq.map((item) => (
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
      </Rail>

      <Seam />

      {/* ===== CTA ===== */}
      <Rail label={L.ctaRail} dark>
        <section className="px-6 py-[var(--space-20)] sm:py-[var(--space-32)]">
          <Eyebrow>{L.ctaEyebrow}</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[17ch] mb-[var(--space-6)] text-[var(--ink)]">
            {cta.question}
          </h2>
          <p className="[font-size:var(--text-lg)] text-[var(--ink-2)] max-w-[56ch] leading-relaxed mb-[var(--space-8)]">
            {cta.body}
          </p>
          <Button asChild>
            <Link href={L.contactHref}>{cta.button ?? L.ctaButton} &rarr;</Link>
          </Button>
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)] mt-[var(--space-6)]">
            {L.direct} gabor@thegbr.eu
          </p>
        </section>
      </Rail>
    </main>
  );
}
