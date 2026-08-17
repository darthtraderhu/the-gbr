import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "./cn";

export interface ProseProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  className?: string;
  children: React.ReactNode;
}

// A @tailwindcss/typography plugin a --tw-prose-* CSS változóin keresztül
// szabható testre — ezeket kötjük a design tokenekhez, így a "prose" a
// jelenlegi neon/dark hardcode-olás (prose-a:text-[#e7ff00] stb.) nélkül,
// kizárólag tokenből építi fel a színsémáját, és a téma-váltással is
// automatikusan együtt mozog.
const PROSE_TOKEN_VARS: CSSProperties = {
  ["--tw-prose-body" as string]: "var(--ink-2)",
  ["--tw-prose-headings" as string]: "var(--ink)",
  ["--tw-prose-lead" as string]: "var(--ink-2)",
  ["--tw-prose-links" as string]: "var(--signal-deep)",
  ["--tw-prose-bold" as string]: "var(--ink)",
  ["--tw-prose-counters" as string]: "var(--mid)",
  ["--tw-prose-bullets" as string]: "var(--rule)",
  ["--tw-prose-hr" as string]: "var(--rule)",
  ["--tw-prose-quotes" as string]: "var(--ink)",
  ["--tw-prose-quote-borders" as string]: "var(--rule)",
  ["--tw-prose-captions" as string]: "var(--mid)",
  ["--tw-prose-code" as string]: "var(--ink)",
  ["--tw-prose-pre-code" as string]: "var(--panel)",
  ["--tw-prose-pre-bg" as string]: "var(--ink)",
  ["--tw-prose-th-borders" as string]: "var(--rule)",
  ["--tw-prose-td-borders" as string]: "var(--rule-soft)",
};

export default function Prose({ className, children, style, ...rest }: ProseProps) {
  return (
    <div
      className={cn("prose max-w-none font-body", className)}
      style={{ ...PROSE_TOKEN_VARS, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
