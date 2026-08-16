import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { timingSafeEqual } from 'crypto';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Konstans idejű összehasonlítás: nem áll meg az első eltérő karakternél,
// így az időzítésből nem következtethető ki a helyes CRON_SECRET.
function isAuthorized(authHeader: string | null, cronSecret: string): boolean {
  if (!authHeader) return false;

  const expected = Buffer.from(`Bearer ${cronSecret}`);
  const provided = Buffer.from(authHeader);

  if (expected.length !== provided.length) return false;

  return timingSafeEqual(expected, provided);
}

export async function GET(request: Request) {
  // 1. Biztonsági pajzs
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("🔥 HIBA: A CRON_SECRET környezeti változó nincs beállítva!");
    return new NextResponse('Szerver-konfigurációs hiba', { status: 500 });
  }

  const authHeader = request.headers.get('authorization');
  if (!isAuthorized(authHeader, cronSecret)) {
    console.error("🔥 HIBA: Rossz vagy hiányzó CRON_SECRET!");
    return new NextResponse('Hozzáférés megtagadva', { status: 401 });
  }

  try {
    console.log("🚀 1. LÉPÉS: AI szövegírás indítása...");
    
    // 2. Az AI megírja a kőkemény posztot
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Villámgyors és költséghatékony modell
      messages: [
        { 
          role: "system", 
          content: "Te a THE GBR Full-Stack B2B ügynökség zseniális, cyberpunk stílusú marketing igazgatója vagy. Írj egy kőkemény, figyelemfelkeltő, katarzist kiváltó Facebook posztot magyar cégvezetőknek. Témák: Next.js sebesség, AI chatbotok, digitális transzformáció, elavult WordPress oldalak veszélyei. Használj neonos és tech emojikat (pl. 🦾, 🔥, 🚀, 💻), tagolva írj. A poszt végén MINDIG legyen ott a kőkemény CTA és a link: 'Lépj be a Mátrixba: https://thegbr.eu'" 
        },
        { 
          role: "user", 
          content: "Generálj egy vadonatúj, egyedi, elképesztően meggyőző szakmai posztot!" 
        }
      ],
      temperature: 0.85
    });

    const postContent = completion.choices[0].message.content;
    console.log("✅ AI szöveg kész! Készülünk a Meta API hívásra...");

    // 3. Kapcsolódás a Meta (Facebook) Graph API-hoz
    const pageId = process.env.FACEBOOK_PAGE_ID;
    const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

    if (!pageId || !accessToken) {
      throw new Error('Hiányzó Facebook API azonosítók a páncélteremből!');
    }

    console.log(`🚀 2. LÉPÉS: Posztolás a Facebookra (Page ID: ${pageId})...`);
    
    // Kilőjük a posztot közvetlenül a Facebook oldaladra
    const fbResponse = await fetch(`https://graph.facebook.com/${pageId}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: postContent,
        access_token: accessToken
      })
    });

    const fbData = await fbResponse.json();

    if (fbData.error) {
      // ITT A LÉNYEG: Ha a Meta hisztizik, a nyers igazságot nyomtatjuk a naplóba!
      console.error("🔥 META API KÖZVETLEN HIBA:", JSON.stringify(fbData.error, null, 2));
      throw new Error(`Meta API Hiba: ${fbData.error.message}`);
    }

    console.log("✅ SIKERES POSZTOLÁS! Facebook ID:", fbData.id);
    return NextResponse.json({ 
      success: true, 
      facebookPostId: fbData.id, 
      generatedText: postContent 
    });

  } catch (error: any) {
    // ITT A MÁSIK LÉNYEG: Kőkeményen az arcunkba üvölti a végzetes hibát a terminálban!
    console.error("🚨 KŐKEMÉNY RENDSZERHIBA:", error);
    return NextResponse.json({ success: false, error: error.message || error }, { status: 500 });
  }
}