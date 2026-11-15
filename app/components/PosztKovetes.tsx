"use client";

import { useEffect } from "react";
import { hasAnalyticsConsent } from "@/app/components/CookieConsent";
import { posztKodUrlbol, POSZT_KOD } from "@/lib/poszt-kovetes";
import type { Forras } from "@/lib/forras";

// Ha a látogató egy közösségi posztunk linkjéről érkezett (követőkód az
// URL-ben), jelezzük a kattintást (csak a kód megy, süti és személyes adat
// nélkül), és megjegyezzük a kódot, hogy az űrlap továbbadhassa a
// sales-rendszernek: így látszik, melyik posztból lett megkeresés.
//
// A kód a lap memóriájában él (oldalváltáskor megmarad). A böngésző
// tárhelyére (sessionStorage) csak statisztikai hozzájárulás után írjuk.

const STORAGE_KEY = "gbr-poszt";
const FORRAS_KEY = "gbr-forras";
let memoriaKod: string | null = null;
let jelzett: string | null = null;
// A látogatás első oldalán rögzített forrás (lib/forras.ts).
let memoriaForras: Forras | null = null;

/** A forrás a mostani URL-ből és a hivatkozó oldalból. */
function forrasMost(): Forras {
  const params = new URLSearchParams(window.location.search);
  const vag = (v: string | null, max: number) => (v ? v.slice(0, max) : undefined);
  let hivatkozo: string | undefined;
  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && ref.host !== window.location.host) hivatkozo = ref.host.slice(0, 200);
  } catch {
    // Hibás hivatkozó: nincs.
  }
  const kattintas: Forras["kattintas"] = params.has("gclid") || params.has("gbraid") || params.has("wbraid")
    ? "google"
    : params.has("fbclid")
      ? "meta"
      : params.has("msclkid")
        ? "microsoft"
        : undefined;
  return {
    utmSource: vag(params.get("utm_source"), 100),
    utmMedium: vag(params.get("utm_medium"), 100),
    utmCampaign: vag(params.get("utm_campaign"), 150),
    kattintas,
    hivatkozo,
    nyito: window.location.pathname.slice(0, 200),
  };
}

/**
 * A látogatás forrása az űrlapnak, de csak statisztikai hozzájárulás mellett;
 * különben undefined (a megkeresés ismeretlen forrással érkezik).
 */
export function aktualisForras(): Forras | undefined {
  if (!hasAnalyticsConsent()) return undefined;
  if (memoriaForras) return memoriaForras;
  try {
    const tarolt = window.sessionStorage.getItem(FORRAS_KEY);
    if (tarolt) return JSON.parse(tarolt) as Forras; // a szerver Zoddal ellenőrzi
  } catch {
    // Tiltott tárhely vagy hibás érték.
  }
  return undefined;
}

/** Az aktuális látogatás posztkódja, ha posztról jött; különben undefined. */
export function aktualisPosztKod(): string | undefined {
  if (memoriaKod) return memoriaKod;
  try {
    const tarolt = window.sessionStorage.getItem(STORAGE_KEY);
    if (tarolt && POSZT_KOD.test(tarolt)) return tarolt;
  } catch {
    // Tiltott tárhely (privát mód): nincs mit tenni.
  }
  return undefined;
}

export default function PosztKovetes() {
  useEffect(() => {
    // A forrás a látogatás első oldaláról; a lap memóriájában él, a böngésző
    // tárhelyére csak hozzájárulás után kerül.
    if (!memoriaForras) {
      let tarolt = false;
      try {
        tarolt = window.sessionStorage.getItem(FORRAS_KEY) !== null;
      } catch {
        // Tiltott tárhely.
      }
      if (!tarolt) {
        memoriaForras = forrasMost();
        if (hasAnalyticsConsent()) {
          try {
            window.sessionStorage.setItem(FORRAS_KEY, JSON.stringify(memoriaForras));
          } catch {
            // Tiltott tárhely: a memóriában marad.
          }
        }
      }
    }

    const kod = posztKodUrlbol(window.location.search);
    if (!kod) return;
    memoriaKod = kod;
    if (hasAnalyticsConsent()) {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, kod);
      } catch {
        // Tiltott tárhely: a memóriában lévő kód marad.
      }
    }
    // Egy betöltésen egyszer (fejlesztői módban az effekt kétszer fut).
    if (jelzett === kod) return;
    jelzett = kod;
    const adat = new Blob([JSON.stringify({ code: kod })], { type: "application/json" });
    if (!navigator.sendBeacon?.("/api/kattintas", adat)) {
      fetch("/api/kattintas", { method: "POST", body: adat, keepalive: true }).catch(() => {});
    }
  }, []);
  return null;
}
