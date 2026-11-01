import { ogImage, OG_SIZE } from "@/lib/og";
import { IT_SERVICE } from "@/lib/szolgaltatasok";

export const alt = "Irodai IT-üzemeltetés | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Szolgáltatások / 09",
    titleLine1: "Irodai IT-",
    titleLine2: "üzemeltetés",
    subtitle: IT_SERVICE.description,
  });
}
