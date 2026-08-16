import type { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts = getSortedPostsData();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/hirek/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
