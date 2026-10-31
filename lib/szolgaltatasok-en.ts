import type { ServicePitch } from "./szolgaltatasok";

// Az /en/services szolgáltatás-blokkjainak értékesítési szöge — a magyar
// *_PITCH angol párja. Ugyanaz a szabály: csak ellenőrizhető állítás, százalék
// és garancia nélkül. A kulcs az ARZENAL_SECTIONS_EN id-ja.

export const PITCH_EN: Record<string, ServicePitch> = {
  web: {
    kicker: "Not a business card. A sales surface.",
    headline: "Sites and stores that sell, not just exist",
    facts: [
      { value: "Next.js", label: "the same foundation Nike's and Sonos's stores run on" },
      { value: "Fixed price", label: "and deadline after the assessment, not a range" },
      { value: "4–8 weeks", label: "typical turnaround for a website" },
    ],
    angleTitle: "A sales surface instead of a template",
    angle: [
      {
        usual: "A template with the copy poured in",
        ours: "A site built around the offer and the buyer's questions: what they search, compare, and get stuck on",
      },
      {
        usual: "A contact form that lands in an inbox",
        ours: "An enquiry path that, if you want, runs straight into the CRM",
      },
    ],
    cta: {
      question: "Where is your client's site losing buyers right now?",
      body: "Send us the URL and what they sell; we'll tell you where it leaks.",
    },
  },
  ads: {
    kicker: "Not reach. Enquiries.",
    headline: "Advertising that ends in a number",
    facts: [
      { value: "Weekly", label: "report on what brought enquiries" },
      { value: "End to end", label: "tracked from click to enquiry" },
      { value: "Stop", label: "for any channel that brings no enquiries" },
    ],
    angleTitle: "We count enquiries, not impressions",
    angle: [
      { usual: "Reports on reach and impressions", ours: "Reports on how many enquiries the clicks turned into" },
      { usual: "Every campaign sent to the home page", ours: "A landing page per campaign, one message, one action" },
    ],
    cta: {
      question: "Do you know how many enquiries last month's ad budget brought in?",
      body: "If not, it's the measurement, not you. Tell us where you advertise and we'll tell you what to track.",
    },
  },
  software: {
    kicker: "Work that runs itself",
    headline: "What's done by hand today runs on its own tomorrow",
    facts: [
      { value: "In writing", label: "which processes are worth automating, and which aren't" },
      { value: "Logged", label: "every run, searchable later" },
      { value: "Alerted", label: "when something didn't run, no silent stops" },
    ],
    angleTitle: "We don't sell a new system. We connect the ones you have",
    angle: [
      {
        usual: "Someone copies orders into invoicing every day",
        ours: "Order, invoice, confirmation and stock sheet in one step, no manual copying",
      },
      {
        usual: "An automation stops silently and nobody notices for weeks",
        ours: "Every run logged, failures alerted, missed items recoverable",
      },
    ],
    cta: {
      question: "What does someone on the team copy by hand every day?",
      body: "One sentence is enough: from where, to where, how often. We'll tell you whether it's worth automating.",
    },
  },
  ai: {
    kicker: "Answers at night. Never quotes a price.",
    headline: "An assistant that knows when to hand over to a person",
    facts: [
      { value: "24/7", label: "answers to the simple questions" },
      { value: "A person", label: "takes over serious questions, prices and deadlines" },
      { value: "Documented", label: "which data goes where" },
    ],
    angleTitle: "Not a miracle. A well-trained first line",
    angle: [
      {
        usual: "A generic bot that confidently answers anything",
        ours: "An assistant tuned to your content, answering from what you actually offer",
      },
      { usual: "The bot promises a price you can't keep", ours: "The chat informs, it doesn't quote. A person names price and deadline" },
    ],
    cta: {
      question: "Which question do you answer the same way every day?",
      body: "Send us the three most common ones; we'll tell you which an assistant can handle and which need a person.",
    },
  },
  video: {
    kicker: "One identity, in motion too",
    headline: "Video that says what your site says",
    facts: [
      { value: "One", label: "point of contact, even when our partner shoots" },
      { value: "One identity", label: "site and video designed together" },
      { value: "Captioned", label: "so it works on a phone with the sound off" },
    ],
    angleTitle: "Not a separate film. Part of the sale",
    angle: [
      {
        usual: "Video from another team, in another voice and palette",
        ours: "Made in the same visual identity as the website",
      },
      {
        usual: "A nice film gathering dust on a video platform",
        ours: "Formats where buyers decide: product page, hero, short social cut",
      },
    ],
    cta: {
      question: "What should a buyer see before they pick up the phone?",
      body: "Tell us what you get asked most often; we'll tell you which format answers it best.",
    },
  },
  ops: {
    kicker: "Launch is the starting line",
    headline: "Launch isn't the end, it's the start",
    facts: [
      { value: "First", label: "we know about a fault before the customer does" },
      { value: "Monthly", label: "development hours, no quote for every fix" },
      { value: "One person", label: "who knows the project" },
    ],
    angleTitle: "Where most agencies say goodbye, we stay",
    angle: [
      { usual: "Ticket, number, waiting", ours: "One accountable person who knows the project" },
      { usual: "A customer reports the form is broken", ours: "Monitoring and alerting: we know first" },
    ],
    cta: {
      question: "Who tells you if the site goes down tomorrow morning?",
      body: "If the answer is a customer, let's talk. Send us the URL and who runs it today.",
    },
  },
  access: {
    kicker: "Buyers you've been shutting out",
    headline: "Some people can't use your site",
    facts: [
      { value: "WCAG", label: "based technical assessment" },
      { value: "In the code", label: "fixed at the source, not with an overlay widget" },
      { value: "In writing", label: "what we found and what changed" },
    ],
    angleTitle: "Not a legal burden. More buyers",
    angle: [
      { usual: "An \"accessibility\" button in the corner", ours: "Fixes in the source: contrast, focus, labels, structure" },
      {
        usual: "A \"compliant\" badge",
        ours: "Technical assessment and fixes. A lawyer, not us, speaks to compliance",
      },
    ],
    cta: {
      question: "Could you get through checkout without a mouse?",
      body: "Try it now with Tab and Enter. If you get stuck, so do some of your buyers.",
    },
  },
  pulse: {
    kicker: "One letter a month, not a dashboard",
    headline: "One email a month on how the internet sees you",
    facts: [
      { value: "Monthly", label: "one letter with concrete suggestions" },
      { value: "Early", label: "warning, before a customer notices" },
      { value: "A lawyer", label: "partner reviews the legal module's findings" },
    ],
    angleTitle: "We don't send scores. We send next steps",
    angle: [
      { usual: "A scored report nobody reads", ours: "A letter on what changed and what's worth doing" },
      { usual: "Automatic replies to reviews in your name", ours: "A suggested reply; you press send" },
    ],
    cta: {
      question: "When did someone last check that the contact form works?",
      body: "If you don't know, that's the answer. Send us the URL and we'll tell you what Pulse would watch.",
    },
  },
  it: {
    kicker: "IT that isn't your problem",
    headline: "Office IT you don't have to think about",
    facts: [
      { value: "15 years", label: "our partner's experience running office systems" },
      { value: "In writing", label: "what we found and what we recommend" },
      { value: "Remote", label: "we connect in, no waiting for a site visit" },
    ],
    angleTitle: "Not \"a colleague will look at it\". An accountable sysadmin",
    angle: [
      {
        usual: "\"Our colleague knows computers\", on top of their own job",
        ours: "A dedicated sysadmin partner, starting with an assessment",
      },
      { usual: "A departed employee's account, still active", ours: "Accounts and access kept in order" },
    ],
    cta: {
      question: "If someone leaves tomorrow, do you know what they had access to?",
      body: "If you're not sure, that's exactly where the assessment starts.",
    },
  },
  audit: {
    kicker: "We look first. Then we propose.",
    headline: "We show where the site is losing customers right now",
    facts: [
      { value: "Outside-in", label: "no access needed" },
      { value: "In writing", label: "a report with a prioritised to-do list" },
      { value: "Clickable", label: "prototype built on the real catalogue" },
    ],
    angleTitle: "Not a quote with a screenshot. A plan you can click through",
    angle: [
      {
        usual: "An auto-generated score list nobody reads to the end",
        ours: "A report written by a person about the business, with prioritised fixes",
      },
      {
        usual: "\"You'll see it when it's done\"",
        ours: "A clickable prototype with the real catalogue, before anyone decides",
      },
    ],
    cta: {
      question: "What would a stranger see on your client's site in the first ten seconds?",
      body: "That's where we start. Send us the URL and one sentence on what they sell and to whom.",
    },
  },
};

// Az átvilágítás-blokk szövege az /en/services oldalon (a többi blokk szövege
// a messages/en.json Services kulcsai alatt van).
export const AUDIT_EN = {
  label: "Audit and proposal",
  paragraphs: [
    "The site is losing buyers right now: it loads slowly, Google doesn't understand it, AI doesn't quote it, the price isn't where people look, and the legal pages say things that aren't true. Every site we've audited so far had some of these.",
    "The audit is done from the outside, without access. Then, if wanted, comes the design and system proposal: not just a picture of a new site, but a plan for the whole sales ecosystem, with a clickable prototype built on the real catalogue. White-label for agencies if you prefer.",
  ],
  items: [
    "Outside-in audit: speed, SEO and AEO, pricing, usability, privacy, security headers",
    "What already works, so it doesn't get thrown away",
    "Prioritised to-do list",
    "Design proposal: type, palette with contrast checks, page designs, mobile",
    "System proposal: where enquiries come from, where they land, what gets measured",
    "Clickable prototype with the real catalogue",
  ],
};
