import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from "react";
import { cn } from "./cn";
import Slot from "./Slot";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--signal)] text-[var(--ink)] border border-transparent hover:bg-[var(--signal-deep)] hover:text-[var(--ground)]",
  secondary:
    "bg-[var(--ink)] text-[var(--panel)] border border-transparent hover:bg-[var(--ink-2)]",
  ghost: "bg-transparent text-[var(--ink)] border border-[var(--rule)] hover:bg-[var(--rule-soft)]",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-[var(--space-3)] py-[var(--space-2)] text-[length:var(--text-sm)] gap-[var(--space-2)]",
  md: "px-[var(--space-5)] py-[var(--space-3)] text-[length:var(--text-base)] gap-[var(--space-2)]",
  lg: "px-[var(--space-6)] py-[var(--space-4)] text-[length:var(--text-lg)] gap-[var(--space-3)]",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center font-display font-semibold rounded-[4px] " +
  "transition-colors duration-150 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ground)] " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  "aria-disabled:opacity-50 aria-disabled:pointer-events-none";

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
  children: ReactNode;
}

type NativeButtonProps = CommonProps & {
  asChild?: false;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

type SlotButtonProps = CommonProps & {
  asChild: true;
  children: ReactElement<HTMLAttributes<HTMLElement>>;
};

export type ButtonProps = NativeButtonProps | SlotButtonProps;

function Spinner({ size }: { size: ButtonSize }) {
  const dim = size === "sm" ? "0.875rem" : size === "lg" ? "1.25rem" : "1rem";
  return (
    <span
      role="status"
      aria-hidden="true"
      className="inline-block animate-spin rounded-full border-2 border-current border-t-transparent"
      style={{ width: dim, height: dim }}
    />
  );
}

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", loading = false, className } = props;

  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);

  if (props.asChild) {
    return (
      <Slot className={classes} aria-disabled={loading || undefined}>
        {props.children}
      </Slot>
    );
  }

  const { asChild: _asChild, disabled, children, ...rest } = props;
  void _asChild;

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Spinner size={size} />}
      {children}
    </button>
  );
}
