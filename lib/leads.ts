export type Lead = {
  nev: string;
  ceg?: string;
  email: string;
  telefon?: string;
  projekt: string;
  keret: "1-3M" | "3-8M" | "8M+" | "nem-tudom";
  hatarido?: string;
  ip: string;
  createdAt: string;
};

export type SavedLead = Lead & { id: string };

/**
 * Lead-perzisztálás. Egyelőre nincs bekötve Supabase, ezért strukturált
 * JSON-t ír a szerverlogba "[LEAD]" prefixszel — a Vercel logokban ez alapján
 * visszakereshető. Ha a Supabase-integráció elkészül, ennek a függvénynek a
 * belseje cserélendő egy tényleges insertre; a hívási helyek (app/api/contact)
 * nem változnak.
 */
export async function saveLead(lead: Lead): Promise<SavedLead> {
  const saved: SavedLead = { id: crypto.randomUUID(), ...lead };
  console.log("[LEAD]", JSON.stringify(saved));
  return saved;
}
