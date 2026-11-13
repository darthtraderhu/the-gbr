// Közösségi poszt → kattintás → megkeresés követése (a sales-rendszer
// Közzététel modulja). A posztok linkje követőkódot kap:
//   ?utm_source=facebook&utm_medium=social&utm_campaign=poszt&utm_content=<kód>
// A kód véletlen, nem azonosít személyt; csak azt mondja meg, melyik posztról jött.

/** A követőkód formája (gbr-sales lib/kozzetetel.ts TRACKING_CODE). */
export const POSZT_KOD = /^[a-z0-9]{8}$/;

/** A kód a látogató URL-jéből, ha posztról jött; különben null. */
export function posztKodUrlbol(search: string): string | null {
  const params = new URLSearchParams(search);
  if (params.get("utm_medium") !== "social") return null;
  const kod = params.get("utm_content");
  return kod && POSZT_KOD.test(kod) ? kod : null;
}
