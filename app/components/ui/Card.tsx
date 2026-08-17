import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export type CardVariant = "default" | "elevated" | "dark";

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: "bg-[var(--panel)] border border-[var(--rule)]",
  elevated: "bg-[var(--panel)] border border-[var(--rule)]",
  dark: "border border-[var(--rule)] bg-[var(--panel)] text-[var(--ink)]",
};

// Az árnyék a var(--ink) tokenből származik (color-mix-csel halványítva),
// nem hardcode-olt rgba — inline style-ban, mert a Tailwind arbitrary-value
// szintaxis a beágyazott calc()/color-mix() kombinációt megbízhatatlanul
// tördeli szóközök/aláhúzások mentén.
const ELEVATED_SHADOW =
  "0 var(--space-2) var(--space-6) calc(var(--space-2) * -1) color-mix(in srgb, var(--ink) 18%, transparent)";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  variant?: CardVariant;
  eyebrow?: string;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
}

export default function Card({
  variant = "default",
  eyebrow,
  footer,
  className,
  children,
  style,
  ...rest
}: CardProps) {
  return (
    <div
      data-theme={variant === "dark" ? "dark" : undefined}
      className={cn(
        "rounded-[4px] flex flex-col",
        "p-[var(--space-6)] gap-[var(--space-4)]",
        VARIANT_CLASSES[variant],
        className
      )}
      style={{ ...(variant === "elevated" ? { boxShadow: ELEVATED_SHADOW } : undefined), ...style }}
      {...rest}
    >
      {eyebrow && (
        <p className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.1em] text-[var(--mid)]">
          {eyebrow}
        </p>
      )}

      <div className="flex-1">{children}</div>

      {footer && (
        <div className="pt-[var(--space-4)] border-t border-[var(--rule-soft)]">{footer}</div>
      )}
    </div>
  );
}
