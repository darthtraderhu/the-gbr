import type { StackProofItem, StackProofSource } from "@/app/components/StackProof";

// Next.js-t használó nemzetközi márkák — csak olyan, ami a forrásban név
// szerint szerepel (nextjs.org/showcase, megtekintve 2026. 11. 12.; Vercel
// Elkjøp-esettanulmány). A PlayStation Competition Center a showcase-en
// szerepel, de az oldal azóta megszűnt (a PlayStation Tournaments váltotta),
// ezért nem tesszük ki. A showcase-en az OpenAI és a Claude is szerepel, de
// ügyfélnek szóló szövegben AI-eszközt nem nevezünk meg, ezért itt nincsenek.
// Ha a Showcase változik, a listát és a dátumot együtt frissítsd.

export const NEXTJS_CHECKED_HU = "megtekintve 2026. 11. 12.";
export const NEXTJS_CHECKED_EN = "checked 12 Nov 2026";

// Rövid névsor a főoldali márkafalhoz.
export const NEXTJS_BRANDS = [
  "Nike",
  "Under Armour",
  "Hilton",
  "Sonos",
  "HBO Max",
  "Hulu",
  "Netflix Jobs",
  "TED",
  "NVIDIA",
  "NerdWallet",
  "Zapier",
  "Solana",
];

export const NEXTJS_ITEMS_HU: StackProofItem[] = [
  {
    name: "Nike",
    tag: "Webáruház",
    body: "A Next.js hivatalos bemutatóoldalán, a webáruházak (Composable Commerce) között.",
  },
  { name: "Sonos", tag: "Webáruház", body: "Ugyanott, ugyanebben a kategóriában." },
  { name: "Under Armour", tag: "Webáruház", body: "A sportruházati márka webáruháza, szintén a webáruházak között." },
  { name: "Hilton", tag: "Webáruház", body: "A szállodalánc foglalási oldala, szintén a webáruházak között." },
  { name: "HBO Max", tag: "Webalkalmazás", body: "A streamingszolgáltatás, a webalkalmazások között." },
  { name: "Hulu", tag: "Streaming", body: "Amerikai streamingszolgáltatás, szintén a showcase-en." },
  { name: "TED", tag: "Média", body: "Az előadásairól ismert TED oldala, szintén a showcase-en." },
  { name: "NVIDIA", tag: "Fejlesztőknek", body: "Az NVIDIA NGC katalógusa: szoftverek és AI-modellek fejlesztőknek." },
  { name: "Solana", tag: "Webalkalmazás", body: "Blokklánc-platform, a webalkalmazások között." },
  { name: "Netflix Jobs", tag: "Webalkalmazás", body: "A Netflix karrieroldala, a webalkalmazások között." },
  { name: "NerdWallet", tag: "Webalkalmazás", body: "Amerikai pénzügyi összehasonlító oldal, szintén a webalkalmazások között." },
  { name: "Zapier", tag: "Platform", body: "Az automatizációs szolgáltatás, a platformfejlesztés kategóriában." },
  {
    name: "Elkjøp",
    tag: "Esettanulmány",
    wide: true,
    body: "Északi elektronikai kiskereskedő, Angularról állt át. A Vercel szerint a betöltés (LCP) 50%-kal, a kattintásra adott válasz (INP) 60%-kal javult, a kiadási ciklus 7 hétről 1 napra rövidült. Ezek a Vercel számai, nem a mi mérésünk.",
  },
];

export const NEXTJS_ITEMS_EN: StackProofItem[] = [
  {
    name: "Nike",
    tag: "Commerce",
    body: "Listed on the official Next.js showcase under Composable Commerce.",
  },
  { name: "Sonos", tag: "Commerce", body: "Same page, same category." },
  { name: "Under Armour", tag: "Commerce", body: "The sportswear brand's online store, also under Composable Commerce." },
  { name: "Hilton", tag: "Commerce", body: "The hotel group's booking site, same category." },
  { name: "HBO Max", tag: "Web app", body: "The streaming service, listed under web apps." },
  { name: "Hulu", tag: "Streaming", body: "US streaming service, also on the showcase." },
  { name: "TED", tag: "Media", body: "The home of TED Talks, also on the showcase." },
  { name: "NVIDIA", tag: "Developers", body: "NVIDIA's NGC Catalog of software and AI models for developers." },
  { name: "Solana", tag: "Web app", body: "Blockchain platform, listed under web apps." },
  { name: "Netflix Jobs", tag: "Web app", body: "Netflix's careers site, listed under web apps." },
  { name: "NerdWallet", tag: "Web app", body: "US personal-finance comparison site, also under web apps." },
  { name: "Zapier", tag: "Platform", body: "The automation service, under platform engineering." },
  {
    name: "Elkjøp",
    tag: "Case study",
    wide: true,
    body: "Nordic electronics retailer that moved from Angular. Vercel reports 50% better LCP, 60% better INP, and a release cycle cut from 7 weeks to 1 day. These are Vercel's numbers, not our measurement.",
  },
];

export const NEXTJS_SOURCES_HU: StackProofSource[] = [
  { label: "nextjs.org/showcase", href: "https://nextjs.org/showcase" },
  {
    label: "Vercel: Elkjøp-esettanulmány",
    href: "https://vercel.com/customers/elkjops-digital-transformation-with-next-js-and-vercel",
  },
  { label: "react.dev", href: "https://react.dev/" },
];

export const NEXTJS_SOURCES_EN: StackProofSource[] = [
  { label: "nextjs.org/showcase", href: "https://nextjs.org/showcase" },
  {
    label: "Vercel: Elkjøp case study",
    href: "https://vercel.com/customers/elkjops-digital-transformation-with-next-js-and-vercel",
  },
  { label: "react.dev", href: "https://react.dev/" },
];
