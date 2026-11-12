import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Gyorsátvilágítás | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Fix áras első lépés / 02",
    titleLine1: "Gyors-",
    titleLine2: "átvilágítás",
    subtitle: "Az oldalad tíz legfontosabb hibája sorrendben, javítással. 49 000 Ft + ÁFA, 5 munkanap.",
  });
}
