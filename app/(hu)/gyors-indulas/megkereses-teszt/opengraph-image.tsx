import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Megkeresés-teszt | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Fix áras első lépés / 01",
    titleLine1: "Megkeresés-",
    titleLine2: "teszt",
    subtitle: "Három próba-megkeresés űrlapon, e-mailben és telefonon, időbélyeges riporttal. 49 000 Ft + ÁFA, 7 munkanap.",
  });
}
