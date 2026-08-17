import { ImageResponse } from "next/og";
import { loadOgFonts, OgTemplate, OG_SIZE } from "@/lib/og";

export const alt = "Csomagok és árazás | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    <OgTemplate
      topLabel="Csomagok és árazás"
      titleLine1="Csomagok"
      titleLine2="és árazás"
      subtitle="Három tipikus felállás weboldal-fejlesztéstől a folyamatos üzemeltetésig. Tervezd meg a keretet, és nézd meg, mit kapsz érte."
    />,
    { ...size, fonts }
  );
}
