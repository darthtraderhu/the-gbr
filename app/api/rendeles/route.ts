import { NextResponse } from "next/server";
import { z } from "zod";
import { saveLead } from "@/lib/leads";
import { sendMail } from "@/lib/mail";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { isAllowedOrigin } from "@/lib/request-guard";
import { LEAD_FROM_EMAIL } from "@/lib/site";
import { formatFt, getTermek, TERMEK_IDK } from "@/lib/gyors-indulas";

// Fix áras termék rendelése (/gyors-indulas/<termék>). Ugyanúgy a
// sales-rendszer Beérkezőjébe fut, mint a /init, csak a termék nevével, árával
// és a weboldal címével. Fizetés nincs: a díjbekérőt kézzel küldjük.

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

const orderSchema = z.object({
  termek: z.enum(TERMEK_IDK),
  nev: z.string().trim().min(1, "A név megadása kötelező.").max(200),
  ceg: z.string().trim().min(1, "A cégnév megadása kötelező.").max(200),
  email: z.string().trim().email("Érvénytelen e-mail cím.").max(200),
  telefon: optionalText(50),
  weboldal: z.string().trim().min(3, "A weboldal címe kötelező.").max(300),
  megjegyzes: optionalText(3000),
  // A rendelő megerősíti, hogy a saját cégére (vagy amelynek nevében eljárhat) rendel.
  sajatCeg: z.literal(true),
  honeypot: z.string().optional().default(""),
  startedAt: z.number(),
});

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    console.warn("[ORDER-REJECTED] Ismeretlen origin:", origin);
    return NextResponse.json({ success: false, error: "Érvénytelen kérés forrás." }, { status: 403 });
  }

  const ip = getClientIp(req);
  if (isRateLimited(`rendeles:${ip}`)) {
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

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Hiányos vagy hibás adatok.", issues: parsed.error.issues },
      { status: 400 }
    );
  }
  const { termek: termekId, nev, ceg, email, telefon, weboldal, megjegyzes, honeypot, startedAt } =
    parsed.data;

  const elapsed = Date.now() - startedAt;
  if (honeypot.trim() !== "" || elapsed < MIN_FILL_TIME_MS) {
    console.warn("[ORDER-BOT-BLOCKED]", { ip, honeypotFilled: honeypot.trim() !== "", elapsedMs: elapsed });
    // Szándékosan nem áruljuk el a botnak, mi buktatta le. Azonosítót nem adunk,
    // így a felület sem mutat sikert.
    return NextResponse.json({ success: true });
  }

  const termek = getTermek(termekId);
  if (!termek) {
    return NextResponse.json({ success: false, error: "Ismeretlen termék." }, { status: 400 });
  }
  const arSzoveg = `${formatFt(termek.arNetto)} + ÁFA`;

  const leiras = [
    `Fix áras rendelés: ${termek.name} (${arSzoveg}, ${termek.munkanap} munkanap)`,
    `Weboldal: ${weboldal}`,
    "",
    `${termek.noteLabel}`,
    megjegyzes ?? "—",
  ].join("\n");

  let saved;
  try {
    saved = await saveLead({
      nev,
      ceg,
      email,
      telefon,
      kategoria: `Fix áras: ${termek.name}`,
      leiras,
      lang: "hu",
      source: `thegbr.eu /gyors-indulas/${termek.id}`,
      extra: {
        termek: termek.name,
        ar: arSzoveg,
        hatarido: `${termek.munkanap} munkanap`,
        weboldal,
      },
      ip,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[ORDER-SAVE-ERROR]", error);
    return NextResponse.json(
      { success: false, error: "A rendelés mentése sikertelen. Próbáld újra." },
      { status: 500 }
    );
  }

  const [notification, confirmation] = await Promise.allSettled([
    sendMail({
      from: LEAD_FROM_EMAIL,
      to: NOTIFICATION_TO,
      replyTo: email,
      subject: `Új rendelés: ${termek.name} — ${ceg} (${arSzoveg})`,
      text: [
        "Új fix áras rendelés érkezett a weboldalon. Díjbekérő küldése 2 munkanapon belül.",
        "",
        `Termék: ${termek.name} (${arSzoveg}, ${termek.munkanap} munkanap)`,
        `Név: ${nev}`,
        `Cég: ${ceg}`,
        `E-mail: ${email}`,
        `Telefon: ${telefon ?? "—"}`,
        `Weboldal: ${weboldal}`,
        "",
        `${termek.noteLabel}`,
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
      subject: `Megkaptuk a rendelésed: ${termek.name} — THE GBR`,
      text: [
        `Kedves ${nev}!`,
        "",
        "Köszönjük a rendelésed. Ezt rögzítettük:",
        "",
        `Termék: ${termek.name}`,
        `Ár: ${arSzoveg}`,
        `Határidő: ${termek.munkanap} munkanap a díjbekérő kiegyenlítésétől`,
        `Cég: ${ceg}`,
        `Weboldal: ${weboldal}`,
        "",
        "Két munkanapon belül küldjük a díjbekérőt, és ha kell, egy-két pontosító kérdést.",
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
    console.error("[ORDER-EMAIL-ERROR] Értesítő:", { id: saved.id, error: notification.reason });
  }
  if (confirmation.status === "rejected") {
    console.error("[ORDER-EMAIL-ERROR] Visszaigazoló:", { id: saved.id, error: confirmation.reason });
  }

  return NextResponse.json({ success: true, id: saved.id }, { status: 200 });
}
