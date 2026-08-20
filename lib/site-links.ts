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
