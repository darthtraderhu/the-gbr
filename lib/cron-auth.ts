import { timingSafeEqual } from "crypto";

// A Vercel cron a CRON_SECRET-et "Bearer <titok>" fejlécként küldi.
// Konstans idejű összehasonlítás: nem áll meg az első eltérő karakternél,
// így az időzítésből nem következtethető ki a helyes titok.
export function isCronAuthorized(authHeader: string | null, cronSecret: string): boolean {
  if (!authHeader) return false;

  const expected = Buffer.from(`Bearer ${cronSecret}`);
  const provided = Buffer.from(authHeader);

  if (expected.length !== provided.length) return false;

  return timingSafeEqual(expected, provided);
}
