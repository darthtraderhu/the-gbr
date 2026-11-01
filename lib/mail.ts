import nodemailer from "nodemailer";
import { z } from "zod";

// Tranzakciós levelek a saját levelezésünkön (Rackhost, SMTP). Nincs külső
// levélküldő szolgáltató. Ugyanaz a postafiók, amiről a sales-rendszer is küld.
const smtpSchema = z.object({
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().default(465),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
});

type Level = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
};

function createTransport() {
  const env = smtpSchema.parse(process.env);
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    // 465: SSL rögtön; 587: STARTTLS, amit kötelezővé teszünk.
    secure: env.SMTP_PORT === 465,
    requireTLS: env.SMTP_PORT !== 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });
}

let transport: ReturnType<typeof createTransport> | null = null;

/**
 * Elküld egy levelet, és ellenőrzi, hogy az SMTP-szerver tényleg átvette a
 * címzettet. Hibánál kivételt dob (a hívó dönti el, mi legyen vele).
 */
export async function sendMail(level: Level): Promise<void> {
  const info = await (transport ??= createTransport()).sendMail(level);
  const accepted = info.accepted.map((a) => String(a).toLowerCase());
  if (!accepted.includes(level.to.toLowerCase()) || info.rejected.length > 0) {
    throw new Error(`Az SMTP-szerver nem vette át a levelet: ${level.to}`);
  }
}
