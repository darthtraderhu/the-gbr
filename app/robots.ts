import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Az AI-keresők és -asszisztensek robotjai név szerint is engedélyt kapnak.
// A "*" szabály már most is beengedné őket, de az explicit lista
// ellenőrizhető: a /seo oldal erre hivatkozik bizonyítékként. Egy
// user-agent-csoport felülírja a "*"-ot, ezért az /api/ tiltás itt is kell.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
