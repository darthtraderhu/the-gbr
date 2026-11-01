import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { isCronAuthorized } from "@/lib/cron-auth";
import { submitToIndexNow } from "@/lib/indexnow";
import { getSortedPostsData } from "@/lib/posts";
import { getSortedEnPostsData } from "@/lib/posts-en";
import { getTodayBudapest } from "@/lib/publish-schedule";
import { SITE_URL } from "@/lib/site";

// Naponta fut (vercel.json), a cikkek élesedése után. Ha ma megjelent egy
// ütemezett cikk (HU vagy EN), annak URL-jét és a cikklistát jelzi az
// IndexNow-nak. A többi napon nem küld semmit — a protokoll csak a
// változott URL-eket kéri. Kézi futtatás (CRON_SECRET-tel):
//   ?all=1   a sitemap összes URL-je (pl. új oldalak után egyszer)
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("[INDEXNOW] A CRON_SECRET környezeti változó nincs beállítva");
    return new NextResponse("Szerver-konfigurációs hiba", { status: 500 });
  }
  if (!isCronAuthorized(request.headers.get("authorization"), cronSecret)) {
    return new NextResponse("Hozzáférés megtagadva", { status: 401 });
  }

  const all = new URL(request.url).searchParams.get("all") === "1";
  const today = getTodayBudapest();

  let urls: string[];
  if (all) {
    urls = sitemap().map((entry) => entry.url);
  } else {
    const huToday = getSortedPostsData().filter((post) => post.date === today);
    const enToday = getSortedEnPostsData().filter((post) => post.date === today);
    urls = [
      ...huToday.map((post) => `${SITE_URL}/hirek/${post.id}`),
      ...enToday.map((post) => `${SITE_URL}/en/writing/${post.id}`),
    ];
    if (huToday.length > 0) urls.push(`${SITE_URL}/hirek`);
    if (enToday.length > 0) urls.push(`${SITE_URL}/en/writing`);
  }

  if (urls.length === 0) {
    return NextResponse.json({ success: true, submitted: [], note: `Ma (${today}) nincs új URL` });
  }

  try {
    const status = await submitToIndexNow(urls);
    console.log("[INDEXNOW] elküldve", status, urls.length, "URL");
    return NextResponse.json({ success: true, status, submitted: urls });
  } catch (error) {
    console.error("[INDEXNOW] Hiba:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message }, { status: 502 });
  }
}
