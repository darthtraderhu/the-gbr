import type { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/posts";
import { getSortedEnPostsData } from "@/lib/posts-en";
import { SITE_URL } from "@/lib/site";
import { HU_TO_EN, EN_TO_HU, TRANSLATED_ARTICLES } from "@/lib/i18n-routes";

// A cikk-ütemezés (lib/posts.ts, lib/posts-en.ts) miatt a sitemap is naponta
// frissül, hogy egy ütemezett cikk a dátuma napján magától bekerüljön, ne
// csak új deploy után.
export const revalidate = 86400;

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/arzenal", changeFrequency: "monthly", priority: 0.8 },
  { path: "/architektura", changeFrequency: "monthly", priority: 0.8 },
  { path: "/szindikatus", changeFrequency: "monthly", priority: 0.6 },
  { path: "/seo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/hirek", changeFrequency: "weekly", priority: 0.7 },
  { path: "/init", changeFrequency: "yearly", priority: 0.6 },
  { path: "/adatkezeles", changeFrequency: "yearly", priority: 0.3 },
  { path: "/impresszum", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie-tajekoztato", changeFrequency: "yearly", priority: 0.3 },
  { path: "/ai-tajekoztato", changeFrequency: "yearly", priority: 0.3 },
  { path: "/szolgaltatasi-feltetelek", changeFrequency: "yearly", priority: 0.3 },
];

// Az angol fának csak azok az útvonalai vannak, amiknek van tartalma
// (ld. lib/i18n-routes.ts HU_TO_EN) — a jogi oldalaknak nincs angol
// megfelelője, azok nem kerülnek ide külön.
const enRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/en", changeFrequency: "weekly", priority: 1 },
  { path: "/en/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/en/engagement", changeFrequency: "monthly", priority: 0.8 },
  { path: "/en/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/en/seo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/en/writing", changeFrequency: "weekly", priority: 0.7 },
  { path: "/en/contact", changeFrequency: "yearly", priority: 0.6 },
];

function huLanguageAlternates(huPath: string) {
  const en = HU_TO_EN[huPath];
  return en
    ? {
        languages: {
          hu: `${SITE_URL}${huPath || "/"}`,
          en: `${SITE_URL}${en}`,
          "x-default": `${SITE_URL}${huPath || "/"}`,
        },
      }
    : undefined;
}

function enLanguageAlternates(enPath: string) {
  const hu = EN_TO_HU[enPath];
  return hu
    ? {
        languages: {
          hu: `${SITE_URL}${hu}`,
          en: `${SITE_URL}${enPath}`,
          "x-default": `${SITE_URL}${hu}`,
        },
      }
    : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: huLanguageAlternates(route.path),
  }));

  const enStaticEntries: MetadataRoute.Sitemap = enRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: enLanguageAlternates(route.path),
  }));

  const posts = getSortedPostsData();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const enSlug = TRANSLATED_ARTICLES[post.id];
    return {
      url: `${SITE_URL}/hirek/${post.id}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: enSlug
        ? {
            languages: {
              hu: `${SITE_URL}/hirek/${post.id}`,
              en: `${SITE_URL}/en/writing/${enSlug}`,
            },
          }
        : undefined,
    };
  });

  const enPosts = getSortedEnPostsData();
  const enPostEntries: MetadataRoute.Sitemap = enPosts.map((post) => ({
    url: `${SITE_URL}/en/writing/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: {
      languages: {
        hu: `${SITE_URL}/hirek/${post.huSlug}`,
        en: `${SITE_URL}/en/writing/${post.id}`,
      },
    },
  }));

  return [...staticEntries, ...enStaticEntries, ...postEntries, ...enPostEntries];
}
