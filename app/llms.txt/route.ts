import { getSortedPostsData } from "@/lib/posts";
import { getSortedEnPostsData } from "@/lib/posts-en";
import { ORGANIZATION } from "@/lib/jsonld";
import { ARZENAL_SECTIONS, ARZENAL_SECTIONS_EN } from "@/lib/site-links";
import { SITE_URL } from "@/lib/site";
import { GYORS_INDULAS_PATH, TERMEKEK, formatFt, termekPath } from "@/lib/gyors-indulas";

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
    `> ${ORGANIZATION.name} (márkanév: ${ORGANIZATION.alternateName}): értékesítési rendszer-partner műszaki, ipari és szolgáltató B2B cégeknek Magyarországon, akik egyedi ajánlatból élnek. Három pillér: átvilágítás (hol vész el a megkeresés és az ajánlat), a cégre szabott értékesítési rendszer (a megkereséstől a szerződésig és utána), valamint a felület: weboldal és webshop Next.js alapokon, ami a rendszerbe hozza a megkeresést. Kapcsolódó szolgáltatások: performance marketing, AI-integráció, videó, akadálymentesítés, weboldal-figyelés, irodai IT-üzemeltetés, valamint egyedi szoftverfejlesztés és üzleti folyamat-automatizáció. Minden szolgáltatásnál egy kapcsolattartó.`,
    "",
    `Székhely: ${address.postalCode} ${address.addressLocality}, ${address.streetAddress} · E-mail: ${ORGANIZATION.email} · Telefon: ${ORGANIZATION.telephone} · Adószám: ${ORGANIZATION.taxID}`,
    "",
    "## Fő oldalak",
    "",
    `- [Főoldal](${SITE_URL}/): ki vagyunk és mit csinálunk`,
    `- [Szolgáltatások](${SITE_URL}/arzenal): a tíz szolgáltatás részletesen, három pillér alá sorolva`,
    `- [Csomagok](${SITE_URL}/architektura): együttműködési csomagok`,
    `- [Rád szabott rendszer](${SITE_URL}/rendszer): értékesítési és működési rendszer a cégre szabva, a megkereséstől a meglévő ügyfelek gondozásáig, minden oldalon edzővel, ami végigvezet a munkán`,
    `- [SEO és AEO](${SITE_URL}/seo): keresőoptimalizálás és AI-láthatóság`,
    `- [Rólunk](${SITE_URL}/szindikatus)`,
    `- [Kapcsolat](${SITE_URL}/init): felmérés kérése`,
    "",
    "## Szolgáltatások",
    "",
    ...ARZENAL_SECTIONS.map((s) => `- [${s.name}](${SITE_URL}${s.href}): ${s.headline}`),
    "",
    "## Fix áras első lépések",
    "",
    `Kicsi, rögzített tartalmú munkák pontos nettó árral és határidővel (${SITE_URL}${GYORS_INDULAS_PATH}). Díjbekérővel, átutalással, előfizetés nélkül.`,
    "",
    ...TERMEKEK.map(
      (t) =>
        `- [${t.name}](${SITE_URL}${termekPath(t.id)}): ${formatFt(t.arNetto)} + ÁFA, ${t.hatarido}. ${t.summary}`,
    ),
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
    `- [Services](${SITE_URL}/en/services)`,
    ...ARZENAL_SECTIONS_EN.map((s) => `  - [${s.name}](${SITE_URL}${s.href})`),
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
