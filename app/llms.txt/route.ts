import { getSortedPostsData } from "@/lib/posts";
import { getSortedEnPostsData } from "@/lib/posts-en";
import { ORGANIZATION } from "@/lib/jsonld";
import { ARZENAL_SECTIONS, ARZENAL_SECTIONS_EN } from "@/lib/site-links";
import { SITE_URL } from "@/lib/site";

// llms.txt (llmstxt.org): rövid, markdown nyelvű térkép az oldalról a nyelvi
// modelleknek. Nem hivatalos szabvány, és nem garantálja, hogy egy AI-rendszer
// olvassa — de olcsó, és ugyanazokból a forrásokból áll össze, mint a
// sitemap és a JSON-LD, így nem csúszhat el tőlük. A cikkek ütemezése miatt
// naponta frissül, ugyanúgy, mint a sitemap.
export const revalidate = 86400;

export function GET() {
  const huPosts = getSortedPostsData();
  const enPosts = getSortedEnPostsData();
  const { address } = ORGANIZATION;

  const lines = [
    `# ${ORGANIZATION.alternateName}`,
    "",
    `> ${ORGANIZATION.name} (márkanév: ${ORGANIZATION.alternateName}): weboldalak és webshopok fejlesztése és üzemeltetése Next.js alapokon, B2B cégeknek, Magyarországon. Kapcsolódó szolgáltatások: performance marketing, AI-integráció, videó, akadálymentesítés, weboldal-figyelés, irodai IT-üzemeltetés, valamint egyedi szoftverfejlesztés és üzleti folyamat-automatizáció. A videógyártást és az irodai IT-üzemeltetést visszatérő partnerekkel végezzük, egy kapcsolattartóval.`,
    "",
    `Székhely: ${address.postalCode} ${address.addressLocality}, ${address.streetAddress} · E-mail: ${ORGANIZATION.email} · Telefon: ${ORGANIZATION.telephone} · Adószám: ${ORGANIZATION.taxID}`,
    "",
    "## Fő oldalak",
    "",
    `- [Főoldal](${SITE_URL}/): ki vagyunk és mit csinálunk`,
    `- [Szolgáltatások](${SITE_URL}/arzenal): a kilenc szolgáltatási terület részletesen`,
    `- [Csomagok](${SITE_URL}/architektura): együttműködési csomagok`,
    `- [SEO és AEO](${SITE_URL}/seo): keresőoptimalizálás és AI-láthatóság`,
    `- [Rólunk](${SITE_URL}/szindikatus)`,
    `- [Kapcsolat](${SITE_URL}/init): felmérés kérése`,
    "",
    "## Szolgáltatások",
    "",
    ...ARZENAL_SECTIONS.map((s) => `- [${s.name}](${SITE_URL}/arzenal#${s.id}): ${s.headline}`),
    "",
    "## Cikkek",
    "",
    ...huPosts.map(
      (p) => `- [${p.title}](${SITE_URL}/hirek/${p.id})${p.excerpt ? `: ${p.excerpt}` : ""}`,
    ),
    "",
    "## English",
    "",
    `- [Home](${SITE_URL}/en)`,
    `- [Services](${SITE_URL}/en/services): ${ARZENAL_SECTIONS_EN.map((s) => s.name).join(", ")}`,
    `- [SEO and AEO](${SITE_URL}/en/seo)`,
    `- [Contact](${SITE_URL}/en/contact)`,
    ...enPosts.map(
      (p) => `- [${p.title}](${SITE_URL}/en/writing/${p.id})${p.excerpt ? `: ${p.excerpt}` : ""}`,
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
