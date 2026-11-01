import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "SEO és AEO | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "SEO és AEO",
    titleLine1: "SEO",
    titleLine2: "és AEO",
    subtitle: "Technikai SEO és strukturált adat, amitől a Google és az AI-keresők is megtalálják a céged. Ezt az oldalt is így építettük — ellenőrizheted.",
  });
}
