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
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { reply: "SYS.ERROR: Érvénytelen kérés formátum." },
        { status: 400 }
      );
    }

    const { message, history } = parsed.data;

    // A THE GBR RENDSZERUTASÍTÁS (Prompt)
    const systemPrompt = `
      Te a THE GBR (egy prémium Full-Stack B2B ügynökség) mesterséges intelligencia asszisztense vagy. 
      A neved GBR_AI_NODE. 
      A stílusod: profi, technokrata, magabiztos és lényegretörő (zéró bullshit). 
      Rövid, ütős mondatokban válaszolsz. Nem használsz hangulatjeleket, csak indokolt esetben maximum egyet.
      Célod: Eladni a THE GBR Next.js és AI alapú webes architektúráit. 
      Ha az ügyfél árakat kér, tereld a "Csomagok" menüpont ROI kalkulátorához. 
      Ha konkrétan el akar indulni, kérd meg, hogy kattintson a 'Projekt Indítása' gombra, vagy hívja a +36705139838 számot.
      Ne válaszolj olyan kérdésekre, ami nem B2B üzlet, programozás vagy marketing.
    `;

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
    console.error("OpenAI API Hiba:", error);
    return NextResponse.json(
      {
        reply:
          "SYS.ERROR: A neurális kapcsolat megszakadt az OpenAI szervereivel. Kérem, hívja a +36705139838-as forródrótot.",
      },
      { status: 500 }
    );
  }
}
