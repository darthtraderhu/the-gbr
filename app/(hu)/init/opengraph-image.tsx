import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Beszéljünk a projektedről | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Kapcsolat",
    titleLine1: "Beszéljünk",
    titleLine2: "a projektedről",
    subtitle: "Mondd el, mit szeretnél elérni, és két munkanapon belül válaszolunk. Ha nem illünk össze, azt is megmondjuk.",
  });
}
