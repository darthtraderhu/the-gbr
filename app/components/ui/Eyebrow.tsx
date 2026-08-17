export interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={`[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase text-[var(--dim)] mb-[var(--space-5)] ${className ?? ""}`}
    >
      {children}
    </p>
  );
}
