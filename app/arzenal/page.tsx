import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, faqPageSchema } from "@/lib/jsonld";
import JsonLd from "@/app/components/JsonLd";
import { Button, Rail, Seam, Eyebrow } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Szolgáltatások | THE GBR",
  description:
    "Weboldal és webshop fejlesztés, performance marketing, AI-integráció, videó és üzemeltetés. Öt terület, házon belül — B2B ügyfeleknek.",
  alternates: {
    canonical: "/arzenal",
  },
  openGraph: {
    title: "Szolgáltatások | THE GBR",
    description:
      "Weboldal és webshop fejlesztés, performance marketing, AI-integráció, videó és üzemeltetés. Öt terület, házon belül.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Szolgáltatások | THE GBR",
    description:
      "Weboldal és webshop fejlesztés, performance marketing, AI-integráció, videó és üzemeltetés. Öt terület, házon belül.",
  },
};

const INDEX_ITEMS = [
  { id: "web", n: "01", name: "Web és webshop" },
  { id: "ads", n: "02", name: "Performance marketing" },
  { id: "ai", n: "03", name: "AI és chatbot" },
  { id: "video", n: "04", name: "Videó és tartalom" },
  { id: "ops", n: "05", name: "Üzemeltetés és fejlesztés" },
];

const WEB_FEATURES = [
  "Egyedi dizájn és design rendszer",
  "Technikai SEO: sitemap, strukturált adat, canonical",
  "Telefonra telepíthető változat (PWA)",
  "Meglévő rendszer fölé építés — WooCommerce, Shopify",
  "Biztonsági fejlécek, rate limiting, input validáció",
];

const ADS_FEATURES = [
  "Google és Meta kampányok, B2B fókusszal",
  "Konverziómérés és attribúció — a megkeresésig követve",
  "Heti jelentés, érthető nyelven",
  "Landing page a kampányhoz, nem a főoldalra terelés",
];

const AI_FEATURES = [
  "OpenAI-alapú chat a weboldalon, saját tartalomra hangolva",
  "Átirányítás emberhez, ha a kérdés komoly",
  "Jogi megfelelés: AI-tájékoztató, adattovábbítás dokumentálva",
  "Belső automatizációk: dokumentumfeldolgozás, összefoglalás",
];

const VIDEO_FEATURES = [
  "Cégbemutató és imázsvideó",
  "Termékvideó webshophoz",
  "Rövid formátumok közösségi médiára",
  "Vágás, színkezelés, feliratozás",
];

const OPS_FEATURES = [
  "Monitoring és hibariasztás — előbb tudunk róla, mint te",
  "Folyamatos fejlesztés havi óraszámban",
  "Automatizált tartalommotor: a blog magától frissül",
  "Jogi megfelelés karbantartása a változásokkal együtt",
  "Heti vagy kétheti előrehaladási riport",
  "Egy felelős kapcsolattartó",
];

const AD_SAMPLE_ROWS = [
  { label: "Kattintás → megkeresés", value: "követve" },
  { label: "Legjobb csatorna a héten", value: "megnevezve" },
  { label: "Amit nem folytatunk", value: "indokolva" },
];

const OPS_LOG = [
  { t: "06:00", msg: "Tartalomgenerálás elindítva" },
  { t: "06:04", msg: "Cikk közzétéve a blogon" },
  { t: "06:05", msg: "Sitemap frissítve, keresők értesítve" },
];

const FAQ_ITEMS = [
  {
    question: "Mennyibe kerül egy weboldal vagy webshop?",
    answer:
      "Nincs fix árlista, mert nincs két egyforma projekt. A felmérés végén viszont fix árat és határidőt kapsz, nem sávot. A tipikus felállásokat a csomagoknál látod.",
  },
  {
    question: "Mennyi idő alatt készül el?",
    answer:
      "Egy weboldal jellemzően 4–8 hét. Egy élő webshop újraépítése ennél lényegesen több, mert szakaszosan megy — de az első látható változás már hetek alatt megjelenik.",
  },
  {
    question: "Mi történik a régi oldalammal, ha lecseréljük?",
    answer:
      "Nem kapcsoljuk le, amíg az új nem működik bizonyítottan. Az URL-eket átirányítjuk, hogy a Google-találatok ne vesszenek el — ez a legdrágább hiba, amit egy platformváltásnál el lehet követni.",
  },
  {
    question: "Kell hozzá értenem a technikához?",
    answer: "Nem. Ami viszont kell: tudd megmondani, mit szeretnél elérni. A többi a mi dolgunk.",
  },
  {
    question: "Mi van, ha átadás után elromlik valami?",
    answer:
      "Ha üzemeltetést is kérsz, mi észleljük előbb, és javítjuk. Ha nem, akkor is felelünk a leszállított munkáért — a részleteket a szerződés rögzíti.",
  },
  {
    question: "Csak nagyvállalatokkal dolgoztok?",
    answer:
      "Nem. Van egy alsó határ, ami alatt nem érdemes belefogni — ezt az űrlapon a költségkeret-kérdés szűri. Fölötte a cégméret nem szempont.",
  },
];

function DevFrame({
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

function ServiceBlock({
  id,
  n,
  label,
  title,
  paragraphs,
  features,
  device,
}: {
  id: string;
  n: string;
  label: string;
  title: string;
  paragraphs: React.ReactNode[];
  features: string[];
  device: React.ReactNode;
}) {
  return (
    <section id={id} className="border-b border-[var(--rule)] scroll-mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(150px,20%)_1fr] gap-[var(--space-8)] sm:gap-[var(--space-12)] px-6 pt-[var(--space-12)] sm:pt-[var(--space-20)] pb-[var(--space-6)] sm:pb-[var(--space-10)]">
        <div>
          <div className="font-display font-black [font-size:var(--text-svc-num)] leading-[0.76] tracking-[-0.06em] text-[var(--rule)]">
            {n}
          </div>
          <div className="mt-[var(--space-4)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.22em] uppercase text-[var(--mid)]">
            {label}
          </div>
        </div>
        <div>
          <h2 className="font-display font-extrabold [font-size:var(--text-svc-title)] tracking-[-0.038em] leading-[1.02] max-w-[20ch] mb-[var(--space-5)]">
            {title}
          </h2>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="[font-size:var(--text-base)] leading-relaxed text-[var(--ink-2)] max-w-[52ch]"
            >
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[var(--rule)]">
        {features.map((feat, i) => (
          <div
            key={feat}
            className={`px-6 py-[var(--space-4)] [font-size:var(--text-base)] text-[var(--ink-2)] border-b border-[var(--rule)] ${
              i % 2 === 0 ? "sm:border-r" : ""
            }`}
          >
            {feat}
          </div>
        ))}
      </div>

      {device}
    </section>
  );
}

export default function Arzenal() {
  return (
    <main className="bg-[var(--ground)] text-[var(--ink)] font-body">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Főoldal", url: SITE_URL },
          { name: "Szolgáltatások", url: `${SITE_URL}/arzenal` },
        ])}
      />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />

      {/* ===== SÖTÉT FEJLÉC + INDEX ===== */}
      <Rail label="Szolgáltatások" dark>
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-8)] sm:pb-[var(--space-10)]">
          <h1 className="font-display font-black leading-[0.86] tracking-[-0.055em] [font-size:var(--text-display)]">
            Szolgáltatások<span className="text-[var(--signal)]">.</span>
          </h1>
          <p className="[font-size:var(--text-xl)] leading-snug text-[var(--ink-2)] max-w-[46ch] mt-[var(--space-8)]">
            Öt terület, amit házon belül végzünk. Ha egy projekthez nem mind az öt kell, nem is
            adjuk el mind az ötöt.
          </p>
        </section>

        <div className="border-t border-[var(--rule)]">
          {INDEX_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="grid grid-cols-[56px_1fr_auto] sm:grid-cols-[88px_1fr_auto] gap-[var(--space-4)] sm:gap-[var(--space-8)] px-6 py-[var(--space-5)] sm:py-[var(--space-6)] border-b border-[var(--rule)] items-center group hover:bg-[color-mix(in_srgb,var(--ground)_60%,var(--panel))] transition-colors"
            >
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-sm)] tracking-[0.14em] text-[var(--dim)] group-hover:text-[var(--signal)] transition-colors">
                {item.n}
              </span>
              <h2 className="font-display font-bold [font-size:var(--text-3xl)] tracking-[-0.03em] leading-tight text-[var(--ink)]">
                {item.name}
              </h2>
              <span className="[font-family:var(--font-mono)] text-[length:var(--text-sm)] text-[var(--rule-strong)] group-hover:text-[var(--signal)] transition-colors">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </Rail>

      <Seam />

      {/* ===== 01 WEB ===== */}
      <Rail label="01 / Web">
        <ServiceBlock
          id="web"
          n="01"
          label="Web és webshop"
          title="Weboldal és webshop, ami mérhetően gyors"
          paragraphs={[
            <>
              A sablonoldalak problémája nem az, hogy csúnyák — hanem hogy lassúak, és senki nem
              tudja megmondani, miért.{" "}
              <strong className="text-[var(--ink)]">Next.js alapon építünk</strong>, ahol a
              betöltési sebesség, a keresőoptimalizálás és a biztonság nem utólagos javítás, hanem a
              szerkezet része.
            </>,
            "Élő webshopnál nem kapcsolunk le semmit: fokozatosan cseréljük az oldalakat, a bolt közben forgalmaz.",
          ]}
          features={WEB_FEATURES}
          device={
            <DevFrame header="Bizonyíték · ezt az oldalt is mi építettük">
              <p className="[font-size:var(--text-base)] text-[var(--ink-2)] leading-relaxed">
                Ezt az oldalt is mi építettük — ugyanezekkel az elvekkel.
              </p>
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== 02 MARKETING ===== */}
      <Rail label="02 / Marketing">
        <ServiceBlock
          n="02"
          id="ads"
          label="Performance marketing"
          title="Hirdetés, aminek a végén van egy szám"
          paragraphs={[
            <>
              A legtöbb kampányjelentés arról szól, hány ember látta a hirdetést. Ez nem eredmény.
              Mi végig követjük az utat a{" "}
              <strong className="text-[var(--ink)]">kattintástól a megkeresésig</strong>, és hetente
              megmutatjuk, mi hozott ügyfelet és mi nem.
            </>,
            "Ha egy csatorna nem működik, azt megmondjuk — nem költjük tovább.",
          ]}
          features={ADS_FEATURES}
          device={
            <DevFrame header="Így néz ki egy heti jelentés" headerRight="Minta">
              <table className="w-full border-collapse [font-size:var(--text-sm)]">
                <tbody>
                  {AD_SAMPLE_ROWS.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-[var(--rule-soft)] last:border-b-0"
                    >
                      <td className="py-[var(--space-3)] text-[var(--mid)]">{row.label}</td>
                      <td className="py-[var(--space-3)] text-[var(--signal-deep)] text-right [font-family:var(--font-mono)]">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-[var(--space-4)] [font-size:var(--text-sm)] text-[var(--mid)]">
                Szemléltetés — a valós számokat az első hónap végén te látod először.
              </p>
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== 03 AI ===== */}
      <Rail label="03 / AI">
        <ServiceBlock
          n="03"
          label="AI és chatbot"
          id="ai"
          title="AI, ami a helyén van"
          paragraphs={[
            "Az AI nem varázslat és nem is helyettesíti az ügyfélszolgálatot. Arra jó, hogy a látogató éjjel is választ kapjon az egyszerű kérdésekre, és eljusson oda, ahol valóban tudsz vele foglalkozni.",
            <>
              Ezen az oldalon is fut egy — kipróbálhatod. Az adattovábbítás részleteit az{" "}
              <Link href="/ai-tajekoztato" className="text-[var(--ink)] underline">
                AI-használati tájékoztató
              </Link>{" "}
              írja le.
            </>,
          ]}
          features={AI_FEATURES}
          device={
            <DevFrame header="Amit a chat valóban tud" headerRight="Példa">
              <div className="[font-size:var(--text-base)]">
                <div className="grid grid-cols-1 sm:grid-cols-[86px_1fr] gap-[var(--space-2)] sm:gap-[var(--space-4)] py-[var(--space-3)] border-b border-[var(--rule-soft)]">
                  <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    Látogató
                  </span>
                  <p className="m-0 text-[var(--ink-2)]">
                    Építesz webshopot meglévő WooCommerce fölé?
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[86px_1fr] gap-[var(--space-2)] sm:gap-[var(--space-4)] py-[var(--space-3)]">
                  <span className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--signal-deep)]">
                    GBR AI
                  </span>
                  <p className="m-0 text-[var(--ink-2)]">
                    Igen, ez a leggyakoribb felállás — a motor marad, a felület újul. A részletekhez
                    a legjobb, ha leírod a projektet itt: /init
                  </p>
                </div>
              </div>
              <p className="mt-[var(--space-4)] pt-[var(--space-4)] border-t border-[var(--rule-soft)] [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.14em] uppercase text-[var(--mid)]">
                A chat tájékoztat, nem ajánl. Árat és határidőt ember mond.
              </p>
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== 04 VIDEÓ ===== */}
      <Rail label="04 / Videó">
        <ServiceBlock
          n="04"
          label="Videó és tartalom"
          title="A weboldal önmagában nem elég"
          id="video"
          paragraphs={[
            <>
              Egy jó oldalra tartalom is kell. Reklámfilm, termékvideó, közösségi formátumok —{" "}
              <strong className="text-[var(--ink)]">a mi irányításunk alatt</strong>, ugyanabban az
              arculatban, mint a weboldal. Így nem lesz külön a „szép oldal” és a „valahonnan
              összeszedett videó”.
            </>,
          ]}
          features={VIDEO_FEATURES}
          device={
            <div className="border-t border-[var(--rule)] grid grid-cols-1 sm:grid-cols-3">
              {VIDEO_FEATURES.slice(0, 3).map((feat, i) => (
                <div
                  key={feat}
                  className={`relative aspect-[4/3] sm:aspect-square border-b sm:border-b-0 border-[var(--rule)] ${
                    i < 2 ? "sm:border-r" : ""
                  }`}
                  style={{
                    background: "linear-gradient(150deg, var(--rule-soft), var(--rule))",
                  }}
                >
                  <span className="absolute left-4 bottom-3.5 [font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.16em] uppercase text-[var(--mid)]">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          }
        />
      </Rail>

      {/* ===== 05 ÜZEMELTETÉS ===== */}
      <Rail label="05 / Üzemeltetés">
        <ServiceBlock
          id="ops"
          n="05"
          label="Üzemeltetés"
          title="Az átadás nem a vége"
          paragraphs={[
            <>
              A legtöbb ügynökség itt hagyja abba. Pedig egy weboldal az élesítés után kezd el pénzt
              termelni — és akkor kezd el elromlani is. Ha kéred,{" "}
              <strong className="text-[var(--ink)]">visszük tovább</strong>: figyeljük, javítjuk,
              fejlesztjük.
            </>,
            "Egy felelős emberrel dolgozol, aki ismeri a projekted. Nem ügyfélszolgálati sorszámot kapsz.",
          ]}
          features={OPS_FEATURES}
          device={
            <DevFrame header="Egy nap a tartalommotorból" headerRight="Napló">
              <div className="[font-family:var(--font-mono)] text-[length:var(--text-sm)] text-[var(--ink-2)]">
                {OPS_LOG.map((line, i) => (
                  <div
                    key={line.t}
                    className={`grid grid-cols-[74px_1fr] gap-[var(--space-4)] py-[var(--space-2)] ${
                      i < OPS_LOG.length - 1 ? "border-b border-[var(--rule-soft)]" : ""
                    }`}
                  >
                    <b className="text-[var(--signal-deep)] font-medium">{line.t}</b>
                    <span>{line.msg}</span>
                  </div>
                ))}
              </div>
            </DevFrame>
          }
        />
      </Rail>

      {/* ===== GYIK ===== */}
      <Rail label="GYIK">
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
        <section className="px-6 pt-[var(--space-16)] sm:pt-[var(--space-24)] pb-[var(--space-6)] sm:pb-[var(--space-9)]">
          <Eyebrow>Gyakori kérdések</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-section)] leading-[1.0] tracking-[-0.042em] max-w-[16ch] text-[var(--ink)]">
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
          <Eyebrow>Beszéljünk róla</Eyebrow>
          <h2 className="font-display font-extrabold [font-size:var(--text-final)] leading-[0.92] tracking-[-0.055em] max-w-[13ch] mb-[var(--space-6)] text-[var(--ink)]">
            Mondd el, mit szeretnél elérni
          </h2>
          <p className="[font-size:var(--text-base)] text-[var(--ink-2)] max-w-[52ch] leading-relaxed mb-[var(--space-8)]">
            Nem minden projektet vállalunk el — ezért kérdezünk előbb. Két munkanapon belül
            válaszolunk. Ha nem illünk össze, azt is megmondjuk.
          </p>
          <Button asChild>
            <Link href="/init">Pitcheld el a projekted &rarr;</Link>
          </Button>
          <p className="[font-family:var(--font-mono)] text-[length:var(--text-2xs)] tracking-[0.1em] text-[var(--dim)] mt-[var(--space-6)]">
            Vagy írj közvetlenül: gabor@thegbr.eu
          </p>
        </section>
      </Rail>
    </main>
  );
}
