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
  AUDIT_PITCH,
  AUDIT_SERVICE,
  ACCESS_PITCH,
  ADS_PITCH,
  AI_PITCH,
  IT_PITCH,
  OPS_PITCH,
  PULZUS_PITCH,
  SOFTWARE_PITCH,
  VIDEO_PITCH,
  WEB_PITCH,
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

// Az /arzenal tíz szolgáltatás-szekciójának azonosítója — az ott futó
// INDEX_ITEMS-szel egyezik (app/arzenal/page.tsx). A headline a szolgáltatás
// értékesítési főcíme (lib/szolgaltatasok.ts *_PITCH); a főoldali szolgáltatás-index (ServiceIndex) ezt mutatja, és a
// href-en át a szolgáltatás saját aloldalára visz.
export const ARZENAL_SECTIONS = [
  { id: "web", n: "01", name: "Web és webshop", headline: WEB_PITCH.headline, href: WEB_SERVICE.path },
  { id: "ads", n: "02", name: "Performance marketing", headline: ADS_PITCH.headline, href: ADS_SERVICE.path },
  { id: "software", n: "03", name: "Egyedi szoftver és automatizáció", headline: SOFTWARE_PITCH.headline, href: SOFTWARE_SERVICE.path },
  { id: "ai", n: "04", name: "AI és chatbot", headline: AI_PITCH.headline, href: AI_SERVICE.path },
  { id: "video", n: "05", name: "Videó és tartalom", headline: VIDEO_PITCH.headline, href: VIDEO_SERVICE.path },
  { id: "ops", n: "06", name: "Web-üzemeltetés és fejlesztés", headline: OPS_PITCH.headline, href: OPS_SERVICE.path },
  { id: "access", n: "07", name: "Akadálymentesítés", headline: ACCESS_PITCH.headline, href: ACCESS_SERVICE.path },
  { id: "pulzus", n: "08", name: "Pulzus", headline: PULZUS_PITCH.headline, href: PULZUS_SERVICE.path },
  { id: "it", n: "09", name: "IT-üzemeltetés", headline: IT_PITCH.headline, href: IT_SERVICE.path },
  { id: "audit", n: "10", name: "Átvilágítás és ajánlás", headline: AUDIT_PITCH.headline, href: AUDIT_SERVICE.path },
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
  { id: "audit", n: "10", name: "Audit and proposal" },
];
