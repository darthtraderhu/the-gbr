// A szolgáltatás-aloldalak (/arzenal/...) és az /arzenal áttekintő oldal
// közös adatai — egy helyen, hogy az áttekintő és a részletes oldal ne
// csúszhasson szét.

import type { AngleRow, Fact, Feature } from "@/app/components/SalesBlocks";

export type FaqItem = { question: string; answer: string };

// Egy szolgáltatás értékesítési szöge: rövid állítás, főcím, tényszalag és a
// „szokásos vs. nálunk” összevetés. Az /arzenal és az aloldal is ezt használja.
// Csak olyat írj ide, amit leszállítunk és ellenőrizhető: százalék, garancia,
// eredményígéret nem kerül bele.
export type ServicePitch = {
  kicker: string;
  headline: string;
  facts: Fact[];
  angleTitle: string;
  angle: AngleRow[];
  // Az aloldal záró kérdése. Nem azt kérdezzük, mit szeretne (sokszor nem
  // tudja), hanem egy szolgáltatáshoz illő, megválaszolható kérdést; a
  // választ mi adjuk meg.
  cta: { question: string; body: string; button?: string };
};

export const WEB_SERVICE = {
  name: "Weboldal- és webshopfejlesztés",
  description:
    "Egyedi dizájn alapú weboldal- és webshopfejlesztés Next.js alapokon, technikai SEO-val és biztonsági alapbeállításokkal.",
  path: "/arzenal/weboldal-fejlesztes",
};

export const IT_SERVICE = {
  name: "IT-üzemeltetés és rendszergazdai szolgáltatás",
  description:
    "Irodai IT-üzemeltetés kis és nagyobb csapatoknak: rendszerfelmérés, rendszergazdai feladatok, távfelügyelet, szerver, hálózat, VPN, levelezés, Microsoft 365 és Teams, nyomtatók és mobilflotta kezelése, IT-partnerünkkel, aki 15 éve üzemeltet irodai rendszereket.",
  path: "/arzenal/it-uzemeltetes",
};

export const WEB_FEATURES: Feature[] = [
  {
    title: "Egyedi dizájn, design rendszerrel",
    body: "A márkádra és a kínálatodra tervezve, nem sablonból. A design rendszer miatt a később hozzáadott oldalak is egységesek maradnak.",
  },
  {
    title: "Technikai SEO, AI-keresőknek is olvashatóan",
    body: "Sitemap, strukturált adat, canonical, tiszta szerkezet: a Google és az AI-keresők is értik, mit árulsz és kinek.",
  },
  {
    title: "Megkeresés-útvonal, nem csak űrlap",
    body: "Űrlap, visszahívás, ajánlatkérés oda, ahol a vevő döntést hoz. Ha kéred, egyenesen a CRM-edbe vagy a táblázatodba futtatjuk.",
  },
  {
    title: "Telefonra telepíthető változat (PWA)",
    body: "A visszatérő vevő a kezdőképernyőről nyitja meg az oldalt, mint egy alkalmazást.",
  },
  {
    title: "Meglévő motor fölé építés",
    body: "WooCommerce vagy Shopify marad, a felület újul. Nem kell kidobni, ami működik.",
  },
  {
    title: "Biztonság a szerkezetben",
    body: "Biztonsági fejlécek, kéréskorlátozás, bemenet-ellenőrzés. Nem utólag felrakott bővítmény.",
  },
];

export const IT_FEATURES: Feature[] = [
  { title: "Felmérés írásban", body: "Mi van most, ki fér hozzá mihez, mi hiányzik. Írásos összefoglaló, sorrendbe tett javaslatokkal." },
  { title: "Rendszergazda irodában, otthon, mobilon", body: "Ugyanaz a felelős ember, akár az irodában ül a kolléga, akár home office-ban, akár a telefonján dolgozik." },
  { title: "Távfelügyelet és távoli segítség", body: "Rákapcsolódunk, nem kell kiszállásra várni egy elakadt levelezés miatt." },
  { title: "Szerver és hálózat", body: "Szerverkörnyezet, kábeles és wifihálózat kiépítése és üzemeltetése." },
  { title: "Biztonságos távoli elérés", body: "VPN, hogy otthonról is ugyanúgy és ugyanolyan biztonsággal lehessen dolgozni." },
  { title: "Levelezés, Microsoft 365, Teams", body: "Kialakítás, üzemeltetés, távmunka és távoktatás bevezetése." },
  { title: "Nyomtatók és eszközök", body: "Kezelés, karbantartás, a meglévő szoftverek és eszközök üzemeltetése." },
  { title: "Mobilflotta átnézése", body: "Díjcsomagok és költségek: mit fizettek, és mit érdemes rajta változtatni." },
];

export const IT_SAMPLE_ROWS = [
  {
    finding: "Van mentés, de visszaállítást senki nem próbált",
    meaning: "Baj esetén derül ki, hogy működik-e",
    severity: "Magas",
  },
  {
    finding: "Kilépett munkatárs fiókja még aktív",
    meaning: "Hozzáfér a céges levelekhez, fájlokhoz",
    severity: "Magas",
  },
  {
    finding: "Közös rendszergazda-jelszó, évek óta ugyanaz",
    meaning: "Nem követhető, ki mit állított át",
    severity: "Magas",
  },
  {
    finding: "Vendég és könyvelés ugyanazon a wifin",
    meaning: "Egy fertőzött vendéggép elérheti a belső gépeket",
    severity: "Közepes",
  },
  {
    finding: "Lejárt támogatású operációs rendszer",
    meaning: "Nem kap biztonsági frissítést",
    severity: "Közepes",
  },
];

export const WEB_FAQ: FaqItem[] = [
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
];

export const SIZE_FAQ: FaqItem = {
  question: "Csak nagyvállalatokkal dolgoztok?",
  answer:
    "Nem. Van egy alsó határ, ami alatt nem érdemes belefogni — ezt az űrlapon a költségkeret-kérdés szűri. Fölötte a cégméret nem szempont.",
};

export const IT_FAQ: FaqItem[] = [
  {
    question: "Kis irodának is érdemes külső rendszergazda?",
    answer:
      "Igen, gyakran éppen nekik. Ahol nincs saját informatikus, ott jellemzően valamelyik munkatárs viszi „mellékesen”, és ez addig működik, amíg nincs baj. Felméréssel kezdünk, és megmondjuk, mekkora rendszeres munkát kíván a tiétek. Ha keveset, azt is.",
  },
];

export const ADS_SERVICE = {
  name: "Performance marketing",
  description:
    "Google és Meta hirdetéskezelés, ahol a kattintástól a megkeresésig követjük a konverziót, és heti jelentésben számolunk el.",
  path: "/arzenal/hirdeteskezeles",
};

export const SOFTWARE_SERVICE = {
  name: "Egyedi szoftver és automatizáció",
  description:
    "Üzleti folyamatok automatizálása és egyedi szoftverfejlesztés: a webshop, a számlázó, a CRM és a táblázatok összekötése kész automatizációs eszközzel vagy saját kóddal, belső rendszerek és ügyfélportálok fejlesztése, naplózással, hibariasztással és dokumentált átadással.",
  path: "/arzenal/automatizacio",
};

export const AI_SERVICE = {
  name: "AI és chatbot",
  description:
    "Chatbot a weboldalon, saját tartalomra hangolva, emberi átirányítással a komolyabb kérdéseknél.",
  path: "/arzenal/ai-chatbot",
};

export const VIDEO_SERVICE = {
  name: "Videó és tartalom",
  description:
    "Cégbemutató, termék- és közösségimédia-videók gyártása, a weboldal arculatával egységes kivitelben.",
  path: "/arzenal/videogyartas",
};

export const OPS_SERVICE = {
  name: "Web-üzemeltetés és fejlesztés",
  description:
    "Folyamatos weboldal-üzemeltetés: monitoring, hibariasztás, havi fejlesztési óraszám és rendszeres jelentés.",
  path: "/arzenal/weboldal-uzemeltetes",
};

export const ACCESS_SERVICE = {
  name: "Akadálymentesítés",
  description:
    "Weboldalak technikai akadálymentesítési felmérése és javítása — kontraszt, billentyűzetes bejárhatóság, képernyőolvasó-kompatibilitás és feliratozás.",
  path: "/arzenal/akadalymentesites",
};

export const PULZUS_SERVICE = {
  name: "Pulzus",
  description:
    "Havi figyelő szolgáltatás élő weboldalakhoz: elérhetőség, sebesség, SSL-tanúsítvány és Google-profil figyelése, összefoglalva egy havi levélben. Jogi modullal: a sütik és külső kódok havi változását webjogász partner értékeli, és szükség esetén frissíti a jogi dokumentumokat.",
  path: "/arzenal/pulzus",
};

export const ADS_FEATURES: Feature[] = [
  { title: "Google és Meta, B2B fókusszal", body: "Döntéshozókra és ajánlatkérőkre szabva, nem lájkvadászatra." },
  { title: "Mérés a megkeresésig", body: "A kattintástól az űrlapig vagy a hívásig követjük, nem áll meg a hirdetési felületnél." },
  { title: "Landing oldal kampányonként", body: "Egy üzenet, egy cselekvés. A fizetett forgalmat nem a főoldalra engedjük el." },
  { title: "Heti jelentés, érthető nyelven", body: "Mi hozott megkeresést, mi nem, és mit állítunk le, indoklással." },
];

export const AI_FEATURES: Feature[] = [
  { title: "A te tartalmadra hangolva", body: "Abból válaszol, amit kínálsz és amit leírtál, nem az internet általánosságaiból." },
  { title: "Emberhez irányít, ha komoly a kérdés", body: "Árat, határidőt, ajánlatot ember mond. A chat tudja, hol a határa." },
  { title: "Jogi rend az indulástól", body: "AI-tájékoztató, dokumentált adattovábbítás: tudod, milyen adat hova kerül." },
  { title: "Belső automatizációk", body: "Dokumentumfeldolgozás, összefoglalás, besorolás: ahol a csapat ma kézzel olvas és másol." },
];

export const VIDEO_FEATURES: Feature[] = [
  { title: "Cégbemutató és imázsvideó", body: "Ugyanazzal a hanggal és arculattal, mint a weboldal." },
  { title: "Termékvideó webshophoz", body: "A termékoldalra, oda, ahol a vevő a kosárgomb előtt mérlegel." },
  { title: "Rövid közösségi formátumok", body: "Álló és négyzetes változat ugyanabból az anyagból." },
  { title: "Vágás, színkezelés, felirat", body: "Feliratozva, hogy hang nélkül, telefonon is érthető legyen." },
];

export const OPS_FEATURES: Feature[] = [
  { title: "Monitoring és hibariasztás", body: "A hibáról mi tudunk előbb, nem egy ügyfeled szól." },
  { title: "Fejlesztés havi óraszámban", body: "Nem kell minden apró javításra külön ajánlatot kérni." },
  { title: "Ütemezett tartalom", body: "A cikk a megadott napon magától megjelenik, a sitemap vele frissül." },
  { title: "Jogi megfelelés karbantartása", body: "Ha az oldal változik, a tájékoztatók sem maradnak le mögötte." },
  { title: "Heti vagy kétheti riport", body: "Mi készült el, mi jön, mi akadt el. Írásban, nem telefonon elmesélve." },
  { title: "Egy felelős kapcsolattartó", body: "Aki ismeri a projekted. Nem ügyfélszolgálati sorszám." },
];

export const ACCESS_FEATURES: Feature[] = [
  { title: "Felmérés súlyossággal", body: "Mi akadályozza a használatot, és mennyire: a lista sorrendje a javítás sorrendje." },
  { title: "Kontraszt és méretek", body: "Betűméret, színkontraszt, kattintható felületek, hogy telefonon, remegő kézzel is eltalálható legyen." },
  { title: "Billentyűzetes bejárhatóság", body: "Látható fókusz, logikus sorrend: egér nélkül is végig lehet menni a vásárláson." },
  { title: "Képernyőolvasóval használható", body: "Szemantikus szerkezet, képleírások, értelmes linkszövegek." },
  { title: "Érthető űrlapok", body: "Címkék, világos hibaüzenetek. Az ajánlatkérés ne bukjon el egy kimondatlan mezőn." },
  { title: "Videók feliratozása", body: "Ami hangban elhangzik, szövegben is ott van." },
  { title: "Írásos jelentés", body: "Mi volt, mit javítottunk, mi maradt. Ezt tudod megmutatni bárkinek, aki kérdezi." },
];

export const PULZUS_FEATURES: Feature[] = [
  { title: "Elérhetőség", body: "Leállásnál értesítés, nem a hónap végén." },
  { title: "Betöltési sebesség", body: "A változást jelezzük, nem egy pontszámot." },
  { title: "SSL-tanúsítvány", body: "Időben szólunk, mielőtt a böngésző „nem biztonságos” jelzést tenne ki." },
  { title: "Kapcsolati űrlap havi tesztje", body: "Kiderül, ha a megkeresések csendben elvesznek." },
  { title: "Indexeltség", body: "Látszik-e az oldal a keresőben, és ha nem, miért." },
  { title: "Google-profil és értékelések", body: "Új értékelések, változó átlag, semleges értékelés-kérés vásárlás után." },
  { title: "Válaszjavaslat az értékelésekre", body: "Mi megírjuk, te küldöd. A nevedben soha nem posztolunk." },
  { title: "Jogi modul", body: "Sütik és külső kódok havi feltérképezése, és jelzés, ha mérőkód fut hozzájárulás előtt. Eltérésnél webjogász partner értékel." },
  { title: "Havi levél magyarul", body: "Mi változott, mit érdemes tenni. Konkrét javaslat, nem grafikonhalom." },
];

export const SOFTWARE_FEATURES: Feature[] = [
  { title: "Folyamatfelmérés írásban", body: "Mi megy ma kézzel, mibe kerül, és mit érdemes automatizálni. Azt is leírjuk, mit nem." },
  { title: "Rendszerek összekötése", body: "Webshop, számlázó, CRM, e-mail, táblázat: az adat egyszer kerül be, és mindenhová eljut." },
  { title: "Kész eszköz vagy saját kód", body: "Amelyik hosszabb távon olcsóbban fenntartható. Nem a kedvenc eszközünkhöz igazítjuk a folyamatodat." },
  { title: "Egyedi belső rendszer", body: "Ügyfélportál, adminfelület, belső nyilvántartás, ha nincs rá megfelelő kész szoftver." },
  { title: "Napló és hibariasztás", body: "Kiderül, ha valami nem futott le, és a kimaradt tétel pótolható." },
  { title: "Dokumentált átadás", body: "Hogy ne csak mi értsük, és ne legyél kiszolgáltatva senkinek, nekünk sem." },
];

export const SOFTWARE_LOG = [
  { t: "08:12", msg: "Új rendelés érkezett a webshopba" },
  { t: "08:12", msg: "Számla kiállítva a számlázóban" },
  { t: "08:13", msg: "Visszaigazoló e-mail elküldve a vevőnek" },
  { t: "08:13", msg: "Rendelés rögzítve a raktártáblázatban" },
  { t: "09:40", msg: "A számlázó nem válaszolt — újrapróbálás 5 perc múlva, riasztás elküldve" },
  { t: "09:45", msg: "Újrapróbálás sikeres, a tétel pótolva" },
];

export const ACCESS_SAMPLE_ROWS = [
  { finding: "Kontraszt 3,1:1 a gombokon", meaning: "Gyengénlátónak nehezen olvasható", severity: "Magas" },
  { finding: "47 kép leírás nélkül", meaning: "Képernyőolvasó nem tudja felolvasni", severity: "Magas" },
  { finding: "Fókusz nem látszik", meaning: "Billentyűzettel nem követhető, hol jár", severity: "Magas" },
  { finding: "Űrlapmezők címke nélkül", meaning: "Nem derül ki, mit kell beírni", severity: "Közepes" },
  { finding: "Kattintható felület 28 px", meaning: "Remegő kézzel, telefonon nehéz eltalálni", severity: "Közepes" },
];

export const AD_SAMPLE_ROWS = [
  { label: "Kattintás → megkeresés", value: "követve" },
  { label: "Legjobb csatorna a héten", value: "megnevezve" },
  { label: "Amit nem folytatunk", value: "indokolva" },
];

export const ACCESS_FAQ: FaqItem[] = [
  {
    question: "Az akadálymentesítési felmérés garantálja a jogi megfelelést?",
    answer:
      "Nem. A megfelelés jogi minősítés, arról ügyvéd nyilatkozik. Mi a technikai akadályokat mérjük fel, dokumentáljuk és szüntetjük meg — a jogi tanácsadást a saját jogászoddal intézed.",
  },
];

export const PULZUS_FAQ: FaqItem[] = [
  {
    question: "A Pulzus mit csinál, ha talál valami rosszat?",
    answer:
      "Nem javít automatikusan. A havi levélben megmondja, mi változott és mit érdemes tenni — a javítás külön megrendelés, vagy a Pulzus havi órakeretének terhére megy, ha azt választod.",
  },
  {
    question: "A Pulzus jogi modulja garantálja a jogi megfelelést?",
    answer:
      "Nem. A megfelelésről jogász nyilatkozik, nem mi. Amit a modul ad: havonta dokumentáljuk, milyen sütiket és külső kódokat tölt ténylegesen az oldal, és ha ez eltér a jogi dokumentumoktól, webjogász partnerünk értékeli és szükség esetén frissíti őket. A jogi munka díját és terjedelmét a jogász határozza meg.",
  },
];

export const SOFTWARE_FAQ: FaqItem[] = [
  {
    question: "Le kell cserélnünk a meglévő rendszereinket az automatizációhoz?",
    answer:
      "Általában nem. Azt kötjük össze, ami már megvan: a webshopot, a számlázót, a táblázatokat. Új szoftvert akkor javaslunk, ha a meglévő nem tudja, amire szükség van — és ezt a felmérésben írásban meg is indokoljuk.",
  },
  {
    question: "Mi történik, ha egy automatizáció leáll?",
    answer:
      "Nem csendben áll le. Minden futás naplózódik, hiba esetén riasztás megy a felelősnek — nekünk, ha az üzemeltetést is ránk bízod, vagy a kijelölt munkatársatoknak. A kimaradt tételek a napló alapján pótolhatók.",
  },
];

// Az alábbi kérdések csak az aloldalakon jelennek meg. A válaszok az
// /arzenal meglévő állításait fogalmazzák kérdés-válasz formába, új
// vállalást nem tartalmaznak.
export const ADS_FAQ: FaqItem[] = [
  {
    question: "Mit kapok a heti jelentésben?",
    answer:
      "Azt, hogy a kattintásokból hány megkeresés lett, melyik csatorna hozott a héten a legtöbbet, és mit nem folytatunk, indoklással. Érthető nyelven, nem az elérésről és a megjelenésekről.",
  },
  {
    question: "Mi történik, ha egy csatorna nem hoz megkeresést?",
    answer: "Megmondjuk, és nem költjük tovább rá a keretet.",
  },
];

export const AI_FAQ: FaqItem[] = [
  {
    question: "Ad árat vagy ajánlatot a chat?",
    answer:
      "Nem. A chat tájékoztat, nem ajánl. Árat és határidőt ember mond, a komolyabb kérdéseknél a chat emberhez irányít.",
  },
  {
    question: "Hova kerülnek a chatbe írt adatok?",
    answer:
      "Ezen az oldalon az AI-használati tájékoztató írja le. Ha neked építünk chatet, mellé elkészül az AI-tájékoztató, és dokumentáljuk, milyen adat hova kerül.",
  },
];

export const VIDEO_FAQ: FaqItem[] = [
  {
    question: "Ki gyártja a videót?",
    answer:
      "Videós partnerünk, a mi irányításunk alatt. Ugyanabban az arculatban készül, mint a weboldal, és a kapcsolattartó ilyenkor is mi vagyunk.",
  },
];

export const OPS_FAQ: FaqItem[] = [
  {
    question: "Kivel tartom a kapcsolatot?",
    answer:
      "Egy felelős emberrel, aki ismeri a projekted. Nem ügyfélszolgálati sorszámot kapsz.",
  },
];

// ===== Értékesítési szögek szolgáltatásonként =====

export const WEB_PITCH: ServicePitch = {
  kicker: "Nem névjegy. Értékesítési felület.",
  headline: "Weboldal és webshop, ami elad, nem csak létezik",
  facts: [
    { value: "Next.js", label: "ugyanaz az alap, amire a Nike és a Sonos webáruháza épül" },
    { value: "Fix ár", label: "és határidő a felmérés végén, nem sáv" },
    { value: "4–8 hét", label: "egy weboldal jellemző átfutása" },
  ],
  angleTitle: "Sablon helyett értékesítési felület",
  angle: [
    {
      usual: "Sablon, amibe beleöntik a szöveget",
      ours: "Oldal a kínálatodra és a vevőid kérdéseire: mit keres, mit hasonlít össze, hol akad el",
    },
    {
      usual: "„Gyors lesz” — ígéretként",
      ours: "Mérhetően gyors. Ez az oldal is élőben megméri magát a főoldalon",
    },
    {
      usual: "Űrlap, ami egy postafiókban landol",
      ours: "Megkeresés-útvonal, ami ha kéred, egyenesen a CRM-edbe fut",
    },
    {
      usual: "Platformváltás, elveszett Google-helyezésekkel",
      ours: "A régi URL-ek átirányítva, a régi oldal él, amíg az új bizonyítottan nem működik",
    },
    {
      usual: "Átadás, aztán csend",
      ours: "Üzemeltetés egy felelős emberrel, aki ismeri az oldalt",
    },
  ],
  cta: {
    question: "Hol veszíti el most a vevőt az oldalad?",
    body: "Nem kell kész terv, és azt sem kell tudnod, milyen oldal kell. Írd le, mit árulsz és kinek, küldd el a mostani oldal címét, a többit mi kérdezzük meg. Két munkanapon belül válaszolunk.",
  },
};

export const ADS_PITCH: ServicePitch = {
  kicker: "Nem elérés. Megkeresés.",
  headline: "Hirdetés, aminek a végén van egy szám",
  facts: [
    { value: "Hetente", label: "jelentés arról, mi hozott megkeresést" },
    { value: "Végig", label: "követve a kattintástól a megkeresésig" },
    { value: "Stop", label: "a csatornára, ami nem hoz megkeresést" },
  ],
  angleTitle: "Nem a megjelenést számoljuk, hanem a megkeresést",
  angle: [
    {
      usual: "Jelentés elérésről és megjelenésről",
      ours: "Jelentés arról, hány megkeresés lett a kattintásokból",
    },
    {
      usual: "Minden kampány a főoldalra terel",
      ours: "Kampányonként saját landing oldal, egy üzenettel, egy cselekvéssel",
    },
    {
      usual: "A gyenge csatorna is fut, mert az is költés",
      ours: "Ami nem hoz megkeresést, azt megmondjuk, és nem költjük tovább",
    },
    {
      usual: "A mérés a hirdetési felületig tart",
      ours: "A mérés a megkeresésig tart: látszik, melyik kattintásból lett érdeklődő",
    },
  ],
  cta: {
    question: "Tudod, hány megkeresést hozott a múlt havi hirdetési kereted?",
    body: "Ha nem, nem veled van a baj, hanem a méréssel. Írd le, hol hirdetsz most és mennyiért, és megmondjuk, mit kellene mérni ahhoz, hogy legyen egy szám a végén. Két munkanapon belül válaszolunk.",
  },
};

export const SOFTWARE_PITCH: ServicePitch = {
  kicker: "A munka, ami magától megy",
  headline: "Ami ma kézzel megy, holnap magától",
  facts: [
    { value: "Írásban", label: "melyik folyamatot érdemes automatizálni, és melyiket nem" },
    { value: "Napló", label: "minden futásról, visszakereshetően" },
    { value: "Riasztás", label: "ha valami nem futott le, nem csendes leállás" },
  ],
  angleTitle: "Nem új rendszert adunk el. Összekötjük, ami már megvan",
  angle: [
    {
      usual: "Valaki naponta átmásolja a rendeléseket a számlázóba",
      ours: "Rendelés, számla, visszaigazolás és raktártábla egy lépésben, kézi másolás nélkül",
    },
    {
      usual: "Az automatizáció csendben leáll, hetekig senki nem veszi észre",
      ours: "Minden futás naplózódik, hibánál riasztás megy, a kimaradt tétel pótolható",
    },
    {
      usual: "„Cseréljétek le az egészet egy új rendszerre”",
      ours: "Azt kötjük össze, ami megvan. Újat csak írásban indokolva javaslunk",
    },
    {
      usual: "Csak a fejlesztő érti, hogyan működik",
      ours: "Dokumentált átadás, hogy senkinek ne legyél kiszolgáltatva, nekünk sem",
    },
  ],
  cta: {
    question: "Mit másol ma kézzel valaki a csapatodban?",
    body: "Elég egy mondat: honnan hová, és milyen gyakran. Nem kell tudnod, melyik eszköz vagy kód kell hozzá, azt mi mondjuk meg, és azt is, ha nem éri meg automatizálni. Két munkanapon belül válaszolunk.",
  },
};

export const AI_PITCH: ServicePitch = {
  kicker: "Éjjel is válaszol. Árat nem mond.",
  headline: "Asszisztens, ami tudja, mikor kell ember",
  facts: [
    { value: "0–24", label: "válasz az egyszerű kérdésekre" },
    { value: "Ember", label: "veszi át a komoly kérdést, árat és határidőt" },
    { value: "Dokumentálva", label: "milyen adat hova kerül" },
  ],
  angleTitle: "Nem csodafegyver. Egy jól betanított első vonal",
  angle: [
    {
      usual: "Általános chatbot, ami bármire magabiztosan rávágja a választ",
      ours: "A te tartalmadra hangolt asszisztens, ami abból válaszol, amit kínálsz",
    },
    {
      usual: "A chat árat ígér, amit aztán nem tudsz tartani",
      ours: "A chat tájékoztat, nem ajánl. Árat és határidőt ember mond",
    },
    {
      usual: "A komoly érdeklődő a chatablakban ragad",
      ours: "A komoly kérdés emberhez kerül, nem vész el egy ablakban",
    },
    {
      usual: "Adatkezelés? Majd kiderül",
      ours: "AI-tájékoztató és dokumentált adattovábbítás az első naptól",
    },
  ],
  cta: {
    question: "Melyik kérdésre válaszolsz el naponta ugyanúgy, újra és újra?",
    body: "Abból indulunk ki, nem a technológiából. Írd le a három leggyakoribb kérdést, amit a vevőid feltesznek, és megmondjuk, melyikre válaszolhat jól egy asszisztens, és melyiknél kell ember. Két munkanapon belül válaszolunk.",
  },
};

export const VIDEO_PITCH: ServicePitch = {
  kicker: "Egy arculat, mozgóképben is",
  headline: "Videó, ami ugyanazt mondja, mint az oldalad",
  facts: [
    { value: "Egy", label: "kapcsolattartó, akkor is, ha a partnerünk forgat" },
    { value: "Egy arculat", label: "weboldal és videó együtt tervezve" },
    { value: "Felirattal", label: "hogy hang nélkül, telefonon is érthető legyen" },
  ],
  angleTitle: "Nem külön film. Az értékesítés része",
  angle: [
    {
      usual: "A videó egy másik csapattól jön, más hangon, más színekkel",
      ours: "Ugyanabban az arculatban készül, mint a weboldal",
    },
    {
      usual: "Szép film, ami egy videómegosztón porosodik",
      ours: "Formátum oda, ahol a vevő dönt: termékoldal, nyitókép, közösségi rövid változat",
    },
    {
      usual: "Két szállító, két határidő, két egyeztetés",
      ours: "Egy kapcsolattartó: mi irányítjuk a videós partnert",
    },
  ],
  cta: {
    question: "Mit kellene látnia a vevőnek, mielőtt felhív?",
    body: "A terméket működés közben? A csapatot? A műhelyt? Írd le, mit kérdeznek tőled a legtöbbször telefonon, és megmondjuk, melyik formátum válaszol rá a legjobban. Két munkanapon belül válaszolunk.",
  },
};

export const OPS_PITCH: ServicePitch = {
  kicker: "Az élesítés a rajtvonal",
  headline: "Az átadás nem a vége, hanem a rajt",
  facts: [
    { value: "Előbb", label: "tudunk a hibáról, mint az ügyfeled" },
    { value: "Havi keret", label: "fejlesztési óraszámban" },
    { value: "Egy ember", label: "aki ismeri a projekted" },
  ],
  angleTitle: "Ahol a legtöbb ügynökség elköszön, mi ott maradunk",
  angle: [
    {
      usual: "Hibajegy, sorszám, várakozás",
      ours: "Egy felelős ember, aki ismeri a projekted",
    },
    {
      usual: "Egy ügyfeled szól, hogy nem megy az űrlap",
      ours: "Monitoring és riasztás: a hibáról mi tudunk előbb",
    },
    {
      usual: "Minden apró javításhoz új ajánlat",
      ours: "Havi óraszám a folyamatos fejlesztésre",
    },
    {
      usual: "Az oldal az élesítés napján befagy",
      ours: "Az oldal tovább fejlődik, és írásban látod, mi készült el",
    },
  ],
  cta: {
    question: "Ki szól neked, ha holnap reggel leáll az oldalad?",
    body: "Ha a válasz az, hogy egy ügyfeled, akkor érdemes beszélnünk. Küldd el az oldal címét és azt, ki üzemelteti most, és megmondjuk, mit vinnénk tovább és hogyan. Két munkanapon belül válaszolunk.",
  },
};

export const ACCESS_PITCH: ServicePitch = {
  kicker: "Vevő, akit eddig kizártál",
  headline: "Van, aki nem tudja használni az oldaladat",
  facts: [
    { value: "WCAG", label: "szerinti technikai felmérés" },
    { value: "A kódban", label: "javítjuk, nem egy ráhúzott widgettel" },
    { value: "Írásban", label: "mit találtunk, és mi változott" },
  ],
  angleTitle: "Nem kötelező teher. Több vevő",
  angle: [
    {
      usual: "Egy „akadálymentesítő” gomb a sarokban",
      ours: "Javítás a forráskódban: kontraszt, fókusz, címkék, szerkezet",
    },
    {
      usual: "„Megfelel a törvénynek” pecsét",
      ours: "Technikai felmérés és javítás. A megfelelésről jogász nyilatkozik, nem mi",
    },
    {
      usual: "Szóbeli „rendben van”",
      ours: "Írásos jelentés arról, mi változott",
    },
    {
      usual: "Akadálymentesség mint jogi kötelezettség",
      ours: "Akadálymentesség mint vevő, aki eddig nem tudott nálad vásárolni",
    },
  ],
  cta: {
    question: "Végig tudnál menni a vásárláson egér nélkül?",
    body: "Próbáld ki most: csak a Tab és az Enter billentyűvel. Ha elakadsz, a vevőid egy része is elakad. Küldd el az oldal címét, és megmondjuk, hol és mennyire súlyosan. Két munkanapon belül válaszolunk.",
  },
};

export const PULZUS_PITCH: ServicePitch = {
  kicker: "Havonta egy levél, nem egy dashboard",
  headline: "Havonta egy levél arról, hogyan lát téged az internet",
  facts: [
    { value: "Havonta", label: "egy levél magyarul, konkrét javaslattal" },
    { value: "Előbb", label: "szólunk, mint ahogy egy ügyfeled észreveszi" },
    { value: "Jogász", label: "partner értékeli a jogi modul eltéréseit" },
  ],
  angleTitle: "Nem pontszámot küldünk. Teendőt",
  angle: [
    {
      usual: "Pontszámos riport, amit senki nem olvas el",
      ours: "Levél arról, mi változott, és mit érdemes tenni",
    },
    {
      usual: "Egy ügyfeled szól, hogy lejárt a tanúsítvány",
      ours: "Időben szólunk, mielőtt a böngésző figyelmeztetne",
    },
    {
      usual: "Automatikus válasz a nevedben az értékelésekre",
      ours: "Válaszjavaslat, a küldés a tiéd",
    },
    {
      usual: "A süti-tájékoztató az indulás napján befagy",
      ours: "Havonta megnézzük, mit tölt az oldal; eltérésnél webjogász értékel",
    },
  ],
  cta: {
    question: "Mikor nézte meg utoljára valaki, működik-e a kapcsolati űrlapod?",
    body: "Ha nem tudod, az a válasz. Küldd el az oldal címét, és megmondjuk, mit figyelne rajta a Pulzus, és mire szólna előbb, mint egy ügyfeled. Két munkanapon belül válaszolunk.",
  },
};

export const IT_PITCH: ServicePitch = {
  kicker: "Az informatika, ami nem a te gondod",
  headline: "Az irodai informatika, amire nem kell gondolnod",
  facts: [
    { value: "15 év", label: "partnerünk tapasztalata irodai rendszerek üzemeltetésében" },
    { value: "Írásban", label: "mit találtunk, és mit javaslunk" },
    { value: "Távolról", label: "rákapcsolódunk, nem kell kiszállásra várni" },
  ],
  angleTitle: "Nem „majd a kolléga megnézi”. Felelős rendszergazda",
  angle: [
    {
      usual: "„A kolléga ért hozzá” — mellékesen, a saját munkája mellett",
      ours: "Kijelölt rendszergazda-partner, felméréssel kezdve",
    },
    {
      usual: "Van mentés. Valószínűleg",
      ours: "A felmérés írásban megmondja, mi van, és mi hiányzik",
    },
    {
      usual: "Kilépett munkatárs, még aktív fiókkal",
      ours: "Fiókok és hozzáférések rendben tartva",
    },
    {
      usual: "Napokat várni egy elakadt levelezés miatt",
      ours: "Távfelügyelet: rákapcsolódunk, nem kell kiszállásra várni",
    },
  ],
  cta: {
    question: "Ha holnap kilép valaki, tudod, mihez fért hozzá?",
    body: "Ha nem vagy biztos benne, nem vagy egyedül, és pont ezzel kezdünk. Írd le, hányan dolgoztok, milyen gépeken és hol, és megmondjuk, mit nézne meg először a felmérés. Két munkanapon belül válaszolunk.",
  },
};

// ===== 10 · Átvilágítás, dizájn- és rendszerajánlás =====
// Amit érdeklődőknek készítünk: kívülről végzett átvilágítás, utána dizájn-
// és rendszerajánlás működő látványtervvel. Ügyfélnevet nem írunk ki; mintát
// csak anonimizálva mutatunk (ld. PROPOSAL_PAGES).

export const AUDIT_SERVICE = {
  name: "Átvilágítás, dizájn- és rendszerajánlás",
  description:
    "Weboldal- és webáruház-átvilágítás kívülről, hozzáférés nélkül, írásos riporttal és sorrendbe tett teendőlistával; utána dizájn- és rendszerajánlás: arculat, oldaltervek, az értékesítési ökoszisztéma terve és kattintható látványterv a saját kínálat adataival.",
  path: "/arzenal/atvilagitas-es-ajanlas",
};

export const AUDIT_FEATURES: Feature[] = [
  {
    title: "Átvilágítás kívülről",
    body: "Hozzáférést nem kérünk. Azt nézzük, amit a vevőd és a Google is lát: sebesség, mobil, keresők és AI, használhatóság, adatkezelés, biztonsági beállítások.",
  },
  {
    title: "Erre lehet építeni",
    body: "Nem csak a hibákat írjuk le. Megmondjuk, mi működik most is jól, mert azt nem kell kidobni.",
  },
  {
    title: "Mit javítsunk először",
    body: "Sorrendbe tett teendőlista: mi a sürgős, mi az, ami pénzt hoz, és mi várhat.",
  },
  {
    title: "Dizájnajánlás",
    body: "Betűk, színpaletta kontrasztméréssel, koncepció, főoldal- és belső oldaltervek, mobil nézet. Előtte és utána, egymás mellett.",
  },
  {
    title: "Rendszerajánlás",
    body: "Az értékesítési ökoszisztéma terve: honnan jön az érdeklődő, hová fut be a megkeresés, ki foglalkozik vele, és mit mérünk.",
  },
  {
    title: "Kattintható látványterv",
    body: "Nem csak kép: végig lehet kattintani, a saját kínálatod adataival. Döntés előtt látod, mit kapnál.",
  },
  {
    title: "Hogyan tovább",
    body: "Szakaszokra bontva, mi az első lépés, és mi az, ami a mostani rendszereden is megoldható.",
  },
];

export const AUDIT_PITCH: ServicePitch = {
  kicker: "Előbb megnézzük. Utána ajánlunk.",
  headline: "Átvilágítás és ajánlás, amit döntés előtt kézbe veszel",
  facts: [
    { value: "Kívülről", label: "hozzáférést nem kérünk" },
    { value: "Írásban", label: "riport és sorrendbe tett teendőlista" },
    { value: "Kattintható", label: "látványterv a saját kínálatod adataival" },
  ],
  angleTitle: "Nem árajánlat egy képpel. Terv, amit végig lehet kattintani",
  angle: [
    {
      usual: "Automatikusan generált pontszámlista, amit senki nem olvas végig",
      ours: "Ember által írt riport az üzletedről, sorrendbe tett teendőkkel",
    },
    {
      usual: "Ajánlat egy árral és egy sablon-képernyőképpel",
      ours: "Dizájn- és rendszerajánlás: arculat, oldaltervek, és hogy hová fut be a megkeresés",
    },
    {
      usual: "„Majd meglátod, ha kész lesz”",
      ours: "Kattintható látványterv a saját kínálatod adataival, még a döntés előtt",
    },
    {
      usual: "Mindig új weboldalt ajánlanak, mert azt árulnak",
      ours: "Azt is leírjuk, mit nem érdemes cserélni, és mi marad a mostani motoron",
    },
  ],
  cta: {
    question: "Mit látna egy idegen az oldaladon az első tíz másodpercben?",
    body: "Ezt nézzük meg elsőként. Küldd el az oldal címét és egy mondatban, mit árulsz és kinek: hozzáférés nem kell, és nem kell tudnod, mit kérj. Két munkanapon belül válaszolunk.",
    button: "Kérj átvilágítást",
  },
};

export const AUDIT_FAQ: FaqItem[] = [
  {
    question: "Kell hozzáférést adnom az oldalhoz vagy a webshophoz?",
    answer:
      "Az átvilágításhoz nem. Kívülről vizsgáljuk, azt, amit a vevőid, a Google és az AI-keresők is látnak.",
  },
  {
    question: "Mit kapok kézbe?",
    answer:
      "Az átvilágításról írásos riportot PDF-ben, sorrendbe tett teendőlistával. Ha dizájn- és rendszerajánlást is kérsz, azt is PDF-ben, mellé egy kattintható látványtervet a saját kínálatod adataival.",
  },
  {
    question: "Nyilvános lesz az anyag?",
    answer:
      "Nem. Az ügyfeleink anyagai nem nyilvánosak. Mintát csak anonimizálva mutatunk, a márkát, a termékneveket és az árakat kitakarva.",
  },
];
