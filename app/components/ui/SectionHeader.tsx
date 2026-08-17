import { cn } from "./cn";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
}

export default function SectionHeader({ eyebrow, title, lead, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-[var(--space-3)]", className)}>
      {eyebrow && (
        <p className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.15em] text-[var(--mid)]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display font-bold text-[var(--ink)] [font-size:var(--text-section)] leading-[1.02] tracking-tight max-w-[17ch]">
        {title}
      </h2>
      {lead && (
        <p className="font-body text-[var(--ink-2)] [font-size:var(--text-lg)] max-w-[42rem]">
          {lead}
        </p>
      )}
    </div>
  );
}
