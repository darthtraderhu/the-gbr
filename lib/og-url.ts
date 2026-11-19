import { SITE_URL } from "./site";

// A Next.js a route group-ban ((hu)) lévő opengraph-image fájlok URL-jéhez
// hash-utótagot fűz (pl. /hirek/<slug>/opengraph-image-aqv0m0), hogy a
// csoportok ne ütközzenek. A JSON-LD-ben ezért nem írhatjuk kézzel a
// "/opengraph-image" utat — az 404-et ad, és a Google 404-es URL-ként
// gyűjti. Ez a függvény ugyanazzal a djb2 hash-sel számolja az utótagot,
// mint a Next.js (next/dist/lib/metadata/get-metadata-route.js,
// getMetadataRouteSuffix). Ha a mappaszerkezet változik, a paraméter is.
function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0xffffffff;
  }
  return hash >>> 0;
}

function routeSuffix(appDir: string): string {
  const hasGroup = appDir.split("/").some((seg) => seg.startsWith("(") && seg.endsWith(")"));
  return hasGroup ? `-${djb2Hash(appDir).toString(36).slice(0, 6)}` : "";
}

// appDir: a fájl mappája az app/ alatt, csoportokkal és dinamikus
// szegmenssel együtt (pl. "/(hu)/hirek/[id]"); urlPath: a valódi URL-út.
export function ogImageUrl(appDir: string, urlPath: string): string {
  const base = urlPath === "/" ? "" : urlPath;
  return `${SITE_URL}${base}/opengraph-image${routeSuffix(appDir)}`;
}
