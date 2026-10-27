// „Miért Next.js és React” blokk a webes szolgáltatásnál. Minden márkanév
// nyilvános, ellenőrizhető forrásból jön (Next.js Showcase, Vercel-
// esettanulmány), a forráslinkek és a megtekintés dátuma a blokk alján
// látszanak. Ügyfélnevet ide ne tegyünk: a saját munkánkra csak ez az oldal
// szolgál példaként.
export type StackProofItem = {
  name: string;
  tag: string;
  body: string;
};

export type StackProofSource = {
  label: string;
  href: string;
};

export default function StackProof({
  intro,
  items,
  note,
  sourcesLabel,
  sources,
  checked,
}: {
  intro: string;
  items: StackProofItem[];
  note: string;
  sourcesLabel: string;
  sources: StackProofSource[];
  checked: string;
}) {
  return (
    <div>
      <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed max-w-[60ch]">
        {intro}
      </p>
      <ul className="mt-[var(--space-6)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--rule)]">
        {items.map((item) => (
          <li
            key={item.name}
            className="p-[var(--space-5)] border-r border-b border-[var(--rule)] bg-[var(--ground)]"
          >
            <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--signal-deep)]">
              {item.tag}
            </div>
            <div className="mt-[var(--space-2)] font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.022em] leading-tight text-[var(--ink)]">
              {item.name}
            </div>
            <p className="mt-[var(--space-2)] [font-size:var(--text-sm)] text-[var(--ink-2)] leading-relaxed">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-[var(--space-6)] [font-size:var(--text-sm)] text-[var(--ink-2)] leading-relaxed max-w-[64ch]">
        {note}
      </p>
      <p className="mt-[var(--space-4)] [font-size:var(--text-sm)] text-[var(--mid)] leading-relaxed">
        {sourcesLabel}{" "}
        {sources.map((source, i) => (
          <span key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] underline break-words"
            >
              {source.label}
            </a>
            {i < sources.length - 1 ? "; " : ""}
          </span>
        ))}{" "}
        <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)] whitespace-nowrap">
          {checked}
        </span>
      </p>
    </div>
  );
}
