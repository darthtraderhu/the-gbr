import { ogImage, OG_SIZE } from "@/lib/og";
import { VIDEO_SERVICE } from "@/lib/szolgaltatasok";

export const alt = "Céges videó | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Szolgáltatások / 05",
    titleLine1: "Céges",
    titleLine2: "videó",
    subtitle: VIDEO_SERVICE.description,
  });
}
