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

// Az /arzenal hét szolgáltatás-szekciójának azonosítója — az ott futó
// INDEX_ITEMS-szel egyezik (app/arzenal/page.tsx).
export const ARZENAL_SECTIONS = [
  { id: "web", n: "01", name: "Web és webshop" },
  { id: "ads", n: "02", name: "Performance marketing" },
  { id: "ai", n: "03", name: "AI és chatbot" },
  { id: "video", n: "04", name: "Videó és tartalom" },
  { id: "ops", n: "05", name: "Üzemeltetés és fejlesztés" },
  { id: "access", n: "06", name: "Akadálymentesítés" },
  { id: "pulzus", n: "07", name: "Pulzus" },
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
  { id: "ai", n: "03", name: "AI integration" },
  { id: "video", n: "04", name: "Video and content" },
  { id: "ops", n: "05", name: "Operations and maintenance" },
  { id: "access", n: "06", name: "Accessibility" },
  { id: "pulse", n: "07", name: "Pulse" },
];
