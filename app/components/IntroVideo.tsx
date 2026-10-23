"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// Kattintásra induló videó: az első betöltéskor csak az előnézeti kép jön le
// (preload="none"), így nem rontja a hero által mért betöltési számokat.
// A z-index azért kell, hogy a háttérmotívum (z-index: 1) ne a mozgó kép fölé
// rajzoljon. A gomb széles kijelzőn jobbra kerül, mert középen az előnézeti
// kép logója van.
export default function IntroVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function start() {
    setStarted(true);
    void videoRef.current?.play();
  }

  return (
    <div className="relative z-[2] aspect-[21/9] border-b border-[var(--rule)] bg-[var(--ground)]">
      <video
        ref={videoRef}
        src={src}
        preload="none"
        muted
        playsInline
        controls={started}
        aria-label={label}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label={`Lejátszás: ${label}`}
          className="group absolute inset-0 flex items-center justify-center sm:justify-end sm:pr-[14%] cursor-pointer"
        >
          <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
          <span
            className="relative w-[var(--space-20)] h-[var(--space-20)] rounded-full border border-[var(--ink)] flex items-center justify-center transition-colors group-hover:border-[var(--signal)] group-focus-visible:border-[var(--signal)]"
            style={{ backgroundColor: "color-mix(in srgb, var(--panel) 75%, transparent)" }}
          >
            <span
              className="ml-1 block w-0 h-0"
              style={{
                borderTop: "11px solid transparent",
                borderBottom: "11px solid transparent",
                borderLeft: "18px solid var(--ink)",
              }}
            />
          </span>
        </button>
      )}
    </div>
  );
}
