# THE GBR — főoldal szövegezés és tartalom

**Verzió:** 2.0 · 2026. 08. 17.
**Arculat:** „műszer, nem terminál" — világos alap, sötét mód opcióként
**Elv:** minden állítás mögött van fedezet. Ami nincs, az nem kerül ki.

---

## Mi változott az 1.0-hoz képest

A videógyártás megerősítve (partneren keresztül), és az addig bizonytalan tételeket átfogalmaztam arra, ami valóban igaz. A legfontosabb szerkezeti változás: **a hero maga méri meg magát**, így a signature elem nem függ külső adattól.

---

# 1. HERO — a hero maga a bizonyíték

Ez a legfontosabb döntés az egész oldalon. A hero nem állít, hanem **mér**: kiolvassa a látogató böngészőjéből, hogy mennyi idő alatt töltődött be az oldal, mennyi volt a szerver válaszideje, mennyi adat és hány kérés kellett hozzá — és odateszi egy átlagos magyar céges weboldal mellé.

**Miért ez a helyes választás:**

- **Nem igényel külső adatot.** Uptime-monitoring, ügyfélszám, referencia nélkül is működik — ma.
- **Nem hamisítható.** A szám a látogató gépén születik.
- **Öntartó fegyelem.** Aki ezt kiírja, annak gyorsnak is kell lennie. A dizájn kikényszeríti a technikai minőséget.
- **A versenytárs nem tudja lemásolni**, ha lassú az oldala.

### Felső jelzősáv

> `●` **Ez az oldal most megméri magát**

### Címsor

> **Nem mondjuk**
> **hogy gyors.**

*(A második sor halványabb tintával, a pont jelzés-színnel.)*

### Alcím

> Megmutatjuk. Az alábbi számokat nem mi írtuk ide — a te böngésződ mérte, most, ahogy betöltötte ezt az oldalt.

### A műszer

Négy érték, mindegyik alatt összehasonlító sáv az átlaggal:

| Címke | Egység | Referencia |
|---|---|---|
| Betöltés | ms | átlag 2 400 ms |
| Szerver válasz | ms | átlag 800 ms |
| Letöltött adat | kB | átlag 2 300 kB |
| Hálózati kérés | db | átlag 74 db |

### Az ítélet (dinamikusan generálva)

> Ez az oldal **[X]×** gyorsabban töltődött be nálad, mint egy átlagos magyar céges weboldal — és **[Y]×** kevesebb adatot töltött le hozzá. Nem trükk: kevesebb fölösleges dolog van benne. Ezt csináljuk az ügyfeleinknek is.

### CTA-k

- Elsődleges: **Pitcheld el a projekted**
- Másodlagos: **Hogyan dolgozunk**
- Apró szöveg: *Válasz két munkanapon belül*

> **Megjegyzés az átlagszámokhoz:** élesítés előtt érdemes valós forrással alátámasztani (pl. HTTP Archive magyar domain-adatok), és lábjegyzetben megadni a forrást. Ez erősíti az állítást, nem gyengíti.

---

# 2. A CÉGBEMUTATÓ VIDEÓ

A készülő videó helye **nem a hero** — ott a mérés a főszereplő, és egy automatikusan induló videó elvenné a hangsúlyt, plusz rontaná pont azt a betöltési számot, amit büszkén kiírunk.

**A javasolt hely: közvetlenül a hero alatt, saját szekcióban.**

- Előnézeti képpel, kattintásra induló lejátszással — így nem terheli az első betöltést
- Fölötte egyetlen sor: **„Két perc arról, hogyan dolgozunk"**
- Némán induljon, felirattal — a látogatók többsége hang nélkül nézi
- Alatta a videó tartalmi kivonata szövegben is, mert a keresők azt látják, nem a videót

Ez a felállás egyben megoldja a videógyártás szolgáltatás bizonyítékát is: **a saját videód a referencia.**

---

# 3. MIÉRT LÉTEZIK A THE GBR

*(Rövid szekció, első személyben. Ez teszi személyt a cég mögé — B2B-ben bizalmi tétel, és megmagyarázza, miért vagyunk.)*

### Fejléc
> `A CÉG MÖGÖTT`
> **Húsz év értékesítés, aztán a felismerés**

### Szöveg
> Több mint két évtizedet töltöttem értékesítéssel és marketinggel. A THE GBR-t azért indítottam, mert a legjobb kampány sem segít, ha a rendszer mögötte nem működik: lassú az oldal, elveszik a megkeresés, senki nem méri, mi történik.
>
> Ma egy hatéves cég vagyunk, és pontosan ezt a két oldalt kötjük össze — az értékesítési logikát és a technológiát.

**Aláírás:** Tóth Gábor · Sales & Management

---

# 4. AMIT CSINÁLUNK

### Szekció-fejléc
> `AMIT CSINÁLUNK`
> **Két dolog, nem tizenkettő**

### Bevezető
> A „mindent tudunk" lista senkit nem győz meg. Két dologban vagyunk jók, és a kettő összetartozik.

---

### 01 — DEVELOP · Megépítjük

> Weboldalak és webshopok Next.js alapon, a mérnöki részletekkel együtt — nem csak úgy, hogy szép legyen a nyitóképernyő.

- Weboldal és webshop nulláról, vagy meglévő rendszer fölé
- Telefonra telepíthető webalkalmazás (PWA) — ikonként a kezdőlapon, alkalmazásbolt nélkül
- Technikai SEO: sitemap, strukturált adat, mérhető eredmény
- Biztonság és teljesítmény alapból, nem utólag
- Arculat, design rendszer és szövegezés, ha még nincs
- Videó és vizuális tartalom a bevezetéshez

### 02 — MANAGE · És visszük tovább

> Itt dől el, hogy egy projekt siker lesz-e. Az átadás nem a vége — onnantól kezd el pénzt termelni.

- Üzemeltetés, monitoring, hibariasztás
- Folyamatos fejlesztés havi keretben
- Tartalom, kampány, mérés
- Automatizált tartalommotor: a blog magától frissül
- Jogi megfelelés karbantartása a változásokkal együtt
- Egy felelős kapcsolattartó — nem ügyfélszolgálati sorszám

---

# 5. VIDEÓ ÉS VIZUÁLIS TARTALOM

*(Önálló, rövid szekció — mert ez az, ami a legtöbb ügynökségnél hiányzik, és nálad megvan.)*

### Fejléc
> `VIDEÓ`
> **A weboldal önmagában nem elég**

### Szöveg
> Egy jó oldalra tartalom is kell. Reklámfilm, termékvideó, közösségi formátumok — a mi irányításunk alatt, ugyanabban az arculatban, mint a weboldal. Így nem lesz külön a „szép oldal" és a „valahonnan összeszedett videó".

**Három tétel:**
- Cégbemutató és imázsvideó
- Termékvideó webshophoz
- Rövid formátumok közösségi médiára

---

# 6. MŰSZAKI ALAP

*(Nem szolgáltatás, hanem a stack — őszintén, felsorolásként. Ez váltja ki a korábbi „Supabase B2B architektúra" típusú túlígérést.)*

### Fejléc
> `MŰSZAKI ALAP`
> **Amivel dolgozunk**

### Szöveg
> Nem minden projektre ugyanaz kell. Ezekkel dolgozunk napi szinten, és ezekért felelünk is.

**Next.js · React · TypeScript · Supabase · WooCommerce · Vercel · OpenAI API**

*(Ne mozgó szalag legyen, hanem statikus, fegyelmezett rács. A görgető ticker az AI-generált oldalak egyik jellegzetes eleme.)*

---

# 7. MUNKÁK

### Fejléc
> `MUNKÁK`
> **Amin dolgozunk**

### Bevezető
> Ügyfélmunka és saját termék. Az utóbbi nem portfólió-töltelék: azért van itt, mert ezeket magunk üzemeltetjük, és ez a különbség.

**Kártya 1 — `ÜGYFÉL · FOLYAMATBAN`**
> **Kisgép-forgalmazó webshop**
> Több évtizede piacon lévő kizárólagos importőr. Élő, forgalmazó webáruház fokozatos újraépítése — a bolt egy percre sem áll le.
> *Lábléc: ~400 termék · Next.js*

**Kártya 2 — `SAJÁT TERMÉK · ÉLŐ`**
> **Pénzügyi alkalmazás**
> Saját fejlesztés, saját infrastruktúrán. Nincs kire mutogatni, ha elromlik — ezért tudjuk, mit jelent üzemeltetni.
> *Lábléc: Élő · Supabase*

**Kártya 3 — `SAJÁT TERMÉK · ÉLŐ`**
> **Tőzsdei oktatóplatform**
> Tartalom, közösség és eszközök egy helyen. Kétnyelvű felépítés, folyamatos üzemeltetés.
> *Lábléc: Next.js · Kétnyelvű*

---

# 8. A SÖTÉT SZEKCIÓ — a legkeményebb állítás

### Fejléc
> `MIÉRT SZÁMÍT`
> **Aki csak épít, annak nincsenek számai**

### Szöveg
> A portfólió megmutatja, mi készült el. Nem mutatja meg, hogy mi lett vele fél évvel később. Az átadás után kezdődik az igazi munka — és a legtöbb ügynökség pont ott hagyja abba.

**Három állítás:**

| Fejléc | Szöveg |
|---|---|
| Mi üzemeltetjük | Amit építünk, azt visszük tovább. Monitoring, riasztás, hibakezelés — nem külön megállapodás kérdése. |
| Válasz két munkanapon belül | Vállalás, nem ígéret. Ha csúszunk, előre szólunk. |
| Egy felelős ember | Nem ügyfélszolgálati sorszámot kapsz, hanem valakit, aki ismeri a projekted. |

> **Amikor lesz uptime-monitoring a rendszereken, ez a szekció valós számokra cserélhető** (élő rendszer, incidens/90 nap, uptime %). Addig az állítások önmagukban is megállnak, és nem hamisak.

---

# 9. CSOMAGOK

### Fejléc
> `EGYÜTTMŰKÖDÉS`
> **Hogyan dolgozunk együtt**

### Bevezető
> Minden projekt más, ezért fix árlista nincs. Három tipikus felállás — a tiéd valószínűleg valamelyikhez közel esik.

**Csomag 1 · `BELÉPŐ`**
> **Weboldal és arculat** — *Egyedi ajánlat*
- Vállalati weboldal, egyedi dizájn
- Design rendszer, ami később is használható
- Technikai SEO alapok, mérhető eredménnyel
- Szövegezés, ha kell

**Csomag 2 · `A LEGGYAKORIBB`** *(kiemelt)*
> **Webshop és skálázás** — *Teljes infrastruktúra*
- Minden az előzőből
- Webshop nulláról vagy meglévő rendszer fölé
- Telefonra telepíthető változat (PWA) — a vásárló kezdőlapján
- Fizetés, szállítás, számlázás integrálva
- Admin felület, amit a kollégák is használni tudnak
- Kampánykezelés és mérés

**Csomag 3 · `TELJES LEFEDETTSÉG`**
> **Fejlesztés és üzemeltetés** — *Havi keret*
- Minden az előzőből
- Folyamatos fejlesztés havi óraszámban
- Monitoring, hibariasztás, ügyelet
- Tartalom, videó és kampány
- Jogi megfelelés karbantartása
- Egy felelős kapcsolattartó

**Gombok:** mindhárom → *Beszéljünk róla* (`/init`-re, csomag-paraméterrel)

---

# 10. FOLYAMAT

### Fejléc
> `FOLYAMAT`
> **Nincs meglepetés a végén**

### Bevezető
> Minden szakasz végén van valami, amit meg tudsz nézni.

**01 · Felmérés**
> Megnézzük, mi van most — kód, adatok, számok. Nem tippelünk. Ennek a végén tudod, mibe kerül és mennyi idő.

**02 · Terv és keret**
> Fix hatókör, fix árazás, írásos szerződés — szellemi tulajdonnal és adatkezeléssel együtt. Nem ad hoc.

**03 · Építés szakaszokban**
> Kéthetente látható eredmény. Élő rendszernél fokozatos átállás — a bolt nem áll le.

**04 · Átadás és üzemeltetés**
> Dokumentáció, monitoring, riasztás. Innentől jön a „manage" rész — ha kéred.

---

# 11. BLOG

### Fejléc
> `ÍRÁSOK`
> **Amit közben megtanulunk**

### Bevezető
> Nem tartalomgyár. Amit leírunk, azt előbb megcsináltuk.

**CTA:** *Összes írás →*

---

# 12. ZÁRÓ CTA

### Címsor
> **Pitcheld el a projekted**

### Szöveg
> Nem minden projektet vállalunk el — ezért kérdezünk előbb. Írd le, mit szeretnél elérni, és két munkanapon belül válaszolunk. Ha nem illünk össze, azt is megmondjuk.

**Gomb:** *Kezdjük →*

**Alá:** *Vagy írj közvetlenül: gabor@thegbr.eu*

---

# 13. LÁBLÉC

**Márka alatt:**
> GBR Marketing Solutions Kft.
> Fejlesztés és üzemeltetés B2B-ben

**Oszlopok:** Ügynökség · Kapcsolat · Jogi

---

# AMIT ELTÁVOLÍTOTTAM, ÉS MIÉRT

| Kivezetve | Helyette | Ok |
|---|---|---|
| „Fegyvertár", „Arzenál", „Digitális Mátrix" | „Amit csinálunk", „Műszaki alap" | Harci metafora. Egy döntéshozónak nem imponál, és nem mond semmit. |
| „SYS.NODE: FULL_STACK_AGENCY" | „Ez az oldal most megméri magát" | Terminál-jelmez helyett valódi információ. |
| „A Jövő Egy Kézből" | „Nem mondjuk hogy gyors." | Bármelyik ügynökség kiírhatná. Az új címsor csak a miénk lehet. |
| „gépként termelik a profitot" | mért számok | Nem ellenőrizhető állítás. |
| „IT Projektmenedzsment" mint önálló szolgáltatás | „Egy felelős kapcsolattartó" a MANAGE alatt | A legelmosódottabb tétel volt. Így konkrét és igaz. |
| „Autopilot Rendszerek" (marketing automatizáció, okos hírlevél) | „Automatizált tartalommotor: a blog magától frissül" | Csak ez létezik ma. A többi túlígérés lett volna. |
| „Supabase B2B architektúra" mint szolgáltatás-fejléc | a stack-felsorolásban | Használjuk, de nem önálló szolgáltatás. |
| Mozgó tech-szalag (`animate-scroll`) | statikus rács | A görgető ticker az AI-generált oldalak jellegzetes eleme. |
| „Lélegzetelállító", „kompromisszummentes", „kőkemény", „nyers" | konkrétumok | Túlfűtött melléknevek. Az önbizalmat a tény adja. |
| „EST. 2002 óta az értékesítésben” | „Húsz év értékesítés, aztán a felismerés” — saját szekció, első személyben | A cég hatéves; a 2002 a személyes pálya kezdete. Így igaz, és erősebb is: személyt tesz a cég mögé. |

---

# AMI MÉG RÁD VÁR

## Melyik saját terméket vállalod nyilvánosan

A Munkák szekció három kártyával számol. Az ügyfélprojekt megvan (nevezés nélkül, NDA-ig). A két saját termékből viszont **csak azt tedd ki, ami készen áll** — és linket csak akkor, ha valóban bemutatható.

Ha egyik sem: két kártya is elég. Kevesebb, de igaz.

---

# HANGVÉTEL — a szabályok

- **Rövid mondatok.** Ha egy mondat két sornál hosszabb, ketté kell vágni.
- **Számok melléknevek helyett.** „400 termék" > „nagy webshop".
- **Vállalás ígéret helyett.** „Két munkanapon belül" > „gyors válasz".
- **Következmény, nem tevékenység.** Nem az, hogy mit csinálsz — hanem mi lesz belőle.
- **Kockázat kimondása.** „Ha nem illünk össze, azt is megmondjuk." Ez erősebb bármilyen garanciánál.
- **Nulla felkiáltójel.** Egy sem.
