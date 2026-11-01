// A Pulzus havi levelének mintája (angol: /en/services és /en/services/pulse).
export type PulseLetterContent = {
  title: string;
  siteLabel: string;
  siteLine1: string;
  siteLine2: string;
  googleLabel: string;
  googleLine: string;
  legalLabel: string;
  legalLine: string;
  watchLabel: string;
  watchLine: string;
  actionsLabel: string;
  action1: string;
  action2: string;
};

const LABEL_CLASS =
  "m-0 mb-[var(--space-1)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]";

export default function PulseLetter({ letter, note }: { letter: PulseLetterContent; note: string }) {
  return (
    <>
      <div className="[font-size:var(--text-sm)] text-[var(--ink-2)] space-y-[var(--space-4)]">
        <p className="m-0 font-display font-bold [font-size:var(--text-lg)] text-[var(--ink)]">
          {letter.title}
        </p>
        <div>
          <p className={LABEL_CLASS}>{letter.siteLabel}</p>
          <p className="m-0 leading-relaxed">{letter.siteLine1}</p>
          <p className="m-0 leading-relaxed text-[var(--attention)]">{letter.siteLine2}</p>
        </div>
        <div>
          <p className={LABEL_CLASS}>{letter.googleLabel}</p>
          <p className="m-0 leading-relaxed">{letter.googleLine}</p>
        </div>
        <div>
          <p className={LABEL_CLASS}>{letter.legalLabel}</p>
          <p className="m-0 leading-relaxed">{letter.legalLine}</p>
        </div>
        <div>
          <p className={LABEL_CLASS}>{letter.watchLabel}</p>
          <p className="m-0 leading-relaxed">{letter.watchLine}</p>
        </div>
        <div>
          <p className={LABEL_CLASS}>{letter.actionsLabel}</p>
          <ol className="m-0 pl-[1.1em] space-y-[var(--space-1)]">
            <li>{letter.action1}</li>
            <li>{letter.action2}</li>
          </ol>
        </div>
      </div>
      <p className="mt-[var(--space-4)] pt-[var(--space-4)] border-t border-[var(--rule-soft)] [font-size:var(--text-sm)] text-[var(--mid)]">
        {note}
      </p>
    </>
  );
}
