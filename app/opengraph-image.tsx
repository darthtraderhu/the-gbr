import { ImageResponse } from "next/og";
import { loadOgFonts, OgTemplate, OG_SIZE } from "@/lib/og";

export const alt = "THE GBR — Fejlesztés és üzemeltetés B2B cégeknek";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    <OgTemplate
      topLabel="THE GBR"
      titleLine1="Nem mondjuk"
      titleLine2="hogy gyors"
      subtitle="Weboldalak és webshopok, amiket mi építünk és mi üzemeltetünk tovább — Next.js alapokon, kizárólag B2B cégeknek."
    />,
    { ...size, fonts }
  );
}
