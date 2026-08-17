import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const legalDirectory = path.join(process.cwd(), "content/legal");

const HUN_DIACRITICS: Record<string, string> = {
  á: "a",
  é: "e",
  í: "i",
  ó: "o",
  ö: "o",
  ő: "o",
  ú: "u",
  ü: "u",
  ű: "u",
};

function slugify(text: string): string {
  const lower = text.toLowerCase();
  const ascii = lower
    .split("")
    .map((ch) => HUN_DIACRITICS[ch] ?? ch)
    .join("");
  return ascii.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export type LegalTocEntry = { id: string; number: string; title: string };

// A h2 elemek egy részének szövege a markdown forrásban már eleve
// "1. Cím" formában van (a content/legal/*.md-ben így írták) — ebből
// bontjuk szét a sorszámot és a címet, és tesszük horgonyozhatóvá.
// A szöveg nem változik, csak két külön helyre kerül (ld. AGENTS.md —
// ugyanez a minta fut a többi oldal számozott elemein is).
function injectHeadingAnchors(contentHtml: string): { html: string; toc: LegalTocEntry[] } {
  const toc: LegalTocEntry[] = [];
  const usedIds = new Set<string>();
  let counter = 0;

  const processedHtml = contentHtml.replace(/<h2>([\s\S]*?)<\/h2>/g, (_match, inner: string) => {
    counter++;
    const numberedMatch = inner.match(/^(\d+)\.\s*(.+)$/);
    const number = (numberedMatch ? numberedMatch[1] : String(counter)).padStart(2, "0");
    const displayTitle = numberedMatch ? numberedMatch[2] : inner;
    const plainTitle = displayTitle.replace(/<[^>]+>/g, "").trim();

    let id = slugify(plainTitle) || `szakasz-${counter}`;
    while (usedIds.has(id)) {
      id = `${id}-2`;
    }
    usedIds.add(id);

    toc.push({ id, number, title: plainTitle });
    return `<h2 id="${id}"><em>${number}</em>${displayTitle}</h2>`;
  });

  return { html: processedHtml, toc };
}

export type LegalMetaEntry = { label: string; value: string };

// A dokumentum eleje (a H1 és az első "---" közötti rész) tartalmazza a
// "**Hatályos:** ..." jellegű sorokat — innen olvassuk ki a fejléc
// metasávjának valós adatait. Szándékosan NEM találunk ki hiányzó
// mezőket (pl. verziószámot ott, ahol a dokumentum nem ad meg egyet) —
// ld. AGENTS.md: "Ne találj ki jogi szöveget."
function parseMetaLines(rawMarkdown: string): LegalMetaEntry[] {
  const metaSection = rawMarkdown.split(/\n---\n/)[0];
  const matches = [...metaSection.matchAll(/^\*\*([^*:]+):\*\*\s*(.+)$/gm)];
  return matches
    .map((m) => ({ label: m[1].trim(), value: m[2].trim() }))
    .filter((m) => m.label !== "Weboldal");
}

export async function getLegalDoc(slug: string) {
  const fullPath = path.join(legalDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark().use(remarkGfm).use(html).process(matterResult.content);
  const { html: contentHtml, toc } = injectHeadingAnchors(processedContent.toString());

  const parsedMeta = parseMetaLines(matterResult.content);
  const hasHatalyos = parsedMeta.some((m) => m.label === "Hatályos");
  // A cégadat minden jogi oldalon ugyanaz a valós, már máshol is
  // használt tény (ld. lib/jsonld.ts ORGANIZATION) — nem dokumentumonkénti
  // kitalálás. A "Szolgáltató" címke a szolgáltatási feltételek saját
  // belső terminológiáját követi, a többi dokumentumban "Adatkezelő".
  const controllerLabel = slug === "szolgaltatasi-feltetelek" ? "Szolgáltató" : "Adatkezelő";
  const meta: LegalMetaEntry[] = hasHatalyos
    ? [...parsedMeta, { label: controllerLabel, value: "GBR Marketing Solutions Kft." }]
    : [];

  return {
    slug,
    contentHtml,
    toc,
    meta,
    ...(matterResult.data as { title: string; description: string }),
  };
}
