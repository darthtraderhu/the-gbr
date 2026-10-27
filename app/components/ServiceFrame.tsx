// A szolgáltatásoldalak "műszer-kerete" (minta, napló, felmérési táblázat)
// — az /arzenal és a szolgáltatás-aloldalak közösen használják.

export function DevFrame({
  header,
  headerRight,
  children,
}: {
  header: string;
  headerRight?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-[var(--rule)] bg-[var(--panel)]">
      <div className="flex flex-wrap justify-between gap-3 px-6 py-2.5 border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)]">
        <span>{header}</span>
        {headerRight && <span>{headerRight}</span>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

const TH_CLASS =
  "py-[var(--space-2)] font-normal [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--mid)]";

// Felmérési lelet-táblázat: mit találunk, mit jelent, mennyire súlyos.
export function FindingsTable({
  rows,
  note,
}: {
  rows: { finding: string; meaning: string; severity: string }[];
  note: string;
}) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse [font-size:var(--text-sm)]">
          <thead>
            <tr className="border-b border-[var(--rule-soft)]">
              <th className={`${TH_CLASS} pr-[var(--space-3)] text-left`}>Amit találunk</th>
              <th className={`${TH_CLASS} pr-[var(--space-3)] text-left`}>Mit jelent</th>
              <th className={`${TH_CLASS} text-right`}>Súly</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.finding} className="border-b border-[var(--rule-soft)] last:border-b-0">
                <td className="py-[var(--space-3)] pr-[var(--space-3)] text-[var(--ink-2)]">
                  {row.finding}
                </td>
                <td className="py-[var(--space-3)] pr-[var(--space-3)] text-[var(--mid)]">
                  {row.meaning}
                </td>
                <td className="py-[var(--space-3)] text-right [font-family:var(--font-mono)] text-[var(--signal-deep)] whitespace-nowrap">
                  {row.severity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-[var(--space-4)] [font-size:var(--text-sm)] text-[var(--mid)]">{note}</p>
    </>
  );
}
