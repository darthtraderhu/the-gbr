import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Fix áras első lépések | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    topLabel: "Fix áras első lépések",
    titleLine1: "Kicsiben",
    titleLine2: "kezdünk",
    subtitle: "Kicsi, rögzített tartalmú munkák pontos nettó árral és határidővel, cégeknek.",
  });
}
