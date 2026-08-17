import { cn } from "./cn";
import DataCell, { type DataCellProps } from "./DataCell";

export interface StatusStripProps {
  title: string;
  timestamp: string;
  items: DataCellProps[];
  className?: string;
}

export default function StatusStrip({ title, timestamp, items, className }: StatusStripProps) {
  return (
    <div
      className={cn(
        "border border-[var(--rule)] bg-[var(--panel)] rounded-[4px]",
        "p-[var(--space-6)]",
        className
      )}
    >
      <div className="flex items-center gap-[var(--space-3)] pb-[var(--space-4)] mb-[var(--space-6)] border-b border-[var(--rule-soft)]">
        <span
          aria-hidden="true"
          className="inline-block rounded-full animate-pulse"
          style={{
            width: "var(--space-2)",
            height: "var(--space-2)",
            backgroundColor: "var(--signal)",
          }}
        />
        <p className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.1em] text-[var(--ink)]">
          {title}
        </p>
        <p className="ml-auto [font-family:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--mid)]">
          {timestamp}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--space-6)]">
        {items.map((item) => (
          <DataCell key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
