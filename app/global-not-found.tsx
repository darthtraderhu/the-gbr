import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

// Ez a fájl a next.config.ts-ben bekapcsolt kísérleti globalNotFound
// funkcióhoz kell — a több gyökér layout (app/(hu), app/en) miatt nincs
// egyetlen közös layout, amiből a Next.js össze tudná állítani a 404-et
// olyan URL-eknél, amik EGYIK route-csoporthoz sem illeszkednek. Ezért ez
// a fájl — a global-error.tsx-hez hasonlóan — szándékosan önálló:
// nem függ a (hu) vagy az en layouttól, csak beégetett színekkel dolgozik.
const COLOR = {
  ground: "#0B0E10",
  ink: "#EAEEE8",
  ink2: "#9FA9A2",
  dim: "#4A524E",
  rule: "#20272B",
  signal: "#A8D400",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "404 — THE GBR",
  description: "This page doesn't exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="hu">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: COLOR.ground,
          color: COLOR.ink,
          fontFamily: "Georgia, 'Times New Roman', serif",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", padding: "clamp(24px,6vw,100px)" }}>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
              fontSize: 10.5,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: COLOR.dim,
              margin: "0 0 18px",
            }}
          >
            404
          </p>
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(84px, 20vw, 280px)",
              letterSpacing: "-0.07em",
              lineHeight: 0.8,
              color: COLOR.rule,
            }}
          >
            4<span style={{ color: COLOR.signal }}>0</span>4
          </div>
          <h1
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(26px,4vw,52px)",
              lineHeight: 1.02,
              letterSpacing: "-0.042em",
              maxWidth: "20ch",
              margin: "32px 0 20px",
              color: COLOR.ink,
            }}
          >
            Nincs Jel. <span style={{ color: COLOR.ink2, fontWeight: 400 }}>This page isn&apos;t here.</span>
          </h1>
          <p
            style={{
              fontSize: 17.5,
              lineHeight: 1.6,
              color: COLOR.ink2,
              maxWidth: "52ch",
              margin: "0 0 32px",
            }}
          >
            Ez az oldal nem létezik, vagy elköltözött. / This page doesn&apos;t exist, or moved.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link
              href="/"
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                padding: "14px 24px",
                background: COLOR.signal,
                color: "#101400",
                border: `1px solid ${COLOR.signal}`,
                textDecoration: "none",
              }}
            >
              Vissza a főoldalra
            </Link>
            <Link
              href="/en"
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                padding: "14px 24px",
                background: "transparent",
                color: COLOR.ink,
                border: "1px solid #39413C",
                textDecoration: "none",
              }}
            >
              English site
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
