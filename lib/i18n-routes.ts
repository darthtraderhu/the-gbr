// Egyetlen forrás a magyar<->angol útvonal-párosításhoz — a nyelvváltó és a
// hreflang-hivatkozások ebből dolgoznak. A magyar oldalak a gyökéren,
// prefix nélkül futnak; az angol változatok saját, angol slug alatt
// (/en/...), nem a magyar slug megismétlésével (ld. design/thegbr-english-copy.md).
export const HU_TO_EN: Record<string, string> = {
  "/": "/en",
  "/arzenal": "/en/services",
  "/architektura": "/en/engagement",
  "/seo": "/en/seo",
  "/szindikatus": "/en/about",
  "/hirek": "/en/writing",
  "/init": "/en/contact",
};

export const EN_TO_HU: Record<string, string> = Object.fromEntries(
  Object.entries(HU_TO_EN).map(([hu, en]) => [en, hu])
);

// Csak ez a három cikk kapott angol fordítást (ld. a dokumentum "Writing"
// szakaszának ajánlása) — a többi cikknek nincs angol párja, és nem is
// jelenik meg az angol listában.
export const TRANSLATED_ARTICLES: Record<string, string> = {
  "pulzus-ot-masodperc": "five-seconds-nobody-knew",
  akadalymentesites: "what-makes-a-website-accessible",
  "miert-epit-sajat-termeket": "why-build-your-own-product",
};

export const ARTICLE_HU_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(TRANSLATED_ARTICLES).map(([hu, en]) => [en, hu])
);

// A nyelvváltóhoz: adott magyar útvonalhoz megkeresi az angol megfelelőt.
// Ha nincs ilyen (pl. jogi oldal, le nem fordított cikk), az angol
// főoldalra esik vissza.
export function getEnglishEquivalent(huPathname: string): string {
  if (huPathname in HU_TO_EN) return HU_TO_EN[huPathname];

  const articleMatch = huPathname.match(/^\/hirek\/([^/]+)$/);
  if (articleMatch && articleMatch[1] in TRANSLATED_ARTICLES) {
    return `/en/writing/${TRANSLATED_ARTICLES[articleMatch[1]]}`;
  }

  return "/en";
}

// Ugyanez fordítva: adott angol útvonalhoz a magyar megfelelő. Ha nincs
// (pl. le nem fordított cikk-slug), a magyar főoldalra esik vissza.
export function getHungarianEquivalent(enPathname: string): string {
  if (enPathname in EN_TO_HU) return EN_TO_HU[enPathname];

  const articleMatch = enPathname.match(/^\/en\/writing\/([^/]+)$/);
  if (articleMatch && articleMatch[1] in ARTICLE_HU_SLUG) {
    return `/hirek/${ARTICLE_HU_SLUG[articleMatch[1]]}`;
  }

  return "/";
}
