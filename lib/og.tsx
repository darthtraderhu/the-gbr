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

// A next/font/google nem ad hozzáférést a nyers betűtípus-bájtokhoz (azok
// build-időben, Next.js-belső cache-be kerülnek) — a satori viszont valódi
// ArrayBuffer-t vár. Ezért ugyanazokat a Google Fonts családokat, amiket a
// lib/fonts.ts next/font/google-lal tölt be a többi oldalon (Archivo,
// Source Serif 4, IBM Plex Mono), itt közvetlenül a Google Fonts CDN-ről
// töltjük le — vizuálisan ugyanaz a betű, csak a satori számára emészthető
// formában.
//
// FONTOS: szándékosan NEM küldünk User-Agent fejlécet. A Google Fonts CSS2
// API a kliens felismert képességei alapján dönt a formátumról — egy
// "modern böngésző" UA (akár egy régi Chrome-verzióé is) woff2-t kap,
// míg UA nélkül a teljes latin karakterkészletet lefedő alap @font-face
// blokk .ttf-ként érkezik, amit a satori megbízhatóan tud olvasni.
async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`;
  const css = await fetch(cssUrl).then((res) => res.text());
  const matches = [...css.matchAll(/src: url\(([^)]+)\) format\('(truetype|opentype|woff)'\)/g)];
  const fontUrl = matches.at(-1)?.[1];
  if (!fontUrl) {
    throw new Error(`Nem található betűtípus-fájl az OG-képhez: ${family} ${weight}`);
  }
  const fontRes = await fetch(fontUrl);
  return fontRes.arrayBuffer();
}

export async function loadOgFonts() {
  const [archivo, sourceSerif, plexMono] = await Promise.all([
    loadGoogleFont("Archivo", 900),
    loadGoogleFont("Source Serif 4", 400),
    loadGoogleFont("IBM Plex Mono", 500),
  ]);

  return [
    { name: "Archivo", data: archivo, weight: 900 as const, style: "normal" as const },
    { name: "Source Serif 4", data: sourceSerif, weight: 400 as const, style: "normal" as const },
    { name: "IBM Plex Mono", data: plexMono, weight: 500 as const, style: "normal" as const },
  ];
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
