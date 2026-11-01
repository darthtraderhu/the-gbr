import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
// Megosztott OG-kép sablon és betűtöltő — a design/ látványtervek sötét
// "műszer" nyelvén (ld. AGENTS.md — Arculat, 2026.08). A satori (a next/og
// motorja) nem ismeri a CSS custom property-ket, ezért itt a token-
// értékeket szükségszerűen literál hex konstansként vesszük át — ez a
// design token rendszer egyetlen kivétele, kizárólag technikai okból.
export const OG_SIZE = { width: 1200, height: 630 };

export const OG_COLOR = {
  ground: "#0B0E10",
  ink: "#EAEEE8",
  dim: "#4A524E",
  signal: "#A8D400",
} as const;

// A satori (a next/og motorja) woff2-t nem tud olvasni, ezért az OG-képekhez
// a lib/fonts.ts betűinek TTF-változata az assets/fonts/og mappában van
// (Archivo 900, Source Serif 4 400, IBM Plex Mono 500; SIL OFL). Korábban
// build közben a Google Fonts CDN-ről töltöttük le, de sok OG-kép egyszerre
// generálásakor ez időtúllépéssel elhasalt (ETIMEDOUT), és megbukott a
// Vercel-build. Helyi fájlból nincs hálózati függés.
type OgFont = {
  name: string;
  data: Buffer;
  weight: 400 | 500 | 900;
  style: "normal";
};

let fontsPromise: Promise<OgFont[]> | null = null;

export function loadOgFonts(): Promise<OgFont[]> {
  if (!fontsPromise) {
    const dir = join(process.cwd(), "assets/fonts/og");
    fontsPromise = Promise.all([
      readFile(join(dir, "archivo-900.ttf")),
      readFile(join(dir, "source-serif-4-400.ttf")),
      readFile(join(dir, "ibm-plex-mono-500.ttf")),
    ]).then(([archivo, sourceSerif, plexMono]) => [
      { name: "Archivo", data: archivo, weight: 900, style: "normal" },
      { name: "Source Serif 4", data: sourceSerif, weight: 400, style: "normal" },
      { name: "IBM Plex Mono", data: plexMono, weight: 500, style: "normal" },
    ]);
  }
  return fontsPromise;
}

export function OgTemplate({
  topLabel,
  titleLine1,
  titleLine2,
  subtitle,
}: {
  topLabel: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: OG_COLOR.ground,
        position: "relative",
      }}
    >
      {/* Bal margósáv — a rail signature elem kicsinyített nyoma */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 44,
          width: 1,
          backgroundColor: OG_COLOR.dim,
          display: "flex",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "56px 76px",
        }}
      >
        {/* Fent: jelzősáv */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{ width: 10, height: 10, backgroundColor: OG_COLOR.signal, display: "flex" }}
            />
            <div
              style={{
                fontFamily: "IBM Plex Mono",
                fontSize: 20,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: OG_COLOR.dim,
                display: "flex",
              }}
            >
              {topLabel}
            </div>
          </div>
          <div
            style={{
              marginTop: 28,
              height: 1,
              width: "100%",
              backgroundColor: OG_COLOR.dim,
              display: "flex",
            }}
          />
        </div>

        {/* Középen: kétsoros címsor + alcím */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Archivo",
              fontWeight: 900,
              fontSize: 92,
              lineHeight: 0.98,
              letterSpacing: -3,
              color: OG_COLOR.ink,
            }}
          >
            <span style={{ display: "flex" }}>{titleLine1}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <span style={{ color: OG_COLOR.dim, display: "flex" }}>{titleLine2}</span>
              <span
                style={{
                  width: 22,
                  height: 22,
                  backgroundColor: OG_COLOR.signal,
                  display: "flex",
                }}
              />
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Source Serif 4",
              fontSize: 28,
              lineHeight: 1.4,
              color: OG_COLOR.dim,
              maxWidth: 820,
              marginTop: 32,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Lent: márkajel + pozicionálás */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              height: 1,
              width: "100%",
              backgroundColor: OG_COLOR.dim,
              display: "flex",
              marginBottom: 28,
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  fontFamily: "Archivo",
                  fontWeight: 900,
                  fontSize: 26,
                  letterSpacing: -1,
                  color: OG_COLOR.ink,
                  display: "flex",
                }}
              >
                THE GBR
              </div>
              <div
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: OG_COLOR.signal,
                  display: "flex",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "IBM Plex Mono",
                fontSize: 18,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: OG_COLOR.dim,
                display: "flex",
              }}
            >
              thegbr.eu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Egy oldal OG-képe a közös sablonnal. Minden oldal saját opengraph-image
// fájlt kap, mert az oldal saját openGraph-exportja felülírja a szülő
// szegmens képét (a Next sekély metadata-összefésülése miatt).
// Kb. 290 karakter fér el öt sorban a lábléc-vonal fölött; ami hosszabb,
// szóhatáron levágjuk, hogy ne csússzon rá.
const OG_SUBTITLE_MAX = 290;

export async function ogImage(props: Parameters<typeof OgTemplate>[0]) {
  const fonts = await loadOgFonts();
  const subtitle =
    props.subtitle.length > OG_SUBTITLE_MAX
      ? `${props.subtitle.slice(0, OG_SUBTITLE_MAX).replace(/\s+\S*$/, "")}…`
      : props.subtitle;
  return new ImageResponse(<OgTemplate {...props} subtitle={subtitle} />, { ...OG_SIZE, fonts });
}
