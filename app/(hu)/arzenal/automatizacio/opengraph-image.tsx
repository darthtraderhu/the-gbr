import { ogImage, OG_SIZE } from "@/lib/og";
import { SOFTWARE_SERVICE } from "@/lib/szolgaltatasok";

export const alt = "Folyamat-automatizálás | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Szolgáltatások / 03",
    titleLine1: "Folyamat-",
    titleLine2: "automatizálás",
    subtitle: SOFTWARE_SERVICE.description,
  });
}
