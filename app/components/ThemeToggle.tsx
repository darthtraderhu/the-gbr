"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "gbr-theme";
type Theme = "light" | "dark";

// Minimál külső store a document.documentElement data-theme attribútuma
// köré — useSyncExternalStore-ral, hogy ne kelljen setState-et hívni egy
// effektuson belül (a villanásmentes script a hidratáció előtt már
// beállíthatja az attribútumot, ezt kell a React-nek "észrevennie").
let listeners: Array<() => void> = [];
function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}
function notify() {
  listeners.forEach((l) => l());
}
function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}
function getServerSnapshot(): Theme {
  return "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
  notify();
}

// Világos/sötét témaváltó — csak asztalon jelenik meg (ld. Navbar).
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className="flex border border-[var(--rule)]">
      <button
        type="button"
        onClick={() => applyTheme("light")}
        aria-pressed={theme === "light"}
        className={`px-[11px] py-[7px] [font-family:var(--font-mono)] text-[9.5px] tracking-[0.16em] uppercase border-r border-[var(--rule)] transition-colors ${
          theme === "light"
            ? "bg-[var(--panel)] text-[var(--ink)]"
            : "bg-transparent text-[var(--dim)] hover:text-[var(--ink)]"
        }`}
      >
        Világos
      </button>
      <button
        type="button"
        onClick={() => applyTheme("dark")}
        aria-pressed={theme === "dark"}
        className={`px-[11px] py-[7px] [font-family:var(--font-mono)] text-[9.5px] tracking-[0.16em] uppercase transition-colors ${
          theme === "dark"
            ? "bg-[var(--panel)] text-[var(--ink)]"
            : "bg-transparent text-[var(--dim)] hover:text-[var(--ink)]"
        }`}
      >
        Sötét
      </button>
    </div>
  );
}
