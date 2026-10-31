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
      titleLine2="tíz terület"
      subtitle="Weboldal és webshop fejlesztés, performance marketing, egyedi szoftver és automatizáció, AI-integráció, videó, web-üzemeltetés, akadálymentesítés, Pulzus, irodai IT-üzemeltetés, átvilágítás és ajánlás. Tíz terület, egy értékesítési rendszer, egy felelős kapcsolattartóval."
    />,
    { ...size, fonts }
  );
}
