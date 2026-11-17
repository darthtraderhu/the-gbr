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
  // A felső sáv a magyar oldalakon. Az est után kikapcsolható; a két oldal
  // ettől még elérhető marad (a QR-kód nem törik el).
  savAktiv: true,
};

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
