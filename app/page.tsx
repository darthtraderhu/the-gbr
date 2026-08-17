import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts"; // <-- BEHÚZZUK A MOTORT!
import { websiteSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, Card, DataCell, SectionHeader } from "@/app/components/ui";

const HOME_DESCRIPTION =
  "Weboldalak és webshopok, amiket mi építünk és mi üzemeltetünk tovább — Next.js alapokon, kizárólag B2B cégeknek. Válasz két munkanapon belül.";

export const metadata: Metadata = {
  title: "THE GBR | Fejlesztés és üzemeltetés B2B cégeknek",
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "THE GBR | Fejlesztés és üzemeltetés B2B cégeknek",
    description: HOME_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "THE GBR | Fejlesztés és üzemeltetés B2B cégeknek",
    description: HOME_DESCRIPTION,
  },
};

const HERO_STATS = [
  { label: "Tapasztalat", value: "20+", unit: "év" },
  { label: "A cég", value: "6", unit: "év" },
  { label: "Válaszidő", value: "2", unit: "munkanap" },
];

const DEVELOP_ITEMS = [
  "Weboldal és webshop nulláról, vagy meglévő rendszer fölé",
  "Telefonra telepíthető webalkalmazás (PWA) — ikonként a kezdőlapon, alkalmazásbolt nélkül",
  "Technikai SEO: sitemap, strukturált adat, mérhető eredmény",
  "Biztonság és teljesítmény alapból, nem utólag",
  "Arculat, design rendszer és szövegezés, ha még nincs",
  "Videó és vizuális tartalom a bevezetéshez",
];

const MANAGE_ITEMS = [
  "Üzemeltetés, monitoring, hibariasztás",
  "Folyamatos fejlesztés havi keretben",
  "Tartalom, kampány, mérés",
  "Automatizált tartalommotor: a blog magától frissül",
  "Jogi megfelelés karbantartása a változásokkal együtt",
  "Egy felelős kapcsolattartó — nem ügyfélszolgálati sorszám",
];

const VIDEO_ITEMS = [
  "Cégbemutató és imázsvideó",
  "Termékvideó webshophoz",
  "Rövid formátumok közösségi médiára",
];

const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "WooCommerce",
  "Vercel",
  "OpenAI API",
];

const PROJECTS = [
  {
    badge: "Ügyfél · Folyamatban",
    title: "Kisgép-forgalmazó webshop",
    desc: "Több évtizede piacon lévő kizárólagos importőr. Élő, forgalmazó webáruház fokozatos újraépítése — a bolt egy percre sem áll le.",
    meta: "~400 termék · Next.js",
  },
  {
    badge: "Saját termék · Élő",
    title: "Pénzügyi alkalmazás",
    desc: "Saját fejlesztés, saját infrastruktúrán. Nincs kire mutogatni, ha elromlik — ezért tudjuk, mit jelent üzemeltetni.",
    meta: "Élő · Supabase",
  },
  {
    badge: "Saját termék · Élő",
    title: "Tőzsdei oktatóplatform",
    desc: "Tartalom, közösség és eszközök egy helyen. Kétnyelvű felépítés, folyamatos üzemeltetés.",
    meta: "Next.js · Kétnyelvű",
  },
];

const TRUST_CLAIMS = [
  {
    head: "Mi üzemeltetjük",
    text: "Amit építünk, azt visszük tovább. Monitoring, riasztás, hibakezelés — nem külön megállapodás kérdése.",
  },
  {
    head: "Válasz két munkanapon belül",
    text: "Vállalás, nem ígéret. Ha csúszunk, előre szólunk.",
  },
  {
    head: "Egy felelős ember",
    text: "Nem ügyfélszolgálati sorszámot kapsz, hanem valakit, aki ismeri a projekted.",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Felmérés",
    text: "Megnézzük, mi van most — kód, adatok, számok. Nem tippelünk. Ennek a végén tudod, mibe kerül és mennyi idő.",
  },
  {
    num: "02",
    title: "Terv és keret",
    text: "Fix hatókör, fix árazás, írásos szerződés — szellemi tulajdonnal és adatkezeléssel együtt. Nem ad hoc.",
  },
  {
    num: "03",
    title: "Építés szakaszokban",
    text: "Kéthetente látható eredmény. Élő rendszernél fokozatos átállás — a bolt nem áll le.",
  },
  {
    num: "04",
    title: "Átadás és üzemeltetés",
    text: "Dokumentáció, monitoring, riasztás. Innentől jön a „manage” rész — ha kéred.",
  },
];

const PACKAGES = [
  {
    tag: "Belépő",
    name: "Weboldal és arculat",
    price: "Egyedi",
    priceUnit: "ajánlat",
    items: [
      "Vállalati weboldal, egyedi dizájn",
      "Design rendszer, ami később is használható",
      "Technikai SEO alapok, mérhető eredménnyel",
      "Szövegezés, ha kell",
    ],
    href: "/init?csomag=web-arculat",
    featured: false,
  },
  {
    tag: "A leggyakoribb",
    name: "Webshop és skálázás",
    price: "Teljes",
    priceUnit: "infrastruktúra",
    items: [
      "Minden az előző csomagból",
      "Webshop nulláról vagy meglévő rendszer fölé",
      "Telefonra telepíthető változat (PWA) — a vásárló kezdőlapján",
      "Fizetés, szállítás, számlázás integrálva",
      "Admin felület, amit a kollégák is használni tudnak",
      "Kampánykezelés és mérés",
    ],
    href: "/init?csomag=webshop-skalazas",
    featured: true,
  },
  {
    tag: "Teljes lefedettség",
    name: "Fejlesztés és üzemeltetés",
    price: "Havi",
    priceUnit: "keret",
    items: [
      "Minden az előző csomagból",
      "Folyamatos fejlesztés havi óraszámban",
      "Monitoring, hibariasztás, ügyelet",
      "Tartalom, videó és kampány",
      "Jogi megfelelés karbantartása",
      "Egy felelős kapcsolattartó",
    ],
    href: "/init?csomag=fejlesztes-uzemeltetes",
    featured: false,
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="block [font-family:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[0.15em] text-[var(--mid)] mb-[var(--space-4)]">
      {children}
    </span>
  );
}

function Divider() {
  return <div className="h-px bg-[var(--rule)]" />;
}

export default function Home() {
  // Lekérjük a cikkeket, és csak a legújabb 3 darabot vesszük ki a főoldalra
  const allPostsData = getSortedPostsData();
  const recentPosts = allPostsData.slice(0, 3);

  return (
    <main className="min-h-screen bg-[var(--ground)] text-[var(--ink)] font-body selection:bg-[var(--signal)] selection:text-[var(--ground)]">
      <JsonLd data={websiteSchema()} />

      {/* =========================================
          HERO — a hero maga a bizonyíték
          (a mért műszer külön feladat, ez a kör csak a
          címsort, alcímet és a CTA-kat adja)
      ========================================= */}
      <section className="w-full pt-[var(--space-32)] pb-[var(--space-16)] px-6 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-display font-bold leading-[1.05] mb-[var(--space-6)] text-[var(--ink)] [font-size:var(--text-display)]">
            Nem mondjuk{" "}
            <span className="text-[var(--mid)]">
              hogy gyors<span className="text-[var(--signal)]">.</span>
            </span>
          </h1>

          <p className="max-w-2xl [font-size:var(--text-xl)] text-[var(--ink-2)] mb-[var(--space-10)] leading-relaxed">
            Megmutatjuk. Az alábbi számokat nem mi írtuk ide — a te böngésződ mérte, most, ahogy
            betöltötte ezt az oldalt.
          </p>

          <div className="flex flex-col sm:flex-row gap-[var(--space-4)] w-full sm:w-auto items-center mb-[var(--space-12)]">
            <Button asChild size="lg">
              <Link href="/init">Pitcheld el a projekted &rarr;</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="#folyamat">Hogyan dolgozunk</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-[var(--space-10)]">
            {HERO_STATS.map((stat) => (
              <DataCell key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          CÉGBEMUTATÓ VIDEÓ — placeholder, amíg nincs
          kész anyag; nincs valódi lejátszás, ezért nincs
          rákattintható affordancia sem
      ========================================= */}
      <section className="max-w-4xl mx-auto px-6 py-[var(--space-20)]">
        <p className="text-center [font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-[0.2em] text-[var(--mid)] uppercase mb-[var(--space-8)]">
          Két perc arról, hogyan dolgozunk
        </p>
        <Card className="p-0 overflow-hidden">
          <div className="relative aspect-video flex items-center justify-center bg-[var(--rule-soft)]">
            <div className="flex flex-col items-center gap-[var(--space-4)]">
              <div className="w-16 h-16 rounded-full border-2 border-[var(--rule)] flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[var(--mid)] ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] tracking-widest text-[var(--mid)] uppercase">
                Videó hamarosan
              </span>
            </div>
          </div>
        </Card>
        <p className="text-[var(--ink-2)] [font-size:var(--text-base)] leading-relaxed max-w-2xl mx-auto mt-[var(--space-8)] text-center">
          Bemutatjuk, hogyan dolgozunk egy projekt indulásától az üzemeltetésig — felméréstől az
          élesítésig, saját szavainkkal.
        </p>
      </section>

      {/* =========================================
          MIÉRT LÉTEZIK A THE GBR
      ========================================= */}
      <section className="max-w-2xl mx-auto px-6 py-[var(--space-16)] text-center">
        <Eyebrow>A cég mögött</Eyebrow>
        <h2 className="font-display font-bold text-[var(--ink)] [font-size:var(--text-4xl)] mb-[var(--space-8)]">
          Húsz év értékesítés, aztán a felismerés
        </h2>
        <p className="text-[var(--ink-2)] [font-size:var(--text-lg)] leading-relaxed mb-[var(--space-4)]">
          Több mint két évtizedet töltöttem értékesítéssel és marketinggel. A THE GBR-t azért
          indítottam, mert a legjobb kampány sem segít, ha a rendszer mögötte nem működik: lassú az
          oldal, elveszik a megkeresés, senki nem méri, mi történik.
        </p>
        <p className="text-[var(--ink-2)] [font-size:var(--text-lg)] leading-relaxed mb-[var(--space-8)]">
          Ma egy hatéves cég vagyunk, és pontosan ezt a két oldalt kötjük össze — az értékesítési
          logikát és a technológiát.
        </p>
        <p className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-widest text-[var(--mid)]">
          Tóth Gábor · Sales &amp; Management
        </p>
      </section>

      {/* =========================================
          AMIT CSINÁLUNK — DEVELOP / MANAGE
      ========================================= */}
      <section id="amit-csinalunk" className="max-w-6xl mx-auto px-6 py-[var(--space-24)]">
        <div className="text-center mb-[var(--space-12)] flex flex-col items-center">
          <SectionHeader
            eyebrow="Amit csinálunk"
            title="Két dolog, nem tizenkettő"
            lead="A „mindent tudunk” lista senkit nem győz meg. Két dologban vagyunk jók, és a kettő összetartozik."
            className="items-center [&>h2]:text-center [&>p]:text-center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-6)]">
          <Card eyebrow="01 — Develop">
            <h3 className="font-display font-semibold text-[var(--ink)] [font-size:var(--text-2xl)] mb-[var(--space-4)]">
              Megépítjük
            </h3>
            <p className="text-[var(--ink-2)] [font-size:var(--text-base)] leading-relaxed mb-[var(--space-5)]">
              Weboldalak és webshopok Next.js alapon, a mérnöki részletekkel együtt — nem csak úgy,
              hogy szép legyen a nyitóképernyő.
            </p>
            <ul className="space-y-[var(--space-3)]">
              {DEVELOP_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-[var(--space-3)] text-[var(--ink-2)] [font-size:var(--text-sm)]"
                >
                  <span className="text-[var(--signal)] mt-0.5">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card eyebrow="02 — Manage">
            <h3 className="font-display font-semibold text-[var(--ink)] [font-size:var(--text-2xl)] mb-[var(--space-4)]">
              És visszük tovább
            </h3>
            <p className="text-[var(--ink-2)] [font-size:var(--text-base)] leading-relaxed mb-[var(--space-5)]">
              Itt dől el, hogy egy projekt siker lesz-e. Az átadás nem a vége — onnantól kezd el
              pénzt termelni.
            </p>
            <ul className="space-y-[var(--space-3)]">
              {MANAGE_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-[var(--space-3)] text-[var(--ink-2)] [font-size:var(--text-sm)]"
                >
                  <span className="text-[var(--signal)] mt-0.5">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* =========================================
          VIDEÓ ÉS VIZUÁLIS TARTALOM
      ========================================= */}
      <section className="max-w-2xl mx-auto px-6 py-[var(--space-16)] text-center">
        <Eyebrow>Videó</Eyebrow>
        <h2 className="font-display font-bold text-[var(--ink)] [font-size:var(--text-3xl)] mb-[var(--space-5)]">
          A weboldal önmagában nem elég
        </h2>
        <p className="text-[var(--ink-2)] [font-size:var(--text-base)] leading-relaxed mb-[var(--space-6)]">
          Egy jó oldalra tartalom is kell. Reklámfilm, termékvideó, közösségi formátumok — a mi
          irányításunk alatt, ugyanabban az arculatban, mint a weboldal. Így nem lesz külön a „szép
          oldal” és a „valahonnan összeszedett videó”.
        </p>
        <ul className="flex flex-col sm:flex-row justify-center gap-[var(--space-3)] sm:gap-[var(--space-6)] [font-family:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--ink-2)] uppercase tracking-widest">
          {VIDEO_ITEMS.map((item) => (
            <li key={item} className="flex items-center justify-center gap-[var(--space-2)]">
              <span className="text-[var(--signal)]">✔</span> {item}
            </li>
          ))}
        </ul>
      </section>

      {/* =========================================
          MŰSZAKI ALAP — statikus, fegyelmezett rács
      ========================================= */}
      <section className="w-full border-y border-[var(--rule)] bg-[var(--panel)] py-[var(--space-12)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Eyebrow>Műszaki alap</Eyebrow>
          <h2 className="font-display font-semibold text-[var(--ink)] [font-size:var(--text-2xl)] mb-[var(--space-3)]">
            Amivel dolgozunk
          </h2>
          <p className="text-[var(--mid)] [font-size:var(--text-sm)] mb-[var(--space-8)] max-w-xl mx-auto">
            Nem minden projektre ugyanaz kell. Ezekkel dolgozunk napi szinten, és ezekért felelünk
            is.
          </p>
          <div className="flex flex-wrap justify-center gap-x-[var(--space-8)] gap-y-[var(--space-3)] [font-family:var(--font-mono)] [font-size:var(--text-sm)] font-medium tracking-widest uppercase text-[var(--ink)]">
            {TECH_STACK.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          MUNKÁK
      ========================================= */}
      <section id="munkak" className="max-w-6xl mx-auto px-6 py-[var(--space-24)]">
        <div className="text-center mb-[var(--space-12)] flex flex-col items-center">
          <SectionHeader
            eyebrow="Munkák"
            title="Amin dolgozunk"
            lead="Ügyfélmunka és saját termék. Az utóbbi nem portfólió-töltelék: azért van itt, mert ezeket magunk üzemeltetjük, és ez a különbség."
            className="items-center [&>h2]:text-center [&>p]:text-center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-6)]">
          {PROJECTS.map((project) => (
            <Card
              key={project.title}
              eyebrow={project.badge}
              footer={
                <span className="[font-family:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--mid)] uppercase tracking-widest">
                  {project.meta}
                </span>
              }
            >
              <h3 className="font-display font-semibold text-[var(--ink)] [font-size:var(--text-xl)] mb-[var(--space-3)]">
                {project.title}
              </h3>
              <p className="text-[var(--ink-2)] [font-size:var(--text-sm)] leading-relaxed">
                {project.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <Divider />
      </div>

      {/* =========================================
          A SÖTÉT SZEKCIÓ — a legkeményebb állítás
          (data-theme="dark" lokálisan, kontrasztként)
      ========================================= */}
      <section
        data-theme="dark"
        className="w-full py-[var(--space-24)]"
        style={{ backgroundColor: "var(--ground)", color: "var(--ink)" }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Eyebrow>Miért számít</Eyebrow>
          <h2 className="font-display font-bold [font-size:var(--text-4xl)] mb-[var(--space-6)] text-[var(--ink)]">
            Aki csak épít, annak nincsenek számai
          </h2>
          <p className="text-[var(--ink-2)] [font-size:var(--text-lg)] leading-relaxed max-w-2xl mx-auto mb-[var(--space-12)]">
            A portfólió megmutatja, mi készült el. Nem mutatja meg, hogy mi lett vele fél évvel
            később. Az átadás után kezdődik az igazi munka — és a legtöbb ügynökség pont ott hagyja
            abba.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-8)] text-left">
            {TRUST_CLAIMS.map((claim) => (
              <div key={claim.head}>
                <h3 className="font-display font-semibold text-[var(--ink)] [font-size:var(--text-lg)] mb-[var(--space-2)]">
                  {claim.head}
                </h3>
                <p className="text-[var(--ink-2)] [font-size:var(--text-sm)] leading-relaxed">
                  {claim.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <Divider />
      </div>

      {/* =========================================
          CSOMAGOK
      ========================================= */}
      <section id="packages" className="max-w-6xl mx-auto px-6 py-[var(--space-24)]">
        <div className="text-center mb-[var(--space-12)] flex flex-col items-center">
          <SectionHeader
            eyebrow="Együttműködés"
            title="Hogyan dolgozunk együtt"
            lead="Minden projekt más, ezért fix árlista nincs. Három tipikus felállás — a tiéd valószínűleg valamelyikhez közel esik."
            className="items-center [&>h2]:text-center [&>p]:text-center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-6)]">
          {PACKAGES.map((pkg) => (
            <Card
              key={pkg.name}
              variant={pkg.featured ? "elevated" : "default"}
              eyebrow={pkg.tag}
              className={pkg.featured ? "md:-translate-y-4" : ""}
              style={pkg.featured ? { borderColor: "var(--signal)" } : undefined}
              footer={
                <Button asChild variant={pkg.featured ? "primary" : "ghost"} className="w-full">
                  <Link href={pkg.href}>Beszéljünk róla</Link>
                </Button>
              }
            >
              <h3 className="font-display font-semibold text-[var(--ink)] [font-size:var(--text-2xl)] mb-[var(--space-5)]">
                {pkg.name}
              </h3>
              <div className="[font-size:var(--text-3xl)] font-display font-bold text-[var(--ink)] mb-[var(--space-6)] pb-[var(--space-6)] border-b border-[var(--rule-soft)]">
                {pkg.price}{" "}
                <span className="[font-size:var(--text-base)] text-[var(--mid)] font-body font-normal">
                  {pkg.priceUnit}
                </span>
              </div>
              <ul className="space-y-[var(--space-3)]">
                {pkg.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-[var(--space-3)] text-[var(--ink-2)] [font-size:var(--text-sm)]"
                  >
                    <span className="text-[var(--signal)] mt-0.5">✔</span> {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================
          FOLYAMAT
      ========================================= */}
      <section id="folyamat" className="max-w-6xl mx-auto px-6 py-[var(--space-24)]">
        <div className="text-center mb-[var(--space-12)] flex flex-col items-center">
          <SectionHeader
            eyebrow="Folyamat"
            title="Nincs meglepetés a végén"
            lead="Minden szakasz végén van valami, amit meg tudsz nézni."
            className="items-center [&>h2]:text-center [&>p]:text-center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--space-8)]">
          {PROCESS_STEPS.map((step) => (
            <div key={step.num}>
              <span className="block font-display font-bold text-[var(--rule)] [font-size:var(--text-5xl)] mb-[var(--space-3)]">
                {step.num}
              </span>
              <h3 className="font-display font-semibold text-[var(--ink)] [font-size:var(--text-lg)] mb-[var(--space-2)]">
                {step.title}
              </h3>
              <p className="text-[var(--ink-2)] [font-size:var(--text-sm)] leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          BLOG — DINAMIKUS VÁLTOZAT
      ========================================= */}
      <section
        id="blog"
        className="w-full bg-[var(--panel)] border-y border-[var(--rule)] py-[var(--space-24)]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-[var(--space-12)] gap-[var(--space-6)]">
            <SectionHeader
              eyebrow="Írások"
              title="Amit közben megtanulunk"
              lead="Nem tartalomgyár. Amit leírunk, azt előbb megcsináltuk."
            />
            <Button asChild variant="ghost" size="sm">
              <Link href="/hirek">Összes írás &rarr;</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-6)]">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/hirek/${post.id}`}>
                <Card
                  eyebrow={post.category || "Írások"}
                  className="h-full transition-colors hover:border-[var(--signal)]"
                >
                  <h3 className="font-display font-semibold text-[var(--ink)] [font-size:var(--text-lg)] leading-snug">
                    {post.title}
                  </h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          ZÁRÓ CTA
      ========================================= */}
      <section id="contact" className="w-full px-6 py-[var(--space-24)]">
        <Card variant="elevated" className="max-w-3xl mx-auto text-center items-center">
          <h2 className="font-display font-bold text-[var(--ink)] [font-size:var(--text-4xl)] mb-[var(--space-5)]">
            Pitcheld el a <span className="text-[var(--signal-deep)]">projekted</span>
          </h2>
          <p className="[font-size:var(--text-lg)] text-[var(--ink-2)] mb-[var(--space-8)] max-w-xl mx-auto">
            Nem minden projektet vállalunk el — ezért kérdezünk előbb. Írd le, mit szeretnél elérni,
            és két munkanapon belül válaszolunk. Ha nem illünk össze, azt is megmondjuk.
          </p>

          <Button asChild size="lg">
            <Link href="/init">Kezdjük &rarr;</Link>
          </Button>
          <p className="mt-[var(--space-6)] [font-family:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--mid)] uppercase tracking-widest">
            Vagy írj közvetlenül:{" "}
            <a
              href="mailto:gabor@thegbr.eu"
              className="text-[var(--ink-2)] hover:text-[var(--signal-deep)]"
            >
              gabor@thegbr.eu
            </a>
          </p>
        </Card>
      </section>
    </main>
  );
}
