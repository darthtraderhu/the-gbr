import { NextResponse } from "next/server";
import { z } from "zod";
import { saveLead } from "@/lib/leads";
import { POSZT_KOD } from "@/lib/poszt-kovetes";
import { forrasSchema } from "@/lib/forras";
import { sendMail } from "@/lib/mail";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { isAllowedOrigin } from "@/lib/request-guard";
import { LEAD_FROM_EMAIL } from "@/lib/site";
import { AJANDEK, AJANDEK_ERTEK, EST, EST_AJANDEK_PATH } from "@/lib/ai-est";

// Az AI demo est résztvevőinek ajándék-átvilágítása (QR-kódról,
// /ai-est/ajandek). Ugyanúgy a sales-rendszer Beérkezőjébe fut, mint a /init,
// az est nevével és a weboldal címével. Fizetés nincs.

const NOTIFICATION_TO = "gabor@thegbr.eu";
const MIN_FILL_TIME_MS = 3000;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined));

const ajandekSchema = z.object({
  nev: z.string().trim().min(1, "A név megadása kötelező.").max(200),
  ceg: z.string().trim().min(1, "A cégnév megadása kötelező.").max(200),
  email: z.string().trim().email("Érvénytelen e-mail cím.").max(200),
  telefon: optionalText(50),
  weboldal: z.string().trim().min(3, "A weboldal címe kötelező.").max(300),
  megjegyzes: optionalText(3000),
  // A kérő megerősíti, hogy a saját cége oldalát kéri (vagy amelynek nevében eljárhat).
  sajatCeg: z.literal(true),
  honeypot: z.string().optional().default(""),
  startedAt: z.number(),
  poszt: z.string().regex(POSZT_KOD).optional().catch(undefined),
  forras: forrasSchema,
});

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    console.warn("[EST-AJANDEK-REJECTED] Ismeretlen origin:", origin);
    return NextResponse.json({ success: false, error: "Érvénytelen kérés forrás." }, { status: 403 });
  }

  const ip = getClientIp(req);
  if (isRateLimited(`est-ajandek:${ip}`)) {
    return NextResponse.json(
      { success: false, error: "Túl sok próbálkozás. Próbáld újra 10 perc múlva." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Érvénytelen kérés." }, { status: 400 });
  }

  const parsed = ajandekSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Hiányos vagy hibás adatok.", issues: parsed.error.issues },
      { status: 400 }
    );
  }
  const { nev, ceg, email, telefon, weboldal, megjegyzes, honeypot, startedAt } = parsed.data;

  const elapsed = Date.now() - startedAt;
  if (honeypot.trim() !== "" || elapsed < MIN_FILL_TIME_MS) {
    console.warn("[EST-AJANDEK-BOT-BLOCKED]", { ip, honeypotFilled: honeypot.trim() !== "", elapsedMs: elapsed });
    // Azonosítót nem adunk, így a felület sem mutat sikert.
    return NextResponse.json({ success: true });
  }

  const leiras = [
    `${EST.nev}: ajándék ${AJANDEK.nev.toLowerCase()} (${AJANDEK_ERTEK} értékben, díjmentesen)`,
    `Weboldal: ${weboldal}`,
    "",
    "Mit árul, kinek:",
    megjegyzes ?? "—",
  ].join("\n");

  let saved;
  try {
    saved = await saveLead({
      nev,
      ceg,
      email,
      telefon,
      kategoria: `Ajándék ${AJANDEK.nev.toLowerCase()} · ${EST.nev}`,
      leiras,
      lang: "hu",
      source: `thegbr.eu ${EST_AJANDEK_PATH}`,
      poszt: parsed.data.poszt,
      forras: parsed.data.forras,
      extra: {
        esemeny: EST.nev,
        ajandek: AJANDEK.nev,
        ertek: AJANDEK_ERTEK,
        weboldal,
      },
      ip,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[EST-AJANDEK-SAVE-ERROR]", error);
    return NextResponse.json(
      { success: false, error: "A jelentkezés mentése sikertelen. Próbáld újra." },
      { status: 500 }
    );
  }

  const [notification, confirmation] = await Promise.allSettled([
    sendMail({
      from: LEAD_FROM_EMAIL,
      to: NOTIFICATION_TO,
      replyTo: email,
      subject: `${EST.nev} · ajándék átvilágítás: ${ceg} (${weboldal})`,
      text: [
        `Új jelentkezés az ${EST.nev} ajándék-átvilágítására (QR-kód / ${EST_AJANDEK_PATH}).`,
        "",
        `Név: ${nev}`,
        `Cég: ${ceg}`,
        `E-mail: ${email}`,
        `Telefon: ${telefon ?? "—"}`,
        `Weboldal: ${weboldal}`,
        "",
        "Mit árul, kinek:",
        megjegyzes ?? "—",
        "",
        `Beküldve: ${saved.createdAt}`,
        `IP: ${saved.ip}`,
        `Azonosító: ${saved.id}`,
      ].join("\n"),
    }),
    sendMail({
      from: LEAD_FROM_EMAIL,
      to: email,
      subject: `Megkaptuk: ajándék átvilágítás az ${EST.nev} után — THE GBR`,
      text: [
        `Kedves ${nev}!`,
        "",
        "Köszönjük, hogy ott voltál az esten. Ezt rögzítettük:",
        "",
        `Ajándék: ${AJANDEK.nev} (${AJANDEK_ERTEK} értékben, neked díjmentesen)`,
        `Cég: ${ceg}`,
        `Weboldal: ${weboldal}`,
        "",
        "Két munkanapon belül visszaírunk, és megírjuk, mikor kapod meg a riportot.",
        "Kívülről vizsgálunk, hozzáférés nem kell. A riportban az oldalad tíz legfontosabb hibája lesz, fontossági sorrendben, javítással.",
        "",
        "Ha időközben kérdésed van, írj közvetlenül: gabor@thegbr.eu",
        "",
        "Üdvözlettel,",
        "THE GBR",
        "GBR Marketing Solutions Kft.",
      ].join("\n"),
    }),
  ]);
  if (notification.status === "rejected") {
    console.error("[EST-AJANDEK-EMAIL-ERROR] Értesítő:", { id: saved.id, error: notification.reason });
  }
  if (confirmation.status === "rejected") {
    console.error("[EST-AJANDEK-EMAIL-ERROR] Visszaigazoló:", { id: saved.id, error: confirmation.reason });
  }

  return NextResponse.json({ success: true, id: saved.id }, { status: 200 });
}
