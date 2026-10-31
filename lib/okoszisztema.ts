// Az értékesítési ökoszisztéma öt szakasza — a főoldal, az /arzenal és
// minden szolgáltatás-aloldal ugyanebből rajzolja ki az ábrát, hogy látszódjon:
// a kilenc szolgáltatás nem kilenc külön termék, hanem egy rendszer részei.
// A szolgáltatás-azonosítók a lib/site-links.ts ARZENAL_SECTIONS id-jaival
// egyeznek (az EN oldalon a pulzus id-ja "pulse").

export type ServiceId =
  | "web"
  | "ads"
  | "software"
  | "ai"
  | "video"
  | "ops"
  | "access"
  | "pulzus"
  | "it"
  | "seo";

export type EcoStage = {
  n: string;
  name: string;
  body: string;
  links: { id: ServiceId; label: string; href: string }[];
};

export const ECO_STAGES_HU: EcoStage[] = [
  {
    n: "01",
    name: "Megtalálnak",
    body: "A vevő a Google-ben, egy AI-ban vagy egy hirdetésben találkozik veled először.",
    links: [
      { id: "seo", label: "SEO és AEO", href: "/seo" },
      { id: "ads", label: "Hirdetés", href: "/arzenal/hirdeteskezeles" },
      { id: "video", label: "Videó", href: "/arzenal/videogyartas" },
    ],
  },
  {
    n: "02",
    name: "Meggyőz",
    body: "Az oldal gyorsan betölt, érthetően mutatja a kínálatot, és mindenki tudja használni.",
    links: [
      { id: "web", label: "Weboldal és webshop", href: "/arzenal/weboldal-fejlesztes" },
      { id: "access", label: "Akadálymentesítés", href: "/arzenal/akadalymentesites" },
    ],
  },
  {
    n: "03",
    name: "Válaszol",
    body: "Éjjel is kap választ az egyszerű kérdésére, a komolyat ember veszi át.",
    links: [{ id: "ai", label: "AI és chatbot", href: "/arzenal/ai-chatbot" }],
  },
  {
    n: "04",
    name: "Nem vész el",
    body: "Minden megkeresés egy helyre fut be, felelőssel. Nem egy postafiókban alszik el.",
    links: [{ id: "software", label: "Automatizáció", href: "/arzenal/automatizacio" }],
  },
  {
    n: "05",
    name: "Működik és mér",
    body: "Figyeljük, javítjuk, és havonta leírjuk, mi változott. Az iroda gépei is mennek.",
    links: [
      { id: "ops", label: "Üzemeltetés", href: "/arzenal/weboldal-uzemeltetes" },
      { id: "pulzus", label: "Pulzus", href: "/arzenal/pulzus" },
      { id: "it", label: "Irodai IT", href: "/arzenal/it-uzemeltetes" },
    ],
  },
];

export const ECO_STAGES_EN: EcoStage[] = [
  {
    n: "01",
    name: "Found",
    body: "Buyers meet you first on Google, in an AI answer or in an ad.",
    links: [
      { id: "seo", label: "SEO and AEO", href: "/en/seo" },
      { id: "ads", label: "Advertising", href: "/en/services#ads" },
      { id: "video", label: "Video", href: "/en/services#video" },
    ],
  },
  {
    n: "02",
    name: "Convinced",
    body: "The site loads fast, shows the offer clearly, and works for everyone.",
    links: [
      { id: "web", label: "Web and commerce", href: "/en/services#web" },
      { id: "access", label: "Accessibility", href: "/en/services#access" },
    ],
  },
  {
    n: "03",
    name: "Answered",
    body: "Simple questions get an answer at night too; serious ones go to a person.",
    links: [{ id: "ai", label: "AI assistant", href: "/en/services#ai" }],
  },
  {
    n: "04",
    name: "Not lost",
    body: "Every enquiry lands in one place with an owner, not asleep in an inbox.",
    links: [{ id: "software", label: "Automation", href: "/en/services#software" }],
  },
  {
    n: "05",
    name: "Running and measured",
    body: "We monitor, fix, and write down monthly what changed. The office IT runs too.",
    links: [
      { id: "ops", label: "Operations", href: "/en/services#ops" },
      { id: "pulzus", label: "Pulse", href: "/en/services#pulse" },
      { id: "it", label: "Office IT", href: "/en/services#it" },
    ],
  },
];
