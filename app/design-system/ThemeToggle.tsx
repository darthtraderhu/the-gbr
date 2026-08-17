"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "thegbr-theme";

export default function ThemeToggle() {
  // Az alapértelmezett mindig "light" — a prefers-color-scheme-et itt
  // szándékosan nem nézzük meg, csak a mentett választást.
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // A localStorage csak a kliensen érhető el, ezért ez csak mount után
    // olvasható — emiatt itt szükségszerűen egy setState fut az effektben
    // (egy plusz render, a mentett érték alkalmazásához). Ez egy dev-only,
    // noindex referencialapon elfogadható, szándékos kompromisszum.
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme("dark");
    }
    // Ha nincs mentett érték, vagy "light", nem nyúlunk a data-theme-hez —
    // a :root alapértelmezett (világos) érvényben marad.
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "var(--ink)",
        backgroundColor: "var(--panel)",
        border: "1px solid var(--rule)",
        borderRadius: "4px",
        padding: "0.5rem 1rem",
        cursor: "pointer",
      }}
    >
      Téma: {theme === "dark" ? "Sötét" : "Világos"} — váltás
    </button>
  );
}
