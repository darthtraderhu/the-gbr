"use client";

import Link from "next/link";
import { useEffect } from "react";

// A global-error.tsx a gyökér layout.tsx-et is helyettesíti, ha ott dől el
// a render — ezért saját <html>/<body>-t kell adnia, és szándékosan nem
// támaszkodik semmire, ami a (potenciálisan hibás) layoutból jönne: nincs
// Rail/design token import, csak beégetett szín — ugyanaz a technikai
// kivétel, mint az OG-képeknél (ld. lib/og.tsx).
const COLOR = {
  ground: "#0B0E10",
  ink: "#EAEEE8",
  ink2: "#9FA9A2",
  dim: "#4A524E",
  rule: "#20272B",
  signal: "#A8D400",
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Gyökér rendszerhiba:", error);
  }, [error]);

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
            Váratlan hiba
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
            5<span style={{ color: COLOR.signal }}>0</span>0
          </div>
          <h2
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(26px,4vw,52px)",
              lineHeight: 1.02,
              letterSpacing: "-0.042em",
              maxWidth: "18ch",
              margin: "32px 0 20px",
              color: COLOR.ink,
            }}
          >
            Rendszerhiba <span style={{ color: COLOR.signal }}>történt</span>.
          </h2>
          <p
            style={{
              fontSize: 17.5,
              lineHeight: 1.6,
              color: COLOR.ink2,
              maxWidth: "52ch",
              margin: "0 0 32px",
            }}
          >
            Valami elromlott a háttérben. A csapat automatikusan értesítést kap róla — próbáld újra.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                padding: "14px 24px",
                background: COLOR.signal,
                color: "#101400",
                border: `1px solid ${COLOR.signal}`,
                cursor: "pointer",
              }}
            >
              Újratöltés
            </button>
            <Link
              href="/"
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
              Vissza a főoldalra
            </Link>
          </div>

          {error.digest && (
            <div style={{ borderTop: `1px solid ${COLOR.rule}`, marginTop: 56, paddingTop: 20 }}>
              <p
                style={{
                  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                  fontSize: 9.5,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: COLOR.dim,
                  margin: "0 0 12px",
                }}
              >
                Hibaazonosító — ezt add meg, ha írsz
              </p>
              <p
                style={{
                  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  color: COLOR.signal,
                  margin: 0,
                }}
              >
                {error.digest}
              </p>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
