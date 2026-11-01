import { ogImage, OG_SIZE } from "@/lib/og";
import { AUDIT_SERVICE } from "@/lib/szolgaltatasok";

export const alt = "Átvilágítás, dizájn- és rendszerajánlás | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Szolgáltatások / 10",
    titleLine1: "Átvilágítás",
    titleLine2: "és ajánlás",
    subtitle: AUDIT_SERVICE.description,
  });
}
