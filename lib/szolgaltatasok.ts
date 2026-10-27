// A szolgáltatás-aloldalak (/arzenal/weboldal-fejlesztes,
// /arzenal/it-uzemeltetes) és az /arzenal áttekintő oldal közös adatai —
// egy helyen, hogy a két oldal ne csúszhasson szét.

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
    "Irodai IT-üzemeltetés kis és nagyobb csapatoknak: rendszerfelmérés, rendszergazdai feladatok, távfelügyelet, szerver, hálózat, VPN, levelezés, Microsoft 365 és Teams, nyomtatók és mobilflotta kezelése, 15 év tapasztalattal.",
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
