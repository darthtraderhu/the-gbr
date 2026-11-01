import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Írások | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Írások",
    titleLine1: "Írások",
    titleLine2: "a munkánkról",
    subtitle: "Weboldalról, SEO-ról, AI-ról és üzemeltetésről. Amit megcsinálunk, arról írunk is.",
  });
}
