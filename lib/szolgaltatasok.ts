// A szolgáltatás-aloldalak (/arzenal/...) és az /arzenal áttekintő oldal
// közös adatai — egy helyen, hogy az áttekintő és a részletes oldal ne
// csúszhasson szét.

export type FaqItem = { question: string; answer: string };

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

export const WEB_FEATURES = [
  "Egyedi dizájn és design rendszer",
  "Technikai SEO: sitemap, strukturált adat, canonical",
  "Telefonra telepíthető változat (PWA)",
  "Meglévő rendszer fölé építés — WooCommerce, Shopify",
  "Biztonsági fejlécek, rate limiting, input validáció",
];

export const IT_FEATURES = [
  "Meglévő IT-rendszer felmérése, írásos összefoglalóval",
  "Rendszergazdai feladatok irodában, home office-ban és mobil eszközökön",
  "Távfelügyelet és távoli segítség: rákapcsolódunk, nem kell kiszállásra várni",
  "Szerverkörnyezet kialakítása és üzemeltetése",
  "Hálózat kiépítése: kábeles és wifi",
  "Biztonságos távoli elérés, VPN",
  "Nyomtatók kezelése és karbantartása",
  "Levelezőrendszer kialakítása és üzemeltetése",
  "Microsoft 365 és Teams: távmunka és távoktatás bevezetése, üzemeltetése",
  "Céges mobilflotta: díjcsomagok és költségek átnézése",
  "Meglévő szoftverek és eszközök üzemeltetése",
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

export const ADS_FEATURES = [
  "Google és Meta kampányok, B2B fókusszal",
  "Konverziómérés és attribúció — a megkeresésig követve",
  "Heti jelentés, érthető nyelven",
  "Landing page a kampányhoz, nem a főoldalra terelés",
];

export const AI_FEATURES = [
  "Chat a weboldalon, saját tartalomra hangolva",
  "Átirányítás emberhez, ha a kérdés komoly",
  "Jogi megfelelés: AI-tájékoztató, adattovábbítás dokumentálva",
  "Belső automatizációk: dokumentumfeldolgozás, összefoglalás",
];

export const VIDEO_FEATURES = [
  "Cégbemutató és imázsvideó",
  "Termékvideó webshophoz",
  "Rövid formátumok közösségi médiára",
  "Vágás, színkezelés, feliratozás",
];

export const OPS_FEATURES = [
  "Monitoring és hibariasztás — előbb tudunk róla, mint te",
  "Folyamatos fejlesztés havi óraszámban",
  "Automatizált tartalommotor: a blog magától frissül",
  "Jogi megfelelés karbantartása a változásokkal együtt",
  "Heti vagy kétheti előrehaladási riport",
  "Egy felelős kapcsolattartó",
];

export const ACCESS_FEATURES = [
  "Felmérés: mi akadályozza a használatot, és mennyire súlyos",
  "Kontraszt, betűméret, kattintható felületek mérete",
  "Billentyűzetes bejárhatóság, látható fókusz",
  "Képernyőolvasóval való használhatóság: szemantikus szerkezet, képleírások",
  "Űrlapok: érthető címkék, világos hibaüzenetek",
  "Videók feliratozása",
  "Írásos jelentés arról, mi változott",
];

export const PULZUS_FEATURES = [
  "Elérhetőség figyelése — leállásnál értesítés",
  "Betöltési sebesség: a változást jelezzük, nem a pontszámot",
  "SSL-tanúsítvány lejárata — időben szólunk",
  "Kapcsolati űrlap havi tesztelése",
  "Indexeltség: látszik-e az oldal a keresőben",
  "Google-profil: új értékelések, változó átlag",
  "Értékelés-kérés a vásárlás után",
  "Válaszjavaslat az értékelésekre — a küldés a tiéd",
  "Jogi modul: sütik és külső kódok havi feltérképezése, változásjelzéssel",
  "Fut-e mérő- vagy hirdetési kód a süti-hozzájárulás előtt",
  "Jogi dokumentumok felülvizsgálata webjogász partnerrel",
  "Havi levél magyarul, konkrét javaslatokkal",
];

export const SOFTWARE_FEATURES = [
  "Folyamatfelmérés: mi megy ma kézzel, és mit érdemes automatizálni",
  "Rendszerek összekötése: webshop, számlázó, CRM, e-mail, táblázat",
  "Automatizáció kész eszközzel vagy saját kóddal, amelyik hosszabb távon olcsóbban fenntartható",
  "Egyedi belső rendszer, ügyfélportál, adminfelület",
  "Naplózás és hibariasztás: kiderül, ha valami nem futott le",
  "Átadás dokumentációval, hogy ne csak mi értsük",
  "Üzemeltetés és továbbfejlesztés, ha kéred",
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
