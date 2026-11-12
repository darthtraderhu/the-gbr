import type { Fact, Feature } from "@/app/components/SalesBlocks";
import type { FaqItem } from "@/lib/szolgaltatasok";

// Fix áras első lépések (/gyors-indulas). Kicsi, rögzített tartalmú munkák
// pontos nettó árral és határidővel, hogy egy cég kérdezés nélkül dönthessen.
// A nagy projektekre továbbra sincs árlista (ld. lib/jsonld.ts offerSchema).
//
// Ide csak olyan terméket vegyél fel, amit ma le is tudunk szállítani, és
// csak olyat írj róla, amit a riport ténylegesen tartalmaz.
// Pénz egész forintban, nettó.

export const GYORS_INDULAS_PATH = "/gyors-indulas";

export const TERMEK_IDK = ["megkereses-teszt", "gyorsatvilagitas"] as const;
export type TermekId = (typeof TERMEK_IDK)[number];

export type Termek = {
  id: TermekId;
  n: string;
  name: string;
  // Nettó ár egész forintban.
  arNetto: number;
  // Határidő munkanapban, a díjbekérő kiegyenlítésétől.
  munkanap: number;
  kicker: string;
  title: string;
  summary: string;
  lead: string[];
  schemaDescription: string;
  facts: Fact[];
  features: Feature[];
  // Amire szükségünk van tőled az induláshoz.
  needs: string[];
  steps: { title: string; body: string }[];
  faq: FaqItem[];
  // A rendelőűrlap szabadszöveges mezőjének címkéje és súgója.
  noteLabel: string;
  noteHint: string;
  // Ami a termék után jöhet; kapcsolódó szolgáltatásoldal.
  next: { text: string; href: string; label: string };
};

export function termekPath(id: TermekId): string {
  return `${GYORS_INDULAS_PATH}/${id}`;
}

export function formatFt(osszeg: number): string {
  return `${new Intl.NumberFormat("hu-HU").format(osszeg)} Ft`;
}

export const TERMEKEK: Termek[] = [
  {
    id: "megkereses-teszt",
    n: "01",
    name: "Megkeresés-teszt",
    arNetto: 49_000,
    munkanap: 7,
    kicker: "Fix ár · 7 munkanap",
    title: "Megmérjük, mi történik, amikor egy vevő ír neked",
    summary:
      "Három próba-megkeresés a cégedhez űrlapon, e-mailben és telefonon. Pontos időkkel leírjuk, mikor, hogyan és mivel válaszoltatok.",
    lead: [
      "Könnyű azt hinni, hogy gyorsan válaszolsz. Aztán kiderülhet, hogy az űrlap egy olyan postafiókba megy, amit senki nem olvas, a telefont munkaidő után nem veszi fel senki, és az ajánlat három nap múlva megy ki, ha kimegy.",
      "A te megbízásodból, a munkatársaid tudta nélkül vevőként keressük meg a cégedet három csatornán. Minden lépést időbélyeggel rögzítünk, a válaszokat szó szerint átadjuk, és sorrendbe tesszük, mit javíts először.",
    ],
    schemaDescription:
      "Megkeresés-teszt cégeknek: három próba-megkeresés űrlapon, e-mailben és telefonon a megrendelő engedélyével, időbélyeges naplóval, a válaszok szó szerinti átadásával és sorrendbe tett teendőlistával. Fix nettó ár, 7 munkanap.",
    facts: [
      { value: "3", label: "próba-megkeresés: űrlap, e-mail, telefon" },
      { value: "5", label: "szempont szerint értékelve, időbélyeggel" },
      { value: "7 nap", label: "munkanap a díjbekérő kiegyenlítésétől" },
    ],
    features: [
      {
        title: "Három próba-megkeresés",
        body: "Egy az űrlapodon, egy e-mailben, egy telefonon, valódi vevőként, a te termékedről vagy szolgáltatásodról kérdezve.",
      },
      {
        title: "Időbélyeges napló",
        body: "Mikor ment ki a megkeresés, mikor jött az első válasz, mikor az ajánlat vagy a következő lépés. Percre pontosan.",
      },
      {
        title: "A válaszok szó szerint",
        body: "Megkapod, amit a vevőd kapott volna: a leveleket és a telefonhívás jegyzetét, változtatás nélkül.",
      },
      {
        title: "Értékelés öt szempont szerint",
        body: "Válaszidő, megválaszolta-e a kérdést, adott-e árat vagy következő lépést, jött-e utánkövetés, és hogy a három csatorna ugyanazt mondta-e.",
      },
      {
        title: "Sorrendbe tett teendőlista",
        body: "Mit javíts először, mi oldható meg a mostani eszközeiddel, és hol veszíted a legtöbb megkeresést.",
      },
      {
        title: "30 perces átbeszélés",
        body: "Telefonon vagy videóhívásban végigmegyünk a riporton, és válaszolunk a kérdéseidre.",
      },
    ],
    needs: [
      "A cég neve, a weboldal címe, és az a telefonszám és e-mail-cím, amit a vevőid is látnak.",
      "Hogy melyik termékedről vagy szolgáltatásodról érdeklődjünk.",
      "Hogy rajtad kívül ki tud a tesztről. A munkatársaidnak ne szólj előre, különben nem a valós működést mérjük.",
    ],
    steps: [
      {
        title: "Megrendeled",
        body: "Kitöltöd az alábbi űrlapot. Két munkanapon belül visszaírunk a díjbekérővel és egy-két pontosító kérdéssel.",
      },
      {
        title: "Elküldjük a megkereséseket",
        body: "A díjbekérő kiegyenlítése után több napra elosztva, munkaidőben és azon kívül is, ahogy egy valódi vevő tenné.",
      },
      {
        title: "Kivárjuk a választ",
        body: "Minden csatornán öt munkanapig várunk és rögzítünk. Ha addig nem jön válasz, az is eredmény.",
      },
      {
        title: "Megkapod a riportot",
        body: "PDF-ben, időbélyeges naplóval, a válaszokkal és a teendőlistával, majd 30 percben átbeszéljük.",
      },
    ],
    faq: [
      {
        question: "Megrendelhetem egy versenytársra?",
        answer:
          "Nem. Csak a saját cégedre rendelheted, vagy olyanra, amelynek a nevében eljárhatsz. Más cég munkatársait nem teszteljük.",
      },
      {
        question: "Kiderül a riportból, melyik munkatársam válaszolt rosszul?",
        answer:
          "A riport a csatornát, az időt és a választ rögzíti, nem a munkatársat minősíti. A célja az, hogy kiderüljön, hol akad el a megkeresés.",
      },
      {
        question: "Mi van, ha egyáltalán nem válaszolnak?",
        answer:
          "Az is eredmény. Öt munkanap után lezárjuk a csatornát, és a riportban leírjuk, hol tűnt el a megkeresés.",
      },
      {
        question: "Mennyibe kerül, és hogyan fizetek?",
        answer:
          "49 000 Ft + ÁFA, díjbekérő alapján, átutalással. Nem előfizetés, nincs további díj. A határidő a díjbekérő kiegyenlítésekor indul.",
      },
    ],
    noteLabel: "Mi iránt érdeklődjünk?",
    noteHint: "Melyik termékedről vagy szolgáltatásodról kérdezzünk, és van-e olyan csatorna, amit kihagyjunk.",
    next: {
      text: "Ha a riport után rendbe tennéd, hová fut be és hogyan halad tovább a megkeresés, abban is segítünk.",
      href: "/arzenal/automatizacio",
      label: "Egyedi szoftver és automatizáció",
    },
  },
  {
    id: "gyorsatvilagitas",
    n: "02",
    name: "Gyorsátvilágítás",
    arNetto: 49_000,
    munkanap: 5,
    kicker: "Fix ár · 5 munkanap",
    title: "Az oldalad tíz legdrágább hibája, sorrendben",
    summary:
      "Rövid, írásos riport a weboldalad vagy webáruházad tíz legfontosabb hibájáról: mi a hiba, mibe kerül, és mi a javítás.",
    lead: [
      "Nem kell rögtön új weboldal, és nem kell 20 oldalas tanulmány sem. Először azt kell tudnod, hol veszítesz most vevőt, és mit érdemes elsőnek kijavítani.",
      "Kívülről, hozzáférés nélkül nézzük meg az oldaladat, úgy, ahogy a vevőid, a Google és az AI-keresők látják. Öt munkanapon belül kapsz egy rövid riportot a tíz legfontosabb hibáról, fontossági sorrendben.",
    ],
    schemaDescription:
      "Gyorsátvilágítás weboldalakhoz és webáruházakhoz: kívülről, hozzáférés nélkül, rövid írásos riport a tíz legfontosabb hibáról fontossági sorrendben, mindegyiknél a hibával, a következményével és a javítással. Fix nettó ár, 5 munkanap.",
    facts: [
      { value: "10", label: "legfontosabb hiba, fontossági sorrendben" },
      { value: "5 nap", label: "munkanap a díjbekérő kiegyenlítésétől" },
      { value: "0", label: "hozzáférés kell: kívülről vizsgálunk" },
    ],
    features: [
      {
        title: "Tíz hiba, sorrendben",
        body: "Nem száz apróság, hanem az a tíz, amelyik a legtöbb vevőbe kerül, fontossági sorrendben.",
      },
      {
        title: "Hiba, következmény, javítás",
        body: "Minden sornál: mit találtunk, mibe kerül ez neked, és mi a javítás. Úgy írva, hogy a fejlesztőd is értse.",
      },
      {
        title: "Sebesség és mobil",
        body: "Mennyi idő alatt jelenik meg az oldal telefonon, és mi lassítja.",
      },
      {
        title: "Google és AI-keresők",
        body: "Mit lát az oldaladból a Google és az AI-keresők, és mi hiányzik ahhoz, hogy megtaláljanak.",
      },
      {
        title: "Ár, ajánlatkérés, vásárlás",
        body: "Megtalálja-e a vevő, amit keres, látja-e az árat, és el tudja-e küldeni a megkeresést vagy a rendelést.",
      },
      {
        title: "Jogi oldalak és sütik",
        body: "Hol tér el technikailag az oldal működése attól, amit az adatkezelési tájékoztató és a süti-tájékoztató állít. A jogi minősítés jogászé.",
      },
    ],
    needs: [
      "A weboldalad vagy webáruházad címe.",
      "Egy-két mondat arról, mit árulsz és kinek.",
      "Ha van, az a kérdés, amire leginkább választ vársz.",
    ],
    steps: [
      {
        title: "Megrendeled",
        body: "Kitöltöd az alábbi űrlapot. Két munkanapon belül visszaírunk a díjbekérővel.",
      },
      {
        title: "Átvilágítjuk az oldalt",
        body: "A díjbekérő kiegyenlítése után kívülről, hozzáférés nélkül, telefonon és asztali gépen is.",
      },
      {
        title: "Megkapod a riportot",
        body: "PDF-ben, öt munkanapon belül, a tíz legfontosabb hibával és a javításukkal.",
      },
      {
        title: "Ha tovább lépnél",
        body: "A riport alapján te döntöd el, hogy a saját fejlesztőddel javíttatod, vagy velünk. A teljes átvilágítás és a dizájn- és rendszerajánlás innen indulhat.",
      },
    ],
    faq: [
      {
        question: "Miben más, mint a teljes átvilágítás?",
        answer:
          "A gyorsátvilágítás a tíz legfontosabb hibát adja, rövid riportban. A teljes átvilágítás minden területet részletesen végignéz, és ha kéred, dizájn- és rendszerajánlás meg kattintható látványterv is jár hozzá.",
      },
      {
        question: "Kell hozzáférést adnom az oldalhoz?",
        answer: "Nem. Kívülről vizsgáljuk, azt, amit a vevőid, a Google és az AI-keresők is látnak.",
      },
      {
        question: "Biztosan javítást is el akartok majd adni?",
        answer:
          "A riport úgy készül, hogy a saját fejlesztőd is el tudjon indulni belőle. Hogy kivel javíttatod, a te döntésed.",
      },
      {
        question: "Mennyibe kerül, és hogyan fizetek?",
        answer:
          "49 000 Ft + ÁFA, díjbekérő alapján, átutalással. Nem előfizetés, nincs további díj. A határidő a díjbekérő kiegyenlítésekor indul.",
      },
    ],
    noteLabel: "Mit árulsz, és kinek?",
    noteHint: "Egy-két mondat elég. Ha van konkrét kérdésed az oldallal kapcsolatban, azt is írd ide.",
    next: {
      text: "Ha a tíz hibánál mélyebbre mennél, a teljes átvilágítás minden területet végignéz, és dizájn- és rendszerajánlást is ad.",
      href: "/arzenal/atvilagitas-es-ajanlas",
      label: "Átvilágítás, dizájn- és rendszerajánlás",
    },
  },
];

export function getTermek(id: string): Termek | undefined {
  return TERMEKEK.find((t) => t.id === id);
}
