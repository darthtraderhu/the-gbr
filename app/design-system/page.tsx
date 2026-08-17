import type { Metadata } from "next";
import ThemeToggle from "./ThemeToggle";
import ComponentsShowcase from "./ComponentsShowcase";

export const metadata: Metadata = {
  title: "Design System (dev) — THE GBR",
  description: "Belső referencia a 2026.08-as design token rétegről. Csak fejlesztéshez.",
  robots: {
    index: false,
    follow: false,
  },
};

const COLORS: { name: string; token: string; hex: string; hexDark?: string; note?: string }[] = [
  { name: "ground", token: "--ground", hex: "#EEF0EC", hexDark: "#0B0E10", note: "alap" },
  { name: "panel", token: "--panel", hex: "#FFFFFF", hexDark: "#16191C", note: "felület" },
  { name: "ink", token: "--ink", hex: "#14171A", hexDark: "#EAEEE8", note: "tinta" },
  {
    name: "ink-2",
    token: "--ink-2",
    hex: "#3C4348",
    hexDark: "#9FA9A2",
    note: "másodlagos szöveg",
  },
  {
    name: "mid",
    token: "--mid",
    hex: "#697079",
    hexDark: "#79837D",
    note: "halvány szöveg, címkék",
  },
  {
    name: "dim",
    token: "--dim",
    hex: "#697079",
    hexDark: "#4A524E",
    note: "sötétben a --mid alatti szint (eyebrow, rail-szám); világosban egyezik a --mid-del",
  },
  { name: "rule", token: "--rule", hex: "#D4D8D1", hexDark: "#20272B", note: "vonal" },
  {
    name: "rule-soft",
    token: "--rule-soft",
    hex: "#E4E8E1",
    hexDark: "#1D2124",
    note: "halvány vonal",
  },
  {
    name: "rule-strong",
    token: "--rule-strong",
    hex: "#BFC5BC",
    hexDark: "#39413C",
    note: "kiemelt szegély (pl. körvonalas gomb)",
  },
  { name: "signal", token: "--signal", hex: "#93B300", hexDark: "#A8D400", note: "jelzés, lime" },
  {
    name: "signal-deep",
    token: "--signal-deep",
    hex: "#88A800",
    hexDark: "#7A9400",
    note: "gomb-hover árnyalat",
  },
  {
    name: "attention",
    token: "--attention",
    hex: "#B8501C",
    note: "figyelem — ritka, nincs sötét változata még",
  },
];

const LEGACY_COLORS = [
  { name: "neon lime (jelenlegi)", hex: "#e7ff00" },
  { name: "neon cián (jelenlegi)", hex: "#00E5FF" },
];

const TYPE_SCALE: { token: string; label: string; sample: string }[] = [
  { token: "--text-xs", label: "xs · 12px", sample: "SYS.LABEL · adat és címke" },
  { token: "--text-sm", label: "sm · 14px", sample: "Kisebb törzsszöveg" },
  { token: "--text-base", label: "base · 16px", sample: "Alap törzsszöveg mérete" },
  { token: "--text-lg", label: "lg · 18px", sample: "Kiemelt törzsszöveg" },
  { token: "--text-xl", label: "xl · 20px", sample: "Alcím" },
  { token: "--text-2xl", label: "2xl · 24–28px (clamp)", sample: "Kisebb címsor" },
  { token: "--text-3xl", label: "3xl · 30–36px (clamp)", sample: "Szekciócím" },
  { token: "--text-4xl", label: "4xl · 36–48px (clamp)", sample: "Nagy címsor" },
  { token: "--text-5xl", label: "5xl · 44–60px (clamp)", sample: "Hero alcím" },
  { token: "--text-6xl", label: "6xl · 52–72px (clamp)", sample: "Hero cím" },
  { token: "--text-display", label: "display · 50–158px (clamp)", sample: "Display" },
];

// A főoldal látványterve (design/fooldal-latvanyterv.html) bevezetett néhány
// szekció-specifikus, nagyméretű "kijelző-számjegy" tokent — ezek nem az
// általános szövegskála részei, csak dokumentáljuk őket itt.
const NUMERAL_SCALE: { token: string; label: string; sample: string }[] = [
  { token: "--text-section", label: "section · 30–62px", sample: "Szekció-címsor" },
  { token: "--text-quote", label: "quote · 28–58px", sample: "Idézet" },
  { token: "--text-gauge", label: "gauge · 36–70px", sample: "1284" },
  { token: "--text-wall", label: "wall · 30–86px", sample: "Stack" },
  { token: "--text-numeral-lg", label: "numeral-lg · 40–92px", sample: "01" },
  { token: "--text-claim", label: "claim · 34–104px", sample: "Állítás" },
  { token: "--text-numeral-xl", label: "numeral-xl · 52–130px", sample: "02" },
  { token: "--text-final", label: "final · 38–124px", sample: "CTA" },
];

const SPACE_SCALE = [
  "--space-1",
  "--space-2",
  "--space-3",
  "--space-4",
  "--space-5",
  "--space-6",
  "--space-8",
  "--space-10",
  "--space-12",
  "--space-16",
  "--space-20",
  "--space-24",
  "--space-32",
];

export default function DesignSystemPage() {
  return (
    <div
      style={{
        backgroundColor: "var(--ground)",
        color: "var(--ink)",
        minHeight: "100vh",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        transition: "background-color 150ms ease, color 150ms ease",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--mid)",
            }}
          >
            Belső referencia · noindex · csak fejlesztéshez
          </p>
          <ThemeToggle />
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--text-5xl)",
            color: "var(--ink)",
            marginBottom: "0.5rem",
          }}
        >
          Design System
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-lg)",
            color: "var(--ink-2)",
            maxWidth: "42rem",
            marginBottom: "4rem",
          }}
        >
          A 2026.08-as arculatváltás alapozó token rétege. Ez a réteg még nincs bekötve a meglévő
          oldalakba — ez az oldal a referencia a következő körhöz. Az alapértelmezett téma világos,
          a sötét kézi váltóval érhető el (a választás megjegyzésre kerül).
        </p>

        {/* ============ SZÍNEK ============ */}
        <section style={{ marginBottom: "5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--text-2xl)",
              borderBottom: "1px solid var(--rule)",
              paddingBottom: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            Színek
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {COLORS.map((c) => (
              <div
                key={c.token}
                style={{
                  border: "1px solid var(--rule)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  backgroundColor: "var(--panel)",
                }}
              >
                <div style={{ height: "72px", backgroundColor: `var(${c.token})` }} />
                <div style={{ padding: "0.75rem" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                      color: "var(--ink)",
                    }}
                  >
                    {c.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--mid)",
                    }}
                  >
                    light: {c.hex}
                    {c.hexDark && (
                      <>
                        <br />
                        dark: {c.hexDark}
                      </>
                    )}
                  </div>
                  {c.note && (
                    <div
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--mid)",
                        marginTop: "0.25rem",
                      }}
                    >
                      {c.note}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--mid)",
              marginBottom: "0.75rem",
            }}
          >
            Jelenleg még aktív (a váltásig)
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            {LEGACY_COLORS.map((c) => (
              <div key={c.hex} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "4px",
                    backgroundColor: c.hex,
                    border: "1px solid var(--rule)",
                  }}
                />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>
                  {c.name} — {c.hex}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ============ TIPOGRÁFIA ============ */}
        <section style={{ marginBottom: "5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--text-2xl)",
              borderBottom: "1px solid var(--rule)",
              paddingBottom: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            Tipográfia
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            <div
              style={{
                border: "1px solid var(--rule)",
                borderRadius: "4px",
                padding: "1.5rem",
                backgroundColor: "var(--panel)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--mid)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.75rem",
                }}
              >
                Display — Archivo
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem" }}>
                Erő és pontosság
              </p>
            </div>
            <div
              style={{
                border: "1px solid var(--rule)",
                borderRadius: "4px",
                padding: "1.5rem",
                backgroundColor: "var(--panel)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--mid)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.75rem",
                }}
              >
                Törzsszöveg — Source Serif 4
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.125rem" }}>
                A marketing és az IT összeolvadt.
              </p>
            </div>
            <div
              style={{
                border: "1px solid var(--rule)",
                borderRadius: "4px",
                padding: "1.5rem",
                backgroundColor: "var(--panel)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--mid)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.75rem",
                }}
              >
                Adat / címke — IBM Plex Mono
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "1rem" }}>SYS.STATUS: 200_OK</p>
            </div>
          </div>

          <div>
            {TYPE_SCALE.map((t) => (
              <div
                key={t.token}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1.5rem",
                  borderBottom: "1px solid var(--rule-soft)",
                  padding: "1rem 0",
                }}
              >
                <div
                  style={{
                    width: "220px",
                    flexShrink: 0,
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    color: "var(--mid)",
                  }}
                >
                  {t.token}
                  <br />
                  {t.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: `var(${t.token})`,
                    color: "var(--ink)",
                    lineHeight: 1.15,
                  }}
                >
                  {t.sample}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--mid)",
              margin: "3rem 0 1.5rem",
            }}
          >
            Kijelző-számjegyek — a főoldal látványterve (nem az általános szövegskála)
          </p>
          <div>
            {NUMERAL_SCALE.map((t) => (
              <div
                key={t.token}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1.5rem",
                  borderBottom: "1px solid var(--rule-soft)",
                  padding: "1rem 0",
                }}
              >
                <div
                  style={{
                    width: "220px",
                    flexShrink: 0,
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    color: "var(--mid)",
                  }}
                >
                  {t.token}
                  <br />
                  {t.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: `var(${t.token})`,
                    color: "var(--ink)",
                    lineHeight: 0.9,
                  }}
                >
                  {t.sample}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ TÉRKÖZ ============ */}
        <section>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--text-2xl)",
              borderBottom: "1px solid var(--rule)",
              paddingBottom: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            Térköz-skála
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              color: "var(--ink-2)",
              marginBottom: "1.5rem",
            }}
          >
            4px alap — minden érték a --space-1 (4px) többszöröse.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {SPACE_SCALE.map((token) => (
              <div key={token} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "110px",
                    flexShrink: 0,
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    color: "var(--mid)",
                  }}
                >
                  {token}
                </div>
                <div
                  style={{
                    height: "16px",
                    width: `var(${token})`,
                    backgroundColor: "var(--signal)",
                    borderRadius: "2px",
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ============ KOMPONENSEK ============ */}
        <section style={{ marginTop: "5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--text-2xl)",
              borderBottom: "1px solid var(--rule)",
              paddingBottom: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            Komponensek
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              color: "var(--ink-2)",
              marginBottom: "2rem",
              maxWidth: "42rem",
            }}
          >
            A design token réteg fölé épített komponens-készlet — kizárólag tokeneket használ, sehol
            nincs hardcode-olt szín, betűméret vagy térköz. Alább mindkét téma egyszerre látható, a
            fenti kapcsolótól függetlenül (a data-theme attribútum itt lokálisan van kikényszerítve
            mindkét oszlopon).
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div
              data-theme="light"
              style={{
                backgroundColor: "var(--ground)",
                color: "var(--ink)",
                border: "1px solid var(--rule)",
                borderRadius: "4px",
                padding: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--mid)",
                  marginBottom: "1.5rem",
                }}
              >
                Világos téma
              </p>
              <ComponentsShowcase />
            </div>
            <div
              data-theme="dark"
              style={{
                backgroundColor: "var(--ground)",
                color: "var(--ink)",
                border: "1px solid var(--rule)",
                borderRadius: "4px",
                padding: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--mid)",
                  marginBottom: "1.5rem",
                }}
              >
                Sötét téma
              </p>
              <ComponentsShowcase />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
