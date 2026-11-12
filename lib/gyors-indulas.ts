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

export const TERMEK_IDK = [
  "megkereses-teszt",
  "gyorsatvilagitas",
  "alvo-ajanlatok",
  "javitocsomag",
  "jogi-technikai-ellenorzes",
  "ai-lathatosag",
] as const;
export type TermekId = (typeof TERMEK_IDK)[number];

export type Termek = {
  id: TermekId;
  n: string;
  name: string;
  // Nettó ár egész forintban.
  arNetto: number;
  // Határidő kiírva (pl. "7 munkanap"), és hogy mitől számít.
  hatarido: string;
  hataridoKezdet: string;
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
    hatarido: "7 munkanap",
    hataridoKezdet: "a díjbekérő kiegyenlítésétől",
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
    hatarido: "5 munkanap",
    hataridoKezdet: "a díjbekérő kiegyenlítésétől",
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
  {
    id: "alvo-ajanlatok",
    n: "03",
    name: "Alvó ajánlatok újraélesztése",
    arNetto: 89_000,
    hatarido: "7 munkanap",
    hataridoKezdet: "attól, hogy megkaptuk az ajánlatlistát és kiegyenlítetted a díjbekérőt",
    kicker: "Fix ár · 7 munkanap",
    title: "A kiküldött ajánlataidban ott a következő hónap bevétele",
    summary:
      "Átnézzük az elmúlt hat hónap válasz nélkül maradt ajánlatait (legfeljebb 30-at), és mindegyikhez megírjuk a személyre szabott utánkövető levelet. Te küldöd el, a saját postafiókodból.",
    lead: [
      "Az ajánlat kiment, a vevő nem válaszolt, és a következő héten jött az újabb munka. Így marad egy fiókban fél év ajánlata, amire senki nem kérdezett rá még egyszer.",
      "Átnézzük ezeket az ajánlatokat, sorrendbe tesszük őket aszerint, melyikkel érdemes kezdeni, és mindegyikhez megírjuk az utánkövető levelet és a telefonos mondatot. Kiküldeni nem mi küldjük: minden levél a te jóváhagyásoddal, a te postafiókodból megy ki.",
    ],
    schemaDescription:
      "Alvó ajánlatok újraélesztése cégeknek: az elmúlt hat hónap válasz nélkül maradt ajánlatainak (legfeljebb 30) átnézése, sorrendbe tétele, és ajánlatonként személyre szabott utánkövető levél és telefonos vázlat. A leveleket a megrendelő küldi a saját postafiókjából. Fix nettó ár, 7 munkanap.",
    facts: [
      { value: "30", label: "ajánlatig, az elmúlt hat hónapból" },
      { value: "1:1", label: "minden ajánlathoz saját levél, nem körlevél" },
      { value: "7 nap", label: "munkanap a lista és a kiegyenlítés után" },
    ],
    features: [
      {
        title: "Sorrendbe tett ajánlatlista",
        body: "Melyik ajánlattal kezdj: érték, kor, és hogy mi történt vele utoljára. Egy táblázatban, amit tovább tudsz vezetni.",
      },
      {
        title: "Ajánlatonként saját levél",
        body: "Nem „csak érdeklődnék” körlevél, hanem az adott ajánlatra, az adott vevőre írt utánkövetés, egy konkrét következő lépéssel.",
      },
      {
        title: "Telefonos vázlat",
        body: "Ha a hívás jobban működik, mint a levél: néhány mondat, amivel fel tudod hívni a vevőt, és egy-két válasz a leggyakoribb kifogásokra.",
      },
      {
        title: "Második kör",
        body: "Ha az első levélre sem jön válasz: egy rövid második levél, amit egy héttel később küldhetsz.",
      },
      {
        title: "Te küldöd, te hagyod jóvá",
        body: "Semmi nem megy ki helyetted. A leveleket átírhatod, és a saját postafiókodból küldöd el őket.",
      },
      {
        title: "30 perces átbeszélés",
        body: "Telefonon vagy videóhívásban végigmegyünk a listán, és megbeszéljük, mit kezdj az ajánlatokra jövő válaszokkal.",
      },
    ],
    needs: [
      "Az elmúlt hat hónap válasz nélkül maradt ajánlatainak listája: vevő, kapcsolattartó, dátum, összeg, tárgy. Táblázat, exportált lista vagy a PDF-ek is jók.",
      "Ha van, a vevővel folytatott utolsó levelezés vagy egy mondat arról, mi történt utoljára.",
      "Hogy milyen hangnemben szoktál írni a vevőidnek (tegező vagy magázó).",
    ],
    steps: [
      {
        title: "Megrendeled",
        body: "Kitöltöd az alábbi űrlapot. Két munkanapon belül visszaírunk a díjbekérővel, és azzal, hogyan küldd át biztonságosan az ajánlatlistát.",
      },
      {
        title: "Átnézzük az ajánlatokat",
        body: "Mindegyiknél megnézzük, mit ajánlottál, mikor, és mi történt vele utoljára, majd sorrendbe tesszük őket.",
      },
      {
        title: "Megírjuk a leveleket",
        body: "Ajánlatonként egy utánkövető levél, egy második kör és egy telefonos vázlat.",
      },
      {
        title: "Átadjuk és átbeszéljük",
        body: "Egy táblázatban és egy dokumentumban kapod meg. 30 percben átbeszéljük, utána te küldöd ki.",
      },
    ],
    faq: [
      {
        question: "Ti külditek ki a leveleket?",
        answer:
          "Nem. A vevőidnek a te nevedben semmi nem megy ki tőlünk. Mi megírjuk, te átnézed, és a saját postafiókodból küldöd el.",
      },
      {
        question: "Mi van, ha 30-nál több ajánlatom van?",
        answer:
          "Akkor a sorrendbe tétel után a 30 legfontosabbal dolgozunk. Ha mindegyikre szükséged van, egyedi ajánlatot adunk rá.",
      },
      {
        question: "Mit csináltok az ajánlataim adataival?",
        answer:
          "Csak erre a munkára használjuk, és az átadás után nem dolgozunk tovább velük. Nem adjuk tovább, és nem használjuk más ügyfélnél.",
      },
      {
        question: "Mennyibe kerül, és hogyan fizetek?",
        answer:
          "89 000 Ft + ÁFA, díjbekérő alapján, átutalással. Nem előfizetés, nincs további díj.",
      },
    ],
    noteLabel: "Hány ajánlatról van szó, és miben?",
    noteHint: "Nagyjából hány válasz nélküli ajánlatod van, és milyen termékre vagy szolgáltatásra szólnak.",
    next: {
      text: "Ha azt szeretnéd, hogy ezentúl ne aludjanak el az ajánlatok, abban is segítünk: utánkövetési ritmus és ajánlatkövetés a saját rendszeredben.",
      href: "/arzenal/automatizacio",
      label: "Egyedi szoftver és automatizáció",
    },
  },
  {
    id: "javitocsomag",
    n: "04",
    name: "Javítócsomag",
    arNetto: 129_000,
    hatarido: "10 munkanap",
    hataridoKezdet: "attól, hogy megkaptuk a hozzáférést és kiegyenlítetted a díjbekérőt",
    kicker: "Fix ár · 10 munkanap",
    title: "Az átvilágítás öt legfontosabb hibáját ki is javítjuk",
    summary:
      "Egy elkészült átvilágításból öt hibát kijavítunk a mostani rendszereden. Előre írásban rögzítjük, melyik ötöt, és ahol mérhető, előtte és utána is mérünk.",
    lead: [
      "Egy átvilágítás akkor ér valamit, ha a hibák el is tűnnek. Gyakran ott akad el, hogy nincs, aki megcsinálja, vagy a fejlesztő nem ér rá.",
      "Az átvilágításod listájából kiválasztunk öt hibát, amit a mostani rendszereden ki lehet javítani, ezt írásban rögzítjük, és kijavítjuk. Ahol a hiba mérhető, előtte és utána is mérünk, így látod, mi változott.",
    ],
    schemaDescription:
      "Javítócsomag: egy elkészült átvilágítás öt, előre írásban rögzített hibájának kijavítása a meglévő weboldalon vagy webáruházban, előtte-utána méréssel, ahol a hiba mérhető. Fix nettó ár, 10 munkanap.",
    facts: [
      { value: "5", label: "hiba, előre írásban rögzítve" },
      { value: "Előtte–utána", label: "mérés, ahol a hiba mérhető" },
      { value: "10 nap", label: "munkanap a hozzáférés és a kiegyenlítés után" },
    ],
    features: [
      {
        title: "Öt rögzített javítás",
        body: "Az átvilágítás listájából, a mostani rendszereden javítható hibák közül. Előre leírjuk, melyik ötöt, és mit jelent, hogy kész.",
      },
      {
        title: "Mentés előtte",
        body: "Mielőtt hozzányúlunk, mentést kérünk vagy készítünk, hogy bármikor vissza lehessen állni.",
      },
      {
        title: "Előtte–utána mérés",
        body: "Ahol a hiba mérhető (sebesség, hiányzó adatok, betöltődő sütik), előtte és utána is mérünk, és átadjuk az eredményt.",
      },
      {
        title: "Átadási jegyzet",
        body: "Mit változtattunk, hol, és mire figyeljen a fejlesztőd, ha később hozzányúl.",
      },
    ],
    needs: [
      "Egy elkészült átvilágítás: a mi gyorsátvilágításunk vagy teljes átvilágításunk. Ha nincs, kezdj a gyorsátvilágítással.",
      "Hozzáférés a weboldal vagy webáruház adminisztrációjához (és ha kell, a tárhelyhez), egy külön felhasználóval.",
      "Egy kapcsolattartó, aki jóváhagyja a rögzített listát, és szól, ha valamit nem szabad megváltoztatni.",
    ],
    steps: [
      {
        title: "Megrendeled",
        body: "Kitöltöd az alábbi űrlapot. Két munkanapon belül visszaírunk a díjbekérővel és a javasolt öt hibával.",
      },
      {
        title: "Rögzítjük az öt hibát",
        body: "Írásban, a „kész” feltételével együtt. Ha egy hiba nem javítható a mostani rendszeren, azt nem tesszük bele, hanem a következőt választjuk.",
      },
      {
        title: "Mentés, javítás, mérés",
        body: "Mentés után kijavítjuk az öt hibát, és ahol mérhető, újra mérünk.",
      },
      {
        title: "Átadás",
        body: "Átadási jegyzet a változásokról és a mérésekről.",
      },
    ],
    faq: [
      {
        question: "Kell hozzá átvilágítás?",
        answer:
          "Igen, mert enélkül nem tudjuk előre rögzíteni, mit javítunk. Ha még nincs, kezdj a gyorsátvilágítással.",
      },
      {
        question: "Mi van, ha egy hiba nagyobb munka, mint gondoltuk?",
        answer:
          "Az öt hibát a rögzítés előtt felmérjük. Ami nem fér bele a csomagba, azt nem vállaljuk el benne, hanem külön árat mondunk rá, és te döntesz.",
      },
      {
        question: "Milyen rendszeren dolgoztok?",
        answer:
          "A mostanin. Hogy egy javítás a te rendszereden megoldható-e, azt a rögzítéskor megmondjuk, és ami nem, az nem kerül bele a csomagba.",
      },
      {
        question: "Mennyibe kerül, és hogyan fizetek?",
        answer:
          "129 000 Ft + ÁFA, díjbekérő alapján, átutalással. Nem előfizetés, nincs további díj.",
      },
    ],
    noteLabel: "Melyik átvilágításból dolgozzunk?",
    noteHint: "Ha tőlünk kaptad, elég a dátum. Ha mástól, írd meg, és küldd majd át.",
    next: {
      text: "Ha a javítás után folyamatos gondozásra van szükség, havidíjas üzemeltetést is vállalunk.",
      href: "/arzenal/weboldal-uzemeltetes",
      label: "Web-üzemeltetés és fejlesztés",
    },
  },
  {
    id: "jogi-technikai-ellenorzes",
    n: "05",
    name: "Jogi-technikai gyorsellenőrzés",
    arNetto: 39_000,
    hatarido: "5 munkanap",
    hataridoKezdet: "a díjbekérő kiegyenlítésétől",
    kicker: "Fix ár · 5 munkanap",
    title: "Azt csinálja-e az oldalad, amit a tájékoztatóid állítanak",
    summary:
      "Megnézzük, milyen sütik és külső szolgáltatások töltődnek be hozzájárulás előtt és után, és ez egyezik-e azzal, amit az adatkezelési és a süti-tájékoztatód állít. Jogi minősítést nem adunk.",
    lead: [
      "Az adatkezelési tájékoztató egyszer elkészül, aztán az oldalra felkerül egy hirdetési kód, egy chat, egy új űrlap, és a tájékoztató már nem azt írja, ami történik. Kívülről ez bárki számára ellenőrizhető.",
      "Megnézzük, mi töltődik be az oldaladon a süti-hozzájárulás előtt és után, működik-e az elutasítás, és összevetjük azzal, amit a tájékoztatóid állítanak. A technikai eltérést mutatjuk meg; a jogi minősítés a jogászé.",
    ],
    schemaDescription:
      "Jogi-technikai gyorsellenőrzés weboldalakhoz: a hozzájárulás előtt és után betöltődő sütik és külső szolgáltatások, a süti-elutasítás működése, és ezek összevetése az adatkezelési és süti-tájékoztatóval. Technikai eltéréslista, jogi minősítés nélkül. Fix nettó ár, 5 munkanap.",
    facts: [
      { value: "Előtte–utána", label: "mi töltődik be a hozzájárulás előtt és után" },
      { value: "Eltéréslista", label: "a tájékoztatóid állításaival összevetve" },
      { value: "5 nap", label: "munkanap a díjbekérő kiegyenlítésétől" },
    ],
    features: [
      {
        title: "Sütik hozzájárulás előtt",
        body: "Milyen sütik és külső kódok töltődnek be, mielőtt a látogató bármire rákattintott volna.",
      },
      {
        title: "Működik-e az elutasítás",
        body: "Ha a látogató elutasítja a sütiket, tényleg nem töltődnek-e be a mérő- és hirdetési kódok.",
      },
      {
        title: "Külső szolgáltatások",
        body: "Kiknek megy adat az oldaladról (mérés, hirdetés, chat, betűtípus, térkép), és szerepelnek-e a tájékoztatódban.",
      },
      {
        title: "Űrlapok",
        body: "Van-e az űrlapoknál hivatkozás az adatkezelési tájékoztatóra, és hová mennek a beküldött adatok, ha ez kívülről látszik.",
      },
      {
        title: "Cégadatok és elérhetőség",
        body: "Megtalálhatók-e az oldalon a cégadatok és az elérhetőség, és egyeznek-e egymással az oldalon belül.",
      },
      {
        title: "Eltéréslista",
        body: "Rövid PDF: mit állít a tájékoztató, mi történik valójában, képernyőképpel. Ezt viheted a jogászodhoz.",
      },
    ],
    needs: [
      "A weboldalad címe.",
      "Ha nem az oldalon van, az adatkezelési és a süti-tájékoztatód.",
    ],
    steps: [
      {
        title: "Megrendeled",
        body: "Kitöltöd az alábbi űrlapot. Két munkanapon belül visszaírunk a díjbekérővel.",
      },
      {
        title: "Megnézzük, mi töltődik be",
        body: "Tiszta böngészővel, hozzájárulás előtt, elfogadás után és elutasítás után.",
      },
      {
        title: "Összevetjük a tájékoztatóval",
        body: "Soronként: amit a tájékoztató állít, és amit az oldal csinál.",
      },
      {
        title: "Megkapod az eltéréslistát",
        body: "PDF-ben, képernyőképekkel, öt munkanapon belül.",
      },
    ],
    faq: [
      {
        question: "Jogi tanácsot adtok?",
        answer:
          "Nem. Azt mutatjuk meg, mi történik technikailag az oldaladon, és ez hol tér el a tájékoztatóidtól. Hogy ez jogilag mit jelent, és hogyan módosítsd a szöveget, azt jogász mondja meg.",
      },
      {
        question: "Megírjátok helyettem a tájékoztatót?",
        answer:
          "Jogi szöveget nem írunk. A technikai javításban (például hogy a mérőkód csak hozzájárulás után induljon el) tudunk segíteni.",
      },
      {
        question: "Kell hozzáférés?",
        answer: "Nem. Kívülről vizsgálunk, ahogy bármelyik látogató vagy hatóság is láthatja.",
      },
      {
        question: "Mennyibe kerül, és hogyan fizetek?",
        answer:
          "39 000 Ft + ÁFA, díjbekérő alapján, átutalással. Nem előfizetés, nincs további díj.",
      },
    ],
    noteLabel: "Van, amire külön figyeljünk?",
    noteHint: "Például egy új hirdetési kód, chat vagy űrlap, amiről nem vagy biztos, hogy szerepel a tájékoztatóban.",
    next: {
      text: "Ha azt szeretnéd, hogy ez ne csússzon el újra, a Pulzus folyamatosan figyeli az oldaladat.",
      href: "/arzenal/pulzus",
      label: "Pulzus",
    },
  },
  {
    id: "ai-lathatosag",
    n: "06",
    name: "AI-láthatósági felmérés",
    arNetto: 79_000,
    hatarido: "72 óra",
    hataridoKezdet: "attól, hogy egyeztettük a kérdéssort és kiegyenlítetted a díjbekérőt",
    kicker: "Fix ár · 72 óra",
    title: "Mit mond rólad egy AI, amikor a vevőd megkérdezi",
    summary:
      "Az AEO-felmérésünk fix áras változata, legfeljebb tíz kérdéssel: átnézzük az oldaladat úgy, ahogy egy gép olvassa, és a kérdéseket több AI-asszisztensnek is feltesszük, többször.",
    lead: [
      "A vevőid egy része már nem a Google találati listáját nézi, hanem megkérdez egy AI-asszisztenst, hogy kit ajánl. Hogy téged megemlít-e, és jól írja-e le, mit csinálsz, azt csak úgy lehet tudni, ha megkérdezzük.",
      "Együtt összeállítunk legfeljebb tíz kérdést, amit a vevőid tényleg feltennének, és ugyanazzal a módszerrel mérünk, amit az AEO-felmérésnél leírtunk. Pillanatképet kapsz, nem garanciát: azt, hogy egy AI téged ajánl, senki nem tudja megígérni.",
    ],
    schemaDescription:
      "AI-láthatósági felmérés (AEO) fix áron, legfeljebb tíz kérdéssel: az oldal gépi olvashatóságának átnézése, és a kérdések feltétele több AI-asszisztensnek, kérdésenként legalább háromszor, a válaszok szó szerinti átadásával. 72 óra a kérdéssor egyeztetése után.",
    facts: [
      { value: "10", label: "kérdésig, a vevőid kérdéseiből" },
      { value: "3×", label: "kérdésenként legalább, új munkamenetben" },
      { value: "72 óra", label: "a kérdéssor egyeztetése után" },
    ],
    features: [
      {
        title: "Az oldalad gépi szemmel",
        body: "Beengedi-e az AI-robotokat, elmondja-e szövegesen, ki vagy, van-e strukturált adat, egyeznek-e a cégadatok.",
      },
      {
        title: "Kérdéssor a vevőid fejével",
        body: "Legfeljebb tíz kérdés, amit együtt állítunk össze abból, amit a vevőid tényleg megkérdeznének.",
      },
      {
        title: "Több felület, többször",
        body: "Ugyanazokon a felületeken és ugyanazzal az ismétléssel, ahogy az AEO-felmérésnél leírtuk, mert az AI-válasz futásonként változik.",
      },
      {
        title: "A válaszok szó szerint",
        body: "Minden válasz dátummal és felülettel, mellette összesítés: hányszor említett, és pontosan írta-e le, mit csinálsz.",
      },
      {
        title: "Teendőlista",
        body: "Mit érdemes javítani az oldaladon, hogy az AI-k pontosabban beszéljenek rólad.",
      },
    ],
    needs: [
      "A weboldalad címe.",
      "Két-három mondat arról, kik a vevőid, és mit kérdeznek tőled a leggyakrabban.",
      "Egy rövid egyeztetés a kérdéssorról, e-mailben vagy telefonon.",
    ],
    steps: [
      {
        title: "Megrendeled",
        body: "Kitöltöd az alábbi űrlapot. Két munkanapon belül visszaírunk a díjbekérővel és egy kérdéssor-javaslattal.",
      },
      {
        title: "Egyeztetjük a kérdéssort",
        body: "Legfeljebb tíz kérdés. A 72 óra innen indul.",
      },
      {
        title: "Mérünk",
        body: "Átnézzük az oldaladat, és feltesszük a kérdéseket az AI-asszisztenseknek, többször.",
      },
      {
        title: "Átadjuk",
        body: "Írásban, a válaszokkal szó szerint és a teendőlistával.",
      },
    ],
    faq: [
      {
        question: "Garantáljátok, hogy utána az AI engem ajánl?",
        answer:
          "Nem. Ez pillanatkép arról, mit mondanak most. Azt, hogy egy AI téged ajánl, senki nem tudja megígérni. Azt tudjuk megmutatni, mi hiányzik az oldaladról ahhoz, hogy pontosabban beszéljen rólad.",
      },
      {
        question: "Miben más, mint az AEO-felmérés a SEO oldalon?",
        answer:
          "Ugyanaz a módszer, de rögzített terjedelemmel (legfeljebb tíz kérdés) és fix áron. Nagyobb kérdéssorra egyedi ajánlatot adunk.",
      },
      {
        question: "Visszamértek a javítás után?",
        answer:
          "Ha a javításokat velünk csinálod, ugyanazzal a kérdéssorral visszamérünk, így látod, mi változott.",
      },
      {
        question: "Mennyibe kerül, és hogyan fizetek?",
        answer:
          "79 000 Ft + ÁFA, díjbekérő alapján, átutalással. Nem előfizetés, nincs további díj.",
      },
    ],
    noteLabel: "Kik a vevőid, és mit kérdeznek?",
    noteHint: "Két-három mondat elég. Ebből készítjük a kérdéssor-javaslatot.",
    next: {
      text: "Hogy mit nézünk az AEO-felmérésnél, és mit csinálunk utána, a SEO és AEO oldalon írtuk le részletesen.",
      href: "/seo",
      label: "SEO és AEO",
    },
  },
];

export function getTermek(id: string): Termek | undefined {
  return TERMEKEK.find((t) => t.id === id);
}
