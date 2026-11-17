import { formatFt, termekPath, TERMEKEK } from "@/lib/gyors-indulas";

// Az AI demo est oldalai: a felső sáv (EstSav), a prezentáció (/ai-est) és az
// ajándék-átvilágítás QR-os oldala (/ai-est/ajandek). Minden, ami az esthez
// kötődik és változhat (név, dátum, a sáv ki-be kapcsolása, az ajándék), itt
// van egy helyen.
//
// Az URL-ek élesítés után nem változnak: a kinyomtatott QR-kód a
// /ai-est/ajandek címre mutat (public/ai-est/qr-ajandek.svg).

export const EST_PATH = "/ai-est";
export const EST_AJANDEK_PATH = "/ai-est/ajandek";

export const EST = {
  // Az est neve, ahogy a sávon és a prezentáció borítóján megjelenik.
  nev: "AI Demo Est",
  // Az est napja (ÉÉÉÉ-HH-NN). Amíg nincs megadva, a sáv dátum nélkül szól.
  datum: null as string | null,
  // A felső sáv a magyar oldalakon. Kézzel is kikapcsolható; a két oldal
  // ettől még elérhető marad (a QR-kód nem törik el). Az est napja után a
  // sáv szövege „Lemaradtál…?”-ra vált, az ajándék határideje után pedig
  // magától eltűnik (EstSav.tsx).
  savAktiv: true,
  // Eddig a napig (bezárólag, budapesti idő szerint) kérhető az ajándék.
  ajandekHatarido: "2026-12-15",
};

/** Mai nap ÉÉÉÉ-HH-NN alakban, budapesti idő szerint. */
export function maBudapesten(most: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Budapest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(most);
}

/** Kérhető-e még az ajándék (a határidő napja még igen). */
export function ajandekKerheto(most: Date = new Date()): boolean {
  return maBudapesten(most) <= EST.ajandekHatarido;
}

/** Az ajándék határideje magyarul, év nélkül, ragozva („december 15-ig”). */
export function ajandekHataridoIg(): string {
  const nap = new Intl.DateTimeFormat("hu-HU", {
    month: "long",
    day: "numeric",
    timeZone: "Europe/Budapest",
  }).format(new Date(`${EST.ajandekHatarido}T12:00:00Z`));
  return `${nap.replace(/\.$/, "")}-ig`;
}

// Az ajándék: a /gyors-indulas gyorsátvilágítása, amelynek nyilvános ára van,
// így az érték nem alátámasztatlan állítás. Név, ár és határidő onnan jön.
const gyors = TERMEKEK.find((t) => t.id === "gyorsatvilagitas");
if (!gyors) throw new Error("A gyorsátvilágítás hiányzik a lib/gyors-indulas.ts-ből.");

export const AJANDEK = {
  nev: gyors.name,
  arNetto: gyors.arNetto,
  hatarido: gyors.hatarido,
  termekHref: termekPath(gyors.id),
};

export const AJANDEK_ERTEK = `${formatFt(AJANDEK.arNetto)} + ÁFA`;

/** Az est napja magyarul („2026. november 20.”), vagy null. */
export function estDatumSzoveg(): string | null {
  if (!EST.datum) return null;
  const d = new Date(`${EST.datum}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Europe/Budapest",
  }).format(d);
}
