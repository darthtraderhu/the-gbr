import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Impresszum | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Jogi információk",
    titleLine1: "Impresszum",
    titleLine2: "THE GBR",
    subtitle: "GBR Marketing Solutions Kft. · thegbr.eu",
  });
}
