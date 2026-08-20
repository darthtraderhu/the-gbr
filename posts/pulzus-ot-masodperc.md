---
title: "Öt másodperc — és senki nem tudott róla"
date: "2026-08-20"
category: "Üzemeltetés"
excerpt: "Egy webshop termékoldalai öt másodpercig töltődtek. Három évig. A tulajdonos nem tudta, mert nincs, ami szólna — és egy sebességteszt sem mondta volna meg, miért."
---

Nemrég végigmértünk egy webshopot, mielőtt hozzákezdtünk volna a megújításához. Ilyenkor tudni kell, mi van a rendszer alatt: hol gyors, hol lassú, és miért.

A főoldal 28 ezredmásodperc alatt válaszolt. Kiváló érték.
A kategórialap 64 ezredmásodperc. Szintén.

**A termékoldal 5140 ezredmásodperc.**

Öt másodperc, mire a szerver egyáltalán elkezdett válaszolni. Nem a képek töltődése, nem a betöltés vége — csak az, hogy a szerver „gondolkodott".

**És erről három évig senki nem tudott.**

## Miért nem derül ki magától

Nem azért, mert a tulajdonost nem érdekli. Hanem mert **nincs, ami szólna.**

Egy weboldal elkészül, aztán megy magától. Nincs benne semmi, ami jelezné, ha lassul. A tulajdonos naponta megnyitja — de a saját böngészője gyorsítótárból szolgálja ki, tehát neki gyors.

**A romlás pedig lassú.** Egy plugin frissül, valaki feltölt öt nagy képet, hozzáadódik egy új szolgáltatás. Mindegyik ad hozzá két-három tizedmásodpercet. Fél év alatt megduplázódik a betöltési idő, és nincs az a nap, amikor bárki azt mondta volna: *„ma lett lassú."*

**Amikor kiderül, akkor már a forgalom is esett** — és akkor sem tudni, mikortól és mitől.

## Amit egy sebességteszt nem mond meg

Itt jön a lényeg, amiről ritkán esik szó.

Ezt a hibát **egy PageSpeed-teszt nem találta volna meg.** Az megmondja, hogy lassú, és ad egy pontszámot. De azt nem, hogy **mitől.**

Ahhoz be kell menni a szerver mögé, és megnézni, mi történik oldalletöltés közben. Melyik bővítmény hány adatbázis-lekérdezést futtat. Ki hív külső szervert, és meddig vár rá. Mennyi memóriát eszik meg egyetlen oldal előállítása.

**Ebben az esetben 519 adatbázis-lekérdezés futott le egyetlen termékoldal megnyitásakor.** Ezekben kellett megtalálni, melyik a bűnös.

## A legszebb találat

Egy fizetési bővítmény frissítéskeresője minden egyes oldalletöltésnél **tizenhatszor** próbált elérni egy külső címet, ami már nem létezik. Mind a tizenhat kérés hibára futott.

Ez önmagában **1,2 másodperc** volt. Minden látogatónál, minden oldalon, teljesen feleslegesen.

A fejlesztő valamikor átköltöztette a tárhelyét. A bővítmény ezt nem kezelte: nem talált semmit, nem volt mit gyorsítótáraznia, ezért minden alkalommal újrapróbálta.

**Senki nem hibázott közvetlenül. Egyszerűen nem volt, aki megnézze.**

## A többi négy

**Egy felületépítő bővítmény** minden betöltésnél végigpásztázta a teljes tartalomtáblát egy indexeletlen lekérdezéssel. Fél másodperc.

**Két különböző bővítmény** számolta ugyanazt a nézettséget, egymástól függetlenül — és mindkettő **írt az adatbázisba** minden látogatásnál. Ez nem csak lassú: emiatt nem lehetett gyorsítótárazni a termékoldalakat sem.

**Egy kapcsolódó-termékek blokk** húsz további terméket olvasott be a teljes adatállományukkal — több mint tízezer adatsort egyetlen kis blokkért.

**És a képek.** A főoldal 16 megabájtot töltött le, kétszáz kéréssel. Az átlagos magyar céges oldal ennek a hetedét. Volt köztük fénykép PNG formátumban, félmegásan — pedig telepítve volt a képoptimalizáló, csak sosem futott le.

## A tanulság nem a hibalista

Mindegyik javítás napokban mérhető munka. Nem ez a történet érdekes része.

**Az érdekes az, hogy három évig senki nem nézte meg.**

Nem hanyagságból. Egyszerűen nincs rá rutin. A weboldal nem olyan, mint az autó, amit évente vizsgáztatni kell. Elkészül, működik, és onnantól láthatatlan — amíg baj nem lesz.

**És amikor baj lesz, már drágább.** Nem csak a javítás: az elveszett hónapok is.

## Amit ebből csináltunk

Ezért indítottuk el a **Pulzust.**

Havonta megmérjük az oldalt, és küldünk egy levelet arról, mi változott. Nem pontszámot — hanem azt, hogy mit érdemes tenni.

Ilyesmit:

> Az SSL-tanúsítványa 24 nap múlva lejár. Ha nem újul meg, a böngészők „nem biztonságos" jelzést tesznek az oldalára.
>
> A betöltési idő 2,1 mp — ez rendben van.
>
> A kapcsolati űrlapot teszteltük, megérkezett.

Emellett figyeljük a Google-profilt is: az új értékeléseket, az átlagot, és azt, hogy hol jelenik meg a helyi keresésben.

## Miért nem elég egy figyelőszolgáltatás

Van bőven eszköz, ami szól, ha leáll egy oldal. Ezek olcsók és hasznosak.

**De egyik sem tudja megmondani, mit kezdj a jelzéssel.**

Ha az eszköz azt írja, hogy „a Largest Contentful Paint 4,2 másodperc", azzal egy virágboltos nem tud mit kezdeni. Ha azt írjuk, hogy *„a főoldali fejléckép fél megabájt, és emiatt lassabban jelenik meg a lényeg — cseréljük ki?"*, akkor tud dönteni.

**A különbség nem a mérésben van, hanem abban, hogy valaki érti is, amit mér.**

És abban, hogy **meg is tudja csinálni.** Ha kiderül, hogy egy bővítmény tizenhatszor hív egy halott címet, azt nem elég jelezni — javítani kell.

---

Ha kíváncsi vagy, hogy nálad mi a helyzet, [írj egy sort](/init). Az első mérést elküldjük — akkor is, ha nem lesz belőle együttműködés.

Bővebben a szolgáltatásról: [Pulzus](/arzenal#pulzus).
