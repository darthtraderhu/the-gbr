// „Kóstoló” jelzés a fix áras első lépések fölé (főoldal és /gyors-indulas):
// lime címke + egy mondat, hogy ez a legkisebb lépés a megismeréshez.
export default function KostoloJel({ className = "" }: { className?: string }) {
  return (
    <p
      className={`m-0 flex flex-wrap items-center gap-x-[var(--space-3)] gap-y-[var(--space-2)] [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.22em] uppercase ${className}`}
    >
      <span className="bg-[var(--signal)] text-[var(--on-signal)] font-semibold px-[var(--space-3)] py-[var(--space-1)]">
        Kóstoló
      </span>
      <span className="text-[var(--ink-2)]">Nézd meg, hogy dolgozunk</span>
    </p>
  );
}
