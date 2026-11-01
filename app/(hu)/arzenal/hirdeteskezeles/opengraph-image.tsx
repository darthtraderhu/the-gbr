import { ogImage, OG_SIZE } from "@/lib/og";
import { ADS_SERVICE } from "@/lib/szolgaltatasok";

export const alt = "Google- és Meta-hirdetés | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Szolgáltatások / 02",
    titleLine1: "Google- és",
    titleLine2: "Meta-hirdetés",
    subtitle: ADS_SERVICE.description,
  });
}
