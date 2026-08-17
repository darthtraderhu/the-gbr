"use client";

import { cn } from "./cn";

export interface ChipOption {
  value: string;
  label: string;
}

export interface ChipGroupProps {
  options: ChipOption[];
  value: string | null;
  onChange: (value: string) => void;
  name?: string;
  className?: string;
}

export default function ChipGroup({ options, value, onChange, name, className }: ChipGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={cn("flex flex-wrap gap-[var(--space-2)]", className)}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full border transition-colors duration-150 ease-out",
              "px-[var(--space-4)] py-[var(--space-2)] text-[length:var(--text-sm)] [font-family:var(--font-mono)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ground)]",
              selected
                ? "bg-[var(--signal)] border-transparent text-[var(--ink)]"
                : "bg-transparent border-[var(--rule)] text-[var(--ink-2)] hover:border-[var(--mid)]"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
