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
// szekciócím; a főoldali szolgáltatás-index (ServiceIndex) ezt mutatja.
export const ARZENAL_SECTIONS = [
  { id: "web", n: "01", name: "Web és webshop", headline: "Weboldal és webshop, ami mérhetően gyors" },
  { id: "ads", n: "02", name: "Performance marketing", headline: "Hirdetés, aminek a végén van egy szám" },
  { id: "software", n: "03", name: "Egyedi szoftver és automatizáció", headline: "Ami ma kézzel megy, holnap magától" },
  { id: "ai", n: "04", name: "AI és chatbot", headline: "AI, ami a helyén van" },
  { id: "video", n: "05", name: "Videó és tartalom", headline: "A weboldal önmagában nem elég" },
  { id: "ops", n: "06", name: "Web-üzemeltetés és fejlesztés", headline: "Az átadás nem a vége" },
  { id: "access", n: "07", name: "Akadálymentesítés", headline: "Van, aki nem tudja használni az oldaladat" },
  { id: "pulzus", n: "08", name: "Pulzus", headline: "Havonta egy levél arról, hogyan lát téged az internet" },
  { id: "it", n: "09", name: "IT-üzemeltetés", headline: "Az irodai informatika, amire nem kell gondolnod" },
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
