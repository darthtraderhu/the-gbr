import { z } from "zod";

// A megkeresés forrása: honnan érkezett a látogató az oldalra. Az űrlap a
// látogatás első oldalán rögzített adatot küldi (app/components/PosztKovetes.tsx),
// de csak statisztikai hozzájárulás után; hozzájárulás nélkül nincs forrás,
// a megkeresés „ismeretlen” forrással érkezik a sales-rendszerbe.
// Személyes adat nincs benne: UTM-paraméterek, a hivatkozó oldal domainje,
// a nyitóoldal útvonala, és hogy volt-e hirdetési kattintásazonosító.

const rovid = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .regex(/^[\p{L}\p{N} ._\-/:+%()]*$/u)
    .optional()
    .catch(undefined)
    .transform((v) => (v ? v : undefined));

export const forrasSchema = z
  .object({
    utmSource: rovid(100),
    utmMedium: rovid(100),
    utmCampaign: rovid(150),
    // Volt-e hirdetési kattintásazonosító az URL-ben (az értékét nem tároljuk).
    kattintas: z.enum(["google", "meta", "microsoft"]).optional().catch(undefined),
    // A hivatkozó oldal domainje, ha más oldalról jött (pl. "www.google.com").
    hivatkozo: rovid(200),
    // Az első megnyitott oldal útvonala (lekérdezés nélkül).
    nyito: rovid(200),
  })
  .optional()
  .catch(undefined);

export type Forras = NonNullable<z.infer<typeof forrasSchema>>;

/** A riport kategóriái. A sales-rendszer ugyanezeket a kulcsokat ismeri. */
export type ForrasKategoria =
  | "google-hirdetes"
  | "meta-hirdetes"
  | "egyeb-hirdetes"
  | "kereso"
  | "kozossegi"
  | "hirlevel"
  | "hivatkozo"
  | "kozvetlen";

const KERESOK = /(^|\.)(google|bing|duckduckgo|yahoo|ecosia|mojeek|startpage|yandex|brave)\./;
const KOZOSSEGI = /(^|\.)(facebook|fb|instagram|linkedin|lnkd|x|twitter|t|youtube|tiktok|pinterest|threads)\./;

/** Egyszerű, ellenőrizhető szabály: előbb a hirdetés, aztán az UTM, végül a hivatkozó. */
export function forrasKategoria(f: Forras): ForrasKategoria {
  const src = (f.utmSource ?? "").toLowerCase();
  const med = (f.utmMedium ?? "").toLowerCase();
  const fizetett = /^(cpc|ppc|paid|paid_social|paidsocial|display|cpm)$/.test(med);

  if (f.kattintas === "google" || (fizetett && /google|adwords/.test(src))) return "google-hirdetes";
  if (f.kattintas === "meta" || (fizetett && /facebook|instagram|meta|fb|ig/.test(src))) return "meta-hirdetes";
  if (f.kattintas === "microsoft" || fizetett) return "egyeb-hirdetes";
  if (med === "email" || med === "newsletter" || src === "hirlevel") return "hirlevel";
  if (med === "social" || KOZOSSEGI.test(`${src}.`)) return "kozossegi";

  const host = (f.hivatkozo ?? "").toLowerCase();
  if (host) {
    if (KERESOK.test(host)) return "kereso";
    if (KOZOSSEGI.test(host)) return "kozossegi";
    return "hivatkozo";
  }
  if (med === "organic") return "kereso";
  if (src || med) return "hivatkozo";
  return "kozvetlen";
}

/** A Beérkezőnek küldött `extra` mezők (szöveg → szöveg). */
export function forrasExtra(f: Forras | undefined): Record<string, string> {
  if (!f) return { forras: "ismeretlen" };
  const extra: Record<string, string> = { forras: forrasKategoria(f) };
  const utm = [f.utmSource, f.utmMedium, f.utmCampaign].filter(Boolean).join(" / ");
  if (utm) extra.forras_utm = utm;
  if (f.hivatkozo) extra.forras_hivatkozo = f.hivatkozo;
  if (f.nyito) extra.forras_nyito = f.nyito;
  return extra;
}
