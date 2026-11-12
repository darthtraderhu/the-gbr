import { ogImage, OG_SIZE } from "@/lib/og";
import { formatFt, getTermek } from "@/lib/gyors-indulas";

const termek = getTermek("ai-lathatosag");

export const alt = `${termek?.name ?? "Fix áras első lépés"} | THE GBR`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  const words = (termek?.name ?? "Fix áras első lépés").split(" ");
  const half = Math.ceil(words.length / 2);
  return ogImage({
    topLabel: `Fix áras első lépés / ${termek?.n ?? ""}`,
    titleLine1: words.slice(0, half).join(" "),
    titleLine2: words.slice(half).join(" "),
    subtitle: termek ? `${termek.summary} ${formatFt(termek.arNetto)} + ÁFA, ${termek.hatarido}.` : "",
  });
}
