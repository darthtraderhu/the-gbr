"use client";

import { useEffect } from "react";
import { hasAnalyticsConsent } from "@/app/components/CookieConsent";
import { posztKodUrlbol, POSZT_KOD } from "@/lib/poszt-kovetes";

// Ha a látogató egy közösségi posztunk linkjéről érkezett (követőkód az
// URL-ben), jelezzük a kattintást (csak a kód megy, süti és személyes adat
// nélkül), és megjegyezzük a kódot, hogy az űrlap továbbadhassa a
// sales-rendszernek: így látszik, melyik posztból lett megkeresés.
//
// A kód a lap memóriájában él (oldalváltáskor megmarad). A böngésző
// tárhelyére (sessionStorage) csak statisztikai hozzájárulás után írjuk.

const STORAGE_KEY = "gbr-poszt";
let memoriaKod: string | null = null;
let jelzett: string | null = null;

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
