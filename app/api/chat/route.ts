import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Bejövő kérés-séma: role-whitelist (csak "user"/"ai"), üzenethossz- és
// history-méret-korlát, hogy a végpont ne legyen nyitott költség-DoS vektor.
const chatMessageSchema = z.object({
  sender: z.enum(["user", "ai"]),
  text: z.string().trim().min(1).max(1000),
});

const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(1000),
  history: z.array(chatMessageSchema).max(20),
  // Az oldal nyelve (nem a böngészőé) — a rendszerprompt alapértelmezett
  // válasznyelvét ez adja, de a modell a látogató saját nyelvét követi, ha
  // az eltér (ld. buildSystemPrompt).
  locale: z.enum(["hu", "en"]).optional().default("hu"),
});

// A rendszerutasítás nyelvfüggő: az oldal nyelve az alapértelmezett
// válasznyelv, de a modell a látogató saját nyelvén válaszol, ha az más
// (ld. AiChat.tsx — a felület nyelve az oldalé marad, csak a beszélgetés
// nyelve követi a látogatót).
function buildSystemPrompt(locale: "hu" | "en"): string {
  if (locale === "en") {
    return `
      You are the AI assistant for THE GBR, a full-stack B2B development studio.
      Reply in English by default. If the visitor writes in a different language, reply in that language instead — the interface stays English, but you follow the visitor's own language.
      Style: professional, direct, confident, no fluff. Short, clear sentences. No emoji, or at most one where it genuinely helps.
      Goal: help the visitor understand what THE GBR does, then point them to the right next step.
      - For engagement models or pricing questions, point them to "Engagement" (/en/engagement).
      - If they're ready to start, or the question is complex, serious, contractual or pricing-specific, ask them to describe the project via "Contact" (/en/contact) — a person replies within two business days. You may also mention +36705139838.
      - Never quote a price or a deadline yourself — that comes from a person after scoping.
      Only answer questions related to B2B business, software development or marketing.
    `;
  }
  return `
    Te a THE GBR (full-stack B2B fejlesztő ügynökség) mesterséges intelligencia asszisztense vagy.
    Alapból magyarul válaszolsz. Ha a látogató más nyelven ír, azon a nyelven válaszolj — a felület magyar marad, de a beszélgetés nyelvét a látogatóé követed.
    A stílusod: profi, magabiztos és lényegretörő. Rövid, ütős mondatokban válaszolsz. Nem használsz hangulatjeleket, csak indokolt esetben, maximum egyet.
    Célod: segíteni eligazodni azon, mit csinál a THE GBR, aztán a megfelelő következő lépéshez irányítani.
    - Csomagokról vagy árazásról kérdezve irányítsd a "Csomagok" oldalra (/architektura).
    - Ha elindulna, vagy a kérdés összetett, komoly, szerződéses vagy árazási részletekre megy ki, kérd meg, hogy írja le a projektjét a kapcsolati oldalon (/init) — ott két munkanapon belül válaszol egy ember. A +36705139838-as számot is megemlítheted.
    - Sosem mondasz saját magad árat vagy határidőt — azt a felmérés után egy ember mondja.
    Csak B2B üzlettel, szoftverfejlesztéssel vagy marketinggel kapcsolatos kérdésre válaszolj.
  `;
}

export async function POST(req: Request) {
  // A catch ágban is kelleni fog a hibaüzenet nyelvéhez — a try-blokkon
  // kívül deklarálva, hogy elérhető legyen ott is.
  let requestLocale: "hu" | "en" = "hu";

  try {
    const body = await req.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      // A séma-validálás elbukott, de a nyelvet — csak a hibaüzenethez —
      // még megpróbáljuk kiolvasni a nyers testből.
      const rawLocale = (body as { locale?: unknown })?.locale;
      const errorLocale = rawLocale === "en" ? "en" : "hu";
      return NextResponse.json(
        {
          reply:
            errorLocale === "en"
              ? "SYS.ERROR: Invalid request format."
              : "SYS.ERROR: Érvénytelen kérés formátum.",
        },
        { status: 400 }
      );
    }

    const { message, history, locale } = parsed.data;
    requestLocale = locale;

    const systemPrompt = buildSystemPrompt(locale);

    // Előző üzenetek formázása az OpenAI-nak (hogy emlékezzen a beszélgetésre)
    const formattedHistory: ChatCompletionMessageParam[] = history.map((msg) => ({
      role: msg.sender === "ai" ? "assistant" : "user",
      content: msg.text,
    }));

    // OpenAI API hívás (gpt-3.5-turbo a leggyorsabb és költséghatékonyabb a chathez)
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        ...formattedHistory,
        { role: "user", content: message },
      ],
      temperature: 0.7, // Kreativitás (0.7 pont jó egy asszisztensnek)
      max_tokens: 200, // Ne írjon regényeket
    });

    return NextResponse.json({ reply: response.choices[0].message.content });
  } catch (error) {
    // Strukturált naplózás: OpenAI API-hiba esetén a státuszkód, hibakód és
    // típus is látszik a szerver logban, nem csak egy generikus Error-dump.
    if (error instanceof OpenAI.APIError) {
      console.error("OpenAI API hiba:", {
        status: error.status,
        code: error.code,
        type: error.type,
        message: error.message,
        requestID: error.requestID,
      });
    } else {
      console.error("Váratlan hiba a /api/chat végponton:", error);
    }

    return NextResponse.json(
      {
        reply:
          requestLocale === "en"
            ? "SYS.ERROR: Couldn't reach the AI service. Please email gabor@thegbr.eu or call +36705139838."
            : "SYS.ERROR: A neurális kapcsolat megszakadt az OpenAI szervereivel. Kérem, hívja a +36705139838-as forródrótot.",
      },
      { status: 500 }
    );
  }
}
