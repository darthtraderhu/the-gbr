import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "About THE GBR | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "About",
    titleLine1: "About",
    titleLine2: "THE GBR",
    subtitle: "Two decades in commerce, six years as a company, and our own products in production.",
  });
}
