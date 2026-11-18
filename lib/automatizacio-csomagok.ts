// Az automatizáció aloldal három havidíjas csomagja (2026-11-18 döntés).
// Csak olyat írj ide, amit ténylegesen vállalunk. Árat az oldal nem mutat:
// minden ügyfél egyedi ajánlatot kap, az irányadó árak a belső árlapban vannak.

export type AutomatizacioCsomag = {
  id: "piacfigyelo" | "osszekoto" | "dokumentum";
  n: string;
  name: string;
  question: string;
  body: string;
  items: string[];
  forWhom: string;
  start: string;
};

export const AUTOMATIZACIO_CSOMAGOK: AutomatizacioCsomag[] = [
  {
    id: "piacfigyelo",
    n: "A",
    name: "Piacfigyelő",
    question: "Ki nézi ma kézzel a konkurencia árait?",
    body: "Hétfő reggel egy lapon megkapod, mi változott a piacodon. Nem kell oldalakat böngészni, és nem a vevőtől tudod meg, hogy a versenytárs olcsóbb lett.",
    items: [
      "Versenytárs-árak és új termékek a figyelt oldalakon",
      "Új közbeszerzések és pályázatok a kulcsszavaidra",
      "Változás a fontos vevőid és partnereid cégadataiban",
      "Az adatok táblázatban is letölthetők",
    ],
    forWhom: "Webshopnak, kereskedőnek, forgalmazónak.",
    start: "Csak nyilvános adatból dolgozunk, a weboldalak szabályai szerint. Bejelentkezés mögé nem megyünk.",
  },
  {
    id: "osszekoto",
    n: "B",
    name: "Összekötő",
    question: "Ki másolja ma kézzel a rendelést a számlázóba?",
    body: "A webshopod, a számlázód és a raktárad beszél egymással. Ha valami nem fut le, te kapsz jelzést, nem a vevő veszi észre.",
    items: [
      "Rendelésből díjbekérő vagy számla, kézi másolás nélkül",
      "Készlet és ár egyeztetése a webshop és a raktár között",
      "Napi export a könyvelőnek vagy az ügyviteli rendszernek",
      "Napló minden futásról, hibánál riasztás",
    ],
    forWhom: "Webshopnak és cégnek, ahol valaki naponta adatot másol.",
    start: "Egy folyamattal indul. Ha bevált, jöhet a következő.",
  },
  {
    id: "dokumentum",
    n: "C",
    name: "Dokumentum-feldolgozó",
    question: "Ki gépeli be ma a beérkező ajánlatkérést?",
    body: "A beérkező ajánlatkérésből, rendelésből vagy szállítói számlából a rendszer kiolvassa az adatokat, és előkészített tételként teszi eléd. Te ellenőrzöd és hagyod jóvá, magától semmi nem megy ki.",
    items: [
      "PDF-ek és levelek adatai előkészítve, egy helyen",
      "A bizonytalan mezők megjelölve, hogy tudd, mit nézz meg",
      "Kimenet az értékesítési rendszerbe vagy táblázatba",
      "Kérésre kereső a cég saját dokumentumaihoz",
    ],
    forWhom: "Cégnek, ahol hetente sok egyedi ajánlatkérés és papír jön be.",
    start: "30 napos próbával indul a saját dokumentumaidon. A végén megmutatjuk, mit mértünk rajtuk.",
  },
];
