import {
  ACCESS_SERVICE,
  ADS_SERVICE,
  AI_SERVICE,
  IT_SERVICE,
  OPS_SERVICE,
  PULZUS_SERVICE,
  SOFTWARE_SERVICE,
  VIDEO_SERVICE,
  WEB_SERVICE,
} from "./szolgaltatasok";

// Megosztott navigációs adatok — a Navbar (asztali lenyíló + mobil Menü
// overlay) és a Footer ugyanabból a forrásból dolgozik, hogy ne
// csúszhasson szét a két hely.
export const MAIN_NAV_ITEMS = [
  { label: "Szolgáltatások", href: "/arzenal" },
  { label: "Csomagok", href: "/architektura" },
  { label: "SEO", href: "/seo" },
  { label: "Rólunk", href: "/szindikatus" },
  { label: "Írások", href: "/hirek" },
];

// Az /arzenal kilenc szolgáltatás-szekciójának azonosítója — az ott futó
// INDEX_ITEMS-szel egyezik (app/arzenal/page.tsx). A headline az ottani
// szekciócím; a főoldali szolgáltatás-index (ServiceIndex) ezt mutatja, és a
// href-en át a szolgáltatás saját aloldalára visz.
export const ARZENAL_SECTIONS = [
  { id: "web", n: "01", name: "Web és webshop", headline: "Weboldal és webshop, ami mérhetően gyors", href: WEB_SERVICE.path },
  { id: "ads", n: "02", name: "Performance marketing", headline: "Hirdetés, aminek a végén van egy szám", href: ADS_SERVICE.path },
  { id: "software", n: "03", name: "Egyedi szoftver és automatizáció", headline: "Ami ma kézzel megy, holnap magától", href: SOFTWARE_SERVICE.path },
  { id: "ai", n: "04", name: "AI és chatbot", headline: "AI, ami a helyén van", href: AI_SERVICE.path },
  { id: "video", n: "05", name: "Videó és tartalom", headline: "A weboldal önmagában nem elég", href: VIDEO_SERVICE.path },
  { id: "ops", n: "06", name: "Web-üzemeltetés és fejlesztés", headline: "Az átadás nem a vége", href: OPS_SERVICE.path },
  { id: "access", n: "07", name: "Akadálymentesítés", headline: "Van, aki nem tudja használni az oldaladat", href: ACCESS_SERVICE.path },
  { id: "pulzus", n: "08", name: "Pulzus", headline: "Havonta egy levél arról, hogyan lát téged az internet", href: PULZUS_SERVICE.path },
  { id: "it", n: "09", name: "IT-üzemeltetés", headline: "Az irodai informatika, amire nem kell gondolnod", href: IT_SERVICE.path },
];

export const LEGAL_LINKS = [
  { label: "Adatkezelés", href: "/adatkezeles" },
  { label: "Cookie-tájékoztató", href: "/cookie-tajekoztato" },
  { label: "AI-tájékoztató", href: "/ai-tajekoztato" },
  { label: "ÁSZF", href: "/szolgaltatasi-feltetelek" },
  { label: "Impresszum", href: "/impresszum" },
];

// Angol navigáció — saját angol slugok alatt (/en/...), a design/
// thegbr-english-copy.md szerint. A jogi oldalaknak nincs angol
// megfelelője: a LEGAL_LINKS (magyar URL-ek) közösek, csak a Footer/Navbar
// EN ága elé kerül egy angol nyelvű megjegyzés (ld. Footer.tsx).
export const MAIN_NAV_ITEMS_EN = [
  { label: "Services", href: "/en/services" },
  { label: "Engagement", href: "/en/engagement" },
  { label: "SEO", href: "/en/seo" },
  { label: "About", href: "/en/about" },
  { label: "Writing", href: "/en/writing" },
];

export const ARZENAL_SECTIONS_EN = [
  { id: "web", n: "01", name: "Web and commerce" },
  { id: "ads", n: "02", name: "Performance marketing" },
  { id: "software", n: "03", name: "Custom software and automation" },
  { id: "ai", n: "04", name: "AI integration" },
  { id: "video", n: "05", name: "Video and content" },
  { id: "ops", n: "06", name: "Web operations and maintenance" },
  { id: "access", n: "07", name: "Accessibility" },
  { id: "pulse", n: "08", name: "Pulse" },
  { id: "it", n: "09", name: "IT operations" },
];
