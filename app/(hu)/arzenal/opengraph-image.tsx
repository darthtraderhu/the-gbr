import { ImageResponse } from "next/og";
import { loadOgFonts, OgTemplate, OG_SIZE } from "@/lib/og";

export const alt = "Szolgáltatások | THE GBR";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    <OgTemplate
      topLabel="Szolgáltatások"
      titleLine1="Szolgáltatások"
      titleLine2="nyolc terület"
      subtitle="Weboldal és webshop fejlesztés, performance marketing, AI-integráció, videó, web-üzemeltetés, akadálymentesítés, Pulzus és irodai IT-üzemeltetés. Nyolc terület, házon belül."
    />,
    { ...size, fonts }
  );
}
