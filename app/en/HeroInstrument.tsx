"use client";

import { useEffect, useRef } from "react";

// English variant of app/(hu)/HeroInstrument.tsx — same live-measurement
// logic, English labels and en-GB number formatting. The comparison
// baseline is the same reference average (not our own measured mean).
const AVG = { load: 2400, ttfb: 800, kb: 2300, req: 74 };

type GaugeKey = "load" | "ttfb" | "kb" | "req";

const GAUGES: { key: GaugeKey; label: string; unit?: string; avgLabel: string }[] = [
  { key: "load", label: "Load time", unit: "ms", avgLabel: "avg. 2,400" },
  { key: "ttfb", label: "Server response", unit: "ms", avgLabel: "avg. 800" },
  { key: "kb", label: "Data transferred", unit: "kB", avgLabel: "avg. 2,300" },
  { key: "req", label: "Network requests", avgLabel: "avg. 74" },
];

export default function HeroInstrument() {
  const valueRefs = useRef<Record<GaugeKey, HTMLSpanElement | null>>({
    load: null,
    ttfb: null,
    kb: null,
    req: null,
  });
  const fillRefs = useRef<Record<GaugeKey, HTMLDivElement | null>>({
    load: null,
    ttfb: null,
    kb: null,
    req: null,
  });
  const verdictRef = useRef<HTMLParagraphElement>(null);
  const uaRef = useRef<HTMLElement>(null);
  const tsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function animateCount(key: GaugeKey, target: number) {
      const el = valueRefs.current[key];
      if (!el) return;
      if (reduce) {
        el.textContent = target.toLocaleString("en-GB");
        return;
      }
      const duration = 1100;
      let start: number | null = null;
      function frame(x: number) {
        if (start === null) start = x;
        const p = Math.min(1, (x - start) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        if (el) el.textContent = Math.round(target * eased).toLocaleString("en-GB");
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    function animateBar(key: GaugeKey, value: number, avg: number, delay: number) {
      const percent = Math.max(2, Math.min(100, (value / avg) * 100));
      window.setTimeout(() => {
        const el = fillRefs.current[key];
        if (el) el.style.width = `${percent}%`;
      }, delay);
    }

    function measure() {
      const nav = performance.getEntriesByType("navigation")[0] as
        PerformanceNavigationTiming | undefined;
      const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];

      const load = Math.max(1, Math.round(nav?.duration ?? performance.now()));
      const ttfb = Math.max(1, Math.round(nav?.responseStart ?? 0));
      const kb = Math.max(
        1,
        Math.round(
          ((nav?.transferSize ?? 0) +
            resources.reduce((sum, r) => sum + (r.transferSize || 0), 0)) /
            1024
        )
      );
      const req = resources.length + 1;

      animateCount("load", load);
      animateBar("load", load, AVG.load, 260);
      animateCount("ttfb", ttfb);
      animateBar("ttfb", ttfb, AVG.ttfb, 360);
      animateCount("kb", kb);
      animateBar("kb", kb, AVG.kb, 460);
      animateCount("req", req);
      animateBar("req", req, AVG.req, 560);

      if (verdictRef.current) {
        const loadMultiplier = (AVG.load / load).toFixed(1);
        const kbMultiplier = Math.round(AVG.kb / kb);
        verdictRef.current.innerHTML =
          `This page loaded <b style="color:var(--signal)">${loadMultiplier}×</b> faster than the average European business site — using ` +
          `<b style="color:var(--signal)">${kbMultiplier}×</b> less data. No trick: there's simply less unnecessary weight in it.`;
      }
      if (tsRef.current) {
        tsRef.current.textContent = new Date().toLocaleTimeString("en-GB");
      }
      if (uaRef.current) {
        const m = navigator.userAgent.match(/(Chrome|Firefox|Safari|Edg)/);
        uaRef.current.textContent = m ? m[0].replace("Edg", "Edge") : "your device";
      }
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    function runAfterDelay() {
      timeoutId = setTimeout(measure, 420);
    }
    if (document.readyState === "complete") {
      runAfterDelay();
    } else {
      window.addEventListener("load", runAfterDelay);
    }
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("load", runAfterDelay);
    };
  }, []);

  return (
    <div className="border-t border-[var(--rule)]">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)]">
        <span>
          Live measurement ·{" "}
          <strong ref={uaRef} className="font-medium text-[var(--mid)]">
            your device
          </strong>
        </span>
        <span ref={tsRef}>—</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {GAUGES.map((g, i) => (
          <div
            key={g.key}
            className={`min-w-0 px-6 py-6 sm:py-8 ${
              i < GAUGES.length - 1 ? "border-b sm:border-b-0 sm:border-r border-[var(--rule)]" : ""
            }`}
          >
            <span className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-4">
              {g.label}
            </span>
            <div className="flex items-baseline gap-1 font-display font-extrabold [font-size:var(--text-gauge)] leading-[0.85] tabular-nums text-[var(--ink)]">
              <span ref={(el) => void (valueRefs.current[g.key] = el)}>0</span>
              {g.unit && (
                <span className="text-[0.28em] font-semibold text-[var(--mid)]">{g.unit}</span>
              )}
            </div>
            <div className="mt-[var(--space-4)]">
              <div className="flex justify-between gap-2 [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--dim)] mb-2">
                <span>This page</span>
                <span>{g.avgLabel}</span>
              </div>
              <div className="h-1 relative bg-[var(--rule)]">
                <div
                  ref={(el) => void (fillRefs.current[g.key] = el)}
                  className="absolute inset-y-0 left-0 w-0 bg-[var(--signal)] motion-safe:transition-[width] motion-safe:duration-[1.2s] motion-safe:ease-[cubic-bezier(0.16,0.84,0.24,1)]"
                />
                <div className="absolute -top-1 -bottom-1 left-full w-px bg-[var(--rule-strong)]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--rule)] px-6 py-8 sm:py-10">
        <p
          ref={verdictRef}
          className="max-w-[62ch] font-body [font-size:var(--text-xl)] leading-snug text-[var(--ink-2)]"
        >
          Measuring…
        </p>
      </div>
    </div>
  );
}
