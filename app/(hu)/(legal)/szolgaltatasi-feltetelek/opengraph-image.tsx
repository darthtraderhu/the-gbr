import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Általános szerződési feltételek | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Jogi információk",
    titleLine1: "Szolgáltatási",
    titleLine2: "feltételek",
    subtitle: "GBR Marketing Solutions Kft. · thegbr.eu",
  });
}
