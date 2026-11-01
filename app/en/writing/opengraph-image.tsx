import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Writing from the work | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Writing",
    titleLine1: "Writing",
    titleLine2: "from the work",
    subtitle: "Not a content mill. What we write about, we did first.",
  });
}
