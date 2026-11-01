import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Rólunk | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Rólunk",
    titleLine1: "Rólunk",
    titleLine2: "így dolgozunk",
    subtitle: "Húsz év értékesítési tapasztalat, hat éves cég, és egy szűk csapat megbízható partnerekkel. Így dolgozunk, és ezt vállaljuk.",
  });
}
