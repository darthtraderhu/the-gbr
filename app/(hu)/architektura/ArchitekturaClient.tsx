"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_URL } from "@/lib/site";
import { faqPageSchema, offerSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";

// A tervező kimenete tartomány, nem pontszám — nem ígérünk eredményt
// (lead-szám, ROAS), csak azt mutatjuk meg, mekkora terjedelmet tudunk
// leszállítani egy adott keretből. A sávhatárok szakmai becslések a
// tipikus kapacitásról, nem mért ügyfél-átlagok.
type Deliverables = {
  channels: string;
  creatives: string;
  video: string;
  landing: string;
  reporting: string;
  optimization: string;
};

function getDeliverables(budget: number): Deliverables {
  if (budget < 800000) {
    return {
      channels: "1–2 platform",
      creatives: "3–5 hirdetésváltozat",
      video: "1–2 rövid formátum",
      landing: "1 megosztott oldal",
      reporting: "Kétheti, írásban",
      optimization: "Havi",
    };
  }
  if (budget < 2000000) {
    return {
      channels: "2–3 platform",
      creatives: "6–10 hirdetésváltozat",
      video: "2–4 rövid formátum",
      landing: "1 dedikált oldal",
      reporting: "Heti, írásban",
      optimization: "Kétheti",
    };
  }
  if (budget < 3500000) {
    return {
      channels: "3–4 platform",
      creatives: "10–16 hirdetésváltozat",
      video: "4–6 rövid formátum",
      landing: "1–2 dedikált oldal",
      reporting: "Heti, írásban",
      optimization: "Heti",
    };
  }
  return {
    channels: "4+ platform",
    creatives: "16–24 hirdetésváltozat",
    video: "6–10 rövid formátum",
    landing: "2–3 dedikált oldal",
    reporting: "Heti, írásban + konzultáció",
    optimization: "Heti + ad hoc",
  };
}

const DELIVERABLE_LABELS: { key: keyof Deliverables; label: string }[] = [
  { key: "channels", label: "Aktív csatorna" },
  { key: "creatives", label: "Kreatív / hónap" },
  { key: "video", label: "Videós anyag / hónap" },
  { key: "landing", label: "Landing page" },
  { key: "reporting", label: "Jelentés" },
  { key: "optimization", label: "Optimalizálási kör" },
];

function getRecommendedPackage(budget: number) {
  if (budget < 1000000) {
    return { name: "Weboldal és arculat", anchor: "csomag-web-arculat" };
  }
  if (budget < 3000000) {
    return { name: "Webshop és skálázás", anchor: "csomag-webshop-skalazas" };
  }
  return { name: "Fejlesztés és üzemeltetés", anchor: "csomag-fejlesztes-uzemeltetes" };
}

const CHANNEL_SPLIT = [
  { label: "Google Ads", pct: 0.3, mix: 100 },
  { label: "Meta Ads", pct: 0.35, mix: 100 },
  { label: "Videós hirdetés", pct: 0.2, mix: 65 },
  { label: "Újracélzás", pct: 0.15, mix: 35 },
] as const;

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
      "Kapcsolati űrlap, ami tényleg működik",
      "Technikai SEO: sitemap, strukturált adat, canonical",
      "Szövegezés, ha kell",
    ],
    notIncluded:
      "Webshop-funkciót, hirdetéskezelést és folyamatos üzemeltetést. Ha ezek is kellenek, a 02-es vagy 03-as felállás a reális.",
    href: "/init?csomag=web-arculat",
  },
  {
    id: "csomag-webshop-skalazas",
    railLabel: "02 / Leggyakoribb",
    n: "02",
    tag: "A leggyakoribb",
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
      "Automatizált tartalommotor: a blog magától frissül",
      "Videó és tartalomgyártás",
      "Jogi megfelelés karbantartása",
      "Egy felelős kapcsolattartó",
    ],
    notIncluded:
      "Az egyedi belső rendszerek (ERP, CRM) fejlesztését — az külön projekt, külön árazással. A kapcsolódást viszont megoldjuk.",
    href: "/init?csomag=fejlesztes-uzemeltetes",
  },
  {
    id: "csomag-pulzus",
    railLabel: "04 / Folyamatos",
    n: "04",
    tag: "Folyamatos",
    hot: false,
    name: "Pulzus",
    desc: "Ha van már működő oldala, és csak azt szeretné tudni, hogy rendben van-e. Havi figyelés és egy levél arról, mi változott.",
    price: "Havidíjas",
    priceNote: "havonta, felmondható",
    items: [
      "Weboldal-figyelés: elérhetőség, sebesség, tanúsítvány, űrlap",
      "Google-profil: értékelések és helyi megjelenés",
      "Értékelés-kérés a vásárlás után",
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
      "Ez a leggyakoribb eset. A Next.js és a Supabase pont azért jó választás, mert bármilyen külső rendszerhez tudunk kapcsolódni — ügyviteli szoftverhez, számlázóhoz, raktárkezelőhöz. Ilyenkor a felmérés hosszabb, mert előbb meg kell értenünk, hogyan működik a cég.",
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

export default function ArchitekturaClient() {
  const [budget, setBudget] = useState(1500000);

  const deliverables = getDeliverables(budget);
  const recommended = getRecommendedPackage(budget);

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
        input[type="range"] { -webkit-appearance: none; appearance: none; width: 100%; background: transparent; }
        input[type="range"]::-webkit-slider-runnable-track { height: 2px; background: var(--rule-strong); }
        input[type="range"]::-moz-range-track { height: 2px; background: var(--rule-strong); }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; background: var(--signal); margin-top: -7px; cursor: pointer; border: 0; }
        input[type="range"]::-moz-range-thumb { width: 16px; height: 16px; background: var(--signal); border: 0; cursor: pointer; }
        input[type="range"]:focus-visible { outline: 2px solid var(--signal); outline-offset: 6px; }

        .faq-q .faq-pm-plus { display: inline; }
        .faq-q .faq-pm-minus { display: none; }
        .faq-q[open] .faq-pm-plus { display: none; }
        .faq-q[open] .faq-pm-minus { display: inline; }
      `,
        }}
      />

      {/* ===== SÖTÉT FEJLÉC + TERVEZŐ ===== */}
      <Rail label="Tervező" dark>
        <section className="px-6 pt-[var(--space-8)] sm:pt-[var(--space-12)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <h1 className="font-display font-black leading-[0.88] tracking-[-0.055em] [font-size:var(--text-display)]">
            Csomagok
            <br />
            és árazás<span className="text-[var(--signal)]">.</span>
          </h1>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[50ch] mt-[var(--space-8)]">
            Nincs fix árlista, mert nincs két egyforma projekt. Van viszont három tipikus felállás,
            és egy tervező, amiből látod, mit kapsz egy adott keretből.
          </p>
        </section>

        <div className="border-t border-[var(--rule)]">
          <div className="flex flex-wrap justify-between gap-3 px-6 py-3 border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)]">
            <span>Tervező · mit kapsz egy adott keretből</span>
            <span>Havi marketing keret</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr]">
            {/* Bal: csúszka + csatorna-felosztás */}
            <div className="lg:border-r border-[var(--rule)] px-6 py-[var(--space-10)]">
              <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-5)]">
                Húzd el, és lásd, mi fér bele
              </div>
              <div className="flex items-baseline gap-[var(--space-2)] font-display font-bold [font-size:var(--text-gauge)] tracking-[-0.05em] leading-[0.9] tabular-nums mb-[var(--space-6)]">
                <span>{new Intl.NumberFormat("hu-HU").format(budget)}</span>
                <span className="text-[0.3em] font-semibold text-[var(--mid)]">Ft / hó</span>
              </div>

              <input
                type="range"
                min="300000"
                max="5000000"
                step="100000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                aria-label="Havi marketing keret"
              />
              <div className="flex justify-between [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] text-[var(--dim)]">
                <span>300 000</span>
                <span>5 000 000+</span>
              </div>

              <div className="mt-[var(--space-10)] pt-[var(--space-6)] border-t border-[var(--rule)]">
                <div className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-4)]">
                  Javasolt csatorna-felosztás
                </div>
                <div className="space-y-[var(--space-3)]">
                  {CHANNEL_SPLIT.map((ch) => (
                    <div key={ch.label}>
                      <div className="flex justify-between [font-family:var(--font-mono)] text-[length:var(--text-xs)] mb-[var(--space-1)]">
                        <span className="text-[var(--mid)]">
                          {ch.label} · {Math.round(ch.pct * 100)}%
                        </span>
                        <span className="text-[var(--ink)] font-medium">
                          {new Intl.NumberFormat("hu-HU").format(Math.round(budget * ch.pct))} Ft
                        </span>
                      </div>
                      <div className="h-1 bg-[var(--rule)]">
                        <div
                          className="h-full"
                          style={{
                            width: `${ch.pct * 100}%`,
                            backgroundColor: `color-mix(in srgb, var(--signal) ${ch.mix}%, var(--ground))`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Jobb: teljesítés + ajánlás */}
            <div>
              <div className="px-6 py-3 border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)]">
                Ebből ennyit tudunk hozni
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {DELIVERABLE_LABELS.map(({ key, label }, i) => (
                  <div
                    key={key}
                    className={`px-6 py-[var(--space-5)] border-b border-[var(--rule)] ${
                      i % 2 === 0 ? "sm:border-r" : ""
                    }`}
                  >
                    <span className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-2)]">
                      {label}
                    </span>
                    <div className="font-display font-bold [font-size:var(--text-2xl)] tracking-[-0.04em] leading-[0.95]">
                      {deliverables[key]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-[var(--space-4)] px-6 py-[var(--space-6)]">
                <div>
                  <span className="block [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.2em] uppercase text-[var(--dim)] mb-[var(--space-2)]">
                    Ehhez a kerethez ez illik
                  </span>
                  <span className="font-display font-bold [font-size:var(--text-xl)] tracking-[-0.025em] text-[var(--signal)]">
                    {recommended.name}
                  </span>
                </div>
                <Button asChild size="sm">
                  <Link href={`#${recommended.anchor}`}>Beszéljünk róla &rarr;</Link>
                </Button>
              </div>
            </div>
          </div>

          <p className="px-6 py-[var(--space-4)] pb-[var(--space-10)] border-t border-[var(--rule)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] text-[var(--mid)] leading-[1.7]">
            A számok a tipikus terjedelmet mutatják, nem eredményt. Hogy egy kampány mennyit hoz, az
            az iparágtól, a terméktől és a piaci helyzettől függ — ezt az első hónap végén együtt
            látjuk meg, nem előre.
          </p>
        </div>
      </Rail>

      <Seam />

      {/* ===== CSOMAGOK ===== */}
      {PACKAGES.map((pkg) => (
        <Rail key={pkg.id} label={pkg.railLabel}>
          <section id={pkg.id} className="border-b border-[var(--rule)] scroll-mt-16">
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
            belül válaszolunk. Ha nem illünk össze, azt is megmondjuk.
          </p>
          <Button asChild>
            <Link href="/init">Pitcheld el a projekted &rarr;</Link>
          </Button>
        </section>
      </Rail>
    </main>
  );
}
