import { SITE_URL } from "./site";

// IndexNow: a Bing (és a protokollt használó többi kereső) azonnal értesül
// az új vagy változott URL-ekről, nem kell a következő sitemap-olvasásra
// várni. A Google nem használja, ott a sitemap marad.
//
// A kulcs nem titok: a protokoll szerint nyilvános fájlban áll
// (public/<kulcs>.txt), ebből ellenőrzi a kereső, hogy a domain a miénk.
export const INDEXNOW_KEY = "ff00ecda4fd69232c9a3f40126b72508";

const ENDPOINT = "https://api.indexnow.org/indexnow";

// Legfeljebb 10 000 URL küldhető egyszerre; nálunk ennél jóval kevesebb van.
export async function submitToIndexNow(urls: string[]): Promise<number> {
  const host = new URL(SITE_URL).host;
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });
  // 200: fogadva, 202: fogadva, a kulcs ellenőrzése folyamatban.
  if (response.status !== 200 && response.status !== 202) {
    const body = await response.text();
    throw new Error(`IndexNow hiba: ${response.status} ${body.slice(0, 200)}`);
  }
  return response.status;
}
