"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_URL } from "@/lib/site";
import { faqPageSchema, offerSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";

// A választó nem pontszámot ad, csak azt, melyik felállás illik a leírt
// helyzethez. Nem ígérünk eredményt (lead-szám, ROAS), és nem becsülünk
// keretet: a végleges terjedelem és ár a felmérés után derül ki.
type Helyzet = {
  id: string;
  label: string;
  detail: string;
  anchor: string;
  packageName: string;
};

const HELYZETEK: Helyzet[] = [
  {
    id: "nincs-oldal",
    label: "Nincs jó oldalam",
    detail: "Most nincs oldalad, vagy a mostani lassú, és nem jön rajta megkeresés.",
    anchor: "csomag-web-arculat",
    packageName: "Weboldal és arculat",
  },
  {
    id: "eladnek",
    label: "Online is eladnék",
    detail: "Nem csak jelen lennél: webshop, hirdetés és mérés kell, egy rendszerben.",
    anchor: "csomag-webshop-skalazas",
    packageName: "Webshop és skálázás",
  },
  {
    id: "egy-felelos",
    label: "Egy felelőst akarok",
    detail: "Nem akarsz szolgáltatókat koordinálni: fejlesztés, üzemeltetés, tartalom egy kézben.",
    anchor: "csomag-fejlesztes-uzemeltetes",
    packageName: "Fejlesztés és üzemeltetés",
  },
  {
    id: "van-oldal",
    label: "Van oldalam, figyelni kell",
    detail: "Működik az oldalad, csak tudni szeretnéd, rendben van-e, és mi változott.",
    anchor: "csomag-pulzus",
    packageName: "Pulzus",
  },
];

// A pozicionálás három pillére (lib/site-links.ts PILLEREK): a csomagok a
// Felület pillérhez tartoznak. Itt azt mutatjuk meg, hol a helyük.
function lepcso(belepoAr: string) {
  return [
    {
      n: "01",
      name: "Átvilágítás",
      text: "Kiderül, hol vész el most a megkeresés és az ajánlat.",
      price: `Fix áron, nettó ${belepoAr}-tól`,
      href: "/gyors-indulas",
      linkLabel: "Fix áras első lépések",
      here: false,
    },
    {
      n: "02",
      name: "Rendszer",
      text: "A cégedre szabott értékesítési rendszer a megkereséstől a szerződésig.",
      price: "Egyedi ajánlat",
      href: "/rendszer",
      linkLabel: "Egy nap a rendszerben",
      here: false,
    },
    {
      n: "03",
      name: "Felület",
      text: "Weboldal, webshop és hirdetés, ami a megkeresést a rendszerbe hozza.",
      price: "Ezen az oldalon",
      href: "#csomag-web-arculat",
      linkLabel: "A csomagok",
      here: true,
    },
  ];
}

const PACKAGES = [
  {
    id: "csomag-web-arculat",
    railLabel: "01 / Belépő",
    n: "01",
    tag: "Belépő",
    hot: false,
    name: "Weboldal és arculat",
    desc: "Ha most nincs oldalad, vagy a mostani lassú és nem hoz megkeresést. Ez az alap, amire később építeni lehet.",
    price: "Egyedi ajánlat",
    priceNote: "a felmérés után",
    items: [
      "Vállalati weboldal Next.js alapon",
      "Egyedi dizájn és design rendszer",
      "Kapcsolati űrlap, ami tényleg megérkezik, és beköthető az értékesítési rendszerbe",
      "Technikai SEO: sitemap, strukturált adat, canonical",
      "Szövegezés, ha kell",
    ],
    notIncluded:
      "Webshop-funkciót, hirdetéskezelést és folyamatos üzemeltetést. Ha ezek is kellenek, a 02-es vagy 03-as felállás a reális.",
    href: "/init?csomag=web-arculat",
  },
  {
    id: "csomag-webshop-skalazas",
    railLabel: "02 / Eladás",
    n: "02",
    tag: "Ha eladnál is",
    hot: true,
    name: "Webshop és skálázás",
    desc: "Ha eladni is akarsz, nem csak jelen lenni. Webshop, hirdetés és mérés egy rendszerben.",
    price: "Teljes infrastruktúra",
    priceNote: "projekt + havidíj",
    items: [
      "Minden az előzőből",
      "Webshop nulláról vagy meglévő rendszer fölé",
      "Telefonra telepíthető változat (PWA)",
      "Fizetés, szállítás, számlázás integrálva",
      "Admin felület, amit a kollégák is használni tudnak",
      "Google és Meta kampányok, videós hirdetésekkel",
      "Heti jelentés, érthető nyelven",
    ],
    notIncluded:
      "A folyamatos üzemeltetést, monitoringot és a jogi megfelelés karbantartását. Élesítés után a hibákat javítjuk, de nem figyeljük 0-24-ben.",
    href: "/init?csomag=webshop-skalazas",
  },
  {
    id: "csomag-fejlesztes-uzemeltetes",
    railLabel: "03 / Teljes",
    n: "03",
    tag: "Teljes lefedettség",
    hot: false,
    name: "Fejlesztés és üzemeltetés",
    desc: "Ha nem akarsz szolgáltatókat koordinálni. Egy felelős, minden a helyén.",
    price: "Havi keret",
    priceNote: "óraszám alapon",
    items: [
      "Minden az előzőből",
      "Folyamatos fejlesztés havi óraszámban",
      "Monitoring és hibariasztás",
      "AI chat a weboldalon",
      "Videó és tartalomgyártás: ezt is intézzük",
      "Megkeresések bekötése az értékesítési rendszerbe, ha van",
      "Jogi megfelelés karbantartása",
      "Egy felelős kapcsolattartó",
    ],
    notIncluded:
      "Magát az értékesítési rendszert: az a Rendszer, átvilágítással indul, és külön ajánlatot kap. Ügyviteli, számlázó vagy raktárrendszer fejlesztése szintén külön projekt, a kapcsolódást viszont megoldjuk.",
    href: "/init?csomag=fejlesztes-uzemeltetes",
  },
  {
    id: "csomag-pulzus",
    railLabel: "04 / Folyamatos",
    n: "04",
    tag: "Folyamatos",
    hot: false,
    name: "Pulzus",
    desc: "Ha van már működő oldalad, és csak azt szeretnéd tudni, hogy rendben van-e. Havi figyelés és egy levél arról, mi változott.",
    price: "Havidíjas",
    priceNote: "havonta, felmondható",
    items: [
      "Weboldal-figyelés: elérhetőség, sebesség, tanúsítvány, űrlap",
      "Google-profil: értékelések és helyi megjelenés",
      "Értékelés-kérés a vásárlás után",
      "Jogi modul: süti- és szkriptfigyelés, webjogász-felülvizsgálat",
      "Havi levél konkrét javaslatokkal",
      "Igény szerint havi fejlesztési óra",
    ],
    notIncluded:
      "A weboldal fejlesztését. A Pulzus figyel és jelez — a javítás külön megrendelés, vagy a havi órakeret terhére megy.",
    href: "/init?csomag=pulzus",
  },
];

const FAQ_ITEMS = [
  {
    question: "Mi a különbség egy csomag és a Rendszer között?",
    answer:
      "A csomag a felület: weboldal, webshop, hirdetés, üzemeltetés. Ez hozza a megkeresést. A Rendszer az, ami utána történik vele: ki válaszol, mikor követjük, hol tart az ajánlat. A kettő összeköthető, de egyik sem feltétele a másiknak.",
  },
  {
    question: "Hogyan alakul ki a végleges ár?",
    answer:
      "A felmérés után. Az első beszélgetésen megbeszéljük, mit szeretnél elérni; utána átnézzük a meglévő rendszereidet, és fix árat meg határidőt adunk — nem sávot. Ha a felmérés során kiderül, hogy másra van szükséged, mint amit kértél, azt megmondjuk.",
  },
  {
    question: "Van kötelező hűségidő?",
    answer:
      "Nincs. A fejlesztés projekt alapon fut, az üzemeltetés és a marketing havidíjas — utóbbi bármikor felmondható a szerződésben rögzített határidővel. Egy dolgot viszont érdemes tudni: egy kampány három hónapnál rövidebb idő alatt nem ad értékelhető adatot. Ha egy hónap után döntenél, még nem lesz mit értékelni.",
  },
  {
    question: "Mi van, ha teljesen egyedi rendszerre van szükségem?",
    answer:
      "Akkor nem csomag kell, hanem Rendszer: a cégedre szabott értékesítési rendszer a megkereséstől a szerződésig. Átvilágítással indul, utána egy modul élesben, és csak akkor megyünk tovább, ha láttad az első eredményt. Ügyviteli szoftverhez, számlázóhoz, raktárkezelőhöz is kapcsolódunk; ilyenkor a felmérés hosszabb, mert előbb meg kell értenünk, hogyan működik a cég.",
  },
  {
    question: "Mi történik a régi oldalammal?",
    answer:
      "Nem kapcsoljuk le, amíg az új nem működik bizonyítottan. Az URL-eket átirányítjuk, hogy a Google-találatok ne vesszenek el — platformváltásnál ez a legdrágább hiba, amit el lehet követni.",
  },
  {
    question: "Kell hozzá értenem a technikához?",
    answer: "Nem. Ami kell: tudd megmondani, mit szeretnél elérni. A többi a mi dolgunk.",
  },
];

const WORK_ITEMS = [
  {
    title: "Infrastruktúra",
    text: "A Vercel platformján üzemeltetünk, ami globális CDN-t és automatikus skálázást ad. A rendelkezésre állásra a szolgáltató saját garanciája érvényes — ezt nem mi ígérjük, hanem ők.",
  },
  {
    title: "Hibakezelés",
    text: "Monitoring fut az általunk üzemeltetett rendszereken. Kritikus hiba esetén munkanapokon néhány órán belül reagálunk — a konkrét reakcióidőt az üzemeltetési szerződés rögzíti, nem egy weboldali felirat.",
  },
  {
    title: "Adatvédelem",
    text: "Adatkezelési tájékoztató, cookie-kezelés, adatfeldolgozói szerződés — mindegyik a projekt része, nem utólagos toldalék. A megfelelés folyamatos munka, ezért karbantartjuk.",
  },
  {
    title: "Átláthatóság",
    text: "Heti vagy kétheti írásos jelentés arról, mi történt és mi következik. Ha valami csúszik, azt előre megmondjuk.",
  },
];

export default function ArchitekturaClient({ belepoAr }: { belepoAr: string }) {
  const [helyzetId, setHelyzetId] = useState(HELYZETEK[0].id);

  const helyzet = HELYZETEK.find((h) => h.id === helyzetId) ?? HELYZETEK[0];
  const lepcsok = lepcso(belepoAr);

  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
      {PACKAGES.map((pkg) => (
        <JsonLd
          key={pkg.id}
          data={offerSchema({
            name: pkg.name,
            description: `${pkg.desc} Ár: ${pkg.price}, ${pkg.priceNote} — nincs fix árlista, a végleges ajánlat egyedi felmérés alapján készül.`,
            url: `${SITE_URL}/architektura#${pkg.id}`,
          })}
        />
      ))}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .faq-q .faq-pm-plus { display: inline; }
        .faq-q .faq-pm-minus { display: none; }
        .faq-q[open] .faq-pm-plus { display: none; }
        .faq-q[open] .faq-pm-minus { display: inline; }
      `,
        }}
      />

      {/* ===== SÖTÉT FEJLÉC + HOL A HELYE ===== */}
      <Rail label="Csomagok" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <h1 className="font-display font-black leading-[0.88] tracking-[-0.055em] [font-size:var(--text-display)]">
            Csomagok
            <br />
            és árazás<span className="text-[var(--signal)]">.</span>
          </h1>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[52ch] mt-[var(--space-8)]">
            A weboldal, a webshop és a hirdetés a felület: ez hozza a megkeresést. Nagy munkára
            nincs fix árlista, mert nincs két egyforma projekt. Van viszont négy tipikus felállás,
            és fix áron, nettó {belepoAr}-tól kezdheted egy átvilágítással.
          </p>
        </section>

        <div className="border-t border-[var(--rule)]">
          <div className="px-6 py-3 border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)]">
            Hol a helye a csomagoknak
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 list-none m-0 p-0">
            {lepcsok.map((lep, i) => (
              <li
                key={lep.n}
                className={`px-6 py-[var(--space-8)] border-b md:border-b-0 border-[var(--rule)] ${
                  i < lepcsok.length - 1 ? "md:border-r" : ""
                } ${lep.here ? "bg-[var(--panel)]" : ""}`}
              >
                <div className="flex items-baseline justify-between gap-[var(--space-3)] mb-[var(--space-3)]">
                  <span className="font-display font-black [font-size:var(--text-numeral-lg)] leading-[0.8] tracking-[-0.06em] text-[var(--rule)]">
                    {lep.n}
                  </span>
                  <span
                    className={`[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-right ${
                      lep.here ? "text-[var(--signal-deep)]" : "text-[var(--mid)]"
                    }`}
                  >
                    {lep.price}
                  </span>
                </div>
                <h2 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] mb-[var(--space-2)]">
                  {lep.name}
                  {lep.here && <span className="text-[var(--signal)]">.</span>}
                </h2>
                <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] mb-[var(--space-4)]">
                  {lep.text}
                </p>
                <Link
                  href={lep.href}
                  className="[font-size:var(--text-sm)] text-[var(--ink)] underline decoration-[var(--rule-strong)] underline-offset-4 hover:decoration-[var(--signal)]"
                >
                  {lep.linkLabel} &rarr;
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className="border-t border-[var(--rule)]">
          <div className="px-6 py-3 border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)]">
            Választó · melyik felállás illik hozzád
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
            <fieldset className="lg:border-r border-[var(--rule)] px-6 py-[var(--space-8)] m-0 min-w-0">
              <legend className="sr-only">Mi a helyzeted most?</legend>
              <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-5)]">
                Mi a helyzeted most?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-3)]">
                {HELYZETEK.map((h) => {
                  const aktiv = h.id === helyzet.id;
                  return (
                    <button
                      key={h.id}
                      type="button"
                      aria-pressed={aktiv}
                      onClick={() => setHelyzetId(h.id)}
                      className={`text-left px-[var(--space-4)] py-[var(--space-4)] border rounded-[4px] font-display font-semibold [font-size:var(--text-base)] transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] ${
                        aktiv
                          ? "border-[var(--signal)] bg-[var(--panel)] text-[var(--ink)]"
                          : "border-[var(--rule)] text-[var(--ink-2)] hover:border-[var(--rule-strong)]"
                      }`}
                    >
                      {h.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div className="px-6 py-[var(--space-8)] flex flex-col justify-between gap-[var(--space-6)]" aria-live="polite">
              <div>
                <span className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-2)]">
                  Ehhez ez illik
                </span>
                <span className="block font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] text-[var(--signal)] mb-[var(--space-3)]">
                  {helyzet.packageName}
                </span>
                <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[44ch]">
                  {helyzet.detail}
                </p>
              </div>
              <div>
                <Button asChild size="sm">
                  <Link href={`#${helyzet.anchor}`}>Mutasd a csomagot &rarr;</Link>
                </Button>
              </div>
            </div>
          </div>
          <p className="px-6 py-[var(--space-4)] pb-[var(--space-10)] border-t border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] text-[var(--mid)] leading-[1.7]">
            A választó kiindulópont, nem ajánlat. Hogy pontosan mi kell, és mennyibe kerül, az a
            felmérés után derül ki: fix árat és határidőt adunk, nem sávot.
          </p>
        </div>
      </Rail>

      <Seam />

      {/* ===== CSOMAGOK ===== */}
      {PACKAGES.map((pkg) => (
        <Rail key={pkg.id} label={pkg.railLabel}>
          <section id={pkg.id} className="border-b border-[var(--rule)]">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(150px,20%)_1fr_minmax(0,26%)] gap-[var(--space-6)] sm:gap-[var(--space-10)] px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)] sm:pb-[var(--space-9)]">
              <div>
                <div className="font-display font-black [font-size:var(--text-numeral-xl)] leading-[0.78] tracking-[-0.06em] text-[var(--rule)]">
                  {pkg.n}
                </div>
                <div
                  className={`mt-[var(--space-3)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase ${
                    pkg.hot ? "text-[var(--signal-deep)]" : "text-[var(--mid)]"
                  }`}
                >
                  {pkg.tag}
                </div>
              </div>
              <div>
                <h2 className="font-display font-extrabold [font-size:var(--text-svc-title)] tracking-[-0.036em] leading-[1.03] mb-[var(--space-3)]">
                  {pkg.name}
                </h2>
                <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[52ch]">
                  {pkg.desc}
                </p>
              </div>
              <div className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.14em] uppercase text-[var(--mid)] lg:pt-[var(--space-2)]">
                {pkg.price}
                <br />
                {pkg.priceNote}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-[var(--rule)]">
              {pkg.items.map((item, i) => (
                <div
                  key={item}
                  className={`px-6 py-[var(--space-4)] [font-size:var(--text-sm)] text-[var(--ink-2)] border-b border-[var(--rule)] ${
                    i % 2 === 0 ? "sm:border-r" : "sm:border-r-0"
                  } ${i % 3 !== 2 ? "lg:border-r" : "lg:border-r-0"}`}
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-baseline gap-x-[var(--space-4)] gap-y-[var(--space-2)] px-6 py-[var(--space-5)] bg-[var(--panel)] border-b border-[var(--rule)]">
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--mid)] whitespace-nowrap">
                Nem tartalmazza
              </span>
              <p className="m-0 [font-size:var(--text-sm)] text-[var(--mid)]">{pkg.notIncluded}</p>
            </div>

            <div className="px-6 py-[var(--space-6)] sm:py-[var(--space-8)]">
              <Button asChild variant={pkg.hot ? "primary" : "ghost"}>
                <Link href={pkg.href}>Beszéljünk róla &rarr;</Link>
              </Button>
              {pkg.id === "csomag-pulzus" && (
                <p className="mt-[var(--space-4)] [font-size:var(--text-sm)] text-[var(--mid)]">
                  Egy konkrét esetet is megmutatunk arról,{" "}
                  <Link href="/hirek/pulzus-ot-masodperc" className="text-[var(--ink)] underline">
                    mi derül ki, ha valaki tényleg megméri az oldalt
                  </Link>
                  .
                </p>
              )}
            </div>
          </section>
        </Rail>
      ))}

      <Seam />

      {/* ===== AHOGY DOLGOZUNK ===== */}
      <Rail label="Ahogy dolgozunk" dark>
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-9)]">
          <Eyebrow>Ahogy dolgozunk</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch] text-[var(--ink)] mb-[var(--space-5)]">
            Mire számíthatsz
          </h2>
          <p className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[56ch]">
            Nem írunk ki százalékos garanciákat, mert azokat vagy nem lehet tartani, vagy a
            szerződésben a helyük. Ehelyett elmondjuk, hogyan működünk.
          </p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[var(--rule)]">
          {WORK_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`px-6 py-[var(--space-8)] sm:py-[var(--space-10)] border-b border-[var(--rule)] ${
                i % 2 === 0 ? "sm:border-r" : ""
              }`}
            >
              <h3 className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.025em] mb-[var(--space-3)] text-[var(--ink)]">
                {item.title}
              </h3>
              <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed max-w-[44ch]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== GYIK ===== */}
      <Rail label="GYIK">
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-9)]">
          <Eyebrow>Gyakori kérdések</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[18ch] text-[var(--ink)]">
            Amit tényleg meg szoktak kérdezni
          </h2>
        </section>
        <div className="border-t border-[var(--rule)]">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={item.question}
              className="faq-q border-b border-[var(--rule)]"
              open={i === 0}
            >
              <summary className="list-none cursor-pointer grid grid-cols-[1fr_28px] gap-[var(--space-5)] items-baseline px-6 py-[var(--space-6)] font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.022em] hover:bg-[var(--panel)] transition-colors [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span className="[font-family:var(--font-mono)] [font-size:var(--text-lg)] text-[var(--signal-deep)] text-right">
                  <span className="faq-pm-plus">+</span>
                  <span className="faq-pm-minus">&minus;</span>
                </span>
              </summary>
              <div className="px-6 pb-[var(--space-8)]">
                <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed max-w-[64ch]">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== CTA ===== */}
      <Rail label="Kapcsolat" dark>
        <section className="px-6 py-[var(--space-20)] sm:py-[var(--space-32)]">
          <Eyebrow>Kapcsolat</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-final)] leading-[0.92] tracking-[-0.055em] max-w-[13ch] mb-[var(--space-6)] text-[var(--ink)]">
            Nem tudod, melyik illik hozzád?
          </h2>
          <p className="[font-size:var(--text-base)] text-[var(--ink-2)] max-w-[54ch] leading-relaxed mb-[var(--space-8)]">
            Írd le, mit szeretnél elérni, és megmondjuk, mire van valóban szükséged. Két munkanapon
            belül válaszolunk. Ha nem illünk össze, azt is megmondjuk. Ha előbb látni akarod, hol
            tartasz, kezdd fix áron, nettó {belepoAr}-tól.
          </p>
          <div className="flex flex-wrap gap-[var(--space-3)]">
            <Button asChild>
              <Link href="/init">Írd le, mit szeretnél &rarr;</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/gyors-indulas">Fix áras első lépések</Link>
            </Button>
          </div>
        </section>
      </Rail>
    </main>
  );
}
