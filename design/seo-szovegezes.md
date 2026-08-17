# THE GBR — /seo oldal szövegezése

**Verzió:** 1.0 · 2026. 08. 17.
**Elv:** ez az oldal a legkényesebb — itt szakértelmet adsz el. Egyetlen elavult adat aláz be mindent.

---

# ELŐSZÖR: EGY SZAKMAI HIBA

## „Tökéletes **LCP és FID** pontszámok a Google algoritmusának."

**A FID (First Input Delay) 2024 márciusában megszűnt.** A Google kivezette, és az **INP (Interaction to Next Paint)** váltotta fel a Core Web Vitals metrikák között.

Ez nem stílushiba. Ez **elavult szakmai tudás egy olyan oldalon, ahol szakértelmet adsz el.** Aki ért hozzá — márpedig pont ő a célközönség —, az egy másodperc alatt kiszúrja, és onnantól minden más állítást is kétségbe von.

**Javítás:** `LCP, INP és CLS` — a három aktuális Core Web Vitals metrika.

---

# A TÖBBI PROBLÉMÁS ÁLLÍTÁS

## 1. `99/100 Core Web Vitals` — honnan?

Nagy körben, hero pozícióban, konkrét szám. **Melyik oldalé? Mikor mérve? Mobilon vagy asztalon?**

Ha ez a saját oldalad Lighthouse-pontszáma, akkor **írd oda, hogy az** — és tedd ellenőrizhetővé. Így nem állítás lesz, hanem bizonyíték.

**Ha nincs mögötte mérés, törlendő.**

## 2. „hogy a ChatGPT és a Gemini **megértse, validálja és referenciaként használja** a válaszaiban"

Ezt **senki nem tudja garantálni.** Az, hogy egy nyelvi modell mit idéz, nem befolyásolható közvetlenül — csak az esélyt lehet javítani strukturált adattal és tiszta tartalommal.

**Az őszinte megfogalmazás erősebb is:** „javítjuk az esélyét, hogy…" — mert azt mutatja, hogy érted a különbséget a befolyásolható és a garantálható között. Ez szakértelem, nem bizonytalanság.

## 3. „Entitás Térképezés — a márka összekötése megbízható globális tudásbázisokkal"

Ez a Wikidata/Wikipedia-jelenlétre utal. **Csinálod ezt?** Ha igen, mondd ki konkrétan. Ha nem, ez üres szakzsargon.

## 4. Az angol cím

`Search & Answer Engine Optimization` — magyar nyelvű oldalon, magyar közönségnek. **SEO-szempontból is rossz:** magyar keresők magyarul keresnek. A címnek tartalmaznia kell a magyar kifejezést is.

---

# FEJLÉC

### Metadata

- **title:** `Keresőoptimalizálás és AI-láthatóság (SEO és AEO) | THE GBR`
- **description:** `Technikai SEO és strukturált adat, amitől a Google és az AI-keresők is megtalálják a céged. Ezt az oldalt is így építettük — ellenőrizheted.`

### Felső jelzősáv
> `KERESŐOPTIMALIZÁLÁS ÉS AI-LÁTHATÓSÁG`

*(A `sys.protocol: indexation_v2` terminál-jelmez.)*

### Címsor
> **Attól, hogy jó a szöveged,**
> **még nem talál meg senki.**

### Alcím
> A keresés két irányba ment el. A Google továbbra is a technikai alapokat méri: mennyi idő alatt töltődik be az oldal, tiszta-e a szerkezet, érti-e a robot, miről szól. Az AI-keresők pedig strukturált adatot olvasnak, nem marketingszöveget.
>
> Mi mindkettőt megépítjük — és nem csak beszélünk róla.

### CTA
> **Nézd meg az eredményt** *(a bizonyíték-szekcióra ugrik)*

---

# ÚJ SZEKCIÓ: A BIZONYÍTÉK — EZ A LEGFONTOSABB VÁLTOZÁS

**Ez az oldal eddig ígért. Mostantól bizonyíthat.** A mai munkával a thegbr.eu ténylegesen megvalósítja mindazt, amit ez az oldal hirdet — és ez ellenőrizhető.

Ez az a szekció, ami az egész oldalt hitelesíti, és amit **egyetlen versenytárs sem tud csak úgy lemásolni**, mert nekik is meg kellene csinálniuk.

### Fejléc
> `BIZONYÍTÉK`
> **Ezt az oldalt is így építettük**

### Bevezető
> A legtöbb SEO-ügynökség oldalán nincs sitemap. Nézd meg — komolyan, nyisd meg. A miénken van, és ellenőrizheted te is.

### Négy ellenőrizhető tétel

| Amit hirdetünk | Ahol megnézheted |
|---|---|
| Dinamikus sitemap | `thegbr.eu/sitemap.xml` |
| Robots.txt sitemap-hivatkozással | `thegbr.eu/robots.txt` |
| Strukturált adat (JSON-LD) | Google Rich Results Test — 4 érvényes elem |
| Mért teljesítmény | PageSpeed Insights — [pontszám] |

**Alá, apró szöveggel:**
> Ez nem screenshot, hanem kattintható link. Ha bármelyik nem működne, szólj — és javítjuk.

**Ez a mondat a legerősebb az egész oldalon.** Egy SEO-ügynökség, ami arra hív, hogy ellenőrizd le — ritka, és pont ez a hitelesség.

---

# A PARADIGMA-SZEKCIÓ ÁTÍRÁSA

### Fejléc
> `MI VÁLTOZOTT`
> **Két külön keresés lett belőle**

### Szöveg

> **A Google technikai része szigorodott.** A betöltési sebesség, a szerkezet stabilitása és a válaszidő ma rangsorolási tényező — nem kényelmi kérdés. Egy lassú oldal nem azért veszít, mert csúnya, hanem mert a Google hátrébb sorolja.
>
> **És megjelent egy második út.** Egyre többen kérdezik meg egyszerűen az AI-t, hogy „ki csinál Magyarországon B2B webshopot". Ezek a rendszerek nem kulcsszavakat olvasnak, hanem struktúrát: mi a cég neve, mivel foglalkozik, hol található, mit ír a saját oldalán. Ha ez nincs gépi olvasásra alkalmas formában, akkor a válaszban más szerepel.
>
> Ez a második rész új, és **még kevesen csinálják.** Ezért is éri meg most.

*(A „monolitikus rendszerek elérték a határaikat" mondat törlendő — nem jelent semmit.)*

---

# A KÉT PILLÉR

## Bal panel

### Cím
> **Technikai alap (SEO)**

### Leírás
> Amit a Google mér. A Next.js szerveroldali renderelése miatt a keresőrobot azonnal látja a tartalmat — nem kell megvárnia, míg a böngésző összerakja. Ez a különbség a másodperc törtrészében dől el, de a rangsorban is meglátszik.

### Tételek

**Szerveroldali renderelés**
> A robot azonnal olvassa a tartalmat, nem kell rá várnia.

**Automatikus sitemap és robots.txt**
> Minden új oldal magától bekerül. Nem kell rá emlékezni.

**Core Web Vitals: LCP, INP, CLS**
> A három metrika, amit a Google ténylegesen mér. *(Nem FID — azt 2024-ben kivezették.)*

**Canonical URL-ek és átirányítások**
> Platformváltásnál ez a legdrágább hiba, ha kimarad.

## Jobb panel

### Cím
> **AI-láthatóság (AEO)**

### Leírás
> Amit a nyelvi modellek olvasnak. Nem tudjuk garantálni, hogy egy AI éppen téged idéz — ezt senki nem tudja. Azt viszont meg tudjuk csinálni, hogy **legyen mit idéznie**: tiszta struktúra, egyértelmű adatok, gépi olvasásra alkalmas formában.

### Tételek

**Schema.org és JSON-LD**
> Cégadatok, cikkek, szolgáltatások, gyakori kérdések — géppel olvasható formában.

**Gyakori kérdések strukturálva**
> Megjelenhetnek közvetlenül a Google találati listájában, kattintás előtt.

**Egyértelmű cégadatok**
> Név, cím, elérhetőség, tevékenység — mindenhol ugyanaz, ellentmondás nélkül. Ez alapján azonosít egy AI.

**Kérdésre válaszoló tartalom**
> Nem kulcsszóhalmozás, hanem az, hogy tényleg megválaszolod, amit kérdeznek.

---

# A FOLYAMAT-SZEKCIÓ

### Fejléc
> `FOLYAMAT`
> **Három lépés**

**01 · Felmérés**
> Megnézzük, hol tartasz: sebesség, indexeltség, szerkezet, strukturált adat. A végén kapsz egy listát arról, mi hiányzik — akkor is, ha nem velünk dolgozol tovább.

**02 · Építés**
> A technikai alapok rendbetétele. Ha a mostani rendszer nem bírja, akkor újraépítés — de fokozatosan, hogy közben ne veszíts forgalmat.

**03 · Karbantartás**
> A keresők változnak, és a te oldalad is. Ha üzemeltetést is kérsz, ezt folyamatosan követjük.

*(Az „Entitás Skálázás" és a „Gépi tanulási modellekre optimalizált folyamatos tartalomfejlesztés" kivezetendő — szakzsargon, ami semmit nem mond.)*

---

# ÚJ: GYAKORI KÉRDÉSEK

**Ezen az oldalon különösen fontos** — egyrészt mert a látogatóknak valódi kérdéseik vannak, másrészt mert **a FAQPage strukturált adat pont az, amit az oldal hirdet.** Ha itt nincs, az önellentmondás.

**Mennyi idő alatt látszik eredmény?**
> A technikai javítások hatása hetek alatt megjelenik az indexelésben. A rangsor-változás lassabb — három-hat hónap, ha versenyzett kifejezésekről van szó. Aki gyorsabbat ígér, az vagy nem érti, vagy nem mond igazat.

**Garantáltok első helyet a Google-ben?**
> Nem, és aki ilyet ígér, azt kerüld el. A rangsort a Google határozza meg, nem a szolgáltatód. Amit garantálni tudunk: a technikai alapok rendben lesznek, mérhetők, és ellenőrizheted.

**Mi az az AEO, és tényleg kell?**
> Az AI-keresőkre való felkészítés. Ma még kevés forgalmat hoz, de gyorsan nő — és a strukturált adat, amit hozzá kell építeni, a hagyományos Google-találatokban is segít. Vagyis nem elszórt pénz akkor sem, ha az AI-keresés lassabban terjed, mint várjuk.

**Meglévő oldalt is tudtok javítani, vagy csak újat építeni?**
> Mindkettő megy. A felmérés végén megmondjuk, melyik éri meg jobban — van, amikor a meglévő rendszer javítása olcsóbb és gyorsabb.

**Honnan tudom, hogy tényleg megcsináltátok?**
> Ugyanúgy, ahogy nálunk is ellenőrizheted: sitemap, robots.txt, Rich Results Test, PageSpeed. Ezek nyilvános, ingyenes eszközök — nem kell hinned nekünk.

**FAQPage JSON-LD kötelező ehhez a szekcióhoz.**

---

# CTA

**A mostani CTA szó szerint ugyanaz, mint az `/arzenal` oldalon** („Rendszer követelmény: Ambíció" / „Indítsd el a Protokollt"). Két azonos CTA két oldalon: sablonérzetet kelt, pont ott, ahol egyediséget adsz el.

### Új változat

**Címsor:**
> **Nézzük meg, hol tartasz**

**Szöveg:**
> A felmérés végén kapsz egy listát arról, mi hiányzik a technikai alapokból — akkor is, ha nem velünk dolgozol tovább. Két munkanapon belül válaszolunk.

**Gomb:** *Kérj felmérést →*

---

# AMIT ELTÁVOLÍTOK, ÉS MIÉRT

| Kivezetve | Ok |
|---|---|
| **„LCP és FID"** | **A FID 2024 márciusában megszűnt** — INP váltotta. Elavult szakmai tudás egy szakértelmet áruló oldalon. |
| `99/100 Core Web Vitals` | Nincs megadva, mit és mikor mértek. Vagy tedd ellenőrizhetővé, vagy töröld. |
| „hogy a ChatGPT és a Gemini referenciaként használja" | Nem garantálható. Esélyt lehet javítani, eredményt nem ígérni. |
| „Entitás Térképezés — globális tudásbázisok" | Üres szakzsargon, ha nincs mögötte konkrét munka. |
| „Golyóálló technológiai alapozás" | Túlfűtött. |
| „ki uralja a piacot" | Ugyanaz. |
| „A monolitikus rendszerek elérték a határaikat" | Nem jelent semmit. |
| „Kereshetőség. Újrakódolva." | Hangzatos, de nem mond semmit. |
| `sys.protocol: indexation_v2` | Terminál-jelmez. |
| „Rendszer követelmény: Ambíció" / „Indítsd el a Protokollt" | Terminál-jelmez, ráadásul szó szerint ugyanaz, mint az `/arzenal`-on. |
| „Integrációs Protokoll" | Egyszerűen: Folyamat. |
| „Entitás Skálázás" | Szakzsargon. |
| Angol oldalcím | Magyar közönségnek magyar cím kell — SEO-szempontból is. |

---

# ÖSSZEFOGLALVA

Ez a négy átszövegezett oldal közül **a legkényesebb**, mert itt kifejezetten szakértelmet adsz el. Egy elavult metrika (FID) többet árt, mint tíz túlfűtött melléknév.

**A legnagyobb nyereség viszont pont itt van:** a mai munkával a thegbr.eu **ténylegesen megvalósítja**, amit ez az oldal hirdet. Van sitemap, van robots.txt, van JSON-LD, a Rich Results Test négy érvényes elemet talált.

Ezért az új „Bizonyíték" szekció a legfontosabb változás. Egy SEO-ügynökség, ami arra hív, hogy **ellenőrizd le** — ritka, ellenőrizhető, és nem másolható le anélkül, hogy a versenytárs is megcsinálná a munkát.
