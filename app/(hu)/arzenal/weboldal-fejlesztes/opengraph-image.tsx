import { ogImage, OG_SIZE } from "@/lib/og";
import { WEB_SERVICE } from "@/lib/szolgaltatasok";

export const alt = "Weboldal- és webshopfejlesztés | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Szolgáltatások / 01",
    titleLine1: "Weboldal",
    titleLine2: "és webshop",
    subtitle: WEB_SERVICE.description,
  });
}
