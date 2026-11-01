import type { FaqItem } from "./szolgaltatasok";
import type { ServiceId } from "./okoszisztema";

// Az angol szolgáltatás-aloldalak (/en/services/<slug>) adatai. A magyar
// /arzenal/... aloldalak párjai: a lépések és a GYIK a magyar szöveg
// fordítása, új vállalást nem tartalmaznak. A bevezető, a jellemzők és a
// minták a messages/en.json Services kulcsaiból jönnek, hogy az
// /en/services összefoglaló és az aloldal ne térjen el egymástól.

// ===== Közös GYIK-tételek (az /en/services oldal is ezeket használja) =====

export const FAQ_EN = {
  accessCompliance: {
    question: "Do you guarantee accessibility compliance?",
    answer:
      "No. Compliance is a legal determination and a lawyer makes it. What we guarantee: the technical barriers get assessed, documented and removed, and you get a written record of what changed.",
  },
  pulseFixes: {
    question: "Does Pulse fix problems automatically?",
    answer:
      "No. Pulse detects and reports. Fixing is either a separate instruction or comes out of a monthly retainer — because an automatic change to a live site without anyone looking at it is how outages happen.",
  },
  pulseLegal: {
    question: "Does the Pulse legal module guarantee compliance?",
    answer:
      "No. A lawyer determines compliance, not us. What the module gives you: a monthly record of which cookies and third-party scripts the site actually loads, and when that drifts from the legal documents, a web lawyer reviews and updates them as needed. The lawyer sets the scope and fee of the legal work.",
  },
  price: {
    question: "How is the final price set?",
    answer:
      "After scoping. We discuss what you need, review the existing systems, then give a fixed price and date — not a range.",
  },
  whiteLabel: {
    question: "Can you work white-label?",
    answer:
      "Yes, and most of our agency work is. Your client relationship stays yours. If you'd rather name us, that's fine too.",
  },
  smallOffice: {
    question: "Does a small office need outside IT support?",
    answer:
      "Often it's the small ones that need it most. Without an in-house IT person, someone usually handles it on the side, and that works until something breaks. We start with an assessment and tell you how much ongoing work your setup actually needs. If it's not much, we say so.",
  },
  replaceSystems: {
    question: "Do we have to replace our existing systems to automate?",
    answer:
      "Usually not. We connect what you already have: the webshop, the invoicing system, the spreadsheets. We only recommend new software when the existing one can't do what's needed — and the assessment explains why in writing.",
  },
  automationStops: {
    question: "What happens if an automation stops?",
    answer:
      "It doesn't stop silently. Every run is logged, and a failure sends an alert to whoever is responsible — us, if you hand over operations, or the person you designate. Missed items can be processed again from the log.",
  },
  size: {
    question: "Do you only work with large companies?",
    answer:
      "No. There is a lower limit below which a project isn't worth starting, and the budget question on the contact form filters for it. Above that, company size doesn't matter.",
  },
  afterHandover: {
    question: "What if something breaks after handover?",
    answer:
      "If you also take operations, we notice first and fix it. If not, we still stand behind the work we delivered; the contract sets out the details.",
  },
} satisfies Record<string, FaqItem>;

// Az /en/services összefoglaló GYIK-ja, a korábbi sorrendben.
export const SERVICES_FAQ_EN: FaqItem[] = [
  FAQ_EN.accessCompliance,
  FAQ_EN.pulseFixes,
  FAQ_EN.pulseLegal,
  FAQ_EN.price,
  FAQ_EN.whiteLabel,
  FAQ_EN.smallOffice,
  FAQ_EN.replaceSystems,
  FAQ_EN.automationStops,
];

// ===== Aloldalak =====

// A blokk-azonosító (id) ugyanaz, mint az /en/services horgonya és a
// messages/en.json Services kulcsa.
export type EnServiceId =
  | "web"
  | "ads"
  | "software"
  | "ai"
  | "video"
  | "ops"
  | "access"
  | "pulse"
  | "it"
  | "audit";

export type EnServicePage = {
  id: EnServiceId;
  slug: string;
  n: string;
  railLabel: string;
  name: string;
  huPath: string;
  metaTitle: string;
  metaDescription: string;
  schemaName: string;
  schemaDescription: string;
  title: string;
  // Az OG-kép két címsora (rövid, a 92 px-es betűhöz).
  ogLines: [string, string];
  ecosystemId?: ServiceId;
  steps: { title: string; body: string }[];
  faq: FaqItem[];
  relatedSlugs: string[];
};

export const EN_SERVICE_PAGES: EnServicePage[] = [
  {
    id: "web",
    slug: "web-development",
    n: "01",
    railLabel: "01 / Web",
    name: "Web and commerce",
    huPath: "/arzenal/weboldal-fejlesztes",
    metaTitle: "Website and online store development on Next.js | THE GBR",
    metaDescription:
      "Custom websites and online stores on Next.js: fast loading, technical SEO, structured data, security headers. Fixed price and deadline after scoping; live stores are rebuilt in phases while they keep trading.",
    schemaName: "Website and online store development",
    schemaDescription:
      "Custom websites and online stores built on Next.js, with technical SEO, structured data and security built into the structure; phased cutover for live stores.",
    title: "Sites and stores that sell, not just exist",
    ogLines: ["Web and", "commerce"],
    ecosystemId: "web",
    steps: [
      {
        title: "Tell us what the site has to sell",
        body: "We don't start with colours, but with who the buyer is, what they look for, and where they drop off today. We reply within two business days; if we're not a fit, we say so.",
      },
      {
        title: "Scoping, fixed price and deadline",
        body: "We review the current site and the goals. At the end of scoping you get a fixed price and a deadline, not a range.",
      },
      {
        title: "Design and build",
        body: "A website typically takes 4–8 weeks. Rebuilding a live store goes in phases: pages are replaced step by step while the shop keeps trading.",
      },
      {
        title: "Launch with redirects",
        body: "The old site stays up until the new one demonstrably works. Old URLs are redirected so search rankings aren't lost.",
      },
      {
        title: "Operations, if you want them",
        body: "After launch we keep watching, fixing and improving the site, with one accountable contact.",
      },
    ],
    faq: [
      {
        question: "How long does it take?",
        answer:
          "A website typically takes 4–8 weeks. Rebuilding a live store takes considerably longer because it goes in phases, but the first visible change appears within weeks.",
      },
      {
        question: "What happens to the old site when it's replaced?",
        answer:
          "We don't switch it off until the new one demonstrably works. URLs are redirected so search rankings aren't lost; that's the most expensive mistake you can make in a platform change.",
      },
      FAQ_EN.price,
      FAQ_EN.afterHandover,
      FAQ_EN.whiteLabel,
      FAQ_EN.size,
    ],
    relatedSlugs: ["who-owns-your-website", "before-you-order-a-new-website", "what-chatgpt-sees-on-your-site"],
  },
  {
    id: "ads",
    slug: "performance-marketing",
    n: "02",
    railLabel: "02 / Marketing",
    name: "Performance marketing",
    huPath: "/arzenal/hirdeteskezeles",
    metaTitle: "Google and Meta ads measured to the enquiry | THE GBR",
    metaDescription:
      "B2B Google and Meta campaigns with conversion tracking through to the enquiry, campaign landing pages and a weekly plain-language report. Channels that bring no enquiries get stopped.",
    schemaName: "Performance marketing",
    schemaDescription:
      "B2B Google and Meta campaigns with conversion tracking through to the enquiry, campaign-specific landing pages and weekly reporting.",
    title: "Google and Meta ads where we count enquiries, not impressions",
    ogLines: ["Performance", "marketing"],
    ecosystemId: "ads",
    steps: [
      {
        title: "Tracking through to the enquiry",
        body: "We set up conversion tracking so you see not just the click, but whether it turned into an enquiry.",
      },
      {
        title: "A landing page per campaign",
        body: "The ad leads to a page made for the campaign, not to the home page.",
      },
      {
        title: "Weekly report",
        body: "Every week you see what brought business and what didn't, in plain language.",
      },
      {
        title: "What doesn't work, stops",
        body: "If a channel brings no enquiries, we say so and stop spending the budget on it.",
      },
    ],
    faq: [
      {
        question: "What's in the weekly report?",
        answer:
          "How many enquiries the clicks turned into, which channel brought the most that week, and what we're stopping, with the reason. In plain language, not reach and impressions.",
      },
      {
        question: "What happens if a channel brings no enquiries?",
        answer: "We tell you, and we stop spending the budget on it.",
      },
      FAQ_EN.whiteLabel,
      FAQ_EN.size,
    ],
    relatedSlugs: ["the-ad-was-fine"],
  },
  {
    id: "software",
    slug: "automation",
    n: "03",
    railLabel: "03 / Software",
    name: "Software and automation",
    huPath: "/arzenal/automatizacio",
    metaTitle: "Business process automation and custom software | THE GBR",
    metaDescription:
      "We connect webshop, invoicing, CRM and spreadsheets so manual copying runs on its own. Off-the-shelf tool or custom code, with logging, failure alerts and documented handover.",
    schemaName: "Business process automation and custom software",
    schemaDescription:
      "Process assessment, connecting existing systems, automation with off-the-shelf tools or custom code, custom internal systems and client portals, with logging and failure alerts.",
    title: "Process automation: what's done by hand today runs on its own tomorrow",
    ogLines: ["Process", "automation"],
    ecosystemId: "software",
    steps: [
      {
        title: "Process assessment",
        body: "You get a written summary of which processes are worth automating and which aren't.",
      },
      {
        title: "Connect or build",
        body: "We connect what you already have, with an off-the-shelf tool or custom code, whichever is cheaper to maintain in the long run.",
      },
      {
        title: "Logging and failure alerts",
        body: "Every run is logged and a failure raises an alert, because a process that stops silently is worse than doing it by hand.",
      },
      {
        title: "Handover with documentation",
        body: "We hand it over so we're not the only ones who understand it. We also run and develop it further, if you want.",
      },
    ],
    faq: [FAQ_EN.replaceSystems, FAQ_EN.automationStops, FAQ_EN.price, FAQ_EN.size],
    relatedSlugs: ["where-does-an-enquiry-go", "off-the-shelf-or-custom-software", "five-seconds-nobody-knew"],
  },
  {
    id: "ai",
    slug: "ai-chatbot",
    n: "04",
    railLabel: "04 / AI",
    name: "AI integration",
    huPath: "/arzenal/ai-chatbot",
    metaTitle: "AI chatbot for your website, with a human handoff | THE GBR",
    metaDescription:
      "Website chat tuned to your own content that answers simple questions at night and hands serious ones to a person. With an AI usage notice and documented data flows.",
    schemaName: "AI chatbot and AI integration",
    schemaDescription:
      "Website chat tuned to the client's own content, escalation to a human, AI usage notice and documented data flows; internal document processing and summarisation.",
    title: "An AI chatbot that answers at night, and knows when a person is needed",
    ogLines: ["AI chatbot", "with handoff"],
    ecosystemId: "ai",
    steps: [
      {
        title: "Tuned to your own content",
        body: "The chat answers from what's on your website and in the material you give us.",
      },
      {
        title: "Handoff to a person",
        body: "If the question is serious, the chat sends it to a person. Price and timeline come from a person.",
      },
      {
        title: "The legal side",
        body: "An AI usage notice is prepared, and we document which data goes where.",
      },
    ],
    faq: [
      {
        question: "Does the chat give prices or quotes?",
        answer:
          "No. The chat informs, it doesn't quote. Price and timeline come from a person, and for serious questions the chat points to one.",
      },
      {
        question: "Where does the data typed into the chat go?",
        answer:
          "For this site, the AI usage notice describes it. If we build a chat for you, an AI notice is prepared alongside it, and we document which data goes where.",
      },
      FAQ_EN.whiteLabel,
      FAQ_EN.size,
    ],
    relatedSlugs: [],
  },
  {
    id: "video",
    slug: "video-production",
    n: "05",
    railLabel: "05 / Video",
    name: "Video and content",
    huPath: "/arzenal/videogyartas",
    metaTitle: "Company and product video in your website's visual language | THE GBR",
    metaDescription:
      "Brand films, product video and short social formats, directed by us in the same visual language as the website. Production by our video partner; we stay your contact.",
    schemaName: "Video production",
    schemaDescription:
      "Company and brand film, product video, short social formats, editing, colour and subtitling, produced with a video partner under our direction.",
    title: "Company video that says the same thing as your website",
    ogLines: ["Company", "video"],
    ecosystemId: "video",
    steps: [
      {
        title: "Matched to the website",
        body: "The video is made in the same visual language as the site, so the brand looks the same everywhere.",
      },
      {
        title: "Produced with a partner, directed by us",
        body: "Shooting and editing are done by our video partner; we remain your contact throughout.",
      },
      {
        title: "Post-production and formats",
        body: "Editing, colour, subtitling, and formats for the website and for social media.",
      },
    ],
    faq: [
      {
        question: "Who produces the video?",
        answer:
          "Our video partner, under our direction. It's made in the same visual language as the website, and we remain your contact.",
      },
      FAQ_EN.whiteLabel,
      FAQ_EN.size,
    ],
    relatedSlugs: [],
  },
  {
    id: "ops",
    slug: "website-operations",
    n: "06",
    railLabel: "06 / Web operations",
    name: "Web operations",
    huPath: "/arzenal/weboldal-uzemeltetes",
    metaTitle: "Website operations: monitoring, fixes and development | THE GBR",
    metaDescription:
      "After launch we keep the site: monitoring and alerts, ongoing development against monthly hours, weekly or fortnightly reporting, and one accountable contact instead of a ticket number.",
    schemaName: "Website operations",
    schemaDescription:
      "Monitoring and alerting, ongoing development against monthly hours, compliance maintenance, regular progress reporting and one accountable contact.",
    title: "Website operations: launch isn't the end, it's the start",
    ogLines: ["Website", "operations"],
    ecosystemId: "ops",
    steps: [
      {
        title: "Monitoring and alerts",
        body: "Monitoring and failure alerts: we know about a problem before you do.",
      },
      {
        title: "Development against monthly hours",
        body: "Within the monthly budget we keep fixing and improving the site.",
      },
      {
        title: "Reports and one contact",
        body: "You get a weekly or fortnightly report, and you work with one accountable person.",
      },
    ],
    faq: [
      {
        question: "Who do I deal with?",
        answer: "One accountable person who knows your project. Not a ticket number.",
      },
      FAQ_EN.afterHandover,
      FAQ_EN.whiteLabel,
      FAQ_EN.size,
    ],
    relatedSlugs: [
      "five-seconds-nobody-knew",
      "pages-you-dont-know-about",
      "who-owns-your-website",
      "why-build-your-own-product",
    ],
  },
  {
    id: "access",
    slug: "accessibility",
    n: "07",
    railLabel: "07 / Accessibility",
    name: "Accessibility",
    huPath: "/arzenal/akadalymentesites",
    metaTitle: "Website accessibility: assessment and fixes | THE GBR",
    metaDescription:
      "Technical accessibility assessment and fixes: contrast, keyboard navigation, screen readers, forms, subtitles. With a written report of what changed; compliance is a lawyer's call.",
    schemaName: "Website accessibility",
    schemaDescription:
      "Technical accessibility assessment and remediation: contrast, text sizing, keyboard navigability, screen reader usability, forms and subtitling, with a written report.",
    title: "Accessibility: some people can't use your site right now",
    ogLines: ["Website", "accessibility"],
    ecosystemId: "access",
    steps: [
      {
        title: "Assessment",
        body: "We look at what blocks use of the site, and how serious it is.",
      },
      {
        title: "Fixes",
        body: "Contrast, text size, target sizes, keyboard navigation, screen readers, forms and subtitles.",
      },
      {
        title: "Written report",
        body: "At the end you get in writing what changed. Compliance is a lawyer's determination, not ours.",
      },
    ],
    faq: [FAQ_EN.accessCompliance, FAQ_EN.whiteLabel, FAQ_EN.size],
    relatedSlugs: ["what-makes-a-website-accessible"],
  },
  {
    id: "pulse",
    slug: "pulse",
    n: "08",
    railLabel: "08 / Pulse",
    name: "Pulse",
    huPath: "/arzenal/pulzus",
    metaTitle: "Pulse: monthly website monitoring in one plain letter | THE GBR",
    metaDescription:
      "Uptime, load speed, SSL expiry, contact form test, indexing and Google reviews, plus a legal module that maps cookies and third-party scripts. One plain-language letter a month.",
    schemaName: "Pulse website monitoring",
    schemaDescription:
      "Monthly monitoring of uptime, load speed, SSL certificate, contact form, indexing and Google reviews, with a legal module mapping cookies and third-party scripts, reported in a monthly letter.",
    title: "Pulse: one email a month on how the internet sees you",
    ogLines: ["Pulse", "monthly letter"],
    ecosystemId: "pulzus",
    steps: [
      {
        title: "Monthly measurement",
        body: "Uptime, load speed, SSL certificate, contact form, indexing and Google reviews.",
      },
      {
        title: "Legal module",
        body: "We map which cookies and third-party scripts the site loads, and whether tracking runs before consent. Changes are reviewed by our partner web lawyer.",
      },
      {
        title: "Monthly letter",
        body: "In plain language, with concrete suggestions. Fixes are a separate order, or come out of the monthly hours if you choose that.",
      },
    ],
    faq: [FAQ_EN.pulseFixes, FAQ_EN.pulseLegal, FAQ_EN.whiteLabel, FAQ_EN.size],
    relatedSlugs: ["five-seconds-nobody-knew", "privacy-notice-that-describes-another-site"],
  },
  {
    id: "it",
    slug: "it-operations",
    n: "09",
    railLabel: "09 / IT",
    name: "IT operations",
    huPath: "/arzenal/it-uzemeltetes",
    metaTitle: "Office IT operations with remote support | THE GBR",
    metaDescription:
      "Office IT run with our IT partner: assessment with a written summary, system administration, remote monitoring and support, servers, network, email, Microsoft 365, and the company mobile fleet.",
    schemaName: "Office IT operations",
    schemaDescription:
      "Office IT assessment and system administration with remote monitoring and support: servers, network, VPN, printers, email, Microsoft 365 and Teams, company mobile fleet; delivered with an IT partner.",
    title: "Office IT you don't have to think about",
    ogLines: ["Office IT", "operations"],
    ecosystemId: "it",
    steps: [
      {
        title: "Assessment",
        body: "We look at what's there now: machines, network, accounts, backups, email. You get in writing what we found and what we recommend.",
      },
      {
        title: "You decide what to hand over",
        body: "Based on the assessment we tell you how much ongoing work your setup needs. If it's not much, we say so.",
      },
      {
        title: "Operations with remote monitoring",
        body: "We connect to the machines remotely, no waiting for a site visit. From the server through the printers to everyone's phone, in one place.",
      },
    ],
    faq: [FAQ_EN.smallOffice, FAQ_EN.size],
    relatedSlugs: ["who-can-still-log-in"],
  },
  {
    id: "audit",
    slug: "audit-and-proposal",
    n: "10",
    railLabel: "10 / Audit",
    name: "Audit and proposal",
    huPath: "/arzenal/atvilagitas-es-ajanlas",
    metaTitle: "Website audit: where it loses buyers, why Google can't see it | THE GBR",
    metaDescription:
      "Outside-in website and online store audit: speed, SEO and AEO, pricing, legal gaps, and whether the site is a business card or a sales surface. Prioritised to-do list, then a design and system proposal with a clickable prototype.",
    schemaName: "Website audit, design and system proposal",
    schemaDescription:
      "Outside-in website and online store audit without access, with a written report and prioritised to-do list; then a design and system proposal: brand, page designs, the sales ecosystem plan and a clickable prototype on the real catalogue.",
    title: "Website audit: we show where the site is losing buyers right now",
    ogLines: ["Website", "audit"],
    steps: [
      {
        title: "Send the site's address",
        body: "And one sentence on what it sells and to whom. No access is needed, and you don't need to know what to ask for.",
      },
      {
        title: "Outside-in audit",
        body: "Speed and mobile, Google and AI search, usability, privacy and cookies, security settings visible from outside. A written report with a prioritised to-do list.",
      },
      {
        title: "Design and system proposal",
        body: "If you want to go further after the report: brand, concept, page designs including mobile, and the plan of the sales ecosystem, where enquiries come from and where they land.",
      },
      {
        title: "Clickable prototype",
        body: "Alongside the design proposal, a working prototype with the real catalogue. You can click through it before deciding.",
      },
      {
        title: "Next steps",
        body: "Broken into stages: what comes first, what can be solved on the current system, and where the new one starts.",
      },
    ],
    faq: [
      {
        question: "Do we need to give access to the site or the store?",
        answer:
          "Not for the audit. We look from the outside, at what buyers, Google and AI search see.",
      },
      {
        question: "What do we get?",
        answer:
          "For the audit, a written PDF report with a prioritised to-do list. If you also ask for a design and system proposal, that comes as a PDF too, with a clickable prototype built on the real catalogue.",
      },
      {
        question: "Will the material be public?",
        answer:
          "No. Our clients' materials are not public. We only show samples anonymised, with brand, product names and prices redacted.",
      },
      FAQ_EN.whiteLabel,
      FAQ_EN.size,
    ],
    relatedSlugs: [
      "before-you-order-a-new-website",
      "a-plan-not-a-picture",
      "pages-you-dont-know-about",
      "when-your-site-contradicts-itself",
      "privacy-notice-that-describes-another-site",
    ],
  },
];

export const EN_SERVICE_BY_ID = Object.fromEntries(
  EN_SERVICE_PAGES.map((page) => [page.id, page]),
) as Record<EnServiceId, EnServicePage>;

export function enServicePath(id: EnServiceId): string {
  return `/en/services/${EN_SERVICE_BY_ID[id].slug}`;
}
