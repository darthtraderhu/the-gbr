import { ogImage, OG_SIZE } from "@/lib/og";
import { PULZUS_SERVICE } from "@/lib/szolgaltatasok";

export const alt = "Pulzus havi figyelő | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Szolgáltatások / 08",
    titleLine1: "Pulzus",
    titleLine2: "havi figyelő",
    subtitle: PULZUS_SERVICE.description,
  });
}
