export interface RailProps {
  label: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

// A bal margósáv — az arculat "signature" szerkezeti eleme. Minden
// nagyobb szekció mellett fut, forgatott, számozott felirattal.
export default function Rail({ label, children, dark, className }: RailProps) {
  return (
    <div
      data-theme={dark ? "dark" : undefined}
      className={className}
      style={dark ? { backgroundColor: "var(--ground)", color: "var(--ink)" } : undefined}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[72px_1fr]">
        <div className="hidden sm:block relative border-r border-[var(--rule)]">
          <span className="absolute top-[var(--space-12)] left-1/2 -translate-x-1/2 rotate-180 [writing-mode:vertical-rl] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.34em] uppercase text-[var(--dim)] whitespace-nowrap">
            {label}
          </span>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
