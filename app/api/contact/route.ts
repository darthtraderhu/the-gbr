import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { saveLead } from "@/lib/leads";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { LEAD_FROM_EMAIL, SITE_URL } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFICATION_TO = "gabor@thegbr.eu";

// Ha ennyi ezredmásodpercen belül érkezik a submit az űrlap betöltéséhez
// képest, azt botnak tekintjük — ember nem tud 3 mp alatt kitölteni egy
// többmezős űrlapot.
const MIN_FILL_TIME_MS = 3000;

const contactSchema = z.object({
  nev: z.string().trim().min(1, "A név megadása kötelező.").max(200),
  ceg: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
  email: z.string().trim().email("Érvénytelen e-mail cím.").max(200),
  telefon: z
    .string()
    .trim()
    .max(50)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
  projekt: z.string().trim().min(1, "A projekt leírása kötelező.").max(2000),
  keret: z.enum(["1-3M", "3-8M", "8M+", "nem-tudom"]),
  hatarido: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
  // Honeypot: valódi felhasználó sosem tölti ki, csak a botok.
  honeypot: z.string().optional().default(""),
  // A kliens Date.now()-ja az űrlap megjelenésekor — időalapú bot-szűréshez.
  startedAt: z.number(),
});

function isAllowedOrigin(origin: string | null): boolean {
  // Fejlesztés közben (localhost) ne akadjunk el az origin-ellenőrzésen.
  if (process.env.NODE_ENV !== "production") return true;
  if (!origin) return false;
  return origin === SITE_URL || origin === "https://thegbr.eu";
}

function budgetLabel(keret: z.infer<typeof contactSchema>["keret"]): string {
  switch (keret) {
    case "1-3M":
      return "1-3 millió Ft";
    case "3-8M":
      return "3-8 millió Ft";
    case "8M+":
      return "8 millió Ft felett";
    case "nem-tudom":
      return "Még nem tudja";
  }
}

export async function POST(req: Request) {
  // 1. Origin-ellenőrzés — csak a saját domainről fogadunk beküldést.
  const origin = req.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    console.warn("[LEAD-REJECTED] Ismeretlen origin:", origin);
    return NextResponse.json(
      { success: false, error: "Érvénytelen kérés forrás." },
      { status: 403 }
    );
  }

  // 2. Rate limit — IP-nként max 3 beküldés / 10 perc.
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    console.warn("[LEAD-RATE-LIMITED] IP:", ip);
    return NextResponse.json(
      { success: false, error: "Túl sok próbálkozás. Kérjük, próbáld újra 10 perc múlva." },
      { status: 429 }
    );
  }

  // 3. Body beolvasása és validálása.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Érvénytelen kérés." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Hiányos vagy hibás adatok.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { nev, ceg, email, telefon, projekt, keret, hatarido, honeypot, startedAt } = parsed.data;

  // 4. Bot-szűrés: kitöltött honeypot VAGY túl gyors submit.
  const elapsed = Date.now() - startedAt;
  if (honeypot.trim() !== "" || elapsed < MIN_FILL_TIME_MS) {
    console.warn("[LEAD-BOT-BLOCKED]", {
      ip,
      honeypotFilled: honeypot.trim() !== "",
      elapsedMs: elapsed,
    });
    // Szándékosan "sikeres" választ adunk, hogy a botok ne tanulják meg,
    // mi buktatja le őket — a lead-et nem mentjük, e-mail nem megy ki.
    return NextResponse.json({ success: true });
  }

  // 5. Perzisztálás ELŐBB — ez a kritikus lépés, ennek sikerülnie kell.
  let savedLead;
  try {
    savedLead = await saveLead({
      nev,
      ceg,
      email,
      telefon,
      projekt,
      keret,
      hatarido,
      ip,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[LEAD-SAVE-ERROR]", error);
    return NextResponse.json(
      { success: false, error: "A megkeresés mentése sikertelen. Kérjük, próbáld újra." },
      { status: 500 }
    );
  }

  // 6. E-mailek — csak a mentés UTÁN, és ha ez elhasal, a lead attól még megvan.
  //    FONTOS: a Resend SDK a hibát NEM dobja, hanem { data, error } alakban
  //    adja vissza — try/catch önmagában nem fogja el, expliciten kell nézni
  //    az error mezőt minden egyes hívásnál.
  try {
    const [notificationResult, confirmationResult] = await Promise.all([
      resend.emails.send({
        from: LEAD_FROM_EMAIL,
        to: NOTIFICATION_TO,
        replyTo: email,
        subject: `Új lead: ${nev}${ceg ? ` — ${ceg}` : ""} (${budgetLabel(keret)})`,
        text: [
          "Új megkeresés érkezett a weboldalon keresztül.",
          "",
          `Név: ${nev}`,
          `Cég: ${ceg ?? "—"}`,
          `E-mail: ${email}`,
          `Telefon: ${telefon ?? "—"}`,
          `Projekt: ${projekt}`,
          `Keret: ${budgetLabel(keret)}`,
          `Határidő: ${hatarido ?? "—"}`,
          "",
          `Beküldve: ${savedLead.createdAt}`,
          `IP: ${savedLead.ip}`,
          `Lead ID: ${savedLead.id}`,
        ].join("\n"),
      }),
      resend.emails.send({
        from: LEAD_FROM_EMAIL,
        to: email,
        subject: "Megkaptuk a megkeresésed — THE GBR",
        text: [
          `Kedves ${nev}!`,
          "",
          "Köszönjük a megkeresésed. Az alábbi adatokat rögzítettük:",
          "",
          `Projekt: ${projekt}`,
          `Tervezett keret: ${budgetLabel(keret)}`,
          ...(hatarido ? [`Határidő: ${hatarido}`] : []),
          "",
          "Munkatársaink két munkanapon belül felveszik veled a kapcsolatot a megadott elérhetőségeken.",
          "",
          "Ha időközben kérdésed van, írj közvetlenül: gabor@thegbr.eu",
          "",
          "Üdvözlettel,",
          "THE GBR csapata",
          "GBR Marketing Solutions Kft.",
        ].join("\n"),
      }),
    ]);

    if (notificationResult.error) {
      console.error("[LEAD-EMAIL-ERROR] Értesítő e-mail:", {
        leadId: savedLead.id,
        error: notificationResult.error,
      });
    }
    if (confirmationResult.error) {
      console.error("[LEAD-EMAIL-ERROR] Visszaigazoló e-mail:", {
        leadId: savedLead.id,
        error: confirmationResult.error,
      });
    }
  } catch (error) {
    // Váratlan (pl. hálózati) hiba — ez sem bukja el a kérést, a lead már mentve van.
    console.error("[LEAD-EMAIL-ERROR] Váratlan hiba:", { leadId: savedLead.id, error });
  }

  return NextResponse.json({ success: true, id: savedLead.id }, { status: 200 });
}
