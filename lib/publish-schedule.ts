// Megosztott cikk-ütemezési logika — a magyar (lib/posts.ts) és az angol
// (lib/posts-en.ts) cikkforrás is ugyanezt használja, hogy a két nyelv
// viselkedése ne csússzon szét.
export function getTodayBudapest(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Budapest" }).format(new Date());
}

export function isPublished(date: string): boolean {
  if (process.env.NODE_ENV === "development") return true;
  return date <= getTodayBudapest();
}
