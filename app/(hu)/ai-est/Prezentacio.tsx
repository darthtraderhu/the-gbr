"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import s from "./prezentacio.module.css";

// Az AI demo est prezentációja animált weboldalként. Diánként érkezik
// (IntersectionObserver), nyilakkal, szóközzel és a pöttyökkel lapozható,
// teljes képernyőn kivetítőre is jó. Csak az esten elhangzott, nyilvános
// tartalom: kitalált cég adatai, eszköznév, ár, ügyfélnév és működési
// részlet nincs rajta.

type Props = {
  estNev: string;
  datum: string | null;
  brands: string[];
  forrasDatum: string;
  ajandekHref: string;
  ajandekErtek: string;
};

const FOOT = "THE GBR. · értékesítési rendszer, weboldal, webshop B2B cégeknek";

function i(n: number): { "data-i": string; style: CSSProperties } {
  return { "data-i": String(n), style: { "--i": n } as CSSProperties };
}

function Foot({ jobb }: { jobb: string }) {
  return (
    <div className={s.foot}>
      <span>{FOOT}</span>
      <span>{jobb}</span>
    </div>
  );
}

// 0-ról számol fel a célértékig, amikor a dia megjelenik. Szerveren és
// mozgáskorlátozásnál a végérték látszik.
function Szamlalo({ cel, aktiv }: { cel: number; aktiv: boolean }) {
  const [ertek, setErtek] = useState(cel);
  const lefutott = useRef(false);
  useEffect(() => {
    if (!aktiv || lefutott.current) return;
    lefutott.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    const hossz = 1100;
    let raf = 0;
    const lep = (most: number) => {
      const t = Math.min(1, (most - start) / hossz);
      setErtek(Math.round(cel * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(lep);
    };
    raf = requestAnimationFrame(lep);
    return () => cancelAnimationFrame(raf);
  }, [aktiv, cel]);
  return <>{ertek}</>;
}

export default function Prezentacio({ estNev, datum, brands, forrasDatum, ajandekHref, ajandekErtek }: Props) {
  const deckRef = useRef<HTMLDivElement>(null);
  const [aktualis, setAktualis] = useState(0);
  const [lathato, setLathato] = useState<Set<number>>(() => new Set());
  const [teljes, setTeljes] = useState(false);

  const diak = useCallback(
    () => Array.from(deckRef.current?.querySelectorAll<HTMLElement>("[data-dia]") ?? []),
    []
  );

  // Megjelenés és aktuális dia követése.
  useEffect(() => {
    const elemek = diak();
    // A rejtett kiinduló állapot csak JS-sel kapcsol be (CSS: [data-kesz]).
    deckRef.current?.setAttribute("data-kesz", "");
    const obs = new IntersectionObserver(
      (bejegyzesek) => {
        for (const b of bejegyzesek) {
          const idx = Number((b.target as HTMLElement).dataset.dia);
          if (b.isIntersecting && b.intersectionRatio >= 0.35) {
            setLathato((elozo) => (elozo.has(idx) ? elozo : new Set(elozo).add(idx)));
          }
          if (b.isIntersecting && b.intersectionRatio >= 0.55) setAktualis(idx);
        }
      },
      { threshold: [0, 0.35, 0.55, 0.8] }
    );
    elemek.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [diak]);

  const ugras = useCallback(
    (idx: number) => {
      const elemek = diak();
      const cel = elemek[Math.max(0, Math.min(elemek.length - 1, idx))];
      if (!cel) return;
      const sima = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      cel.scrollIntoView({ behavior: sima ? "smooth" : "auto", block: "start" });
    },
    [diak]
  );

  // Billentyűzet: jobbra/le/szóköz/PageDown előre, balra/fel/PageUp vissza.
  useEffect(() => {
    const kezelo = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const cel = e.target as HTMLElement | null;
      if (cel && (cel.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(cel.tagName))) return;
      const elore = ["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key);
      const vissza = ["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key);
      if (!elore && !vissza) return;
      e.preventDefault();
      ugras(aktualis + (elore ? 1 : -1));
    };
    window.addEventListener("keydown", kezelo);
    return () => window.removeEventListener("keydown", kezelo);
  }, [aktualis, ugras]);

  useEffect(() => {
    const valt = () => setTeljes(document.fullscreenElement === deckRef.current);
    document.addEventListener("fullscreenchange", valt);
    return () => document.removeEventListener("fullscreenchange", valt);
  }, []);

  async function teljesKepernyo() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await deckRef.current?.requestFullscreen();
    } catch {
      // Nem minden böngésző engedi (pl. iPhone Safari): ott görgetve megy.
    }
  }

  const dia = (idx: number, cimke: string, osztaly: string, tartalom: ReactNode, tema?: "light") => (
    <section
      key={idx}
      data-dia={idx}
      data-lathato={lathato.has(idx) ? "1" : "0"}
      data-theme={tema}
      aria-label={`${idx + 1}. dia: ${cimke}`}
      className={`${s.slide} ${osztaly}`}
    >
      {tartalom}
    </section>
  );

  const slides: { cimke: string; render: (idx: number) => ReactNode }[] = [
    {
      cimke: "Nyitás",
      render: (idx) =>
        dia(
          idx,
          "Nyitás",
          "",
          <>
            <div className={s.coverGlow} aria-hidden="true" />
            <div className={s.coverMeta} {...i(0)}>
              <p className={s.wm}>
                THE GBR<span className={s.dot}>.</span>
              </p>
              <p className={s.eb}>
                <span className={s.liveDot} aria-hidden="true" />
                {estNev}
                {datum ? ` · ${datum}` : ""}
              </p>
            </div>
            <h1 className={s.h1} {...i(1)}>
              Nem AI-t árulunk<span className={s.dot}>.</span>
            </h1>
            <p className={s.lede} {...i(2)}>
              Olyan rendszert építünk, amitől az eladó reggel tudja, kit hívjon, és mit mondjon neki.
            </p>
            <p className={`${s.note} ${s.mono}`} {...i(3)}>
              Lapozz: ↓ vagy → · szóköz
            </p>
            <Foot jobb="thegbr.eu" />
          </>
        ),
    },
    {
      cimke: "Magunkról",
      render: (idx) =>
        dia(
          idx,
          "Magunkról",
          "",
          <>
            <p className={s.eb} {...i(0)}>
              Magunkról
            </p>
            <h2 className={s.h2} {...i(0)}>
              Nem fejlesztőként kezdtük.
            </h2>
            <div className={s.cards}>
              {[
                ["2002", "Eladással kezdtük", "Gábor húsz évnél is több éve ad el. A vevőt nem a termék érdekli, hanem hogy megoldja-e a gondját."],
                ["2020", "Megalakult a cég", "Hogy amit addig egy ember csinált, abból rendszer legyen."],
                ["Ma", "Rendszer és weboldal", "Átvilágítunk, megépítjük a cégre szabott értékesítési rendszert, és mellé a weboldalt."],
              ].map(([ev, cim, szoveg], n) => (
                <div key={ev} className={s.card} {...i(n + 1)}>
                  <p className={s.eb}>{ev}</p>
                  <h3 className={s.h3}>{cim}</h3>
                  <p className={s.p}>{szoveg}</p>
                </div>
              ))}
            </div>
            <p className={s.lede} {...i(4)}>
              Nálunk nem az a kérdés, milyen technológia. Hanem hogy hoz-e ügyfelet.
            </p>
            <Foot jobb="GBR Marketing Solutions Kft." />
          </>
        ),
    },
    {
      cimke: "Menetrend",
      render: (idx) =>
        dia(
          idx,
          "Menetrend",
          "",
          <>
            <p className={s.eb} {...i(0)}>
              Hétfő, 7:00 · kitalált cég, kitalált adat
            </p>
            <h2 className={s.h2} {...i(0)}>
              Nem listát kapsz. Menetrendet.
            </h2>
            <div className={s.plan}>
              {[
                ["08:30", "Bakonyi Precíziós Alkatrész", "Tegnap kért ajánlatot, még nem kapott választ", "Vázlat kész", true],
                ["09:15", "Alföldi Hidraulika", "Második nap az első válasz után: most kell hívni", "Hívás", false],
                ["10:00", "Somogyi Szerszámgyártó", "Az ajánlat 3 hete alszik", "Rákérdezés", false],
              ].map(([ido, ceg, ok, cimke, go], n) => (
                <div key={String(ido)} className={s.row} {...i(n + 1)}>
                  <p className={s.time}>{ido}</p>
                  <div>
                    <h3 className={s.h3}>{ceg}</h3>
                    <p className={s.p}>{ok}</p>
                  </div>
                  <p className={`${s.tag} ${go ? s.tagGo : ""}`}>{cimke}</p>
                </div>
              ))}
            </div>
            <p className={s.coach} {...i(4)}>
              „Három dolog ma. Az első hívással kezdd, mert ott vár a legrégebben valaki.”
            </p>
            <Foot jobb="Kitalált cég, kitalált adat" />
          </>
        ),
    },
    {
      cimke: "Új ügyfél",
      render: (idx) =>
        dia(
          idx,
          "Új ügyfél",
          "",
          <>
            <p className={s.eb} {...i(0)}>
              Új ügyfél
            </p>
            <h2 className={s.h2} {...i(0)}>
              Egy címből elemzés és első levél.
            </h2>
            <div className={s.steps}>
              <div className={s.step} {...i(1)}>
                <p className={s.n}>01</p>
                <h3 className={s.h3}>Egy cím</h3>
                <p className={s.p}>Egy cég weboldala, semmi más</p>
              </div>
              <div className={`${s.step} ${s.stepHot}`} {...i(2)}>
                <p className={s.n}>02 · példa</p>
                <p className={s.big}>
                  <Szamlalo cel={86} aktiv={lathato.has(idx)} />
                </p>
                <p className={s.p}>pont: illik hozzád, és most van rá szüksége</p>
              </div>
              <div className={s.step} {...i(3)}>
                <p className={s.n}>03</p>
                <h3 className={s.h3}>Átvilágítás</h3>
                <p className={s.p}>Mi hiányzik nála, tényekkel</p>
              </div>
              <div className={s.step} {...i(4)}>
                <p className={s.n}>04</p>
                <h3 className={s.h3}>Első levél</h3>
                <p className={s.p}>A legerősebb hiányával kezd</p>
              </div>
              <div className={s.step} {...i(5)}>
                <p className={s.n}>05</p>
                <h3 className={s.h3}>Te döntesz</h3>
                <p className={s.p}>Jóváhagyás nélkül nem megy ki</p>
              </div>
            </div>
            <p className={s.note} {...i(6)}>
              Nem tömeglevél: hetente néhány, mindegyiket ember hagyja jóvá.
            </p>
            <Foot jobb="Elküldeni mindig te döntesz" />
          </>
        ),
    },
    {
      cimke: "Weboldal és webshop",
      render: (idx) =>
        dia(
          idx,
          "Weboldal és webshop",
          s.paper,
          <>
            <p className={s.eb} {...i(0)}>
              Weboldal és webshop · műszaki alap
            </p>
            <h2 className={s.h2} {...i(0)}>
              Amire a világmárkák építenek, arra építjük a te oldaladat is.
            </h2>
            <div className={s.brands}>
              {brands.map((b, n) => (
                <p key={b} className={s.brand} {...i(n + 1)}>
                  {b}
                </p>
              ))}
            </div>
            <div className={s.chain}>
              <p className={s.chip} {...i(brands.length + 1)}>
                Ajánlatkérés az oldalon
              </p>
              <p className={s.arrow} aria-hidden="true" {...i(brands.length + 2)}>
                →
              </p>
              <p className={s.chip} {...i(brands.length + 3)}>
                Beérkező
              </p>
              <p className={s.arrow} aria-hidden="true" {...i(brands.length + 4)}>
                →
              </p>
              <p className={`${s.chip} ${s.chipGo}`} {...i(brands.length + 5)}>
                Holnap reggel a menetrendben
              </p>
            </div>
            <Foot jobb={`Forrás: nextjs.org/showcase, ${forrasDatum}. Nem ügyfeleink.`} />
          </>,
          "light"
        ),
    },
    {
      cimke: "Az eladás után",
      render: (idx) =>
        dia(
          idx,
          "Az eladás után",
          "",
          <>
            <p className={s.eb} {...i(0)}>
              Az eladás után
            </p>
            <h2 className={s.h2} {...i(0)}>
              Az eladással nincs vége.
            </h2>
            <div className={s.cards}>
              {[
                ["Ügyfelek", "Szól, ha egy ügyfélre rég néztél rá, vagy közeleg egy szerződés felmondási határideje."],
                ["Anyagtár", "A cég nevében csak jóváhagyott anyag mehet ki, linkként, ügylethez kötve."],
                ["Havi riport", "Honnan jöttek a megkeresések, és mi lett belőlük. Egy oldalon."],
              ].map(([cim, szoveg], n) => (
                <div key={cim} className={s.card} {...i(n + 1)}>
                  <h3 className={s.h3}>{cim}</h3>
                  <p className={s.p}>{szoveg}</p>
                </div>
              ))}
            </div>
            <p className={s.lede} {...i(4)}>
              Nem kézikönyvből tanulod: minden oldal elmondja magát.
            </p>
            <Foot jobb="Telefonon is, a zsebedben" />
          </>
        ),
    },
    {
      cimke: "A telefonodon",
      render: (idx) =>
        dia(
          idx,
          "A telefonodon",
          "",
          <>
            <div className={s.appGrid}>
              <div className="flex flex-col gap-[clamp(16px,2.6vh,32px)]">
                <p className={s.eb} {...i(0)}>
                  Alkalmazás · a telefonodon
                </p>
                <h2 className={s.h2} {...i(1)}>
                  A saját világod, a zsebedben.
                </h2>
                <p className={s.lede} {...i(2)}>
                  Nem csak értékesítési rendszer. Egy egész segítő ökoszisztéma, ami veled dolgozik egész nap.
                </p>
                <div className={s.eco} {...i(3)}>
                  {[
                    "Napi menetrend",
                    "Beérkező",
                    "Ajánlatok",
                    "Új ügyfelek",
                    "Projektek, feladatok",
                    "Ügyfélgondozás",
                    "Anyagtár",
                    "Közösségi posztok",
                    "Havi riport",
                  ].map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
              <div className={s.phone} {...i(2)}>
                <Image
                  src="/ai-est/ma-oldal-telefonon.png"
                  alt="A Ma oldal telefonon, kitalált cég adataival"
                  width={780}
                  height={1688}
                  sizes="300px"
                />
              </div>
            </div>
            <Foot jobb="Kitalált cég adataival" />
          </>
        ),
    },
    {
      cimke: "Élőben",
      render: (idx) =>
        dia(
          idx,
          "Élőben",
          "",
          <>
            <p className={s.eb} {...i(0)}>
              Élőben · jogi gyorsellenőrzés
            </p>
            <h2 className={s.h2} {...i(0)}>
              Az esten élőben néztünk meg oldalakat. A tiédet is megnézzük.
            </h2>
            <div className={`${s.cards} ${s.cards6}`}>
              {[
                ["Impresszum", "Elérhető a nyitóoldalról? Megvannak a cégadatok?"],
                ["Adatkezelés", "Van tájékoztató, friss, és szól a követőkódokról?"],
                ["Sütik", "Mér-e az oldal a hozzájárulás előtt?"],
                ["Webshopnál ÁSZF", "Megtalálható a vásárlás előtt?"],
                ["Biztonság", "Titkosított kapcsolat, működő linkek"],
                ["Ami eladást hoz", "Mobilnézet, sebesség, ajánlatkérés"],
              ].map(([cim, szoveg], n) => (
                <div key={cim} className={s.card} {...i(n + 1)}>
                  <h3 className={s.h3}>{cim}</h3>
                  <p className={s.p}>{szoveg}</p>
                </div>
              ))}
            </div>
            <p className={s.note} {...i(7)}>
              Gépi gyorsellenőrzés tényekkel, nem jogi vélemény.
            </p>
            <Foot jobb="Csak a saját cégedet add meg" />
          </>
        ),
    },
    {
      cimke: "Zárás",
      render: (idx) =>
        dia(
          idx,
          "Zárás",
          s.lime,
          <>
            <p className={s.eb} {...i(0)}>
              THE GBR.
            </p>
            <h2 className={s.h1} {...i(0)}>
              Nem dobozos.
              <br />
              Rád szabott.
            </h2>
            <div className={s.endRow}>
              <div className="flex flex-col gap-[clamp(16px,3vh,32px)]">
                <p className={s.ask} {...i(1)}>
                  Egy kérdés mindenkinek:
                  <br />
                  mit csinálsz most kézzel?
                </p>
                <p className={s.lede} {...i(2)}>
                  Az est résztvevőinek ajándék: a {ajandekErtek} értékű gyorsátvilágítás a saját oldaladról.
                </p>
                <div className={s.ctaRow} {...i(3)}>
                  <Link href={ajandekHref} className={s.btnDark}>
                    Kérem az ajándék átvilágítást <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className={s.qrBox} {...i(3)}>
                <Image src="/ai-est/qr-ajandek.svg" alt="QR-kód: thegbr.eu/ai-est/ajandek" width={240} height={240} unoptimized />
                <p>thegbr.eu/ai-est/ajandek</p>
              </div>
            </div>
            <Foot jobb="thegbr.eu/ai-est/ajandek" />
          </>
        ),
    },
  ];

  return (
    <div ref={deckRef} data-theme="dark" className={s.deck}>
      {slides.map((sl, idx) => sl.render(idx))}

      <nav className={s.rail} aria-label="Diák">
        {slides.map((sl, idx) => (
          <button
            key={sl.cimke}
            type="button"
            className={`${s.railDot} ${aktualis === idx ? s.railDotOn : ""}`}
            aria-label={`${idx + 1}. dia: ${sl.cimke}`}
            aria-current={aktualis === idx ? "true" : undefined}
            onClick={() => ugras(idx)}
          />
        ))}
      </nav>

      <div className={s.controls}>
        <span className={s.counter} aria-live="polite">
          {String(aktualis + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <button type="button" className={s.ctrlBtn} onClick={() => ugras(aktualis - 1)} aria-label="Előző dia">
          ↑
        </button>
        <button type="button" className={s.ctrlBtn} onClick={() => ugras(aktualis + 1)} aria-label="Következő dia">
          ↓
        </button>
        <button type="button" className={`${s.ctrlBtn} hidden md:inline-block`} onClick={teljesKepernyo}>
          {teljes ? "Kilépés" : "Teljes képernyő"}
        </button>
      </div>
    </div>
  );
}
