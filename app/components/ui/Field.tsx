"use client";

import {
  useId,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "./cn";

interface FieldCommon {
  label: string;
  id?: string;
  hint?: string;
  error?: string;
  className?: string;
}

type FieldInputProps = FieldCommon & {
  multiline?: false;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">;

type FieldTextareaProps = FieldCommon & {
  multiline: true;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className">;

export type FieldProps = FieldInputProps | FieldTextareaProps;

const CONTROL_CLASSES =
  "w-full bg-[var(--panel)] text-[var(--ink)] border rounded-[4px] " +
  "px-[var(--space-4)] py-[var(--space-3)] text-[length:var(--text-base)] [font-family:var(--font-body)] " +
  "transition-colors duration-150 ease-out placeholder:text-[var(--mid)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ground)] " +
  "disabled:opacity-50 disabled:pointer-events-none";

function FieldChrome({
  id,
  label,
  hint,
  error,
  className,
  count,
  maxLength,
  hintId,
  errorId,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  count: number;
  maxLength?: number;
  hintId?: string;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-[var(--space-2)]", className)}>
      <label
        htmlFor={id}
        className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.1em] text-[var(--ink-2)]"
      >
        {label}
      </label>

      {children}

      <div className="flex items-start justify-between gap-[var(--space-3)]">
        <div>
          {error && (
            <p id={errorId} className="text-[length:var(--text-sm)] text-[var(--attention)]">
              {error}
            </p>
          )}
          {!error && hint && (
            <p id={hintId} className="text-[length:var(--text-sm)] text-[var(--mid)]">
              {hint}
            </p>
          )}
        </div>
        {maxLength && (
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--mid)] shrink-0">
            {count}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Field(props: FieldProps) {
  const autoId = useId();
  const id = props.id ?? autoId;
  const { label, hint, error, className, maxLength, value, defaultValue } = props;

  const initialLength =
    typeof value === "string"
      ? value.length
      : typeof defaultValue === "string"
        ? defaultValue.length
        : 0;
  const [count, setCount] = useState(initialLength);

  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = cn(hintId, errorId) || undefined;
  const borderClass = error
    ? "border-[var(--attention)]"
    : "border-[var(--rule)] hover:border-[var(--mid)]";

  const chrome = { id, label, hint, error, className, count, maxLength, hintId, errorId };

  if (props.multiline) {
    const {
      multiline: _m,
      label: _l,
      id: _id,
      hint: _h,
      error: _e,
      className: _c,
      onChange,
      ...rest
    } = props;
    void _m;
    void _l;
    void _id;
    void _h;
    void _e;
    void _c;

    return (
      <FieldChrome {...chrome}>
        <textarea
          id={id}
          className={cn(CONTROL_CLASSES, borderClass, "min-h-[8rem] resize-y")}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setCount(e.target.value.length);
            onChange?.(e);
          }}
          {...rest}
        />
      </FieldChrome>
    );
  }

  const {
    multiline: _m,
    label: _l,
    id: _id,
    hint: _h,
    error: _e,
    className: _c,
    onChange,
    ...rest
  } = props;
  void _m;
  void _l;
  void _id;
  void _h;
  void _e;
  void _c;

  return (
    <FieldChrome {...chrome}>
      <input
        id={id}
        className={cn(CONTROL_CLASSES, borderClass)}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setCount(e.target.value.length);
          onChange?.(e);
        }}
        {...rest}
      />
    </FieldChrome>
  );
}
