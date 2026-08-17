import { SITE_URL } from "./site";

// A cég/márka egyetlen forrása a szervezeti JSON-LD-hez. Az impresszum.md és
// adatkezeles.md dokumentumokkal egyező adatok — ha azok változnak, ez is
// frissítendő.
export const ORGANIZATION = {
  "@type": "Organization" as const,
  name: "GBR Marketing Solutions Kft.",
  alternateName: "THE GBR",
  url: SITE_URL,
  // Nincs külön logó-fájl a projektben — az egyetlen létező márkás,
  // megfelelő méretű képi elem az OG-kép, ez a legjobb elérhető helyettes,
  // amíg nincs dedikált logo.svg/png.
  logo: `${SITE_URL}/opengraph-image.jpg`,
  email: "gabor@thegbr.eu",
  telephone: "+36705139838",
  address: {
    "@type": "PostalAddress" as const,
    streetAddress: "Kossuth út 37.",
    addressLocality: "Tar",
    postalCode: "3073",
    addressCountry: "HU",
  },
  taxID: "28814706-2-12",
  vatID: "HU28814706",
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    ...ORGANIZATION,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "THE GBR",
    url: SITE_URL,
    inLanguage: "hu-HU",
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
    author: ORGANIZATION,
    publisher: ORGANIZATION,
    inLanguage: "hu-HU",
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
