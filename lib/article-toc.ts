// A cikk h2-címsoraiból tartalomjegyzék. A remark-html id nélküli <h2>-ket
// ad ki, ezért itt kapnak stabil, ékezet nélküli horgonyt — így az oldalsó
// „Ebben az írásban” lista valódi szakaszokra ugrik, nem kitalált pontokra.

export type TocItem = { id: string; title: string };

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

export function withHeadingAnchors(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();

  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const title = decodeEntities(inner.replace(/<[^>]+>/g, "")).trim();
    const base = slugify(title) || "szakasz";
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    toc.push({ id, title });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  return { html: out, toc };
}
