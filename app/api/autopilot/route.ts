import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { timingSafeEqual } from "crypto";
import { getPostMarkdown, getSortedPostsData } from "@/lib/posts";
import { getTodayBudapest } from "@/lib/publish-schedule";
import { SITE_URL } from "@/lib/site";

// A kulcsot az ANTHROPIC_API_KEY környezeti változóból olvassa.
const anthropic = new Anthropic();

const POST_MODEL = "claude-opus-5-5";
const GRAPH_API = "https://graph.facebook.com/v21.0";

// A cikkek közötti napokon ezeken a napokon egy korábbi cikket ajánlunk
// (0 = vasárnap … 6 = szombat): kedd és csütörtök.
const ARCHIVE_DAYS = [2, 4];
// Az ennél frissebb cikkek még nem kerülnek az archív körforgásba.
const ARCHIVE_MIN_AGE_DAYS = 30;
// A 2026. augusztus előtti cikkek még a régi hangon, alá nem támasztott
// állításokkal készültek — amíg nincsenek átírva, nem ajánljuk őket újra.
const ARCHIVE_SINCE = "2026-08-01";

// A cikk a márka névjegye, a poszt csak ajánló hozzá: semmi olyat nem
// állíthat, ami a cikkben nincs benne (ld. AGENTS.md — nincs alá nem
// támasztott állítás, ügyfél nem nevezhető meg).
const SYSTEM_PROMPT = `
Te a THE GBR (GBR Marketing Solutions Kft.) Facebook-oldalának szerkesztője vagy. A THE GBR B2B ügynökség: weboldal- és webshopfejlesztés, üzemeltetés, hirdetés, AI-integráció, akadálymentesítés, irodai IT.
Feladat: rövid ajánló posztot írsz egy most megjelent cikkhez, magyar cégvezetőknek és döntéshozóknak.

Szabályok:
- Csak olyat állíts, ami a cikkben szerepel. Számot, százalékot, eredményt, garanciát, rangsort ne találj ki.
- Ügyfelet, márkát, domaint ne nevezz meg.
- Hangnem: nyugodt, szakmai, közérthető. Nem harsány, nem kattintásvadász, nem "kőkemény".
- Felépítés: egy mondat a problémáról, amit az olvasó ismer; két-három mondat arról, mit tud meg a cikkből; egy rövid mondat, hogy érdemes elolvasni.
- Ha a cikk korábbi (archív), ne írd, hogy most jelent meg; a téma időszerűségéből indulj ki.
- Hossz: 350–600 karakter. Legfeljebb egy emoji, de inkább egy se. Hashtag nincs.
- Linket ne írj a szövegbe, azt a rendszer csatolja.
- Csak a poszt szövegét add vissza, bevezető vagy magyarázat nélkül.
`.trim();

// Konstans idejű összehasonlítás: nem áll meg az első eltérő karakternél,
// így az időzítésből nem következtethető ki a helyes CRON_SECRET.
function isAuthorized(authHeader: string | null, cronSecret: string): boolean {
  if (!authHeader) return false;

  const expected = Buffer.from(`Bearer ${cronSecret}`);
  const provided = Buffer.from(authHeader);

  if (expected.length !== provided.length) return false;

  return timingSafeEqual(expected, provided);
}

// Napok száma 1970-01-01 óta egy ÉÉÉÉ-HH-NN dátumra (UTC-ben számolva, hogy
// az óraátállítás ne okozzon eltérést).
function dayNumber(date: string): number {
  return Math.floor(Date.parse(`${date}T00:00:00Z`) / 86_400_000);
}

type PostSummary = ReturnType<typeof getSortedPostsData>[number];

// Rögzített körforgás adatbázis nélkül: az archív napok sorszáma adja, melyik
// cikk jön. Ha új cikk kerül az archívumba, a sorrend eltolódhat, így egy cikk
// néha a vártnál előbb vagy később kerül elő újra — ez elfogadható ár azért,
// hogy ne kelljen állapotot tárolni.
function pickArchivePost(published: PostSummary[], today: string): PostSummary | null {
  const weekday = new Date(`${today}T00:00:00Z`).getUTCDay();
  const slotInWeek = ARCHIVE_DAYS.indexOf(weekday);
  if (slotInWeek === -1) return null;

  const todayNumber = dayNumber(today);
  const pool = published
    .filter((post) => post.date >= ARCHIVE_SINCE)
    .filter((post) => todayNumber - dayNumber(post.date) >= ARCHIVE_MIN_AGE_DAYS)
    .sort((a, b) => (a.date === b.date ? a.id.localeCompare(b.id) : a.date.localeCompare(b.date)));
  if (pool.length === 0) return null;

  const slot = Math.floor(todayNumber / 7) * ARCHIVE_DAYS.length + slotInWeek;
  return pool[slot % pool.length];
}

async function writePost(article: ReturnType<typeof getPostMarkdown>, isArchive: boolean): Promise<string> {
  const response = await anthropic.beta.messages.create({
    model: POST_MODEL,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    output_config: { effort: "medium" },
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    messages: [
      {
        role: "user",
        content: `${isArchive ? "Korábbi (archív) cikk." : "Ma megjelent cikk."}\nCím: ${article.title}\nRövid leírás: ${article.excerpt}\n\nA cikk szövege:\n${article.content}`,
      },
    ],
  });

  const text = response.content
    .filter((block): block is Anthropic.Beta.BetaTextBlock => block.type === "text")
    .map((block) => block.text)
    .join("")
    .trim();

  if (response.stop_reason !== "end_turn" || !text) {
    throw new Error(`A posztszöveg nem készült el (stop_reason: ${response.stop_reason})`);
  }
  return text;
}

async function publishToFacebook(message: string, link: string): Promise<string> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!pageId || !accessToken) {
    throw new Error("Hiányzik a FACEBOOK_PAGE_ID vagy a FACEBOOK_PAGE_ACCESS_TOKEN környezeti változó");
  }

  // A link mezőből a Facebook a cikk OG-képével, címével és leírásával
  // kártyát generál — külön képet nem kell feltölteni.
  const response = await fetch(`${GRAPH_API}/${pageId}/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, link, access_token: accessToken }),
  });
  const data: { id?: string; error?: { message?: string } } = await response.json();
  if (!response.ok || !data.id) {
    throw new Error(`Meta API hiba: ${data.error?.message ?? response.status}`);
  }

  // Nem elég, hogy nem jött hiba: visszaolvassuk, hogy a poszt tényleg létezik.
  const check = await fetch(
    `${GRAPH_API}/${data.id}?fields=id,permalink_url&access_token=${encodeURIComponent(accessToken)}`
  );
  const checkData: { id?: string; permalink_url?: string } = await check.json();
  if (!check.ok || checkData.id !== data.id) {
    throw new Error(`A poszt (${data.id}) létrehozása után nem olvasható vissza`);
  }
  return checkData.permalink_url ?? data.id;
}

// Naponta fut (vercel.json). Ha az ütemezés szerint ma élesedik egy cikk,
// azt ajánlja; ha nem, az ARCHIVE_DAYS napjain egy korábbi cikket. A többi
// napon nem posztol. Kézi teszt (CRON_SECRET-tel):
//   ?id=<cikk-slug>   egy adott, már megjelent cikkhez
//   &dryRun=1         csak megírja a szöveget, nem posztol
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("[AUTOPILOT] A CRON_SECRET környezeti változó nincs beállítva");
    return new NextResponse("Szerver-konfigurációs hiba", { status: 500 });
  }
  if (!isAuthorized(request.headers.get("authorization"), cronSecret)) {
    return new NextResponse("Hozzáférés megtagadva", { status: 401 });
  }

  const params = new URL(request.url).searchParams;
  const requestedId = params.get("id");
  const dryRun = params.get("dryRun") === "1";

  // Csak megjelent cikk jöhet szóba — a getSortedPostsData már kiszűri a
  // jövőbe ütemezetteket, így egy kézi ?id= sem tud korán posztolni.
  const published = getSortedPostsData();
  const today = getTodayBudapest();
  let targets: PostSummary[];
  let isArchive = false;
  if (requestedId) {
    targets = published.filter((post) => post.id === requestedId);
    isArchive = targets.some((post) => post.date !== today);
  } else {
    targets = published.filter((post) => post.date === today);
    if (targets.length === 0) {
      const archivePost = pickArchivePost(published, today);
      if (archivePost) {
        targets = [archivePost];
        isArchive = true;
      }
    }
  }

  if (targets.length === 0) {
    return NextResponse.json({
      success: true,
      posted: [],
      note: requestedId
        ? `Nincs megjelent cikk ezzel az azonosítóval: ${requestedId}`
        : `Ma (${today}) nincs posztolnivaló`,
    });
  }

  const results: Array<{ id: string; text: string; permalink?: string }> = [];
  try {
    for (const post of targets) {
      const text = await writePost(getPostMarkdown(post.id), isArchive);
      const link = `${SITE_URL}/hirek/${post.id}`;
      const permalink = dryRun ? undefined : await publishToFacebook(text, link);
      console.log("[AUTOPILOT]", dryRun ? "próbafuttatás" : "kiposztolva", isArchive ? "(archív)" : "(új)", post.id, permalink ?? "");
      results.push({ id: post.id, text, permalink });
    }
    return NextResponse.json({ success: true, dryRun, posted: results });
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error("[AUTOPILOT] Anthropic API hiba:", { status: error.status, message: error.message, requestID: error.requestID });
    } else {
      console.error("[AUTOPILOT] Hiba:", error);
    }
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, posted: results, error: message }, { status: 500 });
  }
}
