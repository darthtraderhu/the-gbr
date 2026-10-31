import type { StackProofItem, StackProofSource } from "@/app/components/StackProof";

// Next.js-t használó nemzetközi márkák — csak olyan, ami a forrásban név
// szerint szerepel (nextjs.org/showcase, megtekintve 2026. 10. 31.; Vercel
// Elkjøp-esettanulmány). A showcase-en az OpenAI és a Claude is szerepel, de
// ügyfélnek szóló szövegben AI-eszközt nem nevezünk meg, ezért itt nincsenek.
// Ha a Showcase változik, a listát és a dátumot együtt frissítsd.

export const NEXTJS_CHECKED_HU = "megtekintve 2026. 10. 31.";
export const NEXTJS_CHECKED_EN = "checked 31 Oct 2026";

// Rövid névsor a főoldali márkafalhoz.
export const NEXTJS_BRANDS = ["Nike", "Sonos", "Netflix Jobs", "NerdWallet", "Zapier", "Solana"];

export const NEXTJS_ITEMS_HU: StackProofItem[] = [
  {
    name: "Nike",
    tag: "Webáruház",
    body: "A Next.js hivatalos bemutatóoldalán, a webáruházak (Composable Commerce) között.",
  },
  { name: "Sonos", tag: "Webáruház", body: "Ugyanott, ugyanebben a kategóriában." },
  { name: "Netflix Jobs", tag: "Webalkalmazás", body: "A Netflix karrieroldala, a webalkalmazások között." },
  { name: "NerdWallet", tag: "Webalkalmazás", body: "Amerikai pénzügyi összehasonlító oldal, szintén a webalkalmazások között." },
  { name: "Zapier", tag: "Platform", body: "Az automatizációs szolgáltatás, a platformfejlesztés kategóriában." },
  {
    name: "Elkjøp",
    tag: "Esettanulmány",
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
  { name: "Netflix Jobs", tag: "Web app", body: "Netflix's careers site, listed under web apps." },
  { name: "NerdWallet", tag: "Web app", body: "US personal-finance comparison site, also under web apps." },
  { name: "Zapier", tag: "Platform", body: "The automation service, under platform engineering." },
  {
    name: "Elkjøp",
    tag: "Case study",
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
