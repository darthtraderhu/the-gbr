# THE GBR — /hirek cikkoldal szövegezése

**Verzió:** 1.0 · 2026. 08. 17.
**Érintett fájlok:** `app/hirek/[id]/page.tsx`, `app/hirek/page.tsx`

---

# ELŐSZÖR: EGY ELLENTMONDÁS, AMI AZ EGÉSZ BLOGOT ÉRINTI

## A főoldalra ezt írtuk

> **Amit közben megtanulunk**
> Nem tartalomgyár. **Amit leírunk, azt előbb megcsináltuk.**

## Az oldalon viszont ez van

- A szerző: `THE GBR Intelligence`
- Van egy `/api/autopilot` végpont, ami tartalmat generál
- Az `/arzenal` oldal „automatizált tartalommotort" hirdet, ami „magától frissül"
- A 22 bejegyzésből 11-ből hiányzott a `category` mező, 2-ből az `excerpt` — ez tömeges generálásra utal

**Ha ezek a cikkek AI-val készültek és emberi átnézés nélkül jelennek meg, akkor a főoldali mondat nem igaz** — és ugyanabba a kategóriába esik, mint a `2002 · Alapítás` vagy a `ROAS +312%`.

## És van egy jogi vonatkozása is

Az **AI-használati tájékoztatóban**, amit ma tettél ki élesbe, ez szerepel:

> „Weboldalunk egyes tartalmainak elkészítéséhez mesterséges intelligenciát is igénybe veszünk. **Minden közzétett tartalmat emberi ellenőrzés és szerkesztés után publikálunk**, és annak tartalmáért teljes felelősséget vállalunk."

Ha az autopilot emberi jóváhagyás nélkül publikál, **a saját jogi tájékoztatód mond valótlant.**

## Három lehetséges válasz

**A) A cikkeket ténylegesen átnézed publikálás előtt.**
Akkor minden rendben — de akkor az autopilot ne publikáljon, hanem **piszkozatot készítsen**, amit jóváhagysz. Egy kapcsoló a route-ban.

**B) Nyíltan vállalod, hogy AI-asszisztált.**
Ez teljesen legitim, ha ki van írva. Minden cikk alján egy sor:
> *Ez az írás AI-asszisztálva készült, és publikálás előtt átnéztük.*

Egy technológiai ügynökségnél ez nem gyengeség — **következetesség.** Te árulsz AI-integrációt; ha te magad titkolnád, az lenne furcsa.

**C) A főoldali mondatot változtatod meg.**
Ha a blog tényleg tartalommotor, akkor a „Nem tartalomgyár" mondat nem maradhat.

**Az én javaslatom a B).** Nyílt, konzisztens az AI-tájékoztatóval, és megkülönböztet: kevés ügynökség meri kiírni.

---

# A CIKKOLDAL SZÖVEGEZÉSE

## Metadata

**Mostani:** `${postData.title} | THE GBR Akták`

Az „Akták" kémfilmes-nyomozós metafora, ugyanabból a családból, mint a „Fegyvertár" és a „Szindikátus".

**Új:** `${postData.title} | THE GBR`

*(Egyszerűen a márkanév. A cikk címe amúgy is elég hosszú — a toldalék csak rövidíti a látható részt a találati listában.)*

## A szerző

**Mostani:** `authors: ["THE GBR Intelligence"]`

Az „Intelligence" itt hírszerzést jelent — megint katonai nyelv.

**Új:** `authors: ["THE GBR"]`, vagy ha vállalod: `["Tóth Gábor"]`

**A személynév erősebb.** B2B-ben a szakmai tartalom akkor működik, ha van mögötte ember. Egy cégnév által írt cikk senkit nem érdekel; egy szakemberé igen.

## A dátum-sáv

**Mostani:** `SYS.DATE: 2026-08-17` pulzáló ponttal

**Új:** egyszerű dátum, a kategóriával és az olvasási idővel:

> `TECHNIKAI SEO` · 2026. augusztus 17. · 6 perc olvasás

Az **olvasási idő** apró, de valós érték: a látogató eldönti, van-e most rá ideje. Számítható a szószámból (kb. 200 szó/perc magyarul).

## A vissza-gomb

**Mostani:** „Vissza az Adatbázisba"
**Új:** „Vissza az írásokhoz"

## A `/hirek` oldal neve

A Navbarban „Hírmotor" szerepel. **Ez a saját belső rendszered neve, nem az, amit a látogató keres.**

**Javaslat:** `Írások` — ez illik a főoldali „Amit közben megtanulunk" pozicionáláshoz, és nem ígér napi híreket, amiket úgysem szállítasz.

*(A „Hírek" is jó, de az napi frissítést sugall.)*

---

# AMI HIÁNYZIK AZ OLDALRÓL

## 1. Nincs CTA a cikk végén

**Ez a legnagyobb konverziós veszteség az egész oldalon.** Valaki végigolvas egy szakmai írást, meggyőződik arról, hogy értesz hozzá — és nincs hova kattintania.

**Javasolt blokk a cikk után:**

> **Hasonló problémád van?**
> Írd le, mit szeretnél elérni, és két munkanapon belül válaszolunk.
>
> *Pitcheld el a projekted →*

## 2. Nincsenek kapcsolódó cikkek

Aki egy írást végigolvas, hajlandó egy másikat is. Két-három kapcsolódó cikk a végén — kategória alapján — több oldalletöltést és hosszabb látogatást hoz.

## 3. Nincs `dateModified` a strukturált adatban

A `BlogPosting` sémában csak `datePublished` szerepel. Ha egy cikket frissítesz, a `dateModified` jelzi a Google-nek, hogy friss tartalom — ez rangsorolási tényező.

## 4. A kiemelt szöveg olvashatatlan

`prose-strong:text-[#e7ff00]` — a **félkövér szöveg lime színnel** jelenik meg a cikkekben. Sötét háttéren ez káprázik, hosszabb szövegben fárasztó.

**Javaslat:** a félkövér maradjon fehér, a lime csak a linkeknek. Egy szövegben egyszerre két kiemelési mód (félkövér + szín) túl sok.

## 5. Nincs megosztás gomb

B2B szakmai tartalomnál a LinkedIn-megosztás valós forgalmat hoz. Egyetlen gomb elég.

---

# AMIT ELTÁVOLÍTOK, ÉS MIÉRT

| Kivezetve | Ok |
|---|---|
| „THE GBR **Akták**" | Kémfilmes metafora, ugyanabból a családból, mint a Fegyvertár. |
| „THE GBR **Intelligence**" (szerző) | Katonai/hírszerzési nyelv. Helyette márkanév vagy személynév. |
| `SYS.DATE:` | Terminál-jelmez. |
| „Vissza az **Adatbázisba**" | Ugyanaz. |
| „**Hírmotor**" (Navbar) | Belső rendszernév. A látogató „írásokat" vagy „blogot" keres. |
| `prose-strong:text-[#e7ff00]` | Olvashatósági probléma hosszabb szövegben. |

---

# AMI RÁD VÁR

## A blog-tartalom kérdése

**Ez az egyetlen valódi döntés ezen az oldalon**, és nem szövegezési:

1. Az autopilot **publikál** vagy **piszkozatot készít**?
2. Átnézed a cikkeket megjelenés előtt?
3. Vállalod-e nyíltan, hogy AI-asszisztáltak?

**A válasz meghatározza**, hogy a főoldali „Nem tartalomgyár" mondat maradhat-e, és hogy az AI-használati tájékoztatód igazat mond-e.

## És egy gyakorlati javaslat

Nézd át a 22 meglévő cikket. Nem kell mindet — **elég az első öt-hat**, amit a látogató valószínűleg megnyit. Ha azok szakmailag megállják a helyüket és a te hangodon szólnak, a többi ráér.

Ha viszont bármelyik olyan állítást tartalmaz, ami mögött nincs fedezet — ugyanaz a helyzet, mint az oldalak szövegénél volt. **A blog is az oldal része.**
