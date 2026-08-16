"use client";

import { useEffect } from "react";

export default function AntiCopy() {
  useEffect(() => {
    // 1. Jobb klikk (Context Menu) letiltása
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Billentyűkombinációk letiltása (Ctrl+C, Cmd+C, F12, Ctrl+Shift+I)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Másolás tiltása
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
      }
      // Fejlesztői eszközök (Inspect) tiltása
      if (
        e.key === 'F12' || 
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c'))
      ) {
        e.preventDefault();
      }
    };

    // 3. Tényleges másolás esemény letiltása
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    // Eseményfigyelők élesítése
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleCopy);

    // Takarítás, ha a komponens leáll
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  // Ez a komponens vizuálisan nem jelenik meg, csak a logikát futtatja
  return null;
}