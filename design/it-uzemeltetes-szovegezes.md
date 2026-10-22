# THE GBR — új szolgáltatás: IT-üzemeltetés (08)

**Dátum:** 2026. 10. 22. · **Státusz:** javaslat, jóváhagyásra vár
**Hova kerül:** `/arzenal`, a meglévő hét blokk után, **08** sorszámmal, horgony: `/arzenal#it`
**Elv:** mint a 06–07-nél: teljesítést állítunk, nem eredményt. Mit csinálunk, mit kap kézbe, mikor.

---

## Miért egy blokk, és nem tizenkettő

A 12 felsorolt tétel egy dologról szól: az iroda (és a home office) informatikája működjön, és legyen, aki felel érte. Ha 12 külön szolgáltatás lenne, a jelenlegi hét mellett szétfolyna az oldal, és az informatika kerülne túlsúlyba egy alapvetően web- és marketingügynökség oldalán. Egy erős blokk, benne a teljes listával, ugyanúgy megtalálható (keresőnek, AI-nak a Service sémán át is), de az oldal arányos marad.

A meglévő **05 Üzemeltetés** marad, ahogy van: az a weboldal és a webes rendszerek utógondozása. A 08 az irodai informatika. A „05" címkéje kap egy pontosítást („Web-üzemeltetés"), hogy a kettő ne keveredjen.

Az „egyedi szoftver és programozás" tételt a 08-ba tettem utolsónak, belső rendszerként (pl. irodai munkafolyamat, integráció), mert a webes fejlesztés már az 01-ben van.

---

## Fejléc

> `08`
> **IT-üzemeltetés**

## Címsor

> **Az irodai informatika, amire nem kell gondolnia**

*(alternatíva: „Legyen, aki felel a gépekért")*

## Bevezető

> Egy irodában ritkán az a gond, hogy nincs informatika. Inkább az, hogy senki nem tudja egészben: ki fér hozzá mihez, van-e mentés, és kit kell hívni, ha reggel nem indul a levelezés.
>
> **15 éve üzemeltetünk informatikai rendszereket** kis és nagyobb irodáknak, home office-ban dolgozó csapatoknak — a szervertől a nyomtatón át a munkatársak telefonjáig.
>
> Felméréssel kezdünk: megnézzük, mi van most, és írásban megkapja, mit találtunk és mit javasolunk. Utána ön dönti el, mit bíz ránk.

## Tételek (a kétoszlopos lista)

- Meglévő IT-rendszer felmérése, írásos összefoglalóval
- Rendszergazdai feladatok irodában, home office-ban és mobil eszközökön
- Távfelügyelet és távoli segítség: rákapcsolódunk, nem kell kiszállásra várni
- Szerverkörnyezet kialakítása és üzemeltetése
- Hálózat kiépítése: kábeles és wifi
- Biztonságos távoli elérés, VPN
- Nyomtatók kezelése és karbantartása
- Levelezőrendszer kialakítása és üzemeltetése
- Microsoft 365 és Teams: távmunka és távoktatás bevezetése, üzemeltetése
- Céges mobilflotta: díjcsomagok és költségek átnézése
- Meglévő szoftverek és eszközök üzemeltetése
- Egyedi szoftver és belső rendszerek fejlesztése

## Az eszköz — minta-auditlista

*(Ugyanaz a panel-forma, mint a 06-nál: „Amit egy IT-felmérés tipikusan talál", jobb oldali címke: „Minta")*

| Amit találunk | Mit jelent | Súly |
|---|---|---|
| Van mentés, de visszaállítást senki nem próbált | Baj esetén derül ki, hogy működik-e | Magas |
| Kilépett munkatárs fiókja még aktív | Hozzáfér a céges levelekhez, fájlokhoz | Magas |
| Közös rendszergazda-jelszó, évek óta ugyanaz | Nem követhető, ki mit állított át | Magas |
| Vendég és könyvelés ugyanazon a wifin | Egy fertőzött vendéggép elérheti a belső gépeket | Közepes |
| Lejárt támogatású operációs rendszer | Nem kap biztonsági frissítést | Közepes |

**Alá, apró szöveggel:**
> Illusztráció. A tényleges lista a felmérés után áll össze, irodánként eltér.

## Service séma (JSON-LD) leírás

> Irodai IT-üzemeltetés kis és nagyobb csapatoknak: rendszerfelmérés, rendszergazdai feladatok, távfelügyelet, szerver, hálózat, VPN, levelezés, Microsoft 365 és Teams, nyomtatók és mobilflotta kezelése, 15 év tapasztalattal.

## Új GYIK-kérdés (opcionális)

> **Kis irodának is érdemes külső rendszergazda?**
> Igen, gyakran éppen nekik. Ahol nincs saját informatikus, ott jellemzően valamelyik munkatárs viszi „mellékesen", és ez addig működik, amíg nincs baj. Felméréssel kezdünk, és megmondjuk, mekkora rendszeres munkát kíván az önöké. Ha keveset, azt is.

---

## Amit szándékosan nem írtam

| Az eredeti listában | Helyette | Miért |
|---|---|---|
| „szinte azonnali távsegítség" | „rákapcsolódunk, nem kell kiszállásra várni" | Az „azonnali" ígéret, amit egy rossz napon nem lehet tartani. Ha van vállalt reakcióidő (pl. munkanapon X órán belül), azt konkrétan beírjuk, az erősebb. |
| „költség optimalizáció" | „díjcsomagok és költségek átnézése" | Megtakarítást nem ígérünk, amíg nem láttuk a számlát. |

---

## Ami még változik vele

- „Hét terület" → „Nyolc terület": az /arzenal bevezetője, meta- és OG-leírása, a menü (Navbar) felirata, a /seo oldal egy mondata, a kódkommentek.
- A meta leírásba bekerül: „…akadálymentesítés, Pulzus és irodai IT-üzemeltetés."
- Angol oldal (`/en/services`): az angol oldal ügynökségeket céloz, ott az irodai IT kevésbé illik. **Kérdés, kell-e oda.**
- URL-ek nem változnak, csak új horgony jön (`#it`).
