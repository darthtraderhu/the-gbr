// A videó szövegei nyelvenként. Mindkét változat az adott nyelvű főoldal
// meglévő szövegeiből jön (HU: app/(hu)/page.tsx, EN: messages/en.json Home.*)
// — új állítást a videó nem tesz.
export type VideoCopy = {
  header: string;
  openLine: string;
  quoteEyebrow: string;
  quote: [string, string];
  twoEyebrow: string;
  twoHeadline: string;
  rows: { lab: string; title: string; desc: string }[];
  stepsEyebrow: string;
  steps: { title: string; text: string }[];
  chapters: [string, string, string, string];
  pledge: [string, string];
  cta: string;
  ctaUrl: string;
  ctaNote: string;
};

export const HU: VideoCopy = {
  header: "THE GBR · Hogyan dolgozunk",
  openLine: "Fejlesztés és üzemeltetés B2B cégeknek",
  quoteEyebrow: "A cég mögött",
  quote: ["A legjobb kampány sem segít,", "ha a rendszer mögötte nem működik."],
  twoEyebrow: "Amit csinálunk",
  twoHeadline: "Két dolog, nem tizenkettő",
  rows: [
    {
      lab: "Develop",
      title: "Megépítjük",
      desc: "Weboldalak és webshopok Next.js alapon, a mérnöki részletekkel együtt.",
    },
    {
      lab: "Manage",
      title: "És visszük tovább",
      desc: "Az átadás nem a vége. Üzemeltetés, monitoring, folyamatos fejlesztés.",
    },
  ],
  stepsEyebrow: "Folyamat · Nincs meglepetés a végén",
  steps: [
    {
      title: "Felmérés",
      text: "Megnézzük, mi van most — kód, adatok, számok. Nem tippelünk. Ennek a végén tudod, mibe kerül és mennyi idő.",
    },
    {
      title: "Terv és keret",
      text: "Fix hatókör, fix árazás, írásos szerződés — szellemi tulajdonnal és adatkezeléssel együtt. Nem ad hoc.",
    },
    {
      title: "Építés szakaszokban",
      text: "Kéthetente látható eredmény. Élő rendszernél fokozatos átállás — a bolt nem áll le.",
    },
    {
      title: "Átadás és üzemeltetés",
      text: "Dokumentáció, monitoring, riasztás. Innentől jön a „manage” rész — ha kéred.",
    },
  ],
  chapters: ["Elv", "Két dolog", "Folyamat", "Kapcsolat"],
  pledge: ["Minden szakasz végén van valami", ", amit meg tudsz nézni."],
  cta: "Pitcheld el a projekted",
  ctaUrl: "thegbr.eu/init",
  ctaNote: "Válasz 2 munkanapon belül",
};

export const EN: VideoCopy = {
  header: "THE GBR · How we work",
  openLine: "Development partner for agencies",
  quoteEyebrow: "Why it matters",
  quote: ["Anyone can ship.", "Fewer can run it."],
  twoEyebrow: "What we do",
  twoHeadline: "Two things, not twelve",
  rows: [
    {
      lab: "Develop",
      title: "We build it",
      desc: "Websites and stores on Next.js, with the engineering underneath.",
    },
    {
      lab: "Manage",
      title: "And we keep it running",
      desc: "Launch isn't the end. Monitoring, alerting, ongoing development.",
    },
  ],
  stepsEyebrow: "For agencies · Your overflow, handled properly",
  steps: [
    {
      title: "EU-based, EU-billed",
      text: "Hungarian company, EU VAT, invoicing inside the single market. GDPR is the law we already operate under.",
    },
    {
      title: "Overlapping hours",
      text: "Central European Time. The same working day as our European partners.",
    },
    {
      title: "Rates that make the maths work",
      text: "Central European rates with Western European engineering standards. No recruitment, no onboarding, no bench.",
    },
    {
      title: "One developer, not a rotating pool",
      text: "The same person on your project from start to finish. No handovers, no re-explaining.",
    },
  ],
  chapters: ["Principle", "Two things", "For agencies", "Contact"],
  pledge: ["We work as your team,", " not next to it."],
  cta: "Start a conversation",
  ctaUrl: "thegbr.eu/en/contact",
  ctaNote: "Reply within 2 business days",
};
