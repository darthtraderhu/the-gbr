import { Rail } from "@/app/components/ui";
import { DevFrame } from "@/app/components/ServiceFrame";
import { INTEGRATION_METHODS, INTEGRATION_SYSTEMS } from "@/lib/integraciok";

// „Rendszerek, amiket összekötünk”: rendszertípusok konkrét példákkal, a
// kapcsolódás módjai és a saját értékesítési rendszerünk mint bizonyíték.
// A webfejlesztés és az automatizáció aloldal közös blokkja.
export default function IntegrationMap() {
  return (
    <Rail label="Integráció">
      <section className="px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)]">
        <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase text-[var(--dim)] mb-[var(--space-5)]">
          Rendszerintegráció
        </p>
        <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.94] tracking-[-0.05em] max-w-[15ch]">
          Rendszerek, amiket összekötünk
          <span className="text-[var(--signal)]">.</span>
        </h2>
        <p className="mt-[var(--space-6)] max-w-[62ch] [font-size:var(--text-lg)] leading-relaxed text-[var(--ink-2)]">
          A legtöbb cégnél nem egy újabb szoftver hiányzik, hanem a kapcsolat a meglévők között.
          Ezeket kötjük össze, ahol van hozzájuk hivatalos kapcsolódási pont: API, webhook vagy
          rendszeres export.
        </p>
      </section>

      <div className="px-6 pb-[var(--space-8)]">
        <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--rule)]">
          {INTEGRATION_SYSTEMS.map((system) => (
            <li
              key={system.title}
              className="p-[var(--space-6)] border-r border-b border-[var(--rule)] bg-[var(--ground)]"
            >
              <h3 className="font-display font-bold [font-size:var(--text-xl)] tracking-[-0.02em] leading-tight text-[var(--ink)]">
                {system.title}
              </h3>
              <ul className="m-0 mt-[var(--space-3)] p-0 list-none flex flex-wrap gap-[var(--space-2)]">
                {system.examples.map((example) => (
                  <li
                    key={example}
                    className="px-[var(--space-2)] py-[2px] border border-[var(--rule)] bg-[var(--panel)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.06em] text-[var(--ink-2)]"
                  >
                    {example}
                  </li>
                ))}
              </ul>
              <p className="mt-[var(--space-3)] [font-size:var(--text-sm)] leading-relaxed text-[var(--ink-2)]">
                {system.flow}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-[var(--space-6)] flex flex-wrap items-center gap-x-[var(--space-4)] gap-y-[var(--space-2)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.18em] uppercase text-[var(--mid)]">
          <span className="text-[var(--dim)]">Hogyan:</span>
          {INTEGRATION_METHODS.map((method) => (
            <span key={method} className="flex items-center gap-[var(--space-2)]">
              <span
                aria-hidden="true"
                className="inline-block w-[6px] h-[6px] bg-[var(--signal)]"
              />
              {method}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 pb-[var(--space-12)] sm:pb-[var(--space-16)]">
        <DevFrame header="Bizonyíték · a saját rendszerünk is így működik">
          <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed">
            Ennek az oldalnak a kapcsolati űrlapja nem egy postafiókba küld levelet. A megkeresés
            védett kapcsolaton egyenesen a saját értékesítési rendszerünk Beérkezőjébe fut, ahol
            bejelentkezés után a felelős látja és viszi tovább. Ugyanez a minta köt össze egy
            webshopot a számlázóval, vagy egy űrlapot a CRM-mel.
          </p>
          <p className="mt-[var(--space-4)] [font-size:var(--text-sm)] text-[var(--mid)]">
            Egyedi ERP vagy CRM fejlesztése külön projekt. A kapcsolódást a meglévőhöz viszont
            megoldjuk, és a felmérésben írásban leírjuk, mit hogyan kötünk össze.
          </p>
        </DevFrame>
      </div>
    </Rail>
  );
}
