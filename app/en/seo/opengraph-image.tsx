import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Search and AI visibility | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Search and AI visibility",
    titleLine1: "Search and",
    titleLine2: "AI visibility",
    subtitle: "Technical SEO and structured data that both Google and AI search can read. Check ours — the links are live.",
  });
}
