import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Development partner | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Home",
    titleLine1: "Development",
    titleLine2: "partner",
    subtitle: "EU-based development studio. Next.js builds, commerce, and ongoing operations — as your team, white-label or named.",
  });
}
