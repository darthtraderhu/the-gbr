import { NextResponse } from "next/server";
import { z } from "zod";
import { POSZT_KOD } from "@/lib/poszt-kovetes";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { isAllowedOrigin } from "@/lib/request-guard";
import { salesUrl } from "@/lib/leads";

// Kattintás egy közösségi posztunk linkjéről (app/components/PosztKovetes).
// Csak a követőkódot adjuk tovább a sales-rendszernek; IP-t, sütit,
// böngészőadatot nem. A válasz mindig 204, a látogatót semmi nem akasztja meg.

const schema = z.object({ code: z.string().regex(POSZT_KOD) });

export async function POST(req: Request) {
  const none = new NextResponse(null, { status: 204 });
  if (!isAllowedOrigin(req.headers.get("origin"))) return none;
  if (isRateLimited(`kattintas:${getClientIp(req)}`, { max: 20 })) return none;

  const raw = await req.text();
  if (raw.length > 200) return none;
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return none;
  }
  const parsed = schema.safeParse(json);
  const token = process.env.SALES_INGEST_TOKEN;
  if (!parsed.success || !token) return none;

  try {
    const res = await fetch(salesUrl("/api/kozzetetel/kattintas"), {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ code: parsed.data.code }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error("[KATTINTAS-ERROR]", res.status);
  } catch (error) {
    console.error("[KATTINTAS-ERROR]", error);
  }
  return none;
}
