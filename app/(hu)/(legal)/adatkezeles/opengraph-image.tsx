import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Adatkezelési tájékoztató | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Jogi információk",
    titleLine1: "Adatkezelési",
    titleLine2: "tájékoztató",
    subtitle: "GBR Marketing Solutions Kft. · thegbr.eu",
  });
}
