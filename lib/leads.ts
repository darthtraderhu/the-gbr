export type Lead = {
  nev: string;
  ceg?: string;
  email: string;
  telefon?: string;
  // A célpont-választás címkéje (Web / Marketing / Full-Stack) — kategória,
  // nem szabadszöveg. A tartalmi leírást a `leiras` mező hordozza.
  kategoria: string;
  leiras: string;
  // A /init keret-választása. A fix áras rendelésnél (/gyors-indulas) nincs.
  keret?: "1-3M" | "3-8M" | "8M+" | "nem-tudom";
  hatarido?: string;
  // Melyik űrlapról jött: magyar /init vagy angol /en/contact.
  lang: "hu" | "en";
  // Honnan jött, ha nem a /init vagy az /en/contact (pl. "thegbr.eu /gyors-indulas").
  source?: string;
  // Az űrlap saját mezői (pl. termék, ár, weboldal) — a Beérkezőben változatlanul megmaradnak.
  extra?: Record<string, string>;
  // Ha közösségi posztunk linkjéről jött: a poszt követőkódja (lib/poszt-kovetes.ts).
  poszt?: string;
  ip: string;
  createdAt: string;
};

export type SavedLead = Lead & { id: string };

// A sales-rendszer (gbr-sales) beküldő végpontja. A token a sales-rendszerben
// a THE GBR szervezethez tartozik; csak szerveroldalon él, sosem NEXT_PUBLIC_.
const SALES_INGEST_URL =
  process.env.SALES_INGEST_URL || "https://sales.thegbr.eu/api/beerkezo";
const SALES_TIMEOUT_MS = 8000;

/** A sales-rendszer egy másik végpontja (ugyanazon a címen, mint a Beérkező). */
export function salesUrl(path: string): string {
  return new URL(path, SALES_INGEST_URL).toString();
}

/**
 * Lead-perzisztálás. Két helyre kerül:
 * 1. a szerverlogba "[LEAD]" prefixszel (tartalék, a Vercel logokban
 *    visszakereshető),
 * 2. a sales-rendszer Beérkezőjébe, ha be van állítva a SALES_INGEST_TOKEN.
 * A sales-rendszer hibája nem buktatja el a beküldést (a log megvan), de
 * "[LEAD-SALES-ERROR]" sorral látszik, hogy kézzel kell felvinni.
 */
export async function saveLead(lead: Lead): Promise<SavedLead> {
  const saved: SavedLead = { id: crypto.randomUUID(), ...lead };
  console.log("[LEAD]", JSON.stringify(saved));
  await sendToSales(saved);
  return saved;
}

async function sendToSales(lead: SavedLead): Promise<void> {
  const token = process.env.SALES_INGEST_TOKEN;
  if (!token) {
    console.warn("[LEAD-SALES-SKIP] Nincs SALES_INGEST_TOKEN, csak log.", { leadId: lead.id });
    return;
  }

  const extra: Record<string, string> = { ...lead.extra, nyelv: lead.lang };
  if (lead.poszt) extra.poszt = lead.poszt;
  if (lead.keret) extra.keret = lead.keret;
  if (lead.hatarido) extra.hatarido = lead.hatarido;

  try {
    const res = await fetch(SALES_INGEST_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        externalId: lead.id,
        source: lead.source ?? (lead.lang === "en" ? "thegbr.eu /en/contact" : "thegbr.eu /init"),
        receivedAt: lead.createdAt,
        name: lead.nev,
        email: lead.email,
        phone: lead.telefon,
        company: lead.ceg,
        topic: lead.kategoria,
        message: lead.leiras,
        extra,
      }),
      signal: AbortSignal.timeout(SALES_TIMEOUT_MS),
    });
    // Ellenőrizzük, hogy tényleg bekerült: a végpont azonosítót ad vissza.
    const body: unknown = await res.json().catch(() => null);
    const id = body && typeof body === "object" && "id" in body ? body.id : undefined;
    if (!res.ok || typeof id !== "string") {
      console.error("[LEAD-SALES-ERROR]", { leadId: lead.id, status: res.status, body });
      return;
    }
    console.log("[LEAD-SALES-OK]", { leadId: lead.id, inquiryId: id });
  } catch (error) {
    console.error("[LEAD-SALES-ERROR]", { leadId: lead.id, error });
  }
}
