import { Rail } from "@/app/components/ui";
import { AUTOMATIZACIO_CSOMAGOK } from "@/lib/automatizacio-csomagok";

// „Három csomag, havidíjjal”: az automatizáció aloldal kézzelfogható
// csomagjai. Ár nincs az oldalon, minden ügyfél egyedi ajánlatot kap.
export default function AutomatizacioCsomagok() {
  return (
    <Rail label="Csomagok">
      <section
        id="csomagok"
        className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)]"
      >
        <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase text-[var(--dim)] mb-[var(--space-5)]">
          Három csomag, havidíjjal
        </p>
        <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[20ch]">
          Amit eddig kézzel csináltál, mert nem tudtad, hogy lehet másképp
          <span className="text-[var(--signal)]">.</span>
        </h2>
        <p className="mt-[var(--space-6)] max-w-[62ch] [font-size:var(--text-lg)] leading-relaxed text-[var(--ink-2)]">
          Mindhárom egy kézi munkát vesz le a válladról. Egyszeri beállítással indul, utána
          havidíjjal fut: figyeljük, javítjuk, és ha egy külső rendszer változik, követjük. Az árat
          a folyamatod alapján írjuk meg, egyedi ajánlatban.
        </p>
      </section>

      <div className="px-6 pb-[var(--space-12)] sm:pb-[var(--space-16)]">
        <ul className="m-0 p-0 list-none grid grid-cols-1 lg:grid-cols-3 border-t border-l border-[var(--rule)]">
          {AUTOMATIZACIO_CSOMAGOK.map((csomag) => (
            <li
              key={csomag.id}
              className="flex flex-col p-[var(--space-6)] border-r border-b border-[var(--rule)] bg-[var(--ground)]"
            >
              <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase text-[var(--dim)]">
                {csomag.n} · {csomag.forWhom}
              </p>
              <h3 className="mt-[var(--space-3)] font-display font-bold [font-size:var(--text-xl)] tracking-[-0.02em] leading-tight text-[var(--ink)]">
                {csomag.name}
              </h3>
              <p className="mt-[var(--space-2)] font-display font-semibold [font-size:var(--text-base)] leading-snug text-[var(--ink-2)]">
                {csomag.question}
              </p>
              <p className="mt-[var(--space-3)] [font-size:var(--text-sm)] leading-relaxed text-[var(--ink-2)]">
                {csomag.body}
              </p>
              <ul className="m-0 mt-[var(--space-4)] p-0 list-none flex flex-col gap-[var(--space-2)]">
                {csomag.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-[var(--space-2)] [font-size:var(--text-sm)] leading-snug text-[var(--ink)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.5em] inline-block shrink-0 w-[6px] h-[6px] bg-[var(--signal)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-[var(--space-5)] [font-size:var(--text-sm)] leading-relaxed text-[var(--mid)]">
                {csomag.start}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Rail>
  );
}
