import type { MetadataRoute } from "next";

// Webalkalmazás-manifest: a kezdőképernyőre mentett ikon és a böngésző
// keretszíne. A színek az arculati tokenek (globals.css) értékei — a manifest
// nem tud CSS-változót olvasni, ezért itt literálként szerepelnek.
// Az ikonok forrása az app/icon.svg (a nyúl motívumból egyszerűsített jel).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "THE GBR",
    short_name: "THE GBR",
    description:
      "Weboldalak és webshopok, amiket mi építünk és mi üzemeltetünk tovább — Next.js alapokon, kizárólag B2B cégeknek.",
    lang: "hu",
    start_url: "/",
    display: "browser",
    background_color: "#EEF0EC", // alap
    theme_color: "#14171A", // tinta
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
