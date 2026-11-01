import { ogImage, OG_SIZE } from "@/lib/og";
import { ACCESS_SERVICE } from "@/lib/szolgaltatasok";

export const alt = "Akadálymentesítés | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Szolgáltatások / 07",
    titleLine1: "Akadály-",
    titleLine2: "mentesítés",
    subtitle: ACCESS_SERVICE.description,
  });
}
