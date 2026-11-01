import { ogImage, OG_SIZE } from "@/lib/og";
import { OPS_SERVICE } from "@/lib/szolgaltatasok";

export const alt = "Weboldal-üzemeltetés | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Szolgáltatások / 06",
    titleLine1: "Weboldal-",
    titleLine2: "üzemeltetés",
    subtitle: OPS_SERVICE.description,
  });
}
