// Dátumformázó, ami sem szerver-, sem kliens-komponensből importálva nem
// húzza be az fs/gray-matter/remark függőségeket (ld. lib/posts.ts) —
// azért van külön fájlban, mert a HirekClient ("use client") is használja.
export function formatHungarianDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("hu-HU", { dateStyle: "long" }).format(date);
}
