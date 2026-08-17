import { cn } from "./cn";

export interface DataCellProps {
  label: string;
  value: string | number;
  unit?: string;
  /** 0–1 közötti relatív magasságok a mikro-oszlopdiagramhoz (tick-sáv). */
  ticks?: number[];
  className?: string;
}

export default function DataCell({ label, value, unit, ticks, className }: DataCellProps) {
  return (
    <div className={cn("flex flex-col gap-[var(--space-2)]", className)}>
      <p className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.1em] text-[var(--mid)]">
        {label}
      </p>

      <p className="font-display font-semibold text-[var(--ink)] leading-none [font-size:var(--text-4xl)]">
        {value}
        {unit && (
          <span className="ml-[var(--space-2)] [font-family:var(--font-mono)] text-[length:var(--text-base)] font-normal text-[var(--mid)]">
            {unit}
          </span>
        )}
      </p>

      {ticks && ticks.length > 0 && (
        <div
          className="flex items-end gap-[var(--space-1)]"
          style={{ height: "var(--space-6)" }}
          role="img"
          aria-label={`Trend: ${ticks.map((t) => Math.round(t * 100)).join(", ")}`}
        >
          {ticks.map((t, i) => (
            <span
              key={i}
              className="flex-1 rounded-[1px]"
              style={{
                height: `${Math.max(0.08, Math.min(1, t)) * 100}%`,
                backgroundColor: i === ticks.length - 1 ? "var(--signal)" : "var(--rule)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
