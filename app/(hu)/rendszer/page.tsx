import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, Eyebrow, Rail, Seam } from "@/app/components/ui";
import s from "./rendszer.module.css";

// A sales-rendszer bemutatója mint eladható termék. Szabály: üzleti titok
// nincs rajta (belső működés, technológia, ár, valós adat, ügyfélnév), a
// képernyők kitalált adatokkal készült makettek. Minden állítás olyan, amit
// a saját rendszerünk ténylegesen tud (ld. gbr-sales CLAUDE.md).

const PATH = "/rendszer";
const TITLE = "Rád szabott rendszer: értékesítés és működés egy helyen | THE GBR";
const DESCRIPTION =
  "Nem dobozos szoftver és nem még egy CRM: a cégedre szabott rendszer a megkereséstől az ajánlaton és a projekten át a heti riportig. A saját értékesítésünk is ezen fut.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${PATH}` },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const MA_SOROK = [
  { ido: "08:30", cim: "Válasz: ajánlatkérés, 2 db gép", ok: "Tegnap este jött, még senki nem válaszolt", jel: "sürgős", tipus: "urgent" },
  { ido: "10:00", cim: "Utánkövetés: Példa Bt.", ok: "Ajánlat 6 napja kint, nincs reakció", jel: "ritmus", tipus: "" },
  { ido: "13:30", cim: "Projektindító: raktárbővítés", ok: "Megnyert ügyletből, 4 feladat", jel: "nyert", tipus: "ok" },
  { ido: "16:00", cim: "Heti riport átnézése", ok: "Tölcsér és pipeline", jel: "riport", tipus: "" },
] as const;

const ESZKOZOK = [
  { nev: "Postafiók", kerdes: "ki válaszolt rá?" },
  { nev: "Táblázat", kerdes: "melyik a friss verzió?" },
  { nev: "Csevegő", kerdes: "hol a határidő?" },
  { nev: "Naptár", kerdes: "kit kell ma hívni?" },
  { nev: "Fejben", kerdes: "mennyi lesz a negyedév?" },
] as const;

const MODULOK = [
  { csoport: "Megtalál", nev: "Ügyfélradar", leiras: "Kikhez érdemes kopogni, és mivel." },
  { csoport: "Megtalál", nev: "Közzététel", leiras: "Posztvázlat, jóváhagyás, ütemezés, és látod, melyik hozott megkeresést." },
  { csoport: "Megszerez", nev: "Beérkező", leiras: "Minden megkeresés egy helyen, válaszvázlattal." },
  { csoport: "Megszerez", nev: "Pipeline", leiras: "Ügyletek, utánkövetési ritmus, alvó ajánlatok." },
  { csoport: "Megszerez", nev: "Anyagtár", leiras: "Jóváhagyott, mindig friss bemutatók, linkként küldve." },
  { csoport: "Elvégez", nev: "Projektek", leiras: "A megnyert munka feladatokra bontva, felelőssel, határidővel." },
  { csoport: "Lát", nev: "Napi terv", leiras: "Reggelente összerakott menetrend, indoklással." },
  { csoport: "Lát", nev: "Riport", leiras: "Heti tölcsér, trend, vezetői lap." },
  { csoport: "Mindenhol", nev: "Mobilon is", leiras: "Telepíthető a telefonra, alkalmazásbolt nélkül." },
  { csoport: "Csapat", nev: "Partnerek", leiras: "Külső partner csak azt látja, amit megosztasz vele." },
  { csoport: "Kedv", nev: "Két hívás között", leiras: "Saját kis játékok heti bajnoksággal. Mert emberek használják." },
] as const;

const PELDAK = [
  { ag: "gyártó", cim: "Ajánlatkérés rajzzal", szoveg: "A vevő feltölti a rajzot, a rendszer előre kitölti az ajánlat vázát, a mérnök csak ellenőriz." },
  { ag: "webshop", cim: "Nagy kosár, emberi hívás", szoveg: "A szokatlanul nagy rendelésnél nem levelet kap a vevő, hanem egy kollégád keresi." },
  { ag: "szolgáltató", cim: "Szerződésből emlékeztető", szoveg: "Lejáró szerződés előtt a megújítás magától kerül a napi tervbe." },
] as const;

// Csak ami ma is működik (Projektek, ritmus és feladat, napló az ügyletnél).
const UTANA = [
  { cim: "Projekt a nyert ügyletből", szoveg: "A megnyert munka nem vész el: szakaszok, felelősök, határidők, értesítéssel." },
  { cim: "Utánkövetés, ami nem felejt", szoveg: "Ritmus és feladat emlékeztet, kit kell keresni, és mikor." },
  { cim: "Minden lépés visszanézhető", szoveg: "Levél, hívás, ajánlat, elküldött anyag: egy helyen az ügyletnél." },
  { cim: "Közös munka a partnerrel", szoveg: "Külső partner bevonható, és csak azt látja, amit megosztasz." },
] as const;

const ELVEK = [
  { cim: "Ember hagy jóvá", szoveg: "Ügyfélnek semmi nem megy ki magától. A rendszer előkészít, te küldesz." },
  { cim: "Elkülönítve", szoveg: "A céged adatai más szervezettől szigorúan elválasztva, az EU-ban." },
  { cim: "Napló, ami megmarad", szoveg: "Ami megtörtént, az visszanézhető, utólag nem írható át." },
  { cim: "Nincs tömeges levél", szoveg: "Nem spamgép. Nincs hideg tömeglevél, nincs olvasáskövetés." },
] as const;

const TREND = [30, 42, 38, 55, 48, 60, 52, 66, 61, 72, 70, 84];

function pillClass(tipus: string) {
  if (tipus === "urgent") return `${s.pill} ${s.pillUrgent}`;
  if (tipus === "ok") return `${s.pill} ${s.pillOk}`;
  return s.pill;
}

const H2 =
  "font-display font-black [font-size:var(--text-section)] leading-[0.95] tracking-[-0.045em] max-w-[18ch] text-[var(--ink)]";
const LEAD = "[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[52ch]";
const SH = "grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-6)] lg:gap-[var(--space-16)] items-end mb-[var(--space-10)]";

function Pont() {
  return <span className="text-[var(--signal)]">.</span>;
}

export default function Rendszer() {
  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Rád szabott rendszer", url: `${SITE_URL}${PATH}` },
        ])}
      />

      {/* ===== HERO ===== */}
      <Rail label="Rendszer" dark>
        <section
          className={`${s.wrap} grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-[var(--space-10)] lg:gap-[var(--space-16)] items-center pt-[var(--space-10)] sm:pt-[var(--space-16)] pb-[var(--space-12)] sm:pb-[var(--space-20)]`}
        >
          <div>
            <Eyebrow>Értékesítési és működési rendszer</Eyebrow>
            <h1 className="font-display font-black leading-[0.9] tracking-[-0.052em] [font-size:var(--text-claim)] max-w-[11ch]">
              Nem dobozos. Rád szabott<Pont />
            </h1>
            <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[44ch] mt-[var(--space-8)]">
              Nem webshopot és nem még egy CRM-et adunk. Egy rendszert, ami úgy dolgozik, ahogy a
              céged: a megkereséstől az ajánlaton és a projekten át a heti riportig. A saját
              értékesítésünk is ezen fut.
            </p>
            <div className="mt-[var(--space-8)] flex flex-wrap gap-[var(--space-3)]">
              <Button asChild>
                <Link href="/init">Megnézzük, mi kell neked</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="#egy-nap">Egy nap a rendszerben</Link>
              </Button>
            </div>
          </div>

          <figure className={`${s.app} m-0`} aria-label="Kitalált napi menetrend a rendszer Ma oldalán">
            <div className={s.appHead}>
              <i />
              <i />
              <i />
              <span>Ma · kedd</span>
              <span className={s.right}>kitalált adatok</span>
            </div>
            <div className={s.appIn}>
              <div className={s.side} aria-hidden="true">
                <div className={s.sideBrand}>Minta Kft.</div>
                <div className={s.sideOn}>Ma</div>
                <div>Beérkező</div>
                <div>Ügyletek</div>
                <div>Projektek</div>
                <div>Radar</div>
                <div>Riport</div>
              </div>
              <div className={s.appMain}>
                <h3>
                  Jó reggelt, Anna<Pont />
                </h3>
                <p className={s.note} style={{ marginBottom: 10 }}>
                  A mai menetrended, 7:00-kor összeállítva
                </p>
                {MA_SOROK.map((sor) => (
                  <div key={sor.ido} className={s.row}>
                    <span className={s.rowTime}>{sor.ido}</span>
                    <span>
                      <b>{sor.cim}</b>
                      {sor.ok}
                    </span>
                    <span className={pillClass(sor.tipus)}>{sor.jel}</span>
                  </div>
                ))}
                <div className={s.coach}>
                  <span>Miért így?</span>
                  Ami pénzhez van legközelebb, az megy előre. A kihűlő ajánlat nem vár péntekig.
                </div>
              </div>
            </div>
          </figure>
        </section>

        {/* ===== PROBLÉMA ===== */}
        <section className={`${s.wrap} border-t border-[var(--rule)] pt-[var(--space-12)] sm:pt-[var(--space-16)] pb-[var(--space-12)] sm:pb-[var(--space-20)]`}>
          <Eyebrow>Ahogy most megy</Eyebrow>
          <h2 className={H2}>
            Öt program, öt jelszó. Egyben senki nem látja<Pont />
          </h2>
          <p className={`${LEAD} mt-[var(--space-6)] mb-[var(--space-10)]`}>
            A megkeresés a postafiókban, az ajánlat egy táblázatban, a projekt üzenetekben, a riport a
            fejedben. Mindegyik csinál valamit. Együtt egyik sem.
          </p>
          <ul className={s.chaos}>
            {ESZKOZOK.map((e) => (
              <li key={e.nev}>
                <b>{e.nev}</b>
                {e.kerdes}
              </li>
            ))}
          </ul>
        </section>
      </Rail>

      <Seam />

      {/* ===== EGY NAP ===== */}
      <Rail label="Egy nap">
        <section id="egy-nap" className={`${s.wrap} scroll-mt-[var(--header-height)] py-[var(--space-16)] sm:py-[var(--space-20)]`}>
          <div className={SH}>
            <div>
              <Eyebrow>Egy nap a rendszerben</Eyebrow>
              <h2 className={H2}>
                Reggeltől estig, egy helyen<Pont />
              </h2>
            </div>
            <p className={LEAD}>
              Nem modullistát mutatunk, hanem egy napot. Így látszik, mit kapsz: a rendszer
              előkészít, te döntesz. A képernyők kitalált adatokkal készültek.
            </p>
          </div>

          <ol className={s.day}>
            <li className={s.step}>
              <div className={s.stepTime}>
                07:00<small>Napi terv</small>
              </div>
              <div>
                <h3>Reggel kész a menetrended</h3>
                <p>
                  A rendszer összerakja, mivel érdemes ma kezdeni, és megmondja, miért. Edzőt is
                  kaphatsz hozzá, ha szereted, ha valaki rád szól.
                </p>
              </div>
              <div className={s.mini}>
                <div className={s.miniHead}>
                  <span>Ma</span>
                  <span>4 teendő</span>
                </div>
                <div className={s.miniBody}>
                  <div className={s.coach} style={{ marginTop: 0 }}>
                    <span>Az edző</span>
                    Két ajánlat kihűl, ha ma nem nyúlsz hozzá. Azokkal kezdd.
                  </div>
                </div>
              </div>
            </li>

            <li className={s.step}>
              <div className={s.stepTime}>
                09:12<small>Beérkező</small>
              </div>
              <div>
                <h3>Jön egy megkeresés, a válasz vázlata már ott van</h3>
                <p>
                  Weboldalról, levélből, közösségi posztból: minden egy helyre fut be, besorolva. A
                  választ te küldöd el, a rendszer csak előkészíti.
                </p>
              </div>
              <div className={s.mini}>
                <div className={s.miniHead}>
                  <span>Új megkeresés</span>
                  <span className={`${s.pill} ${s.pillOk}`}>meleg</span>
                </div>
                <div className={s.miniBody}>
                  <span className={s.rowTitle}>Ajánlatkérés, szállítás jövő hónapban</span>
                  <p className={s.draft}>
                    „Köszönöm a megkeresést! Két kérdésem lenne, mielőtt pontos ajánlatot küldök…”
                  </p>
                  <div className={s.acts} aria-hidden="true">
                    <span className={s.actPrimary}>Átnézem és küldöm</span>
                    <span>Szerkesztem</span>
                  </div>
                </div>
              </div>
            </li>

            <li className={s.step}>
              <div className={s.stepTime}>
                11:00<small>Pipeline</small>
              </div>
              <div>
                <h3>Látod, hol tart minden ügylet</h3>
                <p>
                  Szakaszok, értékek, utánkövetési ritmus. Ami elakadt, kiemelve. Az ajánlathoz a
                  jóváhagyott anyagaidat linkként küldöd, mindig a friss változatot.
                </p>
              </div>
              <div className={s.mini}>
                <div className={s.miniHead}>
                  <span>Ügyletek</span>
                  <span>kitalált</span>
                </div>
                <div className={s.miniBody}>
                  <div className={s.kanban}>
                    <div>
                      <em>Új</em>
                      <i>Gépbeszerzés</i>
                      <i>Karbantartás</i>
                    </div>
                    <div>
                      <em>Ajánlat</em>
                      <i>Raktárpolc</i>
                    </div>
                    <div>
                      <em>Tárgyalás</em>
                      <i>Éves keret</i>
                    </div>
                    <div>
                      <em>Nyert</em>
                      <i>Raktárbővítés</i>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className={s.step}>
              <div className={s.stepTime}>
                13:30<small>Projektek</small>
              </div>
              <div>
                <h3>A megnyert munka nem vész el a csevegőben</h3>
                <p>
                  Az ügyletből projekt lesz: szakaszok, felelősök, határidők. Aki feladatot kap,
                  értesítést is kap.
                </p>
              </div>
              <div className={s.mini}>
                <div className={s.miniHead}>
                  <span>Raktárbővítés</span>
                  <span>1 / 3 kész</span>
                </div>
                <div className={s.miniBody}>
                  {[
                    { f: "Felmérés helyszínen", h: "kész", ok: true },
                    { f: "Anyagrendelés", h: "csütörtök", ok: false },
                    { f: "Szerelés", h: "jövő hét", ok: false },
                  ].map((t) => (
                    <div key={t.f} className={`${s.row} ${s.rowSimple}`}>
                      <span className={s.rowTitle}>{t.f}</span>
                      <span className={t.ok ? `${s.pill} ${s.pillOk}` : s.pill}>{t.h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </li>

            <li className={s.step}>
              <div className={s.stepTime}>
                16:00<small>Riport</small>
              </div>
              <div>
                <h3>Pénteken nem táblázatot gyártasz</h3>
                <p>
                  Heti tölcsér, trend, vezetői lap. Abból, ami tényleg történt a rendszerben, nem
                  abból, amit utólag beírt valaki.
                </p>
              </div>
              <div className={s.mini}>
                <div className={s.miniHead}>
                  <span>12 hét trend</span>
                  <span>kitalált</span>
                </div>
                <div className={s.miniBody}>
                  <div className={s.bars} role="img" aria-label="Kitalált 12 hetes trend, emelkedő">
                    {TREND.map((m, i) => (
                      <span
                        key={i}
                        className={i === TREND.length - 1 ? s.barOn : undefined}
                        style={{ height: `${m}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </section>
      </Rail>

      {/* ===== MODULOK ===== */}
      <Rail label="Modulok" className="bg-[var(--panel)] border-y border-[var(--rule)]">
        <section className={`${s.wrap} py-[var(--space-16)] sm:py-[var(--space-20)]`}>
          <div className={SH}>
            <div>
              <Eyebrow>A mi példányunk</Eyebrow>
              <h2 className={H2}>
                Ezekből áll a miénk. A tiéd másból is állhat<Pont />
              </h2>
            </div>
            <p className={LEAD}>
              Ezeket a részeket a saját értékesítésünkhöz építettük. Nálad lehet, hogy három kell
              belőle, és kettő, ami nálunk nincs is.
            </p>
          </div>
          <ul className={s.mods}>
            {MODULOK.map((m) => (
              <li key={m.nev} className={s.mod}>
                <span className={s.modKind}>{m.csoport}</span>
                <h3>{m.nev}</h3>
                <p>{m.leiras}</p>
              </li>
            ))}
            <li className={`${s.mod} ${s.modYou}`}>
              <span className={s.modKind}>A tiéd</span>
              <h3>+ amit a céged kér</h3>
              <p>Ide kerül, ami nálad hiányzik.</p>
            </li>
          </ul>
        </section>
      </Rail>

      {/* ===== RÁD SZABVA ===== */}
      <Rail label="Rád szabva">
        <section className={`${s.wrap} py-[var(--space-16)] sm:py-[var(--space-20)]`}>
          <div className={SH}>
            <div>
              <Eyebrow>Rád szabva</Eyebrow>
              <h2 className={H2}>
                Ahány cég, annyi rendszer<Pont />
              </h2>
            </div>
            <p className={LEAD}>
              A lényeg nem a modul, hanem hogy a te folyamatodhoz igazodik, nem fordítva. Néhány
              irány, amit egy átvilágítás után el tudunk képzelni:
            </p>
          </div>
          <div className={s.ex}>
            {PELDAK.map((p) => (
              <div key={p.ag} className={s.mini}>
                <div className={s.miniHead}>
                  <span>Példa · {p.ag}</span>
                </div>
                <div className={s.miniBody}>
                  <b>{p.cim}</b>
                  {p.szoveg}
                </div>
              </div>
            ))}
          </div>
          <p className={`${s.note} mt-[var(--space-4)]`}>
            Ezek példák, nem kész termékek. Hogy nálad mi kell, azt az átvilágítás mondja meg.
          </p>

          <div className="mt-[var(--space-20)]">
            <Eyebrow>Az eladás után</Eyebrow>
            <h2 className={`${H2} mb-[var(--space-10)]`}>
              Az aláírásnál nem engedjük el az ügyfelet<Pont />
            </h2>
            <dl className={s.rules}>
              {UTANA.map((e) => (
                <div key={e.cim}>
                  <dt>{e.cim}</dt>
                  <dd>{e.szoveg}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-[var(--space-20)]">
            <Eyebrow>Amiben nem engedünk</Eyebrow>
            <h2 className={`${H2} mb-[var(--space-10)]`}>
              A te ügyfeled, a te döntésed<Pont />
            </h2>
            <dl className={s.rules}>
              {ELVEK.map((e) => (
                <div key={e.cim}>
                  <dt>{e.cim}</dt>
                  <dd>{e.szoveg}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-[var(--space-20)]">
            <Eyebrow>Hogyan indul</Eyebrow>
            <h2 className={`${H2} mb-[var(--space-10)]`}>
              Kicsiben kezdjük, ott, ahol a legjobban fáj<Pont />
            </h2>
            <ol className={s.path}>
              <li>
                <span className={s.pathN}>01</span>
                <h3>Átvilágítás</h3>
                <p>Megnézzük, hol folyik el nálad a megkeresés, az ajánlat vagy az idő.</p>
              </li>
              <li>
                <span className={s.pathN}>02</span>
                <h3>Első modul</h3>
                <p>Egy részt építünk meg, ami a legtöbbet hozza. Élesben, a te adataiddal.</p>
              </li>
              <li>
                <span className={s.pathN}>03</span>
                <h3>Bővítés</h3>
                <p>Ami bevált, arra építünk tovább. Annyit, amennyi kell.</p>
              </li>
            </ol>
          </div>
        </section>
      </Rail>

      <Seam />

      {/* ===== ZÁRÁS ===== */}
      <Rail label="Kezdjük" dark>
        <section className={`${s.wrap} py-[var(--space-16)] sm:py-[var(--space-24)]`}>
          <Eyebrow>Mit csinálsz most kézzel?</Eyebrow>
          <h2 className="font-display font-black [font-size:var(--text-claim)] leading-[0.92] tracking-[-0.05em] max-w-[16ch]">
            Írd le egy mondatban, mi visz el a legtöbb időt<Pont />
          </h2>
          <p className={`${LEAD} mt-[var(--space-8)]`}>
            Melyik lépést csinálod minden héten ugyanúgy, kézzel: a válaszlevelet, az
            ajánlat-táblázatot, a pénteki riportot? Abból indulunk. Megmutatjuk, hogyan nézne ki
            nálad, és csak utána beszélünk arról, mi legyen belőle.
          </p>
          <div className="mt-[var(--space-8)]">
            <Button asChild>
              <Link href="/init">Leírom, mit csinálok kézzel</Link>
            </Button>
          </div>
        </section>
      </Rail>
    </main>
  );
}
