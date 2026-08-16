"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Kritikus, root-szintű rendszerhiba:", error);
  }, [error]);

  return (
    <html lang="hu">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          textAlign: "center",
          fontFamily: "Arial, Helvetica, sans-serif",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
        }}
      >
        <p
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#ff4d4d",
            marginBottom: "24px",
          }}
        >
          SYS.ERROR: KRITIKUS
        </p>
        <h1
          style={{
            fontSize: "40px",
            fontWeight: 900,
            fontStyle: "italic",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            marginBottom: "24px",
          }}
        >
          A rendszer <span style={{ color: "#e7ff00" }}>leállt.</span>
        </h1>
        <p style={{ maxWidth: "480px", color: "#9ca3af", fontSize: "16px", marginBottom: "40px" }}>
          Súlyos hiba történt, ami az egész oldal betöltését megakadályozta. Próbáld újratölteni.
        </p>
        <button
          onClick={() => reset()}
          style={{
            padding: "16px 40px",
            borderRadius: "4px",
            backgroundColor: "#e7ff00",
            color: "#0a0a0a",
            fontWeight: 900,
            fontStyle: "italic",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontSize: "14px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Újrapróbálkozás
        </button>
      </body>
    </html>
  );
}
