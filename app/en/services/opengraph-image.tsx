import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Services ten areas | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Services",
    titleLine1: "Services",
    titleLine2: "ten areas",
    subtitle: "Web and commerce, performance marketing, custom software and automation, AI integration, video, web operations, accessibility, monitoring, IT operations, audit and proposal. Ten areas, one sales system, one accountable contact.",
  });
}
