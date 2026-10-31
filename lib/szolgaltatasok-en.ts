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
  },
};
