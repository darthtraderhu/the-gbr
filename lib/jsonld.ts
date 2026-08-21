import { SITE_URL } from "./site";

// A cég/márka egyetlen forrása a szervezeti JSON-LD-hez. Az impresszum.md és
// adatkezeles.md dokumentumokkal egyező adatok — ha azok változnak, ez is
// frissítendő.
export const ORGANIZATION = {
  "@type": "Organization" as const,
  name: "GBR Marketing Solutions Kft.",
  alternateName: "THE GBR",
  url: SITE_URL,
  // A logo a márkajel (public/logo-jel.png), az image a reprezentatív
  // vizuál (OG-kép) — a Google Rich Results ezt a két mezőt külön kéri,
  // ezért nem ugyanazt a fájlt adjuk mindkettőre.
  logo: `${SITE_URL}/logo-jel.png`,
  image: `${SITE_URL}/opengraph-image.jpg`,
  email: "gabor@thegbr.eu",
  telephone: "+36705139838",
  address: {
    "@type": "PostalAddress" as const,
    streetAddress: "Kossuth út 37.",
    addressLocality: "Tar",
    addressRegion: "Nógrád",
    postalCode: "3073",
    addressCountry: "HU",
  },
  // Település-szintű koordináták (OpenStreetMap Nominatim, Tar község
  // középpontja) — a pontos utcaszintű cím nincs benne az OSM adatbázisban,
  // ezért ez közelítés, nem az épület pontos helye.
  geo: {
    "@type": "GeoCoordinates" as const,
    latitude: 47.9505386,
    longitude: 19.7441779,
  },
  taxID: "28814706-2-12",
  vatID: "HU28814706",
};

// A hét /arzenal-szolgáltatás területe — az AEO-cél, hogy az AI-keresők
// entitásként kössék a céghez ezeket a témákat (ld. app/arzenal/page.tsx
// INDEX_ITEMS-szel egyező sorrend).
export const KNOWS_ABOUT = [
  "Weboldal- és webshopfejlesztés",
  "Performance marketing (Google és Meta hirdetés)",
  "AI-integráció és chatbot fejlesztés",
  "Videó- és tartalomgyártás",
  "Weboldal-üzemeltetés és folyamatos fejlesztés",
  "Digitális akadálymentesítés",
  "Weboldal- és online megjelenés figyelése",
];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    ...ORGANIZATION,
    knowsAbout: KNOWS_ABOUT,
  };
}

// Az /arzenal hét szolgáltatás-blokkjának Service sémája — provider mindig
// az Organization. A description egész mondat, nem kulcsszóhalmaz, hogy
// az AI-keresők idézhető kontextust kapjanak (AEO).
export function serviceSchema(params: {
  name: string;
  description: string;
  url: string;
  inLanguage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    url: params.url,
    inLanguage: params.inLanguage ?? "hu-HU",
    provider: ORGANIZATION,
  };
}

// A /architektura csomagjaihoz — szándékosan nincs price/priceSpecification
// mező, mert nincs fix árlista (ld. AGENTS.md: nem írunk ki eredményt vagy
// árat, amit nem tudunk tartani). Az árazási logikát a description mondatba
// írjuk bele, szövegesen.
export function offerSchema(params: {
  name: string;
  description: string;
  url: string;
  inLanguage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: params.name,
    description: params.description,
    url: params.url,
    inLanguage: params.inLanguage ?? "hu-HU",
    seller: ORGANIZATION,
  };
}

// A főoldalra: az Organization ugyanazon valós adataival (cím, geo,
// elérhetőség), de ProfessionalService típussal — szándékosan nyitvatartás
// (openingHoursSpecification) nélkül, mert az oldal nem fizikai
// ügyfélfogadásról szól.
export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    ...ORGANIZATION,
    "@type": "ProfessionalService" as const,
    knowsAbout: KNOWS_ABOUT,
  };
}

// Csak ott rendereljük, ahol a cikk ténylegesen egy konkrét szoftverről
// szól (ld. posts/miert-epit-sajat-termeket.md — Gimbal). A cikkben tényként
// szereplő adatokra szorítkozik: zárt béta, ingyenes, pénzügyi kategória.
export function softwareApplicationSchema(params: {
  name: string;
  description: string;
  url: string;
  inLanguage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: params.name,
    description: params.description,
    url: params.url,
    inLanguage: params.inLanguage ?? "hu-HU",
    applicationCategory: "FinanceApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "HUF",
      description: "Zárt béta, ingyenes hozzáféréssel.",
    },
  };
}

// A cikkek szerzője — a főoldal "A cég mögött" idézetéhez kötött, ott
// már publikált név (ld. app/page.tsx: "Tóth Gábor · Sales & Management").
// Nem az impresszum "Képviselő" mezője — az a kft. bejegyzett képviselője,
// más szerep, ld. content/legal/impresszum.md.
export const AUTHOR = {
  "@type": "Person" as const,
  name: "Tóth Gábor",
  jobTitle: "Sales & Management",
  worksFor: ORGANIZATION,
  url: SITE_URL,
};

export function websiteSchema(opts?: { locale?: "hu" | "en" }) {
  const locale = opts?.locale ?? "hu";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "THE GBR",
    url: locale === "en" ? `${SITE_URL}/en` : SITE_URL,
    inLanguage: locale === "en" ? "en" : "hu-HU",
    publisher: ORGANIZATION,
  };
}

export function blogPostingSchema(params: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
  inLanguage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.headline,
    description: params.description,
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    url: params.url,
    ...(params.image ? { image: params.image } : {}),
    author: AUTHOR,
    publisher: ORGANIZATION,
    inLanguage: params.inLanguage ?? "hu-HU",
  };
}

export function faqPageSchema(
  items: { question: string; answer: string }[],
  opts?: { inLanguage?: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(opts?.inLanguage ? { inLanguage: opts.inLanguage } : {}),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
