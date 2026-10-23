const WINDOW_MS = 10 * 60 * 1000; // 10 perc
const MAX_REQUESTS = 3;

type RateLimitOptions = {
  windowMs?: number;
  max?: number;
};

// In-memory ablak IP-nként. Ez a folyamat memóriájában él, tehát egyetlen
// warm szerverpéldányon belül működik helyesen — több párhuzamos Vercel
// függvénypéldány esetén nem oszt meg állapotot egymás közt. Amíg nincs
// megosztott store (pl. Supabase/Upstash), ez a legjobb elérhető védelem,
// nem egy garantáltan pontos globális limit.
const hits = new Map<string, number[]>();

// A kulcsot végpontonként előtagolni kell (pl. "chat:<ip>"), ha a végpont
// saját korlátot használ — különben a végpontok egymás keretét fogyasztják.
export function isRateLimited(
  key: string,
  { windowMs = WINDOW_MS, max = MAX_REQUESTS }: RateLimitOptions = {}
): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);
  return false;
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}
